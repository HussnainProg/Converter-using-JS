const btn = document.querySelector("#submit");
const text = document.getElementsByTagName("textarea");
const selectOption = document.querySelector("#optionsSelect");
let voices = [];

// console.log(btn,text);

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
