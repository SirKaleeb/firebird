if (process.env.NODE_ENV !== "production") require("dotenv").config();

const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");

bot.commands = new Discord.Collection();

const cmdFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of cmdFiles) {
  let cmd = require(`./commands/${file}`);
  bot.commands.set(cmd.name, cmd);
}

bot.once("ready", () => console.log("Bot is ready..."));

let prefix = "$";
bot.on("message", async (message) => {
  // let g;
  // if (g.prefix !== prefix) prefix = g.prefix;

  if (
    !message.content.startsWith(prefix) ||
    message.author.bot ||
    message.channel.type == "dm"
  )
    return;

  let args = message.content.slice(prefix.length).split(" ");
  let command = bot.commands.get(args[0].toLowerCase());

  if (!command) return;
  else
    command.execute(
      message,
      args.slice(1),
      bot,
      prefix,
      process.env.EMBED_COLOR
    );
});

bot.on("guildCreate", async (guild) => {});

bot.login(process.env.BOT_TOKEN);
