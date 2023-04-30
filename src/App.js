import React, { useEffect, useState } from "react"
import "./App.css"
import Header from "./component/Header"
import Body from "./component/body"
import Footer from "./component/footer"

const getDataFromls = () => {
  const retrieveData = JSON.parse(localStorage.getItem("queries"))
  if (retrieveData) {
    return retrieveData
  } else {
    return []
  }
}

function App() {
  const [userInput, setUserInput] = useState("")
  const [localStore, setLocalStore] = useState(getDataFromls())
  const [deviceData, setDeviceData] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const handleInputChange = (ele) => {
    setUserInput(ele)
  }

  useEffect(() => {
    if (userInput !== "" && !localStore.includes(userInput)) {
      if (localStore.length <= 50) {
        setLocalStore([...localStore, userInput].sort())
      }
    }
  }, [userInput])

  useEffect(() => {
    localStorage.setItem("queries", JSON.stringify(localStore))
  }, [localStore])

  useEffect(() => {
    console.log("abcdef")
    const handleResizeListener = (event) => {
      let timer
      return (event) => {
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
          setDeviceData({
            width: event.target.innerWidth,
            height: event.target.innerHeight
          })
        }, 700)
      }
    }
    window.addEventListener("resize", handleResizeListener())
  }, [])

  return (
    <>
      <Header handleInputChange={handleInputChange} />
      <Body query={userInput} deviceData={deviceData} />
      <Footer/>
    </>
  )
}

export default App
