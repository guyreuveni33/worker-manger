const usersModel = require('../models/users');

class Users {
  async findOne(query, projection = {}) {
    const user = await usersModel.findOne(query).select(projection);
    return user;
  }

  async findAll(query = {}) {
    const users = await usersModel.find(query);
    return users;
  }

  async create(data) {
    const newUser = new usersModel(data);
    const savedUser = await newUser.save();
    return savedUser;
  }

  async updateById(id, data) {
    const updatedUser = await usersModel.findByIdAndUpdate(id, data, { new: true });
    return updatedUser;
  }

  async deleteById(id) {
    const deletedUser = await usersModel.findByIdAndDelete(id);
    return deletedUser;
  }
}

module.exports = Users;
