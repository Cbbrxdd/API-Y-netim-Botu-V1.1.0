const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    customId: "add-auth",
    async execute(client, int, embed) {

        try {
            
            const modal = new ModalBuilder()
            .setCustomId('addAuthModal')
            .setTitle('Auth Ekle')

            const usernameInput = new TextInputBuilder()
            .setCustomId('username')
            .setLabel('Kullanıcı Adı Giriniz.')
            .setPlaceholder("")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)

            const authInput = new TextInputBuilder()
            .setCustomId('auth')
            .setLabel('Auth Belirleyiniz.')
            .setPlaceholder('')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)

            const ipInput = new TextInputBuilder()
            .setCustomId('ip')
            .setLabel('IP Giriniz.')
            .setPlaceholder('127.0.0.1')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)

            const username = new ActionRowBuilder().addComponents(usernameInput)
            const auth = new ActionRowBuilder().addComponents(authInput)
            const ip = new ActionRowBuilder().addComponents(ipInput)

            modal.addComponents(username)
            modal.addComponents(auth)
            modal.addComponents(ip)
            await int.showModal(modal)

        } catch (error) {
            console.log("[BOT] " + error)
            await int.reply({ embeds: [embed.setDescription('İşlem gerçekleştirilirken bir sorun oluştu. Daha sonra tekrar deneyin.')], ephemeral: true })
        }

    }
}