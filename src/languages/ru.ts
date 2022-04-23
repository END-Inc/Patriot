import type { AnswersI, QuestionsI } from "./language";

const ruAnswers: AnswersI = {
    two: [
        {
            label: "Да",
            value: "other",
        },
        {
            label: "Нет",
            value: "wrong",
        },
    ],

    three: [
        {
            label: "Украинский",
            value: "other",
        },
        {
            label: "Российский",
            value: "wrong",
        },
    ],

    four: [
        {
            label: "Негативно",
            value: "other",
        },
        {
            label: "Позитивно",
            value: "wrong",
        },
    ],

    five: [
        {
            label: "Нет",
            value: "other",
        },
        {
            label: "Да",
            value: "wrong",
        },
    ],

    six: [
        {
            label: "Да",
            value: "other",
        },
        {
            label: "Нет",
            value: "wrong",
        },
    ],

    seven: [
        {
            label: "Да",
            value: "other",
        },
        {
            label: "Нет",
            value: "wrong",
        },
    ],

    eight: [
        {
            label: "Руссике военные",
            value: "other",
        },
        {
            label: "Украинские военные",
            value: "wrong",
        },
    ],

    nine: [
        {
            label: "Да",
            value: "other",
        },
        {
            label: "Нет",
            value: "wrong",
        },
    ],

    ten: [
        {
            label: "Негативно",
            value: "final",
        },
        {
            label: "Позитивно",
            value: "wrong",
        },
    ],
};

const ruQuestions: QuestionsI = {
    two: "**2. Ты согласен с правилами сервера?**",
    three: "**3. Чей Крым?**",
    four: "**4. Как относишься к путину?**",
    five: "**5. Поддерживаешь независимость `Л/ДНР` ?**",
    six: "**6. Был ли геноцид в Буче, Ирпене, Гостомеле?**",
    seven: "**7. Армия РФ была в Донбассе 8 лет назад?**",
    eight: "**8. Кто устроил геноцид в Буче?**",
    nine: "**9. Спонсировала ли Россия сепаратистов `Л/ДНР`?**",
    ten: "**10. Как ты относишься к войне?**",
    final: "Ты прошёл тест",
};
export { ruQuestions, ruAnswers };
