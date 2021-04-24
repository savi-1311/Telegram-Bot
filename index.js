const {Telegraf} = require("telegraf");
require('dotenv').config();
var cricapi = require("cricapi");
const Bot_Token = process.env.Bot_Token;
const app = new Telegraf(process.env.Bot_Token);
const axios = require("axios");

const cricApiKey = process.env.cricApiKey;

app.start(ctx => {
  console.log(ctx.message.from);
  if (ctx.message.from.username !== undefined) {
    ctx.reply(
      `Welcome ${ctx.message.from.username} Give the /matches command to get the list and unique id of the match to get the score.`
      );
  } else if (ctx.message.from.first_name !== undefined) {
    ctx.reply(
      `Welcome ${ctx.message.from.first_name} ${
        ctx.message.from.last_name
      } Give the /matches command to get the list and unique id of the match to get the score.`
      );
  } else {
    ctx.reply(
      `Welcome ${ctx.message.from.id} Give the /matches command to get the list and unique id of the match to get the score.`
      );
  }
});

app.hears('hi', (ctx) => ctx.reply('Hey there'));

app.command("matches", async(ctx)=> {
  try
  {
    axios.get(`https://cricapi.com/api/matches?apikey=${cricApiKey}`)
  .then(function (response) {
    // handle success
    var matches = [];
    matches = response.data.matches;
    var count=0;
    matches.map(function loop(match){
      if(match.winner_team===undefined && match.matchStarted==true)
      {
        ctx.reply(`🤩 Teams: ${match["team-1"]} vs ${match["team-2"]}\n Unique ID: ${match.unique_id} \n Currently in Progress`)
          count++;
          if(count==5)
                loop.stop = true;
      }
    })
    matches=matches.slice(0,5);
    matches.map((match) => (
        ctx.reply(`🔴 Teams: ${match["team-1"]} vs ${match["team-2"]}\n Unique ID: ${match.unique_id}`)
    ))
  })
  .catch(function (error) {
    console.log(error);
    ctx.reply("Sorry! There has been an error :(")
  })
  .then(function () {
  });
  ctx.reply("Enter the Match ID you wish to know about 🎯")
}
catch(e)
{
  console.log(e);
  ctx.reply("Please try after sometime :(")
}
});


app.on("text", async(ctx)=> {
  try
  {
    console.log(ctx.message.text);
    axios.get(`https://cricapi.com/api/cricketScore?unique_id=${ctx.message.text}&apikey=${cricApiKey}`)
  .then(function (response) {
        ctx.reply(`🏏 Score: ${response.data.score}`);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
  });
}
catch(e)
{
  console.log(e);
  ctx.reply("Please try after sometime :(")
}
});

app.startPolling();
console.log("Started");