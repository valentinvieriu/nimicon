const Iqons = require("@nimiq/iqons").default;
const url = require("url");
const sharp = require("sharp");
const {createError} = require('micro')

module.exports = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let { text, size } = parsedUrl.query;
  if (!text) {
    throw createError(500, 'You need to provide a text query parameter!')
  }
  const svg = await Iqons.svg(text);
  size = Number(size) || 160;
  const svgBuff = Buffer.from(svg);
  const svgData = await sharp(svgBuff, { density: (72 * size) / 160 })
    .resize(size, size)
    .png()
    .toBuffer();
  res.setHeader("Content-Type", "image/png");
 return svgData;
};
