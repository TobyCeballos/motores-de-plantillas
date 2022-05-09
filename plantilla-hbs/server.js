const express = require('express')
const { Router } = express
const app = express()
const Contenedor = require('./contenedor.js')
const handlebars = require('express-handlebars')
const objectInspect = require('object-inspect')
const rProductos = new Router();


app.engine('handlebars', handlebars.engine())
app.set('views', './views')
app.set('view engine', 'handlebars')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())



rProductos.get('/', async (req, res) => {
    res.render('form')
})

rProductos.get('/products', async (req, res) => {
    const object = await Contenedor.getAll()
    res.render('datos', { productos: object, listExist: true})

})

rProductos.post('/p', async (req, res) => {
    const objet = req.body
    const add = await Contenedor.save(objet)
    res.redirect('/api/productos')
})


app.use('/api/productos', rProductos)

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))





