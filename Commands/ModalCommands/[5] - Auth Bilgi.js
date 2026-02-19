const customerSchema = require('../../Database/Schema/user')
const {  ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle  } = require('discord.js')

module.exports = {
    customId: "auth-info",
    async execute(client, int, embed) {
        
        try {
            
            let auth = int.fields.getTextInputValue("auth");
            const user = await customerSchema.findOne({ Auth: auth })
            const adminAuth = int.message.embeds[0].data.footer.text.split(' - ')[1].toLowerCase()

            const userInfoEmbed = new EmbedBuilder()
            .setTitle(`Auth Kontrol Menüsü`)
            .setDescription(`<:dot:1197573208078045295> **${user.Username.split(' ').map(kelime => kelime.charAt(0).toUpperCase() + kelime.slice(1).toLowerCase()).join(' ')} isimki kullanıcı üzerinde yapmak iztediğiniz işlemi seçiniz.**`)
            .setThumbnail("https://media.discordapp.net/attachments/1158044953323249705/1197570441741615144/DildoService-icon1.png")
            .setColor("#0075ff")
            .setFooter({ text: `${adminAuth}  •  Dildo API Services - ${auth}`, iconURL: "https://media.discordapp.net/attachments/1158044953323249705/1197541630891274280/DildoService-_Logo.png"})
            .setTimestamp()

            const userInfoMenu = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                .setCustomId(`userInfo-${auth}`)
                .setPlaceholder('Kullanıcı için yapmak istediğiniz işlemi seçin.')
                .addOptions(    
                    { label: "API Ekle", emoji: "❤️", value: `add-api` },
                    { label: "API Sil", emoji: "🗑️", value: "delete-api" },
                    { label: "API Bilgi", emoji: "🔎", value: "info-api" },
                    { label: "2FA Sistemi", emoji: "🔑", value: "set-TwoFactor" },
                    { label: "Bakiye İşlermeri", emoji: "💸", value: "set-balance"},
                    { label: "Auth Ayarları", emoji: "⚙️", value: "settings-auth"},
                    { label: "Bildirim Gönder", emoji: "🔔", value: "userSend-notification" },
                    { label: "Bildirimleri", emoji: "📢", value: "user-notification"},
                )
            ) 

            const buttons = new ActionRowBuilder().addComponents([
                new ButtonBuilder()
                .setLabel('Ana Sayfa')
                .setCustomId('backPage-home')
                .setEmoji('🏠')
                .setStyle(ButtonStyle.Primary),
            ])

            return await int.update({ embeds: [userInfoEmbed], components: [userInfoMenu, buttons] ,ephemeral: true })

        } catch (error) {
            console.log("[BOT] " + error)
            await int.reply({ embeds: [embed.setDescription('İşlem gerçekleştirilirken bir sorun oluştu. Daha sonra tekrar deneyin.')], ephemeral: true })
        }

    }
}