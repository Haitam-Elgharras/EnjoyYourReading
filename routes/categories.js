var express = require("express");
var router = express.Router();

const {
  getAllCategories,
  getCategorieById,
  addCategorie,
  updateCategorie,
  deleteCategorie,
} = require("../models/categories");
/*when I add the categories route the server stop working and give me this error : 
C:\Users\21263\OneDrive\Bureau\blogProject\node_modules\express\lib\router\index.js:458
      throw new TypeError('Router.use() requires a middleware function but got a ' + gettype(fn))
      ^

TypeError: Router.use() requires a middleware function but got a Object
    at Function.use (C:\Users\21263\OneDrive\Bureau\blogProject\node_modules\express\lib\router\index.js:458:13)
    at Function.<anonymous> (C:\Users\21263\OneDrive\Bureau\blogProject\node_modules\express\lib\application.js:220:21)
    at Array.forEach (<anonymous>)
    at Function.use (C:\Users\21263\OneDrive\Bureau\blogProject\node_modules\express\lib\application.js:217:7)
    at Object.<anonymous> (C:\Users\21263\OneDrive\Bureau\blogProject\app.js:24:5)
    at Module._compile (node:internal/modules/cjs/loader:1254:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1308:10)
    at Module.load (node:internal/modules/cjs/loader:1117:32)
    at Module._load (node:internal/modules/cjs/loader:958:12)
    at Module.require (node:internal/modules/cjs/loader:1141:19)

Node.js v18.15.0
[nodemon] app crashed - waiting for file changes before starting...

*/
//get all categories
router.get("/", (req, res, next) => {
  getAllCategories().then((categories) => res.json(categories));
});

//get categorie by id
router.get("/:id([0-9]+)", (req, res, next) => {
  getCategorieById(req.params.id).then((categorie) => res.json(categorie));
});

//post categorie
router.post("/", (req, res, next) => {
  addCategorie(req.body).then((categorie) => res.json(categorie));
});

//put categorie
router.put("/:id([0-9]+)", (req, res, next) => {
  updateCategorie(req.params.id, req.body).then((categorie) =>
    res.json(categorie)
  );
});

//delete categorie
router.delete("/:id([0-9]+)", (req, res, next) => {
  deleteCategorie(req.params.id).then((categorie) => res.json(categorie));
});

module.exports = router;
