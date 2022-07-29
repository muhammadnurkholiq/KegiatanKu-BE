// model
const { user } = require("../../models");

// update user
exports.updateUser = async (req, res) => {
  try {
    // get id user
    const id = req.user.id;

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
        exclude: ["createdAt", "updatedAt", "password", "role"],
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
exports.deleteUser = async (req, res) => {
  try {
    // get id user
    const id = req.user.id;

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
