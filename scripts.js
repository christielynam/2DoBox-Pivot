$(document).ready(function(){
  $(".form").submit(function(event){
    event.preventDefault();
    console.log("preventdefault works")


  });
});

$('button').on('click', function(){
  var $getInput1= $('#input1').val()
  var $getInput2= $('#input2').val()
  console.log('input1= ' + $getInput1)
  console.log('input2= ' + $getInput2)

  // $('.idea-header').text($getInput1)
  // $('.idea-body').text($getInput2)
  $('.new-idea-article').prepend("<p>"+$getInput2+"</p>")
  $('.new-idea-article').prepend("<h3>"+$getInput1+"</h3>")

  var ideaClone = $('.new-idea-article').clone()

})
