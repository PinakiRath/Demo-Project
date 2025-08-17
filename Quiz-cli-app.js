let readlineSync = require("readline-sync");
let kuler = require("kuler"); 
let score = 0;

// Ask name
let userName = readlineSync.question("Enter your name: ");
console.log(kuler(`\nHello ${userName}, Welcome to Quizify 🎉\n`, "#11a0ccff"));

// Quiz database
const database = {
  data: [
    {
      question: `let a = {}, b = {};
console.log(a == b);
console.log(a === b);`,
      options: {
        a: "false false",
        b: "false true",
        c: "true false",
        d: "true true",
      },
      correctAnswer: "a",
    },
    {
      question: "Object.assign(target, source) creates which type of copy?",
      options: {
        a: "deep Copy",
        b: "shallow Copy",
        c: "Nested Copy",
        d: "Creates a new reference",
      },
      correctAnswer: "b",
    },
    {
      question: "Is method chaining possible with forEach?",
      options: {
        a: "Yes",
        b: "No",
      },
      correctAnswer: "b", // forEach returns undefined
    },
  ],
};

// Leaderboard
const leaderBoard = {
  data: [
    { name: "A", score: 1 },
    { name: "B", score: 3 },
    { name: "C", score: 2 },
  ],
};

// Game logic
function playGame(userAnswer, correctAnswer) {
  if (userAnswer === correctAnswer) {
    console.log(kuler("✅ Correct Answer\n", "#22c55e")); // green
    score++;
  } else {
    console.log(kuler("❌ Wrong Answer", "#dc2623")); // red
    console.log(kuler(`✔ Correct Answer is: ${correctAnswer}\n`, "#610dcfff")); // blue
  }
}

function showQuestionAndOptions(database) {
  for (let i = 0; i < database.data.length; i++) {
    console.log(kuler(`Q${i + 1}: ${database.data[i].question}`, "#facc15")); // yellow

    console.log("\nOptions: ");
    for (let key in database.data[i].options) {
      console.log(`${key} - ${database.data[i].options[key]}`);
    }

    let userAnswer = readlineSync
      .question("Enter your answer (a/b/c/d): ")
      .toLowerCase();

    playGame(userAnswer, database.data[i].correctAnswer);
  }
}

// Leaderboard display
function showHighScorer(leaderBoard) {
  leaderBoard.data.push({ name: userName, score: score });

  // sort copy to avoid mutating original
  let sortedScoreList = [...leaderBoard.data].sort((a, b) => b.score - a.score);

  console.log(kuler("\n🏆 Leaderboard 🏆", "#eab308"));
  sortedScoreList.forEach((leader, index) => {
    let display = `${index + 1}. ${leader.name} - ${leader.score}`;
    if (leader.name === userName) {
      console.log(kuler(display, "#10b981")); // highlight current user
    } else {
      console.log(display);
    }
  });
}

// Run the game
showQuestionAndOptions(database);
console.log(kuler(`\n🎯 Your final score is: ${score}/${database.data.length}`, "#38bdf8"));
showHighScorer(leaderBoard);
console.log(kuler(`\nThank you for playing, ${userName}!`, "#d6d308ff"));