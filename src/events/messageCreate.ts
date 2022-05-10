import { type Message, MessageActionRow, MessageButton } from "discord.js";

export default function messageCreate(message: Message) {
    if (
        message.content.startsWith("end!rules") &&
        message.member?.id === "359678229096955904"
    ) {
        const row = new MessageActionRow();
        row.addComponents(
            new MessageButton()
                .setCustomId("Questions")
                .setLabel("Получить доступ")
                .setStyle("DANGER")
                .setEmoji("<:yes_:964526591621345300>"),
            new MessageButton()
                .setCustomId("bump")
                .setLabel("Подписаться на !bump")
                .setStyle("SUCCESS")
                .setEmoji("🤖"),
            new MessageButton()
                .setCustomId("notification")
                .setLabel("Подписаться на уведомления")
                .setStyle("SUCCESS")
                .setEmoji("📣"),
            new MessageButton()
                .setCustomId("news")
                .setLabel("Подписаться на новости")
                .setStyle("SUCCESS")
                .setEmoji("📰")
        );

        void message.channel.send({
            components: [row],

            content:
                'Я молодец, так как:\n1. Я прочёл правила выше и согласен с ними;\n2. Выполнил все пункты выше и хочу получить доступ к остальным каналам, нажав на кнопку "Получить доступ" ниже;\n3. Я хочу подписаться на бампы, нажав на кнопку "Подписаться на !bump" ниже. \n3. Я хочу подписаться на уведомления, нажав на кнопку "Подписаться на уведомления" ниже.\n3. Я хочу подписаться на новости сервера, нажав на кнопку "Подписаться на новости" ниже.',
        });
    }
}
