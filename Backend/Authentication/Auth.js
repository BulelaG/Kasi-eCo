const express = require('express')
const router = express.Router()
const db = require("../models")
const Trader = db.trader
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')



//REGISTER
router.post("/register-tutor", async (req, res) => {

    
    let tut = {
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
       contact: req.body.contact,
        subject: req.body.subject,
        grades: req.body.grades,
        img: req.body.img,
        location: req.body.location,
        document: req.body.document,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    }

    console.log(tut)
    const newTutor = new Tutor(tut);
  
    try {
      const savedTutor = await newTutor.save();
      res.status(201).json(savedTutor);
    } catch (err) {
        console.log(err)
      res.status(500).json(err);
    }
  });
  
  //LOGIN
  
  router.post('/login-tutor', async (req, res) => {
    
      try{
        
          const tutor = await Tutor.findOne(
              {
                  username: req.body.username
              }
          );
              
          !tutor && res.status(401).json("Wrong User Name");
          console.log(tutor)
          const hashedPassword = CryptoJS.AES.decrypt(
              tutor.password,
              process.env.PASS_SEC
          );
          
          console.log(hashedPassword)
  
          const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
  
          const inputPassword = req.body.password;
          console.log("Hey there..")
          originalPassword != inputPassword && 
              res.status(401).json("Wrong Password");
  
          const accessToken = jwt.sign(
          {
              id:tutor._id,
          },
          process.env.JWT_SEC,
              {expiresIn:"3d"}
          );
    
          const { password, ...others } = tutor._doc;  
          res.status(200).json({...others, accessToken});
  
      }catch(err){
          res.status(500).json(err);
      }
  
  });
  
  module.exports = router;