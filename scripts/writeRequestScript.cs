using System;
using System.Collections.Generic;
using System.IO;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;

namespace SheetApiTest
{
    public class AppendWithGoogleCredentials
    {
        static string[] Scopes = { SheetsService.Scope.Spreadsheets };
        static string ApplicationName = "Google Sheets API .NET Quickstart";
        
        public void AppendData()
        {
            // downloaded json file with private key
            var credential = GoogleCredential.FromStream(new FileStream("course-data-test-205001-08dbe689466b", FileMode.Open)).CreateScoped(Scopes);
        
            // Create Google Sheets API service.
            var service = new SheetsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = ApplicationName,
            });
        
            var spreadsheetId = "1zFZYlOru4eLeOlXYpcMXvAlu2vdipSusF5U9c9S14_E";
            // data to append - must be a value range:
            var valueRange = new ValueRange { Values = new List<IList<object>> { new List<object>() } };
            
            // add data for each column
            valueRange.Values[0].Add("a");
            valueRange.Values[0].Add("b");
            valueRange.Values[0].Add("c");
            
            // in append request, the range only requires the name of the table
            var rangeToWrite = "Sheet1";
            // append request: into first free line
            var appendRequest = service.Spreadsheets.Values.Append(valueRange, spreadsheetId, rangeToWrite);
            appendRequest.ValueInputOption = SpreadsheetsResource.ValuesResource.AppendRequest.ValueInputOptionEnum.USERENTERED;
            var appendReponse = appendRequest.Execute();
            
        }
        AppedData();
    }
}

