import React, { useState } from 'react';
import './App.css';

// --- Main App ---
function App() {
    let [newLongURL, setNewLongURL] = useState("");
    let [shortUrlResult, setShortUrlResult] = useState("");
    let [errorMessage, setErrorMessage] = useState("");

    return (
        /* FIX: Restores the exact structural boundary box that Kotlin enforced */
        <div className="app-workspace">
            <RenderTitle />
            <RenderInput
                currentValue={newLongURL}
                onValueChange={function(newValue) { setNewLongURL(newValue); }}
            />
            <RenderButton onButtonClick={function() {
                handleSubmit(newLongURL, setNewLongURL, setShortUrlResult, setErrorMessage);
            }} />
            <RenderResultDisplay shortUrl={shortUrlResult} error={errorMessage} />
        </div>
    );
}


// --- Extracted Business Logic (Asynchronous Fetch Implementation) ---
async function handleSubmit(inputUrl, setLongUrl, setShortUrl, setError) {
    // Replicates inputUrl.isNotBlank()
    if (inputUrl && inputUrl.trim().length > 0) {
        try {
            let formattedUrl = inputUrl.trim();
            if (!/^https?:\/\//i.test(formattedUrl)) {
                // 2. ADDED: Automatically adds the prefix if missing
                formattedUrl = `https://${formattedUrl}`;
            }

            new URL(formattedUrl);
            setError(""); // Reset error message on a fresh, valid attempt

            // Replaces Kotlin coroutine scope.launch block
            let response = await fetch('http://127.0.0.1:5000/shorten', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ long_url: formattedUrl })
            });

            if (!response.ok) {
                throw new Error();
            }

            let data = await response.json();
            setShortUrl(data.short_url);
            setLongUrl(""); // Clear the text input box on success

        } catch (e) {
            setShortUrl(""); // Reset results so old links don't display
            setError("Please enter a valid URL layout (e.g, https://wikipedia.org).");
        }
    }
}

// --- Visual Components ---

// 1. Simple Title Component
function RenderTitle() {
    return <h1>Enter your link</h1>;
}

// 2. Simple Input Component
function RenderInput({ currentValue, onValueChange }) {
    return (
        <input
            className="url-input-field"
            type="text"
            value={currentValue}
            placeholder="https://example.com"
            onChange={function(event) { onValueChange(event.target.value); }}
        />
    );
}

// 3. Simple Action Button Component
function RenderButton({ onButtonClick }) {
    return (
        <button className="action-button" onClick={onButtonClick}>
            Submit
        </button>
    );
}

// 4. Simple Result Display Component
function RenderResultDisplay({ shortUrl, error }) {
    let hasError = error && error.trim().length > 0;
    let hasSuccess = shortUrl && shortUrl.trim().length > 0 && !hasError;
    let isVisible = hasError || hasSuccess;

    // Replaces Kotlin's ClassName evaluation block logic
    let containerClass = isVisible ? "result-container show" : "result-container";

    return (
        <div className={containerClass}>
            {hasError && (
                <p className="error-text">{error}</p>
            )}
            {hasSuccess && (
                <>
                    <p>Your Shortened Link:</p>
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                        {shortUrl}
                    </a>
                </>
            )}
        </div>
    );
}

export default App;