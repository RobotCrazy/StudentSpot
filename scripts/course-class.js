/**
 * The Course class is used to store all necessary info about the courses
 */
class Course {
    constructor(name, subject, credits, countyDesc, questionAnswerList) {
        this.name = name;
        this.subject = subject;
        this.credits = credits;
        this.countyDesc = countyDesc;
        this.questionAnswerList = questionAnswerList;
        this.studentFeedback = new Array(0);
    }
    addStudentFeedback(studentFeedback) {
        this.studentFeedback.push(studentFeedback);
    }
    addQuestionInputTypes(questionInputTypes) {
        this.questionInputTypes = questionInputTypes;
    }
    getQuestions() {
        var questions = new Array(0);
        console.log("getting questions");
        console.log(this.questionAnswerList.length);
        for (let i = 0; i < this.questionAnswerList.length; i += 2) {
            console.log(this.questionAnswerList[i]);
            questions.push(this.questionAnswerList[i]);
        }
        console.log("done getting questions");
        return questions;
    }

}