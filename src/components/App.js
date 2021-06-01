import { useState } from "react";
import Title from "./Title/Title";
import Results from "./Search/SearchResults/SearchResults";

const App = () => {
  //* L O G I C

  //! move to api later
  const handleSearch = async (query) => {
    const url = process.env.REACT_APP_API_URL;
    const collection = process.env.REACT_APP_COLLECTION;
    const area = process.env.REACT_APP_AREA;
    const pageSize = 10;
    let skip = 0;

    const body = JSON.stringify({
      query,
      collection,
      area,
      pageSize,
      skip,
    });

    await fetch(url, {
      method: "POST",
      body,
      headers: {
        Authorization: process.env.REACT_APP_GBI_AUTHENTICATION,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResults(data);
      });
  };

  const [results, setResults] = useState(null);

  return (
    <>
      <Title className="fade" handleSearch={handleSearch} />
      {results && <Results searchResults={results} />}
    </>
  );
};

export default App;
