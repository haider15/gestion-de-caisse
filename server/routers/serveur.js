const express = require("express");
const router = express.Router();
const serveur = require("../model/serveur");
const bcrypt = require("bcrypt");



// const multer = require("multer");
// var ds = multer.diskStorage({ 
//   destination: function (req, file, cb) {
//     cb(null, "../uploads");
//   },

//   filename: function (req, file, cb) {
//     let filename = "filenametogive";
//     req.body.file = filename;

//     cb(null, filename);
//   },
// });

// var upload = multer({ storage: storage });

// GET http://localhost:5000/api/serveur
// Gui serveur len server
router.get("/", async (req, res) => {
  try {
    const serveurs = await serveur.find({});
    res.send({ success: true, serveurs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// POST http://localhost:5000/api/serveur
// Gui serveur len server
router.post("/", async (req, res) => {
  const { firstName, cin, email, password } = req.body;
  // Check name
  if (!firstName)
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });
  try {
    // All good
    const newserveur = new serveur({
      firstName,
      cin,
      email,
      password,
    
    });
    await newserveur.save();
    res.send({
      success: true,
      message: "serveur is created",
      serveur: newserveur,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// PUT http://localhost:5000/api/serveur/id
// Update data len server
router.put("/:id", async (req, res) => {
  const { firstName, cin, email, password } = req.body;
  // Check name
  if (!firstName)
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });

  console.log(req.params.id);
  try {
    // All good
    let updateserveur = {
        firstName,
        cin,
        email,
        password,
    };
    const conditionUpdated = { _id: req.params.id };
    updateserveur = await serveur.findOneAndUpdate(
      conditionUpdated,
      updateserveur,
      {
        new: true,
      }
    );
    res.send({ success: true, serveur: updateserveur });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// DELETE http://localhost:5000/api/serveur/id
// Delete serveur

router.delete("/:id", async (req, res) => {
  try {
    const conditionUpdated = { _id: req.params.id };
    const serveurDeleted = await serveur.deleteOne(conditionUpdated);
    res.send({
      success: true,
      message: "delete done",
      serveur: serveurDeleted,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// get serveur theo id

router.get("/:id", async (req, res) => {
  const conditionFilter = { catelory: req.params.id };
  // const id=req.params.id
  try {
    const serveurs = await serveur.find(conditionFilter);
    res.send({ success: true, serveurs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


router.post("/login", async (req, res) => {
    try {
    
      const Serveur = await serveur.findOne( {email:req.body.email} );
      console.log(Serveur)
      if (!Serveur) {
          return res.status(404).send("Serveur not found");
      }
  
      const correctPassword = await bcrypt.compare(req.body.password, Serveur.password);
      console.log(correctPassword)
      if (correctPassword) {
          return res.status(400).json("incorrect password");
      }
      const token = Serveur.generateAuthToken();
      
      res.status(200).send({ data: token, message: "logged in successfully" });
      console.log(token);
      console.log("log is succ");
    } catch (err) {
      console.log(err);
      return res.status(500).send(err.message);
    }
  });
module.exports = router;
