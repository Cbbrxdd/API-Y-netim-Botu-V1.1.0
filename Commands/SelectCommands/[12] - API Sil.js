const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    customId: "delete-api",
    async execute(client, int, embed) {

        try {
            
            const auth = int.customId.split('-')[1]

            const modal = new ModalBuilder()
            .setCustomId('deleteApiModal')
            .setTitle('API Sil')

            const apisInput = new TextInputBuilder()
            .setCustomId('apis')
            .setLabel('Silinecek APIleri giriniz.')
            .setPlaceholder("EOKUL, AOL, ADRES ...")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)

            const apis = new ActionRowBuilder().addComponents(apisInput)

            modal.addComponents(apis)
            await int.showModal(modal)

        } catch (error) {
            console.log("[BOT] " + error)
            await int.reply({ embeds: [embed.setDescription('İşlem gerçekleştirilirken bir sorun oluştu. Daha sonra tekrar deneyin.')], ephemeral: true })
        }

    }
}