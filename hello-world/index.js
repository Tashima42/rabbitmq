const q = 'tasks'

const open = require("amqplib").connect("amqp://localhost")

function publish(message) {
	open.then(function(conn) {
		return conn.createChannel()
	}).then(function(ch) {
		return ch.assertQueue(q).then(function(ok) {
			return ch.sendToQueue(q, Buffer.from(message))
		})
	}).catch(console.warn)
}

function consume() {
	open.then(function(conn) {
		return conn.createChannel()
	}).then(function(ch) {
		return ch.assertQueue(q).then(function(ok) {
			return ch.consume(q, function(msg) {
				if(msg !== null) {
					console.log(msg.content.toString())
					//ch.ack(msg)
				}
			})
		})
	}).catch(console.warn)
}

publish('amongus')
consume()

