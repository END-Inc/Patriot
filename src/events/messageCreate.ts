import type { Message } from "discord.js";
import { MessageActionRow, MessageButton } from "discord.js";

export default function messageCreate(message: Message) {
    if (
        message.content.startsWith("end!rules") &&
        message.member?.id === "359678229096955904"
    ) {
        const row = new MessageActionRow();
        row.addComponents(
            new MessageButton()
                .setCustomId("Test")
                .setLabel("Получить доступ")
                .setStyle("DANGER"),
            new MessageButton()
                .setCustomId("Bumps")
                .setLabel("Подписатся на !bump")
                .setStyle("SUCCESS")
        );

        void message.channel.send({
            components: [row],

            content:
                'Я молодец, так как:\n1. Я прочёл правила выше и согласен с ними;\n2. Выполнил все пункты выше и хочу получить доступ к остальным каналам, нажав на кнопку "Получить доступ" ниже;\n3. Я хочу подписаться на бампы, нажав на кнопку "Подписатся на !bump" ниже.',
        });
    }
}
