const fs = require('fs');
const path = require('path');
const { fetchJson } = require('../lib/functions');
const { cmd, commands } = require('../command');
const config = require('../config'); // Require the new config file

// AUTO_REACT command
cmd({
    on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {
    if (config.AUTO_REACT === true) {
        const emojis = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈', '👋'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        try {
            await conn.sendMessage(from, {
                react: {
                    text: randomEmoji,
                    key: mek.key
                }
            });
        } catch (error) {
            console.error('Failed to send reaction:', error);
        }
    }
});

// AUTO_VOICE command
cmd({
    on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {
    const data = await fetchJson(`https://raw.githubusercontent.com/Mrrashmika/Database/refs/heads/main/data/autoreply.json`)

    if (config.AUTO_VOICE === true) {
        for (const text in data) {
            if (body.toLowerCase() === text.toLowerCase()) {
                await conn.sendPresenceUpdate('recording', from);
                await conn.sendMessage(from, { audio: { url: data[text] }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek });
                break;  // Exit loop after matching text
            }
        }
    }
});

// AUTO_STICKER command
cmd({
    on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {
    const data = await fetchJson(`https://raw.githubusercontent.com/Mrrashmika/Database/refs/heads/main/data/autosticker.json`)

    if (config.AUTO_STICKER === true) {
        for (const text in data) {
            if (body.toLowerCase() === text.toLowerCase()) {
                await conn.sendMessage(from, { sticker: { url: data[text] }, package: 'yourName' }, { quoted: mek });
                break;  // Exit loop after matching text
            }
        }
    }
});

// AUTO_REPLY command
cmd({
    on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {
    const data = await fetchJson(`https://raw.githubusercontent.com/Mrrashmika/Database/refs/heads/main/data/autovoice.json`)

    if (config.AUTO_REPLY === true) {
        for (const text in data) {
            if (body.toLowerCase() === text.toLowerCase()) {
                await m.reply(data[text]);
                break;  // Exit loop after matching text
            }
        }
    }
});


