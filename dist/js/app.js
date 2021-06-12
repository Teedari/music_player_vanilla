const music_title = document.getElementById('music_title');
const music_author = document.getElementById('music_author');
const music_cover = document.getElementById('music_cover');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const play = document.getElementById('play');
const audio = document.getElementById('audio');
const progress_bar = document.getElementById('progress_bar');

const playlist_toggler = document.getElementById('playlist-toggler');



//Song model

const Song = function(song){
  const musicUrl = './assets/musics/';
  const coverUrl = './assets/cover_arts/';
  return {
    title: song,
    music: `${musicUrl}${song}.mp3`,
    cover: `${coverUrl}${song}.jpg`,
  }
}

//Global Variables

const SONG_DATA = [
  Song('music1'),
  Song('music2'),
  Song('music3'),
  Song('music4'),
]

let index = 0;
var is_play = false;

//Functions
const loadMusic = function(){
  music_title.textContent = SONG_DATA[index].title;
  music_cover.setAttribute('src', SONG_DATA[index].cover)
  audio.setAttribute('src', SONG_DATA[index].music)
  SONG_DATA[index].length = audio.attributes.length
}

const listeners = function(){

  if(is_play){
    play.children[0].setAttribute('class', 'fa fa-pause');
    play.classList.add('play')
    audio.play()

  }else{
    play.children[0].setAttribute('class', 'fa fa-play');
    play.classList.remove('play')

    audio.pause()
  }
}

//Events Functions

const playMusic = () => {
  is_play = !is_play ? true : false;
  listeners()
}

const nextMusic = () => {
  songIndexChange()

  loadMusic()

  listeners()

}

//Plays a particular music with @id
const playSelectedSong = (id) => {
  index = id

  is_play = true;

  // songIndexChange()
  
  loadMusic()
  
  listeners()
  
}
//plays previous music
const prevMusic = () => {

  songIndexChange(true)

  loadMusic()

  listeners()

}

//Handles the change of song from one index to the other
const songIndexChange = (prev=false) => {
  console.log(index)
  switch(prev){
    case true:
      if(index <= 0)
      index = SONG_DATA.length - 1
      else{
    
        index--
      }
      break;
    default:
      if(index < 0)
      index = SONG_DATA.length - 1
      else if(index >= SONG_DATA.length - 1)
        index = 0
      else{
    
        index++
      }
      break;
  }
}

//This function changes the icon of the playlist toggler
const playlist_listeners = () =>  {  
  if(playlist.classList.contains('active')){
    playlist_toggler.children[0].setAttribute('class', 'fa fa-chevron-down')
  }else{
    playlist_toggler.children[0].setAttribute('class', 'fa fa-chevron-up active')
  }
}

const getPlayList = () => {

//variables
const playlist_list = document.getElementById('playlist_list');
let items =  ''

 SONG_DATA.forEach( (val, key) => {

  items += `<li class="playlist-list__item" id="${key}">
  <p class="title">${val.title}</p>
  <small>2:00</small>
</li>`
  
})

//display on screen all playlist
playlist_list.innerHTML = items;



const music_tiles = document.querySelectorAll('.playlist-list__item');

music_tiles.forEach( tile => {
  tile.addEventListener('click', function(e){
    playSelectedSong(parseInt(this.getAttribute('id')))
  })
})


}

const playlistToggle= function(e){
  const playlist = document.getElementById('playlist');
  
  playlist.classList.toggle('active')

  playlist_listeners()

  getPlayList()
}





//All EventListners

//Load Music
loadMusic()


//Play Button
play.addEventListener('click', playMusic)

//Next Button
next.addEventListener('click', nextMusic)

//Prev Button
prev.addEventListener('click', prevMusic)

audio.addEventListener('timeupdate', function(e){
  const {duration, currentTime} = e.target;
  const PERC = 100;
  const progress_length = (currentTime / duration) * PERC;
  progress_bar.style.width = `${progress_length}%`

  if(duration  === currentTime){
    nextMusic()
  }
})

progress_bar.parentElement.addEventListener('click', function(e){
  const width = this.clientWidth;
  const offsetX = e.offsetX;
  console.log(offsetX, width)
  audio.currentTime = (offsetX / width) * audio.duration 

})


playlist_toggler.addEventListener('click', playlistToggle);



