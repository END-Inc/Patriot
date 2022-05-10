import {
    type GuildMemberRoleManager,
    type ButtonInteraction,
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

const subscribeButtonStrings = {
    news: {
        dHaveRole: "Поздравляю, вы подписались на новости сервера",
        hasRole: "Вы отписались от новостей сервера",
    },

    notification: {
        dHaveRole: "Поздравляю, вы подписались на уведомления",
        hasRole: "Вы отписались от уведомлений",
    },

    bump: {
        dHaveRole: "Поздравляю, вы подписались на бампы",
        hasRole: "Вы отписались от бампов",
    },
};
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
    readonly news: Role;
    readonly notification: Role;
}
type SubscribeButton = keyof InteractionHandlerRoleOptions &
    keyof typeof subscribeButtonStrings;
export default class InteractionHandler {
    private readonly roles: InteractionHandlerRoleOptions;

    public constructor(roles: InteractionHandlerRoleOptions) {
        this.roles = roles;
    }

    private buttonManager(
        interaction: ButtonInteraction,
        rolesManager: GuildMemberRoleManager
    ) {
        if (interaction.customId === "Questions") {
            void this.nationalButtonInteraction(interaction, rolesManager);
        } else {
            void this.subscribeButtonInteraction(
                interaction,
                rolesManager,
                interaction.customId as SubscribeButton
            );
        }
    }

    private selectMenuManager(
        interaction: SelectMenuInteraction,
        rolesManager: GuildMemberRoleManager
    ) {
        const { answers, index, answerId, content } = this.getSelectMenuProps(
            interaction.customId,
            interaction.values[0]
        );
        let components: MessageActionRow[] | never[] = [];
        this.rolesManager(interaction.values, rolesManager);
        if (index >= 0) {
            if (index < 9) {
                components = this.questionsManager(answers, answerId);
            } else {
                void rolesManager.add(this.roles.user);
            }
            void interaction.update({
                content,
                components,
            });
        }
    }

    private getSelectMenuProps(customId: string, value?: string) {
        const { answers, questions } = this.getQuestionsLanguage(
            value ?? "ukrainian"
        );
        const index = customIds.indexOf(customId as Answer) + 1;
        const answerId = customIds[index] as Answer;
        const content = questions[answerId as keyof typeof questions];
        return {
            answers,
            index,
            answerId,
            content,
        };
    }

    private wrongManager(
        interaction: SelectMenuInteraction,
        rolesManager: GuildMemberRoleManager
    ) {
        const isKatsap = rolesManager.cache.has(process.env.russian);
        const isClown = rolesManager.cache.has(process.env.ukrainian);
        const role = isKatsap ? this.roles.katsap : this.roles.clown;
        const content = isClown
            ? "**Ти сепаратист, та клоун**!"
            : "**Ты кацап**!";
        void rolesManager.add(role);
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

    private rolesManager(
        values: readonly string[],
        rolesManager: GuildMemberRoleManager
    ) {
        values.forEach((value) => {
            if (Object.keys(this.roles).includes(value)) {
                const role =
                    this.roles[value as keyof InteractionHandlerRoleOptions];
                void rolesManager.add(role);
            }
        });
    }

    public startInteraction(
        interaction: Interaction,
        rolesManager: GuildMemberRoleManager
    ) {
        if (interaction.isButton()) {
            this.buttonManager(interaction, rolesManager);
        } else if (interaction.isSelectMenu()) {
            if (interaction.values[0] === "wrong") {
                this.wrongManager(interaction, rolesManager);
                return;
            }
            this.selectMenuManager(interaction, rolesManager);
        } else {
            console.log("Smth wrong");
        }
    }

    private async nationalButtonInteraction(
        interaction: ButtonInteraction,
        rolesManager: GuildMemberRoleManager
    ) {
        const components = [];
        const { clown, user, katsap } = process.env;
        const nationalRoles: string[] = [clown, user, katsap];
        const hasRole = rolesManager.cache.find((role) =>
            nationalRoles.includes(role.id)
        );
        let content = "You have already completed this test";
        if (hasRole === undefined) {
            content = "1. **You?**";
            components.push(
                new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                        .setCustomId("one")
                        .setMinValues(1)
                        .setMaxValues(3)
                        .setPlaceholder("Nothing selected")
                        .addOptions(options)
                )
            );
        }
        await interaction.reply({
            components,
            ephemeral: true,
            content,
        });
    }

    private async subscribeButtonInteraction(
        interaction: ButtonInteraction,
        rolesManager: GuildMemberRoleManager,
        type: SubscribeButton
    ) {
        const role = this.roles[type];
        const hasRole = rolesManager.cache.has(role.id);
        const content =
            subscribeButtonStrings[type][hasRole ? "hasRole" : "dHaveRole"];
        if (hasRole) {
            void rolesManager.remove(role);
        } else {
            void rolesManager.add(role);
        }
        await interaction.reply({
            content,
            ephemeral: true,
            components: [],
        });
    }
}
