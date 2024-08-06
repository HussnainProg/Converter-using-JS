const btn = document.querySelector("#submit");
const text = document.getElementsByTagName("textarea");
const selectOption = document.querySelector("#optionsSelect");
let voices = [];
let btn1 = document.getElementById("option-1");
let btn2 = document.getElementById("option-2");
// console.log(btn1);
// console.log(btn2);
btn1.addEventListener('click',(e)=>{
  document.querySelector("#text-to-speech").style.display = "block";
  document.querySelector("#img-to-text").style.display  = "none";
  
})
btn2.addEventListener('click',(e)=>{
  document.querySelector("#img-to-text").style.display  = "block";
  document.querySelector("#text-to-speech").style.display = "none"; 

})

// This metho is creating an option and populating it in select options
function addVoiceList() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;
    // console.log(option);
    selectOption.appendChild(option);

    // console.log(voice.name + voice.lang);
  });
}

addVoiceList();
speechSynthesis.onvoiceschanged = addVoiceList;

btn.addEventListener("click", (event) => {
  let toSay = text[0].value.trim();
  if (toSay === "") {
    alert("Enter some text first to read");
  } else {
    let selectVoice = selectOption.value;
    console.log(selectVoice);
    const utterance = new SpeechSynthesisUtterance(toSay);
    const selectedVoice = voices.find((voice) => voice.name === selectVoice);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    speechSynthesis.speak(utterance);
    toSay = "";
    event.preventDefault();
  }
});

// Implementing the second option of side menu
let selectFile;
document.getElementById("selectFile").addEventListener('change',(e)=>{
  selectFile = e.target.files[0]; 

}) 
function generateText(){
  let btn = document.getElementById("imageInput");
  console.log(btn);
  btn.addEventListener('click', function (event) {
    // const file = event.target.files[0];
    if (selectFile) {
      const reader = new FileReader();
      reader.onload = function () {
          Tesseract.recognize(
              reader.result,
              'eng',
              {
                  logger: m => console.log(m)
              }
            ).then(({ data: { text } }) => {
              document.getElementById('output').innerText = text;
          }).catch(err => {
              console.error(err);
          });
      };
      reader.readAsDataURL(selectFile);
  }
});
// selectFile;
}

generateText();

