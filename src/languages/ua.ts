import type { AnswersI, QuestionsI } from "./language";

const uaAnswers: AnswersI = {
    two: [
        {
            label: "Так",
            value: "ukrainian",
        },
        {
            label: "Ні",
            value: "wrong",
        },
    ],

    three: [
        {
            label: "Український",
            value: "ukrainian",
        },
        {
            label: "Російський",
            value: "wrong",
        },
    ],

    four: [
        {
            label: "Позитивно",
            value: "wrong",
        },
        {
            label: "Негативно",
            value: "ukrainian",
        },
    ],

    five: [
        {
            label: "Так",
            value: "wrong",
        },
        {
            label: "Ні",
            value: "ukrainian",
        },
    ],

    six: [
        {
            label: "Так",
            value: "ukrainian",
        },
        {
            label: "Ні",
            value: "wrong",
        },
    ],

    seven: [
        {
            label: "Так",
            value: "ukrainian",
        },
        {
            label: "Ні",
            value: "wrong",
        },
    ],

    eight: [
        {
            label: "Російські військові",
            value: "ukrainian",
        },
        {
            label: "Українські військові",
            value: "wrong",
        },
    ],

    nine: [
        {
            label: "Так",
            value: "ukrainian",
        },
        {
            label: "Ні",
            value: "wrong",
        },
    ],

    ten: [
        {
            label: "Негативно",
            value: "ukrainian",
        },
        {
            label: "Позитивно",
            value: "wrong",
        },
    ],
};

const uaQuestions: QuestionsI = {
    two: "**2. Ти згідний з правилами серверу?**",
    three: "**3. Чий Крим?**",
    four: "**4. Як відносишся до путіна?**",
    five: "**5. Підтримуєш незалежність `Л/ДНР` ?**",
    six: "**6. Чи був геноцид в Бучі, Ірпені, Гостомелі?**",
    seven: "**7. Армія РФ була в Донбасі 8 років тому?**",
    eight: "**8. Хто влаштував геноцид в Бучі?**",
    nine: "**9. Чи спонсорувала Росія сепаратистів `Л/ДНР` ?**",
    ten: "**10. Як ти відносишся до війни?**",
    final: "Ти пройшов тест!",
};

export { uaQuestions, uaAnswers };
