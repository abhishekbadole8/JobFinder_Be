const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../module/userSchema");

//@desc Register a user
//@route POST /users/register
//@access public
const userRegister = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    // field empty validation
    if (!name || !email || !phone || !password) {
      res.send(400);
      throw new Error("All field's are Mandatory!");
    }
    //user email validation
    const isUserValid = await User.findOne({ email });
    if (isUserValid) {
      res.send(400);
      throw new Error("Email already in use!");
    }
    //hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.send();
  }
};

//@desc Login a user
//@route POST /users/login
//@access public
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.send(400);
      throw new Error("All field's are Mandatory!");
    }
    const user = await User.findOne({ email });

    //compare password with hash password
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: { name: user.name, email: user.email, id: user.id },
        },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: "15m" }
      );
      res.status(200).json({ accessToken });
    } else {
      res.send(401);
      throw new Error("Email or password Is InValid");
    }
  } catch (error) {
    res.status(404);
    res.json({ error: "Cann't fetch data from db!" });
  }
};

module.exports = { userRegister, userLogin };
