const crypto = require('crypto');
const axios = require('axios');
const config = require('../config.cjs');
const { cmd } = require('../command');

cmd({
    pattern: "gpass",
    desc: "Generate a strong password.",
    category: "other",
    react: "🔐",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const length = args[0] ? parseInt(args[0]) : 12; // Default length is 12 if not provided
        if (isNaN(length) || length < 8) {
            return reply('Please provide a valid length for the password (minimum 8 characters).');
        }

        const generatePassword = (len) => {
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
            let password = '';
            for (let i = 0; i < len; i++) {
                const randomIndex = crypto.randomInt(0, charset.length);
                password += charset[randomIndex];
            }
            return password;
        };

        const password = generatePassword(length);
        const message = `🔐 *Your Strong Password* 🔐\n\nPlease find your generated password below:\n\n> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤\n\n> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗`;

        // Send initial notification message
        await conn.sendMessage(from, { text: message }, { quoted: mek });

        // Send the password in a separate message
        await conn.sendMessage(from, { text: password }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`❌ Error generating password: ${e.message}`);
    }
});


cmd({
    pattern: "githubstalk",
    desc: "Fetch detailed GitHub user profile including profile picture.",
    category: "other",
    react: "🖥️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const username = args[0];
        if (!username) {
            return reply("Please provide a GitHub username.");
        }

        const apiUrl = `https://api.github.com/users/${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let userInfo = `
⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 𝕄𝔻 𝔹𝕀𝕋 𝔾𝕀𝕋 𝕊𝕋𝔸𝕃𝕂  ͟͞⏤

╭╴╴╴╴╴ꜱᴀɴᴜᴜ╶╶╶╶╶╮
┃ 👤 *Username*: ${data.name || data.login}
┃ 🔗 *Github Url*:(${data.html_url})
┃ 📝 *Bio*: ${data.bio || 'Not available'}
┃ 🏙️ *Location*: ${data.location || 'Unknown'}
┃ 📊 *Public Repos*: ${data.public_repos}
┃ 👥 *Followers*: ${data.followers} | Following: ${data.following}
┃ 📅 *Created At*: ${new Date(data.created_at).toDateString()}
┃ 🔭 *Public Gists*: ${data.public_gists}
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗
`;

        await conn.sendMessage(from, { image: { url: data.avatar_url }, caption: userInfo }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching data: ${e.response ? e.response.data.message : e.message}`);
    }
});

cmd({
    pattern: "srepo",
    desc: "Fetch information about a GitHub repository.",
    category: "other",
    react: "📁",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const repo = args.join(' ');
        if (!repo) {
            return reply("Please provide a GitHub repository name in the format `owner/repo`.");
        }

        const apiUrl = `https://api.github.com/repos/${repo}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let repoInfo = `⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 𝕄𝔻 ℝ𝔼ℙ𝕆𝕊𝕀𝕋𝕆ℝ𝕐 𝕀ℕ𝔽𝕆  ͟͞⏤\n\n╭╴╴╴╴╴ꜱᴀɴᴜᴜ╶╶╶╶╶╮`;
        repoInfo += `┃ 📌 *Name*: ${data.name}\n`;
        repoInfo += `┃ 🔗 *URL*: ${data.html_url}\n`;
        repoInfo += `┃ 📝 *Description*: ${data.description}\n`;
        repoInfo += `┃ ⭐ *Stars*: ${data.stargazers_count}\n`;
        repoInfo += `┃ 🍴 *Forks*: ${data.forks_count}\n╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯\n`;
        repoInfo += `\n`;
        repoInfo += `> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤\n\n> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗`;

        await conn.sendMessage(from, { text: repoInfo }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching repository info: ${e.message}`);
    }
});

cmd({
    pattern: "weather",
    desc: "🌤 Get weather information for a location",
    react: "🌤",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❗ Please provide a city name. Usage: .weather [city name]");

        const apiKey = '2d61a72574c11c4f36173b627f8cb177'; 
        const city = q;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);
        const data = response.data;

        const weather = `
🌍 *Weather Information for ${data.name}, ${data.sys.country}* 🌍

╭╴╴╴╴╴ꜱᴀɴᴜᴜ╶╶╶╶╶╮
┃ 🎋 *Temperature*: ${data.main.temp}°C
┃ 🎋 *Feels Like*: ${data.main.feels_like}°C
┃ 🎋 *Min Temp*: ${data.main.temp_min}°C
┃ 🎋 *Max Temp*: ${data.main.temp_max}°C
┃ 🎋 *Humidity*: ${data.main.humidity}%
┃ 🌾 *Weather*: ${data.weather[0].main}
┃ 🌾 *Description*: ${data.weather[0].description}
┃ 🌾 *Wind Speed*: ${data.wind.speed} m/s
┃ 🌾 *Pressure*: ${data.main.pressure} hPa
╰╴╴╴╴╴ɴᴇᴛʜᴍɪᴋᴀ╶╶╶╶╶╯

> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤
> Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗
`;

        return reply(weather);
    } catch (e) {
        console.log(e);
        if (e.response && e.response.status === 404) {
            return reply("> 🚫 City not found. Please check the spelling and try again.");
        }
        return reply("> ⚠️ An error occurred while fetching the weather information. Please try again later.");
    }
});
