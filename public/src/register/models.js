function submit(USERid, USERpass, USERname) {
    var pr = fetch('submitreq', {
        method: "POST",
        body: JSON.stringify({
            Uid: USERid,
            Upass: USERpass,
            Uname: USERname
        })
    });
    pr.then(response => {
        response.text().then((data) => {
            Data = parseInt(data);
            if (Data < 0) {
                console.log(err);
            }
            else {
                window.alert("SUCESSFULLY REGISTERD PLEASE LOGIN!!");
                // console.log(Data);
                window.open("../login/login.html", "_self");
            }
        }).catch(err => {
            console.log("error", err);
        })
    }).catch(err => {
        console.log(err);
    })
}
function checkforUser(USERid) {
    var pr = fetch('checkUser', {
        method: "POST",
        body: JSON.stringify({
            Uid: USERid,
        })
    });
    pr.then(response => {
        response.text().then((data) => {
            console.log(parseInt(data));
            if ((parseInt(data)) >= 0) {
                window.alert("USERNAME ALREADY EXIST!!!!");
                document.querySelector("#uID").value = "";
            }
        }).catch(err => {
            console.log("error", err);
        })
    }).catch(err => {
        console.log(err);
    })
}