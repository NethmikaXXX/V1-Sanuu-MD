const { cmd } = require('../command');
const { exec } = require('child_process');
const config = require('../config.cjs');
const {sleep} = require('../lib/functions')

// 1. Shutdown Bot
cmd({
    pattern: "shutdown",
    desc: "Shutdown the bot.",
    category: "owner",
    react: "🧞‍♀️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ 𝗬𝗢𝗨 𝗔𝗥𝗘 𝗡𝗢𝗧 𝗧𝗛𝗘 𝗢𝗪𝗡𝗘𝗥 ");
    return reply("🎋 𝗦𝘂𝗿𝗿𝗶𝗻𝗴 𝗗𝗼𝘄𝗻 .....").then(() => process.exit());
});

// 2. Broadcast Message to All Groups
cmd({
    pattern: "broadcast",
    desc: "Broadcast a message to all groups.",
    category: "owner",
    react: "🧞‍♀️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, args, reply }) => {
    if (!isOwner) return reply("❌ 𝗬𝗢𝗨 𝗔𝗥𝗘 𝗡𝗢𝗧 𝗧𝗛𝗔 𝗢𝗪𝗡𝗘𝗥 !");
    if (args.length === 0) return reply("📢 𝗣𝗹𝗲𝗮𝘀𝗲 𝗣𝗿𝗼𝘃𝗶𝗱𝗲 𝗔 𝗠𝗲𝘀𝘀𝗮𝗴𝗲 𝗧𝗼 𝗕𝗿𝗼𝗮𝗱𝗰𝗮𝘀𝘁.");

    const message = args.join(' ');
    const groups = Object.keys(await conn.groupFetchAllParticipating());

    for (const groupId of groups) {
        await conn.sendMessage(groupId, { text: message }, { quoted: mek });
    }

    return reply("🎋 𝗠𝗲𝘀𝘀𝗮𝗴𝗲 𝗕𝗿𝗼𝗮𝗱𝗰𝗮𝘀𝘁𝗲𝗱 𝗧𝗼 𝗔𝗹𝗹 𝗚𝗿𝗼𝘂𝗽𝘀.");
});

// 3. Set Profile Picture


// 4. Block User
cmd({
    pattern: "block",
    desc: "Block a user.",
    category: "owner",
    react: "🚫",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ 𝗬𝗢𝗨 𝗔 𝗡𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 ");
    if (!quoted) return reply("❌ *`_Please reply to the user you want to block._`*");

    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'block');
        reply(`🚫 User ${user} blocked successfully.`);
    } catch (error) {
        reply(`> ❌ Error blocking user: ${error.message}`);
    }
});

// 5. Unblock User
cmd({
    pattern: "unblock",
    desc: "Unblock a user.",
    category: "owner",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted) return reply("❌ Please reply to the user you want to unblock.");

    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'unblock');
        reply(`✅ User ${user} unblocked successfully.`);
    } catch (error) {
        reply(`> ❌ Error unblocking user: ${error.message}`);
    }
});

// 6. Clear All Chats
cmd({
    pattern: "clearchats",
    desc: "Clear all chats from the bot.",
    category: "owner",
    react: "🧹",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("> ❌ You are not the owner!");
    try {
        const chats = conn.chats.all();
        for (const chat of chats) {
            await conn.modifyChat(chat.jid, 'delete');
        }
        reply("🧹 All chats cleared successfully!");
    } catch (error) {
        reply(`> ❌ Error clearing chats: ${error.message}`);
    }
});

// 7. Get Bot JID
cmd({
    pattern: "jid",
    desc: "Get the chat's JID.",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("> ❌ You are not the owner!");
    
    // The 'from' variable contains the JID of the chat (group or individual)
    reply(`🤖 *Chat JID:* ${from}`);
});


// 8. Group JIDs List
cmd({
    pattern: "gjid",
    desc: "Get the list of JIDs for all groups the bot is part of.",
    category: "owner",
    react: "📝",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("> ❌ You are not the owner!");

    const groups = await conn.groupFetchAllParticipating();
    const groupJids = Object.keys(groups).join('\n');
    reply(`📝 *Group JIDs:*\n\n${groupJids}`);
});

//9. restart
cmd({
    pattern: "restart",
    desc: "To restart the bot",
    react: "💢",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if(!isOwner)return
const {exec} = require("child_process")
reply("Sanuu MD is restarting 🐣")
await sleep(1500)
exec("pm2 restart all")
}catch(e){
console.log(e)
reply(`${e}`)
}
})
