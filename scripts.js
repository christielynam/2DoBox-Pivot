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
$('.input-title, .input-task').on('input', disableSave)

function disableSave () {
  var inputTitleVal = $('.input-title').val()
  var inputTaskVal = $('.input-task').val()
  if (inputTitleVal == '' || inputTaskVal == '') {
		$('.button-save').prop('disabled', true)
	} else {
		$('.button-save').prop('disabled', false)
	}
}


/*=======================================
>>>>>>>>  Constructor / New  <<<<<<<<
========================================*/

function Task(title, task) {
	this.title = title;
	this.task = task;
	this.importance = 'Normal';
	this.id = Date.now();
}

$('.button-save').on('click', saveHandler);

function saveHandler () {
  saveInputs();
  clearInputs();
}

function saveInputs() {
  var title = $('.input-title').val();
  var task = $('.input-task').val();
  var todo = new Task(title, task)
  prepend(todo);
  sendToStorage(todo);
}

function clearInputs() {
  var title = $('.input-title');
  var task = $('.input-task');
  title.val('');
  task.val('');
  disableSave();
}



/*=======================================
>>>>>>>>  localStorage  <<<<<<<<
========================================*/

function grabObject(id) {
	var parsedObject = JSON.parse(localStorage.getItem(id))
	return parsedObject;
}

function sendToStorage(todo) {
	localStorage.setItem(todo.id, JSON.stringify(todo))
}


/*=======================================
>>>>>>>>  Click Events <<<<<<<<
========================================*/

$('body').on('click', '.upvote-image', upvote)

$('body').on('click', '.downvote-image', downvote)

function upvote(){
  var id = $(this).closest('.card').prop('id');
  var cardObj = grabObject(id);
  cardObj.importance = incrementImportance(cardObj.importance)
  sendToStorage(cardObj)
  $(this).siblings('#importance').text(cardObj.importance)
}

function downvote(){
  var id = $(this).closest('.card').prop('id');
  var cardObj = grabObject(id);
  cardObj.importance = decrementImportance(cardObj.importance)
  sendToStorage(cardObj)
  $(this).siblings('#importance').text(cardObj.importance)
}

function importanceArr() {
  return ['None', 'Low', 'Normal', 'High', 'Critical'];
}

function incrementImportance(importance) {
  var importanceArray = importanceArr()
  var index = importanceArray.indexOf(importance);
  if (index === importanceArray.length - 1) {
    return importanceArray[index]
  } else {
    return importanceArray[index + 1]
  }
}

function decrementImportance(importance) {
  var importanceArray = importanceArr()
  var index = importanceArray.indexOf(importance);
  if (index === 0) {
    return importanceArray[index]
  } else {
    return importanceArray[index - 1]
  }
}

$('body').on('click', '.delete-image', deleteCard)

function deleteCard() {
  localStorage.removeItem($(this).closest('.card').prop('id'));
	$(this).closest('.card').remove('.card');
}

/*=======================================
>>>>>>>>  Prepend  <<<<<<<<
========================================*/

function prepend(todo) {
	console.log(todo.id);
	$('.card-container').prepend(`
    <article id="${todo.id}" class="card">
	    <div class="text-wrapper">
				<h3 class="card-header" contenteditable="true">${todo.title}</h3>
	    	<button id="delete-image" class="delete-image" type="button" name="button"></button>
				<p class="card-body" contenteditable="true">${todo.task}</p>
			</div>
	    <section class="card-footer">
				<button id="upvote-image" class="upvote-image" type="button" name="button"></button>
				<button class="downvote-image" type="button" name="button"></button>
	    	<h3 class="h3-footer">importance:</h3><h3 id="importance">${todo.importance}</h3>
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
    if ($(this).text().toLowerCase().indexOf(searchInput) < 0) {
      $(this).hide();
    } else {
      $(this).show();
    }
  });
}

// May need some adjustements
$('body').on('keydown', '.card-header, .card-body', hitReturn)

function hitReturn() {
  var keyDownEvent = arguments[0]
  console.log($(this))
  if (keyDownEvent.keyCode == 13){
    $(this).blur()
  }
}

$('body').on('blur', '.card-header, .card-body', editTasks)

function editTasks(){
  var id = $(this).closest('.card').prop('id');
  var parsedObject = JSON.parse(localStorage.getItem(id))
  var className = $(this).prop('class');
  var key = checkTarget(className);
  parsedObject[key] = $(this).text()
  localStorage.setItem(id, JSON.stringify(parsedObject))
}


function checkTarget(target) {
  if (target === 'card-body'){
    return 'task'
  }
  return 'title'
}
