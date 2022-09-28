var PI = Math.PI;
var num = Math.floor(Math.random() * 5);

function clear_0(e) {
    draw("clear");
}

function canva_1(e) {
    draw("triangle");
}

function canva_2(e) {
    draw("equilateral triangle");
}

function canva_3(e) {
    draw("square");
}

function canva_4(e) {
    var coners = 4 + Math.floor(Math.random() * 10);

    draw("polygon",coners);
}

function canva_5(e) {
    var nam = 4 + Math.floor(Math.random() * 7);

    draw("a few",nam);
}

function canva_6(e) {
    var coners = e.previousElementSibling.value;

    draw("star",Number(coners),300,150);
}

//
// Рисование
//

function random_color(){
    s = String(Math.floor(Math.random() * 16777216))
    return "#"+parseInt(s, 10).toString(16)
}

function draw(figura, ...args){

    var canvas = document.getElementById("canvas");
    var c = canvas.getContext("2d");

    c.beginPath();

    switch (figura) {
//
//Нарисовать ТРЕУГОЛЬНИК
//
        case "triangle":
            x=Math.floor(Math.random() * canvas.width);
            y=Math.floor(Math.random() * canvas.height);
            c.moveTo(x,y)
            for(i=0;i<2;i++){
                x1 = Math.floor(Math.random() * canvas.width);
                y1 = Math.floor(Math.random() * canvas.height);
                c.lineTo(x1,y1)
            }
            c.lineTo(x,y)
            break;
//            
//Нарисовать РАВНОСТОРОННИЙ ТРЕУГОЛЬНИК
//
        case "equilateral triangle":
            x=Math.floor(Math.random() * canvas.width);
            y=Math.floor(Math.random() * canvas.height);
            r=Math.floor(Math.random() * 1000);

            var rot=Math.PI/2*3;
            var step=Math.PI/3;

            c.moveTo(x,y)
            for(i=0;i<2;i++){
                x1 = x+Math.cos(rot)*r;
                y1 = y+Math.sin(rot)*r;
                c.lineTo(x1,y1)
                rot+=step
            }
            c.lineTo(x,y);
            break;
//
//Нарисовать КВАДРАТ
//
        case "square":
            var x=Math.floor(Math.random() * canvas.width);
            var y=Math.floor(Math.random() * canvas.height);

            a=Math.floor(Math.random() * 1000);

            var arr_actions = [[x+a,y],[x+a,y+a],[x,y+a]]

            c.moveTo(x,y)
            for(i=0;i<3;i++){
                c.lineTo(arr_actions[i][0],arr_actions[i][1])
            }
            c.lineTo(x,y);

            break;
//
//Нарисовать МНОГОЛЬНИК
//
        case "polygon":
            var x=Math.floor(Math.random() * canvas.width);
            var y=Math.floor(Math.random() * canvas.height);
            
            var coners = args[0];
            if (args[3] != undefined){var bool = args[3];}
            else{var bool = args[1];}
            if (bool == undefined) {bool = Math.floor(Math.random() * 2)}

            var rot=Math.PI/2*3;
            var step=Math.PI*2/coners;
            
            var r=Math.floor(Math.random() * 1000);
            c.moveTo(x,y)
            if (bool == 1){
                for(i=0;i<=coners;i++){
                    x1 = x+Math.cos(rot)*r;
                    y1 = y+Math.sin(rot)*r;
                    c.lineTo(x1,y1)
                    rot+=step
                }
            }else {
                for(i=0;i<=coners;i++){
                    x1 = Math.floor(Math.random() * canvas.width);
                    y1 = Math.floor(Math.random() * canvas.height);
                    console.log(x1+" "+y1);
                    c.lineTo(x1,y1)
                    rot+=step
                }
            }
            c.lineTo(x,y); 
            break;
//
//Нарисовать НЕСКОЛЬКО ФИГУР
//
        case "a few":
            var num = args[0];

            var arr = ["triangle","equilateral triangle","square","polygon","star"]

            for(i=0;i<num;i++){
                var n = Math.floor(Math.random() * arr.length);
                var coners = 4 + Math.floor(Math.random() * 10);
                draw(arr[n],coners,300,150,1)
            }

            break;
//
//Нарисовать ЗВЕЗДУ
//
        case "star":
            var x=Math.floor(Math.random() * canvas.width);
            var y=Math.floor(Math.random() * canvas.height);

            var coners = args[0];
            var outerRadius = args[1];
            var innerRadius = args[2];

            var rot=Math.PI/2*3;
            var step=Math.PI/coners;

            c.moveTo(x,y-outerRadius)
            for(i=0;i<coners;i++){
                x1=x+Math.cos(rot)*outerRadius;
                y1=y+Math.sin(rot)*outerRadius;
                c.lineTo(x1,y1)
                rot+=step

                x1=x+Math.cos(rot)*innerRadius;
                y1=y+Math.sin(rot)*innerRadius;
                c.lineTo(x1,y1)
                rot+=step
            }
            c.lineTo(x,y-outerRadius);
            break;
//
//Очистить полотно
//
        case "clear":
            c.fillStyle = "#FFFFFF";
            c.fillRect(0, 0, canvas.width+100, canvas.height+100);
            console.log(c.width)
            break;    

    }
    c.closePath();

    c.lineWidth=10;
    c.strokeStyle=random_color();
    c.stroke();
    c.fillStyle=random_color();
    c.fill();
}
