<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Time Traveler Quiz Adventure</title>
    <style>
        /* General Styles */
        body {
            font-family: Arial, sans-serif;
            color: #ffffff;
            text-align: center;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-size: cover;
            background-repeat: no-repeat;
        }

        .game-container {
            max-width: 600px;
            padding: 20px;
            background-color: rgba(0, 0, 0, 0.7);
            border-radius: 10px;
        }

        h1 {
            font-size: 2em;
            margin-bottom: 10px;
        }

        /* Power Bar */
        .power-bar {
            background-color: #333;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 20px;
            height: 20px;
            width: 100%;
        }

        .power-level {
            height: 100%;
            background-color: #00ff00;
            width: 100%; /* Starts at full power */
            transition: width 0.3s;
        }

        /* Time Machine Panel */
        .time-machine {
            display: flex;
            justify-content: space-around;
            align-items: center;
            background-color: #2e2e2e;
            border: 3px solid #888;
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 20px;
            color: #00ff00;
        }

        .time-machine-panel {
            width: 120px;
            height: 80px;
            background-color: #444;
            border-radius: 8px;
            border: 2px solid #222;
            box-shadow: 0 0 10px #00ff00;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5em;
            color: #00ff00;
        }

        .time-dial {
            width: 50px;
            height: 50px;
            border: 2px solid #888;
            border-radius: 50%;
            background: radial-gradient(circle, #666, #333);
            position: relative;
            animation: rotateDial 2s infinite linear;
        }

        /* Flashing Lights */
        .light {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            margin: 0 5px;
            background-color: red;
            box-shadow: 0 0 5px red;
            animation: flash 1s infinite alternate;
        }

        .light.green { background-color: green; box-shadow: 0 0 5px green; }
        .light.yellow { background-color: yellow; box-shadow: 0 0 5px yellow; }

        /* Animations */
        @keyframes rotateDial {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        @keyframes flash {
            0% { opacity: 0.5; }
            100% { opacity: 1; }
        }

        /* Question and Answer Styles */
        .question-container {
            background-color: #333;
            padding: 20px;
            border-radius: 8px;
        }

        #choices button {
            display: block;
            margin: 10px 0;
            padding: 10px;
            background-color: #555;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        #next {
            display: none;
            padding: 10px 20px;
            background-color: #007acc;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
        }

        #feedback, #score {
            margin-top: 20px;
            font-size: 1.2em;
        }
    </style>
</head>
<body>
    <div class="game-container">
        <h1>Time Traveler Quiz Adventure</h1>
        
        <!-- Power Bar -->
        <div class="power-bar">
            <div class="power-level" id="power-level"></div>
        </div>

        <!-- Time Machine Panel -->
        <div class="time-machine">
            <div class="time-machine-panel">
                Era: <span id="era-display">Start</span>
            </div>
            <div class="time-dial"></div>
            <div class="light red"></div>
            <div class="light yellow"></div>
            <div class="light green"></div>
        </div>
        
        <div class="question-container">
            <p id="question"></p>
            <div id="choices"></div>
        </div>
        <button id="next" onclick="nextQuestion()">Next</button>
        <p id="feedback"></p>
        <p id="score"></p>
    </div>

    <script>
        const questions = [
            { era: "Ancient Egypt", question: "Who was the first female pharaoh of Egypt?", choices: ["Cleopatra", "Nefertiti", "Hatshepsut", "Nefertari"], correct: 2 },
            { era: "Medieval Europe", question: "In what year did the Battle of Hastings take place?", choices: ["1066", "1215", "1347", "1453"], correct: 0 },
            { era: "Renaissance Italy", question: "Who painted the Mona Lisa?", choices: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"], correct: 0 },
        ];

        let currentQuestionIndex = 0;
        let score = 0;
        let powerLevel = 100;

        function loadQuestion() {
            const questionData = questions[currentQuestionIndex];
            document.getElementById("era-display").textContent = questionData.era;
            document.getElementById("question").textContent = questionData.question;
            document.getElementById("choices").innerHTML = "";

            questionData.choices.forEach((choice, index) => {
                const button = document.createElement("button");
                button.textContent = choice;
                button.onclick = () => checkAnswer(index);
                document.getElementById("choices").appendChild(button);
            });
        }

        function checkAnswer(selected) {
            const questionData = questions[currentQuestionIndex];
            if (selected === questionData.correct) {
                score += 10;
                document.getElementById("feedback").textContent = "Correct! You've moved closer to the present.";
            } else {
                score -= 5;
                powerLevel -= 10;
                document.getElementById("feedback").textContent = "Incorrect! You've been transported to another era.";
                currentQuestionIndex = Math.floor(Math.random() * questions.length);
            }

            document.getElementById("power-level").style.width = powerLevel + "%";
            document.getElementById("next").style.display = "block";
            document.getElementById("score").textContent = `Score: ${score}`;
            checkGameOver();
        }

        function checkGameOver() {
            if (powerLevel <= 0) {
                document.getElementById("question").textContent = "Game Over! Your power supply is depleted.";
                document.getElementById("choices").innerHTML = "";
                document.getElementById("next").style.display = "none";
            } else if (currentQuestionIndex >= questions.length) {
                showRank();
            }
        }

        function nextQuestion() {
            currentQuestionIndex++;
            if (currentQuestionIndex >= questions.length) {
                showRank();
            } else {
                loadQuestion();
                document.getElementById("next").style.display = "none";
                document.getElementById("feedback").textContent = "";
            }
        }

        function showRank() {
            let rank;
            if (score >= 30) rank = "Time Guardian";
            else if (score >= 20) rank = "Master Historian";
            else if (score >= 10) rank = "Chrono Explorer";
            else rank = "Apprentice Time Traveler";
            
            document.getElementById("question").textContent = `Congratulations! You've completed the game as a ${rank}.`;
            document.getElementById("choices").innerHTML = "";
            document.getElementById("next").style.display = "none";
        }

        loadQuestion();
    </script>
</body>
</html>
