const bodyParser = require('body-parser');
let urlencodeParser = bodyParser.urlencoded({extended:false});
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://bigshow:liubo_1991@cluster0-uqp7o.mongodb.net/todo?retryWrites=true&w=majority",{ useNewUrlParser: true });

const todoSchema = mongoose.Schema({
    item:String
});
let DefaultTodo = mongoose.model('default_todo',todoSchema);
let Todo = mongoose.model('todo',todoSchema);
initTodo();
module.exports = function (app) {
    app.get('/todo',(req,res)=>{
        console.log('get');
        Todo.find({},(err,data)=>{
            if(err) throw err;
            res.render('todo',{todo:data});
        });
    });
    app.post('/todo',urlencodeParser,(req,res)=>{
        let item = Todo(req.body).save((err,data)=>{
            if(err) throw err;
            res.json(data);
        });
    });
    app.delete('/todo/:item',(req,res)=>{
        Todo.find({item:req.params.item.replace(/-/g," ")}).deleteOne((err,data)=>
        {
            if(err) throw err;
            res.json(data);
        })
    });
};
function initTodo ()
{
    DefaultTodo.find({},(err,data)=>{
        if(err) throw err;
        console.log(data);
        Todo.remove((err,data)=>{
            data=null;
        });
        data.forEach((todo)=>{
            Todo({item:todo.item}).save((err)=>{

                if (err) throw err;
            })
        })
    });
}