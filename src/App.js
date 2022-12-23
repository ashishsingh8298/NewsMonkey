import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import "./App.css";
import Navbar from "./components/Navbar";
import News from "./components/News";

function App() {
  const [progress, setProgress] = useState(0);
  const apiKey='88e896f7807f4745ba75250229daa3f5';
  const pageSize='15';

  return (
    <>
      <BrowserRouter>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        width='15'
      />

        <Navbar />
        <Routes>
          <Route path="/" element={<News key="general" setProgress={setProgress} category="general" apiKey={apiKey} pageSize={pageSize}/>} />
          <Route path="/business" element={<News key="business" setProgress={setProgress} category="business" apiKey={apiKey} pageSize={pageSize}/>} />
          <Route path="/entertainment" element={<News key="entertainment" setProgress={setProgress} category="entertainment" apiKey={apiKey} pageSize={pageSize}/>} />
          <Route path="/health" element={<News key="health" setProgress={setProgress} category="health" apiKey={apiKey} pageSize={pageSize}/>} />
          <Route path="/science" element={<News key="science" setProgress={setProgress} category="science" apiKey={apiKey} pageSize={pageSize}/>} />
          <Route path="/sports" element={<News key="sports" setProgress={setProgress} category="sports" apiKey={apiKey} pageSize={pageSize}/>} />
          <Route path="/technology" element={<News key="technology" setProgress={setProgress} category="technology" apiKey={apiKey} pageSize={pageSize}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
