import express from "express";
import bcrypt from "bcrypt"
import UserDB from '../models/User.js'
import  Jwt  from "jsonwebtoken";

const router=express.Router();

router.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) throw new Error("User already exists");
        const userData = new UserDB({
          name,
          email,
          password: hashedPassword,
          
        });
        const token = Jwt.sign({ _id: userData._id }, "blogSecret", {
          expiresIn: "24h",
        });
        userData.token = token;
        userData
          .save()
          .then((response) => res.status(200).send(response))
          .catch((err) =>{
            res.status(404).send("User already exists, Please try logging In")
            console.log(err)
          }
        
          
         
           
          );
      });
    } catch (error) {
      res.status(404).send("User already exists, Please try logging In");
      console.log(error)
    }
  });

  router.post("/login", async (req, res) => {
    try {
      let user = await UserDB.findOne({ email: req.body.email });
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) throw new Error("Invalid Credentials");
  
          if (result) {
            const token = Jwt.sign({ _id: user._id }, "blogSecret", {
              expiresIn: "10h",
            });
          
            res.status(200).send({user:user,token:token});
            
          } else {
            res.status(404).send("Invalid Credentials");
          }
        });
      } 
    } catch (error) {
      res.status(404).send("Invalid Credentials");
      console.log(error)
    }
  });
 

  export default router;