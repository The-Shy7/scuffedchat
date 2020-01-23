import React, {useState, useEffect} from 'react'
import './App.css'
import NamePicker from './NamePicker.js'
import {db} from './db.js'

function App() {
  const [messages, setMessages] = useState([])
  const [name, setName] = useState('')
  console.log(messages)

  useEffect(()=>{
    db.listen({
      receive: m=> {
        setMessages(current=> [m, ...current])
      },
    })
  }, [])

  return <main>
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
        return <div key={i} className="message-wrap">
          <div className="message">{m.text}</div>
        </div>
      })}
    </div>

    <TextInput onSend={(text)=> {
      db.send({
        text, name, ts: new Date(), 
      })
    }} />
  </main>
}

function TextInput(props){
  var [text, setText] = useState('') 

  return <div className="text-input-wrap">
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
