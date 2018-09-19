load("nashorn:mozilla_compat.js");
importClass("DataWrite");
var englishQuestions = new Array(0);

function determineFeedbackProcess() {
    var subject = document.getElementById(subject);
    switch (subject) {
        case "English":
            processEnglishStudentFeedback();
            break;
    }
    //add remaining subjects
}

function processEnglishStudentFeedback() {

}

function writeToDocument(text, file) {
    var Java = new Packages.JavaClass;
    var writer = Java.type("DataWrite");
    writer.characterWrite(text, "C:\\Users\\SinghM\\eclipse-workspace\\CourseInformationHub\\bin\\TestWrite.txt");
}