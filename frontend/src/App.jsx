import React, { useCallback, useState } from 'react';
import Navbar from "./components/Navbar";
import Content from "./components/Content";

function App() {
  const [lang, setLang] = useState("English");

  
  return (
    <>
      <Navbar lang={lang} setLang={setLang}/>
      <Content lang={lang}></Content>
    </>
  )
}

export default App;