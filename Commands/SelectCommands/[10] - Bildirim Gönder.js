const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    customId: "add-notification",
    async execute(client, int, embed) {

        try {
            
            const modal = new ModalBuilder()
            .setCustomId('addNotificationModal')
            .setTitle('Bildirim Gönder')

            const msgInput = new TextInputBuilder()
            .setCustomId('message')
            .setLabel('Bildirim mesajını giriniz')
            .setPlaceholder('')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)

            const titleInput = new TextInputBuilder()
            .setCustomId('title')
            .setLabel('Bildirim başlığı giriniz')
            .setPlaceholder('')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)

            const title = new ActionRowBuilder().addComponents(titleInput)
            const msg = new ActionRowBuilder().addComponents(msgInput)

            modal.addComponents(title)
            modal.addComponents(msg)
            await int.showModal(modal)

        } catch (error) {
            console.log("[BOT] " + error)
            await int.reply({ embeds: [embed.setDescription('İşlem gerçekleştirilirken bir sorun oluştu. Daha sonra tekrar deneyin.')], ephemeral: true })
        }

    }
}