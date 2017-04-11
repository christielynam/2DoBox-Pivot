/*=======================================
   >>>>>>>>  Event Listeners  <<<<<<<<
========================================*/
$(document).ready(function() {
	for (var i = 0; i < localStorage.length; i++) {
		prepend(JSON.parse(localStorage.getItem(localStorage.key(i))));
	}
});
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



// Move to top
$('.new-idea-article').on('input', '.new-idea-header', function() {
	editTitle(this)
})

$('.new-idea-article').on('input', '.new-idea-body', function() {
  editBody(this)
})

function editTitle(element){
  var id = $(element).parent().parent().prop('id');
	var parsedObject = JSON.parse(localStorage.getItem(id))
	parsedObject.title = $(element).val()
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

$('.new-idea-article').on('click', '.upvote-image', function() {
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

$('.new-idea-article').on('click', '.downvote-image', function() {
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

$('.new-idea-article').on('click', '.delete-image', function() {
	localStorage.removeItem($(this).parent().parent().prop('id'));
	$(this).parent().parent().remove('.new-idea-article');
});

/*=======================================
>>>>>>>>  Prepend  <<<<<<<<
========================================*/

function prepend(idea) {
	console.log(idea.id);
	$('.new-idea-article').prepend(`
    <div id="${idea.id}" class="new-idea-article">
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
    </div>
    `);
}

/*=======================================
>>>>>>>>  Key Press / Key Up Events <<<<<<<<
========================================*/

$('.input-search').on('keyup', function() {
	var searchInput = $(this).val().toLowerCase();
	$('.text-wrapper').each(function() {
    console.log(this);
		var cardText = $(this).text().toLowerCase();

		if (cardText.indexOf(searchInput) != -1) {
			$(this).parent().show();
		} else {
			$(this).parent().hide();
		}
	})
})

$('.input-title').keypress(function(e) {
  console.log(e)
	if (e.which == 13) {
		$(this).blur()
	}
});

$('.input-body').keypress(function(e) {
	if (e.which == 13) {
		$(this).blur()
	}
});

$('.input-search').keypress(function(e) {
	if (e.which == 13) {
		$(this).blur()
	}
});

$('.new-idea-header').keypress(function(e) {
	if (e.keyCode == 13) {
		$(this).blur()
	}
});
