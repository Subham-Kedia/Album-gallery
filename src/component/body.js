import React, { useState, useEffect, useRef } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { Row, Col, Spin } from "antd"

import { FLICKER_BASE_URL } from "../data/urls"
import { FLICKER_METHODS } from "../data/constants"

import axios from "axios"
import "../styles/body.css"

const LIMIT = 20

const Body = ({ query, deviceData }) => {
  const [images, setImages] = useState([])
  const isfetchingmore = useRef(false)
  const [hasmore, setHasmore] = useState(false)
  const page = useRef(1)
  const [clicked, setClicked] = useState(false)
  const [modalUrl, setModalUrl] = useState("")

  const columns = Array.from(
    {
      length:
        deviceData.width < 576
          ? 1
          : deviceData.width < 768
          ? 2
          : deviceData.width < 992
          ? 3
          : deviceData.width < 1600
          ? 4
          : 6,
    },
    (v, i) => i
  )

  const fetchMoreData = () => {
    page.current = page.current + 1
    isfetchingmore.current = true
    if (query !== "") {
      getSearchbasedImageList()
    } else {
      getRecentImageList()
    }
  }

  const getSearchbasedImageList = () => {
    axios
      .get(FLICKER_BASE_URL, {
        params: {
          method: FLICKER_METHODS.SEARCH,
          api_key: process.env.REACT_APP_FLICKER_API_KEY,
          text: query,
          per_page: LIMIT,
          page: page.current,
          safe_search:1,
          format: "json",
          jsoncallback: 1,
        },
      })
      .then((res) => {
        const data = JSON.parse(res.data.substring(2, res.data.length - 1))
        if (isfetchingmore.current) {
          setImages([...images, ...data.photos.photo])
          isfetchingmore.current = false
          if (data.photos.photo.length < LIMIT) {
            setHasmore(false)
          }
        } else {
          setImages(data.photos.photo)
          if (data.photos.photo.length < LIMIT) {
            setHasmore(false)
          }
        }
      })
      .catch((err) => console.error(err))
  }

  const getRecentImageList = () => {
    axios
      .get(FLICKER_BASE_URL, {
        params: {
          method: FLICKER_METHODS.GET_RECENT,
          api_key: process.env.REACT_APP_FLICKER_API_KEY,
          per_page: LIMIT,
          page: page.current,
          safe_search:1,
          format: "json",
          jsoncallback: 1,
        },
      })
      .then((res) => {
        console.log(res.data.substring(2, res.data.length - 1))
        const data = JSON.parse(res.data.substring(2, res.data.length - 1))
        if (isfetchingmore.current) {
          setImages([...images, ...data.photos.photo])
          isfetchingmore.current = false
          if (data.photos.photo.length === LIMIT) {
            setHasmore(true)
          }
        } else {
          setImages(data.photos.photo)
          if (data.photos.photo.length === LIMIT) {
            setHasmore(true)
          }
        }
      })
  }

  useEffect(() => {
    page.current = 1
    if (query !== "") {
      getSearchbasedImageList()
    } else {
      getRecentImageList()
    }
  }, [query])

  return (
    <div style={{ padding: "8px" }}>
      {clicked ? (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <img src={modalUrl} alt="Preview" />
            <span
              className="material-symbols-outlined"
              onClick={() => setClicked(false)}
            >
              close
            </span>
          </div>
        </div>
      ) : null}
      <InfiniteScroll
        dataLength={images.length}
        next={fetchMoreData}
        hasMore={hasmore}
        loader={
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        }
      >
        <Row gutter={8}>
          {columns.map((col, index) => {
            return (
              <Col key={index} xs={24} sm={12} md={8} lg={6} xxl={4}>
                {images.map((ele, i) => {
                  if (i % columns.length === index)
                    return (
                      <img
                        key={i}
                        src={`https://live.staticflickr.com/${ele.server}/${ele.id}_${ele.secret}.jpg`}
                        width="100%"
                        style={{ marginBottom: "8px", borderRadius: "4px" }}
                        alt={ele.title}
                        onClick={(e) => {
                          setModalUrl(e.target.src)
                          setClicked(true)
                        }}
                      />
                    )
                  else return null
                })}
              </Col>
            )
          })}
        </Row>
      </InfiniteScroll>
    </div>
  )
}
export default Body
