import express from "express";
const router = express.Router();
import catsDB from "./cats.js";

//TODO: PLEASE SEE link for what your code should look like
//https://www.figma.com/file/PXnLz4Suyfg4R3yxwHnlc4/Cat-Cafe-Express-Lab?node-id=3%3A81

//TODO: create a GET route for landing page
router.get("/", (req, res) => {
  return res.status(200).send("This is the landing page");
});

//TODO: create a GET route for all cats
router.get("/cats", (req, res) => {
  return res.status(200).send(catsDB);
});

//TODO: create a POST route to add a cat to the database
// BONUS: if any fields are blank, send a 400 error
// BONUS: if all fields are filled out, show the list of cats
router.post("/cats", (req, res) => {
  const { id, name, breed } = req.body;
  if (!id || !name || !breed) {
    return res.status(400).send("Please ensure all fields are filled out");
  } else {
    catsDB.push(req.body);
    return res.status(201).send(catsDB);
  }
});

//TODO:
//create a delete route that can delete one cat then shows the updated list of cats
router.delete("/cats", (req, res) => {
  const index = catsDB.findIndex((cat) => cat.id == req.params.id);
  catsDB.splice(index, 1);
  res.status(200).send(catsDB);
});

//TODO: create a GET route for one cat
router.get("/cats/:id", (req, res) => {
  let paramsId = req.params.id;
  let catIndex = catsDB.findIndex((catObj) => catObj.id == paramsId);
  return res.status(200).send(catsDB[catIndex]);
});

//TODO: create a put request to be able to edit one cat (hint: array splice)
//BONUS: if cat is not found in database, send 404 error "Cannot find cat"
// BONUS: if ID in body doesn't match the ID in the URI, send 400 error "Bad Request"
router.put("/cats/:id", (req, res) => {
  let paramsId = req.params.id;
  let cat = catsDB.find((catObj) => catObj.id == paramsId);
  let catIndex = catsDB.findIndex((catObj) => catObj.id == paramsId);
  if (cat == null || cat == undefined) {
    return res.status(404).send("Cannot find cat");
  } else if (paramsId != req.body.id) {
    return res.status(400).send("Bad Request");
  } else {
    catsDB.splice(catIndex, 1, req.body);
    return res.status(200).redirect(`/cats/${paramsId}`);
  }
});

export default router;
