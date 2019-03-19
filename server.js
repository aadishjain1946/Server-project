const http = require("http");
// const path = require("path");


// -----------------------------SERVER-------------------------------
const server = http.createServer((request, response) => {
    const url = request.url;
    const arr = require("./data");
    console.log(arr);
    const method = request.method;
    const urlObj = require("url");
    var uri = urlObj.parse(url).pathname;
    console.log("url is ", url);
    if (url == "/" && method == "GET") {
        staticServe("/index.html", response);
    }
    else if (isStatic(url)) {
        staticServe(url, response);
    }
    else if (uri == "/src/login/checkUser" || uri == "/src/register/checkUser" && method == 'POST') {
        uLogin(request, response);
    }
    else if (uri == "/src/login/submitreq" && method == 'POST') {
        uSubmit(request, response);
    }
    else if (uri == "/src/register/submitreq" && method == 'POST') {
        uRegister(request, response);
    }
    else if (uri == "/src/user/checkPass" && method == 'POST') {
        uPasscheck(request, response);
    }
    else if (uri == "/src/user/changePass" && method == 'POST') {
        uChangepass(request, response);
    }
});
server.listen(5460, (err) => {
    if (err)
        console.log("ERROR IN SERVER");
    else
        console.log("!!SERVER IS RUNNING!!");
})
// -------------------------------------------------------------------------------

// -------------------------------FUNCTIONALITY-----------------------------------------------
function uLogin(request, response) {
    let data = '';
    var dataObj;
    request.on('data', (chunk) => {
        data += chunk;
    })
    request.on('end', () => {
        dataObj = JSON.parse(data);
        console.log(arrayIndex(dataObj.Uid));
        if (arrayIndex(dataObj.Uid) < 0) {
            console.log("notex");
            response.write("-1");
            response.end();
        }
        else {
            console.log("ex");
            response.write("10");
            response.end();

        }
    })
}
function arrayIndex(id) {
    const arr = require("./data");
    console.log("id", id);
    var m = -1;
    for (let i = 0; i < arr.length; i++) {
        var userID = arr[i].uID;
        if (userID == id) {
            m = i;
            break;
        }
    }
    return m;
}
function uRegister(request, response) {
    const user = require("./users");
    const arr = require("./data");
    let data = '';
    var dataObj;
    request.on('data', (chunk) => {
        data += chunk;
    })
    request.on('end', () => {
        dataObj = JSON.parse(data);
        var obj = { name: "", uID: "", uPass: "" };
        obj.name = dataObj.Uname;
        obj.uID = dataObj.Uid;
        obj.uPass = dataObj.Upass;
        arr.push(obj);
        response.write("10");
        response.end();
    })
}
function uSubmit(request, response) {
    let data = '';
    var dataObj;
    request.on('data', (chunk) => {
        data += chunk;
    })
    request.on('end', () => {
        dataObj = JSON.parse(data);
        const arr = require("./data");
        var index = arrayIndex(dataObj.Uid);
        var obj = {
            flag: 0,
            id: "",
            name: "",
        };
        if (arr[index].uPass == dataObj.Upass) {
            console.log("ex ex")
            obj.flag = 1;
            obj.id = arr[index].uID;
            obj.name = arr[index].name;
        }
        else {
            obj.flag = -1;
        }
        var objjson = JSON.stringify(obj);
        response.write(objjson);
        response.end();

    })
}
function uPasscheck(request, response) {
    let data = '';
    var dataObj;
    request.on('data', (chunk) => {
        data += chunk;
    })
    request.on('end', () => {
        dataObj = JSON.parse(data);
        const arr = require("./data");
        var o = -1;
        console.log(dataObj);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].uID == dataObj.Uid) {
                console.log("ID OK");
                o = i;
                break;
            }
        }
        if (arr[o].uPass == dataObj.Upass) {
            console.log("OK");
            response.write("10");
        }
        else
            response.write("-1");
        response.end();
    })
}
function uChangepass(request, response) {
    let data = '';
    var dataObj;
    request.on('data', (chunk) => {
        data += chunk;
    })
    request.on('end', () => {
        dataObj = JSON.parse(data);
        const arr = require("./data");
        var o = -1;
        console.log(dataObj);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].uID == dataObj.Uid) {
                console.log("ID OK");
                o = i;
                break;
            }
        }
        arr[o].uPass = dataObj.Upass;
        response.write("10");
        response.end();
    })
}
// ------------------------------------------------------------------


function staticServe(url, response) {
    // let data = "";
    const fs = require("fs");
    const path = require("path");
    const fullPath = path.join(__dirname, "public" + url);
    // console.log(fullPath);
    const readStream = fs.createReadStream(fullPath);
    readStream.pipe(response);
}
function isStatic(url) {
    var a = [".html", ".png", ".jpeg", ".jpg", ".css", ".js"];
    const path = require("path");
    var ext = path.extname(url);
    return a.indexOf(ext) >= 0;

}