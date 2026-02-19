const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const customerSchema = require('../../Database/Schema/user')

module.exports = {
    customId: "notifi",
    async execute(client, int, embed) {
        try {

            const auth = int.message.embeds[0].data.footer.text.split(' - ')[1].toLowerCase()
            const sendTime = int.values[0].split('-')[1]
            const notifiTitle = int.values[0].split('-')[2]
            const db = await customerSchema.findOne({ Auth: auth })

            let bildirim = db.Notification.UserIDS.find(x => x.title === notifiTitle)
            if (!bildirim) return await int.reply({ embeds: [embed.setDescription(`<:dot:1197573208078045295> **\`📢${notifiTitle}\` İsimli duyuru getirilirken bir sorun oluştu. Daha Sonra Tekrar Deneyin**`)], ephemeral: true })
            let index = db.Notification.UserIDS.findIndex(x => x.title === notifiTitle)
            const notifi = db.Notification.UserIDS[index];

            const bildirimEmbed = new EmbedBuilder()
                .setTitle("📢 " + notifi.title)
                .setDescription(`**<:dot:1197573208078045295>${notifi.message}**`)
                .setThumbnail("https://media.discordapp.net/attachments/1158044953323249705/1197570441741615144/DildoService-icon1.png")
                .setColor("#bc9be4")
                .setFooter({ text: int.message.embeds[0].data.footer.text, iconURL: "https://media.discordapp.net/attachments/1158044953323249705/1197541630891274280/DildoService-_Logo.png" })
                .setTimestamp(notifi.sendTime)

            const buttons = new ActionRowBuilder().addComponents([
                new ButtonBuilder()
                    .setLabel('Geri Dön')
                    .setCustomId('backPage-notification')
                    .setEmoji('◀️')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setLabel('Ana Sayfa')
                    .setCustomId('backPage-home')
                    .setEmoji('🏠')
                    .setStyle(ButtonStyle.Primary),
            ])

            await int.update({ embeds: [bildirimEmbed], components: [buttons] })

        } catch (error) {
            console.log("[BOT] " + error)
            await int.reply({ embeds: [embed.setDescription('İşlem gerçekleştirilirken bir sorun oluştu. Daha sonra tekrar deneyin.')], ephemeral: true })
        }
    }
}