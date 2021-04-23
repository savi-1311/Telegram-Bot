const {Telegraf} = require("telegraf");
require('dotenv').config();
const Bot_Token = process.env.Bot_Token;
const app = new Telegraf(process.env.Bot_Token);
const axios = require("axios");

app.start(ctx => {
  console.log(ctx.message.from);
  if (ctx.message.from.username !== undefined) {
    ctx.reply(
      `Welcome ${ctx.message.from.username} You can Search HD images from here`
    );
  } else if (ctx.message.from.first_name !== undefined) {
    ctx.reply(
      `Welcome ${ctx.message.from.first_name} ${
      ctx.message.from.last_name
      } This is my first Bot`
    );
  } else {
    ctx.reply(
      `Welcome ${ctx.message.from.id} This is my first Bot`
    );
  }
});
app.startPolling();
console.log("Started");