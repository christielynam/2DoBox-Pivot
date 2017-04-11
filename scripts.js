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

Idea.prototype.changeQuality = function(quality, buttonPressed) {
  var qualityArray = ['swill', 'plausible', 'genius']

  //TODO: Build functionality for changing quality up and down
  var index = qualityArray.indexOf(quality)
  console.log(index)
};


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


// Grab object and store object are only being used for quality indicators
function grabObject(id) {
	var parsedObject = JSON.parse(localStorage.getItem(id))
	return parsedObject;
}

function storeObject(id, newObject) {
	localStorage.setItem(id, JSON.stringify(newObject))
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

// REFACTORING INTO PROTOTYPE

$('.card').on('click', '.upvote-image', function() {
	var id = $(this).parent().parent().prop('id');
	var newObject = grabObject(id)
	var parshedQuality = grabObject(id).quality

	if (parshedQuality == 'swill') {
		newObject.quality = 'plausible'
		$(this).siblings().last().text('plausible')
		storeObject(id, newObject)

	} else if (parshedQuality == 'plausible') {
		newObject.quality = 'genius'
		$(this).siblings().last().text('genius')
		storeObject(id, newObject)
	}
})

$('.card').on('click', '.downvote-image', function() {
	var id = $(this).parent().parent().prop('id');
	var newObject = grabObject(id)
	console.log('newobj' + newObject)
	var parshedQuality = grabObject(id).quality

	if (parshedQuality == 'genius') {
		newObject.quality = 'plausible'
		$(this).siblings().last().text('plausible')
		storeObject(id, newObject)

	} else if (parshedQuality == 'plausible') {
		newObject.quality = 'swill'
		$(this).siblings().last().text('swill')
		storeObject(id, newObject)
	}
})


//change parent to closest
$('.card').on('click', '.delete-image', function() {
	localStorage.removeItem($(this).parent().parent().prop('id'));
	$(this).parent().parent().remove('.card');
});

/*=======================================
>>>>>>>>  Prepend  <<<<<<<<
========================================*/

function prepend(idea) {
	console.log(idea.id);
	$('.card-container').prepend(`
    <article id="${idea.id}" class="card">
	    <div class='text-wrapper'>
				<input type="text" class='new-idea-header' value='${idea.title}' maxlength="30" size="35">
	    	<button id='delete-image' class="delete-image" type="button" name="button"></button>
				<textarea rows="4" cols="42" id='new-idea-body' class='new-idea-body' value="">${idea.body}</textarea>
			</div>
	    <section class="new-idea-footer">
				<button id="upvote-image" class="upvote-image" type="button" name="button"></button>
				<button class="downvote-image" type="button" name="button"></button>
	    	<h3 class="h3-footer">quality:</h3><h3 id="quality">${idea.quality}</h3>
	    </section>
    </articl>
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

// function hitReturn(e, selector) {
//   console.log(e.which);
//   console.log(selector);
//   if (e.which == 13) {
//     console.log($(selector))
// 		$(selector).blur()
// 	}
// }
//
//
//
// $('body').on('keydown', '.input-title, .input-body, .input-search, .new-idea-header, .new-idea-body', function(e){
//   if (e.which == 13) {
//     $(this).blur()
//   }
// })
