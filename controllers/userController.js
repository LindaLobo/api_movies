const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const User = db.users;

const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
    };
    //reviso el usuario
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });
    //generar el token con la clave secreta y establece cookie para la misma
    if (user) {
      throw new Error("Usuario ya Existe");
    }
    await User.create(data);
    return res.status(201).send("USUARIO CREADO CON EXITO");
  } catch (error) {
    console.log(error);
    return res.status(409).send("ERROR EN LOS DATOS INGRESADOS");
  }
};

//login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //encuentra el usuario por email
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    //compara la clave con bcrypt
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      //genera un token con la clave secreta y establece cookie

      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.clavesecreta, {
          // expiresIn: 1 * 24 * 60 * 60 * 1000,
        });
        return res.status(201).send({ message: token });
      } else {
        return res.status(401).send("ERROR DE AUTENTIFICACION");
      }
    } else {
      return res.status(401).send("El usuario no existe");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup,
  login,
};
