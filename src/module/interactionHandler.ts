/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
/* eslint-disable sonarjs/elseif-without-else */
import {
    type ButtonInteraction,
    type GuildMember,
    type Interaction,
    type Role,
    type SelectMenuInteraction,
    MessageActionRow,
    MessageSelectMenu,
} from "discord.js";

import { ruAnswers, ruQuestions } from "../languages/ru";
import { uaAnswers, uaQuestions } from "../languages/ua";
import {
    type Answer,
    type AnswersI,
    customIds,
    options,
} from "../languages/language";

interface InteractionHandlerRoleOptions {
    readonly user: Role;
    readonly clown: Role;
    readonly katsap: Role;
    readonly ukrainian: Role;
    readonly russian: Role;
    readonly bump: Role;
    readonly belarus: Role;
    readonly bulgarian: Role;
    readonly pole: Role;
    readonly romanian: Role;
    readonly moldavian: Role;
    readonly estonian: Role;
    readonly lithuanian: Role;
    readonly latvian: Role;
    readonly georgian: Role;
    readonly azerbaijani: Role;
    readonly armenian: Role;
    readonly kazakh: Role;
}

export default class InteractionHandler {
    private readonly roles: InteractionHandlerRoleOptions;

    public constructor(roles: InteractionHandlerRoleOptions) {
        this.roles = roles;
    }

    private buttonManager(interaction: ButtonInteraction, member: GuildMember) {
        switch (interaction.customId) {
            case "Questions":
                void this.nationalButtonInteraction(interaction);
                break;

            case "Bumps":
                void this.bumpButtonInteraction(interaction, member);
                break;

            // No Default
        }
    }

    // eslint-disable-next-line max-statements
    private selectMenuManager(
        interaction: SelectMenuInteraction,
        member: GuildMember
    ) {
        const [value] = interaction.values;
        const { answers, questions } = this.getQuestionsLanguage(value);
        const index = customIds.indexOf(interaction.customId as Answer) + 1;
        const answerId = customIds[index] as Answer;
        let components: MessageActionRow[] | never[] = [];
        const content = questions[answerId as keyof typeof questions];
        this.rolesManager(interaction.values, member);
        if (index !== -1) {
            if (index < 9) {
                components = this.questionsManager(answers, answerId);
            } else {
                void member.roles.add(this.roles.user);
            }
            void interaction.update({
                content,
                components,
            });
        }
    }

    private wrongManager(
        interaction: SelectMenuInteraction,
        member: GuildMember
    ) {
        let role = this.roles.clown;
        let content = "**Ты клоун!**";
        if (member.roles.cache.has(process.env.russian)) {
            role = this.roles.katsap;
            content = "**Ты кацап**!";
        } else if (member.roles.cache.has(process.env.ukrainian)) {
            content = "**Ти сепаратист та клоун**!";
        }
        void member.roles.add(role);
        void interaction.update({
            content,
            components: [],
        });
    }

    private getQuestionsLanguage(value: string | undefined) {
        if (value === "ukrainian") {
            return {
                answers: uaAnswers,
                questions: uaQuestions,
            };
        }
        return {
            answers: ruAnswers,
            questions: ruQuestions,
        };
    }

    private questionsManager(answers: AnswersI, answerId: Answer) {
        const row = new MessageActionRow();
        const menu = new MessageSelectMenu();
        const answer = answers[answerId];
        row.addComponents(menu.setCustomId(answerId).addOptions(answer));
        return [row];
    }

    private rolesManager(values: readonly string[], member: GuildMember) {
        values.forEach((value) => {
            if (Object.keys(this.roles).includes(value)) {
                const role =
                    this.roles[value as keyof InteractionHandlerRoleOptions];
                void member.roles.add(role);
            }
        });
    }

    public startInteraction(interaction: Interaction, member: GuildMember) {
        if (interaction.isButton()) {
            this.buttonManager(interaction, member);
        } else if (interaction.isSelectMenu()) {
            if (interaction.values[0] === "wrong") {
                this.wrongManager(interaction, member);
                return;
            }
            this.selectMenuManager(interaction, member);
        }
    }

    private async nationalButtonInteraction(interaction: ButtonInteraction) {
        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId("one")
                .setMinValues(1)
                .setMaxValues(3)
                .setPlaceholder("Nothing selected")
                .addOptions(options)
        );
        await interaction.reply({
            components: [row],
            ephemeral: true,
            content: "1. **You?**",
        });
    }

    private async bumpButtonInteraction(
        interaction: ButtonInteraction,
        member: GuildMember
    ) {
        await member.roles.add(this.roles.bump);
        await interaction.reply({
            content: "Поздравляю, вы подписались на бампы",
            ephemeral: true,
            components: [],
        });
    }
}
