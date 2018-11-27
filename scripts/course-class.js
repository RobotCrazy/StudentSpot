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
}