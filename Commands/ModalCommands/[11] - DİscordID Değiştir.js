const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js')
const customerSchema = require('../../Database/Schema/user')
const net = require('net');

module.exports = {
    customId: "chanceDcidModal",
    async execute(client, int, embed) {
        try {

            let auth = int.message.embeds[0].data.footer.text.split(' - ')[1].toLowerCase()
            let dcid = int.fields.getTextInputValue("dcid");

            const x = await customerSchema.findOneAndUpdate({ Auth: auth }, { DiscordId: dcid })

            const userApiEmbed = new EmbedBuilder()
                .setTitle(`${auth.split(' ').map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()).join(' ')} Auth Ayarları`)
                .setColor("#0075ff")
                .setDescription(`**Aşağıdan yapmak istediğiniz işlemi seçiniz.\n\n<:dot:1197573208078045295> Kullanıcı Adı: \`${x.Username}\`\n<:dot:1197573208078045295> Şifre: \`${x.Password}\`\n<:dot:1197573208078045295> Auth: \`${x.Auth}\`\n<:dot:1197573208078045295> IP Adresi: \`${x.IP}\`\n<:dot:1197573208078045295> Discord: <@${dcid || "1197526335724204042"}>**`)
                .setThumbnail("https://media.discordapp.net/attachments/1158044953323249705/1197570441741615144/DildoService-icon1.png")
                .setFooter({ text: `${int.message.embeds[0].data.footer.text}`, iconURL: "https://media.discordapp.net/attachments/1158044953323249705/1197541630891274280/DildoService-_Logo.png" })
                .setTimestamp()

            return await int.update({ embeds: [userApiEmbed] })

        } catch (error) {
            console.log("[BOT] " + error)
            return await int.reply({ embeds: [embed.setDescription(`**Discord ID Değiştirilirken Bir Sorun Oluştu.\nLütfen Daha Tekrar Deneyin.**`)], ephemeral: true })
        }
    }
}