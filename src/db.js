import {useState, useEffect} from 'react'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

let store
const coll = 'messages'

function useDB(room) {
    const [messages, setMessages] = useState([])
    function add(m) {
        setMessages(current => {
            const msgs = [m, ...current]
            msgs.sort((a,b)=> b.ts.seconds - a.ts.seconds)
            return msgs
        })
    }
    function remove(id) {
        setMessages(current=> current.filter(m=> m.id!==id))
    }
    useEffect(() => {
        store.collection(coll)
        .where('room','==',room)
        .onSnapshot(snap=> snap.docChanges().forEach(c=> {
            const {doc, type} = c
            if (type==='added') add({...doc.data(),id:doc.id})
            if (type==='removed') remove(doc.id)
        }))
    }, [])
    return messages
}

const db = {}
db.send = function(msg) {
    return store.collection(coll).add(msg)
}
db.delete = function(id) {
    return store.collection(coll).doc(id).delete()
}

export { db, useDB }

const firebaseConfig = {
    apiKey: "AIzaSyB6Q8e-JvNJuO2xm_7Shtmji75ZpYowceM",
    authDomain: "scuffedchat-97e31.firebaseapp.com",
    databaseURL: "https://scuffedchat-97e31.firebaseio.com",
    projectId: "scuffedchat-97e31",
    storageBucket: "scuffedchat-97e31.appspot.com",
    messagingSenderId: "1059642424686",
    appId: "1:1059642424686:web:0478e3d02703b47138957f",
    measurementId: "G-G6L4D3EVXF"
  }

firebase.initializeApp(firebaseConfig)
store = firebase.firestore()