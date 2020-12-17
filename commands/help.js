const capitalize = require("capitalize");

module.exports = {
  name: "help",
  description: "this is a ping command!",
  execute(message, args, bot, prefix, embedColor) {
    if (args == "") return message.channel.send("Please visit https://github.com/SirKaleeb/firebirdd/COMMANDS.md");
    else {
      let command = bot.commands.get(args[0].toLowerCase());
      return message.channel.send(`**\` ${capitalize(command.name)} Help \`**\n\n${command.description.replace(/{prefix}/, prefix)}`);
    }
  },
};
