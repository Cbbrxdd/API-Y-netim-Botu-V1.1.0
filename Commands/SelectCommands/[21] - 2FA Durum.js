const { ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js')
const customerSchema = require('../../Database/Schema/user')

module.exports = {
    customId: "setTwoFactor",
    async execute(client, int, embed) {

        try {
            
            const auth = int.message.embeds[0].data.footer.text.split(' - ')[1].toLowerCase()
            const active = int.values[0].split("-")[1] === "pasif" ? false : true
            const db = await customerSchema.findOne({ Auth: auth })

            db.TwoFactor.active = active;
            const x = await customerSchema.findOneAndUpdate({ Auth: db.Auth }, { TwoFactor: db.TwoFactor }, { upsert: true })

            const userTwoFactorEmbed = new EmbedBuilder()
            .setTitle(`${auth.split(' ').map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()).join(' ')} 2FA Ayarları`)
            .setDescription(`**Aşağıdan yapmak istediğiniz işlemi seçiniz.\n\n<:dot:1197573208078045295> Durum: \`${ active === false ? "Pasif": "Aktif" }\`\n<:dot:1197573208078045295>Anahtar: \`${x.TwoFactor.secret}\`**`)
            .setColor("#0075ff")
            .setThumbnail("https://media.discordapp.net/attachments/1158044953323249705/1197570441741615144/DildoService-icon1.png")
            .setFooter({ text: `${int.message.embeds[0].data.footer.text}`, iconURL: "https://media.discordapp.net/attachments/1158044953323249705/1197541630891274280/DildoService-_Logo.png"})
            .setTimestamp()

            const userTwoFactorMenu =  new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                .setCustomId(`userTwoFactorSettingMenu`)
                .setPlaceholder('2FA Ayarları')
                .addOptions([
                    { label: `${ active === false ? 'Aktif' : 'Pasif'} Olarak Ayarla`, emoji: `${ active === false ? '✅' : '⛔'}`, value: `setTwoFactor-${ active === false ? `aktif` : `pasif`}` },
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

            return await int.update({ embeds: [userTwoFactorEmbed], components: [userTwoFactorMenu, buttons] })

        } catch (error) {
            console.log("[BOT] " + error)
            await int.reply({ embeds: [embed.setDescription('İşlem gerçekleştirilirken bir sorun oluştu. Daha sonra tekrar deneyin.')], ephemeral: true })
        }

    }
}