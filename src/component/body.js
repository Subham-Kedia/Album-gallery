import React,{useState,useEffect, useRef} from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Row,Col } from "antd";

import axios from "axios";
import '../styles/body.css'

const Body = (props)=>{

    const [images,setImages]= useState([]);
    const isfetchingmore = useRef(false);
    const [hasmore,setHasmore] = useState(true);
    const page = useRef(1);
    const [clicked,setClicked]=useState(false);
    const [modalUrl,setModalUrl]= useState("");
    
    const fetchMoreData = ()=>{
        page.current=page.current+1;
        isfetchingmore.current=true;
        console.log(1)
        if(props.query!==""){
            Myobj()
        }
        else{
            Getimages();
        }
    };

    const Myobj = async ()=>{
        try {
            const urlSearch=`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=9a5c61c508b1d9a6c648f432148134b6&text=${props.query}&per_page=10&page=${page}&format=json&nojsoncallback=1`;
            const res= await axios(urlSearch);
            if(isfetchingmore.current){
                setImages([...images,...res.data.photos.photo])
                isfetchingmore.current=false;
                if(res.data.photos.photo.length < 10){
                    setHasmore(false)
                }
            }
            else{
            setImages(res.data.photos.photo) 
            }
        } 
        catch (error) {
            throw error;
        }   
    }
    const Getimages = async ()=>
    {
        try {
            const urlRecent=`https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=9a5c61c508b1d9a6c648f432148134b6&per_page=10&page=${page}&format=json&nojsoncallback=1`;
            const res= await axios(urlRecent);
            if(isfetchingmore.current){
                setImages([...images,...res.data.photos.photo])
                isfetchingmore.current=false;
                if(res.data.photos.photo.length < 10){
                    setHasmore(false)
                }
            }
            else{
                setImages(res.data.photos.photo) 
            }   
        } 
        catch (error) {
            throw error;
        }     
    }
          
    useEffect(()=>{
        page.current=1;
        if(props.query!==""){
            Myobj()
        }
        else{
            Getimages();
        }
    },[props.query]);

    return(
        <div>
            <div className="cover"></div>
            {clicked ?
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <img src={modalUrl} alt="Preview" />
                        <span className="material-symbols-outlined"
                            onClick={()=>setClicked(false)}>
                            close
                        </span>
                    </div>
                </div>  
                 :null
            }
        // implementing Infinite Scroll
        <InfiniteScroll
            dataLength= {images.length}
            next={fetchMoreData}
            hasMore={hasmore}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
                </p>
            }>  

            <Row gutter={16} >
                <Col span={6} flex={4}>
                {images.map((ele,i)=>{  
                return (
                <div key={i}>
                <img  
                    src={`https://live.staticflickr.com/${ele.server}/${ele.id}_${ele.secret}.jpg`} 
                    alt={ele.title} 
                    onClick={(e)=>{setModalUrl(e.target.src);
                    setClicked(true)}}
                />
                </div>
                )
            })}
                </Col>
            
            </Row>
        </InfiniteScroll>
        </div>
    )
}
export default Body;