// $(document).ready(function() {
// 	$(".form").submit(function(event) {
// 		event.preventDefault();
// 		console.log("preventdefault works")
//
//
// 	});
// });

$(document).ready(function() {
	for (var i = 0; i < localStorage.length; i++) {
		prepend(JSON.parse(localStorage.getItem(localStorage.key(i))));
	}
});

// Clear input fields on click
$('#input-title').on('click', function() {
	$('#input-title').val(" ")
})
$('#input-body').on('click', function() {
	$('#input-body').val(" ")
})

//constructor function
function Idea(title, body) {
	this.title = title;
	this.body = body;
	this.quality = "swill"
	this.id = Date.now();
}

// On click, grab the input fields and prepend to section
$(".button-save").on("click", function() {
	var title = $('#input-title').val();
	var body = $("#input-body").val();
	var idea = new Idea(title, body)
	console.log(idea);
	prepend(idea);
	sendToStorage(idea);
})

$("#new-idea-article").on("click", ".upvote-image", function() {
	id = $(this).parent().parent().prop('id');
	console.log("click id " + id)
	var parsedObject = JSON.parse(localStorage.getItem(id))
	var objectQuality = parsedObject.quality

	if (objectQuality == "swill") {
		parsedObject.quality = "plausible"
		$(this).siblings().last().text("plausible")
		var update = localStorage.setItem(id, JSON.stringify(parsedObject))
	} else if (objectQuality == "plausible") {
		parsedObject.quality = "genius"
		$(this).siblings().last().text("genius")
		var update = localStorage.setItem(id, JSON.stringify(parsedObject))
		console.log(update)
	}
})

$("#new-idea-article").on("click", ".downvote-image", function() {
	var id = $(this).parent().parent().prop('id');
	var parsedObject = JSON.parse(localStorage.getItem(id))
	var objectQuality = parsedObject.quality

	if (objectQuality == "genius") {
		parsedObject.quality = "plausible"
		// $(this).siblings().last().remove()

		$(this).siblings().last().text("plausible")
		var update = localStorage.setItem(id, JSON.stringify(parsedObject))
		console.log(update)

	} else if (objectQuality == "plausible") {
		parsedObject.quality = "swill"
		// $(this).siblings().last().remove()
		$(this).siblings().last().text("swill")
		var update = localStorage.setItem(id, JSON.stringify(parsedObject))
		console.log(update)
	}

})

// trashcan delete
$("#new-idea-article").on('click', '.delete-image', function() {
	console.log("remove button check");
	console.log($('.delete-image').parent().parent());
	//debugger;
	console.log('ID TO DELETE ' + $(this).parent().parent().prop('id'));

	localStorage.removeItem($(this).parent().parent().prop('id'));
	$(this).parent().parent().remove('.new-idea-article');
});

function prepend(idea) {
	console.log(idea.id);
	$("#new-idea-article").prepend(`
    <div id="${idea.id}" class="new-idea-article">
	    <section>
	    	<input type="text" class='new-idea-header' value='${idea.title}' maxlength="30" size="35">
	    	<button id='delete-image' class="delete-image" type="button" name="button"></button>
	    </section>
	      <input type="text" class='new-idea-body' value="${idea.body}" maxlenghth="200" size="225">
	    <section class="new-idea-footer">
				<button id="upvote-image" class="upvote-image" type="button" name="button"></button>
				<button class="downvote-image" type="button" name="button"></button>
	    	<h3 class="h3-footer">quality:</h3><h3 id="quality">${idea.quality}</h3>
	    </section>
    </div>
    `);
	$('#input-title').val("Title")
	$('#input-body').val("Body")
}

function sendToStorage(idea) {
	// var storeTitle = $('#input-title').val();
	// var storeBody = $("#input-body").val()
	// var idea = new Idea(storeTitle, storeBody)
	localStorage.setItem(idea.id, JSON.stringify(idea))
}
