const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');

module.exports = async (context) => {
  const { client, m, packname, author, msgEminem } = context;

  if (!msgEminem) {
    m.reply('Quote an image or a short video.');
    return;
  }

  let media;
  if (msgEminem.imageMessage) {
    media = msgEminem.imageMessage;
  } else if (msgEminem.videoMessage) {
    media = msgEminem.videoMessage;
  } else {
    m.reply('That is neither an image nor a short video!');
    return;
  }

  var result = await client.downloadAndSaveMediaMessage(media);

  let stickerResult = new Sticker(result, {
    pack: packname,
    author: author,
    type: StickerTypes.FULL,
    categories: ["🤩", "🎉"],
    id: "12345",
    quality: 70,
    background: "transparent",
  });

  const Buffer = await stickerResult.toBuffer();
  client.sendMessage(m.chat, { sticker: Buffer }, { quoted: m });
}
