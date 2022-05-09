const express = require('express')
const { Router } = express
const app = express()
const Contenedor = require('./contenedor.js')
const rProductos = new Router();
const pug = require('pug');



app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('views', './views')
app.set('view engine', 'pug')



rProductos.get('/', async (req, res) => {
    const object = await Contenedor.getAll()
    res.render('inicio', { productos: object })
})

rProductos.get('/products', async (req, res) => {
    const objetos = await Contenedor.getAll()
    res.render('product', { objetos })
})

rProductos.post('/p', async (req, res) => {
    const objet = req.body
    const add = await Contenedor.save(objet)
    res.redirect('/api/productos')
})


app.use('/api/productos', rProductos)

const PORT = 8000
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))





