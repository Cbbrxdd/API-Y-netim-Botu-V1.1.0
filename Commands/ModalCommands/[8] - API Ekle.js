const customerSchema = require('../../Database/Schema/user')
const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const moment = require("moment");
moment.locale("tr");

module.exports = {
    customId: "addApiModal",
    async execute(client, int, embed) {

        try {

            let apiList = int.fields.getTextInputValue('apis');
            let day = int.fields.getTextInputValue('time') || 30;
            const auth = int.message.embeds[0].data.footer.text.split(' - ')[1].toLowerCase();
            const userData = await customerSchema.findOne({ Auth: auth });

            const date = new Date();
            const addedApis = [];
            const skippedApis = [];

            apiList = apiList.split(', ').map(api => {
                const apiName = api.toUpperCase();
                const control = userData.sorgular.some(x => x.name === apiName);

                if (!control) {
                    addedApis.push(apiName);
                    return {
                        name: apiName,
                        startTimestamp: moment(date).valueOf(),
                        endTimestamp: moment(date).add(day, 'days').valueOf(),
                        active: true,
                        totalLimit: 1000,
                        usedLimit: 0
                    };
                } else {
                    skippedApis.push(apiName);
                    return null;
                }
            }).filter(api => api !== null);

            const sorgular = userData.sorgular.concat(apiList);
            await customerSchema.findOneAndUpdate({ Auth: auth }, { sorgular: sorgular }, { upsert: true });

            const updateEmbed = new EmbedBuilder()
            .setTitle('API Ekleme İşlemi Sonucu')
            .setDescription(`**Eklenen APIler: ** \`${addedApis.join(', ') || 'Eklenmedi' }\`\n**Eklenemeyen APIler: ** \`${skippedApis.join(', ') || 'Yok'}\``)
            .setImage("https://media.discordapp.net/attachments/1158044953323249705/1190680020469952512/standard_1.gif")
            .setThumbnail("https://media.discordapp.net/attachments/1158044953323249705/1197570441741615144/DildoService-icon1.png")
            .setColor("#bc9be4")
            .setFooter({ text: int.message.embeds[0].data.footer.text, iconURL: "https://media.discordapp.net/attachments/1158044953323249705/1197541630891274280/DildoService-_Logo.png"})
            .setTimestamp()

            return await int.reply({ embeds: [updateEmbed], ephemeral: true });
        } catch (error) {
            console.log("[BOT] " + error)
            await int.reply({ embeds: [embed.setDescription('İşlem gerçekleştirilirken bir sorun oluştu. Daha sonra tekrar deneyin.')], ephemeral: true })
        }

    }
}