/**
 * The Course class is used to store all necessary info about the courses
 */
class Course {
    constructor(name, subject, questions, answers) {
        this.name = name;
        this.subject = subject;
        this.questions = questions;
        this.answers = answers;
        this.studentFeedback = new Array(0);
    }
    addStudentFeedback(studentFeedback) {
        this.studentFeedback.push(studentFeedback);
    }
    addQuestionInputTypes(questionInputTypes) {
        this.questionInputTypes = questionInputTypes;
    }
    getQuestions() {
        return this.questions;
    }

}