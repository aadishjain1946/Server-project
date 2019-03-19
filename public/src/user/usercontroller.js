window.addEventListener("load", initevent);
function initevent() {
    var user = JSON.parse(localStorage.USER);
    document.querySelector("#Name").innerHTML = user.id;
    document.querySelector("#UCpass").addEventListener("click", changePass);
    document.querySelector("#submit").addEventListener("click", changeSubmit);
    document.querySelector("#Opass").addEventListener("blur", checkPass);
}
function changePass() {
    document.querySelector("#Uhome").style.display = "none";
    document.querySelector("#changepass").style.display = "block";
}
function checkPass() {
    document.querySelector("#Opass").classList.remove("alert-success");
    document.querySelector("#Opass").classList.remove("alert-danger");
    var ps = document.querySelector("#Opass").value;
    var user = JSON.parse(localStorage.USER);
    var pr = fetch("checkPass", {
        method: "POST",
        body: JSON.stringify({
            Uid: user.id,
            Upass: ps
        })
    });
    pr.then((Response) => {
        Response.text().then((data) => {
            var val = parseInt(data);
            if (val < 0) {
                document.querySelector("#Opass").classList.add("alert-danger");
                window.alert("PASSWORD INCORRECT!!!!");
                document.querySelector("#Opass").value = "";
            }
            else
                document.querySelector("#Opass").classList.add("alert-success");
        }).catch((err) => {
            console.log(err);
        })
    }).catch((err) => {
        console.log(err);
    })

}
function changeSubmit() {
    var ps = document.querySelector("#Npass").value;
    var user = JSON.parse(localStorage.USER);
    var pr = fetch("changePass", {
        method: "POST",
        body: JSON.stringify({
            Uid: user.id,
            Upass: ps
        })
    });
    pr.then((Response) => {
        Response.text().then((data) => {
            var val = parseInt(data);
            if (val > 0) {
                window.alert("PASSWORD CHANGED SUCCESSFULY");
                window.open("user.html","_self");
            }
        }).catch((err) => {
            console.log(err);
        })
    }).catch((err) => {
        console.log(err);
    })

}