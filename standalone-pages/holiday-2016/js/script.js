function hideGifAndPlayVideo(){
document.getElementById("holidayGif").style.display = "none";
document.getElementById('holidayVideo').style.display = 'block';
document.getElementById('holidayVideo').play();

// if the video can be played at least for a couple frames, play it
document.getElementById('holidayVideo').addEventListener( "canplay", () => {
document.getElementById('holidayVideo').play();
});
}
