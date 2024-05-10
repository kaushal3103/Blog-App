
const jwt = require('jsonwebtoken');
const User = require('../model/admin');


const register = async(req, res) => {
  try {
    
    const user = await User.create({...req.body});
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};


const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Invalid username or password');
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      throw new Error('Invalid username or password');
    }
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

module.exports = {register,login};
