import { Client as DiscordClient, Intents, Options } from "discord.js";

export default class Client extends DiscordClient {
    public constructor() {
        super({
            intents: new Intents(32_767),
            restTimeOffset: 0,

            sweepers: {
                messages: {
                    interval: 200,
                    lifetime: 200,
                },
            },

            makeCache: Options.cacheEverything(),
        });
    }

    public async start(token: string): Promise<void> {
        await super.login(token);
    }
}
