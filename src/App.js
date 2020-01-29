import React, {useState, useEffect} from 'react'
import './App.css'
import NamePicker from './NamePicker.js'
import {db, useDB} from './db'
import {BrowserRouter, Route} from 'react-router-dom'
import { FiSend, FiCamera } from 'react-icons/fi'
import Camera from 'react-snap-pic'

function App() {
  useEffect(()=>{
    const {pathname} = window.location
    if(pathname.length<2) window.location.pathname='home'
  }, [])

  return <BrowserRouter>
    <Route path="/:room" component={Room}/>
  </BrowserRouter>
}

function Room(props) {
  const {room}= props.match.params
  const [name, setName] = useState('')
  const [showCamera, setShowCamera] = useState(false)
  const messages = useDB(room)

  takePicture = (img) => {
    console.log(img)
    setShowCamera(false)
  }

  return <main>
    {showCamera && <Camera takePicture={takePicture} />}

    <header>
      <div className="logo-wrap">
        
        <img className="logo"
          alt="logo"
          src="https://static.thenounproject.com/png/543155-200.png" 
        />

        Scuffed Chat
      </div>

      <NamePicker onSave={setName} />
    </header>

    <div className="messages">
      {messages.map((m,i)=>{
        return <div key={i} className="message-wrap"
          from={m.name===name?'me':'you'}>
          <div className="message">
            <div className="msg-name">{m.name}</div>
            <div className="msg-text">{m.text}</div>
          </div>
        </div>
      })}
    </div>

    <TextInput onSend={(text)=> {
        db.send({
          text, name, ts: new Date(), room
        })
      }} 
      showCamera={()=>showCamera(true)}
    />
  </main>
}

function TextInput(props){
  var [text, setText] = useState('') 

  return <div className="text-input-wrap">
    <button onClick={props.showCamera}
      style={{left:10, right:'auto'}}>
      <FiCamera style={{height:15, width:15}} />
    </button>

    <input 
      value={text} 
      className="text-input"
      placeholder="Write your message"
      onChange={e=> setText(e.target.value)}
      onKeyPress={e=> {
        if(e.key==='Enter') {
          if(text) props.onSend(text)
          setText('')
        }
      }}
    />

    <button onClick={()=> {
      if(text) props.onSend(text)
      setText('')
    }} className="button"
      disabled={!text}>
      &uarr; 
    </button>
  </div>
}

export default App
