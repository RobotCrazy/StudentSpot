/**
 * A class to represent questions each question that is asked in the survey
 */
class feedbackQuestion {
    /**
     * 
     * @param {The string value of what should appear on screen as the question} questionText 
     * @param {The default answer to display on screen if the answer is empty} defaultResponse 
     * @param {The column the question's responses are located in inside the spreadsheet} columnNumber 
     */
    constructor(questionText, columnNumber, defaultResponse) {
        this.questionText = questionText;
        this.defaultResponse = defaultResponse;
        this.columnNumber = columnNumber;
    }
}