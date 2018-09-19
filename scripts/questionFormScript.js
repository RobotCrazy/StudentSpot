function makeApiCall() {
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
                    /*console.log("Course name: " + courseName + "; " + response.result.values[x][1]);
                    console.log("success");*/
                    var newStudentFeedback = buildStudentFeedback(response.result.values[x]);
                    courses[i].addStudentFeedback(newStudentFeedback);
                    //console.log("student is happening");
                    /*console.log(courses[i].studentFeedback);*/
                }
            }

        }
        /*console.log("studentAPICall is being set to true");
        studentFeedbackApiCallComplete = true;*/
        //displayCourses(courses);
    }, function(reason) {
        console.error('error: ' + reason.result.error.message);
    });
    /*while (studentFeedbackApiCallComplete == false) {

    }*/
    console.log("studentFeedbackAPICall() is done");
    studentFeedbackComplete = true;

}

function buildQuestionForm() {
    makeApiCall();
}