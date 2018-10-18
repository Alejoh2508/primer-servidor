require('./config/config')

//librerias del proyecto
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('cookie-session');
const port = process.env.PORT;
const app = express();

//middleware
app.use(morgan('dev')); //Información detallada en el terminal
app.use(bodyParser.urlencoded({
    extended: true
})); //Obtener los datos de las peticiones POST en el atributo "body" del request
app.use(session({
    secret: 'node'
})); //Configuración cookie-session (persistencia en sesión)

app.set('view engine', 'ejs'); //Configuración de template engine EJS

// Compartir recursos
app.use('/public', express.static('public'))

//Ruta Formulario
app.get('/', function (request, response) { //renderizar el forminicial
    response.render('formulario.ejs', {
        tareas
    })
})

let tareas = ['uno', 'dos']

// Agregar tarea
app.post('/adicionar', function (request, response) {
    let tarea = request.body.nuevaTarea;
    tareas.push(tarea)
    response.redirect('/')
})

// Eliminar tarea
app.get('/borrar/:id', function (request, response) {
    let id = +request.params.id
    tareas.splice(id, 1)
    response.redirect('/')
})

//verificar en qué puerto se está trabajando
app.listen(port, function () {
    console.log('Escuchando en el puerto ', port);
})