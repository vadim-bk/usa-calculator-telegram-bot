const TelegramApi = require('node-telegram-bot-api')
const initializeApp = require('firebase/app')

const telegramBotToken = '5315746315:AAFvb1W-YmifbCWJYfeYajGTfGli3HtqrfQ'

const bot = new TelegramApi(telegramBotToken, { polling: true })

const firebaseConfig = {
  apiKey: "AIzaSyA-qvOtMKZHR-Rlz7336xOwIi2LeauLOuk",
  authDomain: "usa-fee-calculator-bot.firebaseapp.com",
  projectId: "usa-fee-calculator-bot",
  storageBucket: "usa-fee-calculator-bot.appspot.com",
  messagingSenderId: "258909441388",
  appId: "1:258909441388:web:b2875583c2e9e02d3fb749"
};

const app = initializeApp(firebaseConfig);

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