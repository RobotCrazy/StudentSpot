//var studentFeedbackComplete = false;
const courseList = [{
    name: 'Advanced Computer Math',
    subject: 'Math',
    credits: ['IT', 'Math'],
    countyDesc: 'Advanced Computer Mathematics has a focus to provide the student with a conceptual background in computer science. Topics include computer architecture, data representation, operating systems, computing systems in society, and software development. Students will implement the major stages of software development using a high level language. Topics will include loops, selections, and arrays. This advanced course covers all topics in the regular Computer Mathematics class as well as others. In some schools this course is the first year of a three-year curriculum in Computer Science.',
    regularCounterPart: 'Computer Math',
    advancedCounterPart: 'null', //leave as null if not present
    advRegDiff: 'Something',
    teacher: {
        workTime: 'Students should expect to spend 30 minutes each week for this class.',
        prerequisites: {
            required: 'Algebra 1; Currently enrolled in Geometry or higher',
            recommended: 'None',
        },
        usefulSkills: 'As an advanced course a student should never fall behind. Every topic for the entire year is used for the rest of the year - getting behind in any topic means the student cannot succeed for the rest of the year. Quizzes make up the bulk of the grade, however the majority of time in class will be based on smaller tasks or projects, all which are used to have students repeatedly make mistakes and learn until things make sense. If a student decides to rely too heavily on other individuals to get through the smaller tasks or projects, they will not be able to succeed on the quizzes. This is one of the most entertaining courses that exists, but you cannot fall into the trap that just because it is entertaining that it is easy.',
        learn: 'This is an introductory course on how to write code to program software. We work in Java as the primary language to learn most of the basics of how programs are written. The course should be called PreAP Computer Science, as it leads directly into the AP year, covering approximately 75% of the material on the AP exam, but not quite at the depth of the AP level. Students will learn how to: work with graphics, make objects move around, be controlled by keyboard and mouse, interact with other objects, build subroutines, control when and where code gets triggered, learn the basics of looping, nested looping, arrays, strings, number systems, how colors work in software, and various other topics.',
        benefits: 'Aside from becoming a software programmer as a potential career path, even if a student decides to not go further into computer science they will have gained vital knowledge of how to better use a computer and problem solving skills that can be applied to any field.'

    },
    student: {
        workTime: 'Under 30 minutes',
        surviveClass: 'Make sure that you understand the concepts presented in notes and learn how to type.',
        learn: 'I have learned how to use Scratch and am currently learning how to use the coding language Java through Greenfoot.',
        challenge: 'My problem solving, logic, math, and typing skills have been challenged in this course.',
        expectationDiff: 'This class is not different from what I was expecting.'
    }
}];

var englishQuestions = new Array();
englishQuestions.push(new feedbackQuestion("Expected time needed per week: "));
englishQuestions.push(new feedbackQuestion("These skills are useful for students to have:"));


function buildCourseButton(name, subject) {
    //var container = document.createElement("div");

    var courseButton = document.createElement("div");
    var namePar = document.createElement("strong");
    var subjectPar = document.createElement("strong");
    namePar.classList.add("courseName");
    subjectPar.className = "rightAlign";

    var bName = document.createTextNode(name);
    var bSubject = document.createTextNode(subject);

    namePar.appendChild(bName);
    subjectPar.appendChild(bSubject);

    courseButton.appendChild(namePar);
    courseButton.appendChild(subjectPar);
    courseButton.className = "courseButton";
    courseButton.addEventListener("click", toggleCourseDisplay);
    //container.appendChild(courseButton);

    return courseButton;
}

function buildTeacherDesc(teacher) {
    //var container = document.createElement("div");
    var teacherDesc = document.createElement("div");
    var workTimePar = document.createElement("p");
    var workTime = document.createTextNode(teacher.workTime);
    workTimePar.appendChild(workTime);

    var recomPrereqPar = document.createElement("p"); //recommended prerequisites
    var recomPrereq = document.createTextNode(teacher.recomPrereq);
    recomPrereqPar.appendChild(recomPrereq);

    var reqPrereqPar = document.createElement("p"); //required prerequisites
    var reqPrereq = document.createTextNode(teacher.requiredPrereq);
    reqPrereqPar.appendChild(reqPrereq);

    var skillsPar = document.createElement("p"); //useful skills
    var skills = document.createTextNode(teacher.usefulSkills);
    skillsPar.appendChild(skills);

    var learnPar = document.createElement("p"); //what students will learn from this class
    var learn = document.createTextNode(teacher.learn);
    learnPar.appendChild(learn);

    var benefitsPar = document.createElement("p"); //benefits of taking the class
    var benefits = document.createTextNode(teacher.benefits);
    benefitsPar.appendChild(benefits);

    addElement(teacherDesc, "h2", "Teacher Feedback");
    addElement(teacherDesc, "h3", "Work Time:");
    teacherDesc.appendChild(workTimePar);
    addElement(teacherDesc, "h3", "Prerequisites:");
    teacherDesc.appendChild(recomPrereqPar);
    teacherDesc.appendChild(reqPrereqPar);
    addElement(teacherDesc, "h3", "Useful Skills and Advice:");
    teacherDesc.appendChild(skillsPar);
    addElement(teacherDesc, "h3", "What will I Learn?")
    teacherDesc.appendChild(learnPar);
    addElement(teacherDesc, "h3", "How will this course benefit me?");
    teacherDesc.appendChild(benefitsPar);
    teacherDesc.className = "teacherDesc";

    //container.appendChild(teacherDesc);

    return teacherDesc;

}

function buildStudentDesc(student) {
    //var container = document.createElement("div");
    var studentDesc = document.createElement("div");
    var workTimePar = document.createElement("p");
    var workTime = document.createTextNode(student.workTime);
    workTimePar.appendChild(workTime);

    var surviveClassPar = document.createElement("p");
    var surviveClass = document.createTextNode(student.surviveClass);
    surviveClassPar.appendChild(surviveClass);

    var learnPar = document.createElement("p");
    var learn = document.createTextNode(student.learn);
    learnPar.appendChild(learn);

    var challengePar = document.createElement("p");
    var challenge = document.createTextNode(student.challenge);
    challengePar.appendChild(challenge);

    var expectationPar = document.createElement("p");
    var expectation = document.createTextNode(student.expectationDiff);
    expectationPar.appendChild(expectation);

    addElement(studentDesc, "h2", "Student Feedback");
    addElement(studentDesc, "h3", "Work Time: ");
    studentDesc.appendChild(workTimePar);
    addElement(studentDesc, "h3", "How can Others Survive this Class?");
    studentDesc.appendChild(surviveClassPar);
    addElement(studentDesc, "h3", "I Have Learned...");
    studentDesc.appendChild(learnPar);
    addElement(studentDesc, "h3", "How has this class Challenged Me?");
    studentDesc.appendChild(challengePar);
    addElement(studentDesc, "h3", "I Have Learned...");
    studentDesc.appendChild(expectationPar);
    studentDesc.className = "studentDesc";

    //container.appendChild(studentDesc);

    return studentDesc;

}

function displayCourses(courses) {
    //console.log("displayCourses() has been called");
    /**
     * Determine which subject the data is for
     */

    for (var i = 0; i < courses.length; i++) {
        var subjectPar = document.createElement("p");
        var subjectB = document.createElement("strong");
        subjectB.appendChild(document.createTextNode("Subject: "));
        subjectPar.appendChild(subjectB);
        var subject = document.createTextNode(courses[i].subject);
        subjectPar.appendChild(subject);
        subjectPar.className += "course_subject centerAlign";


        var countyDescPar = document.createElement("p");
        var countyDesc = document.createTextNode(courses[i].countyDesc);
        countyDescPar.className += "course_description centerAlign";
        addElement(countyDescPar, "b", "County Description: ");
        countyDescPar.appendChild(countyDesc);

        var hr1 = document.createElement("hr");
        hr1.style = "background-color:#6606A5; height:15px; border-radius:8px;";

        var course = document.createElement("div");
        var coursePanel = document.createElement("div");
        coursePanel.className = "course_panel state-hidden";
        var courseButton = buildCourseButton(courses[i].name, courses[i].subject);
        var teacherDesc = buildTeacherDesc(courses[i].teacherFeedback);
        var studentDesc = new Array(0);
        /* console.log("This is inside the function " + courses[i].name);
         console.log(courses[i].studentFeedback);*/
        if (courses[i].studentFeedback.length > 0) {
            console.log("studentFeedback length: " + courses[i].studentFeedback.length);
            for (let x = 0; x < courses[i].studentFeedback.length; x++) {
                studentDesc.push(buildStudentDesc(courses[i].studentFeedback[x]));
                console.log("adding to studentDesc");
            }
        } else {
            studentDesc.push(document.createElement("div"));
            studentDesc[0].className = "studentDesc";
            addElement(studentDesc[0], "h4", "No student feedback available yet.")
        }

        course.appendChild(courseButton);
        coursePanel.appendChild(subjectPar);
        coursePanel.appendChild(countyDescPar);
        coursePanel.appendChild(hr1);
        coursePanel.appendChild(teacherDesc);
        if (studentDesc.length > 0) {
            console.log("studentDesc length: " + studentDesc.length);
            for (let i = 0; i < studentDesc.length; i++) {
                coursePanel.appendChild(studentDesc[i]);
            }
        }
        coursePanel.style.maxHeight = "0px";
        course.appendChild(coursePanel);
        course.className += "course";
        document.getElementById("courses").appendChild(course);
        //console.log("displayCourses() is happening");
    }
    //console.log("displayCourses() is done");
}

function toggleCourseDisplay() {
    var course = this.parentNode;
    var coursePanel = course.getElementsByClassName("course_panel")[0];
    var courseButton = course.getElementsByClassName("courseButton")[0];
    if (coursePanel.className.includes("state-hidden")) {
        coursePanel.classList.remove("state-hidden");
        coursePanel.style.maxHeight = coursePanel.scrollHeight + "px";
        coursePanel.style.borderBottom = "2px solid black";
        courseButton.style.backgroundColor = "#ddd";
    } else {
        coursePanel.classList.add("state-hidden");
        coursePanel.style.maxHeight = "0px";
        coursePanel.style.borderBottom = "0px";
        courseButton.style.backgroundColor = "";
    }
}


/**
 * The following functions are general purpose functions that may be moved into a seperate file.  
 */
/**
 * This function appends a header of the specified type with the passed text as its content text.  
 */
function addElement(container, elementType, text) {
    var contentText = document.createTextNode(text);
    var element = document.createElement(elementType);
    element.appendChild(contentText);
    container.appendChild(element);
}


/**
 * The following is documentation containing a guide to what array value corresponds to what in the
 * Google spreadsheet.  
 */