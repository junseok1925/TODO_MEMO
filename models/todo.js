const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  value: String, // 할일이 어떤것인지 확인하는 컬럼
  doneAt: Date, // 할일이 언제 완료되었는지
  order: Number, // 몇번째 할일인지
});
//단순히 데이터를 조회할때 자동으로 생성되는 가상의 컬럼
//프론트를 사용하기 위해 사용하는 문법(virtual)
TodoSchema.virtual("todoId").get(function(){
    return this._id.toHexString()
    //.toHexString : 에러를 방지하기위한 데이터타입설정(값이 존재하는지 확인하기)
    //mongoDB에서의 특정한 고유값(_id)을 가상의"todoId"컬럼에 넣어서 사용자들에게 보여줄 거다
}); 

//TodoSchema 사용하기위해 어떤타입으로 변경했을때 보여줄 것인가에 대한 설정
//todoId를 json타입으로 변경했을 때 보여준다(조회할때)
TodoSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Todo", TodoSchema);
