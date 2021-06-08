import { useState } from "react";
import Title from "./Title/Title";
import SearchResults from "./Search/SearchResults/SearchResults";

// track GBI api calls
let calls = 0;
const refinements = [];

const App = () => {
  // L O G I C

  //! move to api later
  const handleSearch = async (query, ...params) => {
    calls++;
    const url = process.env.REACT_APP_API_URL;
    const collection = process.env.REACT_APP_COLLECTION;
    const area = process.env.REACT_APP_AREA;

    console.log(`Call ${calls} - Search query: ${query}`);
    const bodyParams = Object.assign({}, ...params);

    bodyParams.refinements && refinements.push(bodyParams.refinements);

    const body = JSON.stringify({
      query,
      refinements,
      pageSize: bodyParams.pageSize,
      skip: bodyParams.pageSize * bodyParams.page - bodyParams.pageSize,
      sorts: bodyParams.sorts,
      area,
      collection,
    });

    console.log("Body Params: ", body);

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
        setResults(data);
      });
  };

  const [results, setResults] = useState(null);

  return (
    <>
      <Title className="fade" handleSearch={handleSearch} />
      {results && (
        <SearchResults searchResults={results} handleSearch={handleSearch} />
      )}
    </>
  );
};

export default App;
