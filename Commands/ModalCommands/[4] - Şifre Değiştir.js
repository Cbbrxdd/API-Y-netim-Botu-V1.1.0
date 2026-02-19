const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const customerSchema = require('../../Database/Schema/user')

module.exports = {
    customId: "chancePasswordModal",
    async execute(client, int, embed) {
        try {

            let auth = int.message.embeds[0].data.footer.text.split(' - ')[1].toLowerCase()
            
            const userApiEmbed = new EmbedBuilder()
            .setTitle(`${auth.split(' ').map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()).join(' ')} Auth Ayarları`)
            .setColor("#0075ff")
            .setThumbnail("https://media.discordapp.net/attachments/1158044953323249705/1197570441741615144/DildoService-icon1.png")
            .setFooter({ text: `${int.message.embeds[0].data.footer.text}`, iconURL: "https://media.discordapp.net/attachments/1158044953323249705/1197541630891274280/DildoService-_Logo.png"})
            .setTimestamp()


            if (int.message.embeds[0].data.footer.text.split('  •  ')[1] === undefined) {

                let auth = int.message.embeds[0].data.footer.text.split(' - ')[1].toLowerCase()
                let password = int.fields.getTextInputValue("password");

                const x = await customerSchema.findOneAndUpdate({ Auth: auth }, { Password: password }, { upsert: true })

                const button = new ActionRowBuilder().addComponents([
                    new ButtonBuilder()
                        .setLabel('Giriş Yap')
                        .setCustomId('login')
                        .setStyle(ButtonStyle.Primary),
                ])

                return await int.update({ embeds: [embed.setDescription(`**<:dot:1197573208078045295>Şifreniz Başarıyla Değiştirildi.\n<:dot:1197573208078045295>Yeni Şifreniz: \`${password}\`\n\n<:dot:1197573208078045295>Lütfen Tekrardan Giriş Yapın.**`)], components: [button], ephemeral: true })

            } else {
                
                let auth = int.message.embeds[0].data.footer.text.split(' - ')[1].toLowerCase()
                let password = int.fields.getTextInputValue("password");
    
                const x = await customerSchema.findOneAndUpdate({ Auth: auth }, { Password: password }, { upsert: true })
    
                return await int.update({ embeds: [userApiEmbed.setDescription(`**Aşağıdan yapmak istediğiniz işlemi seçiniz.\n\n<:dot:1197573208078045295> Kullanıcı Adı: \`${x.Username}\`\n<:dot:1197573208078045295> Şifre: \`${password}\`\n<:dot:1197573208078045295> Auth: \`${x.Auth}\`\n<:dot:1197573208078045295> IP Adresi: \`${x.IP}\`\n<:dot:1197573208078045295> Discord: <@${x.DiscordId || "1197526335724204042"}>**`)], ephemeral: true })
            }

        } catch (error) {
            console.log("[BOT] " + error)
            return await int.reply({ embeds: [embed.setDescription(`**<:dot:1197573208078045295>Şifre Değiştirilirken Bir Sorun Oluştu.\n<:dot:1197573208078045295>Lütfen Daha Tekrar Deneyin.**`)], ephemeral: true })
        }
    }
}