const UserTable = require('../dataBase/database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
//login section
exports.login = async (req,res)=> {
    const {name,email, password} = req.body;
    const userData = {
        name,
        email,
        password
    };
    const token = jwt.sign(userData,process.env.JWT_SECRET)
    const user =  await UserTable.findOne({email})

    if(user && bcrypt.compareSync(password, user.password)){
        res.json({message: 'your login successfull',token})
     
    }else{
        res.json({message: "your email or password inccret"})
    }
  

}

//register section
exports.register = async (req,res) => {
    const {name, email, password} =  req.body
    const user = UserTable({
        name,
        email,
        password: bcrypt.hashSync(password, 8)
    })

    try {
       await user.save();
        res.status(200).json({message: "the new user registered"})
    } catch (e) {
     throw e ;
      
    }

}


//about section
exports.me = (req,res,next) => {
    res.json({message: "hello from me section"})

}

