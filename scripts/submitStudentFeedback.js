function renderFeedbackForm() {
    createQuestionInputs();
}

/**
 * Adds any neccessary attributes needed for the given inputDevice type and 
 * returns any extra HTML elements that are needed
 * @param {reference to inputDevice object} inputDevice 
 * @param {question text in string with code} question 
 */
function setUpRequiredAttributes(inputDevice, question) {
    var beginningOperatorLoc = question.indexOf(",", question.indexOf("<"));
    var endingOperatorLoc = question.indexOf(">");
    var inputType = determineInputType(question);
    //if there is a comma and the comma comes before code closing (">")
    if (question.indexOf(",", beginningOperatorLoc) != -1 && question.indexOf(",", beginningOperatorLoc) < question.indexOf(">", beginningOperatorLoc)) {
        if (inputType == "range") {
            //fill out needed attributes for input[type="range"]
            let comma1Loc = question.indexOf(",", beginningOperatorLoc);
            let comma2Loc = question.indexOf(",", comma1Loc + 1);
            inputDevice.min = question.substring(comma1Loc + 1, comma2Loc);

            let comma3Loc = question.indexOf(",", comma2Loc + 1);
            inputDevice.max = question.substring(comma2Loc + 1, comma3Loc);

            inputDevice.step = question.substring(comma3Loc + 1, endingOperatorLoc);

            let rangeDisplayer = document.createElement("p");
            rangeDisplayer.id = inputDevice.id + "displayer";
            console.log(inputDevice.id);
            rangeDisplayer.innerHTML = inputDevice.value;
            return rangeDisplayer;
        }
        //fill in rest of input types here
    }


}

function createQuestionInputs(questions) {
    var formObject = document.getElementById("studentResponseEditor");
    var questionInputs = document.createElement("div");
    questionInputs.className = "questionInputs";
    questionInputs.id = "questionInputs";
    for (let i = 0; i < questions.length - 1; i++) {
        let inputID = questions[i].substring(0, questions[i].indexOf("<"));

        let inputLabelText = document.createTextNode(questions[i].substring(0, questions[i].indexOf("<")));
        let inputLabel = document.createElement("label");
        inputLabel.appendChild(inputLabelText);
        inputLabel.for = inputID;
        let inputDevice;
        if (determineInputType(questions[i]) == "textarea") {
            inputDevice = document.createElement("textarea");
            inputDevice.rows = "5";
            inputDevice.cols = "50";
        } else {
            inputDevice = document.createElement("input");
            inputDevice.type = determineInputType(questions[i]);
            inputDevice.id = inputID;
            inputDevice.name = inputID;
            inputDevice.placeholder = "Text";
        }
        let extraElements = setUpRequiredAttributes(inputDevice, questions[i]);

        questionInputs.appendChild(inputLabel);
        questionInputs.appendChild(document.createElement("br"));
        questionInputs.appendChild(inputDevice);
        if (extraElements) {
            questionInputs.appendChild(extraElements);
        }
        questionInputs.appendChild(document.createElement("br"));
        questionInputs.appendChild(document.createElement("br"));
        formObject.appendChild(questionInputs);

    }
}