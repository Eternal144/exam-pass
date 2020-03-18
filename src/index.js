import React from 'react';
import ReactDOM from 'react-dom';
import SwitchRouter from './components/switchRouter'
import { BrowserRouter as Router } from 'react-router-dom';

window.onload=function () {
    document.addEventListener('touchstart',function (event) {
      if(event.touches.length>1){
        event.preventDefault();
      }
    });
    var lastTouchEnd=0;
    document.addEventListener('touchend',function (event) {
      var now=(new Date()).getTime();
      if(now-lastTouchEnd<=300){
        event.preventDefault();
      }
      lastTouchEnd=now;
    },false);
    document.addEventListener('gesturestart', function (event) {
      event.preventDefault();
    });
  }

ReactDOM.render(
<Router>
    <SwitchRouter />
</Router>,
    document.getElementById('root')
);