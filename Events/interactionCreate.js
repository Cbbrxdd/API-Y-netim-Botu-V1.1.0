const { EmbedBuilder } = require('discord.js') 
const customerSchema = require('../Database/Schema/user')

module.exports = {
    name: "interactionCreate",
    async execute(int) {

        const client = int.client;
        const embed = new EmbedBuilder()
        .setAuthor({ name: int.user.username, iconURL: int.user.avatarURL() })
        .setImage("https://media.discordapp.net/attachments/1158044953323249705/1190680020469952512/standard_1.gif")
        .setThumbnail("https://media.discordapp.net/attachments/1158044953323249705/1197570441741615144/DildoService-icon1.png")
        .setColor("#bc9be4")
        .setFooter({ text: "Dildo API Services", iconURL: "https://media.discordapp.net/attachments/1158044953323249705/1197541630891274280/DildoService-_Logo.png"})
        .setTimestamp()

        if (int.isCommand()){
            await int.deferReply({ ephemeral: true });

            const cmd = client.slashCommands.get(int.commandName);
            if(!cmd) return;

            try {
                await cmd.execute(client, int, embed)
            } catch (error) {
                console.log("[BOT] " + error);
                await int.followUp({ content: "[BOT] Komut çalıştırılırken bir hata oluştu!", ephemeral: true });
            }
        } else if (int.isButton()) {
            const btn = client.buttonCommands.get(int.customId.startsWith("backPage-") ? int.customId.substring(("backPage-").length) : int.customId);
            if(!btn) return;

            try {
                await btn.execute(client, int, embed)
            } catch (error) {
                console.log("[BOT] " + error);
                await int.reply({ content: '[BOT] Komut çalıştırılırken bir hata oluştu!', ephemeral: true });
            }
        } else if (int.isModalSubmit()) {
            const modal = client.modalCommands.get(int.customId);
            if(!modal) return;

            try {
                await modal.execute(client, int, embed);
            } catch (error) {
                console.log("[BOT] " + error);
                return;
            }
        } else if (int.isStringSelectMenu()) {
            const menu = client.selectCommands.get(int.values[0].startsWith("api-") ? "api" : int.values[0].startsWith("userApi-") ? "userApi" : int.values[0].startsWith("setActive-") ? "setActive" : int.values[0].startsWith("setTwoFactor-") ? "setTwoFactor" : int.values[0].startsWith("notifi-") ? "notifi" : int.values[0]);
            if(!menu) return;
            
            try {
                await menu.execute(client, int, embed, customerSchema); 
            } catch (error) {
                console.log("[BOT] " + error);
                await int.reply({ content: '[BOT] İşlem Gerçekleştirilirken bir hata oluştu!', ephemeral: true });
            }
        }

    }
}