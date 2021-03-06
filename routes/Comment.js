const { Router }  = require("express");
const { Article } = require("../models")
const router = new Router();

router.get("/", async (req,res) =>{
    const articles = await Article.findAll({where: req.query});
    res.send(articles);
});

router.post("/", async (req,res) => {
    try{
        const article = await Article.create(req.body);
        res.status(201).send(article);
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