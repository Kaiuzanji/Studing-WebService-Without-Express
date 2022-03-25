const http = require('http')
const PORT = 3000
const DEFAULT_HEADER = { 'Content-Type': 'application/json' }
const userFactory = require('./../src/factories/UserFactory')
const User = require('./entities/user')
const userService = userFactory.generateInstance()
const routes = {
  default: (request, response) => {
    response.write('Hey!')
    response.end()
  },
  '/users:get': async (request, response) => {
    const { id } = request.queryString
    if(id)
      response.write(JSON.stringify(await userService.find(id)))
    else
      response.write(JSON.stringify(await userService.find()))
      response.end()
  },
  '/users:post': async (request, response) => {
    // async interator
    for await (const data of request ) {
      const item = JSON.parse(data)
      const user = new User(item)
      const { valid, error } = user.isValid()
      
      if(!valid){
        response.writeHead(400, DEFAULT_HEADER)
        response.write(JSON.stringify({ error: error.join(',') }))
        return response.end()
      }

      const id = await userService.create(user)
      response.writeHead(201, DEFAULT_HEADER)
      response.write(JSON.stringify({ success: 'User create with success!!', id }))
      return response.end()
    }
  }
}

const handleError = response => {
  return error => {
    console.log("Deu ruin**")
    response.writeHead(500, DEFAULT_HEADER)
    response.write(JSON.stringify({ error: error }))
  }
}
const handler = ( request, response ) => {
  const { url, method } = request
  const [first, route, id] = url.split('/')
  const key = `/${route}:${method.toLowerCase()}`
  
  request.queryString = { id: isNaN(id) ? id : Number(id) }
  response.writeHead(200, DEFAULT_HEADER)

  const chose = routes[key] || routes.default

  return chose(request, response)
  .catch(handleError(response))
}

http.createServer(handler)
.listen(PORT, () => {
  console.log(`Server running at ${PORT}`)
})