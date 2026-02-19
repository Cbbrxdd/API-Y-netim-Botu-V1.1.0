const { Client, Partials, Collection } = require('discord.js');
const glob = require('glob');
const config = require('./Settings/config.js');
const client = global.client = new Client({
    intents: [3276799],
    partials: [ Partials.Channel, Partials.GuildMember, Partials.User],
    presence: { activities: [{ name: 'Dildo API Services', type: ActivityType.Playing }], status: "dnd"}
});
client.buttonCommands = new Collection();
client.modalCommands = new Collection();
client.slashCommands = new Collection();
client.selectCommands = new Collection();
client.globalCommands = [];
const commandFiles = glob.sync('./Commands/**/*.js');
for (const file of commandFiles) {
    const commandName = file.split('\\')[file.split('\\').length - 2]
    const command = require(`./${file}`)
    if(commandName == "SlashCommands"){
        client[commandName.charAt(0).toLowerCase() + commandName.slice(1) ].set(command.name, command)
        client.globalCommands.push(command.commandData);
    } else client[commandName.charAt(0).toLowerCase() + commandName.slice(1)].set(command.customId, command);
}
const eventFiles = glob.sync('./Events/**/*.js');
for(const file of eventFiles) {
    const event = require(`./${file}`)
    client.on(event.name, event.execute)
}
client.login(config.token)
require('./Database/connect.js')