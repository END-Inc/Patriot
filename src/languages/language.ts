import type { MessageSelectOptionData } from "discord.js";

interface AnswersI {
    readonly ten: MessageSelectOptionData[];
    readonly nine: MessageSelectOptionData[];
    readonly eight: MessageSelectOptionData[];
    readonly seven: MessageSelectOptionData[];
    readonly six: MessageSelectOptionData[];
    readonly five: MessageSelectOptionData[];
    readonly four: MessageSelectOptionData[];
    readonly three: MessageSelectOptionData[];
    readonly two: MessageSelectOptionData[];
}

interface QuestionsI {
    readonly ten: string;
    readonly nine: string;
    readonly eight: string;
    readonly seven: string;
    readonly six: string;
    readonly five: string;
    readonly four: string;
    readonly three: string;
    readonly two: string;
    readonly final: string;
}
const options = [
    {
        label: "Українець",
        description: "Слава Україні!",
        value: "ukrainian",
        emoji: "🇺🇦",
    },
    {
        label: "Русский",
        description: "Свободу России!",
        value: "russian",
        emoji: "🇷🇺",
    },
    {
        label: "Беларус",
        description: "Жыве Беларусь!",
        value: "belarus",
        emoji: "🇧🇾",
    },
    {
        label: "Българ",
        description: "Съединението прави силата!",
        value: "bulgarian",
        emoji: "🇧🇬",
    },
    {
        label: "Polak",
        description: "Bóg, Honor, Ojczyzna!",
        value: "pole",
        emoji: "🇵🇱",
    },
    {
        label: "Română",
        description: "Nihil Sine Deo!",
        value: "romanian",
        emoji: "🇷🇴",
    },
    {
        label: "Moldovenesc",
        description: "Limba noastră-i o comoară!",
        value: "moldavian",
        emoji: "🇲🇩",
    },
    {
        label: "Eesti",
        description: "-",
        value: "estonian",
        emoji: "🇪🇪",
    },
    {
        label: "Lietuviai",
        description: "Tēvzemei un Brīvībai!",
        value: "lithuanian",
        emoji: "🇱🇹",
    },
    {
        label: "Latvieši",
        description: "Tautos jėga vienybėje!",
        value: "latvian",
        emoji: "🇱🇻",
    },
    {
        label: "ქართული",
        description: "ძალა ერთობაშია!",
        value: "georgian",
        emoji: "🇬🇪",
    },
    {
        label: "Azərbaycan",
        description: "Odlar Yurdu!",
        value: "azerbaijani",
        emoji: "🇦🇿",
    },
    {
        label: "հայերեն",
        description: "Մեկ Ազգ, Մեկ Մշակույթ!",
        value: "armenian",
        emoji: "🇦🇲",
    },
    {
        label: "қазақтар",
        description: "Қазақстан - тік қана алға!!",
        value: "kazakh",
        emoji: "🇰🇿",
    },
];
type Answer = keyof AnswersI;

const customIds = [
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "final",
] as Answer[] | string[];
export { customIds, options };
export type { AnswersI, Answer, QuestionsI };
