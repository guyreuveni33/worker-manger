const { ObjectId } = require('mongodb')
const Users = require('../lib/users')
const users = new Users()

/**
 * Gets user by id
 */
exports.getUserById = async ctx => {
  const { id } = ctx.params
  try {
    console.log(1)
    const user = await users.findUser({ _id: new ObjectId(id) })

    ctx.status = 200
    ctx.body = user
  } catch (err) {
    ctx.status = err.status || 500
    ctx.message = err.message || 'Internal server error'
  }
}
exports.getAllUsers = async ctx => {
  try {
    const allUsers = await users.getAllUsers();
    ctx.status = 200;
    ctx.body = allUsers;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
};

exports.createUser = async ctx => {
  try {
    const newUser = await users.createUser(ctx.request.body);
    ctx.status = 201;
    ctx.body = newUser;
  } catch (err) {
    ctx.status = err.status || 400;
    ctx.message = err.message || 'Bad Request';
  }
};

exports.updateUser = async ctx => {
  const { id } = ctx.params;
  try {
    const updatedUser = await users.updateUser(id, ctx.request.body);
    ctx.status = 200;
    ctx.body = updatedUser;
  } catch (err) {
    ctx.status = err.status || 400;
    ctx.message = err.message || 'Bad Request';
  }
};

exports.deleteUser = async ctx => {
  const { id } = ctx.params;
  try {
    await users.deleteUser(id);
    ctx.status = 204;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
};
exports.getManagerAndEmployees = async ctx => {
  const { managerName } = ctx.params;
  try {
    const result = await users.getManagerAndEmployees(managerName);
    if (!result) {
      ctx.status = 404;
      ctx.message = 'Manager not found';
      return;
    }
    ctx.status = 200;
    ctx.body = result;
  } catch (err) {
    console.error('Error in getManagerAndEmployees:', err);
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
};




async function initialize() {
  await users.initialize();
}

initialize()