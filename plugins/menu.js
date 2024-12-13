const { copy } = require('fs-extra')
const config = require('../config')
const os = require('os')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, Func, fetchJson} = require('../lib/functions')
let cap = '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤\n\n> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗'
//=====================================================================================
cmd({
    pattern: "menu",
    react: "🍁",
    alias: ["panel", "list", "commands", "cmd"],
    desc: "Get bot\'s command list.",
    category: "main",
    use: '.menu',
    filename: __filename
}, async (conn, mek, m, { from, pushname, reply }) => {
    try {
        let wm = ``
        if (os.hostname().length == 12) hostname = 'replit'
        else if (os.hostname().length == 36) hostname = 'heroku'
        else if (os.hostname().length == 8) hostname = 'koyeb'
        else hostname = os.hostname()
        let monspace = '```'

        let menu = {
            main: '',
            download: '',
            group: '',
            owner: '',
            convert: '',
            search: '',
            ai: '',
            fun: '',
            other: '',
            nsfw: '',
            settings: ''
            };
            
            for (let i = 0; i < commands.length; i++) {
            if (commands[i].pattern && !commands[i].dontAddCommandList) {
            menu[commands[i].category] += `┃ 🍁⃟🧡 ${config.PREFIX}${commands[i].pattern}\n`;
             }
            }
const MNG = `${monspace}ʜᴇʟʟᴏᴡ ꜱᴀʀ 🐰 ${pushname}${monspace}
🎋 𝗛𝗲𝗹𝗹𝗼𝘄 ${@numbder} 𝗧𝗵𝗶𝘀 𝗜𝘀 𝗕𝘂𝗻𝗻𝘆 𝗠𝗗 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗟𝗶𝘀𝘁.
🍁⃟🧡 𝗕𝘂𝗻𝗻𝘆 𝗠𝗗 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 𝗟𝗶𝘀𝘁 🧡⃟🍁

╭╴╴╴╴╴ᴍᴇɴᴜ╶╶╶╶╶╮
┃
┃ 🔮 𝗕𝗢𝗧 𝗡𝗔𝗠𝗘 : > ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
┃ 📜 𝗩𝗘𝗥𝗦𝗜𝗢𝗡: ${require("../package.json").version}
┃ ⚙️ 𝗠𝗘𝗠𝗢𝗘𝗬: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
┃ 🧭 𝗥𝗨𝗡 𝗧𝗜𝗠𝗘: ${runtime(process.uptime())}
┃ 📒 𝗣𝗟𝗔𝗧𝗙𝗢𝗥𝗠: ${hostname}
║ 📆 𝗗𝗔𝗧𝗘 : 
┃ 🕛 𝗧𝗜𝗠𝗘 : 
┃ ❏» 𝚄𝚜𝚎𝚛 : ${pushname}
┃ ❏» 𝙱𝚘𝚝 : ${config.BOT_NAME}
┃ ❏» 𝙿𝚛𝚎𝚏𝚒𝚡 : ${config.PREFIX}
┃ ❏» 𝚅𝚎𝚛𝚜𝚒𝚘𝚗 : ${require('../package.json').version}
┃ ❏» 𝙿𝚕𝚊𝚝𝚏𝚘𝚛𝚖 : ${os.platform()}
┃ ❏» 𝙷𝚘𝚜𝚝 : ${os.hostname()}
┃ ❏» 𝙾𝚠𝚗𝚎𝚛 : ${config.OWNER_NAME}
┃ ❏» 𝙼𝚘𝚍𝚎 : ${config.MODE}
┃ ❏» 𝙿𝚕𝚞𝚐𝚒𝚗𝚜 : ${commands.length}
┃ ❏» 𝚄𝚙𝚝𝚒𝚖𝚎 : $${runtime(process.uptime())}
┃ ❏» 𝙼𝚎𝚖 : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
┃
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

╭╴╴╴╴╴ᴍᴇɴᴜ╶╶╶╶╶╮
┃  🏵️⃝🐥 _𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐌𝐄𝐍𝐔_
🌳⃝🕊️ ${menu.download}
┃
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

╭╴╴╴╴╴ᴍᴇɴᴜ╶╶╶╶╶╮
┃  🏵️⃝🐥 _𝐀𝐈 𝐌𝐄𝐍𝐔_
🌳⃝🕊️ ${menu.ai}
┃
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

╭╴╴╴╴╴ᴍᴇɴᴜ╶╶╶╶╶╮
┃  🏵️⃝🐥 _𝐅𝐔𝐍 𝐌𝐄𝐍𝐔_
🌳⃝🕊️ ${menu.fun}
┃
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

╭╴╴╴╴╴ᴍᴇɴᴜ╶╶╶╶╶╮
┃  🏵️⃝🐥 _𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔_
🌳⃝🕊️ ${menu.main}
┃
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

╭╴╴╴╴╴ᴍᴇɴᴜ╶╶╶╶╶╮
┃  🏵️⃝🐥 _𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔_
🌳⃝🕊️ ${menu.group}
┃
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

╭╴╴╴╴╴ᴍᴇɴᴜ╶╶╶╶╶╮
┃  🏵️⃝🐥 _𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐒 𝐌𝐄𝐍𝐔_
🌳⃝🕊️ ${menu.settings}
┃
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

╭╴╴╴╴╴ᴍᴇɴᴜ╶╶╶╶╶╮
┃  🏵️⃝🐥 _𝐒𝐄𝐀𝐑𝐂𝐇 𝐌𝐄𝐍𝐔_
🌳⃝🕊️ ${menu.search}
┃
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

╭╴╴╴╴╴ᴍᴇɴᴜ╶╶╶╶╶╮
┃  🏵️⃝🐥 _𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔_
🌳⃝🕊️ ${menu.owner}
┃
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

╭╴╴╴╴╴ᴍᴇɴᴜ╶╶╶╶╶╮
┃  🏵️⃝🐥 _𝐂𝐎𝐍𝐕𝐄𝐑𝐓 𝐌𝐄𝐍𝐔_
🌳⃝🕊️ ${menu.convert}
┃
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

╭╴╴╴╴╴ᴍᴇɴᴜ╶╶╶╶╶╮
┃  🏵️⃝🐥 _𝐔𝐒𝐄𝐅𝐔𝐋 𝐌𝐄𝐍𝐔_
🌳⃝🕊️ ${menu.other}
┃
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

╭╴╴╴╴╴ᴍᴇɴᴜ╶╶╶╶╶╮
┃  🏵️⃝🐥 _𝐍𝐒𝐅𝐖 𝐌𝐄𝐍𝐔_
🌳⃝🕊️ ${menu.nsfw}
┃
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗
`
await conn.sendMessage(from,{
    image: {url: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241123_111319.jpg?raw=true'},
    caption: MNG,
    contextInfo: {
        externalAdReply: {
            title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
            body: 'An Interesting WhatsApp User Bot',
            mediaType: 1,
            sourceUrl: "https://github.com/NIKO-PAMIYA",
            thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
            renderLargerThumbnail: true,
            showAdAttribution: true
        }
    }
})

        
    } catch (e) {
        reply('ɪᴀᴍ ꜱᴏʀʀʏ ꜱᴀʀ ᴇʀʀᴏ 😪')
        console.log(e)
    }
})
