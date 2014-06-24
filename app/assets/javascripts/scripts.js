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
  });

  $("#about-link").click(function(event){
    $("#about").remove();
    $("<div id=\"about\">").html(function() {
      return "<p>TWTTR FRGMNTS was built to help organize complex Twitter conversations and visualize how they fragment over time.</p><p>The tweet above is the beginning of a conversation. Hover over it to see its text. Click it to see its replies.</p><p>Tweets outlined in <span style=\"color: rgb(29,202,255)\">blue</span> have replies. Tweets outline in <span style=\"color: orange\">orange</span> have no replies.</p><p>TWTTRFRGMNTS was developed by <a href=\"http://www.jasonkaye.me/\" target=\"_blank\">Jason Kaye</a> and <a href=\"http://www.davidmccoy.com/\" target=\"_blank\">David McCoy</a>. It uses D3.js to display pre-built JSON datasets of Twitter conversations as tree graphs.</p>"
    }).appendTo("body");
  });

  $("#body").click(function(event){
    $("#about").remove();
  });

});