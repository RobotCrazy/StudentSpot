class Course {
    constructor(name, subject, credits, countyDesc, questionInputTypes, questionAnswerList) {
        this.name = name;
        this.subject = subject;
        this.credits = credits;
        this.countyDesc = countyDesc;
        this.questionAnswerList = questionAnswerList;
        this.questionInputTypes = questionInputTypes;
        this.studentFeedback = new Array(0);
    }
    addStudentFeedback(studentFeedback) {
        this.studentFeedback.push(studentFeedback);
    }
    getQuestions() {
        var questions = new Array(0);
        console.log("getting questions");
        for (let i = 0; i < this.questionAnswerList.length; i += 2) {
            console.log(this.questionAnswerList[i]);
            questions.push(this.questionAnswerList[i]);
        }
        console.log("done getting questions");
        return questions;
    }

}