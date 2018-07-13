function search() {
    var userSearch = document.getElementById("courseSearch").value.trim();
    var courses = document.getElementsByClassName("course");
    for (var i = 0; i < courses.length; i++) {
        //document.body.innerHTML += courses[i].getElementsByClassName("courseName")[0].innerHTML;
        if (courses[i].getElementsByClassName("courseName")[0].innerHTML.toUpperCase().indexOf(userSearch.toUpperCase()) == -1) {
            courses[i].style.display = "none";
        } else {
            courses[i].style.display = "";
        }
    }
}
