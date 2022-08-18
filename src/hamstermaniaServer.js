// Hamstermania node server
var GMServer = require('../index.js').Server;
var ClientManager = require('../index.js').ClientManager;
var port = 3001;

var commandHandlers = {

	register: function (socket) {
		var playerId = Date.now().toString();
		console.info("Player registered: " + playerId + ", clientId: " + socket.clientId);
		socket.set('playerId', playerId);
		socket.send('register', {
			playerId: playerId,
			clientId: socket.clientId,
		});
	},

	unregister: function (socket, data) {
		gameManager.getClients()
		  .filter(client => client.clientId != data.clientId)
		  .forEach(client => client.send('unregister', {
			removePlayerId: data.removePlayerId,
		  }));
	},

	playerPosition: function (socket, data) {
		console.info("playerPosition update, playerId: " + data.playerId);
		gameManager.getClients()
			.forEach(client => client.send('playerPosition', {
				playerId: data.playerId,
				positionX: data.positionX,
				positionY: data.positionY,
				playerDirection: data.playerDirection,
				colorBlend: data.colorBlend,
				clientId: socket.clientId,
				nick: data.nick,
				color: data.color
			}));
	},

	bulletCreate: function (socket, data) {
		gameManager.getClients()
			.forEach(client => client.send('bulletCreate', {
				positionX: data.positionX,
				positionY: data.positionY,
				vspd: data.vspd,
				hspd: data.hspd,
				bulletDirection: data.bulletDirection
			}));
	},

	message: function (socket, data) {
		console.info("Message: ", data);
		gameManager.getClients()
			.forEach(client => client.send('message', {
				message: data.message,
				author: socket.clientId
			}));
	}
};

var gameManager = new ClientManager();

gameManager.addCommandListener('register', commandHandlers.register);
gameManager.addCommandListener('unregister', commandHandlers.unregister);
gameManager.addCommandListener('playerPosition', commandHandlers.playerPosition);
gameManager.addCommandListener('bulletCreate', commandHandlers.bulletCreate);
gameManager.addCommandListener('message', commandHandlers.message);

var server = new GMServer(function (client) {
	gameManager.addClient(client);
});

server.listen(port, function () {
	console.info('Server is running on port ' + port);
});
