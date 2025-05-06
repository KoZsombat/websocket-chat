const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static(path.join(__dirname, 'public'))) 

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

io.on('connection', (socket) => {
  console.log('User connected')
  socket.on('msgtoserver', (name, msg) => {
    io.emit('msgtoclient', name, msg)
  })
})

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
