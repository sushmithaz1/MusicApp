const music=document.getElementById("audio");
const playing=document.getElementById("playing");
const img=document.querySelector("img");
const artist=document.getElementById("artist");
const title=document.getElementById("title");
const prev=document.getElementById("prev");
const next=document.getElementById("next");
const progress=document.getElementById("progress");
let total_duration=document.getElementById("duration");
let current_time=document.getElementById("current-time");
const progress_div=document.getElementById("progress-div");
const songs=[
  {
  name:"first",
  title:"Lotus lane1",
  artist:"loyalist",
  },
  {
   name:"second",
  title:"Lotus lane2",
  artist:"loyalist",
  },
  {
   name:"third",
  title:"Lotus lane3",
  artist:"loyalist",
  }
];

let isPlaying=false;

const playMusic=(()=>{
  isPlaying=true;
    music.play();

    playing.classList.replace('fa-play',"fa-pause");
  img.classList.add("anime");
});

const pauseMusic=(()=>{
  isPlaying=false;
    music.pause();

    playing.classList.replace("fa-pause","fa-play");
  img.classList.remove("anime");
});

playing.addEventListener("click",()=>{
  if(isPlaying){
    pauseMusic();
  }
  else{
    playMusic();
  }
});
const loadSong=(songs)=>{
  title.textContent=songs.title;
  artist.textContent=songs.artist;
  music.src="music/"+songs.name+".mp3";
  img.src="images/"+songs.name+".jpg";
};
songIndex=0;
//loadSong(songs[1]);
const nextSong=()=>{
 songIndex=(songIndex+1)%songs.length;  
  loadSong(songs[songIndex]);
  playMusic();
};
const prevSong=()=>{
  songIndex=(songIndex-1+songs.length)%songs.length;  
  loadSong(songs[songIndex]);
  playMusic();
};

//progrss work developer.mozill.org
music.addEventListener('timeupdate',(event)=>{
  const {currentTime,duration}=event.srcElement;
  let progress_time=(currentTime/duration)*100;
  progress.style.width=`${progress_time}%`;

//music duration update
let min_duration=Math.floor(duration/60);
let sec_duration=Math.floor(duration%60);

let tot_duration=`${min_duration}:${sec_duration}`;
if(duration){
total_duration.textContent=`${tot_duration}`;
}

//current time
let min_currentTime=Math.floor(currentTime/60);
let sec_currentTime=Math.floor(currentTime%60);

if(sec_currentTime<10){
  sec_currentTime=`0${sec_currentTime}`;
}
let tot_currentTime=`${min_currentTime}:${sec_currentTime}`;
current_time.textContent=`${tot_currentTime}`;
});

progress_div.addEventListener('click',(event)=>{
  const {duration}=music;
  let move_progress=(event.offsetX/event.srcElement.clientWidth)*duration;
  music.currentTime=move_progress;
});

music.addEventListener('ended',nextSong);
next.addEventListener("click",nextSong);
prev.addEventListener("click",prevSong);
