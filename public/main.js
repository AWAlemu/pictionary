var socket = io();
var pictionary = function() {
    var canvas, context, guessBox;
    var drawing = false;
    var draw = function(position) {
        //tell context drawing a new object is to commence
        context.beginPath();
        //draw an entire circle centered at position
        context.arc(position.x, position.y,
                         6, 0, 2 * Math.PI);
        //fill path to create solid black circle
        context.fill();
    };
    
    var onKeyDown = function(event) {
        if(event.keyCode != 13) {
            return;
        }
        socket.emit('guess', guessBox.val());
        console.log(guessBox.val());
        guessBox.val('');
    };
    
    var displayGuess = function(guess) {
        guessPrint.text(guess);
    };
    guessPrint = $('#displayGuess');
    guessBox = $('#guess input');
    guessBox.on('keydown', onKeyDown);
    canvas = $('canvas');
    //create a drawing context for the canvas
    //context object allows to draw simple graphics to the canvas
    context = canvas[0].getContext('2d');
    canvas[0].width = canvas[0].offsetWidth;
    canvas[0].height = canvas[0].offsetHeight;
    
    canvas.on('mousedown', function() {
        drawing = true;
    });
    canvas.on('mouseup', function() {
        drawing = false;
    });
    canvas.on('mousemove', function(event) {
        if (drawing) {
            var offset = canvas.offset();
            var position = {x: event.pageX - offset.left,
                            y: event.pageY - offset.top};
            draw(position);
            socket.emit('draw', position);
        }
    });
    socket.on('draw', draw);
    socket.on('guess', displayGuess);
};

$(document).ready(function() {
    pictionary();
});

