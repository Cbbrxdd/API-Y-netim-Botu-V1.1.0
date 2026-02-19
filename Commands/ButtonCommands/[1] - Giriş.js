const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} = require('discord.js')

module.exports = {
    customId: "login",
    async execute(client, int, embed) {
        
        const modal = new ModalBuilder()
        .setCustomId('loginModal')
        .setTitle('Giriş Yap')

        const authInput = new TextInputBuilder()
        .setCustomId('auth')
        .setLabel('API Auth\' unuzu Giriniz.')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)

        const passwordInput = new TextInputBuilder()
        .setCustomId('password')
        .setLabel('Hesap Şifrenizi Giriniz.')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)

        const factor = new TextInputBuilder()
        .setCustomId('factor')
        .setLabel('2FA Kodunuzu Giriniz.')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('2FA Aktif Değilse Girmeden Devam Ediniz.')
        .setRequired(false)

        const auth = new ActionRowBuilder().addComponents(authInput);
        const password = new ActionRowBuilder().addComponents(passwordInput);

        modal.addComponents(auth);
        modal.addComponents(password);
        await int.showModal(modal);

    }
}