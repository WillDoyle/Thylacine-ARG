const myAudio = document.getElementById("myAudio");
const playButton = document.getElementById("playButton");

let isUserInteracted = false;

// Play audio when button is clicked, but only if user has already interacted with the page
playButton.addEventListener("click", function() {
  if (isUserInteracted) {
    myAudio.play().catch((error) => {
      console.log(error);
    });
  }
});

// Autoplay audio when page is loaded, but only if user has already interacted with the page
function startAudio() {
  if (isUserInteracted) {
    myAudio.play().catch((error) => {
      console.log(error);
    });
  }
}

// Detect user interaction and set isUserInteracted flag to true
document.addEventListener("click", function() {
  if (!isUserInteracted) {
    isUserInteracted = true;
    startAudio();
  }
});

// On touchstart event, set isUserInteracted flag to true and remove the event listener
function touchStart() {
  if (!isUserInteracted) {
    isUserInteracted = true;
    startAudio();
    document.removeEventListener("touchstart", touchStart);
  }
}

document.addEventListener("touchstart", touchStart);