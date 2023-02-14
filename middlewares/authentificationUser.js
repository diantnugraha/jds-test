const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/");

async function authenticationUser(request, respone, next) {
  try {
    let access_token = request.headers.access_token;

    if (!access_token) {
      throw { name: "Unauthorized" };
    }

    let payload = verifyToken(access_token);
    if (payload.role == "user") {
      let user = await User.findOne({
        where: {
          id: payload.id,
        },
      });
      if (!user) {
        throw { name: "Unauthorized" };
      }
      request.user = {
        id: user.id,
        role: user.role,
      };
    } else {
      throw { name: "Unauthorized" };
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { authenticationUser };
