import type { Client, Role } from "discord.js";

import InteractionHandler from "../module/interactionHandler";

export default function ready(client: Client) {
    const guild = client.guilds.cache.get(process.env.guild);
    if (guild === undefined) {
        throw new Error("Guild doesn't exist!");
    }
    function getRole(roleId: string): Role {
        if (guild === undefined) {
            throw new Error("Guild doesn't exist!");
        }
        const role = guild.roles.cache.get(roleId);
        if (role) {
            return role;
        }
        throw new Error("One of roles doesn't exist!");
    }
    const {
        user,
        clown,
        katsap,
        ukrainian,
        russian,
        bump,
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
        user: getRole(user),
        clown: getRole(clown),
        katsap: getRole(katsap),
        bump: getRole(bump),
        ukrainian: getRole(ukrainian),
        russian: getRole(russian),
        belarus: getRole(belarus),
        bulgarian: getRole(bulgarian),
        pole: getRole(pole),
        romanian: getRole(romanian),
        moldavian: getRole(moldavian),
        estonian: getRole(estonian),
        lithuanian: getRole(lithuanian),
        latvian: getRole(latvian),
        georgian: getRole(georgian),
        azerbaijani: getRole(azerbaijani),
        armenian: getRole(armenian),
        kazakh: getRole(kazakh),
    };
    const handler = new InteractionHandler(roles);
    client.on("interactionCreate", (interaction) => {
        const memberId = interaction.member?.user.id;
        if (memberId !== undefined) {
            const member = guild.members.cache.get(memberId);
            if (member) {
                handler.startInteraction(interaction, member);
            }
        }
    });
}
