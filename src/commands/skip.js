const execute = (bot, msg, args) => {
    var server = server[message.guild.id];
    if (server.dispatcher) {
        server.dispatcher.end()
    }
}

module.exports = {
    name: "skip",
    help: "pula para a proxima musica",
    execute
}