const search = require('yt-search');
const ytdl = require('ytdl-core-discord');


const execute = (bot, msg, args) => {
    const s = args.join(" ");
    try {
        search(s, (err, result) => {
            if (err) {
                throw err;

            } else if (result && result.videos.length > 0) {
                const song = result.videos[0];
                playSong(bot, msg, song);
                return msg.channel.send(`Tocando **${result.videos[0].title}** com duração de ${result.videos[0].duration}`)

            } else {
                return msg.reply("digita essa merda direito pq eu nao achei a musica")
            }

        })

    } catch (e) {
        console.log(e);
    }

};

const playSong = async (bot, msg, song) => {
    let queue = bot.queues.get(msg.member.guild.id);
    if (!song) {
        if (queue) {
            queue.connection.disconnect();
            bot.queues.delete(msg.member.guild.id)
        }
    } if (!msg.member.voice.channel) {
        return msg.reply("ENTRA NUM CANAL DE VOZ SEU MERDA, NAO VOU FICAR TOCANDO MUSICA PRA NGM OUVIR NAO")
    }
    if (!queue) {
        const conn = await msg.member.voice.channel.join()
        queue = {
            volume: 10,
            connection: conn,
            dispatcher: null,
            songs: [song]
        };

        queue.dispatcher = await queue.connection.play(
            await ytdl(song.url, { highWaterMark: 1 << 25, filter: "audioonly" }), {
            type: "opus"
        });
        queue.dispatcher.on("finish", () => {
            queue.songs.shift();
            playSong(bot, msg, queue.songs[0])

        })
        bot.queues.set(msg.member.guild.id, queue)

    } else {
        queue.songs.push(song);
        bot.queues.set(msg.member.guild.id);

    }



};


module.exports = {
    name: "play",
    help: "toca musica",
    execute
}