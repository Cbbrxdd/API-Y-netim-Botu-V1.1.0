const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    customId: "set-time",
    async execute(client, int, embed) {

        const modal = new ModalBuilder()
            .setCustomId("setTimeModal")
            .setTitle("Tarih Ayarla")

        const dayInput = new TextInputBuilder()
            .setCustomId("date")
            .setLabel("Gün sayısı girin.")
            .setPlaceholder('30')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)

        const date = new ActionRowBuilder().addComponents(dayInput)

        modal.addComponents(date);
        await int.showModal(modal);

    }
}