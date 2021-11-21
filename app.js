const express = require("express");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// Cargar rutas
const hello_routes = require("./routes/hello");
const tasks_routes = require('./routes/task');



// Rutas base
app.use("/api", hello_routes);
app.use('/api', tasks_routes);




module.exports = app;