const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder } = require('discord.js') 
const config = require('../../Settings/config')

module.exports = {
    name: "giris",
    commandData: new SlashCommandBuilder().setName("giris").setDescription('Giriş Kısmını Oluşturur.'),
    async execute(client, int) {
        
        if(!config.owners.includes(int.user.id)) return await int.channel.send({ content: "Bu İşlem İçin Gerekli Yetkiye Sahip Değilsiniz."})
        .then(async (m) => setTimeout(async () => await m.delete(), 5000));

        const embed = new EmbedBuilder()
        .setTitle("API Yönetim Sistemi")
        .setDescription('\n\n**Giriş Yapmak İçin Aşağıdaki Butona Tıklayınız.**')
        .setColor("#0075ff")
        .setThumbnail('https://media.discordapp.net/attachments/1158044953323249705/1197570441741615144/DildoService-icon1.png')
        .setFooter({ text: "Dildo API Services", iconURL: "https://media.discordapp.net/attachments/1158044953323249705/1197541630891274280/DildoService-_Logo.png"})
        .setTimestamp()

        const button = new ActionRowBuilder().addComponents([
            new ButtonBuilder()
            .setLabel('Giriş Yap')
            .setCustomId('login')
            .setStyle(ButtonStyle.Primary),
        ])

        await int.followUp({ content: "Giriş Kısmı Başarıyla Oluşturuldu.", emhemeral: true })

        return await int.channel.send({
            embeds: [embed],
            components: [button]
        })

    }
}