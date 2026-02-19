const customerSchema = require('../../Database/Schema/user')
const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const moment = require("moment");
moment.locale("tr");

module.exports = {
    customId: "setTimeModal",
    async execute(client, int, embed) {

        try {

            let day = int.fields.getTextInputValue('date')

            const auth = int.message.embeds[0].data.footer.text.split(' - ')[1].toLowerCase()
            const db = await customerSchema.findOne({ Auth: auth })
            const sorguname = int.message.embeds[0].data.title.split(' API')[0].toUpperCase()

            let sorgu = db.sorgular.find(x => x.name === sorguname)
            if (!sorgu) return await int.reply({ embeds: [embed.setDescription(`<:dot:1197573208078045295> **${sorguname} API\'si üzerinde işlem yapılırken bir sorun oluştu. Daha Sonra Tekrar Deneyin**`)], ephemeral: true })
            let index = db.sorgular.findIndex(x => x.name === sorguname)

            let date = new Date();
            date = moment(date).valueOf()
            
            db.sorgular[index].endTimestamp = moment(date).add(day, 'days').valueOf();
            await customerSchema.findOneAndUpdate({ Auth: db.Auth }, { sorgular: db.sorgular }, { upsert: true })

            const userApiEmbed = new EmbedBuilder()
                .setTitle(`${sorguname.split(' ').map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()).join(' ')} API Ayarları ve Bilgileri`)
                .setDescription(`**Durum:** \`${sorgu.active === true ? 'Aktif' : 'Pasif'}\`\n**Başlangıç Tarihi:** \`${moment(sorgu.startTimestamp).format("L")} (${moment(sorgu.startTimestamp).fromNow()})\`\n**Bitiş Tarihi:** \`${moment(sorgu.endTimestamp).format("L")} (${moment(sorgu.endTimestamp).fromNow()})\`\n**Toplam Limit:** \`${sorgu.totalLimit}\`\n**Kalan Limit:** \`${sorgu.totalLimit - sorgu.usedLimit}\``)
                .setColor("#0075ff")
                .setThumbnail("https://media.discordapp.net/attachments/1158044953323249705/1197570441741615144/DildoService-icon1.png")
                .setFooter({ text: `${int.message.embeds[0].data.footer.text}`, iconURL: "https://media.discordapp.net/attachments/1158044953323249705/1197541630891274280/DildoService-_Logo.png" })
                .setTimestamp()

            const userApiMenu = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(`userApiSettingMenu`)
                    .setPlaceholder('API Ayarları')
                    .addOptions([
                        { label: `${sorgu.active === false ? 'Aktif' : 'Pasif'} Olarak Ayarla`, emoji: `${sorgu.active === false ? '✅' : '⛔'}`, value: `setActive-${sorgu.active === false ? `aktif-${sorguname}` : `pasif-${sorguname}`}` },
                        { label: "Tarih Ayarla", emoji: "📅", value: "set-time" },
                        { label: "Limit Ayarla", emoji: "⚙️", value: "set-limit" },
                    ])
            )

            const buttons = new ActionRowBuilder().addComponents([
                new ButtonBuilder()
                    .setLabel('Geri Dön')
                    .setCustomId('backPage-info-api')
                    .setEmoji('◀️')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setLabel('Ana Sayfa')
                    .setCustomId('backPage-home')
                    .setEmoji('🏠')
                    .setStyle(ButtonStyle.Primary),
            ])

            return await int.update({ embeds: [userApiEmbed], components: [userApiMenu, buttons] })

        } catch (error) {
            console.log("[BOT] " + error)
            await int.reply({ embeds: [embed.setDescription('İşlem gerçekleştirilirken bir sorun oluştu. Daha sonra tekrar deneyin.')], ephemeral: true })
        }

    }
}