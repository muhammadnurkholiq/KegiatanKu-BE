// model
const { todo, user } = require("../../models");

// add todo
exports.addTodo = async (req, res) => {
  try {
    // get id user
    const idUser = req.user.id;

    // get data input
    const data = req.body;

    // check data exist
    const dataExist = await todo.findOne({
      where: {
        name: data.name,
        idUser,
      },
    });

    if (dataExist) {
      return res.status(200).send({
        status: "Failed",
        message: "Activity has been added",
      });
    }

    // create activity
    const newTodo = await todo.create({
      name: data.name,
      status: "unfinished",
      idUser,
    });

    // get data
    const dataTodo = await todo.findOne({
      where: {
        id: newTodo.id,
        idUser,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    // response
    res.status(200).send({
      status: "Success",
      message: "Activity added successfully",
      data: dataTodo,
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: "Status error",
    });
    console.log(error);
  }
};

// get all todo
exports.getTodos = async (req, res) => {
  try {
    // get id user
    const idUser = req.user.id;

    // get all data
    const dataTodos = await todo.findAll({
      where: { idUser },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "role"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    // check data exist
    if (!dataTodos) {
      return res.status(200).send({
        status: "Success",
        message: "Todo data not found",
      });
    }

    // response
    res.status(200).send({
      status: "Success",
      message: "Todo data found",
      data: dataTodos,
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: "Server error",
    });
    console.log(error);
  }
};

// get todo
exports.getTodo = async (req, res) => {
  try {
    // get id user
    const idUser = req.user.id;

    // get id params
    const { id } = req.params;

    // get data
    const dataTodo = await todo.findOne({
      where: {
        id,
        idUser,
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "role"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    // response
    res.status(200).send({
      status: "Success",
      message: "Todo data found",
      data: dataTodo,
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: "Server error",
    });
    console.log(error);
  }
};

// update todo
exports.updateTodo = async (req, res) => {
  try {
    // get id user
    const idUser = req.user.id;

    // get id params
    const { id } = req.params;

    // get data input
    const data = req.body;

    // update data
    await todo.update(data, {
      where: {
        id,
        idUser,
      },
    });

    // get data
    const newTodo = await todo.findOne({
      where: {
        id,
        idUser,
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "role"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    // response
    res.status(200).send({
      status: "Success",
      message: "Todo data updated successfully",
      data: newTodo,
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: "Server error",
    });
    console.log(error);
  }
};

// delete todo
exports.deleteTodo = async (req, res) => {
  try {
    // get id user
    const idUser = req.user.id;

    // get id params
    const { id } = req.params;

    // delete data
    await todo.destroy({
      where: {
        id,
        idUser,
      },
    });

    // response
    res.status(200).send({
      status: "Success",
      message: "Todo data deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: "Server error",
    });
    console.log(error);
  }
};
