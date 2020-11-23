import { React, useState, useEffect } from "react";
import "./App.css";
import axios from "./axios";

function App() {
  const [query, setquery] = useState("");
  const [result, setresult] = useState([]);
  const [pageno, setpageno] = useState(0);
  const [load , setload] = useState(false);
  const [api, setapi] = useState(false);
  const [change, setchange] = useState(0);

  useEffect(() => {

    if(pageno === 1) {
      axios.get(`anime?q=${query}&limit=16&page=${pageno}`).then((response) => {
        setresult(response["data"]["results"]);
      });
    }

    else if(pageno > 1) {
    axios.get(`anime?q=${query}&limit=16&page=${pageno}`).then((response) => {
      setresult([...result,...response["data"]["results"]]);
    });
  }
    
  }, [pageno, change])

  const handleChange = (e) => {
    e.preventDefault();
    setquery(e.target.value);
  };

const handleSubmit = (e) => {
    e.preventDefault();
    setpageno(1);
    setchange(change+1);
    // console.log("under handleSubmit");
    setapi(true);
   
    query === "" ? setload(false) : setload(true);
    
  };

  const handleMore = (e) => {
      e.preventDefault();
      setpageno(pageno+1);
      setchange(change+1);
     
     
  }


 

  return (
    <div className="app">
      <div className="app__body">
        <form onSubmit = {handleSubmit}>
          <input type="text" onChange={handleChange} value={query} />
          <button type="submit">Go</button>
        </form>

        <div className="app__body__middle">
  { api ? <div>Requesting: https://api.jikan.moe/v3/search/anime?q={query}&limit=16&page={pageno} </div> : <div> </div>}
        </div>

       

        <div className="app__body__bottom">
          {result.map((item, itemIndex) => (
            <div className = "content">
              <img
                src={result[itemIndex]["image_url"]}
                alt={result[itemIndex]["title"]}
              />
              <p>{result[itemIndex]["title"]}</p>
            </div>
          ))}
        </div>


       { load ? <div className="more">
          <button onClick = {handleMore}>Load more</button>
        </div> : <div> </div> } 
      </div>
    </div>
  );
}

export default App;
