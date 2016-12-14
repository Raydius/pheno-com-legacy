
var holidayGif = document.getElementById("holidayGif");
var holidayVideo = document.getElementById('holidayVideo');

function hideGifAndPlayVideo(){
var holidayGif = document.getElementById("holidayGif");
var holidayVideo = document.getElementById('holidayVideo');
holidayGif.style.display = "none";
holidayVideo.style.display = 'block';
holidayVideo.play();


};


function switchVideoSource() {
var holidayVideo = document.getElementById('holidayVideo');


holidayVideo.setAttribute('src','Nick-Offerman-1.mp4')
// if the video can be played at least for a couple frames, play it
holidayVideo.addEventListener( "canplay", () => {
holidayVideo.play();
  });

}
