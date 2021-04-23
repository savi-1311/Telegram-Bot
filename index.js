const {Telegraf} = require("telegraf");
require('dotenv').config();
const Bot_Token = process.env.Bot_Token;
const app = new Telegraf(process.env.Bot_Token);
const axios = require("axios");
const { createClient } =  require ("pexels");

const client = createClient('563492ad6f91700001000001c2824a8b00ad40c8ae226795f56765e8');

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
      } You can Search HD images from here`
    );
  } else {
    ctx.reply(
      `Welcome ${ctx.message.from.id} You can Search HD images from here`
    );
  }
});

app.hears('hi', (ctx) => ctx.reply('Hey there'));

// when user sends a text message app.on("text") will call
app.on("text", async (ctx) => {
  try {
    ctx.reply("⌛️ Please Wait It will take few seconds to grab Images");
    const query = ctx.message.text;
    const photos = await client.photos.search({query , per_page: 10 });
    console.log(photos.photos.length);
    if(photos.photos.length > 0)
    {
      const size = photos.photos.length;
      for(var i=0;i<size;i++)
      {
        ctx.replyWithPhoto({
            url: photos.photos[i].src.original,
            filename: 'pic.jpg'
      })
      }

    }
    else
    ctx.reply("Sorry Image not found :(");
  } catch (e) {
    console.log(e);
    ctx.reply("Please try after sometime PexelsPlash is down :(")
  }
});

// const fetchImages = async (text) => {
//     const photos =  await 
//       console.log(photos);
//       if (photos.length > 0) {
//         console.log(photos);
//       return photos.map(({ src }) => ({ media: { url: src? NULL :original }, caption: "Pexel", type: "photo" }));
//     };
// }

app.startPolling();
console.log("Started");