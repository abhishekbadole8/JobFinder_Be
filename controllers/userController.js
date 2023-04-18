const User = require("../module/userSchema");

//@desc Register a user
//@route POST /users/register
//@access public
const userRegister = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name && !email && !phone && !password) {
      res.status(400);
      throw new Error("All field are mandatory!");
    }
    const user = await User.create({
      name,
      email,
      phone,
      password,
    });
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.send();
    
  }
};
module.exports = { userRegister };
