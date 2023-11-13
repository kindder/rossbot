const questions = [
    "Avez-vous une expérience de plus d’un an dans un poste similaire ?",
    "Disposez-vous d’un bachelor en, gestion, ressources humaines, commerce ou en méthode quantitatives ?",
    "Maîtrisiez-vous les outils/logiciels de gestion, spécialement l’outil SAGE ?",
    "Est-ce que vous vous qualifiez comme une personne empathique ?",
    "Êtes-vous doté(e) d’un sens d’observation aiguisé ?",
    "Avez-vous géré(e) auparavant la digitalisation d’une fonction dans votre organisation précédente ?",
    "Avez-vous atteint vos objectifs qualitatifs au sein de votre précédente organisation ?",
    "Êtes-vous en poste actuellement ?",
    "Êtes-vous disponible pour travailler à temps plein, pendant des shifts variables ?",
    "Disposez vous d’un lieu fermé et équipé d’Internet de plus de 12 M pour travailler à distance en cas de besoin ?",
    "Êtes-vous disposé(e) à vous déplacer ou à travailler à distance si nécessaire ?"
];

let currentQuestion = 0;
let stopfun = false;
let qstsId = 1;

function fadeIn(element) {
    let opacity = 0;
    const interval = setInterval(function () {
        if (opacity < 1) {
            opacity += 0.1;
            element.style.opacity = opacity;
        } else {
            clearInterval(interval);
        }
    }, 70);
}

function NextQuestion() {
    if (!stopfun) {
        const question = questions[currentQuestion];
        const chatBox = document.getElementById("chat-box");
        chatBox.innerHTML += `
            <br/><br/>
            <p class='q${currentQuestion + 1}' style="opacity: 0;">${question}</p><br>
            <button class="q${qstsId} btn  btn-yes" onclick="showNextQuestion()">Oui</button>
            <button class="q${qstsId} btn  btn-no" onclick="showNextQuestion()">Non</button>
        `;
        fadeIn(document.querySelector(`.q${currentQuestion + 1}`));
        stopfun = true;
    }
    var disableStart = document.getElementById('start');
    disableStart.disabled = true;

    document.body.scrollTop = document.body.scrollHeight;
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
}

function showNextQuestion() {
    if (qstsId < questions.length) {
        const question = questions[qstsId];
        const chatBox = document.getElementById("chat-box");
        chatBox.innerHTML += `
          <br/><br/>
          <p class='q${qstsId + 1} bubble' style="opacity: 0;">${question}</p><br>
          <button class="q${qstsId + 1} btn  btn-yes" onclick="showNextQuestion()">Oui</button>
          <button class="q${qstsId + 1} btn  btn-no" onclick="showNextQuestion()">Non</button>
        `;
        fadeIn(document.querySelector(`.q${qstsId + 1}`));
        qstsId++;

        const previousButtons = document.querySelectorAll(`button.q${qstsId - 1}.btn-yes, button.q${qstsId - 1}.btn-no`);
        previousButtons.forEach(button => {
            button.disabled = true;
        });

        const lastButtons = document.querySelectorAll(`button.q${qstsId}.btn-yes, button.q${qstsId}.btn-no`);
        lastButtons.forEach(button => {
            button.disabled = false;
        });
    } else {
        const chatBox = document.getElementById("chat-box");
        chatBox.innerHTML = "<h4 align='center'>Votre candidature a été transmise avec succès. Nous traitons actuellement votre candidature. Cette étape est conditionnée par la transmission de vos documents. Vous recevrez un courriel vous permettant de téléverser une copie de votre CV et une copie de votre lettre de motivation.</h4>";
    }

    document.body.scrollTop = document.body.scrollHeight;
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
}
