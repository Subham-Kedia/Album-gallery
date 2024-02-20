import React, { useState, useEffect, useRef, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Row, Col, Spin } from "antd";

import "../../styles/body.css";
import FLICKERAPI from "../../Services/flicker";
import { DeviceContext } from "../../data/context";

const LIMIT = 20;

const Body = ({ query }) => {
  const deviceData = useContext(DeviceContext);
  const [images, setImages] = useState([]);
  const isfetchingmore = useRef(false);
  const [hasmore, setHasmore] = useState(false);
  const page = useRef(1);
  const [clicked, setClicked] = useState(false);
  const [modalUrl, setModalUrl] = useState("");

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
  );

  const fetchMoreData = () => {
    page.current = page.current + 1;
    isfetchingmore.current = true;
    if (query !== "") {
      getSearchbasedImageList();
    } else {
      getRecentImageList();
    }
  };

  const getSearchbasedImageList = () => {
    FLICKERAPI.getPhotosBySearchText(page.current, query, LIMIT)
      .then((res) => {
        const data = JSON.parse(res.data.substring(2, res.data.length - 1));
        if (isfetchingmore.current) {
          setImages([...images, ...data.photos.photo]);
          isfetchingmore.current = false;
          if (data.photos.photo.length < LIMIT) {
            setHasmore(false);
          }
        } else {
          setImages(data.photos.photo);
          if (data.photos.photo.length < LIMIT) {
            setHasmore(false);
          }
        }
      })
      .catch((err) => console.error(err));
  };

  const getRecentImageList = () => {
    FLICKERAPI.getRecentPhotos(page.current, LIMIT).then((res) => {
      const data = JSON.parse(res.data.substring(2, res.data.length - 1));
      if (isfetchingmore.current) {
        setImages([...images, ...data.photos.photo]);
        isfetchingmore.current = false;
        if (data.photos.photo.length === LIMIT) {
          setHasmore(true);
        }
      } else {
        setImages(data.photos.photo);
        if (data.photos.photo.length === LIMIT) {
          setHasmore(true);
        }
      }
    });
  };

  useEffect(() => {
    page.current = 1;
    if (query !== "") {
      FLICKERAPI.getPhotosBySearchText(page.current, query, LIMIT)
        .then((res) => {
          const data = JSON.parse(res.data.substring(2, res.data.length - 1));
          if (isfetchingmore.current) {
            setImages((prevData) => [...prevData, ...data.photos.photo]);
            isfetchingmore.current = false;
            if (data.photos.photo.length < LIMIT) {
              setHasmore(false);
            }
          } else {
            setImages(data.photos.photo);
            if (data.photos.photo.length < LIMIT) {
              setHasmore(false);
            }
          }
        })
        .catch((err) => console.error(err));
    } else {
      FLICKERAPI.getRecentPhotos(page.current, LIMIT).then((res) => {
        const data = JSON.parse(res.data.substring(2, res.data.length - 1));
        if (isfetchingmore.current) {
          setImages((prevData) => [...prevData, ...data.photos.photo]);
          isfetchingmore.current = false;
          if (data.photos.photo.length === LIMIT) {
            setHasmore(true);
          }
        } else {
          setImages(data.photos.photo);
          if (data.photos.photo.length === LIMIT) {
            setHasmore(true);
          }
        }
      });
    }
  }, [query]);

  return (
    <div
      id="bodyContainer"
      style={{
        margin: "8px",
        height: "calc(100vh - 140px)",
        overflow: "auto",
      }}
    >
      {clicked ? (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <img src={modalUrl} alt="Preview" style={{ padding: "10px" }} />
            <span
              className="material-symbols-outlined close-icon"
              onClick={() => setClicked(false)}
            >
              close
            </span>
          </div>
        </div>
      ) : null}
      <InfiniteScroll
        scrollableTarget="bodyContainer"
        style={{ overflow: "hidden" }}
        dataLength={images.length}
        next={fetchMoreData}
        hasMore={hasmore}
        scrollThreshold={0.9}
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
                          setModalUrl(e.target.src);
                          setClicked(true);
                        }}
                      />
                    );
                  else return null;
                })}
              </Col>
            );
          })}
        </Row>
      </InfiniteScroll>
    </div>
  );
};
export default Body;
