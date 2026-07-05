// client/src/App.jsx
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // State hook to store our API string message
  const [backendData, setBackendData] = useState("Loading backend data...")

  // Hook that runs automatically when the page loads
  useEffect(() => {
    fetch('http://localhost:5000/hello')
        .then(response => response.json())
        .then(data => {
          setBackendData(data.text); // Save the text string into state
        })
        .catch(error => {
          console.error("Error fetching data:", error);
          setBackendData("Failed to connect to the backend server.");
        });
  }, []);

  return (
      <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
        <h1>Welcomef</h1>

        <div style={{ padding: '20px', border: '2px dashed #646cff', borderRadius: '8px', display: 'inline-block' }}>
          <h3>Response from Server:</h3>
          {/* Render the backend string data directly here */}
          <p style={{ color: '#646cff', fontSize: '18px', fontWeight: 'bold' }}>
            {backendData}
          </p>
        </div>
      </div>
  )
}

export default App
