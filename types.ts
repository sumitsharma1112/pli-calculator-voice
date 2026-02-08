import { useState } from "react";

function App() {

  const [permissionGranted, setPermissionGranted] = useState(false);

  const requestMicPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      setPermissionGranted(true);

      alert("Microphone access granted. You can now use voice assistant.");

      startVoice();

    } catch (err) {

      console.error(err);

      alert("Microphone permission denied. Please allow access.");

    }
  };

  const startVoice = () => {

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert("Speech Recognition not supported in this browser");

      return;

    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";

    recognition.onresult = (event: any) => {

      const text = event.results[0][0].transcript;

      alert("You said: " + text);

    };

    recognition.start();

  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>PLI Voice Calculator</h1>

      {!permissionGranted ? (

        <button onClick={requestMicPermission}>
          Enable Voice Assistant
        </button>

      ) : (

        <button onClick={startVoice}>
          🎤 Start Voice Assistant
        </button>

      )}

    </div>

  );

}

export default App;
