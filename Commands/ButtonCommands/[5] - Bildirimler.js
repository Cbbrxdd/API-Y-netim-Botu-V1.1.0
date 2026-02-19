const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js')
const customerSchema = require('../../Database/Schema/user')

module.exports = {
    customId: "notification",
    async execute(client, int, embed) {

        try {

            const footer = int.message.embeds[0].data.footer.text
            const auth = footer.split(' - ')[1].toLowerCase()

            let user = await customerSchema.findOne({ Auth: auth })
            let veri = user.Notification.UserIDS

            if (veri.length > 10) { veri = veri.slice(-10) }

            const notification = veri.map(x => {
                return { label: x.title, emoji: "📢", value: `notifi-${x.sendTime}-${x.title}` }
            })
            
            const notificationsMenu = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(`notificationsMenu`)
                    .setPlaceholder('Bildirimleriniz')
                    .addOptions(notification)
            )

            const BildirimMenü = new EmbedBuilder()
                .setTitle(`🔔 Bildirimleriniz`)
                .setDescription('<:dot:1197573208078045295>**Aşağıdaki kısımdan içeriğini görmek istediğiniz bildirimi seçiniz.**')
                .setColor('#0075ff')
                .setThumbnail("https://media.discordapp.net/attachments/1158044953323249705/1197570441741615144/DildoService-icon1.png")
                .setFooter({ text: footer, iconURL: int.guild.iconURL() })
                .setTimestamp()

            const buttons = new ActionRowBuilder().addComponents([
                new ButtonBuilder()
                    .setLabel('Anasayfa')
                    .setCustomId('backPage-home')
                    .setEmoji('🏠')
                    .setStyle(ButtonStyle.Primary),
            ])

            await int.update({ embeds: [BildirimMenü], components: [notificationsMenu, buttons] })

        } catch (error) {
            console.log("[BOT] " + error)
            return await int.followUp({ embeds: [embed.setDescription('İşlem gerçekleştirilirken bir sorun oluştu. Lütfen Daha Sonra Tekrar Deneyiniz.')], ephemeral: true })
        }

    }
}