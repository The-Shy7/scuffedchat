import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [messages, setMessages] = useState([])
  console.log(messages)
  return <main>
    <header>
      <img 
        src="https://banner2.cleanpng.com/20180423/gfe/kisspng-livechat-online-chat-logo-computer-icons-live-chat-5add970945d006.339032601524471561286.jpg"
        alt="a logo"
      />
      
      <p>Scuffed Chat</p>
    </header>

    <div className="messages">
      {messages.map((m,i)=> {
        return <div key={i} className="msg-wrap">
          <div className="message">{m}</div>
        </div>
      })}
    </div>

    <TextInput onSend={(text)=> {
      setMessages([text, ...messages])
    }}/>
  </main>
}

function TextInput(props){
  const [text, setText] = useState()

  return <div className="text-in">
    <input value={text}
    placeholder = "Write something" 
    onChange={e => setText(e.target.value)}
    />

    <button onClick={()=> {
      if (text) {
        props.onSend(text)
      }
      setText('')
    }}>
    &uarr; 
    </button> 
  </div>
}

export default App;
