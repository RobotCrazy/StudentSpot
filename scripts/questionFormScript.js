var requestTeacher;
var courses = new Array(0);

/** The chain of API calls and processing starts here.   */
function makeApiCall(subject) {
    console.log("makeApiCall() has been called");
    var paramsTeacher = {
        // The ID of the spreadsheet to retrieve data from.
        spreadsheetId: '1NbW7gqNM16eUSU43DXGj7xdi_Po5Gb-m8EQqSSRE4Bw', // TODO: Update placeholder value.

        // The A1 notation of the values to retrieve.
        range: subject, // TODO: Update placeholder value.

        // How values should be represented in the output.
        // The default render option is ValueRenderOption.FORMATTED_VALUE.
        //valueRenderOption: '',  // TODO: Update placeholder value.

        // How dates, times, and durations should be represented in the output.
        // This is ignored if value_render_option is
        // FORMATTED_VALUE.
        // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
        // dateTimeRenderOption: '',  // TODO: Update placeholder value.
    };

    //Teacher request:
    requestTeacher = gapi.client.sheets.spreadsheets.values.get(paramsTeacher);
    requestTeacher.then(function(response) {
        // TODO: Change code below to process the `response` object:
        createTeacherCourseArray(response.result, subject); //This sends the object to process response.result into 
        //an array
    }, function(reason) {
        console.error('error: ' + reason.result.error.message);
    });

    //next attempt:
    //Use two functions.  One builds teacher array.  Then student api data is pulled, and function is called.  
    //The function builds the student part of the array and adds it to the course object in the array
    //displayCourses() is then called


    //Student request:


}

function createTeacherCourseArray(result, subject) { //it comes here second, after making the API call. 
    console.log("createTeacherCourseArray() has been called");

    /* Go through array of pulled data and create new courseList array  */
    for (var r = 1; r < result.values.length; r++) {
        let courseName = result.values[r][0];
        let questionAnswerSets = new Array(0);
        let questionInputTypes = new Array(0);
        let countyDesc = result.values[r][1];
        let credits = result.values[r][2];
        let isAdvanced = result.values[r][3];
        for (let c = 4; c < result.values[r].length; c++) {
            questionAnswerSets.push(result.values[r][c]);
            if (result.values[0][c].toLowerCase().indexOf("question") != -1) {
                let startPos = result.values[0][c].toLowerCase().indexOf("question");
                questionInputTypes.push(result.values[0][c].substring(startPos));
            }

        }
        var newCourse = new Course(courseName, subject, credits, countyDesc, questionInputTypes, questionAnswerSets);
        courses.push(newCourse);
    }
}

function initClient() {
    console.log("initClient happened");
    var API_KEY = 'AIzaSyAkmxR79hMxP2FWNe5e3oMHBYI8Jk8gbWE'; // TODO: Update placeholder with desired API key.

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
    }).catch(function(fromResolve) {
        console.log(fromResolve);
    });
}

function handleClientLoad() {
    console.log("handleClientLoad");
    gapi.load('client:auth2', initClient);
}

/**
 * 
 * This function makes calls to the API for each subject and collects data from each subject.  
 */
function updateSignInStatus(isSignedIn) {
    makeApiCall("English");
    makeApiCall("Social Studies");
    makeApiCall("Math");
    makeApiCall("Science");
    makeApiCall("IT/CTE");

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


function createQuestionInputs(inputTypes, questions) {
    var formObject = document.getElementById("feedbackForm");
    var questionInputs = document.createElement("div");
    questionInputs.className = "questionInputs";
    questionInputs.id = "questionInputs";
    for (let i = 0; i < questions.length - 1; i++) {
        let inputID = questions[i];
        let inputLabelText = document.createTextNode(questions[i]);
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

function getCourse(courseName) {
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].name.toLowerCase().trim() == courseName.trim()) {
            return courses[i];
        }
    }
    return null;
}

function createQuestionInputs(questions) {
    console.log(questions);
    var formObject = document.createElement("form");
    var questionInputs = document.createElement("div");
    questionInputs.className = "questionInputs";
    questionInputs.id = "questionInputs";
    for (let i = 0; i < questions.length - 1; i++) {
        console.log(questions[i]);
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
        return formObject;
    }
}

function determineInputType(code) {
    console.log(code);
    var endingOperatorLoc = code.indexOf(",");
    return code.substring(1, endingOperatorLoc);
}