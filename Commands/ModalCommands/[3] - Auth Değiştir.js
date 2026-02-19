const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const customerSchema = require('../../Database/Schema/user')

module.exports = {
    customId: "chanceAuthModal",
    async execute(client, int, embed) {
        try {

            let auth = int.message.embeds[0].data.footer.text.split(' - ')[1].toLowerCase()
            let auth2 = int.fields.getTextInputValue("auth");

            const sUser = await customerSchema.findOne({ Auth: auth2 });
            if(sUser) return await int.reply({ embeds: [embed.setDescription(`**<:dot:1197573208078045295> Aynı autha sahip başka kullanıcı bulundu.\n<:dot:1197573208078045295>Lütfen farklı bir eşsiz bir auth giriniz.**`)]})

            if(int.message.embeds[0].data.footer.text.split('  •  ')[1] === undefined){
    
                await customerSchema.findOneAndUpdate({ Auth: auth }, { Auth: auth2 })
    
                const button = new ActionRowBuilder().addComponents([
                    new ButtonBuilder()
                    .setLabel('Giriş Yap')
                    .setCustomId('login')
                    .setStyle(ButtonStyle.Primary),
                ])
    
                return await int.update({ embeds: [embed.setDescription(`**<:dot:1197573208078045295>Auth Başarıyla Değiştirildi.\n<:dot:1197573208078045295>Yeni Auth\'unuz: \`${auth2}\`**\n\n*Lütfen Tekrardan Giriş Yapın.*`)], components: [button], ephemeral: true })
    
            } else {

                const x = await customerSchema.findOneAndUpdate({ Auth: auth }, { Auth: auth2 })   

                const userApiEmbed = new EmbedBuilder()
                .setTitle(`${auth2.split(' ').map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()).join(' ')} Auth Ayarları`)
                .setColor("#0075ff")
                .setDescription(`**Aşağıdan yapmak istediğiniz işlemi seçiniz.\n\n<:dot:1197573208078045295> Kullanıcı Adı: \`${x.Username}\`\n<:dot:1197573208078045295> Şifre: \`${x.Password}\`\n<:dot:1197573208078045295> Auth: \`${auth2}\`\n<:dot:1197573208078045295> IP Adresi: \`${x.IP}\`\n<:dot:1197573208078045295> Discord: <@${x.DiscordId || "1197526335724204042"}>**`)
                .setThumbnail("https://media.discordapp.net/attachments/1158044953323249705/1197570441741615144/DildoService-icon1.png")
                .setFooter({ text: `${int.message.embeds[0].data.footer.text.split(' - ')[0]} - ${auth2}`, iconURL: "https://media.discordapp.net/attachments/1158044953323249705/1197541630891274280/DildoService-_Logo.png"})
                .setTimestamp()

                return await int.update({ embeds: [userApiEmbed], ephemeral: true })
    
            }


        } catch (error) {
            console.log("[BOT] " + error)
            return await int.reply({ embeds: [embed.setDescription(`**Auth Adresi Değiştirilirken Bir Sorun Oluştu. Lütfen Daha Tekrar Deneyin.**`)], ephemeral: true })
        }
    }
}