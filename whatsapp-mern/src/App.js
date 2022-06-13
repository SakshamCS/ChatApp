import React from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import pusher from "pusher.js";

function App() {

    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      alert(JSON.stringify(data));
    });
  

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

 export default App;
