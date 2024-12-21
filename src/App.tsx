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
      <Route path="/SuperEasy">
        <Route index element={<FileConverter />} />
        <Route
          path="color-picker-from-image"
          element={<ColorPickerFromImage />}
        />
        {/* <Route
          path="/youtube-video-download"
          element={<YoutubeVideoDownload />}
        /> */}
        <Route path="file-converter" element={<FileConverter />} />
      </Route>
    </Routes>
  );
}

export default App;
