window.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector("#submit");
    const text = document.getElementsByTagName('textarea');
    console.log(btn,text);

    btn.addEventListener('click', event => {
        let toSay = text[0].value.trim();
        if(toSay === ''){
            alert("Enter some text first to read");
        }
        else{
            const utterance = new SpeechSynthesisUtterance(toSay);
            speechSynthesis.speak(utterance);
            toSay = '';
            
        }
            // event.preventDefault();
    });
  });
