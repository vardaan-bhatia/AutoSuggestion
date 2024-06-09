import React from "react";
import AutoSuggestion from "./Components/AutoSuggestion";

const App = () => {
  const fetchsuggestions = () => {};
  return (
    <>
      <div className="items-center flex flex-col mt-10">
        <h1 className="text-3xl font-bold">AutoSuggestion/TypeAhead</h1>
        <AutoSuggestion
          fetchsuggestions={fetchsuggestions}
          // StaticData =  {}
          onSelect={(e) => console.log(e)}
          onBlur={(e) => {}}
          onChange={(input) => {}}
          onFocus={(e) => {}}
          datakey={"name"}
          loading={<>Loading...</>}
        />
      </div>
    </>
  );
};
export default App;
