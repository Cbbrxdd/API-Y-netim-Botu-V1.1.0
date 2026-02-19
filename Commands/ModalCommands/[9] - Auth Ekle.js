const customerSchema = require('../../Database/Schema/user')
const net = require('net');

module.exports = {
    customId: "addAuthModal",
    async execute(client, int, embed) {

        try {

            let username = int.fields.getTextInputValue("username");
            let auth = int.fields.getTextInputValue("auth");
            let ip = int.fields.getTextInputValue("ip");

            const userData = await customerSchema.findOne({ Auth: auth })
            if (userData) return await int.reply({ embeds: [embed.setDescription(`**<:dot:1197573208078045295>Aynı Auth\'a sahip başka bir kullanıcı bulunuyor. Lütfen Auth\'u eşsiz bir Auth olarak giriniz.**`)], ephemeral: true })

            if (net.isIP(ip) == 0) return await int.reply({ embeds: [embed.setDescription(`**<:dot:1197573208078045295>Geçersiz bir IP adresi girdiniz.\n<:dot:1197573208078045295>Girdiğiniz IP adresi:** ${ip}`)], ephemeral: true })

            await customerSchema({
                Username: username,
                Password: gRandom(15),
                IP: ip,
                Auth: auth,
                sorgular: [],
                TwoFactor: {
                    active: false,
                    secret: "sa"
                },
                Notification: {
                    UserIDS: []
                },
                PaymentInfo: {
                    Balance: 0,
                    History: [],
                    Total: 0
                },
            }).save().then(async x => {
                return await int.reply({ embeds: [embed.setDescription(`**Kullanıcı başarıyla eklendi. Auth işlemleri için \`🔎 Auth Bilgi\` sistemine gidiniz.\n\n<:dot:1197573208078045295> Kullanıcı Adı: \`${x.Username}\`\n<:dot:1197573208078045295> Şifre: \`${x.Password}\`\n<:dot:1197573208078045295> Auth: \`${x.Auth}\`\n<:dot:1197573208078045295> IP Adresi: \`${x.IP}\`**`)], ephemeral: true })
            }).catch(async err => {
                console.log("[BOT] " + err)
                return await int.reply({ embeds: [embed.setDescription(`**Kullanıcı eklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.**`)], ephemeral: true })
            })

        } catch (error) {
            console.log("[BOT] " + error)
            await int.reply({ embeds: [embed.setDescription('İşlem gerçekleştirilirken bir sorun oluştu. Daha sonra tekrar deneyin.')], ephemeral: true })
        }

    }
}

const gRandom = (length) => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghihklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }