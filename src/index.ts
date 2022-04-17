/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-statements */
/* eslint-disable default-case */
/* eslint-disable max-depth */
/* eslint-disable complexity */
/* eslint-disable max-lines */

import "dotenv/config";
import { MessageActionRow, MessageButton, MessageSelectMenu } from "discord.js";
import { Routes } from "discord-api-types/v9";
import { REST } from "@discordjs/rest";

import Client, { type ClientConfig } from "./core/client";

const { token } = process.env;
const client = new Client();

void client.start(process.env as unknown as ClientConfig);

const commands = [
    {
        name: "ping",
        description: "Replies with Pong!",
    },
];
const rest = new REST({ version: "10" }).setToken(token!);

void rest.put(
    Routes.applicationGuildCommands("964908784579407922", "919572562474827787"),
    {
        body: commands,
    }
);
const Options = [
    {
        label: "Українець",
        description: "Ти дійсно Українець?",
        value: "ua",
    },
    {
        label: "Другая",
        description: "Другая национальность",
        value: "other",
    },
];
const UaQuestions = {
    one: [
        {
            label: "Так",
            value: "ua",
        },
        {
            label: "Ні",
            value: "clown",
        },
    ],

    two: [
        {
            label: "Український",
            value: "ua",
        },
        {
            label: "Російський",
            value: "clown",
        },
    ],

    three: [
        {
            label: "Позитивно",
            value: "clown",
        },
        {
            label: "Негативно",
            value: "ua",
        },
    ],

    four: [
        {
            label: "Так",
            value: "clown",
        },
        {
            label: "Ні",
            value: "ua",
        },
    ],

    five: [
        {
            label: "Так",
            value: "ua",
        },
        {
            label: "Ні",
            value: "clown",
        },
    ],

    six: [
        {
            label: "Так",
            value: "ua",
        },
        {
            label: "Ні",
            value: "clown",
        },
    ],

    seven: [
        {
            label: "Російські військові",
            value: "ua",
        },
        {
            label: "Українські військові",
            value: "clown",
        },
    ],

    eight: [
        {
            label: "Так",
            value: "ua",
        },
        {
            label: "Ні",
            value: "clown",
        },
    ],

    nine: [
        {
            label: "Негативно",
            value: "uaUser",
        },
        {
            label: "Позитивно",
            value: "clown",
        },
    ],
};
const RuQuestions = {
    one: [
        {
            label: "Да",
            value: "other",
        },
        {
            label: "Нет",
            value: "katsap",
        },
    ],

    two: [
        {
            label: "Украинский",
            value: "other",
        },
        {
            label: "Российский",
            value: "katsap",
        },
    ],

    three: [
        {
            label: "Негативно",
            value: "other",
        },
        {
            label: "Позитивно",
            value: "katsap",
        },
    ],

    four: [
        {
            label: "Нет",
            value: "other",
        },
        {
            label: "Да",
            value: "katsap",
        },
    ],

    five: [
        {
            label: "Да",
            value: "other",
        },
        {
            label: "Незнаю",
            value: "other",
        },
        {
            label: "Нет",
            value: "katsap",
        },
    ],

    six: [
        {
            label: "Да",
            value: "other",
        },
        {
            label: "Незнаю",
            value: "other",
        },
        {
            label: "Нет",
            value: "katsap",
        },
    ],

    seven: [
        {
            label: "Руссике военные",
            value: "other",
        },
        {
            label: "Украинские военные",
            value: "katsap",
        },
    ],

    eight: [
        {
            label: "Да",
            value: "other",
        },
        {
            label: "Нет",
            value: "katsap",
        },
    ],

    nine: [
        {
            label: "Негативно",
            value: "RuUser",
        },
        {
            label: "Позитивно",
            value: "katsap",
        },
    ],
};
client.on("interactionCreate", async (interaction) => {
    const row = new MessageActionRow();

    if (interaction.isCommand() && interaction.commandName === "ping") {
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

        await interaction.reply({
            components: [row],

            content:
                'Я молодец, так как:\n1. Я прочёл правила выше и согласен с ними;\n2. Выполнил все пункты выше и хочу получить доступ к остальным каналам, нажав на кнопку "Получить доступ" ниже;\n3. Я хочу подписаться на бампы, нажав на кнопку "Подписатся на !bump" ниже.',
        });
    } else if (interaction.isButton() && interaction.customId === "Test") {
        row.addComponents(
            new MessageSelectMenu()
                .setCustomId("national")
                .setPlaceholder("Nothing selected")
                .addOptions(Options)
        );
        await interaction.reply({
            components: [row],
            ephemeral: true,
            content: "1. **Какой ты национальности?**",
        });
    } else {
        const guild = client.guilds.cache.get("919572562474827787")!;
        const memberId = interaction.member?.user.id;
        const member = guild.members.cache.get(memberId!);
        let roleId: string;
        if (interaction.isButton() && interaction.customId === "Bumps") {
            roleId = "964994216256233523";
            await interaction.reply({
                content: "Поздравляю, вы подписались на бампы",
                ephemeral: true,
                components: [],
            });
        } else if (interaction.isSelectMenu()) {
            switch (interaction.values[0]) {
                case "clown": {
                    roleId = "964994216256233523";
                    await interaction.update({
                        content: "**Молодець, ти Клоун!**",
                        components: [],
                    });

                    break;
                }
                case "katsap": {
                    roleId = "964994188414439544";
                    await interaction.update({
                        content: "**Молодец, ты Кацап!**",
                        components: [],
                    });

                    break;
                }
                case "uaUser": {
                    roleId = "965230312634347570";
                    await interaction.update({
                        content: "**Ти пройшов тест!**",
                        components: [],
                    });

                    break;
                }
                case "ruUser": {
                    roleId = "965230337699496026";
                    await interaction.update({
                        content: "**Ты прошёл тест!**",
                        components: [],
                    });

                    break;
                }
                default: {
                    switch (interaction.customId) {
                        case "national": {
                            if (interaction.values[0] === "ua") {
                                row.addComponents(
                                    new MessageSelectMenu()
                                        .setCustomId("one")
                                        .addOptions(UaQuestions.one)
                                );
                                await interaction.update({
                                    content:
                                        "**2. Ти згідний з правилами серверу?**",

                                    components: [row],
                                });
                            } else {
                                row.addComponents(
                                    new MessageSelectMenu()
                                        .setCustomId("one")
                                        .addOptions(RuQuestions.one)
                                );
                                await interaction.update({
                                    content:
                                        "**2. Ты согласен с правилами сервера?**",

                                    components: [row],
                                });
                            }

                            break;
                        }
                        case "one": {
                            if (interaction.values[0] === "ua") {
                                row.addComponents(
                                    new MessageSelectMenu()
                                        .setCustomId("two")
                                        .addOptions(UaQuestions.two)
                                );
                                await interaction.update({
                                    content: "**3. Чий Крим?**",
                                    components: [row],
                                });
                            } else {
                                row.addComponents(
                                    new MessageSelectMenu()
                                        .setCustomId("two")
                                        .addOptions(RuQuestions.two)
                                );
                                await interaction.update({
                                    content: "**3. Чей Крым?**",
                                    components: [row],
                                });
                            }

                            break;
                        }
                        case "two": {
                            if (interaction.values[0] === "ua") {
                                row.addComponents(
                                    new MessageSelectMenu()
                                        .setCustomId("three")
                                        .addOptions(UaQuestions.three)
                                );
                                await interaction.update({
                                    content: "**4. Як відносишся до путіна?**",
                                    components: [row],
                                });
                            } else {
                                row.addComponents(
                                    new MessageSelectMenu()
                                        .setCustomId("three")
                                        .addOptions(RuQuestions.three)
                                );
                                await interaction.update({
                                    content: "**4. Как относишься к путину?**",
                                    components: [row],
                                });
                            }

                            break;
                        }
                        case "three": {
                            if (interaction.values[0] === "ua") {
                                row.addComponents(
                                    new MessageSelectMenu()
                                        .setCustomId("four")
                                        .addOptions(UaQuestions.four)
                                );
                                await interaction.update({
                                    content:
                                        "**5. Підтримуєш незалежність `Л/ДНР` ?**",

                                    components: [row],
                                });
                            } else {
                                row.addComponents(
                                    new MessageSelectMenu()
                                        .setCustomId("four")
                                        .addOptions(RuQuestions.four)
                                );
                                await interaction.update({
                                    content:
                                        "**5. Поддерживаешь независимость `Л/ДНР` ?**",

                                    components: [row],
                                });
                            }
                            break;
                        }
                        case "four": {
                            if (interaction.values[0] === "ua") {
                                row.addComponents(
                                    new MessageSelectMenu()
                                        .setCustomId("five")
                                        .addOptions(UaQuestions.five)
                                );
                                await interaction.update({
                                    content:
                                        "**6. Чи був геноцид в Бучі, Ірпені, Гостомелі?**",

                                    components: [row],
                                });
                            } else {
                                row.addComponents(
                                    new MessageSelectMenu()
                                        .setCustomId("five")
                                        .addOptions(RuQuestions.five)
                                );
                                await interaction.update({
                                    content:
                                        "**6. Был ли геноцид в Буче, Ирпене, Гостомеле?**",

                                    components: [row],
                                });
                            }
                            break;
                        }
                        case "five": {
                            if (interaction.values[0] === "ua") {
                                row.addComponents(
                                    new MessageSelectMenu()
                                        .setCustomId("six")
                                        .addOptions(UaQuestions.six)
                                );
                                await interaction.update({
                                    content:
                                        "**7. Армія РФ була в Донбасі 8 років тому?**",

                                    components: [row],
                                });
                            } else {
                                row.addComponents(
                                    new MessageSelectMenu()
                                        .setCustomId("six")
                                        .addOptions(RuQuestions.six)
                                );
                                await interaction.update({
                                    content:
                                        "**7. Армия РФ была в Донбассе 8 лет назад?**",

                                    components: [row],
                                });
                            }
                            break;
                        }
                        case "six": {
                            if (interaction.values[0] === "ua") {
                                row.addComponents(
                                    new MessageSelectMenu()
                                        .setCustomId("seven")
                                        .addOptions(UaQuestions.seven)
                                );
                                await interaction.update({
                                    content:
                                        "**8. Хто влаштував геноцид в Бучі?**",

                                    components: [row],
                                });
                            } else {
                                row.addComponents(
                                    new MessageSelectMenu()
                                        .setCustomId("seven")
                                        .addOptions(RuQuestions.seven)
                                );
                                await interaction.update({
                                    content:
                                        "**8. Кто устроил геноцид в Буче?**",

                                    components: [row],
                                });
                            }
                            break;
                        }
                        case "seven": {
                            if (interaction.values[0] === "ua") {
                                row.addComponents(
                                    new MessageSelectMenu()
                                        .setCustomId("eight")
                                        .addOptions(UaQuestions.eight)
                                );
                                await interaction.update({
                                    content:
                                        "**9. Чи спонсувала Росія сепаратистів `Л/ДНР` ?**",

                                    components: [row],
                                });
                            } else {
                                row.addComponents(
                                    new MessageSelectMenu()
                                        .setCustomId("eight")
                                        .addOptions(RuQuestions.eight)
                                );
                                await interaction.update({
                                    content:
                                        "**9. Спонсировала ли Россия сепаратистов `Л/ДНР` ?**",

                                    components: [row],
                                });
                            }
                            break;
                        }
                        case "eight": {
                            if (interaction.values[0] === "ua") {
                                row.addComponents(
                                    new MessageSelectMenu()
                                        .setCustomId("uaUser")
                                        .addOptions(UaQuestions.nine)
                                );
                                await interaction.update({
                                    content:
                                        "**10. Як ти відносишся до війни?**",

                                    components: [row],
                                });
                            } else {
                                row.addComponents(
                                    new MessageSelectMenu()
                                        .setCustomId("ruUser")
                                        .addOptions(RuQuestions.nine)
                                );
                                await interaction.update({
                                    content:
                                        "**10. Как ты относишься к войне?**",

                                    components: [row],
                                });
                            }
                            break;
                        }
                    }
                }
            }
        }
        const role = guild.roles.cache.find((rol) => rol.id === roleId);
        if (role) {
            await member?.roles.add(role);
        }
    }
});
