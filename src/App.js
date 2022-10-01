import React,{useEffect, useState} from 'react';
import './App.css';
import Header from './component/Header';
import Body from './component/body';

const getDataFromls = () => {
  const retrieveData =JSON.parse(localStorage.getItem("queries"));
  if(retrieveData) 
  {
    return retrieveData
  }else{
    return []
  }
};

function App() {

  const [query,setQuery] = useState('');
  const [localStore,setLocalStore] = useState(getDataFromls());

  const handleInput = (ele) =>
  {
    setQuery(ele);
  }
  useEffect(()=>{
    if(query!=="" && !(localStore.includes(query))){
      if(localStore.length <= 50){
        setLocalStore([...localStore,query].sort());
      }
      
    }
  },[query]);

  useEffect(()=>{
    localStorage.setItem("queries",JSON.stringify(localStore));
  },[localStore]);

  return (
    <div>
      <Header handleInput={handleInput} query={query} localStore={localStore}/>
      <Body query={query}/>
    </div>
    );
}

export default App;