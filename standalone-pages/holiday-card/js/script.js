
var holidayGif = document.getElementById("holidayGif");
var holidayVideo = document.getElementById('holidayVideo');
var playbutton = document.getElementById('playbutton');
var windowWidth = window.windowWidth;

function playVideoFromButton() {
  var playbutton = document.getElementById('playbutton');
  var holidayGif = document.getElementById("holidayGif");
  var holidayVideo = document.getElementById('holidayVideo');
  holidayGif.style.display = "none";
  holidayVideo.style.display = 'block';
  holidayVideo.play();
  playbutton.style.display = 'none'
}


function hideGifAndPlayVideo(){
var holidayGif = document.getElementById("holidayGif");
var holidayVideo = document.getElementById('holidayVideo');
holidayGif.style.display = "none";
holidayVideo.style.display = 'block';
holidayVideo.play();
playbutton.style.display = 'none'

};


function switchVideoSource() {
var holidayVideo = document.getElementById('holidayVideo');


// if the video can be played at least for a couple frames, play it
holidayVideo.addEventListener( "canplay", () => {
holidayVideo.play();
  });

}

$(document).ready(function(){

  if($(window).width() < 475) {
    $('#holidayGif').attr('src','unnamed.gif').animate({
"position": "absolute",
"minHeight": "inherit",
"padding": "0",
"margin": "0 auto",
"width": "100%",
"height": "auto",
"backgroundSize": "cover",
zIndex: "1",
    },10)
console.log('true')

  $
}
  // holidayGif.style.display = 'none';
  // holidayVideo.style.display = 'block';
  // holidayVideo.play();
  // playbutton.style.display = 'none'
})
