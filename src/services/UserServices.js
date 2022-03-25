class UserService {
  constructor({ userRepository }){
    this.userRepository = userRepository
  }

  async find(itemId){
    return await this.userRepository.find(itemId)
  }

  async create(data){
    return await this.userRepository.create(data)
  }
}

module.exports = UserService