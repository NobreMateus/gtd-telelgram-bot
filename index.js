require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const { Client } = require("@notionhq/client")
const express = require('express')
const app = express()

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.DATABASE_ID;

const bot = new TelegramBot(TELEGRAM_TOKEN, {polling: true});

const notion = new Client({
  auth: NOTION_TOKEN
})

bot.onText(/\/s (.+)/, async  (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];

    await notion.pages.create({
        parent: { database_id: DATABASE_ID },
        properties: { Name: {title: [ { text: {content: resp }}]},
    }})

    bot.sendMessage(chatId, "Item Criado!");
});

app.get('/', function (req, res) {
    res.send('Server Iniciado!')
})

app.listen(8080)
  
console.log("Server Iniciado!")

