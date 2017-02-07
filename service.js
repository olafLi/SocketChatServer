var server = require('net').createServer()
var clientList = []
server.on('listening', () => {
    console.log('Server is listening on port')
})

server.on('connection', (socket) => {
    socket.setEncoding('utf8')
    socket.write("Hello! You can start typing. Type 'quit' to exit.\n")
    clientList.push(socket)
    socket.on('data', (data) => {
        broadcast(data, socket)
    });

    socket.on('end', () => {
        clientList.splice(clientList.indexOf(socket), 1)
        console.log('Client connection ended');
    })
})

function broadcast(message, client) {
    for (var i = 0; i < clientList.length; i++) {
        if (client !== clientList[i]) {
            clientList[i].write(client.name + " says " + message)
        }
    }
}

server.on('end', () => {
    console.log("Server is now closed")
})
server.on('error', (error) => {
    console.log('Error occurred:', error.message);
})

server.listen(9000);
