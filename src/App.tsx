import { Route, Routes } from "react-router-dom";
import {
  FileConverter,
  ColorPickerFromImage,
  // Home,
  // YoutubeVideoDownload,
} from "./pages";

function App() {
  return (
    <Routes>
      {/* putting FileConverter as index while Home isn't ready */}
      <Route index path="/" element={<FileConverter />} />
      <Route
        path="/color-picker-from-image"
        element={<ColorPickerFromImage />}
      />
      {/* <Route
        path="/youtube-video-download"
        element={<YoutubeVideoDownload />}
      /> */}
      <Route path="/file-converter" element={<FileConverter />} />
    </Routes>
  );
}

export default App;
