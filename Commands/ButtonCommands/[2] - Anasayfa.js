const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder} = require('discord.js')
const { ownerAuths } = require('../../Settings/config')
const customerSchema = require('../../Database/Schema/user')

module.exports = {
    customId: "home",
    async execute(client, int, embed) {
        
        const footer = int.message.embeds[0].data.footer.text
        const auth = footer.split('  •  ')[1] === undefined ? footer.split(' - ')[1].toLowerCase() : footer.split('  •  ')[0].toLowerCase()
        
        const user = await customerSchema.findOne({ Auth: auth })
        if(!user) return await int.reply({ embeds: [embed.setDescription('Anasayfaya Dönerken bir sorun 0luştu. Lütfen Tekrardan Giriş Yapın')], ephemeral: true})
 
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
    
            return await int.update({ embeds: [loginPanel], components: [loginMenu], ephemeral: true});

        } else {              
    
            const loginPanel = new EmbedBuilder()
            .setTitle(`Hoşgeldin! ${user.Username.split(' ').map(k => k.charAt(0).toUpperCase() + k.slice(1).toLowerCase()).join(' ')} 👋`)
            .setDescription('<:dot:1197573208078045295> Aşağıdaki Menüden Yapmak İstediğiniz İşlemi Seçiniz.')
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
    
            return await int.update({ embeds: [loginPanel], components: [loginMenu], ephemeral: true});
            
        }

    }
}