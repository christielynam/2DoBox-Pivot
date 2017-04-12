/*=======================================
   >>>>>>>>  Event Listeners  <<<<<<<<
========================================*/
loadToDOM();

function loadToDOM() {
  var storedArray = objArray();
  // Edit stored array to hold only the last 10 items
  storedArray.forEach(function(card){
    prepend(card);
  })
  showOrHideComplete(storedArray);
}

function spliceArray(storedArray) {
  var splicedArray = storedArray.splice(0, storedArray.length - 10);

}

function objArray() {
  var newArray = [];
  for (var i = 0; i < localStorage.length; i++) {
    newArray.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }
  return newArray;
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
  this.completed = false;
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
  $(this).siblings('.importance').text(cardObj.importance)
}

function downvote(){
  var id = $(this).closest('.card').prop('id');
  var cardObj = grabObject(id);
  cardObj.importance = decrementImportance(cardObj.importance)
  sendToStorage(cardObj)
  $(this).siblings('.importance').text(cardObj.importance)
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
	    	<h3 class="h3-footer">importance:</h3><h3 class="importance">${todo.importance}</h3>
        <button class="completed-task" type="button"
        name="completed-task">Completed Task</button>
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

// TODO: slight refactoring required
$('body').on('click', '.completed-task', function() {
  var $card = $(this).closest('.card');
  var $cardBody = $card.find('.card-body');
  var $cardHeader = $card.find('.card-header');
  var $completeButton = $card.find('.completed-task');
  var cardObj = grabObject($card.prop('id'));
  checkCompleted(cardObj, $cardBody, $cardHeader, $completeButton);
  cardObj.completed = !cardObj.completed;
  sendToStorage(cardObj);
})

function checkCompleted(cardObj, $cardBody, $cardHeader, $completeButton) {
  if (cardObj.completed){
    $completeButton.removeClass('selected');
    $cardBody.removeClass('strikethrough');
    $cardHeader.removeClass('strikethrough');
  } else {
    $completeButton.addClass('selected');
    $cardBody.addClass('strikethrough');
    $cardHeader.addClass('strikethrough');
  }
}

function showOrHideComplete() {
  var storedArray = objArray();
  storedArray.forEach(function(cardObject) {
    var cardID = cardObject.id;
    if (cardObject.completed){
      $('#' + cardID).toggle()
    }
  });
}

$('.show-btn').on('click', showOrHideComplete)


/*=======================================
>>>>>>>>  Filter Buttons <<<<<<<<
========================================*/
$('body').on('click', '.filter-btn', filterImportance)

function filterImportance(){
  var importance = $(this).text();
  checkSelected($(this));
  $('.importance').each(function(){
    if ($(this).text().indexOf(importance) < 0) {
      $(this).closest('.card').hide();
    } else {
      $(this).closest('.card').show();
    }
  });
}

function checkSelected(target) {
  $('.filter-btn.selected').removeClass('selected');
  target.addClass('selected');
}
