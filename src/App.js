import { useState } from 'react';
import './App.css';
import axios from "axios"

function App() {
  const [search, setSearch] = useState('');
  const client = axios.create({
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
    }
  })

  const params = {
    prompt: [`Can you give me notes on the real movie that matches ${search}, I want to discuss it as if I've seen it, give me all spoilers!`, `Give me the cast for the movie ${search}`, `Descripe 3 important scenes in ${search}`],
    model: "text-davinci-003",
    max_tokens: 1500,
    temperature: 0.5,
  }

  

  function handleChange(event) {
    setSearch(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()    
   client.post("https://api.openai.com/v1/completions", params).then((result) => { console.log(result.data.choices[0].text); console.log(result.data.choices)}).catch((err) => {console.log(err)})
    
  }

  return (
    <div className="App">
      
    <form on onSubmit={handleSubmit}>
      <label>
        Movie Search:
      </label>
      <input type='text' name="search" id="search" onChange={handleChange} />
      <input type='submit' value="submit" />
    </form>


    </div>
  );
}

export default App;
