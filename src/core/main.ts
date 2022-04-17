/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable complexity */
/* eslint-disable max-statements */
import type {
    ButtonInteraction,
    Role,
    Interaction,
    GuildMember,
    SelectMenuInteraction,
} from "discord.js";
import { MessageActionRow, MessageSelectMenu } from "discord.js";

import { ruAnswers, ruQuestions } from "../languages/ru";
import { uaAnswers, uaQuestions } from "../languages/ua";

const options = [
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
const result = {
    clown: "**Молодець, ти клоун!**",
    katsap: "**Молодец, ты кацап!**",
    user: "**Ти пройшов тест!**",
    ruUser: "**Ты прошёл тест!**",
};
interface InteractionHandlerRoleOptions {
    readonly clown: Role;
    readonly katsap: Role;
    readonly user: Role;
    readonly ruUser: Role;
    readonly bump: Role;
}
export default class InteractionHandler {
    private readonly options: InteractionHandlerRoleOptions;

    public constructor(options: InteractionHandlerRoleOptions) {
        this.options = options;
    }

    public async startInteraction(
        interaction: Interaction,
        member: GuildMember
    ) {
        if (interaction.isButton()) {
            if (interaction.customId === "Test") {
                void this.nationalButtonInteraction(interaction);
            } else {
                void this.bumpButtonInteraction(interaction, member);
            }
        } else if (interaction.isSelectMenu()) {
            const [value] = interaction.values;
            if (
                value !== undefined &&
                ["clown", "katsap", "user", "ruUser"].includes(value)
            ) {
                await interaction.update({
                    content: result[value as keyof typeof result],
                    components: [],
                });
                const role =
                    this.options[value as keyof InteractionHandlerRoleOptions];
                void member.roles.add(role);
                if (role.id === process.env["russian"]!) {
                    void member.roles.add(this.options.user);
                }
            } else {
                void this.questions(interaction);
            }
        }
    }

    private async questions(interaction: SelectMenuInteraction) {
        const [value] = interaction.values;
        const answers = value === "ua" ? uaAnswers : ruAnswers;
        const row = new MessageActionRow();
        const menu = new MessageSelectMenu();
        switch (interaction.customId) {
            case "national": {
                row.addComponents(
                    menu.setCustomId("one").addOptions(answers.one)
                );
                break;
            }
            case "one": {
                row.addComponents(
                    menu.setCustomId("two").addOptions(answers.two)
                );
                break;
            }
            case "two": {
                row.addComponents(
                    menu.setCustomId("three").addOptions(answers.three)
                );
                break;
            }
            case "three": {
                row.addComponents(
                    menu.setCustomId("four").addOptions(answers.four)
                );
                break;
            }
            case "four": {
                row.addComponents(
                    menu.setCustomId("five").addOptions(answers.five)
                );
                break;
            }
            case "five": {
                row.addComponents(
                    menu.setCustomId("six").addOptions(answers.six)
                );
                break;
            }
            case "six": {
                row.addComponents(
                    menu.setCustomId("seven").addOptions(answers.seven)
                );
                break;
            }
            case "seven": {
                row.addComponents(
                    menu.setCustomId("eight").addOptions(answers.eight)
                );
                break;
            }
            default: {
                row.addComponents(
                    menu
                        .setCustomId(value === "ua" ? "user" : "ruUser")
                        .addOptions(answers.nine)
                );
                break;
            }
        }
        const questions = value === "ua" ? uaQuestions : ruQuestions;
        await interaction.update({
            content: questions[interaction.customId as keyof typeof questions],
            components: [row],
        });
    }

    private async nationalButtonInteraction(interaction: ButtonInteraction) {
        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId("national")
                .setPlaceholder("Nothing selected")
                .addOptions(options)
        );
        await interaction.reply({
            components: [row],
            ephemeral: true,
            content: "1. **Какой ты национальности?**",
        });
    }

    private async bumpButtonInteraction(
        interaction: ButtonInteraction,
        member: GuildMember
    ) {
        await member.roles.add(this.options.bump);
        await interaction.reply({
            content: "Поздравляю, вы подписались на бампы",
            ephemeral: true,
            components: [],
        });
    }
}
export type { InteractionHandlerRoleOptions };
