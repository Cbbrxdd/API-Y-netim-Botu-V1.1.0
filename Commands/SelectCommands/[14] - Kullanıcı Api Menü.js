const { EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js') 
const customerSchema = require('../../Database/Schema/user')
const moment = require("moment");
moment.locale("tr");

module.exports = {
    customId: "userApi",
    async execute(client, int, embed) {
        
        try {

            const adminAuth = int.message.embeds[0].data.footer.text.split('  •  ')[1]
            const auth = int.message.embeds[0].data.footer.text.split(' - ')[1].toLowerCase()
            const api = int.values[0].split('-')[2]
            
            const userData = await customerSchema.findOne({ Auth: auth })
            const userApiData = userData.sorgular.find(x => x.name === api)
    
            const userApiEmbed = new EmbedBuilder()
            .setTitle(`${api.split(' ').map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()).join(' ')} API Ayarları ve Bilgileri`)
            .setDescription(`**Durum:** \`${ userApiData.active === true ? 'Aktif' : 'Pasif'}\`\n**Başlangıç Tarihi:** \`${moment(userApiData.startTimestamp).format("L")} (${moment(userApiData.startTimestamp).fromNow()})\`\n**Bitiş Tarihi:** \`${moment(userApiData.endTimestamp).format("L")} (${moment(userApiData.endTimestamp).fromNow()})\`\n**Toplam Limit:** \`${ userApiData.totalLimit }\`\n**Kalan Limit:** \`${ userApiData.totalLimit - userApiData.usedLimit }\``)
            .setColor("#0075ff")
            .setThumbnail("https://media.discordapp.net/attachments/1158044953323249705/1197570441741615144/DildoService-icon1.png")
            .setFooter({ text: `${int.message.embeds[0].data.footer.text}`, iconURL: "https://media.discordapp.net/attachments/1158044953323249705/1197541630891274280/DildoService-_Logo.png"})
            .setTimestamp()
    
            let settings
            let cId
            if(int.message.embeds[0].data.footer.text.split('  •  ')[1] != undefined) {
                settings = [
                    { label: `${ userApiData.active === true ? 'Pasif' : 'Aktif'} Olarak Ayarla`, emoji: `${ userApiData.active === true ? '⛔' : '✅'}`, value: `setActive-${ userApiData.active === true ? `pasif-${api}` : `aktif-${api}`}` },
                    { label: "Tarih Ayarla", emoji: "📅", value: "set-time" },
                    { label: "Limit Ayarla", emoji: "⚙️", value: "set-limit" },
                ]
                cId = 'backPage-info-api'
            } else {
                settings = [
                    { label: `${ userApiData.active === true ? 'Pasif' : 'Aktif'} Olarak Ayarla`, emoji: `${ userApiData.active === true ? '⛔' : '✅'}`, value: `setActive-${ userApiData.active === true ? `pasif-${api}` : `aktif-${api}`}` },
                ]
                cId = "backPage-my-apis"
            }

            const userApiMenu =  new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                .setCustomId(`userApiSettingMenu`)
                .setPlaceholder('API Ayarları')
                .addOptions(settings)
            )
            
            const buttons = new ActionRowBuilder().addComponents([
                new ButtonBuilder()
                .setLabel('Geri Dön')
                .setCustomId(cId)
                .setEmoji('◀️')
                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                .setLabel('Ana Sayfa')
                .setCustomId('backPage-home')
                .setEmoji('🏠')
                .setStyle(ButtonStyle.Primary),
            ])
    
            await int.update({ embeds: [userApiEmbed], components: [userApiMenu, buttons] })    

        } catch (error) {
            console.log("[BOT] " + error)
            await int.reply({ embeds: [embed.setDescription('İşlem gerçekleştirilirken bir sorun oluştu. Daha sonra tekrar deneyin.')], ephemeral: true })
        }

    }
}