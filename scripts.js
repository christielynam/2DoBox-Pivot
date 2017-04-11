/*=======================================
   >>>>>>>>  Event Listeners  <<<<<<<<
========================================*/
pageLoad();

function pageLoad() {
  for (var i = 0; i < localStorage.length; i++) {
    console.log(i);
    prepend(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }
}
$('.input-title, .input-body').on('input', disableSave)

function disableSave () {
  var inputTitleVal = $('.input-title').val()
  var inputBodyVal = $('.input-body').val()
  if (inputTitleVal == '' || inputBodyVal == '') {
		$('.button-save').attr('disabled', true)
	} else if (inputTitleVal == 'Title') {
		$('.button-save').attr('disabled', true)
	} else if (inputBodyVal == 'Body') {
		$('.button-save').attr('disabled', true)
	} else {
		$('.button-save').attr('disabled', false)
	}
}


/*=======================================
>>>>>>>>  Constructor / New  <<<<<<<<
========================================*/

function Idea(title, body) {
	this.title = title;
	this.body = body;
	this.quality = 'swill';
	this.id = Date.now();
}

$('.button-save').on('click', saveInputs);

function saveInputs() {
  var title = $('.input-title').val();
  var body = $('.input-body').val();
  var idea = new Idea(title, body)
  prepend(idea);
  sendToStorage(idea);
}

/*=======================================
>>>>>>>>  localStorage  <<<<<<<<
========================================*/

function grabObject(id) {
	var parsedObject = JSON.parse(localStorage.getItem(id))
	return parsedObject;
}

function sendToStorage(idea) {
	localStorage.setItem(idea.id, JSON.stringify(idea))
}

$('.card').on('blur', '.new-idea-header', function() {
	editTitle(this)
})

$('.card').on('blur', '.new-idea-body', function() {
  editBody(this)
})

function editTitle(element){
  var id = $(element).parent().parent().prop('id');
	var parsedObject = JSON.parse(localStorage.getItem(id))
	parsedObject.title = $(element).text()
	localStorage.setItem(id, JSON.stringify(parsedObject))
}

function editBody(element) {
  var id = $(element).parent().parent().prop('id');
  var parsedObject = JSON.parse(localStorage.getItem(id))
  parsedObject.body = $(element).val()
  localStorage.setItem(id, JSON.stringify(parsedObject))
}

/*=======================================
>>>>>>>>  Click Events <<<<<<<<
========================================*/

$('.card').on('click', '.upvote-image', upvoteQuality)

$('.card').on('click', '.downvote-image', downvoteQuality)

function upvoteQuality(){
  var id = $(this).closest('.card').prop('id');
  var cardObj = grabObject(id);
  cardObj.quality = incrementQuality(cardObj.quality)
  sendToStorage(cardObj)
  $(this).siblings('#quality').text(cardObj.quality)
}

function downvoteQuality(currentQuality){
  var id = $(this).closest('.card').prop('id');
  var cardObj = grabObject(id);
  cardObj.quality = decrementQuality(cardObj.quality)
  sendToStorage(cardObj)
  $(this).siblings('#quality').text(cardObj.quality)
}

function qualities() {
  return ['swill', 'plausible', 'genius'];
}

function incrementQuality(quality) {
  var qualityArray = qualities()
  var index = qualityArray.indexOf(quality);
  if (index === qualityArray.length - 1) {
    return qualityArray[index]
  } else {
    return qualityArray[index + 1]
  }
}

function decrementQuality(quality) {
  var qualityArray = qualities()
  var index = qualityArray.indexOf(quality);
  if (index === 0) {
    return qualityArray[index]
  } else {
    return qualityArray[index - 1]
  }
}

$('.card').on('click', '.delete-image', deleteCard)

function deleteCard() {
  localStorage.removeItem($(this).closest('.card').prop('id'));
	$(this).closest('.card').remove('.card');
}

/*=======================================
>>>>>>>>  Prepend  <<<<<<<<
========================================*/

function prepend(idea) {
	console.log(idea.id);
	$('.card-container').prepend(`
    <article id="${idea.id}" class="card">
	    <div class="text-wrapper">
				<h3 class="new-idea-header" contenteditable='true'>${idea.title}</h3>
	    	<button id="delete-image" class="delete-image" type="button" name="button"></button>
				<textarea rows="4" cols="42" id="new-idea-body" class="new-idea-body" value="">${idea.body}</textarea>
			</div>
	    <section class="new-idea-footer">
				<button id="upvote-image" class="upvote-image" type="button" name="button"></button>
				<button class="downvote-image" type="button" name="button"></button>
	    	<h3 class="h3-footer">quality:</h3><h3 id="quality">${idea.quality}</h3>
	    </section>
    </article>
    `);
}

/*=======================================
>>>>>>>>  Key Press / Key Up Events <<<<<<<<
========================================*/
$('.input-search').on('input', search)

function search() {
  var searchInput = $('.input-search').val().toLowerCase()
  $('.card').each(function(){
    if ($(this).text().indexOf(searchInput) < 0) {
      $(this).hide();
    } else {
      $(this).show();
    }
  });
}

$('.new-idea-header').on('keydown', function(e) {
  console.log(this)
  $(this).blur();
})
