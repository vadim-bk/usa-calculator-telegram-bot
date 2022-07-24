const TelegramApi = require('node-telegram-bot-api')

const token = '5315746315:AAFvb1W-YmifbCWJYfeYajGTfGli3HtqrfQ'

const bot = new TelegramApi(token, { polling: true })

const getSum = (price) => {
  const priceCarAndAuctionFee = price + (price * 0.07)
  const money24Fee = (priceCarAndAuctionFee * 0.005) + 150
  
  return priceCarAndAuctionFee + money24Fee
}

bot.on('message', async (message) => {
  const chatId = message.chat.id
  const text = message.text

  if (text === '/start') {
    return bot.sendMessage(chatId, 'Hi, please enter car price and you will get calculated sum (auction fee + Money24/7 fee)') 
  }

  const sum = getSum(Number(text))
  return bot.sendMessage(chatId, sum)
})