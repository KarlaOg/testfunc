const models = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
require('dotenv').config();


const getAllUser = async (req, res) => {
  const user = await models.User.findAll({ where: req.query });
  res.send(user);
};

const createUser = async (req, res) => {
  try {
    // const user = await models.User.create(req.body);
    // console.log(user)

    // const token = jwt.sign(
    //   { user_id: user._id, email },
    //   process.env.TOKEN_KEY,
    //   {
    //     expiresIn: "2h",
    //   }
    // );
    // // save user token
    // user.token = token;

    // res.status(201).send(user);
    const { firstname, lastname, email, password } = req.body;

    // Validate user input
    if (!(email && password && firstname && lastname)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    // const oldUser = await models.User.findOne({ where : {email: req.body.email}});

    // if (oldUser) {
    //   return res.status(409).send("User Already Exist. Please Login");
    // }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

  

    // Create user in our database
    const user = await models.User.create({
      firstname,
      lastname,
      email,
      password: encryptedPassword,
    
    });

    const token = jwt.sign(
      { user_id: user._id, email, role: 'role_user' },
      process.env.TOKEN_KEY,
      {
        expiresIn: "3h",
      }
    );
    user.token = token; 
    console.log(user.token)

    res.status(201).json(user);
  }
  catch (error) {
    if (error.name === "SequelizeValidationError") {
      res.status(400).send(error.message);
    }
    else {
      res.status(500).send(error.message);
    }
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await models.User.findOne({

      where: { id: req.params.id }
    });
    return res.status(200).json({ user });
  }
  catch (error) {
    if (error.name === "SequelizeValidationError") {
      res.status(400).send(error.message);
    }
    else {
      res.sendStatus(500);
    }
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await models.User.update(req.body, {
      where: { id: req.params.id }
    });
    return res.status(200).json({ user });
  }
  catch (error) {
    if (error.name === "SequelizeValidationError") {
      res.status(400).send(error.message);
    }
    else {
      res.sendStatus(500);
    }
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await models.User.destroy({
      where: { id: req.params.id }
    });
    return res.status(200).json({
      message: "User deleted successfully",
    });
  }
  catch (error) {
    if (error.name === "SequelizeValidationError") {
      res.status(400).send(error.message);
    }
    else {
      res.sendStatus(500);
    }
  }
};


module.exports = {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser
}
