//console.log('Hola, Mundo!')
const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3977;
const urlMongoAtlas =
  "mongodb+srv://admin:admin123456@cluster0.ont4z.mongodb.net/Cluster()";

mongoose.connect(urlMongoAtlas, (err, res) => {
  try {
    if (err) {
      throw err;
    } else {
      console.log("La conexión a la base de datos es correcta.");

      app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
      });
    }
  } catch (error) {
    console.error(error);
  }
});
