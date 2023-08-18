const generateButton = document.getElementById('generateButton');
const inputText = document.getElementById('inputText');
const audioPlayer = document.getElementById('audioPlayer');
const downloadLink = document.getElementById('downloadLink');

generateButton.addEventListener('click', () => {
    const text = inputText.value;
    if (text) {
        generateAudio(text);
    } else {
        alert('Please enter some text.');
    }
});

function generateAudio(text) {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            const response = JSON.parse(this.responseText);
            if (response.success) {
                const audioUrl = response.data.url;
                audioPlayer.src = audioUrl;
                audioPlayer.style.display = 'block';
                downloadLink.href = audioUrl;
                downloadLink.style.display = 'inline-block';
            } else {
                alert('API request failed. Please try again later.');
            }
        }
    });

    xhr.open('GET', 'https://text-to-speech-api5.p.rapidapi.com/tts?text=' + encodeURIComponent(text));
    xhr.setRequestHeader('X-RapidAPI-Key', 'API key');
    xhr.setRequestHeader('X-RapidAPI-Host', 'text-to-speech-api5.p.rapidapi.com');

    xhr.send(data);
}
