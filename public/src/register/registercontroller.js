window.addEventListener("load", init);
function init() {
    bindevents();
}
function bindevents() {
    document.querySelector("#submit").addEventListener("click", Submitdet);
    document.querySelector("#uID").addEventListener("blur", checkUid);
}
function checkUid() {
    var USERid = document.querySelector("#uID").value;
    var log = document.querySelector("#uID");
    log.classList.remove("alert-danger");
    if (USERid != "") {
     checkforUser(USERid);
    }
    else {
        // alert alert-danger
        log.classList.add("alert-danger");
    }
}
function Submitdet() {
    var USERid = document.querySelector("#uID").value;
    var USERpass = document.querySelector("#uPass").value;
    var USERname = document.querySelector("#name").value;
    document.querySelector("#uID").value = "";
    document.querySelector("#uPass").value = "";
    if (!(USERid) && !(USERpass)) {
        window.alert("!!BOTH FIELD REQUIRED!!");
    }
    else if (!(USERid)) {
        window.alert("!!FIELD REQUIRED!!");
    }
    else if (!(USERpass)) {
        window.alert("!!FIELD REQUIRED!!");
    }
    else {
        submit(USERid,USERpass,USERname);
    }        
}
