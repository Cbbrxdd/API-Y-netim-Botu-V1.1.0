const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const customerSchema = require('../../Database/Schema/user')

module.exports = {
    customId: "my-apis",
    async execute(client, int, embed) {
        try {
            const auth = int.customId.split('-')[1]
            let apis = await customerSchema.findOne({ Auth: auth })

            apis = apis.sorgular.map(x => {
                return { label: `${x.name.split(' ').map(kelime => kelime.charAt(0).toUpperCase() + kelime.slice(1).toLowerCase()).join(' ')} Api`, emoji: "🌐", value: `userApi-${auth}-${x.name}` }
            })

            if (apis.length > 25) {
                apis = apis.slice(0, 25);
            }

            const apisMenu = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(`apiMenu`)
                    .setPlaceholder('API Seçiniz')
                    .addOptions(apis)
            )

            const apiEmbed = new EmbedBuilder()
                .setTitle(`API Kontrol Menüsü`)
                .setDescription('<:dot:1197573208078045295> **Aşağıdaki Menüden İşlem Yapmak İstediğiniz API\'yi Seçin.**')
                .setColor('#0075ff')
                .setThumbnail(int.user.avatarURL())
                .setFooter({ text: `Dildo API Services - ${auth}`, iconURL: int.guild.iconURL() })
                .setTimestamp()

            const buttons = new ActionRowBuilder().addComponents([
                new ButtonBuilder()
                    .setLabel('Anasayfa')
                    .setCustomId('backPage-home')
                    .setEmoji('🏠')
                    .setStyle(ButtonStyle.Primary),
            ])

            await int.update({ embeds: [apiEmbed], components: [apisMenu, buttons] })
        } catch (error) {
            console.log("[BOT] " + error)
            await int.reply({ embeds: [embed.setDescription('İşlem gerçekleştirilirken bir sorun oluştu. Daha sonra tekrar deneyin.')], ephemeral: true })
        }
    }
}