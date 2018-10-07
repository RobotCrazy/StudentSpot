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