const express = require("express");

const db = require("./models/index.js");
const todosRouter = require("./routes/todos.router.js");

const app = express();

app.use("/api", express.json(), todosRouter); //express.json() -> put,post,delete같이 body로 들어오는 데이터에 대해서
//사용할 수 있도록 해주는 미들웨어
app.use(express.static("./assets"));
// static파일 정적 파일을 연결해주는 미들웨어
// 특정주소가 assets라는 폴더안에 있다면 그 파일을 전송해줘라
app.listen(8080, () => {
  console.log("서버가 켜졌어요!");
});
