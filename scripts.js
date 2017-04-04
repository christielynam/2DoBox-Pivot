$(document).ready(function(){
  $(".form").submit(function(event){
    event.preventDefault();
    console.log("preventdefault works")


  });
});

function IdeaCard(title, body) {
  this.title = title;
  this.body = body;
}

$(".button-save").on("click", function() {
  console.log("it clicked")
  var $title = $('#input-title').val();
  console.log($title)
  var $body = $("#input-body").val();
  console.log($body)
  var CardGrabber = new IdeaCard($title, $body);
  $("#new-idea-article").prepend(`
    <article id="new-idea-article" class="new-idea-article">
    <section>
    <h2 class='new-idea-header'>${$title}</h2>
    <button class="delete-image" type="button" name="button"></button>
    </section>
    <p class='new-idea-body'>${$body}</p>
    <section class="new-idea-footer">
    <button class="upvote-image" type="button" name="button"></button>
    <button class="downvote-image" type="button" name="button"></button>
    <h3 class="h3-footer">quality:</h3><h3>swill</h3>
    </section>
    </article>

    `);
  $('#input-title').val("Title")
  $('#input-body').val("Body")
})

$("#new-idea-article").on('click','.delete-image', function() {
  console.log($('.delete-image').parent().parent());
  $(this).parent().parent().remove('.new-idea-article');
});
