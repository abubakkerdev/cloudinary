import axios from "axios";
import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [inputFile, setInputFile] = useState("");

  const handleChange = (e) => {
    let images = e.target.files[0];

    let reader = new FileReader();

    reader.onload = () => {
      setInputFile(reader.result);
    };
    reader.readAsDataURL(images);
  };

  const handleClick = () => {
    // console.log(inputFile);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/img",
      data: { input: inputFile },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Image Upload</h2>
      <input type="text" onChange={(e) => setInput(e.target.value)} /> <br />
      <input type="file" onChange={handleChange} />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default App;
