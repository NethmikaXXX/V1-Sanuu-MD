const { fetchJson } = require('../lib/functions')
const { cmd, commands } = require('../command')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const cheerio = require('cheerio')
const ffmpeg = require('fluent-ffmpeg')
const config = require('../config'); // Ensure your API key is in config
const axios = require('axios');
const { Buffer } = require('buffer');
const Esana = require('@sl-code-lords/esana-news');
var {subsearch , subdl }  = require('@sl-code-lords/si-subdl');

var api = new Esana()
//esana
cmd({
    pattern: "esananews",
    react: '📝',
    desc: "To see esana news",
    category: "search",
    use: '.sirasa',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const latst = await api.latest_id();
            const nws = latst.results.news_id
            let nn = q || nws
            const ress = await api.news(nn);
            const res = ress.results;

            const txt2 = await conn.sendMessage(from, {image: 
	    {url: res.COVER},caption: `╭╴╴╴╴╴ꜱᴀɴᴜʜ╶╶╶╶╶╮\n┃◉* ⇨ Title :
 ${res.TITLE}\n\n*┃◉* ⇨ Date :
 ${res.PUBLISHED}\n\n*┃◉* ⇨ Url :
 ${res.URL}\n\n*┃◉* ⇨ Description :
 ${res.DESCRIPTION}\n╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯\ɴ\ɴ> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤\n\n> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗`},
			{ quoted: mek });
await conn.sendMessage(from, { react: { text: '✅', key: mek.key }})

} catch (e) {
console.log(e)
reply(`${e}`)
}
});

const GOOGLE_API_KEY = 'AIzaSyDebFT-uY_f82_An6bnE9WvVcgVbzwDKgU'; // Replace with your Google API key
const GOOGLE_CX = '45b94c5cef39940d1'; // Replace with your Google Custom Search Engine ID

cmd({
    pattern: "img",
    desc: "Search and send images from Google.",
    react: "🧩",
    category: "search",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a search query for the image.");

        // Fetch image URLs from Google Custom Search API
        const searchQuery = encodeURIComponent(q);
        const url = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&cx=${GOOGLE_CX}&key=${GOOGLE_API_KEY}&searchType=image&num=5`;
        
        const response = await axios.get(url);
        const data = response.data;

        if (!data.items || data.items.length === 0) {
            return reply("No images found for your query.");
        }

        // Send images
        for (let i = 0; i < data.items.length; i++) {
            const imageUrl = data.items[i].link;

            // Download the image
            const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(imageResponse.data, 'binary');

            // Send the image with a footer
            await conn.sendMessage(from, {
                image: buffer,
                caption: `
💛⃟🧚 *Image ${i + 1} from your search!* 🧚⃟💛

⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 𝕄𝔻 𝕀𝕄𝔾 𝔻𝕆𝕎ℕ𝕃𝕆𝔸𝔻𝔼ℝ  ͟͞⏤

Enjoy these images! 📸

> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗
`
}, { quoted: mek });
}

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});

cmd({
    pattern: "movie",
    desc: "Fetch detailed information about a movie.",
    category: "search",
    react: "🎬",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const movieName = args.join(' ');
        if (!movieName) {
            return reply("📽️ Please provide the name of the movie.");
        }

        const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${config.OMDB_API_KEY}`;
        const response = await axios.get(apiUrl);

        const data = response.data;
        if (data.Response === "False") {
            return reply("🚫 Movie not found.");
        }

        const movieInfo = `
🎬 *Movie Information* 🎬

╭╴╴╴╴╴ꜱᴀɴᴜᴜ╶╶╶╶╶╮
┃ 🎥 *Title:* ${data.Title}
┃ 📅 *Year:* ${data.Year}
┃ 🌟 *Rated:* ${data.Rated}
┃ 📆 *Released:* ${data.Released}
┃ ⏳ *Runtime:* ${data.Runtime}
┃ 🎭 *Genre:* ${data.Genre}
┃ 🎬 *Director:* ${data.Director}
┃ ✍️ *Writer:* ${data.Writer}
┃ 🎭 *Actors:* ${data.Actors}
┃ 📝 *Plot:* ${data.Plot}
┃ 🌍 *Language:* ${data.Language}
┃ 🇺🇸 *Country:* ${data.Country}
┃ 🏆 *Awards:* ${data.Awards}
┃ ⭐ *IMDB Rating:* ${data.imdbRating}
┃ 🗳️ *IMDB Votes:* ${data.imdbVotes}
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗
`;

        // Define the image URL
        const imageUrl = data.Poster && data.Poster !== 'N/A' ? data.Poster : config.ALIVE_IMG;

        // Send the movie information along with the poster image
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: `${movieInfo}`,
            contextInfo: {
                mentionedJid: [ '' ],
                groupMentions: [],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363317542947574@g.us',
                  newsletterName: "ʙᴜɴɴʏ ᴍᴅ ᴜꜱᴇʀ ʙᴏᴛ ",
                  serverMessageId: 999
                }} 
        }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});


cmd({
    pattern: "news",
    desc: "Get the latest news headlines.",
    category: "search",
    react: "📰",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const apiKey="0f2c43ab11324578a7b1709651736382";
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
        const articles = response.data.articles;

        if (!articles.length) return reply("No news articles found.");

        // Send each article as a separate message with image and title
        for (let i = 0; i < Math.min(articles.length, 5); i++) {
            const article = articles[i];
            let message = `
╭╴╴╴╴╴ꜱᴀɴᴜᴜ╶╶╶╶╶╮
┃ 📰 *${article.title}*
┃ ⚠️ _${article.description}_
┃ 🔗 _${article.url}_
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗
            `;

            console.log('Article URL:', article.urlToImage); // Log image URL for debugging

            if (article.urlToImage) {
                // Send image with caption
                await conn.sendMessage(from, { image: { url: article.urlToImage }, caption: message });
            } else {
                // Send text message if no image is available
                await conn.sendMessage(from, { text: message ,
                    contextInfo: {
                        mentionedJid: [ '' ],
                        groupMentions: [],
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                          newsletterJid: '120363317542947574@g.us',
                          newsletterName: "> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤",
                          serverMessageId: 999
                        }} 
                });
            }
        };
    } catch (e) {
        console.error("Error fetching news:", e);
        reply("Could not fetch news. Please try again later.");
    }
});



async function xnxxs(query) {
    return new Promise((resolve, reject) => {
      const baseurl = 'https://www.xnxx.com';
      fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`, {method: 'get'}).then((res) => res.text()).then((res) => {
        const $ = cheerio.load(res, {xmlMode: false});
        const title = [];
        const url = [];
        const desc = [];
        const results = [];
        $('div.mozaique').each(function(a, b) {
          $(b).find('div.thumb').each(function(c, d) {
            url.push(baseurl + $(d).find('a').attr('href').replace('/THUMBNUM/', '/'));
          });
        });
        $('div.mozaique').each(function(a, b) {
          $(b).find('div.thumb-under').each(function(c, d) {
            desc.push($(d).find('p.metadata').text());
            $(d).find('a').each(function(e, f) {
              title.push($(f).attr('title'));
            });
          });
        });
        for (let i = 0; i < title.length; i++) {
          results.push({title: title[i], info: desc[i], link: url[i]});
        }
        resolve({status: true, result: results});
      }).catch((err) => reject({status: false, result: err}));
    });
  }
  
  cmd({
      pattern: "xnxxs",
      alias: ["xnxxsearch"],
      use: '.yts <song name>',
      react: "💦",
      desc: "Search and get details from xnxx.",
      category: "nsfw",
      filename: __filename
  
  },
  
  async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
  try{
  //if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
  if (!q) return reply('🚩 *Please give me words to search*')
  let res = await xnxxs(q)
  let x = res.result.map((v) => `乂 S-XNXX 乂\n◦ *Title:* ${v.title}\n◦ *Info:* ${v.info}\n◦ *Link:* ${v.link}`).join`\n\n°°°°°°°°°°°°°°°°°°°°°°°°°°°°°\n\n`
  reply(x)
  } catch (e) {
      console.log(e)
    await conn.sendMessage(from, { text: '🚩 *Error !!*' }, { quoted: mek } )
  }
  })

  cmd({
    pattern: "xvs",
    alias: ["xvideossearch"],
    react: "🫣",
    desc: "Search and get details from xvideos.",
    category: "nsfw",
    use: '.xvs <query>',
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        // Check if a search query is provided
        if (!q) return reply("🚩 Please provide a search term!");

        // Fetch search results from the API
        const searchResults = await fetchJson(`https://www.dark-yasiya-api.site/search/xvideo?q=${q}`);
        
        // Check if there are results
        if (!searchResults || searchResults.result.length === 0) return reply("No results found!");

        // Format the results into a readable message
        let resultsMessage = searchResults.result.map((v, index) => 
            `乂 *XVIDEOS Result ${index + 1}* 乂\n╭╴╴╴╴╴ꜱᴀɴᴜᴜ╶╶╶╶╶╮\n┃ *Title:* ${v.title}\n┃ *Info:* ${v.info}\n┃ *Link:* ${v.url}\n╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯\n\n> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤\n\n> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗`
        ).join('\n\n°°°°°°°°°°°°°°°°°°°°°°°°°°°°°\n\n');

        // Send the formatted results
        reply(resultsMessage);

    } catch (e) {
        console.log(e);
        reply("🚩 An error occurred while searching on XVIDEOS.");
    }
});

cmd({
    pattern: "ginisisila",
    alias: ["searchgini"],
    desc: "Search Ginisisila Cartoons",
    category: "search",
    filename: __filename
  }, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      if (!q) {
        return conn.sendMessage(from, { text: "❌ Please provide a search term." }, { quoted: mek });
      }
  
      // Construct the API URL with the search term
      const apiUrl = `https://www.dark-yasiya-api.site/search/ginisisila?text=${encodeURIComponent(q)}&page=1`;
  
      // Fetch data from the API using fetchJson
      const data = await fetchJson(apiUrl);
  
      if (!data.status) {
        return conn.sendMessage(from, { text: "❌ No results found." }, { quoted: mek });
      }
  
      const results = data.result.data;
      let message = `💦 GINISISILA CARTOON SEARCH RESULTS 💦\n\n`;
  
      // Loop through results and format the message
      results.forEach((item, index) => {
        message += `🎥 **${item.title}**\n`;
        message += `📅 ${item.posted_date}\n`;
        message += `📸 ![Image](${item.image})\n`; // If your chat supports this, otherwise you can send the image separately
        message += `🔗 [Watch Here](${item.url})\n\n`;
      });
  
      // Send the message with all results
      await conn.sendMessage(from, { text: message }, { quoted: mek });
    } catch (e) {
      console.error(e);
      reply(`An error occurred: ${e.message}`);
    }
  });
  
