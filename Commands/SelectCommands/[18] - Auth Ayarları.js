const { ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js')
const customerSchema = require('../../Database/Schema/user')
const moment = require("moment");
moment.locale("tr");

module.exports = {
    customId: "settings-auth",
    async execute(client, int, embed) {

        try {
            
            const footer = int.message.embeds[0].data.footer.text
            const auth = footer.split(' - ')[1].toLowerCase()
            const x = await customerSchema.findOne({ Auth: auth })

            const userApiEmbed = new EmbedBuilder()
            .setTitle(`${auth.split(' ').map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()).join(' ')} Auth Ayarları`)
            .setDescription(`**Aşağıdan yapmak istediğiniz işlemi seçiniz.\n\n<:dot:1197573208078045295> Kullanıcı Adı: \`${x.Username}\`\n<:dot:1197573208078045295> Şifre: \`${x.Password}\`\n<:dot:1197573208078045295> Auth: \`${x.Auth}\`\n<:dot:1197573208078045295> IP Adresi: \`${x.IP}\`\n<:dot:1197573208078045295> Discord: <@${x.DiscordId || "1197526335724204042"}>**`)
            .setColor("#0075ff")
            .setThumbnail("https://media.discordapp.net/attachments/1158044953323249705/1197570441741615144/DildoService-icon1.png")
            .setFooter({ text: `${int.message.embeds[0].data.footer.text}`, iconURL: "https://media.discordapp.net/attachments/1158044953323249705/1197541630891274280/DildoService-_Logo.png"})
            .setTimestamp()

            const userApiMenu =  new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                .setCustomId(`userApiSettingMenu`)
                .setPlaceholder('API Ayarları')
                .addOptions([
                    { label: "Şifre Değiştir", emoji: "🔒", value: "chance-password" },
                    { label: "Auth Değiştir", emoji: "🔑", value: "chance-auth" },
                    { label: "IP Değiştir", emoji: "🛜", value: "chance-ip" },
                    { label: "DiscordID Değiştir", emoji: "🆔", value: "chance-dcid" },
                ])
            )

            const buttons = new ActionRowBuilder().addComponents([
                new ButtonBuilder()
                .setLabel('Geri Dön')
                .setCustomId('backPage-auth-info')
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