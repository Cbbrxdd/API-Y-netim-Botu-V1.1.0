const customerSchema = require('../../Database/Schema/user')
const net = require('net');

module.exports = {
    customId: "deleteAuthModal",
    async execute(client, int, embed) {

        try {

            let auth = int.fields.getTextInputValue("auth");
            
            const userData = await customerSchema.findOneAndDelete({ Auth: auth })

            if (!userData) return await int.reply({ embeds: [embed.setDescription(`**<:dot:1197573208078045295>Silinecek Auth bulunamadı. Girdiğiniz Auth\'u kontrol edip tekrar deneyin.\n\n<:dot:1197573208078045295>Girdiğiniz Auth: \`${auth}\`**`)], ephemeral: true })

            return await int.reply({ embeds: [embed.setDescription(`**Kullanıcı başarıyla silindi.\n\nSilinen Hesap Bilgileri\n<:dot:1197573208078045295> Kullanıcı Adı: \`${userData.Username}\`\n<:dot:1197573208078045295> Şifre: \`${userData.Password}\`\n<:dot:1197573208078045295> Auth: \`${userData.Auth}\`\n<:dot:1197573208078045295> IP Adresi: \`${userData.IP}\`\n<:dot:1197573208078045295> Discord: <@${userData.DiscordId || "1197526335724204042"}>**`)], ephemeral: true })
        
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