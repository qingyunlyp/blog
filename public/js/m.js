function a(){
     var audio = document.getElementById('music'); 
     if(audio.paused){                 
         audio.play();//audio.play();
     }
     else{
          audio.pause();
     } 
   }
function c(){
var imgObj = document.getElementById("d");
var Flag=(imgObj.getAttribute("src",2)=="http://www.23yue.cn/xr/timg.gif")
imgObj.src=Flag?"http://www.23yue.cn/xr/233.gif":"http://www.23yue.cn/xr/timg.gif";
}