var studentResponses;
var areMoreStudentResponses; //boolean variable to determine whether there are more temporary responses to be edited
var studentEditsPerformed = 0;

/**
 * 
 * This function makes calls to the API for each subject and collects data from each subject.  
 */
function pullTempStudentData() {
    var paramsStudent = {
        // The ID of the spreadsheet to retrieve data from.
        spreadsheetId: '13Sg6Js9jL3uSQEAUFHgGxw3mJA-jz2nEXtwJKlDb_9I', // TODO: Update placeholder value.

        // The A1 notation of the values to retrieve.
        range: 'Responses', // TODO: Update placeholder value.

        // How values should be represented in the output.
        // The default render option is ValueRenderOption.FORMATTED_VALUE.
        //valueRenderOption: '',  // TODO: Update placeholder value.

        // How dates, times, and durations should be represented in the output.
        // This is ignored if value_render_option is
        // FORMATTED_VALUE.
        // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
        // dateTimeRenderOption: '',  // TODO: Update placeholder value.
    };

    requestStudent = gapi.client.sheets.spreadsheets.values.get(paramsStudent);
    requestStudent.then(function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response);
        areMoreStudentResponses = populateStudentEditorForm(response);

    }, function(reason) {
        console.error('error: ' + reason.result.error.message);
    });

    studentFeedbackComplete = true;

}

function initClient() {
    console.log("initClient");
    var API_KEY = 'AIzaSyDk4a4sXUHRt4HzCUiR3pAqV0er_PR6bgc'; // TODO: Update placeholder with desired API key.

    var CLIENT_ID = '919400316199-68vns4ia05nloajcjtcl0qqqq54qbul2.apps.googleusercontent.com'; // TODO: Update placeholder with desired client ID.

    // TODO: Authorize using one of the following scopes:
    //   'https://www.googleapis.com/auth/drive'
    //   'https://www.googleapis.com/auth/drive.file'
    //   'https://www.googleapis.com/auth/drive.readonly'
    //   'https://www.googleapis.com/auth/spreadsheets'
    //   'https://www.googleapis.com/auth/spreadsheets.readonly'
    var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

    gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': SCOPE,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    }).catch(function(fromReject) {
        console.log(fromReject);
    });
}

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}


function updateSignInStatus(isSignedIn) {
    pullTempStudentData();
}

function determineInputType(question) {
    var beginningOperatorLoc = question.indexOf("<");
    console.log(question);
    console.log(beginningOperatorLoc);
    var endingOperatorLoc;
    if (question.indexOf(",", beginningOperatorLoc) != -1 && question.indexOf(",", beginningOperatorLoc) < question.indexOf(">", beginningOperatorLoc)) {
        endingOperatorLoc = question.indexOf(",", beginningOperatorLoc);
        console.log("first if");
    } else {
        endingOperatorLoc = question.indexOf(">", beginningOperatorLoc);
        console.log("second if");
    }
    console.log(endingOperatorLoc);
    return question.substring(beginningOperatorLoc + 1, endingOperatorLoc);
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

function fillOutStudentEditorForm(questions, studentResponse) {
    console.log("inside fillOutStudentForm");
    console.log(studentResponse);
    var formObject = document.getElementById("questionInputs");
    var formObjectChildren = formObject.childNodes;
    var inputElements = new Array(0);
    console.log("formObjectChildren length: " + formObjectChildren.length);
    for (let i = 0; i < formObjectChildren.length; i++) {
        if (formObjectChildren[i].tagName) {
            if (formObjectChildren[i].tagName.toLowerCase() == "input" || formObjectChildren[i].tagName.toLowerCase() == "textarea") {
                console.log(formObjectChildren.tagName);
                inputElements.push(formObjectChildren[i]);
            }
        }

    }
    console.log("inputElements length: " + inputElements.length);
    for (let i = 0; i < inputElements.length; i++) {
        let responseText = studentResponse[i];
        console.log(responseText);
        inputElements[i].value = responseText;
    }
}

function populateStudentEditorForm(responses) {
    if (responses.result.values) {
        if (responses.result.values.length > 1) {
            let falseCounter = 0;
            if (responses.result.values[studentEditsPerformed + falseCounter + 1][10] == "FALSE") {
                console.log("populating studentEditorForm");
                createQuestionInputs(responses.result.values[0]);
                let displayers = document.getElementsByTagName("p");
                for (let i = 0; i < displayers.length; i++) {
                    if (displayers[i].id.indexOf("displayer") != -1) {
                        let displayerID = displayers[i].id;
                        let otherID = displayers[i].id.substring(0, displayers[i].id.indexOf("displayer"));
                        let otherElement = document.getElementById(otherID);
                        otherElement.addEventListener("change", function() {
                            document.getElementById(displayerID).innerHTML = otherElement.value;
                        });
                    }
                    console.log("1");
                }
                console.log("fillOutStudentEditorForm");
                fillOutStudentEditorForm(responses.result.values[0], responses.result.values[studentEditsPerformed + 1]);
                /*let submitButton = document.createElement("button");
                submitButton.classList.add("")*/
                document.getElementById("replaceText").parentNode.removeChild(document.getElementById("replaceText"));
            } else {
                let messageText = document.createTextNode("There are no responses to be edited");
                let messageH = document.createElement("h4");
                console.log(messageText);
                messageH.appendChild(messageText);
                document.getElementById("studentResponseEditor").appendChild(messageH);
                document.getElementById("replaceText").parentNode.removeChild(document.getElementById("replaceText"));
                return false;
            }
        } else {
            let messageText = document.createTextNode("There are no responses to be edited");
            let messageH = document.createElement("h4");
            console.log(messageText);
            messageH.appendChild(messageText);
            document.getElementById("studentResponseEditor").appendChild(messageH);
            document.getElementById("replaceText").parentNode.removeChild(document.getElementById("replaceText"));
            return false;
        }
    } else {
        let messageText = document.createTextNode("There are no responses to be edited");
        let messageH = document.createElement("h4");
        messageH.appendChild(messageText);
        document.getElementById("studentResponseEditor").appendChild(messageH);
        document.getElementById("replaceText").parentNode.removeChild(document.getElementById("replaceText"));
        return false;
    }

}