import "./App.css";
import { SearchBookCards } from "./components/SearchBooksCard";
import { useState } from "react";

function App() {
  const [checked, setChecked] = useState(false);
  return <SearchBookCards searchQuery="Lord of the rings"></SearchBookCards>;
  return;
}

export default App;
