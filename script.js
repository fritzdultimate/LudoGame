let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let cx = window.innerWidth;
window.innerHeight = window.innerWidth
let cy = window.innerHeight;
canvas.width = cx;
canvas.height = cy;
const midx = cx/2;
const midy = cy/2;
const center_var = 45;

//make the opponet houses crossed
let colors = ['green', 'red', 'blue', 'yellow'];
let first_color = colors.splice(random(0, colors.length), 1)
let second_color = first_color[0] == 'green' ? 'yellow' : first_color[0] == 'blue' ? 'red' : first_color[0] == 'yellow' ? 'green' : 'blue';
let player_colors = [first_color[0], second_color]

let player_seeds = []; // variable holding the seed that's brought out.

function random(min, max) {
    return Math.floor(Math.random() * max) + min;
}
//the four square house cordinates
function cordinates(cord) {
    let first_sqr = {
        x : 0,
        y : 0,
        dx : (cx - (center_var * 2))/2,
        dy : (cy - (center_var * 2))/2,
    }



    let second_sqr = {
        x: first_sqr.dx + (center_var * 2),
        y: 0,
        dx: (cx - (center_var * 2))/2,
        dy: (cy - (center_var * 2))/2
    }

    let third_sqr = {
        x : 0,
        y : first_sqr.dy + (center_var * 2),
        dx: (cx - (center_var * 2))/2,
        dy: (cy - (center_var * 2))/2
    }

    let fourth_sqr = {
        x: first_sqr.dx + (center_var * 2),
        y: first_sqr.dy + (center_var * 2),
        dx: (cx-(center_var * 2))/2,
        dy: (cy - (center_var * 2))/2
    }


    return cord == 'first_sqr' ? first_sqr  : cord == 'fourth_sqr' ? fourth_sqr : cord == 'third_sqr' ? third_sqr : second_sqr;
}

let fr, se, th, ft;
[fr, se, th, ft] = [cordinates('first_sqr'), cordinates('second_sqr'), cordinates('third_sqr'), cordinates('fourth_sqr')]

let red_box = [], green_box = [], blue_box = [], yellow_box = [];

// playing seeds cordinates
let seeds__ = {
    blue: [
        [(ft.x + ft.dy/2) - 20 , ft.y + ft.dy/2 -15],
        [(ft.x + ft.dy/2) + 20 , ft.y + ft.dy/2 -15],
        [ft.x + ft.dx/2+20, ft.y + ft.dy/2 + 20],
        [ft.x + ft.dx/2-20, ft.y + ft.dy/2 + 20]
    ],
    red: [
        [fr.dx/2 -20, fr.dy/2 -15],
        [fr.dx/2 +20, fr.dy/2 -15],
        [fr.dx/2 -20, fr.dy/2 + 20],
        [fr.dx/2 +20, fr.dy/2 + 20]
    ],
    yellow: [
        [(se.x + se.dy/2) - 20 , se.y + se.dy/2 -15],
        [(se.x + se.dy/2) + 20 , se.y + se.dy/2 -15],
        [se.x + se.dx/2+20, se.y + se.dy/2 + 20],
        [se.x + se.dx/2-20, se.y + se.dy/2 + 20]
    ],
    green: [
        [(th.x + th.dy/2) - 20 , th.y + th.dy/2 -15],
        [(th.x + th.dy/2) + 20 , th.y + th.dy/2 -15],
        [th.x + th.dx/2+20, th.y + th.dy/2 + 20],
        [th.x + th.dx/2-20, th.y + th.dy/2 + 20]
    ]
}

// util function to draw the whole play ground...
function box() {
    ctx.strokeRect(midx -45 , midy - 45, 90, 90); //middle square

    // draw the four house side squares
    ctx.fillStyle = 'red';
    ctx.fillRect(fr.x, fr.y, fr.dx, fr.dy)

    ctx.fillStyle = 'blue';
    ctx.fillRect(ft.x, ft.y, ft.dx, ft.dy)

    ctx.fillStyle = 'green';
    ctx.fillRect(th.x, th.y, th.dx, th.dy)

    ctx.fillStyle = 'yellow';
    ctx.fillRect(se.x, se.y, se.dx, se.dy)
    //end draw the four house side squares

    // draw white circles on side squares
    ctx.beginPath()
    ctx.arc(fr.dx/2, fr.dy/2, 55, 0, Math.PI * 2)
    ctx.arc(se.x + se.dy/2 , se.y + se.dy/2, 55, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill()

    ctx.beginPath();
    ctx.arc(th.x + th.dy/2 , th.y + th.dy/2, 55, 0, Math.PI * 2)
    ctx.arc(ft.x + ft.dy/2 , ft.y + ft.dy/2, 55, 0, Math.PI * 2)
    ctx.fillStyle = 'white';
    ctx.fill();
    //end draw white circles on side squares

    // draw the playing seeds
    for(let obj in seeds__) {
        seeds__[obj].forEach((el) =>{
            ctx.beginPath();
            ctx.fillStyle = obj;
            ctx.arc(el[0], el[1], 12, 0, Math.PI * 2)
            ctx.fill();
            // console.log(el)
        })
        // console.log(seeds__[obj])
    }
    //end draw the playing seeds


    let grid = (se.x - (cx-(center_var * 2))/2)/3
    let box_size = (midy - center_var)/6;
    let x = (cx - (center_var * 2))/2;
    let y = 0;

    /** 
     ** Below four for loop is used to draw the whole small
     ** boxes of the play ground...
     * **/
    for(let i = 0; i < 6; i++) {
        for(let j = 0; j < 3; j++) {
            if(j == 1 && i > 0 || (i == 1 && j == 2)) {
               
                ctx.fillStyle = 'yellow';
                ctx.fillRect(x + (grid * j), y + (box_size * i), grid, box_size);
                ctx.strokeRect(x + (grid * j), y + (box_size * i), grid, box_size)
                yellow_box.push({
                    x: x + (grid * j),
                    y: y + (box_size * i),
                    dx: grid,
                    dy: box_size
                })
            } else {
               
                ctx.strokeRect(x + (grid * j), y + (box_size * i), grid, box_size);
                yellow_box.push({
                    x: x + (grid * j),
                    y: y + (box_size * i),
                    dx: grid,
                    dy: box_size
                })
            }
            
            // console.log(x)
            
            
        }
    }

    grid = (se.x - (cx-(center_var * 2))/2)/3
    box_size = (midy - center_var)/6;
    x = (cx - (center_var * 2))/2;
    y = (midy + center_var)

    for(let i = 0; i < 6; i++) {
        for(let j = 0; j < 3; j++) {
            if(j == 1 && i < 5 || (i == 4 && j == 0)) {
               
                ctx.fillStyle = 'green';
                ctx.fillRect(x + (grid * j), y + (box_size * i), grid, box_size);
                ctx.strokeRect(x + (grid * j), y + (box_size * i), grid, box_size)
                green_box.push({
                    x: x + (grid * j),
                    y: y + (box_size * i),
                    dx: grid,
                    dy: box_size
                })
            } else {
                ctx.strokeRect(x + (grid * j), y + (box_size * i), grid, box_size);
                green_box.push({
                    x: x + (grid * j),
                    y: y + (box_size * i),
                    dx: grid,
                    dy: box_size
                })
            }
        }
    }

    grid = (center_var* 2)/3//(se.x - (cx-(center_var * 2))/2)/3
    box_size = (midy - center_var)/6;
    x = 0;
    y = midy - center_var;

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 6; j++) {
            if(i == 1 && j > 0 || (j == 1 && i == 0)) {
                ctx.fillStyle = 'red';
                ctx.fillRect(x + (box_size * j), y + (grid * i), box_size, grid);
                ctx.strokeRect(x + (box_size * j), y + (grid * i), box_size, grid);
                red_box.push({
                    x: x + (box_size * j),
                    y: y + (grid * i),
                    dx: box_size,
                    dy: grid
                })
            } else {
                ctx.strokeRect(x + (box_size * j), y + (grid * i), box_size, grid);
                red_box.push({
                    x: x + (box_size * j),
                    y: y + (grid * i),
                    dx: box_size,
                    dy: grid
                })
            }
        }
    }

    grid = (center_var* 2)/3//(se.x - (cx-(center_var * 2))/2)/3
    box_size = (midy - center_var)/6;
    x = midx + center_var;
    y = midy - center_var;

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 6; j++) {
            if(i == 1 && j < 5 || (i == 2 && j == 4)) {
                ctx.fillStyle = 'blue';
                ctx.fillRect(x + (box_size * j), y + (grid * i), box_size, grid);
                ctx.strokeRect(x + (box_size * j), y + (grid * i), box_size, grid);
                blue_box.push({
                    x: x + (box_size * j),
                    y: y + (grid * i),
                    dx: box_size,
                    dy: grid
                })
            } else {
                ctx.strokeRect(x + (box_size * j), y + (grid * i), box_size, grid);
                blue_box.push({
                    x: x + (box_size * j),
                    y: y + (grid * i),
                    dx: box_size,
                    dy: grid
                })
            }
        }
    }

    //for loop for play ground small boxes ends here...
}
box()

/** 
 * This a very long boring cordinates
 * Just skip this if you're taking a glance
 * The below objects stores the cordinate
 * of the whole play ground small boxes
 * Each house holds 57 cordinates, from the start
 * to the end.
**/

let seeds_cord = {
    green: [
    [green_box[12].x+12, green_box[12].y+14],
    [green_box[9].x+12, green_box[9].y+14],
    [green_box[6].x+12, green_box[6].y+14],
    [green_box[3].x+12, green_box[3].y+14],
    [green_box[0].x+12, green_box[0].y+14],

    [red_box[17].x+12, red_box[17].y+14],
    [red_box[16].x+12, red_box[16].y+14],
    [red_box[15].x+12, red_box[15].y+14],
    [red_box[14].x+12, red_box[14].y+14],
    [red_box[13].x+12, red_box[13].y+14],
    [red_box[12].x+12, red_box[12].y+14],

    [red_box[6].x+12, red_box[6].y+14],

    [red_box[0].x+12, red_box[0].y+14],
    [red_box[1].x+12, red_box[1].y+14],
    [red_box[2].x+12, red_box[2].y+14],
    [red_box[3].x+12, red_box[3].y+14],
    [red_box[4].x+12, red_box[4].y+14],
    [red_box[5].x+12, red_box[5].y+14],

    [yellow_box[15].x+12, yellow_box[15].y+14],
    [yellow_box[12].x+12, yellow_box[12].y+14],
    [yellow_box[9].x+12, yellow_box[9].y+14],
    [yellow_box[6].x+12, yellow_box[6].y+14],
    [yellow_box[3].x+12, yellow_box[3].y+14],
    [yellow_box[0].x+12, yellow_box[0].y+14],

    [yellow_box[1].x+12, yellow_box[1].y+14],

    [yellow_box[2].x+12, yellow_box[2].y+14],
    [yellow_box[5].x+12, yellow_box[5].y+14],
    [yellow_box[8].x+12, yellow_box[8].y+14],
    [yellow_box[11].x+12, yellow_box[11].y+14],
    [yellow_box[14].x+12, yellow_box[14].y+14],
    [yellow_box[17].x+12, yellow_box[17].y+14],

    [blue_box[0].x+12, blue_box[0].y+14],
    [blue_box[1].x+12, blue_box[1].y+14],
    [blue_box[2].x+12, blue_box[2].y+14],
    [blue_box[3].x+12, blue_box[3].y+14],
    [blue_box[4].x+12, blue_box[4].y+14],
    [blue_box[5].x+12, blue_box[5].y+14],

    [blue_box[11].x+12, blue_box[11].y+14],

    [blue_box[17].x+12, blue_box[17].y+14],
    [blue_box[16].x+12, blue_box[16].y+14],
    [blue_box[15].x+12, blue_box[15].y+14],
    [blue_box[14].x+12, blue_box[14].y+14],
    [blue_box[13].x+12, blue_box[13].y+14],
    [blue_box[12].x+12, blue_box[12].y+14],

    [green_box[2].x+15, green_box[2].y+14],
    [green_box[5].x+15, green_box[5].y+14],
    [green_box[8].x+15, green_box[8].y+14],
    [green_box[11].x+15, green_box[11].y+14],
    [green_box[14].x+15, green_box[14].y+14],
    [green_box[17].x+15, green_box[17].y+14],

    [green_box[16].x+15, green_box[16].y+14],
    [green_box[13].x+15, green_box[13].y+14],
    [green_box[10].x+15, green_box[10].y+14],
    [green_box[7].x+15, green_box[7].y+14],
    [green_box[4].x+15, green_box[4].y+14],
    [green_box[1].x+15, green_box[1].y+14],

    [green_box[1].x+15, green_box[1].y-14],

    ],

    yellow: [
        [yellow_box[5].x+15, yellow_box[5].y+14],
        [yellow_box[8].x+15, yellow_box[8].y+14],
        [yellow_box[11].x+15, yellow_box[11].y+14],
        [yellow_box[14].x+15, yellow_box[14].y+14],
        [yellow_box[17].x+15, yellow_box[17].y+14],

        [blue_box[0].x+15, blue_box[0].y+14],
        [blue_box[1].x+15, blue_box[1].y+14],
        [blue_box[2].x+15, blue_box[2].y+14],
        [blue_box[3].x+15, blue_box[3].y+14],
        [blue_box[4].x+15, blue_box[4].y+14],
        [blue_box[5].x+15, blue_box[5].y+14], //10

        [blue_box[11].x+15, blue_box[11].y+14],
        [blue_box[17].x+15, blue_box[17].y+14],
        [blue_box[16].x+15, blue_box[16].y+14],
        [blue_box[15].x+15, blue_box[15].y+14],
        [blue_box[14].x+15, blue_box[14].y+14],
        [blue_box[13].x+15, blue_box[13].y+14],
        [blue_box[12].x+15, blue_box[12].y+14], //17

        [green_box[2].x+15, green_box[2].y+14],
        [green_box[5].x+15, green_box[5].y+14],
        [green_box[8].x+15, green_box[8].y+14],
        [green_box[11].x+15, green_box[11].y+14],
        [green_box[14].x+15, green_box[14].y+14],
        [green_box[17].x+15, green_box[17].y+14], //23

        [green_box[16].x+15, green_box[16].y+14],
        [green_box[15].x+15, green_box[15].y+14], //25

        [green_box[12].x+12, green_box[12].y+14],
        [green_box[9].x+12, green_box[9].y+14],
        [green_box[6].x+12, green_box[6].y+14],
        [green_box[3].x+12, green_box[3].y+14],
        [green_box[0].x+12, green_box[0].y+14], //30
    
        [red_box[17].x+12, red_box[17].y+14],
        [red_box[16].x+12, red_box[16].y+14],
        [red_box[15].x+12, red_box[15].y+14],
        [red_box[14].x+12, red_box[14].y+14],
        [red_box[13].x+12, red_box[13].y+14],
        [red_box[12].x+12, red_box[12].y+14], //36
    
        [red_box[6].x+12, red_box[6].y+14], //37
    
        [red_box[0].x+12, red_box[0].y+14],
        [red_box[1].x+12, red_box[1].y+14],
        [red_box[2].x+12, red_box[2].y+14],
        [red_box[3].x+12, red_box[3].y+14],
        [red_box[4].x+12, red_box[4].y+14],
        [red_box[5].x+12, red_box[5].y+14], //43
    
        [yellow_box[15].x+12, yellow_box[15].y+14],
        [yellow_box[12].x+12, yellow_box[12].y+14],
        [yellow_box[9].x+12, yellow_box[9].y+14],
        [yellow_box[6].x+12, yellow_box[6].y+14],
        [yellow_box[3].x+12, yellow_box[3].y+14],
        [yellow_box[0].x+12, yellow_box[0].y+14], //49
    
        [yellow_box[1].x+12, yellow_box[1].y+14], //50
    
        [yellow_box[4].x+12, yellow_box[4].y+14], //51

        [yellow_box[7].x+12, yellow_box[7].y+14],
        [yellow_box[10].x+12, yellow_box[10].y+14],
        [yellow_box[13].x+12, yellow_box[13].y+14],
        [yellow_box[16].x+12, yellow_box[16].y+14],
        [yellow_box[16].x+12, yellow_box[16].y+37], //56
        
    ],

    blue: [
        [blue_box[16].x+12, blue_box[16].y+14],
        [blue_box[15].x+12, blue_box[15].y+14],
        [blue_box[14].x+12, blue_box[14].y+14],
        [blue_box[13].x+12, blue_box[13].y+14],
        [blue_box[12].x+12, blue_box[12].y+14], //4

        [green_box[2].x+15, green_box[2].y+14],
        [green_box[5].x+15, green_box[5].y+14],
        [green_box[8].x+15, green_box[8].y+14],
        [green_box[11].x+15, green_box[11].y+14],
        [green_box[14].x+15, green_box[14].y+14],
        [green_box[17].x+15, green_box[17].y+14], //10

        [green_box[16].x+15, green_box[16].y+14],
        [green_box[15].x+15, green_box[15].y+14], //12

        [green_box[12].x+12, green_box[12].y+14],
        [green_box[9].x+12, green_box[9].y+14],
        [green_box[6].x+12, green_box[6].y+14],
        [green_box[3].x+12, green_box[3].y+14],
        [green_box[0].x+12, green_box[0].y+14], //17
    
        [red_box[17].x+12, red_box[17].y+14],
        [red_box[16].x+12, red_box[16].y+14],
        [red_box[15].x+12, red_box[15].y+14],
        [red_box[14].x+12, red_box[14].y+14],
        [red_box[13].x+12, red_box[13].y+14],
        [red_box[12].x+12, red_box[12].y+14], //23
    
        [red_box[6].x+12, red_box[6].y+14], //24
    
        [red_box[0].x+12, red_box[0].y+14],
        [red_box[1].x+12, red_box[1].y+14],
        [red_box[2].x+12, red_box[2].y+14],
        [red_box[3].x+12, red_box[3].y+14],
        [red_box[4].x+12, red_box[4].y+14],
        [red_box[5].x+12, red_box[5].y+14], //30
    
        [yellow_box[15].x+12, yellow_box[15].y+14],
        [yellow_box[12].x+12, yellow_box[12].y+14],
        [yellow_box[9].x+12, yellow_box[9].y+14],
        [yellow_box[6].x+12, yellow_box[6].y+14],
        [yellow_box[3].x+12, yellow_box[3].y+14],
        [yellow_box[0].x+12, yellow_box[0].y+14], //36
    
        [yellow_box[1].x+12, yellow_box[1].y+14], 
        [yellow_box[2].x+12, yellow_box[2].y+14],//38

        [yellow_box[5].x+15, yellow_box[5].y+14],
        [yellow_box[8].x+15, yellow_box[8].y+14],
        [yellow_box[11].x+15, yellow_box[11].y+14],
        [yellow_box[14].x+15, yellow_box[14].y+14],
        [yellow_box[17].x+15, yellow_box[17].y+14], //43

        [blue_box[0].x+15, blue_box[0].y+14],
        [blue_box[1].x+15, blue_box[1].y+14],
        [blue_box[2].x+15, blue_box[2].y+14],
        [blue_box[3].x+15, blue_box[3].y+14],
        [blue_box[4].x+15, blue_box[4].y+14],
        [blue_box[5].x+15, blue_box[5].y+14], //49

        [blue_box[11].x+15, blue_box[11].y+14],
        [blue_box[10].x+15, blue_box[10].y+14],
        [blue_box[9].x+15, blue_box[9].y+14],
        [blue_box[8].x+15, blue_box[8].y+14],
        [blue_box[7].x+15, blue_box[7].y+14],
        [blue_box[6].x+15, blue_box[6].y+14], 
        [blue_box[6].x-14, blue_box[6].y+14]//56
    ],

    red: [
        [red_box[1].x+15, red_box[1].y+14],
        [red_box[2].x+15, red_box[2].y+14],
        [red_box[3].x+15, red_box[3].y+14],
        [red_box[4].x+15, red_box[4].y+14],
        [red_box[5].x+15, red_box[5].y+14], //4

        [yellow_box[15].x+15, yellow_box[15].y+14],
        [yellow_box[12].x+15, yellow_box[12].y+14],
        [yellow_box[9].x+15, yellow_box[9].y+14],
        [yellow_box[6].x+15, yellow_box[6].y+14],
        [yellow_box[3].x+15, yellow_box[3].y+14],
        [yellow_box[0].x+15, yellow_box[0].y+14], //10

        [yellow_box[1].x+15, yellow_box[1].y+14], //11

        [yellow_box[2].x+15, yellow_box[2].y+14],
        [yellow_box[5].x+15, yellow_box[5].y+14],
        [yellow_box[8].x+15, yellow_box[8].y+14],
        [yellow_box[11].x+15, yellow_box[11].y+14],
        [yellow_box[14].x+15, yellow_box[14].y+14],
        [yellow_box[17].x+15, yellow_box[17].y+14], //17

        [blue_box[0].x+15, blue_box[0].y+14],
        [blue_box[1].x+15, blue_box[1].y+14],
        [blue_box[2].x+15, blue_box[2].y+14],
        [blue_box[3].x+15, blue_box[3].y+14],
        [blue_box[4].x+15, blue_box[4].y+14],
        [blue_box[5].x+15, blue_box[5].y+14], //23

        [blue_box[11].x+15, blue_box[11].y+14], //24

        [blue_box[17].x+15, blue_box[17].y+14],
        [blue_box[16].x+15, blue_box[16].y+14],
        [blue_box[15].x+15, blue_box[15].y+14],
        [blue_box[14].x+15, blue_box[14].y+14],
        [blue_box[13].x+15, blue_box[13].y+14],
        [blue_box[12].x+15, blue_box[12].y+14], //30

        [green_box[2].x+15, green_box[2].y+14],
        [green_box[5].x+15, green_box[5].y+14],
        [green_box[8].x+15, green_box[8].y+14],
        [green_box[11].x+15, green_box[11].y+14],
        [green_box[14].x+15, green_box[14].y+14],
        [green_box[17].x+15, green_box[17].y+14], //36

        [green_box[16].x+15, green_box[16].y+14], //37

        [green_box[15].x+15, green_box[15].y+14],
        [green_box[12].x+15, green_box[12].y+14],
        [green_box[9].x+15, green_box[9].y+14],
        [green_box[6].x+15, green_box[6].y+14],
        [green_box[3].x+15, green_box[3].y+14],
        [green_box[0].x+15, green_box[0].y+14], //43

        [red_box[17].x+15, red_box[17].y+14],
        [red_box[16].x+15, red_box[16].y+14],
        [red_box[15].x+15, red_box[15].y+14],
        [red_box[14].x+15, red_box[14].y+14],
        [red_box[13].x+15, red_box[13].y+14],
        [red_box[12].x+15, red_box[12].y+14], //49

        [red_box[6].x+15, red_box[6].y+14],
        [red_box[7].x+15, red_box[7].y+14],
        [red_box[8].x+15, red_box[8].y+14],
        [red_box[9].x+15, red_box[9].y+14],
        [red_box[10].x+15, red_box[10].y+14],
        [red_box[11].x+15, red_box[11].y+14],
        [red_box[11].x+37, red_box[11].y+14], //56
    ]
}






let dice_one, dice_two;
let player_moving_seeding = [

]

function createOptionElem(val) {
    let opt = document.createElement('option')
    opt.value = val;
    let txtNode = document.createTextNode(val);
    opt.appendChild(txtNode);


    return opt;
}
function createBtn(val, className, id) {
    let btn = document.createElement('button')
    btn.dataset.val = val;
    btn.className = className;
    let txtNode = document.createTextNode(val);
    btn.appendChild(txtNode);
    btn.id = id + `_${val}`;


    return btn;
}/**
 * Got boring 
 ;C
 You can delete from here and your own algorithm
 */
function toss() {
    //toss the dices

    dice_one = Math.floor(Math.random() * 6) + 1;
    dice_two = Math.floor(Math.random() * 6) + 1;
    diceone.innerHTML = dice_one;
    dicetwo.innerHTML = dice_two;

    // if(dice_one !== 6 && dice_two !== 6 && !player_moving_seeding.length) {
    //     return;
    // }

    if((dice_one == 6 || dice_two == 6) && player_seeds.length < 8 && !player_moving_seeding.length) {
        let button1 = `<button class="btn-one btn-dice" id="sixy_1" data-val="sixy">sixy</button>`;
        let button2 = `<button class="btn-two btn-dice" id="sixy_2" data-val="sixy">sixy</button>`;
        if(dice_two == 6 && dice_one == 6) {
            seed_container_one.innerHTML += button1;
            seed_container_two.innerHTML += button2;
            seed_container_one.innerHTML += button1;
            seed_container_two.innerHTML += button2;
        } else {
            let num = dice_one == 6 ? dice_two : dice_one;
            seed_container_one.appendChild(createBtn(num, 'btn-one btn-dice', 'dice_one'));
            seed_container_two.appendChild(createBtn(num, 'btn-two btn-dice', 'dice_two'));
            seed_container_one.innerHTML += button1;
            seed_container_two.innerHTML += button2;
        }
    }
    
    if(!player_seeds.length < 8 && player_moving_seeding.length) {
    //     let select_one = document.getElementsByClassName("dice_one")[0];
    //     let select_two = document.getElementsByClassName("dice_two")[0];

        if(dice_two == 6 || dice_one == 6) {
            let button1 = `<button class="btn-one btn-dice" id="sixy_1" data-val="sixy">sixy</button>`;
            let button2 = `<button class="btn-two btn-dice" id="sixy_2" data-val="sixy">sixy</button>`;
            seed_container_one.innerHTML += button1;
            seed_container_two.innerHTML += button2;
        }

        // select_one.appendChild(createOptionElem(dice_one));
        // select_one.appendChild(createOptionElem(dice_two));
        // select_two.appendChild(createOptionElem(dice_one))
        // select_two.appendChild(createOptionElem(dice_two))
    // }

    seed_container_one.appendChild(createBtn(dice_one, 'btn-one btn-dice'));
    seed_container_one.appendChild(createBtn(dice_two, 'btn-one btn-dice'));
    seed_container_two.appendChild(createBtn(dice_one, 'btn-two btn-dice'));
    seed_container_two.appendChild(createBtn(dice_two, 'btn-two btn-dice'));
    }
    btnClickEvent()
}
function btnClickEvent() {
    let button_one = document.getElementsByClassName("btn-one");
    let button_two = document.getElementsByClassName("btn-two");
    for(let i = 0; i < button_one.length; i++) {
        if(button_one[i].dataset.val !== 'sixy') {
            button_one[i].addEventListener("click", move, false);
            button_two[i].addEventListener("click", move, false);
        } else {
            button_one[i].addEventListener("click", sixy, false);
            button_two[i].addEventListener("click", sixy, false);
        }
    }
    // console.log(button_one)
}

function move(event) {
    let num = event.target.dataset.val;
    let side = event.target.classList.contains('btn-one') ? 'first' : 'second';
    let player_seed = side == 'first' ? player_colors[0] : player_colors[1];

    document.getElementById(`dice_one_${num}`).remove();
    document.getElementById(`dice_two_${num}`).remove();

    box()
        ctx.beginPath();
        ctx.fillStyle = player_seed;
        ctx.arc(seeds_cord[player_seed][num][0], seeds_cord[player_seed][num][1], 12, 0, Math.PI * 2)
        ctx.fill();
        ctx.stroke();

        seeds_cord[player_seed].splice(0, num);
        player_moving_seeding.push({c:seeds_cord[player_seed][num], color:player_seed})

        player_seeds.push(seeds_cord[player_seed][0])

        box()
        reRenderMovingSeeds()

}

function sixy(event) {
   let side = event.target.classList.contains('btn-one') ? 'first' : 'second';
   let player_seed = side == 'first' ? player_colors[0] : player_colors[1];

   document.getElementById('sixy_1').remove()
   document.getElementById('sixy_2').remove()

    seeds__[player_seed].shift();
    // box()
    ctx.beginPath();
    ctx.fillStyle = player_seed;
    ctx.arc(seeds_cord[player_seed][0][0], seeds_cord[player_seed][0][1], 12, 0, Math.PI * 2)
    seeds_cord[player_seed].splice(0, 1)
    player_moving_seeding.push({c:seeds_cord[player_seed][0], color:player_seed})
    player_seeds.push(seeds_cord[player_seed][0])
    ctx.fill()
    ctx.stroke();
    // ctx.fillStyle = 'black'
    // ctx.fillText('1', seeds_cord[player_seed][0][0]-20, seeds_cord[player_seed][0][1])
    // ctx.font = "30px Arial"
    
    box()

    reRenderMovingSeeds()

    
}

function reRenderMovingSeeds() {
    console.log(player_moving_seeding)
    player_moving_seeding.forEach((el) => {
        // console.log(el)
        box()
        ctx.beginPath();
        ctx.fillStyle = el.color;
        ctx.arc(el.c[0], el.c[1], 12, 0, Math.PI * 2)
        ctx.fill();
        ctx.stroke();
        // box()
    })
}

