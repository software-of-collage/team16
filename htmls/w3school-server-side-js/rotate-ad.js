
function initThreeFace(){
   var face1 = document.getElementById("face-1");
   var face2 = document.getElementById("face-2");
   var face3 = document.getElementById("face-3");
    face1.style = "transform-origin:center center .3rem;transform:rotate3d(1,0,0,0deg);";
    face1.getElementsByTagName("img")[0].style="transform-origin:center center;transform:rotateX(180deg);";
   face2.style = "transform-origin:center center .3rem;transform:rotate3d(1,0,0,120deg);";
   face3.style = "transform-origin:center center .3rem;transform:rotate3d(1,0,0,-120deg);";
   var ad = document.getElementById("three-face-body");
   ad.style="transform-origin:center center .3rem;transform:rotate3d(1,0,0,180deg);";
    inited = true;

}
var rotate = 180;
var inited =false;
function rotateAdThreeFace(){
   var imgs = document.getElementById("three-face-body").getElementsByTagName("div");
   if(!inited) 
    initThreeFace();

   if(imgs.length==3){
      var ad = document.getElementById("three-face-body");
      if(ad){
        rotate += 120;
        ad.style="transform-origin:center center .3rem;transition: transform 3s;transform:rotate3d(1,0,0," + rotate.toString() + "deg);";
      }
      else{
          console.log("ad NullPointer");
      }
        
   }
   else{
       console.log("imgs NullPointer");
   }


}
//rotateAdThreeFace();
setInterval(rotateAdThreeFace,4000);