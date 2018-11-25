<?php

$accs[] = "john";
$accs[] = "upneet";

$passes[] = "password";
$passes[] = "password";


//loop through both comparing to the inputted values in the javascript function on createAccount.html
//if they're equal, then return a true value
//javascript function will access the value, if it is true, then it will proceed to the next page
//if false, alert - incorrect username or password


//Parsing for correct username
$inputted_username = $_REQUEST["inputtedUsername"];
for ( $i = 0; $i < count( $accs ); i++ ) {
    if ( $inputted_username == $accs[$i] ) {
        echo "<script>console.log('Testing worked!');</script>";
    }
    else {
        echo "<script>console.log('Not this one!');</script>";
    }
}
echo "<h1>just a test</h1>";


?>