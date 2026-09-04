const questions = [
    {
        question: "Quel est le feu de circulation qui signifie arrêt obligatoire?",
        options: ["Vert", "Rouge", "Orange", "Blanc"],
        correct: 1
    },
    {
        question: "Qu'indique un feu orange clignotant?",
        options: ["Avancer avec prudence", "Arrêt obligatoire", "Cédez le passage", "Route fermée"],
        correct: 0
    },
    {
        question: "Quelle est la vitesse maximale autorisée en ville au Sénégal?",
        options: ["30 km/h", "40 km/h", "50 km/h", "60 km/h"],
        correct: 2
    },
    {
        question: "Qu'indique un panneau triangulaire avec bordure rouge?",
        options: ["Obligation", "Avertissement", "Interdiction", "Information"],
        correct: 1
    },
    {
        question: "Est-il autorisé de stationner sur un passage piéton?",
        options: ["Oui, si la route est vide", "Non, jamais", "Oui, pour quelques minutes", "Oui, le soir"],
        correct: 1
    },
    {
        question: "Quel est le permis requis pour conduire une voiture particulière?",
        options: ["Permis A", "Permis B", "Permis C", "Permis D"],
        correct: 1
    },
    {
        question: "Qu'indique une ligne blanche continue au sol?",
        options: ["Interdiction de dépasser", "Dépassement autorisé", "Voie réservée", "Stationnement autorisé"],
        correct: 0
    },
    {
        question: "Quel est l'âge minimum pour conduire au Sénégal?",
        options: ["16 ans", "17 ans", "18 ans", "19 ans"],
        correct: 2
    },
    {
        question: "Qu'indique un panneau carré bleu?",
        options: ["Obligation", "Interdiction", "Avertissement", "Danger"],
        correct: 0
    },
    {
        question: "Quelle est la distance de sécurité entre deux véhicules?",
        options: ["1 mètre", "5 mètres", "Moitié de la vitesse en mètres", "10 mètres"],
        correct: 2
    }
];

let currentQuestion = 0;
let selectedAnswers = new Array(questions.length).fill(null);

function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function startQuiz() {
    currentQuestion = 0;
    selectedAnswers = new Array(questions.length).fill(null);
    showSection('quiz');
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('questionText').textContent = q.question;
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    document.getElementById('progressFill').style.width = ((currentQuestion + 1) / questions.length) * 100 + '%';
    
    const container = document.getElementById('answersContainer');
    container.innerHTML = '';
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'answer-option' + (selectedAnswers[currentQuestion] === i ? ' selected' : '');
        btn.textContent = opt;
        btn.onclick = () => { selectedAnswers[currentQuestion] = i; loadQuestion(); };
        container.appendChild(btn);
    });
    
    document.getElementById('nextBtn').disabled = selectedAnswers[currentQuestion] === null;
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    let score = 0;
    selectedAnswers.forEach((ans, i) => {
        if (ans === questions[i].correct) score++;
    });
    
    const percent = Math.round((score / questions.length) * 100);
    document.getElementById('scoreValue').textContent = percent;
    
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';
    selectedAnswers.forEach((ans, i) => {
        const isCorrect = ans === questions[i].correct;
        const item = document.createElement('div');
        item.className = 'result-item ' + (isCorrect ? 'correct' : 'incorrect');
        item.innerHTML = `
            <div><strong>${i+1}. ${questions[i].question}</strong></div>
            <div>Votre réponse: ${questions[i].options[ans]} ${isCorrect ? '✓' : '✗'}</div>
        `;
        resultsList.appendChild(item);
    });
    
    showSection('results');
}

function showAbout() {
    showSection('about');
}

function backHome() {
    showSection('home');
}

showSection('home');