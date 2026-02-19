module.exports = {
    customId: "userSend-notification",
    async execute(client, int, embed) {
        try {
            await int.reply({ embeds: [embed.setDescription('Bu işlem şimdilik yapım aşamasındadır.')], ephemeral: true })
        } catch (error) {
            console.log("[BOT] " + error)
            await int.reply({ embeds: [embed.setDescription('İşlem gerçekleştirilirken bir sorun oluştu. Daha sonra tekrar deneyin.')], ephemeral: true })
        }
    }
}