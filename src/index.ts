import "dotenv/config";

import Client from "./core/client";
import messageCreate from "./events/messageCreate";
import ready from "./events/ready";
import "./core/config";

const client = new Client();

void client.start(process.env.token);

client.on("messageCreate", messageCreate);
client.once("ready", ready);
