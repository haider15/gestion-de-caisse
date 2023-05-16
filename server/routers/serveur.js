const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const serveur = require("../model/serveur");



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
    const users = await serveur.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(404).json({ message: error.stack });
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

router.put("/:id",async(req,res)=>{
  try {
      const {id} = req.params;

      const updateduser = await serveur.findByIdAndUpdate(id,req.body,{
          new:true
      });

      console.log(updateduser);
      res.status(201).json(updateduser);

  } catch (error) {
      res.status(422).json(error);
  }
})





// PUT http://localhost:5000/api/serveur/id
// Update data len server
// router.put("/:id", async (req, res) => {
//   const { firstName, cin, email, password } = req.body;
//   // Check name
//   if (!firstName)
//     return res
//       .status(400)
//       .json({ success: false, message: "Name is required" });

//   console.log(req.params.id);
//   try {
//     // All good
//     let updateserveur = {
//         firstName,
//         cin,
//         email,
//         password,
//     };
//     const conditionUpdated = { _id: req.params.id };
//     updateserveur = await serveur.findOneAndUpdate(
//       conditionUpdated,
//       updateserveur,
//       {
//         new: true,
//       }
//     );
//     res.send({ success: true, serveur: updateserveur });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

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
  // const conditionFilter = { catelory: req.params.id };
  const id=req.params.id
  try {
    const users = await serveur.findById({_id:id});
    res.status(200).send(users);
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
});




router.post("/login", async (req, res) => {
  try {
  
    const user = await serveur.findOne( {email:req.body.email} );
    console.log(user)
    if (!user) {
        return res.status(404).send("user not found");
    }

    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    console.log(correctPassword)
    if (correctPassword) {
        return res.status(400).json("incorrect password");
    }
    const token = user.generateAuthToken();
  
    
    res.status(200).send({ user, data: token , message: "logged in successfully" });
    console.log(token);
    console.log("log is succ");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});






module.exports = router;
