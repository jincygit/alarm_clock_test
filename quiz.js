const quesJSON = [
  {
    correctAnswer: 'Three ',
    options: ['Two', 'Three ', 'Four', 'Five'],
    question:
      "How many pieces of bun are in a Mcdonald's Big Mac?",
  },
  {
    correctAnswer: 'L. Frank Baum',
    options: [
      'Suzanne Collins',
      'James Fenimore Cooper',
      'L. Frank Baum',
      'Donna Leon',
    ],
    question:
      "Which author wrote 'The Wonderful Wizard of Oz'?",
  },
  {
    correctAnswer: 'Atlanta United',
    options: [
      'Atlanta United',
      'Atlanta Impact',
      'Atlanta Bulls',
      'Atlanta Stars',
    ],
    question:
      'Which of these is a soccer team based in Atlanta?',
  },
  {
    correctAnswer: 'A Nanny',
    options: [
      'A Sow',
      'A Lioness',
      'A Hen',
      'A Nanny',
    ],
    question: 'A female goat is known as what?',
  },
  {
    correctAnswer: 'P. L. Travers',
    options: [
      'J. R. R. Tolkien',
      'P. L. Travers',
      'Lewis Carroll',
      'Enid Blyton',
    ],
    question:
      "Which author wrote 'Mary Poppins'?",
  },
];
   
    let score=0;
    let currentQuestion = 0;
    const totalScore = quesJSON.length;

    //Accessing all the elements:
    const questionEl = document.getElementById("question");
    const optionEl = document.getElementById("options");
    const scoreEl = document.getElementById("score");
    const nextEl = document.getElementById('next');
    showQuestion();
    
    nextEl.addEventListener('click', ()=>{
      scoreEl.textContent = `Score: ${score} / ${totalScore}`;
      nextQuestion();
    } );

    function showQuestion(){
       // Destructuring the object
     const{correctAnswer, options, question} = quesJSON[currentQuestion];

      //Setting question text content
    questionEl.textContent = question; 
    
    const shuffledOptions = shuffleOptions(options);
    
        //Populating the Options div with the buttons.
        shuffledOptions.forEach((opt) => {
          const btn = document.createElement('button');
          btn.textContent = opt;
          optionEl.appendChild(btn);
  
          // Event handling on the button:
          btn.addEventListener("click", () => {
              if(opt === correctAnswer){
                  score++;
              }
              else{
                  score=score-0.25;
              }
              scoreEl.textContent = `Score: ${score} / ${totalScore}`;   
          nextQuestion();
              });
        });
  }

  function nextQuestion(){
    currentQuestion++;
    optionEl.textContent = '';
    if(currentQuestion>=quesJSON.length){
      questionEl.textContent = 'Quiz Completed!!';
      nextEl.remove();
    } 
    else{
      showQuestion();
    }

  }

//Shuffling the Options
function shuffleOptions(options) {
    for (let i = options.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * i + 1);
      [options[i], options[j]] = [
        options[j],
        options[i],
      ];
    }
    return options;
  }
  
//   shuffleOptions([1, 2, 3, 4, 5]);

//MUSIC PLAYER SECTION
// document.addEventListener("DOMContentLoaded", function () {
//   const audioPlayer = document.getElementById("audioPlayer");
//   const playBtn = document.getElementById("playBtn");
//   const pauseBtn = document.getElementById("pauseBtn");

//   playBtn.addEventListener("click", function () {
//     audioPlayer.play();
//   });

//   pauseBtn.addEventListener("click", function () {
//     audioPlayer.pause();
//   });
// });
const songsJson = [
  {
    title: 'Rock1music',
    artist: 'Rock1 artist',
    genre: 'Rock',
    image: 'https://www.quertime.com/wp-content/uploads/2011/08/best_websites_to_download_free_music_mp3_songs_and_tracks_legally.jpg',
    song: 'sample-3s.mp3'
  },
  {
    title: 'Rock2music',
    artist: 'Rock2 artist',
    genre: 'Rock',
    image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61uQGG+-buL.jpg',
    song: 'sample-3s.mp3'
  },
  {
    title: 'Rock3music',
    artist: 'Rock3 artist',
    genre: 'Rock',
    image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61430Ea3kkL.jpg',
    song: 'sample-3s.mp3'
  },
  {
    title: 'Pop1music',
    artist: 'Pop1 artist',
    genre: 'Pop',
    image: 'https://www.quertime.com/wp-content/uploads/2011/08/best_websites_to_download_free_music_mp3_songs_and_tracks_legally.jpg',
    song: 'sample-3s.mp3'
  },
  {
    title: 'Pop2music',
    artist: 'Pop2 artist',
    genre: 'Pop',
    image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61uQGG+-buL.jpg',
    song: 'sample-3s.mp3'
  },
];
var playlistJson ={};
//Accessing elemnts
const section1 = document.getElementById("section1");
const section2 = document.getElementById("section2");
const createPlaylistInput = document.getElementById("createPlaylistInput");
const addToPlayListBtn = document.getElementById("addToPlayListBtn");
const createPlayListBtn = document.getElementById("createPlayListBtn");



var currentMusic ={};
//initially showing musicdiv
let eachMusicDiv = settingEachMusicDiv(songsJson[0]);
section2.innerHTML = eachMusicDiv;

//Populating the each song for songsection
songsJson.forEach((opt) => {
  const musicDiv = document.createElement('div');
  musicDiv.textContent = opt.title;
  musicDiv.className = 'eachMusic';
  section1.appendChild(musicDiv);

  // Event handling on the button:
  musicDiv.addEventListener("click", () => {
    currentMusic = opt;
    
      let eachMusicDiv = settingEachMusicDiv(opt);
      section2.innerHTML = eachMusicDiv;
    
    });
});
//adding event listener
createPlayListBtn.addEventListener("click", createPlaylist);

  // addToPlayListBtn.addEventListener("click", () => {
  //   console.log("createPlaylistInput.value");
    
  //   });
  // console.log(createPlaylistInput.val);
  
//common function for setting each music div
function settingEachMusicDiv(opt){
  let eachMusicDiv = `<div class="musicPlayerImageSections">
        <img src="${opt.image}" height="100px" width="100px" >
        <h3>${opt.title}</h3>
      </div>
      <div class="music-player">
        <audio id="audioPlayer" controls>
          <source src="assets/mp3/${opt.song}" type="audio/mp3">
          Your browser does not support the audio element.
        </audio>
        <div class="controls">
          <button class="musicPlayerButton">Prev</button>
          <button id="playBtn" class="musicPlayerButton">Play</button>
          <button id="pauseBtn" class="musicPlayerButton">Pause</button>
          <button class="musicPlayerButton">Next</button>
        
          <button class="addToPlayListBtn" id="addToPlayListButton" >Add To Playlist</button>
        </div>
      </div>`;
  return eachMusicDiv;
}
function addToPlaylist(){
  //playlistJson
  console.log("dd");
}
function createPlaylist(){
  console.log("dd");
  console.log(createPlaylistInput.val)
  

}