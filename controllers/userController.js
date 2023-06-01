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
      res.status(400);
      throw new Error("All field's are Mandatory!");
    }
    //user email validation
    const isUserValid = await User.findOne({ email });
    if (isUserValid) {
      res.status(400);
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
    res.status(404);
    console.log(error);
  }
};

//@desc Login a user
//@route POST /users/login
//@access public
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ status: 400, error: "All field's are Mandatory!" });
      
    }
    const user = await User.findOne({ email });
    //compare password with hash password
    if (user && (await bcrypt.compare(password, user.password))) {
      const AccessToken = jwt.sign(
        {
          user: { name: user.name, email: user.email, id: user.id },
        },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: "10h" }
      );
      res.status(200).json({ name: user.name, AccessToken });
    } else {
      res.status(401);
      throw new Error("Email or password Is InValid");
    }
  } catch (error) {
    res.status(404);
    res.json({ error: error.message });
  }
};

module.exports = { userRegister, userLogin };
