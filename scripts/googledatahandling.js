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
    var rawSignature = encodedHeader + "." + encodedClaimSet;

    var key = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCbKdFRwUmKqq2j
S9WTBoWhMfBz7JFLsNevxaHl8sdHvndL3YmE28sgXoLCzBuRwc59Oj951irc3Cr5
HyIFYwKYX3Jft9f2VtaL4jbO/87D4dzoK7IQm5dq/beyz3yOKKDzTSq5tlDSSaHX
8+b9g6UeVuUmI5z+MPcyvmbTsAMtRB//65oFpxL9gQu8pH6TGXJ0agMOCp49k7jd
Xs3H8B22bogG70rcQHlFTRCThVRISFAXueKjus0li0oVY4sfsYX+MIQynZo6zFVy
rajECtcrt/EqLrAOKoHrnSy9+qQ+FSNHCXOVym1hJCJwVHNyZSDv9rxrmIvTV1Fy
ZSMsep6tAgMBAAECggEAAYBynH10uXX0b0YR7GkRDKHZZ23TOPqefWUgYrbdhrK8
hqXywxZTgKrMtJdZu8JQV5yJz7z3nKKe4dr5lWuQM13wUyY9RChlmpeXNM97nO0h
mh4OJgrNEnjsX1UsKfFEhlMckwz4lEh1KHKdk9Ep3UGb2MLzrbwjyfOkA1ZK3/qR
P2nWCKyGaE3xOm2vwaFl56XzsKZ7s63OmSYYsIrWBVlA9xw9KLZpRZY8Ajv1UDdW
tqEQyI/5hlTB3YbYsS6IZH91z7Flf2LUrRYxvvkyncteVT9V1+PmT18ga1jiYsfC
dzEOLxcXC5nmymLyCpPvacpvC/C5rIT1pbVHuJmvwQKBgQDXEmCe+kxb0uArXjHd
Es39bMGBqA0FV2MdQqUTtZH5CQndGSjXENVuGVgN0obQioG/CwElDR0TG87FLgx9
OUFUHPN9CXkiLgpQeCg0LuzTLeX6AnCMBc0cJ190DwSzQGrhU16TybpK4gNwUf63
wqheO9G3xCU+Vxkk3+VsAOqP4QKBgQC4sOOhmpD3U34SyilDdO6JEeL4ieGGwLE+
G/+8J6B3/EQNN/RFze6z1aqCTWsFoNt1+0EmgvpbWjhskshBRC7nUtQ19MsJRStA
dh0nREzL2stV31nFQiRo7RxEYMhxY3k+Iyl93d8+wHNlR2gBN2UaeZq7SoOP0Xfx
IsXZM3hYTQKBgEYnD28r07Zr7YUX34nt9VUBoYjqSP0CCSllMLViF3A0+4usBj9I
lWWpTKiNkD37v+CR9Vihk2dFPcfhgl9iSqXmH6Icce+tNt4So4KJ/+POZ+KJ4y45
QjM5wI/5yh2yGGrRJ9trBKIiYN7FUCGelA7Q0lJv33obLO9zPMFi9x/hAoGAW/6g
I+rdspRABBP2occo2dWy/KGRWJG6t3ky1QHYCGv7aaopXmvJLoKLQARX/qG1LvtL
5GbxVXeHC23BmeDgjBDR615Xk/KELMOomdqHdjMxfUCXco4TnMAeiGC89t3Zkn3p
OOy/On6Z/CSpRZHWJm3UCN6A0a5A1DfB3QKqOzECgYEAz2WRWwPxzI/OzNIcyRDs
fm20yCurLOS7RI2iemwCz3/sfqlX2MrqWNqQpG75w41cVHVtzfzhZk37p3lAxTxr
rziztfIcapYVlAXdpNTUmdnkrgKOFHjflkuwF1n2nXWqsJNTuX3EzOpS4fre0cmK
80trQfp9ubUZK/f7q+eoTRE=
-----END PRIVATE KEY-----`;
    var encoded256Signature = btoa(CryptoJS.HmacSHA256(rawSignature, key));
    console.log("signature:");
    console.log(encoded256Signature);

    googleJWT = encodedHeader + "." + encodedClaimSet + "." + encoded256Signature;
    console.log(googleJWT);
    buildRequest();
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
    /*xhttp.open("POST", requestURL, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=" + googleJWT);*/
}