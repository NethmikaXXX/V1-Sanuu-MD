const { cmd, command } = require('../command');
const config = require('../config');
const os = require("os");
const { runtime, fetchJson } = require('../lib/functions');

// alive
cmd({
    pattern: "alive",
    desc: "Check if bot is online.",
    react: "🍁",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const alive = 'https://raw.githubusercontent.com/Niko-AND-Janiya/BUNNY-DATA/refs/heads/main/Voice/AUD-20241111-WA0117.aac'

        let img = await fetchJson('20241123_110122.jpg');
        let ALIVE_IMG = img.alive;
        let aliveMsg = `
🕊️⃟ 𝙷𝚎𝚕𝚕𝚘𝚠 𝙳𝚎𝚊𝚛 𝙸'𝚖 𝙾𝚗𝚕𝚒𝚗𝚎 𝙽𝚘𝚠  ⃟🕊️

✘◍ My name is Sanuu MD.
❏ Use the menu command to explore my features.

╭╴╴╴╴╴ᴛᴏᴅᴀʏ ɪɴꜰᴏ╶╶╶╶╶╮
┃ 📅 Date: ${new Date().toLocaleDateString()}
┃ ⌚ Time: ${new Date().toLocaleTimeString()}
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

╭╴╴╴╴╴ʙᴏᴛ ꜱᴛᴀᴛᴜꜱ╶╶╶╶╶╮
┃🗣️ User: ${m.pushname || 'User'}
┃🤖 Bot: Sanuu MD User Bot
┃📜 Prefix: ${config.PREFIX}
┃📚 Version: ${require('../package.json').version}
┃📝 Platform: ${os.platform()}
┃📟 Host: ${os.hostname()}
┃⚙️ Mode: ${config.MODE}
┃💻 Uptime: ${runtime(process.uptime())}
┃✨ Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗`;

        await conn.sendMessage(from, { audio: { url:alive }, mimetype: 'audio/aac', ptt: true }, { quoted: mek });

        await conn.sendMessage(from, {
            image: { url: ALIVE_IMG },
            caption: aliveMsg,
            contextInfo: {
                mentionedJid: ['94742876968@s.whatsapp.net'],
                externalAdReply: {
                    title: 'Sanuu MD User Bot',
                    body: 'Created by Mr.Nethmika & NBT',
                    mediaType: 1,
                    sourceUrl: "https://whatsapp.com/channel/0029Vav4JSq6hENwFP32Da17",
                    thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/BUNNY-DATA/refs/heads/main/media/IMG-20241112-WA0145.jpg',
                    renderLargerThumbnail: true,
                    showAdAttribution: true
                }
            }
        });
    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});

// system
cmd({
    pattern: "system",
    desc: "Shows system information.",
    react: "⚙️",
    category: "info",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const systemInfo = `
╭╴╴╴╴╴ꜱʏꜱᴛᴇᴍ╶╶╶╶╶╮
┃ 🗜️ Platform: ${os.platform()}
┃ ⛓️ Architecture: ${os.arch()}
┃ ⚙️ Hostname: ${os.hostname()}
┃ 💣 Total Memory: ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB
┃ 🔏 Free Memory: ${(os.freemem() / 1024 / 1024).toFixed(2)} MB
┃ ✂️ Uptime: ${runtime(os.uptime())}
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗
`;

        reply(systemInfo);
    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});

// runtime
cmd({
    pattern: "runtime",
    desc: "Shows bot's runtime.",
    react: "⏳",
    category: "info",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const uptime = runtime(process.uptime());
        reply(`Bot Uptime: ${uptime}\n\n> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤\n\n> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗`);
    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});

// ping
cmd({
    pattern: "ping",
    desc: "Check bot response speed.",
    react: "🏓",
    category: "info",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    const startTime = Date.now()
      const message = await conn.sendMessage(from, { text: '⌛ ᴘʟɴɢɪɴɢ. .....' })
      const endTime = Date.now()
      const ping = endTime - startTime
      await conn.sendMessage(from, { text: `🎯 Bot Ping Is : ${ping}ms\n\n> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤\n\n> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗` }, { quoted: message })
});

// owner
cmd({
    pattern: "owner",
    desc: "Shows bot owner's contact information.",
    react: "👤",
    category: "info",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        let tex = `
🎋 Hellow ${pushname},

╭╴╴╴╴╴ᴏᴡɴᴇʀ╶╶╶╶╶╮
┃ 🕊️ Owneer : Mr.Nethmika
┃ 🏵️ Helper : NBT
┃ 🐥 Owner Number : Below
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯
`
// send a contact!
const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗\n' // full name
            + 'ORG:Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗;\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid=94742876968:+94 74 2876968\n' // WhatsApp ID + phone number
            + 'END:VCARD'
await conn.sendMessage(
    from,
    { 
        contacts: { 
            displayName: 'NIKO PAMIYA', 
            contacts: [{ vcard }] 
        }
    }
);

await conn.sendMessage(from, { 
  image: {url: 'https://raw.githubusercontent.com/Niko-AND-Janiya/BUNNY-DATA/refs/heads/main/media/IMG-20241112-WA0145.jpg'},
  caption: tex ,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363317542947574@g.us',
      newsletterName: "> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤",
      serverMessageId: 999
    },
externalAdReply: { 
title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤\n\n> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗',
mediaType: 1,
sourceUrl: "https://whatsapp.com/channel/0029VarBXqP1Hsq0cLnUcm1o" ,
thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/BUNNY-DATA/refs/heads/main/media/IMG-20241112-WA0145.jpg' ,
renderLargerThumbnail: false,
showAdAttribution: true
}
}}, { quoted: mek});
    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});
