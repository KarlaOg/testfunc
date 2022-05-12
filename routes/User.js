const { Router }  = require("express");
const { User } = require("../models")
const router = new Router();

router.get("/", async (req,res) =>{
    const user = await User.findAll({where: req.query});
    res.send(user);
});

router.post("/", async (req,res) => {
    try{
        const user = await User.create(req.body);
        res.status(201).send(user);
    }
    catch (error){
        if (error.name === "SequelizeValidationError"){
            res.status(400).send(error.message);
        }
        else{
            res.sendStatus(500);
        }
    }
});

modele.exports = router;