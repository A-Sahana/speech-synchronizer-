document.addEventListener('DOMContentLoaded', () => {
    const startRecordingBtn = document.getElementById('startRecordingBtn');
    const stopRecordingBtn = document.getElementById('stopRecordingBtn');
    const outputDiv = document.getElementById('output');
    let mediaRecorder;
    let chunks = [];

    startRecordingBtn.addEventListener('click', startRecording);
    stopRecordingBtn.addEventListener('click', stopRecording);

    function startRecording() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                mediaRecorder = new MediaRecorder(stream);
                chunks = [];

                mediaRecorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        chunks.push(e.data);
                    }
                };

                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(blob);
                    outputDiv.innerHTML = `<audio controls src="${audioUrl}"></audio>`;
                    transcribeAudio(blob);
                };

                mediaRecorder.start();
                startRecordingBtn.disabled = true;
                stopRecordingBtn.disabled = false;
                outputDiv.innerHTML = 'Recording...';
            })
            .catch((error) => {
                console.error('Error accessing microphone:', error);
            });
    }

    function stopRecording() {
        if (mediaRecorder) {
            mediaRecorder.stop();
            startRecordingBtn.disabled = false;
            stopRecordingBtn.disabled = true;
        }
    }

    function transcribeAudio(audioBlob) {
        // Implement your audio transcription logic here
        // This could involve using a third-party speech-to-text API
        // For simplicity, we're not implementing it in this example
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const readAloudBtn = document.getElementById('readAloudBtn');
    const stopReadingBtn = document.getElementById('stopReadingBtn');
    const paragraph = document.getElementById('paragraph');
    const speechSynthesis = window.speechSynthesis;
    let utterance;

    readAloudBtn.addEventListener('click', startReading);
    stopReadingBtn.addEventListener('click', stopReading);

    function startReading() {
        utterance = new SpeechSynthesisUtterance(paragraph.innerText);
        speechSynthesis.speak(utterance);
    }

    function stopReading() {
        if (utterance) {
            speechSynthesis.cancel();
        }
    }
});
