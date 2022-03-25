const UserRepository = require('./../repositories/User')
const UserService = require('./../services/UserServices')

const { join } = require('path')
const filename = join(__dirname, '../../database', 'users.json')

const generateInstance = () => {
  const userRepository = new UserRepository({
    file: filename 
  })

  const userService = new UserService({
    userRepository
  })

  return userService
}

module.exports = { generateInstance };

