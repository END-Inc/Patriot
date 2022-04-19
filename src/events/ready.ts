import type { Client, Role } from "discord.js";

import InteractionHandler from "../core/main";

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
    const { clown, katsap, uaUser, ruUser, bump } = process.env;
    const roles = {
        clown: getRole(clown),
        katsap: getRole(katsap),
        uaUser: getRole(uaUser),
        ruUser: getRole(ruUser),
        bump: getRole(bump),
    };
    const handler = new InteractionHandler(roles);
    client.on("interactionCreate", (interaction) => {
        const memberId = interaction.member?.user.id;
        if (memberId !== undefined) {
            const member = guild.members.cache.get(memberId);
            if (member) {
                void handler.startInteraction(interaction, member);
            }
        }
    });
}
