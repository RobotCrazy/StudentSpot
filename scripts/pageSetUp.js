function buildHeader() {
    var header = document.createElement("header");

    //title
    var title = document.createElement("h2");
    var titleText = document.createTextNode("Course Information Hub");
    title.appendChild(titleText);
    header.appendChild(title);

    //login button
    var loginAnchor = document.createElement("a");
    loginAnchor.href = "login.html"
    var loginButton = document.createElement("button");
    loginAnchor.appendChild(loginButton);
    loginButton.appendChild(document.createTextNode("Login"));
    loginButton.id = "login";
    loginButton.type = "button";
    header.appendChild(loginAnchor);

    var text1 = document.createElement("p");
    var text1Text = document.createTextNode("Thinking about classes? Need help with planning? You're in the right place!");

    header.appendChild(text1Text);
    return header;
}