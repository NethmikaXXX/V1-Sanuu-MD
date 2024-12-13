const config = require('../config')


const {
    cmd,
    commands
} = require('../command')
const {
    getBuffer,
    getGroupAdmins,
    getRandom,
    h2k,
    isUrl,
    Json,
    runtime,
    sleep,
    fetchJson
} = require('../lib/functions')


//====================================

cmd({
    pattern: "ai",
    alias: "chtgpt",
    use: '.bot <text>',
    react: "🧩",
    desc: "Chatgpt search",
    category: "search",
    filename: __filename
    },
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
const chtgpt = await fetchJson(`https://api.fgmods.xyz/api/info/openai2?text=${q}&apikey=2KkG5kuM`)
const data = chtgpt.result;
const react = await conn.sendMessage(from, { text: data }, { quoted: mek });
await conn.sendMessage(from, { react: { text: '🤔', key: react.key } });
await conn.sendMessage(from, { react: { text: '✔️', key: mek.key }})
}
    )
            
cmd({
    pattern: "puzzy",
    alias: "xxx",
    use: 'puzzy',
    react: "❌",
    desc: "puzzy image shower",
    category: "search",
    filename: __filename
    },
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
 
let shadow = await conn.sendMessage(from, { image: { url: `https://api.fgmods.xyz/api/nsfw/pussy?apikey=2KkG5kuM` }, caption: "@powerd by kavishan_OFC" }, { quoted: mek });
await conn.sendMessage(from, { react: { text: '🤔', key: shadow.key } });
await conn.sendMessage(from, { react: { text: '✔️', key: mek.key }})
}
    )
