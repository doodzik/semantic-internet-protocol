import { Client, Server } from './simpleTcp'

var server = new Server()
server.use(data => console.log(data))
server.listen(5442)

var client = new Client()
client.send('hallo world')
