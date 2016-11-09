Hangman = function () {


    var lives;
    var wordToGuess = "book";
    var numberOfLetterToGuess;

    /**
     * This is helper method for drawing the stickman according to the remaining lives
     */
    var drawTheStickman = function () {
        var drawMe = lives;

        if (drawMe == 0) {
            drawTheHead();
        } else {
            drawStraightLine(drawArray[drawMe - 1]);
        }
    };

    /**
     *
     * @returns {CanvasRenderingContext2D}
     */
    var getHangmanFigureContext = function () {
        var myStickman = document.getElementById("myCanvas");
        return myStickman.getContext('2d');
    };

    var setStickmanCanvasSize = function () {
        var myStickman = document.getElementById("myCanvas");
        myStickman.width = "700";
        myStickman.height = "500";
    };

    /**
     * This method is initializing the the canvas properties.
     */
    var initializeCanvas = function () {
        setStickmanCanvasSize();
        var context = getHangmanFigureContext();
        context.beginPath();
        context.strokeStyle = "#000000";
        context.lineWidth = 4;
    };

    /**
     * This method responsible on the drawing of the stickman head on the canvas
     */
    var drawTheHead = function () {
        var context = getHangmanFigureContext();
        context.beginPath();
        context.arc(296, 127, 10, 0, Math.PI * 2, true);
        context.stroke();
    };

    /**
     * This method draw the stickman on canvas according to given coordinates.
     * @param {x1, y1, x2, y2} coordinates
     */
    var drawStraightLine;
    drawStraightLine = function (coordinates) {
        var context = getHangmanFigureContext();
        context.moveTo(coordinates.x1, coordinates.y1);
        context.lineTo(coordinates.x2, coordinates.y2);
        context.stroke();
    };

    var frame1Coordinates = {
        x1: 200,
        y1: 490,
        x2: 500,
        y2: 490
    };

    var frame2Coordinates = {
        x1: 200,
        y1: 0,
        x2: 200,
        y2: 600
    };

    var frame3Coordinates = {
        x1: 200,
        y1: 100,
        x2: 300,
        y2: 100
    };

    var frame4Coordinates = {
        x1: 296,
        y1: 100,
        x2: 296,
        y2: 120
    };

    var torsoCoordinates = {
        x1: 296,
        y1: 132,
        x2: 296,
        y2: 190
    };

    var rightArmCoordinates = {
        x1: 296,
        y1: 140,
        x2: 312,
        y2: 170
    };

    var leftArmCoordinates = {
        x1: 296,
        y1: 140,
        x2: 280,
        y2: 170
    };

    var rightLegCoordinates = {
        x1: 296,
        y1: 190,
        x2: 312,
        y2: 210
    };

    var leftLegCoordinates = {
        x1: 296,
        y1: 190,
        x2: 280,
        y2: 210
    };

    var drawArray = [rightLegCoordinates, leftLegCoordinates, rightArmCoordinates, leftArmCoordinates, torsoCoordinates, frame4Coordinates, frame3Coordinates, frame2Coordinates, frame1Coordinates];

    var toggleStylesDropdownVisibility = function () {
        document.getElementById('Dropdown').classList.toggle('dropdown-show')
    };

    /**
     * This method check if the guessing letter is exists in the word to guess.
     * @param letter
     * @returns {lives} the number of guess remain
     */
    var check = function (letter) {
        if (wordToGuess.indexOf(letter) != -1) {

            //replace all occurrences of the letter
            for (var i = 0, len = wordToGuess.length; i < len; i++) {
                if (wordToGuess[i] == letter.toLowerCase()) {
                    numberOfLetterToGuess --;
                    var letterSpanElement = document.createElement("span");
                    letterSpanElement.className = "guess-word";
                    var innerSpanText = document.createTextNode(letter);
                    letterSpanElement.appendChild(innerSpanText);
                    var wordToGuessElement = document.getElementById("playword");
                    var arryOfSpanElement = wordToGuessElement.querySelectorAll("span");
                    wordToGuessElement.replaceChild(letterSpanElement, arryOfSpanElement[i]);

                }

            }

            if(numberOfLetterToGuess == 0){
                document.getElementById("alert-zone").innerHTML = "You won The Game!";
                document.getElementById("submitL").disabled = true;
                document.getElementById("guess").disabled = true;

            }

        } else {
            //draw stickman
            drawTheStickman();
            lives--;
            if (lives < 0) {
                document.getElementById("alert-zone").innerHTML = "You are dead!";
                document.getElementById("submitL").disabled = true;
                document.getElementById("guess").disabled = true;
            }

        }
        document.getElementById("guess").value = '';
        return lives;
    };

    /**
     * method that crate and display the word to guess on the screen, for each letter a blank span is crated.
     * @returns {Element}
     */
    var displayWordWithEmptyLetters = function () {
        var wordGameElement = document.getElementById("playword");
        var wordLength = wordToGuess.length;

        while (wordGameElement.firstChild) {
            wordGameElement.removeChild(wordGameElement.firstChild);
        }

        // creates a span for each letter in the word the user needs to guess
        for (var i = 0; i < wordLength; i++) {

            var letterSpanElement = document.createElement("span"); // todo: try to put the text inside the element
            var innerSpanText = document.createTextNode("\u00A0\u00A0");
            letterSpanElement.className = "guess-word";
            letterSpanElement.appendChild(innerSpanText);
            wordGameElement.appendChild(letterSpanElement);
        }

        return wordGameElement;

    };


    // method that starts the game, initializes the user's state and selects randomly a new word to guess.
    // this method draws the HTML on the screen
    // returns ??
    var startGame = function () {

        numberOfLetterToGuess = wordToGuess.length;
        lives =9;


        var alertZoneElmenet = document.getElementById("alert-zone");
        alertZoneElmenet.innerHTML = "You are alive!";
        var flagGlob = 1;
        setInterval(myTimer, 500);

        function myTimer() {
            if (flagGlob == 1) {
                flagGlob = flagGlob * -1;
                alertZoneElmenet.style.visibility = "hidden";
            } else {
                flagGlob = flagGlob * -1;
                alertZoneElmenet.style.visibility = "visible";
            }
        }

        initializeCanvas();
        displayWordWithEmptyLetters();
    };


// Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {

            //this loop over all the elements with type class dropdown-content in the application
            var dropdowns = document.getElementsByClassName("dropdown-content");
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('dropdown-show')) {
                    openDropdown.classList.remove('dropdown-show');
                }
            }
        }
    };

    var cssDropdownElement = document.getElementById('theme_css');

    var changeThemeToBlackAndWhite  = function (){
        cssDropdownElement.href = '../css/theme-black-and-white.css';
    };
    var changeThemeToPinkish  = function (){
        cssDropdownElement.href = '../css/theme-pinkish.css';
    };
    var changeThemeToDefualt  = function (){
        cssDropdownElement.href = '../css/theme-default.css';
    }

    return {
        startGame: startGame,
        check: check,
        toggleStylesDropdownVisibility: toggleStylesDropdownVisibility,
        changeThemeToBlackAndWhite: changeThemeToBlackAndWhite,
        changeThemeToPinkish: changeThemeToPinkish,
        changeThemeToDefualt: changeThemeToDefualt,

    }
};
