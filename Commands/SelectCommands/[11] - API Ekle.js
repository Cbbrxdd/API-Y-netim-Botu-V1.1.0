const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    customId: "add-api",
    async execute(client, int, embed) {

        try {
            
            const auth = int.customId.split('-')[1]

            const modal = new ModalBuilder()
            .setCustomId('addApiModal')
            .setTitle('API Ekle')

            const apisInput = new TextInputBuilder()
            .setCustomId('apis')
            .setLabel('Eklenecek APIleri giriniz.')
            .setPlaceholder("EOKUL, AOL, ADRES ...")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)

            const timeInput = new TextInputBuilder()
            .setCustomId('time')
            .setLabel('API\'nin kaç günlük olacağını belirleyin')
            .setPlaceholder('Varsayılan 30 gün olarak devam eder.')
            .setStyle(TextInputStyle.Short)
            .setRequired(false)

            const apis = new ActionRowBuilder().addComponents(apisInput)
            const time = new ActionRowBuilder().addComponents(timeInput)

            modal.addComponents(apis)
            modal.addComponents(time)
            await int.showModal(modal)

        } catch (error) {
            console.log("[BOT] " + error)
            await int.reply({ embeds: [embed.setDescription('İşlem gerçekleştirilirken bir sorun oluştu. Daha sonra tekrar deneyin.')], ephemeral: true })
        }

    }
}