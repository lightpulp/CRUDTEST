import { useState } from 'react';

function App() {
  const [greeting, setGreeting] = useState('');
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');
  const [insertedData, setInsertedData] = useState<any>(null);

  // Handle the greet functionality
  function handleGreetSubmit(event: any) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    fetch(`${import.meta.env.VITE_CANISTER_URL}/greet?name=${name}`)
      .then(response => response.json())
      .then((json) => {
        setGreeting(json.greeting);
      });
  }

  // Handle inserting configuration
  function handleInsertSubmit(event: any) {
    event.preventDefault();
    fetch(`${import.meta.env.VITE_CANISTER_URL}/configuration/insert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key, value }),
    })
      .then(response => response.json())
      .then((json) => {
        if (json.status === 1) {
          setMessage("Configuration inserted successfully!");
          // Fetch the newly inserted data by id
          fetchInsertedDataById(json.insertedId); // Assuming you return inserted ID in the response
        } else {
          setMessage(json.message);
        }
      });
  }

  // Function to fetch inserted data by id
  function fetchInsertedDataById(id: number) {
    fetch(`${import.meta.env.VITE_CANISTER_URL}/configuration/${id}`)
      .then(response => response.json())
      .then((json) => {
        if (json.status === 1) {
          setInsertedData(json.data);
        } else {
          setMessage("Error fetching inserted data.");
        }
      });
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      
      {/* Greet form */}
      <form action="#" onSubmit={handleGreetSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Hey hey!</button>
      </form>
      <section id="greeting">{greeting}</section>

      <br />
      
      {/* Insert configuration form */}
      <form action="#" onSubmit={handleInsertSubmit}>
        <label htmlFor="key">Key: &nbsp;</label>
        <input
          id="key"
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          required
        />
        <br />
        <label htmlFor="value">Value: &nbsp;</label>
        <input
          id="value"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <br />
        <button type="submit">Insert Configuration</button>
      </form>
      <section id="message">{message}</section>

      {/* Display the inserted data */}
      {insertedData && (
        <section>
          <h3>Inserted Configuration:</h3>
          <p>ID: {insertedData.id}</p>
          <p>Key: {insertedData.key}</p>
          <p>Value: {insertedData.value}</p>
        </section>
      )}
    </main>
  );
}

export default App;
