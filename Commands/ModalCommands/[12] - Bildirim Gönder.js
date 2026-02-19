const customerSchema = require('../../Database/Schema/user')
const moment = require("moment");
moment.locale("tr");

module.exports = {
    customId: "addNotificationModal",
    async execute(client, int, embed) {

        try {
            
            let title = int.fields.getTextInputValue('title');
            let message = int.fields.getTextInputValue('message');
            
            await int.deferReply({ ephemeral:true })

            const users = await customerSchema.find({})
            let date = new Date();
            date = moment(date).valueOf()
            const notification = { title, message, sendTime: date }

            await Promise.all(users.map(async (user) => {
                const veri = user.Notification.UserIDS.concat(notification)
                await customerSchema.findOneAndUpdate({ Auth: user.Auth }, { "Notification.UserIDS": veri }, { upsert: true });
            }))

            return await int.followUp({ embeds: [embed.setDescription('**<:dot:1197573208078045295>Bildirim başarıyla tüm kullanıcılara gönderilmiştir.\n<:dot:1197573208078045295>Kullanıcılar \`📢 Bildirimler\` kısmından gönderdiğiniz bildirimi görebilirler**')], ephemeral: true })

        } catch (error) {
            console.log("[BOT] " + error)
            await int.reply({ embeds: [embed.setDescription('İşlem gerçekleştirilirken bir sorun oluştu. Daha sonra tekrar deneyin.')], ephemeral: true })
        }

    }
}