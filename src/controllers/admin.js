// model
const { user } = require("../../models");

// get all user
exports.adminGetUsers = async (req, res) => {
  try {
    // get data user
    const userData = await user.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    // condition if user data not found
    if (userData == "") {
      return res.send({
        status: "Success",
        message: "User data not found",
      });
    }

    // response
    res.status(200).send({
      status: "Success",
      message: "User data found",
      data: userData,
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: error,
    });
    console.log(error);
  }
};

// get user
exports.adminGetUser = async (req, res) => {
  try {
    // get id params
    const { id } = req.params;

    // get data user
    const userData = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    // condition if user data not found
    if (userData == null) {
      return res.send({
        status: "Success",
        message: "User data not found",
      });
    }

    // response
    res.status(200).send({
      status: "Success",
      message: "User data found",
      data: userData,
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: error,
    });
    console.log(error);
  }
};

// update user
exports.adminUpdateUser = async (req, res) => {
  try {
    // get id params
    const { id } = req.params;

    // get input data
    const data = req.body;

    // update data user
    await user.update(data, {
      where: {
        id,
      },
    });

    // get data user
    const userData = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    // response
    res.status(200).send({
      status: "Success",
      message: "User data updated successfully",
      data: userData,
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: error,
    });
    console.log(error);
  }
};

// delete user
exports.adminDeleteUser = async (req, res) => {
  try {
    // get id params
    const { id } = req.params;

    // delete user
    await user.destroy({
      where: {
        id,
      },
    });

    // response
    res.status(200).send({
      status: "Success",
      message: "User data deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: error,
    });
    console.log(error);
  }
};
