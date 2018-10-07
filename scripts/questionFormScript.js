function makeApiCall() {
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
            console.log(response);
            for (var x = 0; x < response.result.values.length; x++) {

            }
        },
        function(reason) {
            console.error('error: ' + reason.result.error.message);
            window.refresh();
        });

}

function buildQuestionForm() {
    makeApiCall();
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