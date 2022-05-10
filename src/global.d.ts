declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
            token: string;
            guild: string;
            user: string;
            bump: string;
            news: string;
            notification: string;
            clown: string;
            katsap: string;
            ukrainian: string;
            russian: string;
            belarus: string
            bulgarian: string
            pole: string
            romanian: string
            moldavian: string
            estonian: string
            lithuanian: string
            latvian: string
            georgian: string
            azerbaijani: string
            armenian: string
            kazakh: string
        }
    }
}

export { }