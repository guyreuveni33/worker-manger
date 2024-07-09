const UsersRepo = require('../repository/users');

class Users {
  async initialize() {
    this.repo = new UsersRepo();
  }

  async findUser(query, projection = {}) {
    const user = await this.repo.findOne(query, projection);
    return user;
  }

  async getAllUsers() {
    const users = await this.repo.findAll();
    return users;
  }

  async createUser(data) {
    const newUser = await this.repo.create(data);
    return newUser;
  }

  async updateUser(id, data) {
    const updatedUser = await this.repo.updateById(id, data);
    return updatedUser;
  }

  async deleteUser(id) {
    const deletedUser = await this.repo.deleteById(id);
    return deletedUser;
  }
  async getManagerAndEmployees(managerName) {
    try {
      console.log(`Searching for manager with name: ${managerName}`);
      const manager = await this.repo.findOne({ firstName: managerName });

      if (!manager) {
        console.log(`Manager not found: ${managerName}`);
        throw new Error('Manager not found');
      }

      console.log(`Found manager: ${JSON.stringify(manager)}`);
      const employees = await this.repo.findAll({ manager: managerName });
      console.log(`Found employees: ${JSON.stringify(employees)}`);

      return { manager, employees };
    } catch (err) {
      console.error('Error in getManagerAndEmployees service:', err);
      throw err;
    }
  }

}

module.exports = Users;
