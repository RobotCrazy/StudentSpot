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
    getQuestions() {
        var questions = new Array(this.questionAnswerList.length / 2);
        for (let i = 1; i < this.questionAnswerList.length; i += 2) {
            console.log(this.questionAnswerList[i]);
            questions.push(this.questionAnswerList[i]);
        }
        return questions;
    }

}