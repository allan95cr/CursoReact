const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.CreateUser = async (req, resp) => {
  try {
    // Validar el resultado de la validacion de campos del usersroute
    const validationList = validationResult(req);
    if (!validationList.isEmpty()) {
      return resp.status(400).json({ error: validationList.array() });
    }

    // Extraer email y password
    const { email, password } = req.body;

    // Validar que el usuario sea unico
    let user = await User.findOne({ email });

    if (user) {
      return resp.status(400).json({ msg: "El usuario ya existe" });
    }

    // Crea el nuevo usuario
    user = User(req.body);

    // Hashear el password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    // Guardar usuario
    await user.save();

    // Mensaje de confirmacion
    resp.json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    console.log(error);
    resp.status(400).send("Hubo un error");
  }
};
