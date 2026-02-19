module.exports = {
    name: "ready",
    async execute(client){
        
        client.application.commands.set(client.globalCommands);
        console.log(`[BOT] Bot is ready!`);

    }
}