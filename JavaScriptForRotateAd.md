### 原生JS实现旋转五面体广告

​	写了好久，怕以后会忘，记录一下。

效果图:

![effective-1](image/effective-1.png)

![effective-2](image/effective-2.png)



![effective-3](image/effective-3.png)

想看动态的效果可以看 [这里](http://www.w3school.com.cn/s.asp) 的原网址

**注意：如果没有刷到这个广告就多刷几次，我完全没看原网址是怎么写的，所以会有点不一样。**

#### 1.html及css部分:

~~~html
 <div class="top-ad">
            <div id = "three-face-body">
                <div id = "face-1">
   			  	    <img src="" alt="">
                </div>
                <div id = "face-2">
                	<img src="" alt="">                    
                </div>
                <div id = "face-3">
                	<img src="" alt="">
                </div>
            </div>

 </div>
~~~



这是***html***的结构，最外层的**.top-ad** 是用来定位和设定大小的。

**three-face-body** 和它的子***div*** 们都是有用的，等下我们就会讲到。

~~~css
  	   .top-ad {
            position: absolute;
            overflow:hidden;
            width: 5rem;
            height: 1rem;
            z-index: 99;
            top: 0;
            right: 0;
        }
        #three-face-body{
            position:absolute;
            perspective: 3800;
            -webkit-perspective: 3800;
            transform-style: preserve-3d;
            top: 0;
            width: 100%;
            height: 100%;
        }
        #three-face-body div{
            transform-style:preserve-3d;
            width:100%;
            height:100%;
            position:absolute;
        }
        #three-face-body img {
            width: 100%;
            height: 100%;
        }
	   #face-1 img{
  		   transform:rotateX(180deg);
	    }

        #face-2 img{
            transform:rotateX(180deg);
        }
        #face-3 img{
            transform:rotateX(180deg);
        }
~~~

以上是***css***代码

这里比较重要的属性是***perspective*** 这个属性是**透视**的意思，所谓透视就是近大远小，后面的值是摄像机的距离，建议调大点。

还有***transform-style: preserve-3d*** 这个属性很重要，他让子元素拥有3d空间属性。 *(IE不支持这个属性,换句话说这个实现对IE没用,原网站用IE打开也刷不到这个广告)*

**face-1 img、face-2 img、face-3 img** 中的***transform:rotateX(180deg)*** 这个属性的意思是绕自身x轴转180度，其作用是让图片转过来，这里就显出了其父元素**div** 的作用，如果直接旋转**face-1、face-2** 等下用**js**修改**style** 时就会将这里的**transform**给覆盖掉。

![result](image/result.png)

这就是不转的后果。

#### 2.js部分

##### (1)构建一个五面体：

首先我们要用***transform:rotate3d***构建一个5面体，代码如下：

~~~javascript
function initThreeFace() {
    //拿到3个面
    var face1 = document.getElementById("face-1");
    var face2 = document.getElementById("face-2");
    var face3 = document.getElementById("face-3");

   
  face1.style = "transform-origin:center center .3rem;transform:rotate3d(1,0,0,0deg);"; 
    
  face2.style = "transform-origin:center center .3rem;transform:rotate3d(1,0,0,120deg);";
  
  face3.style = "transform-origin:center center .3rem;transform:rotate3d(1,0,0,-120deg);";
  
  //拿到三个面的父级元素
  var ad = document.getElementById("three-face-body");
  
  ad.style = "transform-origin:center center .3rem;transform:rotate3d(1,0,0,180deg);";
    inited = true;

}
~~~

**face1、face2、face3、ad** 中都有一段***transform-origin:center center .3rem*** 这个是重中之重，***transform-origin*** 是设置旋转围绕的点，前两个值是设置x轴和y轴，第三个值是z轴，再配合***transform:rotate3d*** ，现在三个面就是围绕着3d空间中横插过五面体的一根轴旋转 *（假设五面体是横躺着的并且三个面是绕x轴旋转的）* 。

为什么是120度，是因为将一个等边三角形平分成3份，正好120度。

然后拿到父级元素，先转个180度，这是因为由于**html**是先显示后面的元素，所以我们一开始看到的是后面两个斜着相交的面，这里的**transform-origin**也要第三个z轴的值，如果没有z轴值就会像地球绕着太阳转，是公转，有了这个值就像是自转。

**inited** 是一个全局变量，为了让初始化只进行一次。

##### (2)转动父元素：

~~~javascript
var rotate = 180;
var inited = false;
function rotateAdThreeFace() {
    if (!inited)
        initThreeFace();
    var ad = document.getElementById("three-face-body");

    if (ad) {

        rotate += 120;
        ad.style = "transform-origin:center center .3rem;transition: transform 3s;transform:rotate3d(1,0,0," + rotate.toString() + "deg);";


    }
    else {
        console.log("ad NullPointer");
    }


}
//rotateAdThreeFace();
setInterval(rotateAdThreeFace, 4000);
~~~

这一段的核心就是**ad.style....** 这句，和初始化中的是一样的，围绕一个轴自转，因为**transform:rotate3d** 是“转到”而不是“转多少”，所以不能对360度取余，不然会往回转 *（如果你不介意就取余吧）* 。

不用担心数据会大到溢出，我挂了几个小时也才加到几十万，当然这和调用频率有关，切换页面进去之后会疯狂转动应该是这个原因，原网址也有这个问题。

***END***

****



