const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    customId: "delete-auth",
    async execute(client, int, embed) {

        try {
            
            const modal = new ModalBuilder()
            .setCustomId('deleteAuthModal')
            .setTitle('Auth Sil')

            const authInput = new TextInputBuilder()
            .setCustomId('auth')
            .setLabel('Silinecek Auth\'u Giriniz.')
            .setPlaceholder('')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)

            const auth = new ActionRowBuilder().addComponents(authInput)

            modal.addComponents(auth)
            await int.showModal(modal)

        } catch (error) {
            console.log("[BOT] " + error)
            await int.reply({ embeds: [embed.setDescription('İşlem gerçekleştirilirken bir sorun oluştu. Daha sonra tekrar deneyin.')], ephemeral: true })
        }

    }
}