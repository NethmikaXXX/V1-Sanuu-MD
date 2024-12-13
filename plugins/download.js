const { fetchJson } = require('../lib/functions')
const { downloadTiktok } = require("@mrnima/tiktok-downloader");
const {facebook} = require("@mrnima/facebook-downloader");
const cheerio = require('cheerio')
const config = require('../config')
const { igdl } = require('ruhend-scraper')
const axios = require('axios');
const { cmd, commands } = require('../command')


cmd({
    pattern: "tiktok",
    alias: ["tt"],
    react: "🎁",
    desc: "download tt videos",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("*_Give Me TikTok Url ❌_*")
        m.react('📥')
        //fetch data from api  
        let data = await downloadTiktok(q);
     let desc = `
      ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 𝕄𝔻 𝕋𝕀𝕂𝕋𝕆𝕂 𝔻𝕆𝕎ℕ𝕃𝕆𝔸𝔻𝔼ℝ  ͟͞⏤

> 🕊️ Please reply with the number you watn to select:

Title * ${data.result.title}

> 1️⃣ `Tiktok Video`

   1 | 🪫 *SD QUALITY*
   2 | 🔋 *HD QUALITY*

> 2️⃣ `Tiktok Audio`

   3 | 🎧 *Audio file*
   
*URL:* ${q}

> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗
     
     `

const sentMsg = await conn.sendMessage(from, { image: {url: data.result.image }, caption: desc }, { quoted: mek });
const messageID = sentMsg.key.id; // Save the message ID for later reference


// Listen for the user's response
conn.ev.on('messages.upsert', async (messageUpdate) => {
    const mek = messageUpdate.messages[0];
    if (!mek.message) return;
    const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
    const from = mek.key.remoteJid;
    const sender = mek.key.participant || mek.key.remoteJid;

    // Check if the message is a reply to the previously sent message
    const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

    if (isReplyToSentMsg) {
        // React to the user's reply (the "1" or "2" message)
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
        let dat = data.result;

        // React to the upload (sending the file)
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        if (messageType === '1') {
            // Handle option 1 (no wm File)
          await conn.sendMessage(from, { video: { url: dat.dl_link.download_mp4_1}, mimetype: "video/mp4", caption: `> NO-WATERMARK\n\n> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤\n\n> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗` }, { quoted: mek })
       
            }
         else if (messageType === '2') {
            // Handle option 2 (wm File)
            await conn.sendMessage(from, { video: { url: dat.dl_link.download_mp4_hd }, mimetype: "video/mp4", caption: `> WITH-WATERMARK \n\n> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤\n\n> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗` }, { quoted: mek })  
          }
           
          else if (messageType === '3') {
            //Handle option 3 (audio File)  
          await conn.sendMessage(from, { audio: { url: dat.dl_link.download_mp3 }, mimetype: "audio/mpeg" }, { quoted: mek })  
    
          }

        // React to the successful completion of the task
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        console.log("Response sent successfully");
    }
});

} catch (e) {
console.log(e);
reply(`${e}`);
}
});


// Facebook Downloader
cmd({
  pattern: "fb",
  alias: ["facebook"],
  desc: "Download Facebook videos",
  category: "download",
  filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {

  if (!q || !q.startsWith("https://")) {
    return conn.sendMessage(from, { text: "❌ _*Please provide a valid URL.*_" }, { quoted: mek });
}

await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

const Fb = await facebook(q);


    const captionHeader = `
 ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 𝕄𝔻 𝔽𝔹 𝕍𝕀𝔻𝔼𝕆 𝔻𝕆𝕎ℕ𝕃𝕆𝔸𝔻𝔼ℝ  ͟͞⏤

🕑 DURATION : ${Fb.result.duration}🕑

> 🕊️ Please reply with the number you watn to select:

> 1️⃣ facebook Video

1.1 | 🪫 SD QUALITY
1.2 | 🔋 HD QUALITY

> 2️⃣ facebook Audio

2.1 | 🎶 Audio file
2.2 | 📂 Document file
2.3 | 🎤 Voice cut [ptt]


Fb-Url: -=-${q} 

> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗
`;

const sentMsg = await conn.sendMessage(from, { image: {url: Fb.result.thumbnail }, caption: captionHeader }, { quoted: mek });
const messageID = sentMsg.key.id; // Save the message ID for later reference


// Listen for the user's response
conn.ev.on('messages.upsert', async (messageUpdate) => {
    const mek = messageUpdate.messages[0];
    if (!mek.message) return;
    const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
    const from = mek.key.remoteJid;
    const sender = mek.key.participant || mek.key.remoteJid;

    // Check if the message is a reply to the previously sent message
    const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

    if (isReplyToSentMsg) {
        // React to the user's reply (the "1" or "2" message)
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
        let data = Fb.result;

        // React to the upload (sending the file)
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        if (messageType === '1.1') {
            // Handle option 1 (sd File)
          await conn.sendMessage(from, { video: { url: data.links.SD }, mimetype: "video/mp4", caption: `> 🪫 SD QUALITY\n\n> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤\n\n> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗` }, { quoted: mek })
       
          }

          else if (messageType === '1.2') {
            // Handle option 2 (hd File)
            await conn.sendMessage(from, { video: { url: data.links.HD }, mimetype: "video/mp4", caption: `> 🔋 HD QUALITY\n\n> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤\n\n> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗` }, { quoted: mek })  
          }
           
          else if (messageType === '2.1') {
            //Handle option 3 (audio File)  
          await conn.sendMessage(from, { audio: { url: data.links.SD }, mimetype: "audio/mpeg" }, { quoted: mek })
          }
          
          else if (messageType === '2.2') {
            await conn.sendMessage(from, {
              document: { url: data.links.SD },
              mimetype: "audio/mpeg",
              fileName: `Sanuu/FBDL.mp3`,
              caption: "> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤"
          }, { quoted: mek });
          }
          
          else if (messageType === '2.3') {
            //Handle option 3 (audio File)  
          await conn.sendMessage(from, { audio: { url: data.links.SD }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek })
    
          }

        // React to the successful completion of the task
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        console.log("Response sent successfully");
    }
  });
} catch (e) {
console.log(e);
reply(`${e}`);
}
})

cmd({
    pattern: "twitter",
    alias: ["tweet", "twdl"],
    desc: "Download Twitter videos",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) {
      return conn.sendMessage(from, { text: "❌ Please provide a valid Twitter URL." }, { quoted: mek });
    }

    // React to indicate processing start
    await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

    // Fetch video information from Dark Yasiya Twitter API
    const twitterData = await axios.get(`https://www.dark-yasiya-api.site/download/twitter?url=${q}`);
    const data = twitterData.data;

    if (!data || !data.status || !data.result) {
      return m.reply("Failed to retrieve Twitter video. Please check the link and try again.");
    }

    const { desc, thumb, video_sd, video_hd } = data.result;
    const captionHeader = `
⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 𝕄𝔻 𝕋𝕎𝕀𝕋𝔼ℝ 𝕍𝕀𝔻𝔼𝕆 𝔻𝕆𝕎ℕ𝕃𝕆𝔸𝔻𝔼ℝ  ͟͞⏤
📝 Description: ${desc || "No description"}

> 🕊️ Please reply with the number you watn to select:

> 1️⃣ *Twitter Video*

  1.1 | 🪫 SD QUALITY
  1.2 | 🔋 HD QUALITY

> 2️⃣ *Twitter Audio*

  2.1 | 🎶 Audio file
  2.2 | 📂 Document file
  2.3 | 🎤 Voice (ptt)

Twitter URL: ${q}

> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗
`;

    const sentMsg = await conn.sendMessage(from, { image: { url: thumb }, caption: captionHeader }, { quoted: mek });
    const messageID = sentMsg.key.id;

    // Listen for the user's response
    conn.ev.on('messages.upsert', async (messageUpdate) => {
      const mek = messageUpdate.messages[0];
      if (!mek.message) return;
      const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
      const from = mek.key.remoteJid;

      // Check if the message is a reply to the previously sent message
      const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

      if (isReplyToSentMsg) {
        // React to the user's selection
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

        if (messageType === '1.1') {
          // Send SD video
          await conn.sendMessage(from, { video: { url: video_sd }, mimetype: "video/mp4", caption: `> 🪫 SD QUALITY\n\n> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤\n\n> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗` }, { quoted: mek });
        } else if (messageType === '1.2') {
          // Send HD video
          await conn.sendMessage(from, { video: { url: video_hd }, mimetype: "video/mp4", caption: `> 🔋 HD QUALITY\n\n> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤\n\n> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗` }, { quoted: mek });
        } else if (messageType === '2.1') {
          // Send audio as an audio file
          await conn.sendMessage(from, { audio: { url: video_sd }, mimetype: "audio/mpeg" }, { quoted: mek });
        } else if (messageType === '2.2') {
          // Send audio as a document file
          await conn.sendMessage(from, {
            document: { url: video_sd },
            mimetype: "audio/mpeg",
            fileName: `Sanuu/TWDL.mp3`,
            caption: "> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤"
          }, { quoted: mek });
        } else if (messageType === '2.3') {
          // Send audio as a voice note (ptt)
          await conn.sendMessage(from, { audio: { url: video_sd }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek });
        }

        // React to completion
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        console.log("Twitter response sent successfully");
      }
    });
  } catch (e) {
    console.log(e);
    reply(`An error occurred: ${e}`);
  }
});




cmd({
    pattern: "mediafire",
    desc: "To download MediaFire files.",
    react: "🎥",
    category: "download",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!q) return m.reply("Please provide a valid MediaFire link.");
        
        // React to indicate download start
        m.react('⬇️');
        
        // Fetch file information from the Dark Yasiya API
        const response = await axios.get(`https://www.dark-yasiya-api.site/download/mfire?url=${q}`);
        const resData = response.data;

        if (!resData || !resData.status || !resData.result || !resData.result.dl_link) {
            return m.reply("Failed to fetch MediaFire download link. Ensure the link is valid and public.");
        }

        const fileUrl = resData.result.dl_link;
        const fileName = resData.result.fileName || "mediafire_download";
        const fileType = resData.result.fileType || "application/octet-stream";
        
        // React to indicate file is being sent
        m.react('⬆️');

        // Send file to chat without downloading
        await conn.sendMessage(from, {
            document: { url: fileUrl },
            fileName: fileName,
            mimetype: fileType
        }, { quoted: mek });
        m.react('✅');

    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});


cmd({

  pattern: "ig",
  desc: "To download instagram videos.",
  react: "🎥",
  category: "download",
  filename: __filename

},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{
  
if (!q) return m.reply(`Please Give Me a vaild Link...`);
m.react('⬇️')

       let res = await igdl(q);
      
       let data = await res.data;
       for (let i = 0; i < 20; i++) {
          let media = data[i];
          let downloadurl = media.url
           m.react('⬆️')
          await conn.sendMessage(from,{video: {url:downloadurl},mimetype:"video/mp4",caption: `> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤`},{quoted:mek})
           m.react('✅')
       }

}catch(e){
console.log(e)
reply(`${e}`)
}
})



async function xdl(URL) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}`, {method: 'get'}).then((res) => res.text()).then((res) => {
      const $ = cheerio.load(res, {xmlMode: false});
      const title = $('meta[property="og:title"]').attr('content');
      const duration = $('meta[property="og:duration"]').attr('content');
      const image = $('meta[property="og:image"]').attr('content');
      const videoType = $('meta[property="og:video:type"]').attr('content');
      const videoWidth = $('meta[property="og:video:width"]').attr('content');
      const videoHeight = $('meta[property="og:video:height"]').attr('content');
      const info = $('span.metadata').text();
      const videoScript = $('#video-player-bg > script:nth-child(6)').html();
      const files = {
        low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
        high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
        HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
        thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
        thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
        thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
        thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1]};
      resolve({status: true, result: {title, URL, duration, image, videoType, videoWidth, videoHeight, info, files}});
    }).catch((err) => reject({status: false, result: err}));
  });
}

cmd({
    pattern: "xnxxdown",
    alias: ["dlxnxx","xnxxdl"],
    react: '🫣',
    desc: "Download xnxx videos",
    category: "nsfw",
    use: '.xnxx <xnxx link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 //if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
 if (!q) return reply('*Please give me url !!*')
  let res = await xdl(q)
  let title = res.result.title
  await conn.sendMessage(from, { video: { url: res.result.files.high }, caption: title}, { quoted: mek })
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})

cmd({
  pattern: "xvdown",
  alias: ["dlxv","xvdl"],
  react: '🫣',
  desc: "Download xvideos videos",
  category: "nsfw",
  use: '.xv <xvideos link>',
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{      
//if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
if (!q) return reply('*Please give me url !!*')


let xv_info = await fetchJson(`https://www.dark-yasiya-api.site/download/xvideo?url=${q}`)
const msg = `
⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 𝕄𝔻 𝕏𝕍𝕀𝔻𝔼𝕆 𝔻𝕆𝕎ℕ𝕃𝕆𝔸𝔻𝔼ℝ  ͟͞⏤
     
• *Title* - ${xv_info.result.title}

• *Views* - ${xv_info.result.views}

• *Like* - ${xv_info.result.like}

• *Deslike* - ${xv_info.result.deslike}

• *Size* - ${xv_info.result.size}`



await conn.sendMessage( from, { image: { url: xv_info.result.image || '' }, caption: msg }, { quoted: mek })

// SEND VIDEO
await conn.sendMessage(from, { document: { url: xv_info.result.dl_link }, mimetype: "video/mp4", fileName: xv_info.result.title, caption: xv_info.result.title }, { quoted: mek });


} catch (e) {
reply('*Error !!*')
console.log(e)
}
})

cmd({
  pattern: "ginisisiladl",
  alias: ["download"],
  desc: "Download and send Ginisisila Cartoon video",
  category: "download",
  filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q || !q.startsWith("https://ginisisilacartoon.net/watch.php?id=")) {
      return conn.sendMessage(from, { text: "❌ Please provide a valid Ginisisila cartoon URL." }, { quoted: mek });
    }

    const apiUrl = `https://www.dark-yasiya-api.site/download/ginisisila?url=${encodeURIComponent(q)}`;

    // Fetch data from the API using fetchJson
    const data = await fetchJson(apiUrl);

    if (!data.status) {
      return conn.sendMessage(from, { text: "❌ Failed to retrieve the download link." }, { quoted: mek });
    }

    const result = data.result;

    // Send the video file directly
    await conn.sendMessage(from, {
      video: { url: result.dl_link },
      caption: `
⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 𝕄𝔻 𝔾𝕀ℕ𝕀𝕊𝕀𝕊𝕃𝔸 𝔻𝕆𝕎ℕ𝕃𝕆𝔸𝔻𝔼ℝ ͟͞⏤

📺 **Title:** ${result.title}
🔗 **Watch Link:** [Watch Here](${result.video_link})
      `,
      mimetype: "video/mp4"
    }, { quoted: mek });
    
  } catch (e) {
    console.error(e);
    reply(`An error occurred: ${e.message}`);
  }
});
