
const prompt = require('prompt-sync')({sigint: true});
 
let playing = true;
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const rowNum = 10, colNum = 10;


class Field {

    constructor() {
        this._field = Array(rowNum).fill().map(() => Array(colNum));
        this._locationX = 0;
        this._locationY = 0;
    }

    generateField(percentage) {
        for (let y = 0; y < rowNum; y++) {
            for(let x = 0; x <colNum; x++) {
                const prob = Math.random();
                this._field[y][x] = prob > percentage ? fieldCharacter : hole; 
            }
        }

        //Set the "hat" location : Object
        const hatLocation = {
            x: Math.floor(Math.random() * colNum),
            y: Math.floor(Math.random() * rowNum)
        };

        //Make sure the "hat" is not at the starting point 
        while (hatLocation.x == 0 && hatLocation.y == 0) {
            hatLocation.x = Math.floor(Math.random() * colNum);
            hatLocation.y = Math.floor(Math.random() * rowNum);
        }

        this._field[hatLocation.y][hatLocation.x] = hat;
        this._field[0][0] = pathCharacter;
    }


    print() {
        const displayString = this._field.map(row => {
            return row.join('');
        }).join('\n');

        console.log(displayString);
    }

    askQuestion() {
        const direction = prompt('Which way? ').toUpperCase();
        switch (direction) {
            case "U":
                this._locationY = this._locationY - 1;
                break;
            case "D":
                this._locationY = this._locationY + 1;
                break;
            case "L":
                this._locationX = this._locationX - 1;
                break;
            case "R":
                this._locationX = this._locationX + 1;
                break;
            default:
                break;

        }   
    }

    gameDecision () {
        if (this._field[this._locationY] == undefined) {
            console.log("You can't go through walls fool!");
            return playing = false;
        }
        switch (this._field[this._locationY][this._locationX]) {
            case hat:
                console.log("You win! Congrats on finding your damn hat");
                playing = false;
                break;
            case hole:
                console.log("You lose sucka!");
                playing = false;
                break;
            case fieldCharacter:
                this._field[this._locationY][this._locationX] = pathCharacter;
                playing = true;
                break;
            case pathCharacter:
                console.log("You stepped on the poison trail!");
                playing = false;
                break;
            case undefined:
                console.log("You can't go through walls fool!");
                playing = false;
                break;
            default:
                break;

        }   
    }
   

}


//Create an instance of Field Class Object 
const myField = new Field();
const difficulty = prompt('Please select a difficulty:\nEASY = E \nMEDIUM = M \nHARD = H\nKey in here => ').toUpperCase();
if (difficulty == "E") {
    myField.generateField(0.2);
    startGame();
}
else if (difficulty == "M") {
    myField.generateField(0.3);
    startGame();
}
else if (difficulty == "H") {
    myField.generateField(0.4);
    startGame();
}


function startGame() {

    console.log("Start your engines!");

    while (playing) {
        myField.print();
        myField.askQuestion();
        myField.gameDecision();
    }
    console.log("Thanks for playing!");

}
