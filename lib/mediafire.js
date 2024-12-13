const axios = require('axios')
const cheerio = require('cheerio')

const mediafireDl = async (url) => {
const res = await axios.get(url) 
const $ = cheerio.load(res.data)
const shadow = []
const link = $('a#downloadButton').attr('href')
const size = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '')
const seplit = link.split('/')
const name = seplit[5]
mime = name.split('.')
mime = mime[1]
shadow.push({ name, mime, size, link })
return shadow
}


module.exports = { mediafireDl,mediafire:mediafireDl }
