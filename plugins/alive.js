const config = require('../config')
const {cmd , commands} = require('../command')

cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
return await conn.sendMessage(from,{image: {url:20241123_110122.jpg},caption: 🐣⃟💚 Hellow ${pushnumber} . ɪᴀᴍ ᴀʟɪᴠᴇ ɴᴏᴡ `Type .menu To Get Command Of My Bot`.

 📅 ${tiny('Date Today')} : ${dayToday().date}
 ⌚ ${tiny('Time Now')} : ${dayToday().time}
\`\`\`
> 🕊️ USER : ${pushName}
> 🕊️ BOT : > ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> 🕊️ PREFIX: ${prefix}
> 🕊️ VERSION : ${require('../../package.json').version}
> 🕊️ PLATFORM : ${os.platform()}
> 🕊️ HOST : ${os.hostname()}
> 🕊️ OWMER : ${Config.ownername}
> 🕊️ MODE : ${bot.worktype}
> 🕊️ PLUGINS : ${commands.length}
> 🕊️ USER : ${await totalUsers()}
> 🕊️ UPTIME : ${formatRuntime(process.uptime())}
> 🕊️ MEMORY : ${getMemoryInfo().usedMemory}/${getMemoryInfo().totalMemory}\`\`\`},{quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
})
