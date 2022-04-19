import { Client as DiscordClient, Intents, Options } from "discord.js";

export interface ClientConfig {
    token: string;
}
export default class Client extends DiscordClient {
    public constructor() {
        super({
            intents: new Intents(32_767),
            messageCacheLifetime: 200,
            messageSweepInterval: 200,
            restTimeOffset: 0,

            makeCache: Options.cacheEverything(),
        });
    }

    public async start(token: string): Promise<void> {
        await super.login(token);
    }
}
