$(document).ready(function(){
  $("#tree1").click(function(event){
    $("#body").empty();
    $("<script>").attr("type", "text/javascript").attr("src", "assets/tree1.js").appendTo($("body"));
    console.log("what")
  });
  $("#tree2").click(function(event){
    $("#body").empty();
    $("<script>").attr("type", "text/javascript").attr("src", "assets/tree2.js").appendTo($("body"));
  });
  $("#tree3").click(function(event){
    $("#body").empty();
    $("<script>").attr("type", "text/javascript").attr("src", "assets/tree3.js").appendTo($("body"));
  })
});