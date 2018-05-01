var express = require("express");

var bodyParser = require("body-parser");

var session = require("cookie-session");

var app = express();

app.use(session({secret: "nodejs"}));

//la codificacion que esperamos es de tipo urlencoded (porque es info que viene desde el navegador), podria ser tipo json en el caso sea una api rest
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');

var tareas = [];

app.get("/", function (llamado, respuesta) {
    respuesta.render("formulario.ejs", {tareas: tareas});
});

app.post("/adicionar", function (llamado, respuesta) {
    var tarea = llamado.body.nuevaTarea;

    tareas.push(tarea);

    respuesta.redirect("/");
});

app.get('/borrar/:id', function (llamado, respuesta) {
    tareas.splice(llamado.params.id, 1);
    respuesta.redirect("/");
});

app.listen(3000, function () {
    console.log("Corriendo en el puerto 3000");
});