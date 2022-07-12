
const User = require('../model/User') 
const bcrypt = require('bcryptjs')

exports.register = async (req, res, next) => {
    
    const { username, password} = req.body;
    if(password.length < 6) {
        return res.status(400).json({message : "password is less than 6 character"})
    }

    try{
        await User.create({
            username,
            password,
        }).then(user => 
            res.status(200).json({
                message : "user is successfully created",
                user,
             })
        )
    }catch(err){
        res.status(401).json({
            message: "user creation not succesful",
            error : error.message,
        })
    }
}

exports.login =  async (req, res , next) => {
    const {username, password} = req.body
        if(!username || !password){
            return res.status(400).json({
                messaage : "username or password is empty"
            })
        }
        try{
            const user =  await User.findOne({username, password})
            if(!user){
                res.status(401).json({
                    message : " login is unsuccessful",
                    error : "user not found"
                })
            }else{
                res.status(200).json({
                    messaage : " login successful",
                    user,
                })
            }
        }catch{
            res.status(400).json({
                message : "An error happened I dunno",
                error: error.messaage
            })
        }
        
    
}

exports.update =  async(req, res, next) => {
    const {role, id} = req.body

    if(role && id){
        if(role === 'admin'){
            await User.findById(id)
                .then((user) => {
                    if(user.role !== "admin"){
                        user.role = role
                        user.save((err) => {
                            if(err){
                                res.status('400')
                                .json({
                                    message : "an error occured",
                                    error : err.messaage})
                                process.exit(1)
                            }
                            res.status(201).json({
                                messaage  : "update successful",
                                user
                            })
                        })
                    }else{
                        res.status('400').json({message : "User is already an Admin"})
                    }
                })
                .catch((error) => {
                    res
                        .status('400')
                        .json({messaage : "an error happened", error : error.messaage})
                })
        }else{
            res.status(400).json({
                message : "role is not admin"
            })
        }
    }else{
        res.status('400').json({
            message : "Role Or ID is missing"
        })
    }
}


exports.deleteUser = async (req, res, next) => {
    const {id} = req.body

    await User.findById(id)
    .then(user => user.remove())
    .then(user => {
        res.status(201).json({
            messaage : "user deleted",
            user
        })
    })
    .catch(error => {
        res
            .status(400)
            .json({message : "an error occured", error : error.message})
    })
}