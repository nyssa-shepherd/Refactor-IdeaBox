var saveBtn = $('.save-btn');
var cardContainer = $('.bottom-box');
var qualityArray = ['swill', 'plausible', 'genius'];

saveBtn.on('click', submitCard);
cardContainer.on('click', '.delete-button', deleteCard);
cardContainer.on('click', changeQuality);
$('input').on('keyup', enableSaveBtn);


function CardObject(title, body, id) {
    this.title = title;
    this.body = body;
    this.id = id;
    this.counter = 0;
};

function createNewCard(object) {
    cardContainer.prepend(
                            `<article id="${object.id}">
                                <h1 class="card-title" contenteditable="true">${object.title}</h1>
                                <button class="delete-button" aria-label="delete button"></button>
                                <p class="card-body" contenteditable="true">${object.body}</p>
                                <button class="upvote" aria-label="upvote button"></button>
                                <button class="downvote" aria-label="downvote button"></button>
                                <h2>
                                    priority: 
                                    <span id="quality">${qualityArray[object.counter]}</span>
                                </h2>
                            `
    );
};

function submitCard() {
    event.preventDefault();
    var cardObject = new CardObject($('#title-input').val(), $('#body-input').val(), Date.now());
    createNewCard(cardObject);
    addToLocalStorage(cardObject);
    $('form')[0].reset();
};

function enableSaveBtn() {
    if($('#title-input').val() === '' || $('#body-input').val() === '') {
        saveBtn.attr('disabled', true);
    } else {
        saveBtn.attr('disabled', false);
    }
};

function deleteCard() {
    this.closest('article').remove();
    // localStorage.removeItem('article');
};

function addToLocalStorage(cardObject) {
    var stringifiedObject = JSON.stringify(cardObject);
    localStorage.setItem(cardObject.id, stringifiedObject);
};

$.each(localStorage, function(key){
    var cardData = JSON.parse(this);
    $( ".bottom-box" ).prepend(createNewCard(cardData));
});

function retrieveObjectAndParse(id) {
  var jsonObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(jsonObject);
  return parsedObject;
}

function changeQuality(event) {
    var parsedObject = retrieveObjectAndParse($(event.target).parent('article').attr('id'));
    if(event.target.className === 'upvote') ? parsedObject.counter++ : parsedObject.counter--;
    if(parsedObject.counter > 4) {parsedObject.counter = 4;}
    if(parsedObject.counter < 0) {parsedObject.counter = 0;}
    $(event.target).siblings('h2').find('#quality').text(qualityArray[parsedObject.counter]);
    addToLocalStorage(parsedObject);
}

  










