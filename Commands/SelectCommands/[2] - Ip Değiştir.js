const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    customId: "chance-ip",
    async execute(client, int, embed) {

        const modal = new ModalBuilder()
        .setCustomId("chanceIpModal")
        .setTitle("IP Değiştir")

        const ip = new ActionRowBuilder().addComponents(new TextInputBuilder()
        .setCustomId("ip")
        .setLabel("Yeni IP Adresinizi Giriniz.")
        .setPlaceholder("127.0.0.1")
        .setStyle(TextInputStyle.Short))

        modal.addComponents(ip);
        await int.showModal(modal);

    }
}