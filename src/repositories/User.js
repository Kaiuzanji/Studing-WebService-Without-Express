const { readFile, writeFile } = require('fs/promises')
class User {
  constructor({ file }){
    this.file = file
  }

  async _currentFileContent(){
    return JSON.parse(await readFile(this.file))
  }

  async find(itemId){
    const all = await this._currentFileContent()
    if(!itemId)
      return all
    else
      return all.find( user => user.id == itemId)
  }

  async create(data){
    const currentFile = await this._currentFileContent()
    currentFile.push(data)
    return await writeFile(this.file, JSON.stringify(currentFile, null, 2))
    .then( res => data.id )
    .catch( err => console.error(err))
  }
}

module.exports = User;