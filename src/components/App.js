import { useState } from "react";
import Title from "./Title/Title";
import SearchResults from "./Search/SearchResults/SearchResults";

// track GBI api calls
let calls = 0;
let refinements = [];
let pageSize = 10;

const App = () => {
  // state
  const [results, setResults] = useState(null);

  // L O G I C
  const url = process.env.REACT_APP_API_URL;
  const collection = process.env.REACT_APP_COLLECTION;
  const area = process.env.REACT_APP_AREA;

  //! move to api later
  const handleSearch = async (query, ...params) => {
    // track the search count (dev)
    calls++;

    // is it a new search clear the refinements
    if (results?.query !== query) refinements = [];

    // log
    console.info(`Call ${calls} - Search query: ${query}`);

    // flatten an array of objects into a single
    const bodyParams = Object.assign({}, ...params);

    // get and update the page size global
    if (bodyParams.pageSize) pageSize = bodyParams.pageSize;

    // handle refinements
    if (bodyParams.refinement) {
      bodyParams.remove
        ? (refinements = refinements.filter(
            (f) => f.navigationName !== bodyParams.refinement.navigationName
          ))
        : refinements.push(bodyParams.refinement);
    }

    // hande skip
    const totalSkip = pageSize * bodyParams.page - pageSize;
    const skip = totalSkip || 0;

    const body = JSON.stringify({
      query,
      refinements,
      pageSize,
      skip,
      sorts: bodyParams.sorts,
      area,
      collection,
    });

    return await fetch(url, {
      method: "POST",
      body,
      headers: {
        Authorization: process.env.REACT_APP_GBI_AUTHENTICATION,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Dev: ", data);
        setResults(data);
      });
  };

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
