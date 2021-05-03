import React, { useCallback, useState } from "react";
import fakeApiRequest from "./fakeApi";
import debounce from "debounce-promise";
import "./styles.css";

export default function App() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [foundPhrases, setFoundPhrases] = useState([]);

  const fetchResult = (data) => {
    fakeApiRequest.findMatchPhrase(data).then((res) => {
      setFoundPhrases(res);
    });
  };
  // var debounce = (f, latency) => {
  //   let timerId;
  //   return function (...args) {
  //     const ctx = this;
  //     if (timerId) clearTimeout(timerId);
  //     timerId = setTimeout(() => {
  //       f.apply(ctx, args);
  //     }, latency);
  //   };
  // };
  const dbounce = useCallback(debounce(fetchResult, 500), []);
  //const dbounce = useCallback(debounce(fetchResult, 0), []);

  const handleChange = (e) => {
    const { value: nextPhrase } = e.target;
    setSearchPhrase(nextPhrase);
    dbounce(nextPhrase);
  };

  return (
    <div className="App">
      <input type="text" onChange={handleChange} value={searchPhrase} />
      <ul>
        {foundPhrases.length > 0 &&
          foundPhrases.map((item) => <li key={item.id}>{item.body}</li>)}
      </ul>
    </div>
  );
}
