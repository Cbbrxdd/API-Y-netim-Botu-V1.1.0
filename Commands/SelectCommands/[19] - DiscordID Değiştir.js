const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    customId: "chance-dcid",
    async execute(client, int, embed) {

        const modal = new ModalBuilder()
            .setCustomId("chanceDcidModal")
            .setTitle("Discord ID Değiştir")

        const dcid = new ActionRowBuilder().addComponents(
            new TextInputBuilder()
                .setCustomId("dcid")
                .setLabel("Discord ID Giriniz.")
                .setStyle(TextInputStyle.Short))

        modal.addComponents(dcid);
        await int.showModal(modal);

    }
}