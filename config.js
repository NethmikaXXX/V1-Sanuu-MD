                                                                                                                     
const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "ANJU-MD=LM9DBIBJ#Jpp4e0qbHGN4iz19LWSmVFsnrfGac3cNSrxHFW5V_uo",
ALIVE_IMG: process.env.ALIVE_IMG || "https://github.com/NIKO-PAMIYA/Img/blob/main/20241104_100318.jpg?raw=true",
POSTGRESQL_URL: process.env.POSTGRESQL_URL || 'YOUR POSTGRESQL URL',
PREFIX: process.env.PREFIX || ".",
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
MODE: process.env.MODE || "public",
BOT_NUMBER: process.env.BOT_NUMBER || "94742876968",
OWNER_NAME: process.env.OWNER_NAME || "Mᴿꪻ͠ɴᴇ⃖͢ᴛʜ⃛͟ᴍ͓͜ᴵᴋᴀ⃜༊̷͓͓̺͌:||⸙💗",
BOT_NAME: process.env.BOT_NAME || "> ⏤͟͞ 𝕊𝔸ℕ𝕌𝕌 ꪶ鍶ꫂ 𝕄𝔻 ϟ  ͟͞⏤",
OMDB_API_KEY: process.env.OMDB_API_KEY || "76cb7f39",
READ_CMD: process.env.READ_CMD || "true",
AUTO_VOICE: process.env.AUTO_VOICE || "true",
AUTO_STICKER: process.env.AUTO_STICKER || "true",
AUTO_REPLY: process.env.AUTO_REPLY || "true",
AUTO_REACT: process.env.AUTO_REACT || "true",
WELCOME: process.env.WELCOME || "false",  //To turn on or off welcome msg and goodbye msg..
ANTI_BAD: process.env.ANTI_BAD || "true",
ANTI_BOT: process.env.ANTI_BOT || "true",
ANTI_LINK: process.env.ANTI_LINK || "true",
ALLWAYS_ONLINE: process.env.ALLWAYS_ONLINE || "true",
MOROCCO_BLOCK: process.env.MOROCCO_BLOCK || "true", // +212 number block..
};
