const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    getContentType,
    fetchLatestBaileysVersion,
    Browsers,
    jidNormalizedUser,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
    proto
    } = require('@whiskeysockets/baileys')
    const os = require("os")
    const l = console.log
    const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('./lib/functions')
    const fs = require('fs')
    const P = require('pino')
    //============================
    const config = require('./config');
    const getPrefix = () => config.PREFIX;
    const getWelcome = () => config.WELCOME
    const getantibad = () => config.ANTI_BAD;
    const getantilink = () => config.ANTI_LINK;
    const getbad = () => config.ANTI_BAD;
    //============================
    const qrcode = require('qrcode-terminal')
    const util = require('util')
    const { sms,downloadMediaMessage } = require('./lib/msg')
    const axios = require('axios')
    const { File } = require('megajs')
    
    const ownerNumber = ['94704020146']
    
    //===================SESSION-AUTH============================
if (!fs.existsSync(__dirname + '/sessions/creds.json')) {
    if (config.SESSION_ID) {
      const sessdata = config.SESSION_ID.replace("ANJU-MD=", "")
      const filer = File.fromURL(`https://mega.nz/file/${sessdata}`)
      filer.download((err, data) => {
        if (err) throw err
        fs.writeFile(__dirname + '/auth_info_baileys/creds.json', data, () => {
          console.log("Session download completed !!")
        })
      })
    }
}    
    
    const express = require("express");
    const app = express();
    const port = process.env.PORT || 8000;
    
    //=============================================
    
    async function connectToWA() {
//===========================

   
    const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/sessions/')
    var { version } = await fetchLatestBaileysVersion()
    
    const conn = makeWASocket({
            logger: P({ level: 'silent' }),
            printQRInTerminal: false,
            browser: Browsers.macOS("Firefox"),
            syncFullHistory: true,
            auth: state,
            version
            })
        
    conn.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
    if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
    connectToWA()
    }
    } else if (connection === 'open') {
    console.log("Connecting 🧬...");
    console.log('Installing plugins 🔌...')
    const path = require('path');
    fs.readdirSync("./plugins/").forEach((plugin) => {
    if (path.extname(plugin).toLowerCase() == ".js") {
    require("./plugins/" + plugin);
    }
    });
    console.log('Plugins installed ✔️')
    console.log('Bot connected ✔️')
    const prefix = getPrefix();
    const { commands }= require('./command')
    // Assuming `config` contains all the settings
    let up = `
> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤

Hellow this is Sanuu - MD WhatsApp User Created By Mr.Nethmika & NBT.
Type .menu To Get Bot Command List.

╭╴╴╴╴╴ꜱᴀɴᴜᴜ╶╶╶╶╶╮
┃ 🏵️ Bot : ${config.BOT_NAME}
┃ 🌳 Prefix : ${config.PREFIX}
┃ 🕊️ Version : ${require('./package.json').version}
┃ 🌹 Platform : ${os.platform()}
┃ 🐣 Host : ${os.hostname()}
┃ 💣 Owner : ${config.OWNER_NAME}
┃ ⚙️ Mode: ${config.MODE}
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

> **Current Settings:**

╭╴╴╴╴╴ꜱᴀɴᴜᴜ╶╶╶╶╶╮
┃ 🕊️ **PREFIX:** ${prefix}
┃ 🕊️ **MODE:** ${config.MODE === 'public' ? 'Public' : 'Private'}
┃ 🕊️ **AUTO READ STATUS:** ${config.AUTO_READ_STATUS ? 'Enabled' : 'Disabled'}
┃ 🕊️ **READ CMD:** ${config.READ_CMD ? 'Enabled' : 'Disabled'}
┃ 🕊️ **AUTO VOICE:** ${config.AUTO_VOICE ? 'Enabled' : 'Disabled'}
┃ 🕊️ **AUTO STICKER:** ${config.AUTO_STICKER ? 'Enabled' : 'Disabled'}
┃ 🕊️ **AUTO REPLY:** ${config.AUTO_REPLY ? 'Enabled' : 'Disabled'}
┃ 🕊️ **AUTO REACT:** ${config.AUTO_REACT ? 'Enabled' : 'Disabled'}
┃ 🕊️ **WELCOME:** ${config.WELCOME ? 'Enabled' : 'Disabled'}
┃ 🕊️ **ANTI BAD:** ${config.ANTI_BAD ? 'Enabled' : 'Disabled'}
┃ 🕊️ **ANTI BOT:** ${config.ANTI_BOT ? 'Enabled' : 'Disabled'}
┃ 🕊️ **ANTI LINK:** ${config.ANTI_LINK ? 'Enabled' : 'Disabled'}
┃ 🕊️ **ALWAYS ONLINE:** ${config.ALLWAYS_ONLINE ? 'Enabled' : 'Disabled'}
┃ 🕊️ **MOROCCO BLOCK:** ${config.MOROCCO_BLOCK ? 'Enabled' : 'Disabled'}
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯
    
> Thank you for using **Sanuu - MD**. 
> We're here to make your experience enjoyable and seamless. 
> If you need any help or have questions, don't hesitate to ask. 
    
**Enjoy your time with us!** 😊

> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗`;
    

conn.sendMessage(config.BOT_NUMBER + "@s.whatsapp.net", { 
    image: {url:'https://raw.githubusercontent.com/Niko-AND-Janiya/BUNNY-DATA/refs/heads/main/media/20241104_170118.jpg'},  // Ensure 'up' is defined as the caption text
    caption: up,
    contextInfo: {
        mentionedJid: [],  // specify mentioned JID(s) if any
        groupMentions: [],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363346182554779@newsletter',
            newsletterName: "> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤",
            serverMessageId: 999
        },
        externalAdReply: {
            title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
            body: 'An Interesting WhatsApp User Bot',
            mediaType: 1,
            sourceUrl: "https://github.com/NIKO-PAMIYA",
            thumbnailUrl:'https://raw.githubusercontent.com/Niko-AND-Janiya/BUNNY-DATA/refs/heads/main/media/20241104_154500.jpg',
            renderLargerThumbnail: false,
            showAdAttribution: true
        }
    }
});
    

    }
    })

    
    //============================================================================

    conn.ev.on('group-participants.update', async (update) => {
        const { id, participants, action } = update;
        const groupMetadata = await conn.groupMetadata(id);
        const groupName = groupMetadata.subject;
    
        // Fetch the group icon
        let groupIconUrl = 'https://raw.githubusercontent.com/Mrrashmika/Database/refs/heads/main/WhatsApp%20Image%202024-09-08%20at%209.00.17%20PM.jpeg'; // Use a default icon URL if fetching fails
    
        participants.forEach(async (participant) => {
            let message = '';
            if (action === 'add' ) {
                const welcome = getWelcome();
                if (welcome === true) {
                message = `
> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
    
*Hey @${participant.split('@')[0]}!* 👋

WELCOME TO ${groupName}
    
> 🎋⃟💚 *BUNNY MD WhatsApp Bot* is up and running!

Runtime : ${runtime(process.uptime())}

> 🛸 *Created by:* Mr Niko Pamiya | Janith Rashmika 
    
*Here's what I can do:*

╭╴╴╴╴╴ꜱᴀɴᴜᴜ╶╶╶╶╶╮
┃ 💿 *Download Songs & Videos* 
┃ 📰 *Fetch Latest News* 
┃ 🎭 *Entertain with Fun Commands* 
┃ 🔧 *Manage Groups* 
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

> *Stay connected and enjoy the services!* 🕊️
    
> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗
                `; };
            } else if (action === 'remove') {
                const welcome = getWelcome();
                if (welcome === true){
                message = `
> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
    
😔 *Goodbye @${participant.split('@')[0]}!*

GOOD BYE FROM ${groupName}
    
> We're sad to see you leave *${groupName}*. 😢
> We hope you had a great time with us.
    
*If you ever decide to come back, you'll always be welcome!*

> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗                `;
            }
            }
    
            if (message) {
                await conn.sendMessage(id, {
                    image: { url: groupIconUrl },
                    contextInfo: { mentionedJid: [participant] },
                    caption: message,
                    
                });
            }
        });
    });
    
//==========================================================================

    
    conn.ev.on('messages.upsert', async(mek) => {
        if (config.ALLWAYS_ONLINE === false && mek.key && mek.key.remoteJid !== 'status@broadcast') {
            await conn.readMessages([mek.key]); // Mark the message as read but don't send delivery receipts
        }
    mek = mek.messages[0]
    if (!mek.message) return	
    mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
    if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_READ_STATUS === true){
    await conn.readMessages([mek.key])
    }
    const prefix = getPrefix();
    const m = sms(conn, mek)
    const type = getContentType(mek.message)
    const content = JSON.stringify(mek.message)
    const from = mek.key.remoteJid
    const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
    const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text :(type == 'interactiveResponseMessage' ) ? mek.message.interactiveResponseMessage  && mek.message.interactiveResponseMessage.nativeFlowResponseMessage && JSON.parse(mek.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson) && JSON.parse(mek.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id :(type == 'templateButtonReplyMessage' )? mek.message.templateButtonReplyMessage && mek.message.templateButtonReplyMessage.selectedId  : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''   
    const isCmd = body.startsWith(prefix)
    const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
    const args = body.trim().split(/ +/).slice(1)
    const q = args.join(' ')
    const isGroup = from.endsWith('@g.us')
    const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
    const senderNumber = sender.split('@')[0]
    const botNumber = conn.user.id.split(':')[0]
    const pushname = mek.pushName || 'Sin Nombre'
    const isMe = botNumber.includes(senderNumber)
    const isOwner = ownerNumber.includes(senderNumber) || isMe
    const botNumber2 = await jidNormalizedUser(conn.user.id);
    const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
    const groupName = isGroup ? groupMetadata.subject : ''
    const participants = isGroup ? await groupMetadata.participants : ''
    const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
    const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
    const isAdmins = isGroup ? groupAdmins.includes(sender) : false
    const reply = (teks) => {
    conn.sendMessage(from, { text: teks }, { quoted: mek })
    }

    
    conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
                  let mime = '';
                  let res = await axios.head(url)
                  mime = res.headers['content-type']
                  if (mime.split("/")[1] === "gif") {
                    return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted, ...options })
                  }
                  let type = mime.split("/")[0] + "Message"
                  if (mime === "application/pdf") {
                    return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted, ...options })
                  }
                  if (mime.split("/")[0] === "image") {
                    return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted, ...options })
                  }
                  if (mime.split("/")[0] === "video") {
                    return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted, ...options })
                  }
                  if (mime.split("/")[0] === "audio") {
                    return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted, ...options })
                  }
                }

    //============================================================================
    if (isCmd && config.READ_CMD === true && config.ALLWAYS_ONLINE === true) {
                  await conn.readMessages([mek.key])  // Mark command as read
              }
    if(!isOwner && config.MODE === "private") return
    if(!isOwner && isGroup && config.MODE === "inbox") return
    if(!isOwner && !isGroup && config.MODE === "groups") return

    //=============================================================================
    
    //==================================plugin map================================
            const events = require('./command')
            const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
            if (isCmd) {
                const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
                if (cmd) {
                    if (cmd.react) conn.sendMessage(from, {
                        react: {
                            text: cmd.react,
                            key: mek.key
                        }
                    })

                    try {
                        cmd.function(conn, mek, m, {
                            from,
                            prefix,
                            quoted,
                            body,
                            command,
                            args,
                            q,
                            isGroup,
                            sender,
                            senderNumber,
                            botNumber2,
                            botNumber,
                            pushname,
                            isMe,
                            isOwner,
                            groupMetadata,
                            groupName,
                            participants,
                            groupAdmins,
                            isBotAdmins,
                            isAdmins,
                            reply
                        });
                    } catch (e) {
                        console.error("[PLUGIN ERROR] ", e);
                    }
                }
            }
            events.commands.map(async (command) => {
                if (body && command.on === "body") {
                    command.function(conn, mek, m, {
                        from,
                        prefix,
                        quoted,
                        body,
                        command,
                        args,
                        q,
                        isGroup,
                        sender,
                        senderNumber,
                        botNumber2,
                        botNumber,
                        pushname,
                        isMe,
                        isOwner,
                        groupMetadata,
                        groupName,
                        participants,
                        groupAdmins,
                        isBotAdmins,
                        isAdmins,
                        reply
                    })
                } else if (mek.q && command.on === "text") {
                    command.function(conn, mek, m, {
                        from,
                        prefix,
                        quoted,
                        body,
                        command,
                        args,
                        q,
                        isGroup,
                        sender,
                        senderNumber,
                        botNumber2,
                        botNumber,
                        pushname,
                        isMe,
                        isOwner,
                        groupMetadata,
                        groupName,
                        participants,
                        groupAdmins,
                        isBotAdmins,
                        isAdmins,
                        reply
                    })
                } else if (
                    (command.on === "image" || command.on === "photo") &&
                    mek.type === "imageMessage"
                ) {
                    command.function(conn, mek, m, {
                        from,
                        prefix,
                        quoted,
                        body,
                        command,
                        args,
                        q,
                        isGroup,
                        sender,
                        senderNumber,
                        botNumber2,
                        botNumber,
                        pushname,
                        isMe,
                        isOwner,
                        groupMetadata,
                        groupName,
                        participants,
                        groupAdmins,
                        isBotAdmins,
                        isAdmins,
                        reply
                    })
                } else if (
                    command.on === "sticker" &&
                    mek.type === "stickerMessage"
                ) {
                    command.function(conn, mek, m, {
                        from,
                        prefix,
                        quoted,
                        body,
                        command,
                        args,
                        q,
                        isGroup,
                        sender,
                        senderNumber,
                        botNumber2,
                        botNumber,
                        pushname,
                        isMe,
                        isOwner,
                        groupMetadata,
                        groupName,
                        participants,
                        groupAdmins,
                        isBotAdmins,
                        isAdmins,
                        reply
                    })
                }
            });
    //============================================================================ 
    if(body === "send" || body === "Send" || body === "Ewpm" || body === "ewpn" || body === "Dapan" || body === "dapan" || body === "oni" || body === "Oni" || body === "save" || body === "Save" || body === "ewanna" || body === "Ewanna" || body === "ewam" || body === "Ewam" || body === "sv" || body === "Sv"|| body === "දාන්න"|| body === "එවම්න"){
        // if(!m.quoted) return reply("*Please Mention status*")
        const data = JSON.stringify(mek.message, null, 2);
        const jsonData = JSON.parse(data);
        const isStatus = jsonData.extendedTextMessage.contextInfo.remoteJid;
        if(!isStatus) return
    
        const getExtension = (buffer) => {
            const magicNumbers = {
                jpg: 'ffd8ffe0',
                png: '89504e47',
                mp4: '00000018',
            };
            const magic = buffer.toString('hex', 0, 4);
            return Object.keys(magicNumbers).find(key => magicNumbers[key] === magic);
        };
    
        if(m.quoted.type === 'imageMessage') {
            var nameJpg = getRandom('');
            let buff = await m.quoted.download(nameJpg);
            let ext = getExtension(buff);
            await fs.promises.writeFile("./" + ext, buff);
            const caption = m.quoted.imageMessage.caption;
            await conn.sendMessage(from, { image: fs.readFileSync("./" + ext), caption: caption });
        } else if(m.quoted.type === 'videoMessage') {
            var nameJpg = getRandom('');
            let buff = await m.quoted.download(nameJpg);
            let ext = getExtension(buff);
            await fs.promises.writeFile("./" + ext, buff);
            const caption = m.quoted.videoMessage.caption;
            let buttonMessage = {
                video: fs.readFileSync("./" + ext),
                mimetype: "video/mp4",
                fileName: `${m.id}.mp4`,
                caption: caption ,
                headerType: 4
            };
            await conn.sendMessage(from, buttonMessage,{
                quoted: mek
            });
        }
       }

       //======================================================================
       if (config.ALLWAYS_ONLINE === false) {
        conn.sendPresenceUpdate('unavailable'); // Sets the bot's last seen status
    }

    if (senderNumber.startsWith('212') && config.MOROCCO_BLOCK === true) {
        console.log(`Blocking number +212${senderNumber.slice(3)}...`);

        // Action: Either block the user or remove them from a group
        if (from.endsWith('@g.us')) {
            // If in a group, remove the user
            await conn.groupParticipantsUpdate(from, [sender], 'remove');
            await conn.sendMessage(from, { text: 'User with +212 number detected and removed from the group.' });
        } else {
            // If in a private chat, block the user
            await conn.updateBlockStatus(sender, 'block');
            console.log(`Blocked +212${senderNumber.slice(3)} successfully.`);
        }

        return; // Stop further processing of this message
    }

    
        if (!isOwner && isGroup && isBotAdmins ) {   
        if (body.match(`chat.whatsapp.com`)) {
            if (config.ANTI_LINK == true){
            
        if (isMe) return await reply("Link Derect but i can't Delete link")
        if(groupAdmins.includes(sender)) return
            
        await conn.sendMessage(from, { delete: mek.key })  
        }}}

    
const bad = await fetchJson(`https://raw.githubusercontent.com/Mrrashmika/Database/refs/heads/main/bad_word.json`)

  if (!isAdmins && !isMe) {
  for (any in bad){
  if (body.toLowerCase().includes(bad[any])){  
    if (!body.includes('tent')) {
      if (!body.includes('docu')) {
        if (!body.includes('https')) {
  if (groupAdmins.includes(sender)) return 
  if (mek.key.fromMe) return 
  if (config.ANTI_BAD == true){  
  await conn.sendMessage(from, { delete: mek.key })  
  await conn.sendMessage(from , { text: '*Bad word detected..!*'})
  await conn.groupParticipantsUpdate(from,[sender], 'remove')
  }}}}}}}
  
 
  if ( isGroup && !isAdmins && !isMe && !isOwner && isBotAdmins ) {
  if ( mek.id.startsWith("BAE") ) {
    if (config.ANTI_BOT == true){
await conn.sendMessage(from, { text: "❌ ```Another Bot's message Detected :``` 📚 *Removed By Sanuu - MD* ❗\nAnti Bot System on...\n\n> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤\n> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗" })
if ( config.ANTI_BOT == "true" && isBotAdmins ) {
await conn.sendMessage(from, { delete: mek.key })
await conn.groupParticipantsUpdate(from,[sender], 'remove')
  }}
    if ( mek.id.startsWith("QUEENAMDI") ) {
        if (config.ANTI_BOT == true){
await conn.sendMessage(from, { text: "❌ ```Another Bot's message Detected :``` *💃 Sanuu - MD* ❗\n*Removed By Sanuu - MD* ❗\nAnti Bot System on...\n\n> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤\n> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗" })
if ( config.ANTI_BOT == "true" && isBotAdmins ) {
await conn.sendMessage(from, { delete: mek.key })
await conn.groupParticipantsUpdate(from,[sender], 'remove')
  }}}

  
  }
  }
  
//============================================================================
    
    })
    }
    app.get("/", (req, res) => {
    res.send("> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤ Working Successfuly ✔");
    });
    app.listen(port, () => console.log(`Sanuu Server listening on port http://localhost:${port}`));
    setTimeout(() => {
    connectToWA()
    }, 4000);  

