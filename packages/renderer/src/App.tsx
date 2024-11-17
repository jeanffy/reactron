import { ProgramInfoDto } from "ipc";
import "./App.css";

import image from "./assets/image.jpg";
import { useEffect, useState } from "react";
import { getApi } from './services/api';

function App() {
  const [programInfo, setProgramInfo] = useState<ProgramInfoDto | undefined>(
    undefined,
  );

  useEffect(() => {
    async function getProgramInfo() {
      const programInfo = await getApi().getProgramInfo();
      setProgramInfo(programInfo);
    }
    getProgramInfo();
  });

  return (
    <>
      <p>Hello Reactron! This paragraph should be rendered in yellow</p>
      An image from the public folder
      <br />
      {/* the ./ prefix for the image path is mandatory to work in the Electron context */}
      <img src="./image.jpg" width="150px" />
      <br />
      An image from the assets folder
      <br />
      <img src={image} width="150px" />
      <br />
      Program information retrieved from API
      <br />
      {programInfo && (
        <ul>
          <li>Node version: {programInfo.nodeVersion}</li>
          <li>Electron version: {programInfo.electronVersion}</li>
          <li>Chrome version: {programInfo.chromeVersion}</li>
        </ul>
      )}
    </>
  );
}

export default App;
