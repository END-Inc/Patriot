/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/naming-convention */

import { MessageActionRow, MessageButton } from "discord.js";
import "dotenv/config";

import Client, { type ClientConfig } from "./core/client";
import InteractionHandler from "./core/main";

const client = new Client();

void client.start(process.env as unknown as ClientConfig);

client.once("ready", () => {
    const guild = client.guilds.cache.get(process.env["guild"]!)!;
    const roles = {
        clown: guild.roles.cache.get(process.env["clown"]!)!,
        katsap: guild.roles.cache.get(process.env["katsap"]!)!,
        uaUser: guild.roles.cache.get(process.env["user"]!)!,
        ruUser: guild.roles.cache.get(process.env["russian"]!)!,
        bump: guild.roles.cache.get(process.env["bump"]!)!,
    };
    const Handler = new InteractionHandler(roles);
    client.on("interactionCreate", (interaction) => {
        const memberId = interaction.member?.user.id;
        const member = guild.members.cache.get(memberId!)!;
        if (memberId !== "359678229096955904") {
            return;
        }
        void Handler.startInteraction(interaction, member);
    });
});
client.on("messageCreate", (message) => {
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
});
