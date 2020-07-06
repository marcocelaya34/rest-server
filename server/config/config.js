//PUERTO

process.env.PORT = process.env.PORT || 3005;

//ENTORNO

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//BASE DE DATOS

let urlDB;

if (process.env.NODE_ENV == "dev") {
  urlDB = "mongodb://localhost:27017/cafe";
} else {
  urlDB =
    "mongodb+srv://marcocelaya34:hahopeadyochc4@cafe.w46cm.gcp.mongodb.net/test";
}

process.env.URLDB = urlDB;
