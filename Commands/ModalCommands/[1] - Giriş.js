const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js')
const customerSchema = require('../../Database/Schema/user')
const { owners, ownerAuths } = require('../../Settings/config')

module.exports = {
    customId: "loginModal",
    async execute(client, int, embed){
        try {
            let auth = int.fields.getTextInputValue("auth");
            let password = int.fields.getTextInputValue("password");
            const user = await customerSchema.findOne({ Auth: auth, Password: password})
            if(!user) {
                
                return await int.reply({ embeds: [embed.setDescription('**<:dot:1197573208078045295>Giriş yapılırken bir sorun 0luştu. Auth\'unuzu veya Şifre\'nizi doğru girdiğinizden emin olun.**')], ephemeral: true})
           
            } else { if(user.DiscordId == undefined) { await customerSchema.findOneAndUpdate({ Auth: auth }, { DiscordId: int.user.id }, { upsert: true }) } else { if(!owners.includes(int.user.id)) { if(user.DiscordId != int.user.id) return await int.reply({ embeds: [embed.setDescription(`**<:dot:1197573208078045295>He yarram bi zeki sensin zaten dimi gel gel nah girersin. SG kendi hesabına gir.**`)], ephemeral: true})}}}

            if (ownerAuths.includes(auth)) {

                const loginPanel = new EmbedBuilder()
                .setTitle(`Hoşgeldin Kral! ${user.Username.split(' ').map(k => k.charAt(0).toUpperCase() + k.slice(1).toLowerCase()).join(' ')} 👋`)
                .setDescription('<:dot:1197573208078045295> **Ooooo yoksa yeni müşterimi var. Müşteri yoksa SG**')
                .setColor('#0075ff')
                .setThumbnail(int.user.avatarURL())
                .setFooter({ text: `Dildo API Services - ${auth}`, iconURL: int.guild.iconURL() })
                .setTimestamp()
        
                const loginMenu = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                    .setCustomId(`loginMenu-${auth}`)
                    .setPlaceholder('Biliyon Zaten Ne Yapıcanı Sanada Anlatmayalım.')
                    .addOptions(    
                        { label: "Auth Ekle", emoji: "❤️", value: "add-auth" },
                        { label: "Auth Sil", emoji: "🗑️", value: "delete-auth" },
                        { label: "Auth Bilgi", emoji: "🔎", value: "search-auth" },
                        { label: "Bildirim Gönder", emoji: "🔔", value: "add-notification" },
                        { label: "Şifre Değiştir", emoji: "🔒", value: "chance-password" },
                        { label: "Auth Değiştir", emoji: "🔑", value: "chance-auth"},
                        { label: "IP Değiştir", emoji: "🛜", value: "chance-ip"},
                        { label: "Apilerim", emoji: "📂", value: "my-apis"},
                        { label: "Bildirimler", emoji: "📢", value: "notification"},
                    )
                )
        
                return await int.reply({ embeds: [loginPanel], components: [loginMenu], ephemeral: true});

            } else {              
        
                const loginPanel = new EmbedBuilder()
                .setTitle(`Hoşgeldin! ${user.Username.split(' ').map(k => k.charAt(0).toUpperCase() + k.slice(1).toLowerCase()).join(' ')} 👋`)
                .setDescription('**<:dot:1197573208078045295> Aşağıdaki Menüden Yapmak İstediğiniz İşlemi Seçiniz.**')
                .setColor('#0075ff')
                .setThumbnail(int.user.avatarURL())
                .setFooter({ text: `Dildo API Services - ${auth}`, iconURL: int.guild.iconURL() })
                .setTimestamp()
        
                const loginMenu = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                    .setCustomId(`loginMenu-${auth}`)
                    .setPlaceholder('Bir İşlem Seçiniz')
                    .addOptions(    
                        { label: "Şifre Değiştir", emoji: "🔒", value: "chance-password" },
                        { label: "Auth Değiştir", emoji: "🔑", value: "chance-auth"},
                        { label: "IP Değiştir", emoji: "🛜", value: "chance-ip"},
                        { label: "Apilerim", emoji: "📂", value: "my-apis"},
                        { label: "Bildirimler", emoji: "📢", value: "notification"},
                    )
                )
        
                return await int.reply({ embeds: [loginPanel], components: [loginMenu], ephemeral: true});
                
            }
        } catch (error) {
            
        }

    }
}