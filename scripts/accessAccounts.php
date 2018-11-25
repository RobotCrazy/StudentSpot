<?php
header('Content-Type: application/json');

$aResult = array();

$accs[] = "john";
$accs[] = "upneet";

$passes[] = "password";
$passes[] = "password";


//loop through both comparing to the inputted values in the javascript function on createAccount.html
//if they're equal, then return a true value
//javascript function will access the value, if it is true, then it will proceed to the next page
//if false, alert - incorrect username or password


//Parsing for correct username
// $inputted_username = $_REQUEST["inputted_username"];

// for ( $i = 0; $i < count( $accs ); i++ ) {
//     if ( $inputted_username == $accs[$i] ) {
//         echo "console.log('Testing worked!');";
//     }
//     else {
//         echo "console.log('Not this one!');";
//     }
// }

function logging() {
    echo "<script>console.log('Works here!');</script>";
}
if ( isset($_POST['submit'])) {
    logging();
}
?>