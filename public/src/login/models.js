var Data;
function submit(USERid, USERpass) {
    var pr = fetch('submitreq', {
        method: "POST",
        body: JSON.stringify({
            Uid: USERid,
            Upass: USERpass
        })
    });
    pr.then(response => {
        response.text().then((data) => {
            Data = JSON.parse(data);
            if (Data.flag < 0) {
                window.alert("INCORRECT PASSWORD!!");
            }
            else {
                // console.log(Data);
                window.open("../user/user.html", "_self");
                if(localStorage){
                    localStorage.USER = data;
                }
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
            if ((parseInt(data)) < 0) {
                window.alert("USERNAME NOT FOUND!!!!");
                document.querySelector("#loginid").value = "";
            }
        }).catch(err => {
            console.log("error", err);
        })
    }).catch(err => {
        console.log(err);
    })
}
function test() {
    console.log(Data);
}