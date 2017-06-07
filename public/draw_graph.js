var canvas_one = document.getElementById('my_canvas1');
var ctx_one = canvas_one.getContext('2d');
var canvas_two = document.getElementById('my_canvas2');
var ctx_two = canvas_two.getContext('2d');
var canvas_three = document.getElementById('my_canvas3');
var ctx_three = canvas_three.getContext('2d');

allData = allData.split(',');
for(var x = 0; x < allData.length; x++){
    console.log(allData[x]);
}

function drawGraph(data, color, context){
    context.strokeStyle = color;
    context.lineWidth = "10";
    for(var x = 0; x <= 3; x++){
        context.rect(x*40, 0, 28, (data[x]/data[12]) * 200);
    }
    context.stroke();
}

function drawGraphTwo(data, color, context){
    context.strokeStyle = color;
    context.lineWidth = "10";
    for(var x = 4; x <= 7; x++){
        context.rect((x-4)*40, 0, 28, (data[x]/data[12]) * 200);
    }
    context.stroke();
}

function drawGraphThree(data, color, context){
    context.strokeStyle = color;
    context.lineWidth = "10";
    for(var x = 8; x <= 11; x++){
        context.rect((x-8)*40, 0, 28, (data[x]/data[12]) * 200);
    }
    context.stroke();
}

drawGraph(allData, '#0f0', ctx_one);
drawGraphTwo(allData, '#f00', ctx_two);
drawGraphThree(allData, '#00f', ctx_three);