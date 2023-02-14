const { comparePassword } = require("../helpers/bcrypt");
const { createToken, decodeToken } = require("../helpers/jwt");
const { User } = require("../models");

class Controller {
  static async registerUser(req, res, next) {
    try {
      let { NIK, role, password } = req.body;
      let addUser = await User.create({
        NIK,
        role,
        password,
      });
      res.status(201).json(addUser);
    } catch (error) {
      next(error);
    }
  }
  static async loginUser(req, res, next) {
    try {
      let { NIK, password } = req.body;
      let findUser = await User.findOne({
        where: {
          NIK: NIK,
        },
      });

      if (!findUser) {
        throw { name: "invalid_credentials" };
      }
      const comparedPassword = comparePassword(password, findUser.password);

      if (!comparedPassword) {
        throw { name: "invalid_credentials" };
      }

      const payload = {
        id: findUser.id,
        NIK: findUser.NIK,
        role: findUser.role,
      };

      const access_token = createToken(payload);
      res.status(200).json({ payload, access_token });
    } catch (error) {
      next(error);
    }
  }

  static async profileUser(req, res, next) {
    try {
      let { access_token } = req.headers;
      if (!access_token) {
        throw { name: "invalid_token" };
      }
      let profile = decodeToken(access_token);
      res.status(201).json(profile);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
