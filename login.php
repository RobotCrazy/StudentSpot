<!DOCTYPE html>
<html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="css/loginStyle.css" rel="stylesheet" />

  <script>
    function login(username, password) {
      console.log(username + " " + password);
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", "./scripts/accessAccounts.php?inputted_username=" + username, true);
      document.getElementById("testphp").innerHTML = this.responseText;
      xmlhttp.send();
    }
  </script>

  <!-- <script id="testphp">
  </script> -->
</head>

<body>

  <h1 id="testphp"><?php echo 'testing php'; ?></h1>
  <h2>Login</h2>

  <form>

    <div class="container">
      <label for="email"><b>Username</b></label>
      <input type="text" id="user" placeholder="Enter Username" name="username" required>

      <label for="psw"><b>Password</b></label>
      <input type="password" id="pass" placeholder="Enter Password" name="psw" required>

      <button type="button" onclick="login(user.value, pass.value)">Login</button> </div>
    <div class="container" style="background-color:#f1f1f1">
      <a href="index.html" <button type="button" class="cancelbtn">Cancel</button></a>
      <span class="psw"><a href="createAccount.html">Create Account</a></span>
    </div>
  </form>

</body>

</html>