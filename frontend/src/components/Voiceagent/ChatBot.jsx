// import { useEffect, useState } from "react";
// import "regenerator-runtime";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import { BsFillMicFill } from "react-icons/bs";
// import { ScaleLoader } from "react-spinners";
// import "./ChatBot.css";

// // Speech synthesis instance
// let speech = new SpeechSynthesisUtterance();

// export const Chatbot = () => {
//   const [messages, setMessages] = useState([
//     { message: "Hello Sir!", sender: "ChatGPT" }
//   ]);
//   const [loading, setLoading] = useState(false);
//   const [assistantResponse, setAssistantResponse] = useState(null);
//   const [isChatOpen, setIsChatOpen] = useState(false);

//   const { listening, transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

//   // Function to get ChatGPT responses
//   const getResponse = async (messages) => {
//     let apiMessages = messages.map((msg) => ({
//       role: msg.sender === "ChatGPT" ? "assistant" : "user",
//       content: msg.message
//     }));

//     const systemMessage = {
//       role: "system",
//       content: "Keep the reply very short to a paragraph and speak respectfully."
//     };

//     const apiRequestBody = {
//       model: "gpt-3.5-turbo",
//       messages: [systemMessage, ...apiMessages]
//     };

//     try {
//       const response = await fetch("https://api.openai.com/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${import.meta.env.VITE_GPT_KEY}`,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(apiRequestBody)
//       });
      
//       const data = await response.json();
//       setLoading(false);
//       setAssistantResponse(data.choices[0].message.content);
      
//       speech.text = data.choices[0].message.content;
//       window.speechSynthesis.speak(speech);

//       setMessages([...messages, { message: data.choices[0].message.content, sender: "ChatGPT" }]);
//     } catch (error) {
//       console.error("Error fetching response:", error);
//       setLoading(false);
//     }
//   };

//   const startListening = () => {
//     SpeechRecognition.startListening({ language: "en-IN" });
//     setAssistantResponse(null);
//   };

//   const stopVoice = () => {
//     window.speechSynthesis.cancel();
//     SpeechRecognition.stopListening();
//   };

//   useEffect(() => {
//     if (!listening && transcript) {
//       setLoading(true);
//       const newMessage = { message: transcript, sender: "user" };
//       const newMessages = [...messages, newMessage];
//       setMessages(newMessages);
//       getResponse(newMessages);
//     }
//   }, [transcript, listening]);

//   if (!browserSupportsSpeechRecognition) {
//     return <p>Browser does not support speech recognition.</p>;
//   }

//   return (
//     <div className="chat-container">
//       {!isChatOpen ? (
//         <button className="chat-toggle-button" onClick={() => setIsChatOpen(true)}>
//           Start Chat
//         </button>
//       ) : (
//         <div className="chatbot-container center-chat">
//           <h3 className="chatbot-title">AI Voice Assistant using ChatGPT</h3>
//           {!loading ? (
//             <>
//               <button onClick={startListening} className="mic-button">
//                 <BsFillMicFill className="mic-icon" />
//                 {listening ? "Listening..." : "Listen"}
//               </button>
//               {transcript && <p className="user-message">You: {transcript}</p>}
//               {assistantResponse && <p className="assistant-message">Assistant: {assistantResponse}</p>}
//             </>
//           ) : (
//             <ScaleLoader color="#646cff" loading={loading} size={80} speedMultiplier={1} />
//           )}
//           <button className="close-chat-button" onClick={() => { setIsChatOpen(false); stopVoice(); }}>
//             Close Chat
//           </button>
          
//         </div>
//       )}
//     </div>
//   );
// };

// import { useEffect, useState } from "react";
// import "regenerator-runtime";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import { BsFillMicFill } from "react-icons/bs";
// import { ScaleLoader } from "react-spinners";
// import "./ChatBot.css";

// let speech = new SpeechSynthesisUtterance();

// export const Chatbot = () => {
//   const [messages, setMessages] = useState([{ message: "Hello! Say 'start' to begin.", sender: "ChatGPT" }]);
//   const [loading, setLoading] = useState(false);
//   const [assistantResponse, setAssistantResponse] = useState(null);
//   const [isChatOpen, setIsChatOpen] = useState(false);

//   const { listening, transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

//   const getResponse = async (messages) => {
//     let apiMessages = messages.map((msg) => ({
//       role: msg.sender === "ChatGPT" ? "assistant" : "user",
//       content: msg.message
//     }));

//     const apiRequestBody = {
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "system", content: "Keep replies short and clear for a blind person." }, ...apiMessages]
//     };

//     try {
//       const response = await fetch("https://api.openai.com/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${import.meta.env.VITE_GPT_KEY}`,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(apiRequestBody)
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("ChatGPT Response:", data);

//       setLoading(false);
//       const reply = data.choices[0].message.content;
//       setAssistantResponse(reply);

//       window.speechSynthesis.cancel();
//       speech.text = reply;
//       speech.lang = "en-IN";
//       speech.rate = 1;
//       speech.volume = 1;
//       speech.pitch = 1;
      
//       setTimeout(() => {
//         window.speechSynthesis.speak(speech);
//       }, 100);

//       setMessages((prevMessages) => [...prevMessages, { message: reply, sender: "ChatGPT" }]);
//     } catch (error) {
//       console.error("Error fetching response:", error);
//       setLoading(false);
//     }
//   };

//   const startListening = () => {
//     setIsChatOpen(true);
//     SpeechRecognition.startListening({ language: "en-IN", continuous: true });
//     setAssistantResponse(null);
//   };

//   const submitText = () => {
//     if (transcript) {
//       const cleanedText = transcript.toLowerCase().replace(/start|submit|clear|close chat/g, "").trim();
//       if (cleanedText) {
//         setLoading(true);
//         const newMessage = { message: cleanedText, sender: "user" };
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//         getResponse([...messages, newMessage]);
//       }
//     }
//   };

//   const clearResponses = () => {
//     window.speechSynthesis.cancel();
//     setMessages([{ message: "Memory cleared. Say 'start' to begin.", sender: "ChatGPT" }]);
//     setAssistantResponse(null);
//     resetTranscript();
//   };

//   const closeChat = () => {
//     setIsChatOpen(false);
//     window.speechSynthesis.cancel();
//     resetTranscript();
//   };

//   useEffect(() => {
//     const lowerTranscript = transcript.toLowerCase();
//     if (lowerTranscript.includes("start")) {
//       startListening();
//       resetTranscript();
//     } else if (lowerTranscript.includes("submit")) {
//       submitText();
//       resetTranscript();
//     } else if (lowerTranscript.includes("clear")) {
//       clearResponses();
//       resetTranscript();
//     } else if (lowerTranscript.includes("close chat")) {
//       closeChat();
//       resetTranscript();
//     }
//   }, [transcript]);

//   useEffect(() => {
//     SpeechRecognition.startListening({ language: "en-IN", continuous: true });
//   }, []);

//   if (!browserSupportsSpeechRecognition) {
//     return <p>Browser does not support speech recognition.</p>;
//   }

//   return (
//     <div className="chat-container">
//       {!isChatOpen ? (
//         <button className="chat-toggle-button" onClick={() => setIsChatOpen(true)}>
//           Start Chat
//         </button>
//       ) : (
//         <div className="chatbot-container center-chat">
//           <h3 className="chatbot-title">AI Voice Assistant</h3>
//           {!loading ? (
//             <>
//               <button onClick={startListening} className="mic-button">
//                 <BsFillMicFill className="mic-icon" />
//                 {listening ? "Listening..." : "Listen"}
//               </button>
//               {transcript && <p className="user-message">You: {transcript}</p>}
//               {assistantResponse && <p className="assistant-message">Assistant: {assistantResponse}</p>}
//             </>
//           ) : (
//             <ScaleLoader color="#646cff" loading={loading} size={80} speedMultiplier={1} />
//           )}
//           <button className="close-chat-button" onClick={closeChat}>
//             Close Chat
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };


import { useEffect, useState } from "react";
import "regenerator-runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { BsFillMicFill } from "react-icons/bs";
import { ScaleLoader } from "react-spinners";
import "./ChatBot.css";

let speech = new SpeechSynthesisUtterance();

export const Chatbot = () => {
  const [messages, setMessages] = useState([{ message: "Hello! Say 'start' to begin.", sender: "ChatGPT" }]);
  const [loading, setLoading] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userInput, setUserInput] = useState("");

  const { listening, transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const getResponse = async (messages) => {
    let apiMessages = messages.map((msg) => ({
      role: msg.sender === "ChatGPT" ? "assistant" : "user",
      content: msg.message
    }));

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: "Keep replies short and clear for a blind person." }, ...apiMessages]
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.REACT_APP_OPENAI_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("ChatGPT Response:", data);

      setLoading(false);
      const reply = data.choices[0].message.content;
      setAssistantResponse(reply);

      window.speechSynthesis.cancel();
      speech.text = reply;
      speech.lang = "en-IN";
      speech.rate = 1;
      speech.volume = 1;
      speech.pitch = 1;
      
      setTimeout(() => {
        window.speechSynthesis.speak(speech);
      }, 100);

      setMessages((prevMessages) => [...prevMessages, { message: reply, sender: "ChatGPT" }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setLoading(false);
    }
  };

  const startListening = () => {
    setIsChatOpen(true);
    SpeechRecognition.startListening({ language: "en-IN", continuous: true });
    setAssistantResponse(null);
  };

  const submitText = () => {
    if (transcript || userInput) {
      const cleanedText = (transcript || userInput).toLowerCase().replace(/start|submit|clear|close chat/g, "").trim();
      if (cleanedText) {
        setLoading(true);
        const newMessage = { message: cleanedText, sender: "user" };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        getResponse([...messages, newMessage]);
        setUserInput("");
      }
    }
  };

  const clearResponses = () => {
    window.speechSynthesis.cancel();
    setMessages([{ message: "Memory cleared. Say 'start' to begin.", sender: "ChatGPT" }]);
    setAssistantResponse(null);
    resetTranscript();
    setUserInput("");
  };

  const closeChat = () => {
    setIsChatOpen(false);
    window.speechSynthesis.cancel();
    resetTranscript();
    setUserInput("");
  };

  useEffect(() => {
    const lowerTranscript = transcript.toLowerCase();
    if (lowerTranscript.includes("start")) {
      startListening();
      resetTranscript();
    } else if (lowerTranscript.includes("submit")) {
      submitText();
      resetTranscript();
    } else if (lowerTranscript.includes("clear")) {
      clearResponses();
      resetTranscript();
    } else if (lowerTranscript.includes("close chat")) {
      closeChat();
      resetTranscript();
    }
  }, [transcript]);

  useEffect(() => {
    SpeechRecognition.startListening({ language: "en-IN", continuous: true });
  }, []);

  if (!browserSupportsSpeechRecognition) {
    return <p>Browser does not support speech recognition.</p>;
  }

  return (
    <div className="chat-container">
      {!isChatOpen ? (
        <button className="chat-toggle-button" onClick={() => setIsChatOpen(true)}>
          Start Chat
        </button>
      ) : (
        <div className="chatbot-container center-chat">
          <h3 className="chatbot-title">AI Voice Assistant</h3>
          <button onClick={startListening} className="mic-button">
            <BsFillMicFill className="mic-icon" />
            {listening ? "Listening..." : "Listen"}
          </button>
          {transcript && <p className="user-message">You: {transcript}</p>}
          {assistantResponse && <p className="assistant-message">Assistant: {assistantResponse}</p>}
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            className="chat-input"
          />
          <div className="button-container">
            <button onClick={submitText} className="submit-button">Submit</button>
            <button onClick={clearResponses} className="clear-button">Clear</button>
            <button className="close-chat-button" onClick={closeChat}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};


