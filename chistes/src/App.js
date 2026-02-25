import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://official-joke-api.appspot.com/jokes/random");
      const data = await response.json();
      setJoke(data);
    } catch (error) {
      console.error("Error fetching joke:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="main-container">
      <div className="card">
        <h1 className="title">Random Joke Generator</h1>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <>
            <p className="setup">{joke?.setup}</p>
            <p className="punchline">{joke?.punchline}</p>
          </>
        )}

        <button className="btn" onClick={fetchJoke}>
          Give Me Another
        </button>
      </div>
    </div>
  );
}

export default App;
