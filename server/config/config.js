const axios = require("axios").default;

async function getURL() {
  try {
    const response = await axios.get(
      "https://us-central1-ilaw-fe1af.cloudfunctions.net/function1"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//PUERTO
process.env.PORT = process.env.PORT || 3010;

//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//BASE DE DATOS
let respuesta;
let urlDB;

let setURL = async () => {
  respuesta = await getURL();

  if (process.env.NODE_ENV === "dev") {
    urlDB = "mongodb://localhost:27017/cafe";
  } else {
    urlDB = respuesta;
  }

  process.env.URLDB = urlDB;
};

module.exports = setURL;
