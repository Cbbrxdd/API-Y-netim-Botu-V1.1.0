const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    customId: "search-auth",
    async execute(client, int, embed) {

        try {

            const modal = new ModalBuilder()
                .setCustomId("auth-info")
                .setTitle("Auth Bilgi")


            const authInput = new TextInputBuilder()
                .setCustomId("auth")
                .setLabel("Bilgierini istetiğiniz Auth\'u giriniz.")
                .setStyle(TextInputStyle.Short)
                .setRequired(true)

            const auth = new ActionRowBuilder().addComponents(authInput)

            modal.addComponents(auth);
            await int.showModal(modal);

        } catch (error) {
            console.log("[BOT] " + error)
            return await int.followUp({ embeds: [embed.setDescription('İşlem gerçekleştirilirken bir sorun oluştu. Lütfen Daha Sonra Tekrar Deneyiniz.')], ephemeral: true })
        }

    }
}