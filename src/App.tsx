import { useState, useMemo } from "react";
import { getRawSearchResults } from "./util/getSearchResults";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  useMemo(
    () =>
      getRawSearchResults("lord of the rings").then(() => setLoading(false)),
    [],
  );

  return loading ? <div>Loading...</div> : <div>Complete</div>;
}

export default App;
