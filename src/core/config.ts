import { resolve } from "node:path";

import { config as configDotenv } from "dotenv";

const path = "./configs/";
switch (process.env.NODE_ENV) {
    case "development":
        console.log("Environment is 'development'");
        configDotenv({
            path: resolve(path, ".env.development"),
        });
        break;
    case "production":
        configDotenv({
            path: resolve(path, ".env.production"),
        });
        break;

    default:
        throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`);
}
