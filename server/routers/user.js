const express = require("express");
const router = express.Router();
const { User  } = require("../model/user");
const UserSession = require("../model/UserSession");
const bcrypt = require("bcrypt");



router.post("/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const newUser = new User({ firstName,lastName, email, password });
  try {
    newUser.save();
    res.status(200).json({
      success: true,
      message: "Register success",
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
  
    const user = await User.findOne( {email:req.body.email} );
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
    
    res.status(200).send({ data: token, message: "logged in successfully" });
    console.log(token);
    console.log("log is succ");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});



router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
});

router.post("/deleteuser", async (req, res) => {
  const userid = req.body.userid;
  try {
    await User.findOneAndDelete({ _id: userid });
    res.status(200).send("User Deleted");
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
});


//logout
// router.get("/logout", (req, res, next) => {
//   const { query } = req;
//   const { token } = query;

//   UserSession.findOneAndUpdate(
//     {
//       _id: token,
//       isDeleted: false,
//     },
//     {
//       $set: {
//         isDeleted: true,
//       },
//     },
//     null,
//     (err, sessions) => {
//       if (err) {
//         console.log(err);
//         return res.send({
//           success: false,
//           message: "Error: Server error",
//         });
//       }

//       return res.send({
//         success: true,
//         message: "good",

//       });
//     }
//   );
// });


router.post('/logout', (req, res) => {
  console.log('hello my logout page');
  res.clearCookie('jwtoken', { path: '/login' });
  res.status(200).send('User logout');
})

module.exports = router;
