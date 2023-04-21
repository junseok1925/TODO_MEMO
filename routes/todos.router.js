const express = require("express");
const Todo = require("../models/todo.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("HI");
});
// ======================================= 할 일 추가 =======================================
router.post("/todos", async (req, res) => {
  const { value } = req.body;
  //Todo 테이블 안에 있는 한개의 데이터를 order를 기준으로 맨 위에 있는 거를 조회
  const maxOrderByUserId = await Todo.findOne().sort("-order").exec();

  // 위 코드에서 구한 maxOrderByUserId에 값이 있으면 해당값에 +1를 더해서 할당
  // 값이 없으면 1를 할당
  // 추가된 데이터에 1씩 추가할당해서 order가 높을 수록 Todo데이터가 상단에 위치하도록 하기 위해
  const order = maxOrderByUserId ? maxOrderByUserId.order + 1 : 1;

  const todo = new Todo({ value, order });
  await todo.save();

  res.send({ todo });
});

// ======================================= 할 일 목록 조회 =======================================

router.get("/todos", async (req, res) => {
  // Todo컬럼에서 찾는다 order값을 내림차순으로 find()안에 조건을 안넣으면 모두 찾음
  const todos = await Todo.find().sort("-order").exec();

  res.send({ todos });
});

// ======================================= 할 일 순서 변경 =======================================

router.patch("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const { order } = req.body;

  // 1, todoId에 해당하는 할 일이 있는가?
  // 2. todoId에 해당하는 할 일이 없다면, 에러를 출력해야함
  // findById() -> 검색할 문거의 _id값을 출력
  const currentTodo = await Todo.findById(todoId);
  if (!currentTodo) {
    return res.status(400).json({ errMessage: "존재하지 않는 할 일 입니다." });
  }
  res.send();
  //order값이 들어왔다면...
  if (order) {
    //targetTodo의 데이터는 body에서 받은 order값이다
    const targetTodo = await Todo.findOne({ order }).exec();
    // 받은 order값이 이미 있다면...
    if (targetTodo) {
      //targetTodo를 param으로 받은 todoId를 가진 데이터로 바꾼다
      targetTodo.order = currentTodo.order;
      await targetTodo.save();
    }
    //currentTodo의 order값은 body로 받은 order값으로 할당
    currentTodo.order = order;
    await currentTodo.save();
  }

  res.send();
});

module.exports = router;
