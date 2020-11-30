var gQuestList = [];
var gNextId = 0;
var gCurrQuestIdx = 0;




function init() {
    var status = document.querySelector('.status');
    status.style.display = 'none';
    gCurrQuestIdx = 0;
    hideVictory();
    createQuests();
    renderQuest();

}

function showVictory() {
    var elVicPanel = document.querySelector('.victory-msg')
    var mainPanel = document.querySelector('.main-container');
    elVicPanel.style.display = 'block';
    mainPanel.style.display = 'none';

}

function hideVictory() {
    var elVicPanel = document.querySelector('.victory-msg');
    elVicPanel.style.display = 'none';
}

function checkAnswer(optIdx) {
    var status = document.querySelector('.status');
    var correctOpt = gQuestList[gCurrQuestIdx].correctOptIndex;
    if (optIdx.innerHTML === gQuestList[gCurrQuestIdx].opts[correctOpt]) {
        gCurrQuestIdx++;
        status.innerHTML = 'Correct!';
        status.style.color = 'green'
        status.style.display = 'block';
        if (gCurrQuestIdx < 3) {
            renderQuest(gCurrQuestIdx);
        }
        else showVictory();
    }
    else {
        status.innerHTML = 'Try Again';
        status.style.color = 'red';
        status.style.display = 'block';
    }
}

function renderQuest(questIdx = 0) {
    var status = document.querySelector('.status');
    status.style.display = 'none;'
    var elQuest = document.querySelector('.question');
    var elOptions = document.querySelectorAll('.answer-container span');
    var elPanel = document.querySelector('.main-container');
    var elQuestPhoto = document.querySelector('img');
    elPanel.style = 'transition: ease-in .2s;' + ' display: block;'
    elQuest.innerText = gQuestList[questIdx].quest;
    elOptions[0].innerText = gQuestList[questIdx].opts[0];
    elOptions[1].innerText = gQuestList[questIdx].opts[1];
    elQuestPhoto.src = `./utils/${questIdx}.jpg`;
}




function createQuests() {
    return gQuestList = [
        {
            id: gNextId++,
            quest: 'Which country does this flag belong to?',
            opts: [
                'Russia',
                'Netherlands'
            ],
            correctOptIndex: 1
        },
        {
            id: gNextId++,
            quest: 'What is Darth Vader saying?',
            opts: [
                'I am your father.',
                'Houston, we have a problem.'
            ],
            correctOptIndex: 0
        },
        {
            id: gNextId++,
            quest: 'What do you see in the photo?',
            opts: [
                'It\'s a bird... It\'s a plane... It\'s Superman',
                'A dog in a costume'
            ],
            correctOptIndex: 1
        }
    ]
}