const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, sendReply, sendMediaMessage } = context;

if (!m.quoted) return sendReply(client, m, `Did you quote a message ?`); 

client.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.quoted.id, participant: m.quoted.sender } }); 
  });

