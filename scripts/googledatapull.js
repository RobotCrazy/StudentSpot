var requestTeacher;
var requestStudent;
var courses = new Array(0);
var pullCounter = 0; //used to track how many api requests have been made so far
var englishQuestions = new Array(0);
var mathQuestions = new Array(0);
var iTQuestions = new Array(0);
var socialStudiesQuestions = new Array(0);
var scienceQuestions = new Array(0);


function makeQuestionColumns(questions) {
    let finalQuestions = new Array(0);
    let i = 0;

    while (questions[i] != "Other Notes:" && i < questions.length) {
        console.log(i);
        console.log(questions[i]);
        finalQuestions.push(questions[i]);
        i++;
    }
    finalQuestions.push(questions[i]);
    return finalQuestions;
}

function makeQuestions(subject, questions) {
    //var questions = new Array(0);
    //for(let i = 0; i < questionArray.length; i++)
    switch (subject) {
        case "English":
            englishQuestions = makeQuestionColumns(questions);
            break;
        case "Math":
            mathQuestions = makeQuestionColumns(questions);
            break;
        case "IT":
            iTQuestions = makeQuestionColumns(questions);
            break;
        case "Social Studies":
            socialStudiesQuestions = makeQuestionColumns(questions);
            break;
        case "Science":
            scienceQuestions = makeQuestionColumns(questions);
            break;
    }
}

function getQuestions(subject) {

    if (subject == "English") {
        return englishQuestions;
    } else if (subject == "Social Studies") {
        return socialStudiesQuestions;
    } else if (subject == "Math") {
        return mathQuestions;
    } else if (subject == "IT") {
        return iTQuestions;
    } else if (subject == "Science") {
        return scienceQuestions;
    }

}

/** The chain of API calls and processing starts here.   */
function makeApiCall(subject) {
    console.log("makeApiCall() has been called - " + subject);
    var paramsTeacher = {
        // The ID of the spreadsheet to retrieve data from.
        spreadsheetId: '1mR14biVpCiCIT8itSlv1wKso7me-hYnW5sEa6a9iFzE', // TODO: Update placeholder value.

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
        console.log("Response Raw Result:");
        console.log(response.result.values[0]);
        console.log(subject);
        makeQuestions(subject, response.result.values[0]);
        createTeacherCourseArray(response.result, subject); //This sends the object to process response.result into 
        //an array
        pullCounter++;
        if (pullCounter == 4) {
            document.getElementById("replaceText").parentNode.removeChild(document.getElementById("replaceText"));
            displayCourses(courses);
            //studentFeedbackApiCall();
        }
        console.log(pullCounter);
    }, function(reason) {
        console.error('error: ' + reason.result.error.message);
    });

    //next attempt:
    //Use two functions.  One builds teacher array.  Then student api data is pulled, and function is called.  
    //The function builds the student part of the array and adds it to the course object in the array
    //displayCourses() is then called


    //Student request:


}

function studentFeedbackApiCall() {
    var studentFeedbackApiCallComplete = false;
    console.log("studentFeedbackAPICall() has been called");
    var paramsStudent = {
        // The ID of the spreadsheet to retrieve data from.
        spreadsheetId: '1vvAMq9n8vQAa6Q8S51x3J5Bqmg1OVFX6LFNjECdNZ-E', // TODO: Update placeholder value.

        // The A1 notation of the values to retrieve.
        range: 'Student Responses', // TODO: Update placeholder value.

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
        //console.log("Student Data has been succesfully pulled");
        for (var i = 0; i < courses.length; i++) {
            var courseName = courses[i].name;
            for (var x = 0; x < response.result.values.length; x++) {
                if (courseName == response.result.values[x][1]) {
                    //console.log("Course name: " + courseName + "; " + response.result.values[x][1]);
                    var newStudentFeedback = buildStudentFeedback(response.result.values[x]);
                    courses[i].addStudentFeedback(newStudentFeedback);
                    //console.log("student is happening");
                    //console.log(courses[i].studentFeedback);
                }
            }

        }
        console.log("pullCounter: " + pullCounter);
        document.getElementById("replaceText").parentNode.removeChild(document.getElementById("replaceText"));
        displayCourses(courses);
        /*console.log("studentAPICall is being set to true");
        studentFeedbackApiCallComplete = true;*/
    }, function(reason) {
        console.error('error: ' + reason.result.error.message);
    });
    /*while (studentFeedbackApiCallComplete == false) {

    }*/
    console.log("studentFeedbackAPICall() is done");
    studentFeedbackComplete = true;

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
    makeApiCall("Math");
    makeApiCall("Science");
    makeApiCall("Social Studies");
    //makeApiCall("IT/CTE");
}

function checkResponseValidity(response) {
    if (response.trim() == "") {
        return null;
    } else return response;
}

function copyArray(copyArr) {
    var newArray = new Array(copyArr.length);
    for (var i = 0; i < copyArr.length; i++) {
        newArray[i] = copyArr[i];
    }
    return newArray;
}

function createTeacherCourseArray(result, subject) { //it comes here second, after making the API call. 
    console.log("createTeacherCourseArray() has been called");
    /**
     * Go through array of pulled data and create new courseList array
     */
    questions = getQuestions(subject);
    var exceptionColumns = ["Prerequisites:", "Other Notes:"];
    console.log(questions);
    for (var r = 1; r < result.values.length; r++) {
        var courseName = result.values[r][0];
        var answers = new Array(0);
        var nextColumn = 0;
        console.log("Printing the result");
        console.log(result.values[r]);
        for (var c = 0; c < result.values[r].length; c++) {
            if (result.values[r][c] != undefined && result.values[r][c].trim() != "") {
                answers.push(result.values[r][c]);
                console.log("Thing");
                console.log(result.values[r][c]);
            } else if (exceptionColumns.indexOf(result.values[0][c]) >= 0) {
                answers.push("");
            } else {
                answers.push("Information unavailable");
                console.log("Unavailable");
            }
            if (result.values[0][c + 1] == "Other Notes") {
                answers.push(result.values[r][c + 1]);
                nextColumn = (c + 2);
                break;
            }
        }
        console.log(answers);
        console.log("Next Column:" + nextColumn);
        /*var name = result.values[r][0];
        var subject = subject;
        var countyDesc = result.values[r][1];
        var credits = result.values[r][2];
        var teacherWorkTime = result.values[r][3];
        var regularCounterPart = result.values[r][4];
        var advancedCounterPart = result.values[r][5];
        var advRegDiff = result.values[r][6];
        var teacherUsefulSkills = result.values[r][7];
        var teacherLearn = result.values[r][8];
        var teacherBenefits = result.values[r][9];
        var teacherRequiredPrereqs = result.values[r][10];
        var teacherRecommendedPrereqs = result.values[r][11];*/
        var newCourse = new Course(courseName, subject, questions, answers);
        courses.push(newCourse);
    }
    //This sends it to studentFeedbackAPICall()
    /* console.log("This is about to call the displayCourses function.");
     console.log(courses[0].studentFeedback);*/
    /* while (studentFeedbackComplete == false) {
         //wait for studentFeedback to complete before displaying courses
     }*/


}

function buildStudentFeedback(courseInfo) {
    var workTime = courseInfo[2];
    var surviveClass = courseInfo[3];
    var learn = courseInfo[4];
    var challenge = courseInfo[5];
    var expectationDiff = courseInfo[6];
    return new StudentFeedback(workTime, surviveClass, learn, challenge, expectationDiff);
}

/*function writeToSheet(write) {
    var params = {
        // The ID of the spreadsheet to update.
        spreadsheetId: '1zFZYlOru4eLeOlXYpcMXvAlu2vdipSusF5U9c9S14_E', // TODO: Update placeholder value.

        // The A1 notation of the values to update.
        range: "'Sheet1'!A1", // TODO: Update placeholder value.

        // How the input data should be interpreted.
        valueInputOption: 'RAW', // TODO: Update placeholder value.
    };

    var valueRangeBody = {
        // TODO: Add desired properties to the request body. All existing properties
        // will be replaced.
        "values": write
    };

    var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
    request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
    }, function(reason) {
        console.error('error: ' + reason.result.error.message);
    });



    //reading code:
    /*var params = {
        // The ID of the spreadsheet to retrieve data from.
        spreadsheetId: '1zFZYlOru4eLeOlXYpcMXvAlu2vdipSusF5U9c9S14_E', // TODO: Update placeholder value.

        // The A1 notation of the values to retrieve.
        range: 'Sheet1', // TODO: Update placeholder value.

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
    var request = gapi.client.sheets.spreadsheets.values.get(params);
    request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        for (var r = 0; r < response.result.values.length; r++) {
            for (var c = 0; c < response.result.values[r].length; c++) {
                document.body.innerHTML += response.result.values[r][c];
            }
        }

    }, function(reason) {
        console.error('error: ' + reason.result.error.message);
    });*/
//}

function writeToSheetV2(write) {
    var lock = LockService.getDocumentLock();
    lock.waitLock(30000); // hold off up to 30 sec to avoid concurrent writing

    // select the 'responses' sheet by default
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = e.parameters.formGoogleSheetName || "responses";
    var sheet = doc.getSheetByName(sheetName);
}