const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    customId: "chance-password",
    async execute(client, int, embed) {

        const modal = new ModalBuilder()
        .setCustomId("chancePasswordModal")
        .setTitle("Şifre Değiştir")

        const password = new ActionRowBuilder().addComponents(new TextInputBuilder()
        .setCustomId("password")
        .setLabel("Yeni Şifrenizi Giriniz.")
        .setStyle(TextInputStyle.Short))

        modal.addComponents(password);
        await int.showModal(modal);

    }
}