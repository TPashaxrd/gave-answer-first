const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const questions = [
  { id: "q1", question: "What is the capital of France?", options: ["Paris", "Rome", "Madrid"], answer: 0 },
  { id: "q2", question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter"], answer: 1 },
  { id: "q3", question: "Who wrote 'Romeo and Juliet'?", options: ["William Shakespeare", "Mark Twain", "Jane Austen"], answer: 0 },
  { id: "q4", question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean"], answer: 2 },
  { id: "q5", question: "Which country is famous for the pyramids?", options: ["Mexico", "Egypt", "Peru"], answer: 1 },
  { id: "q6", question: "Who painted the Mona Lisa?", options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso"], answer: 0 },
  { id: "q7", question: "What is the tallest mountain in the world?", options: ["Mount Everest", "K2", "Mount Kilimanjaro"], answer: 0 },
  { id: "q8", question: "Which country is known as the Land of the Rising Sun?", options: ["China", "Japan", "Thailand"], answer: 1 },
  { id: "q9", question: "Who discovered penicillin?", options: ["Alexander Fleming", "Marie Curie", "Isaac Newton"], answer: 0 },
  { id: "q10", question: "Which is the smallest country in the world?", options: ["Monaco", "Vatican City", "San Marino"], answer: 1 },
  { id: "q11", question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze"], answer: 1 },
  { id: "q12", question: "Who wrote '1984'?", options: ["George Orwell", "Aldous Huxley", "F. Scott Fitzgerald"], answer: 0 },
  { id: "q13", question: "Which country invented pizza?", options: ["Italy", "USA", "France"], answer: 0 },
  { id: "q14", question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Gd"], answer: 0 },
  { id: "q15", question: "Which language is primarily spoken in Brazil?", options: ["Spanish", "Portuguese", "French"], answer: 1 },
  { id: "q16", question: "Who is known as the Father of Computers?", options: ["Alan Turing", "Charles Babbage", "Bill Gates"], answer: 1 },
  { id: "q17", question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra"], answer: 2 },
  { id: "q18", question: "Which planet is closest to the Sun?", options: ["Mercury", "Venus", "Earth"], answer: 0 },
  { id: "q19", question: "Who painted the Starry Night?", options: ["Claude Monet", "Vincent van Gogh", "Edvard Munch"], answer: 1 },
  { id: "q20", question: "Which is the largest desert in the world?", options: ["Sahara", "Gobi", "Antarctica"], answer: 2 },
  { id: "q21", question: "Which country hosted the 2016 Summer Olympics?", options: ["China", "Brazil", "UK"], answer: 1 },
  { id: "q22", question: "What is the currency of Japan?", options: ["Yen", "Won", "Dollar"], answer: 0 },
  { id: "q23", question: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen"], answer: 1 },
  { id: "q24", question: "Who wrote 'The Odyssey'?", options: ["Homer", "Virgil", "Sophocles"], answer: 0 },
  { id: "q25", question: "Which continent is known as the Dark Continent?", options: ["Africa", "Asia", "Europe"], answer: 0 },
];


let queue = [];
let rooms = {};

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  socket.on("joinQueue", () => {
    console.log(`${socket.id} joined the queue`);
    queue.push(socket);

    if (queue.length >= 2) {
      const player1 = queue.shift();
      const player2 = queue.shift();
      const roomId = `room-${player1.id}-${player2.id}`;
      const question = questions[Math.floor(Math.random() * questions.length)];

      rooms[roomId] = {
        players: [player1.id, player2.id],
        question,
        winner: null
      };

      player1.join(roomId);
      player2.join(roomId);

      io.to(roomId).emit("matchStart", { roomId, question });
    } else {
      socket.emit("waiting", { message: "Waiting for second player..." });
    }
  });

  socket.on("answer", ({ roomId, answer }) => {
    const room = rooms[roomId];
    if (!room || room.winner) return;

    const correct = room.question.answer === answer;
    room.winner = correct ? socket.id : room.players.find(p => p !== socket.id);

    io.to(roomId).emit("roundEnd", { winner: room.winner, correct });

    setTimeout(() => {
      if (!rooms[roomId]) return;
      const newQuestion = questions[Math.floor(Math.random() * questions.length)];
      rooms[roomId].question = newQuestion;
      rooms[roomId].winner = null;
      io.to(roomId).emit("matchStart", { roomId, question: newQuestion });
    }, 5000);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
    queue = queue.filter(s => s.id !== socket.id);

    for (const r in rooms) {
      if (rooms[r].players.includes(socket.id)) {
        const otherPlayer = rooms[r].players.find(p => p !== socket.id);
        if (otherPlayer) io.to(otherPlayer).emit("matchCancelled", { message: "Other player disconnected!" });
        delete rooms[r];
      }
    }
  });
});

app.get("/", (req,res)=>res.send("Backend is running!"));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
