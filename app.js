// 后端
var express = require("express");
// instanitate the app
var app = express();

app.set('port', (process.env.PORT || 2500));
app.use(express.static(__dirname + '/public'));

app.get("/", function (request, response) {
    response.render("index.html");
})

//设置跨域访问

app.listen(app.get('port'), function () {
    console.log("listening to port :",(process.env.PORT || 2500));
});