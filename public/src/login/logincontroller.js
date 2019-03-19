window.addEventListener("load", init);
function init() {
    bindevents();
}
function bindevents() {
    document.querySelector("#submit").addEventListener("click", Submitdet);
    document.querySelector("#loginid").addEventListener("blur", checkUid);
}
function checkUid() {
    var USERid = document.querySelector("#loginid").value;
    var log = document.querySelector("#loginid");
    log.classList.remove("alert-danger");
    var USERpass = document.querySelector("#pass").value;
    if (USERid != "") {
     checkforUser(USERid);
    }
    else {
        // alert alert-danger
        log.classList.add("alert-danger");

    }
}
function Submitdet() {
    var USERid = document.querySelector("#loginid").value;
    var USERpass = document.querySelector("#pass").value;
    document.querySelector("#loginid").value = "";
    document.querySelector("#pass").value = "";
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
        submit(USERid,USERpass);
    }        
}
