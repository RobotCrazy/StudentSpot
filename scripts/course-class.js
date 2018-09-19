class Course {
    constructor(name, subject, credits, countyDesc, regularCounterPart, advancedCounterPart, advRegDiff,
        teacherFeedback) {
        this.name = name;
        this.subject = subject;
        this.credits = credits;
        this.countyDesc = countyDesc;
        this.regularCounterPart = regularCounterPart;
        this.advancedCounterPart = advancedCounterPart;
        this.advRegDiff = advRegDiff;
        this.teacherFeedback = teacherFeedback;
        this.studentFeedback = new Array(0);
    }
    addStudentFeedback(studentFeedback) {
        this.studentFeedback.push(studentFeedback);
    }
}