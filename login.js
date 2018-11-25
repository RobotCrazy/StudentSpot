function login(username, password) {
    var xhttp = new XMLHttpRequest();
    var validUser = false;
    var valid = false;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var users = this.responseText;
            var userArray = users.split("\n");
            for (var i = 0; i < userArray.length; i++) {
                if (username == userArray[i]) {
                    validUser = true;
                }
            }
            console.log(validUser);
        }
    };
    xhttp.open("GET", "accounts/adminUsers.txt", true);
    xhttp.send();
}