const { EmbedBuilder } = require('discord.js') 
const customerSchema = require('../../Database/Schema/user')
const moment = require("moment");
moment.locale("tr");

module.exports = {
    customId: "api",
    async execute(client, int, embed) {
        const auth = int.values[0].split('-')[1]
        const api = int.values[0].split('-')[2]
        
        const user = await customerSchema.findOne({ Auth: auth })

        const apiData = user.sorgular.find(x => x.name === api)

        const apiEmbed = new EmbedBuilder()
        .setAuthor({ name: int.user.username, iconURL: int.user.avatarURL() })
        .setTitle(`${api.split(' ').map(kelime => kelime.charAt(0).toUpperCase() + kelime.slice(1).toLowerCase()).join(' ')} API Ayarları ve Bilgileri`)
        .setDescription(`**Durum:** \`${ apiData.active === true ? 'Aktif' : 'Pasif'}\`\n**Başlangıç Tarihi:** \`${moment(apiData.startTimestamp).format("L")} (${moment(apiData.startTimestamp).fromNow()})\`\n**Bitiş Tarihi:** \`${moment(apiData.endTimestamp).format("L")} (${moment(apiData.endTimestamp).fromNow()})\`\n**Toplam Limit:** \`${ apiData.totalLimit }\`\n**Kalan Limit:** \`${ apiData.totalLimit - apiData.usedLimit }\``)
        .setColor("#0075ff")
        .setThumbnail("https://media.discordapp.net/attachments/1158044953323249705/1197570441741615144/DildoService-icon1.png")
        .setFooter({ text: `Dildo API Services - ${auth}`, iconURL: "https://media.discordapp.net/attachments/1158044953323249705/1197541630891274280/DildoService-_Logo.png"})
        .setTimestamp()

        await int.update({ embeds: [apiEmbed] })

    }
}