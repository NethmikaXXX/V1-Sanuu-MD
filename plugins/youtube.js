const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');
const { fetchJson } = require('../lib/functions')

const axios = require('axios');
const cheerio = require('cheerio');

async function ytmp3(ytUrl) {
  try {
    if (!ytUrl) {
      throw new Error('URL parameter is required');
    }

    const infoResponse = await axios.get(`https://cdn58.savetube.su/info?url=${encodeURIComponent(ytUrl)}`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'Origin': 'https://ytshorts.savetube.me',
        'Referer': 'https://ytshorts.savetube.me/',
      }
    });

    const key = infoResponse.data.data.key;
    const title = infoResponse.data.data.title;

    const downloadResponse = await axios.get(`https://cdn61.savetube.su/download/audio/128/${key}`, {
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'Origin': 'https://ytshorts.savetube.me',
        'Referer': 'https://ytshorts.savetube.me',
      }
    });

    return {
      status: true,
      Created_by: 'NIKO PAMIYA & RASHMIKA',
      title: title,
      dl_link: downloadResponse.data.data.downloadUrl
    };
  } catch (error) {
    return
    //console.error('Error:', error);
   // return { error: 'An error occurred while processing the request.' };
  }
}


async function ytmp4(url, format) {
  try {
    if (!url || !format) {
      throw new Error('url and format parameters are required.');
    }

    const quality = parseInt(format.replace('p', ''), 10);
    const firstUrl = 'https://ab.cococococ.com/ajax/download.php';
    const firstParams = {
      button: 1,
      start: 1,
      end: 1,
      format: quality,
      url
    };

    const headers = {
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
      Origin: 'https://loader.to',
      Referer: 'https://loader.to',
      'Sec-Ch-Ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
      'Sec-Ch-Ua-Mobile': '?1',
      'Sec-Ch-Ua-Platform': '"Android"',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'cross-site',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
    };

    const firstResponse = await axios.get(firstUrl, { params: firstParams, headers });
    const id = firstResponse.data.id;

    const checkProgress = async () => {
      const secondUrl = 'https://p.oceansaver.in/ajax/progress.php';
      const secondParams = { id };

      try {
        const secondResponse = await axios.get(secondUrl, { params: secondParams, headers });
        const { progress, download_url, text } = secondResponse.data;

        if (text === "Finished") {
          return download_url;
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000));
          return checkProgress();
        }
      } catch (error) {
        throw new Error(`Error in progress check: ${error.message}`);
      }
    };

    return await checkProgress();
  } catch (error) {
   // console.error('Error:', error);
  //  return { error: error.message };
  }
}

module.exports = {ytmp3,ytmp4}



// Function to extract the video ID from youtu.be or YouTube links
function extractYouTubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Function to convert any YouTube URL to a full YouTube watch URL
function convertYouTubeLink(q) {
    const videoId = extractYouTubeId(q);
    if (videoId) {
        return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return q;
}

// .song command
cmd({
    pattern: "song",
    desc: "To download songs.",
    react: "🎧",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please give me a URL or title.");

        q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 𝕄𝔻 𝕊𝕆ℕ𝔾 𝔻𝕆𝕎ℕ𝕃𝕆𝔸𝔻𝔼ℝ  ͟͞⏤

> 🎵 *Song Found!*

╭╴╴╴╴╴ꜱᴀɴᴜᴜ╶╶╶╶╶╮
┃ 🐣 *Title:* ${data.title} 
┃ 🕊️ *Duration:* ${data.timestamp} 
┃ 🐥 *Views:* ${data.views} 
┃ 🌳 *Uploaded On:* ${data.ago} 
┃ 🏵️ *Link:* ${data.url} 
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

> 🕊️ Please reply with the number you watn to select:

╭╴╴╴╴╴ꜱᴀɴᴜᴜ╶╶╶╶╶╮
┃ 1️⃣ | *Audio File* 🎶
┃ 2️⃣ | *Document File* 📂
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗
`;
let info = `
> 🎥 *MP3 Download Found!* 

╭╴╴╴╴╴ɪᴍᴢᴇʀ╶╶╶╶╶╮
┃ 🏵️ *Title:* ${data.title} 
┃ 🌳 *Duration:* ${data.timestamp} 
┃ 🐥 *Views:* ${data.views} 
┃ 🕊️ *Uploaded On:* ${data.ago} 
┃ 🐣 *Link:* ${data.url} 
╰╴╴╴╴╴ɪᴍᴢᴇʀ╶╶╶╶╶╯

> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗
`

        // Send the initial message and store the message ID
        const sentMsg = await conn.sendMessage(from, {
            image: { url: data.thumbnail}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
            caption: desc,
            contextInfo: {
                mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 999,
                isForwarded: true,
                },
                externalAdReply: {
                    title: '⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                    body: '⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                    mediaType: 1,
                    sourceUrl: "https://youtube.com/@tech_with_pamiya",
                    thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
          });
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

                const down = await ytmp3(`${url}`)
                const downloadUrl = down.dl_link;

                // React to the upload (sending the file)
                await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

                if (messageType === '1') {
                    // Handle option 1 (Audio File)
                    await conn.sendMessage(from, { 
                        audio: { url: downloadUrl }, 
                        mimetype: "audio/mpeg" ,
                        contextInfo: {
                            externalAdReply: {
                                title: data.title,
                                body: data.videoId,
                                mediaType: 1,
                                sourceUrl: data.url,
                                thumbnailUrl: data.thumbnail, // This should match the image URL provided above
                                renderLargerThumbnail: true,
                                showAdAttribution: true
                            }
                        }
                    
                    }, { quoted: mek });
                } else if (messageType === '2') {
                    // Handle option 2 (Document File)
                    await conn.sendMessage(from, {
                        document: { url: downloadUrl},
                        mimetype: "audio/mp3",
                        fileName: `${data.title}.mp3`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info,
                        contextInfo: {
                            mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
                            groupMentions: [],
                            forwardingScore: 999,
                            isForwarded: true,
                            },
                            externalAdReply: {
                                title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                                body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                                mediaType: 1,
                                sourceUrl: "https://youtube.com/@tech_with_pamiy",
                                thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
                                renderLargerThumbnail: false,
                                showAdAttribution: true
                            }
                        }
                      });
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
// .ytmp3 command
cmd({
    pattern: "ytmp3",
    desc: "Download YouTube videos as MP3.",
    react: "🎵",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a YouTube URL or title.");

        q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
> 🍁 Mp3 Download Found

╭╴╴╴╴╴ꜱᴀɴᴜᴜ╶╶╶╶╶╮
┃ 🐣 *Title:* ${data.title} 
┃ 🕊️ *Duration:* ${data.timestamp} 
┃ 🌳 *Views:* ${data.views} 
┃ 🏵️ *Uploaded On:* ${data.ago} 
┃ 🌹 *Link:* ${data.url} 
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

> 🕊️ Please reply with the number you watn to select:

╭╴╴╴╴╴ꜱᴀɴᴜᴜ╶╶╶╶╶╮
┃ 1️⃣ | *Audio File* 🎶
┃ 2️⃣ | *Document File* 📂
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗
`;
let info = `
> 🍁 Mp3 Download Found

╭╴╴╴╴╴ꜱᴀɴᴜᴜ╶╶╶╶╶╮
┃ 🌹 *Title:* ${data.title} 
┃ 🏵️ *Duration:* ${data.timestamp} 
┃ 🌳 *Views:* ${data.views} 
┃ 🕊️ *Uploaded On:* ${data.ago} 
┃ 🐣 *Link:* ${data.url} 
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗
`


        // Send the initial message and store the message ID
        const sentMsg = await conn.sendMessage(from, {
            image: { url: data.thumbnail}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
            caption: desc,
            contextInfo: {
                mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 999,
                isForwarded: true,
                },
                externalAdReply: {
                    title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                    body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                    mediaType: 1,
                    sourceUrl: "https://youtube.com/@tech_with_pamiya",
                    thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
          });
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

                const down = await ytmp3(`${url}`)
                const downloadUrl = down.dl_link;

                // React to the upload (sending the file)
                await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

                if (messageType === '1') {
                    // Handle option 1 (Audio File)
                    await conn.sendMessage(from, { 
                        audio: { url: downloadUrl }, 
                        mimetype: "audio/mpeg",
                        contextInfo: {
                            externalAdReply: {
                                title: data.title,
                                body: data.videoId,
                                mediaType: 1,
                                sourceUrl: data.url,
                                thumbnailUrl: data.thumbnail, // This should match the image URL provided above
                                renderLargerThumbnail: true,
                                showAdAttribution: true
                            }
                        }
                     }, { quoted: mek });
                } else if (messageType === '2') {
                    // Handle option 2 (Document File)
                    await conn.sendMessage(from, {
                        document: { url: downloadUrl},
                        mimetype: "audio/mp3",
                        fileName: `${data.title}.mp3`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info,
                        contextInfo: {
                            mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
                            groupMentions: [],
                            forwardingScore: 999,
                            isForwarded: true,
                              },
                            externalAdReply: {
                                title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                                body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                                mediaType: 1,
                                sourceUrl: "https://youtube.com/@tech_with_pamiya",
                                thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
                                renderLargerThumbnail: false,
                                showAdAttribution: true
                            }
                        }
                      });
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

cmd({
    pattern: "yts",
    desc: "To search for videos on YouTube.",
    react: "🎥",
    category: "search",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a search query.");
        
        const search = await yts(q);
        const results = search.videos.slice(0, 10); // Get top 10 search results

        let desc = `
⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 𝕄𝔻 𝕐𝕋 𝕊𝔼𝔸ℝℂℍ  ͟͞⏤

> 🔍 *Search Results for:* ${q}

`;

        results.forEach((video, index) => {
            desc += `
${index + 1}.

╭╴╴╴╴╴ꜱᴀɴᴜᴜ╶╶╶╶╶╮
┃ 🌹 *Title:* ${video.title} 
┃ 🏵️ *Duration:* ${video.timestamp} 
┃ 🌳 *Views:* ${video.views} 
┃ 🕊️ *Uploaded On:* ${video.ago} 
┃ 🐣 *Link:* ${video.url}
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯
`;
        });

        desc += `
> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗
`;

await conn.sendMessage(from, {
    image: { url: search.videos[0].thumbnail}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
    caption: desc,
    contextInfo: {
        mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
        groupMentions: [],
        forwardingScore: 999,
        isForwarded: true,
        },
        externalAdReply: {
            title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
            body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
            mediaType: 1,
            sourceUrl: "https://youtube.com/@tech_with_pamiya",
            thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
            renderLargerThumbnail: false,
            showAdAttribution: true
        }
    }
  });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "video",
    desc: "To download videos.",
    react: "🎥",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please give me a URL or title.");

        q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 𝕄𝔻 𝕍𝕀𝔻𝔼𝕆 𝔻𝕆𝕎ℕ𝕃𝕆𝔸𝔻𝔼ℝ  ͟͞⏤

> 🎥 *Video Found!* 

╭╴╴╴╴╴ꜱᴀɴᴜᴜ╶╶╶╶╶╮
┃ 🌹 *Title:* ${data.title} 
┃ 🏵️ *Duration:* ${data.timestamp} 
┃ 🌳 *Views:* ${data.views} 
┃ 🕊️ *Uploaded On:* ${data.ago} 
┃ 🐣 *Link:* ${data.url} 
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

> 🕊️ Please reply with the number you watn to select:

╭╴╴╴╴╴ꜱᴀɴᴜᴜ╶╶╶╶╶╮
┃ 1️⃣ | *Video File* 🎶
┃
┃   1.1 *360*
┃   1.2 *480*
┃   1.3 *720*
┃   1.4 *1080*
┃     
┃ 2️⃣ | *Document File* 📂
┃
┃   2.1 *360*
┃   2.2 *480*
┃   2.3 *720*
┃   2.4 *1080*
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗
`;
let info = `
> 🎥 *MP4 Download Found!* 

╭╴╴╴╴╴ɪᴍᴢᴇʀ╶╶╶╶╶╮
┃ 🐣 *Title:* ${data.title} 
┃ 🕊️ *Duration:* ${data.timestamp} 
┃ 🌹 *Views:* ${data.views} 
┃ 🌳 *Uploaded On:* ${data.ago} 
┃ 🏵️ *Link:* ${data.url} 
╰╴╴╴╴╴ɪᴍᴢᴇʀ╶╶╶╶╶╯

> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗
`


        // Send the initial message and store the message ID
        const sentMsg = await conn.sendMessage(from, {
            image: { url: data.thumbnail}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
            caption: desc,
            contextInfo: {
                mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 999,
                isForwarded: true,
                  },
                externalAdReply: {
                    title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                    body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                    mediaType: 1,
                    sourceUrl: "https://youtube.com/@tech_with_pamiya",
                    thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
          });
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
                
        
                if (messageType === '1.1') {
                    const down = await ytmp4(`${url}`,"360p")                     
                    const downloadUrl = down;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    await conn.sendMessage(from, {
                video: { url: downloadUrl}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                caption: info,
                contextInfo: {
                    mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
                    groupMentions: [],
                    forwardingScore: 999,
                    isForwarded: true,
                      },
                    externalAdReply: {
                        title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                        body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                        mediaType: 1,
                        sourceUrl: "https://youtube.com/@tech_with_pamiya",
                        thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
                        renderLargerThumbnail: false,
                        showAdAttribution: true
                    }
                }
              });
                }else if (messageType === '1.2') {
                    const down = await ytmp4(`${url}`,`480`)                     
                    const downloadUrl = down;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    await conn.sendMessage(from, {
                video: { url: downloadUrl}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                caption: info,
                contextInfo: {
                    mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
                    groupMentions: [],
                    forwardingScore: 999,
                    isForwarded: true,
                      },
                    externalAdReply: {
                        title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                        body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                        mediaType: 1,
                        sourceUrl: "https://youtube.com/@tech_with_pamiya",
                        thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
                        renderLargerThumbnail: false,
                        showAdAttribution: true
                    }
                }
              });
                }else if (messageType === '1.3') {
                    const down = await ytmp4(`${url}`,`720`)                     
                    const downloadUrl = down;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    await conn.sendMessage(from, {
                video: { url: downloadUrl}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                caption: info,
                contextInfo: {
                    mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
                    groupMentions: [],
                    forwardingScore: 999,
                    isForwarded: true,
                      },
                    externalAdReply: {
                        title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                        body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                        mediaType: 1,
                        sourceUrl: "https://youtube.com/@tech_with_pamiya",
                        thumbnailUrl: https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
                        renderLargerThumbnail: false,
                        showAdAttribution: true
                    }
                }
              });
                }else if (messageType === '1.4') {
                    const down = await ytmp4(`${url}`,`1080`)                     
                    const downloadUrl = down;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    await conn.sendMessage(from, {
                video: { url: downloadUrl}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                caption: info,
                contextInfo: {
                    mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
                    groupMentions: [],
                    forwardingScore: 999,
                    isForwarded: true,
                    },
                    externalAdReply: {
                        title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                        body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                        mediaType: 1,
                        sourceUrl: "https://youtube.com/@tech_with_pamiya",
                        thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
                        renderLargerThumbnail: false,
                        showAdAttribution: true
                    }
                }
              });
                }else if (messageType === '2.1') {
                    const down = await ytmp4(`${url}`,`360`)                     
                    const downloadUrl = down;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    // Handle option 2 (Document File)
                    await conn.sendMessage(from, {
                        document: { url: downloadUrl},
                        mimetype: "video/mp4",
                        fileName: `${data.title}.mp4`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info,
                        contextInfo: {
                            mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
                            groupMentions: [],
                            forwardingScore: 999,
                            isForwarded: true,
                            },
                            externalAdReply: {
                                title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                                body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                                mediaType: 1,
                                sourceUrl: "https://youtube.com/@tech_with_pamiya?si=xrwIukM1BB8EPoG2",
                                thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
                                renderLargerThumbnail: false,
                                showAdAttribution: true
                            }
                        }
                      });
                }else if (messageType === '2.2') {
                    const down = await ytmp4(`${url}`,`480`)                     
                    const downloadUrl = down;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    // Handle option 2 (Document File)
                    await conn.sendMessage(from, {
                        document: { url: downloadUrl},
                        mimetype: "video/mp4",
                        fileName: `${data.title}.mp4`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info,
                        contextInfo: {
                            mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
                            groupMentions: [],
                            forwardingScore: 999,
                            isForwarded: true,
                             },
                            externalAdReply: {
                                title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                                body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                                mediaType: 1,
                                sourceUrl: "https://youtube.com/@tech_with_pamiya?si=xrwIukM1BB8EPoG2",
                                thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
                                renderLargerThumbnail: false,
                                showAdAttribution: true
                            }
                        }
                      });
                }else if (messageType === '2.3') {
                    const down = await ytmp4(`${url}`,`720`)                     
                    const downloadUrl = down;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    // Handle option 2 (Document File)
                    await conn.sendMessage(from, {
                        document: { url: downloadUrl},
                        mimetype: "video/mp4",
                        fileName: `${data.title}.mp4`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info,
                        contextInfo: {
                            mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
                            groupMentions: [],
                            forwardingScore: 999,
                            isForwarded: true,
                             },
                            externalAdReply: {
                                title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                                body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                                mediaType: 1,
                                sourceUrl: "https://youtube.com/@tech_with_pamiya?si=xrwIukM1BB8EPoG2",
                                thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
                                renderLargerThumbnail: false,
                                showAdAttribution: true
                            }
                        }
                      });
                }else if (messageType === '2.4') {
                    const down = await ytmp4(`${url}`,`1080`)                     
                    const downloadUrl = down;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    // Handle option 2 (Document File)
                    await conn.sendMessage(from, {
                        document: { url: downloadUrl},
                        mimetype: "video/mp4",
                        fileName: `${data.title}.mp4`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info,
                        contextInfo: {
                            mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
                            groupMentions: [],
                            forwardingScore: 999,
                            isForwarded: true,
                             },
                            externalAdReply: {
                                title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                                body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                                mediaType: 1,
                                sourceUrl: "https://youtube.com/@tech_with_pamiya?si=xrwIukM1BB8EPoG2",
                                thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
                                renderLargerThumbnail: false,
                                showAdAttribution: true
                            }
                        }
                      });} 
        
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

cmd({
    pattern: "ytmp4",
    desc: "Download YouTube videos as MP4.",
    react: "🎥",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a YouTube URL or title.");

        q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
> 🎥 *MP4 Download Found!* 

╭╴╴╴╴╴ꜱᴀɴᴜᴜ╶╶╶╶╶╮
┃ 🏵️ *Title:* ${data.title} 
┃ 🌳 *Duration:* ${data.timestamp} 
┃ 🕊️ *Views:* ${data.views} 
┃ 🌹 *Uploaded On:* ${data.ago} 
┃ 🐣 *Link:* ${data.url} 
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

> 🕊️ Please reply with the number you watn to select:

╭╴╴╴╴╴ɪᴍᴢᴇʀ╶╶╶╶╶╮
┃ 1️⃣ | *Video File* 🎶
┃
┃   1.1 *360*
┃   1.2 *480*
┃   1.3 *720*
┃   1.4 *1080*
┃     
┃ 2️⃣ | *Document File* 📂
┃
┃   2.1 *360*
┃   2.2 *480*
┃   2.3 *720*
┃   2.4 *1080*
╰╴╴╴╴╴ɪᴍᴢᴇʀ╶╶╶╶╶╯

> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗
`;
let info = `
> 🎥 *MP4 Download Found!* 

╭╴╴╴╴╴ɪᴍᴢᴇʀ╶╶╶╶╶╮
┃ 🐣 *Title:* ${data.title} 
┃ 🌹 *Duration:* ${data.timestamp} 
┃ 🕊️ *Views:* ${data.views} 
┃ 🌳 *Uploaded On:* ${data.ago} 
┃ 🏵️ *Link:* ${data.url} 
╰╴╴╴╴╴ɪᴍᴢᴇʀ╶╶╶╶╶╯

> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗
`

// Send the initial message and store the message ID
const sentMsg = await conn.sendMessage(from, {
    image: { url: data.thumbnail}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
    caption: desc,
    contextInfo: {
        mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
        groupMentions: [],
        forwardingScore: 999,
        isForwarded: true,
        },
        externalAdReply: {
            title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
            body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
            mediaType: 1,
            sourceUrl: "https://youtube.com/@tech_with_pamiya?si=xrwIukM1BB8EPoG2",
            thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
            renderLargerThumbnail: false,
            showAdAttribution: true
        }
    }
  });
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
        

        if (messageType === '1.1') {
            const down = await ytmp4(`${url}`,"360p")                     
            const downloadUrl = down;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            await conn.sendMessage(from, {
                video: { url: downloadUrl}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                caption: info,
                contextInfo: {
                    mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
                    groupMentions: [],
                    forwardingScore: 999,
                    isForwarded: true,
                      },
                    externalAdReply: {
                        title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                        body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                        mediaType: 1,
                        sourceUrl: "https://youtube.com/@tech_with_pamiya?si=xrwIukM1BB8EPoG2",
                        thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
                        renderLargerThumbnail: false,
                        showAdAttribution: true
                    }
                }
              });
        }else if (messageType === '1.2') {
            const down = await ytmp4(`${url}`,`480`)                     
            const downloadUrl = down;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            await conn.sendMessage(from, {
                video: { url: downloadUrl}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                caption: info,
                contextInfo: {
                    mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
                    groupMentions: [],
                    forwardingScore: 999,
                    isForwarded: true,
                     },
                    externalAdReply: {
                        title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                        body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                        mediaType: 1,
                        sourceUrl: "https://youtube.com/@tech_with_pamiya?si=xrwIukM1BB8EPoG2",
                        thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
                        renderLargerThumbnail: false,
                        showAdAttribution: true
                    }
                }
              });
        }else if (messageType === '1.3') {
            const down = await ytmp4(`${url}`,`720`)                     
            const downloadUrl = down;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            await conn.sendMessage(from, {
                video: { url: downloadUrl}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                caption: info,
                contextInfo: {
                    mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
                    groupMentions: [],
                    forwardingScore: 999,
                    isForwarded: true,
                       },
                    externalAdReply: {
                        title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                        body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                        mediaType: 1,
                        sourceUrl: "https://youtube.com/@tech_with_pamiya?si=xrwIukM1BB8EPoG2",
                        thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
                        renderLargerThumbnail: false,
                        showAdAttribution: true
                    }
                }
              });
        }else if (messageType === '1.4') {
            const down = await ytmp4(`${url}`,`1080`)                     
            const downloadUrl = down;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            await conn.sendMessage(from, {
                video: { url: downloadUrl}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                caption: info,
                contextInfo: {
                    mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
                    groupMentions: [],
                    forwardingScore: 999,
                    isForwarded: true,
                      },
                    externalAdReply: {
                        title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                        body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                        mediaType: 1,
                        sourceUrl: "https://youtube.com/@tech_with_pamiya?si=xrwIukM1BB8EPoG2",
                        thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
                        renderLargerThumbnail: false,
                        showAdAttribution: true
                    }
                }
              });
        }else if (messageType === '2.1') {
            const down = await ytmp4(`${url}`,`360`)                     
            const downloadUrl = down;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            // Handle option 2 (Document File)
            await conn.sendMessage(from, {
                        document: { url: downloadUrl},
                        mimetype: "video/mp4",
                        fileName: `${data.title}.mp4`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info,
                        contextInfo: {
                            mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
                            groupMentions: [],
                            forwardingScore: 999,
                            isForwarded: true,
                             },
                            externalAdReply: {
                                title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                                body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                                mediaType: 1,
                                sourceUrl: "https://youtube.com/@tech_with_pamiya?si=xrwIukM1BB8EPoG2",
                                thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
                                renderLargerThumbnail: false,
                                showAdAttribution: true
                            }
                        }
                      });
        }else if (messageType === '2.2') {
            const down = await ytmp4(`${url}`,`480`)                     
            const downloadUrl = down;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            // Handle option 2 (Document File)
            await conn.sendMessage(from, {
                        document: { url: downloadUrl},
                        mimetype: "video/mp4",
                        fileName: `${data.title}.mp4`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info,
                        contextInfo: {
                            mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
                            groupMentions: [],
                            forwardingScore: 999,
                            isForwarded: true,
                             },
                            externalAdReply: {
                                title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                                body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                                mediaType: 1,
                                sourceUrl: "https://youtube.com/@tech_with_pamiya?si=xrwIukM1BB8EPoG2",
                                thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
                                renderLargerThumbnail: false,
                                showAdAttribution: true
                            }
                        }
                      });
        }else if (messageType === '2.3') {
            const down = await ytmp4(`${url}`,`720`)                     
            const downloadUrl = down;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            // Handle option 2 (Document File)
            await conn.sendMessage(from, {
                        document: { url: downloadUrl},
                        mimetype: "video/mp4",
                        fileName: `${data.title}.mp4`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info,
                        contextInfo: {
                            mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
                            groupMentions: [],
                            forwardingScore: 999,
                            isForwarded: true,
                            },
                            externalAdReply: {
                                title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                                body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                                mediaType: 1,
                                sourceUrl: "https://youtube.com/@tech_with_pamiya?si=xrwIukM1BB8EPoG2",
                                thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
                                renderLargerThumbnail: false,
                                showAdAttribution: true
                            }
                        }
                      });
        }else if (messageType === '2.4') {
            const down = await ytmp4(`${url}`,`1080`)                     
            const downloadUrl = down;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            // Handle option 2 (Document File)
            await conn.sendMessage(from, {
                        document: { url: downloadUrl},
                        mimetype: "video/mp4",
                        fileName: `${data.title}.mp4`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info,
                        contextInfo: {
                            mentionedJid: ['94742876968@s.whatsapp.net'], // specify mentioned JID(s) if any
                            groupMentions: [],
                            forwardingScore: 999,
                            isForwarded: true,
                             },
                            externalAdReply: {
                                title: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                                body: '> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤',
                                mediaType: 1,
                                sourceUrl: "https://youtube.com/@tech_with_pamiya?si=xrwIukM1BB8EPoG2",
                                thumbnailUrl: 'https://github.com/NIKO-PAMIYA/BUNNY-MD/blob/%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F-%E1%B4%8D%E1%B4%85-%F0%9F%90%B0/media/20241124_092832.jpg?raw=true', // This should match the image URL provided above
                                renderLargerThumbnail: false,
                                showAdAttribution: true
                            }
                        }
                      });} 

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
