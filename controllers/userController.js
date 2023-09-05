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
      return res.status(400).json({ message: "All field's are Mandatory!" });
    }

    //user email validation
    const isUserValid = await User.findOne({ email });

    if (isUserValid) {
      return res.status(400).json({ message: "Email already in use!" });
    }

    //hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(200).json({ message: "User Created" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message });
  }
};

//@desc Login a user
//@route POST /users/login
//@access public
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All field's are Mandatory!" });
    }

    const user = await User.findOne({ email });

    //compare password with hash password
    if (user && (await bcrypt.compare(password, user.password))) {
      //Generate token
      const AccessToken = jwt.sign(
        {
          name: user.name,
          id: user.id,
        },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: "1d" }
      );

      res.status(200).json(AccessToken);
      
    } else {
      res.status(401).json({ message: "Email or password Is InValid" });
    }
  } catch (error) {
    res
      .status(500)
      .json({message: error.message });
  }
};

module.exports = { userRegister, userLogin };
