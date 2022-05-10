import type { Client, Guild, Role } from "discord.js";

import InteractionHandler from "../module/interactionHandler";

function getRole(roleId: string, guild: Guild): Role {
    const role = guild.roles.cache.get(roleId);
    if (role) {
        return role;
    }
    throw new Error("One of roles doesn't exist!");
}
export default function ready(client: Client) {
    const guild = client.guilds.cache.get(process.env.guild);
    if (guild !== undefined) {
        const {
            user,
            clown,
            katsap,
            ukrainian,
            russian,
            bump,
            news,
            notification,
            belarus,
            bulgarian,
            pole,
            romanian,
            moldavian,
            estonian,
            lithuanian,
            latvian,
            georgian,
            azerbaijani,
            armenian,
            kazakh,
        } = process.env;
        const roles = {
            user: getRole(user, guild),
            clown: getRole(clown, guild),
            katsap: getRole(katsap, guild),
            bump: getRole(bump, guild),
            news: getRole(news, guild),
            notification: getRole(notification, guild),
            ukrainian: getRole(ukrainian, guild),
            russian: getRole(russian, guild),
            belarus: getRole(belarus, guild),
            bulgarian: getRole(bulgarian, guild),
            pole: getRole(pole, guild),
            romanian: getRole(romanian, guild),
            moldavian: getRole(moldavian, guild),
            estonian: getRole(estonian, guild),
            lithuanian: getRole(lithuanian, guild),
            latvian: getRole(latvian, guild),
            georgian: getRole(georgian, guild),
            azerbaijani: getRole(azerbaijani, guild),
            armenian: getRole(armenian, guild),
            kazakh: getRole(kazakh, guild),
        };
        const handler = new InteractionHandler(roles);
        client.on("interactionCreate", (interaction) => {
            const memberId = interaction.member?.user.id;
            if (memberId !== undefined) {
                const member = guild.members.cache.get(memberId);
                if (member) {
                    handler.startInteraction(interaction, member.roles);
                }
            }
        });
    }
}
