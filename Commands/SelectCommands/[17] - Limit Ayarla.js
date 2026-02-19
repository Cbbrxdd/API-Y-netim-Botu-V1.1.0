const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    customId: "set-limit",
    async execute(client, int, embed) {

        const modal = new ModalBuilder()
            .setCustomId("setLimitModal")
            .setTitle("Limit Ayarla")

        const dayInput = new TextInputBuilder()
            .setCustomId("limit")
            .setLabel("Limit girin.")
            .setPlaceholder('1000')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)

        const date = new ActionRowBuilder().addComponents(dayInput)

        modal.addComponents(date);
        await int.showModal(modal);

    }
}