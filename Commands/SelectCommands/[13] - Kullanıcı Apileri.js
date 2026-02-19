const { EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const customerSchema = require('../../Database/Schema/user')

module.exports = {
    customId: "info-api",
    async execute(client, int, embed) {

        try {
            
            const auth = int.message.embeds[0].data.footer.text.split(' - ')[1].toLowerCase()
            const userData = await customerSchema.findOne({ Auth: auth })
            
            let apis = userData.sorgular.map(x => {
                return { label: `${x.name.split(' ').map(kelime => kelime.charAt(0).toUpperCase() + kelime.slice(1).toLowerCase()).join(' ')} Api`, emoji: "🌐", value: `userApi-${auth}-${x.name}` }
            }) 
            
            if (apis.length > 25) {
                apis = apis.slice(0, 25);
            }

            const userApiEmbed = new EmbedBuilder()
            .setTitle(`Kullanıcı API Kontrol Menüsü`)
            .setDescription(`<:dot:1197573208078045295> **${userData.Username.split(' ').map(kelime => kelime.charAt(0).toUpperCase() + kelime.slice(1).toLowerCase()).join(' ')} kullanıcısının APIleri, işlem yapmak istediğiniz API\'yi seçiniz.**`)
            .setThumbnail("https://media.discordapp.net/attachments/1158044953323249705/1197570441741615144/DildoService-icon1.png")
            .setColor("#0075ff")
            .setFooter({ text: `${int.message.embeds[0].data.footer.text}`, iconURL: "https://media.discordapp.net/attachments/1158044953323249705/1197541630891274280/DildoService-_Logo.png"})
            .setTimestamp()

            const userApiMenu =  new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                .setCustomId(`userApiMenu`)
                .setPlaceholder('API Seçiniz')
                .addOptions(apis)
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

            await int.update({ embeds: [userApiEmbed], components: [userApiMenu, buttons]})

        } catch (error) {
            console.log("[BOT] " + error)
            await int.reply({ embeds: [embed.setDescription('İşlem gerçekleştirilirken bir sorun oluştu. Daha sonra tekrar deneyin.')], ephemeral: true })
        }

    }
}