const express = require("express");
const router = express.Router();
const User = require("../model/user");
const UserSession = require("../model/UserSession");




router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
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
  const { email, password } = req.body;
  try {
    const user = await User.find({ email, password });
    if (user.length > 0) {
      const currentUser = {
        name: user[0].name,
        email: user[0].email,
        _id: user[0].Id,
      };
      res.status(200).send(currentUser);
    } else {
      res.status(400).json({
        message: "Login Failed",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Something Went wrong",
    });
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


router.get('/logout',(req,res)=>{
  console.log('hello my logout page');
  res.clearCookie('jwtoken',{path:'/'});
  res.status(200).send('User logout');
})

module.exports = router;
