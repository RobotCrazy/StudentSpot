var englishQuestions = [
    "How many hours should students expect to spend each week for this class?",
    "What are some books commonly read in this course?",
    "What genres of books do students read in this course? Non-fiction or fiction? British literature? American Literature?",
    "What content is taught in this class? For example, an english course may have emphasis on grammer rules such as comma usage.",
    "How will taking this course benefit a student in the future? Please include possible career benefits and useful skills students will obtain from this course.",
    "How does the class run on a daily basis? Does class time consist of mostly reading, writing, lecture, etc?",
    "What kind of homework do students recieve daily, if any? Is it mostly writing, reading, watching videos, etc?"
];
var englishQuestionInputTypes = [
    new InputType("radio", {
        name: "HoursPerWeek",
        options: [
            " < 30 mins",
            "1-2 hours",
            "3-4 hours",
            "4+ hours"
        ]
    }),
    new InputType("text", {
        class: "teacherFeedback_textInput",
        name: "CommonBooks",
        width: "30"
    }),
    new InputType("text", {
        class: "teacherFeedback_textInput",
        name: "BookGenre",
        width: "30"
    }),
    new InputType("textarea", {
        class: "teacherFeedback_textAreas",
        name: "ClassContent",
        rows: "5",
        cols: "40"
    }),
    new InputType("textarea", {
        class: "teacherFeedback_textAreas",
        name: "TeacherFeedback",
        rows: "5",
        cols: "40"
    }),
    new InputType("textarea", {
        class: "teacherFeedback_textAreas",
        name: "DailyClass",
        rows: "5",
        cols: "40"
    }),
    new InputType("textarea", {
        class: "teacherFeedback_textAreas",
        name: "DailyHomework",
        rows: "5",
        cols: "40"
    })
];