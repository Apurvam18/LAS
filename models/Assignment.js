var mongoose=require('mongoose');
var assignmentSchema=new mongoose.Schema({
	title:String,
	desc:String,
	due:String,
	questions:[{type:mongoose.Schema.Types.ObjectId, ref:'Question'}],
	course:[{type:mongoose.Schema.Types.ObjectId, ref:'Course'}]
});

var Assignment=mongoose.model('Assignment',assignmentSchema);
module.exports=Assignment;