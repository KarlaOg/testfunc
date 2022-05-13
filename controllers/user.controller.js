const models = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getAllUser = async (req, res) => {
  const user = await models.User.findAll({ where: req.query });
  res.send(user);
};

const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // console.log(req.body);
    // Validate user input
    if (!password) {
      res.status(400).send('password is required');
    }
    if (!email) {
      res.status(400).send('email is required');
    }
    if (!firstname) {
      res.status(400).send('firstname is required');
    }
    if (!lastname) {
      res.status(400).send('lastname is required');
    }

    // Create user in our database
    const user = await models.User.create({
      firstname,
      lastname,
      email,
      password,
    });

    const token = jwt.sign(
      { user_id: user._id, email, role: 'role_user' },
      process.env.TOKEN_KEY,
      {
        expiresIn: '3h',
      }
    );
    user.token = token;

    res.status(201).json(user);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: { id: req.params.id },
    });
    return res.status(200).json({ user });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).send(error.message);
    } else {
      res.sendStatus(500);
    }
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await models.User.update(req.body, {
      where: { id: req.params.id },
    });
    return res.status(200).json({ user });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).send(error.message);
    } else {
      res.sendStatus(500);
    }
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await models.User.destroy({
      where: { id: req.params.id },
    });
    return res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).send(error.message);
    } else {
      res.sendStatus(500);
    }
  }
};

const login = async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send('All input is required');
    }
    // Validate if user exist in our database
    const user = await models.User.findOne({
      where: { email: req.body.email },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token

      const token = jwt.sign(
        { user_id: user._id, email, role: 'role_user' },
        process.env.TOKEN_KEY,
        {
          expiresIn: '3h',
        }
      );

      // user
      return res.status(200).json({ token });
    }
    res.status(400).send('Invalid Credentials');
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
};
