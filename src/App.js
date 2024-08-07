import React, { useEffect, useState } from "react";

import "./App.css";
import Header from "./component/Header";
import Body from "./component/Body";
import Footer from "./component/Footer";
import { DeviceContext } from "./data/context";

function App() {
  const [userQuery, setUserQuery] = useState("");
  const [deviceData, setDeviceData] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleInputChange = (query) => {
    setUserQuery(query);
  };

  useEffect(() => {
    const handleResizeListener = () => {
      let timer;
      return (event) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          setDeviceData({
            width: event.target.innerWidth,
            height: event.target.innerHeight,
          });
        }, 200);
      };
    };
    window.addEventListener("resize", handleResizeListener());

    return () => {
      window.removeEventListener("resize", handleResizeListener);
    };
  }, []);

  return (
    <DeviceContext.Provider value={deviceData}>
      <Header handleInputChange={handleInputChange} />
      <Body query={userQuery} />
      <Footer />
    </DeviceContext.Provider>
  );
}

export default App;
