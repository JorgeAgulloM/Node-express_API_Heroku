const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3977;
const urlMongoDb =
  "mongodb+srv://admin:admin123456@cluster0.ont4z.mongodb.net/Cluster()";

mongoose.connect(
  urlMongoDb,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, res) => {
    try {
      if (err) {
        throw err;
      } else {
        console.log("La conexion a la base de datos es correcta");

        app.listen(port, () => {
          console.log(
            `Servidor del API REST esta funcionando en http://localhost:${port}`
          );
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
);
