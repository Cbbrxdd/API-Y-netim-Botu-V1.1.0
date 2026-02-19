const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    customId: "chance-auth",
    async execute(client, int, embed) {

        const modal = new ModalBuilder()
        .setCustomId("chanceAuthModal")
        .setTitle("Auth Değiştir")

        const auth = new ActionRowBuilder().addComponents(new TextInputBuilder()
        .setCustomId("auth")
        .setLabel("Yeni Auth\'unuzu Giriniz.")
        .setStyle(TextInputStyle.Short))

        modal.addComponents(auth);
        await int.showModal(modal);

    }
}