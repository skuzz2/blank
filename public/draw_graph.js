var question_one_data/*mongodata*/;
var question_two_data;
var question_three_data;
console.log(question_one_data);

var canvas_one = document.getElementById('my_canvas1');
var ctx_one = canvas_one.getContext('2d');
var canvas_two = document.getElementById('my_canvas2');
var ctx_two = canvas_two.getContext('2d');
var canvas_three = document.getElementById('my_canvas3');
var ctx_three = canvas_three.getContext('2d');

function drawGraph(data, color, context){
    context.strokeStyle = color;
    context.beginPath();
    /*
    * DRAW THE BAR GRAPH
    * */
    context.stroke();
}

drawGraph(question_one_data, '#0f0', ctx_one);
drawGraph(question_two_data, '#0f0', ctx_two);
drawGraph(question_three_data, '#0f0', ctx_three);
