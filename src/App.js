import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return <main>
    <header>
      <img src="https://banner2.cleanpng.com/20180423/gfe/kisspng-livechat-online-chat-logo-computer-icons-live-chat-5add970945d006.339032601524471561286.jpg"/>
      
      <p>Scuffed Chat</p>
    </header>

    <div class="chat">
      <div class="mine messages">
        <div class="message last">
          Dude
        </div>
      </div>

      <div class="yours messages">
        <div class="message">
          Hey!
        </div>

        <div class="message">
          You there?
        </div>

        <div class="message last">
          Hello, how's it going?
        </div>
      </div>

      <div class="mine messages">
        <div class="message">
          Great thanks!
        </div> 
        
        <div class="message last">
          How about you?
        </div>
      </div>
    </div>
    
    <TextInput onSend={t=> console.log(t)}/>
  </main>
}

function TextInput(props){
  const [text, setText] = useState()

  return <div className="text-in">
    <form>
      <input value={text}
      placeholder = "Write something" 
      onChange={e => setText(e.target.value)}
      />

      <button onClick={()=> {
        props.onSend(text)
        setText('')
      }}>
      &uarr; 
      </button> 
    </form>
  </div>
}

export default App;
