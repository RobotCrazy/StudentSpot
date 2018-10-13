var googleJWT;

function formJWT() {
    /**
     * Form JWT Header:
     */
    var header = { "alg": "RS256", "typ": "JWT" };
    var currentDate = new Date();
    var currentTime = Math.floor(currentDate.getTime() / 1000);
    console.log("currentTime: " + currentTime);
    var expirationTime = currentTime + (55 * 60); //add 55 minutes of time converted to seconds for expiration
    //provides leeway from full one hour maximum
    console.log("expirationTime: " + expirationTime);
    /**
     * Form JWT Claim Set:
     */
    var claimSet = {
        "iss": "courseinformationhub@course-data-test.iam.gserviceaccount.com",
        "scope": "https://www.googleapis.com/auth/spreadsheets",
        "aud": "https://www.googleapis.com/oauth2/v4/token",
        "exp": expirationTime.toString(),
        "iat": currentTime.toString()
    };

    /**
     * Form JWT Signature:
     */
    var signature;
    var encodedHeader = btoa(JSON.stringify(header));
    var encodedClaimSet = btoa(JSON.stringify(claimSet));
    var signature = encodedHeader + "." + encodedClaimSet;
    console.log("signature:");
    console.log(signature);
    var encoded256Signature;
    sha256(signature).then(function(digest) {
        encoded256Signature = digest;
        console.log(encoded256Signature);


        var encodedSignature = btoa(encoded256Signature);
        //var encodedSignature = btoa(JSON.stringify(signature));
        var jwt = encodedHeader + "." + encodedClaimSet + "." + encodedSignature;
        console.log("jwt:");
        console.log(jwt);
        googleJWT = jwt;
        buildRequest();
    });
}

/**
 * Builds the request object
 */
function buildRequest() {
    var requestURL = "https://www.googleapis.com/oauth2/v4/token"; /*HTTP/1.1";*/
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
    $.post(requestURL, "grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=" + googleJWT,
        //original: grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=
        function(result) {
            console.log(result);
        });
    // Find a way to avoid the POST call having this doman's address added to the start of the URL
    /*xhttp.open("POST", requestURL, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=" + googleJWT);*/
}