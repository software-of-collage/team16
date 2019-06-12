### 这是一段JavaScript，用来处理rem，使其根据浏览器大小而变化

~~~~~javascript
 (function (designWidth, maxWidth) {
        var initRem = 120;
        var win = window;
        var docEl = document.documentElement;
        var tid;
        function refreshRem() {
            var width = docEl.getBoundingClientRect().width;

            if (!maxWidth) {
                maxWidth = 620;
            }
            if (width > maxWidth) {
                width = maxWidth;
            }

            var rem = width * initRem / designWidth;
            docEl.setAttribute("style", "font-size:" + parseInt(rem) + "px");

        }
        refreshRem();
        win.addEventListener("resize", function () {
			clearTimeout(tid);
			console.log("resizing");
            tid = setTimeout(refreshRem, 300);
        }, false);


        win.addEventListener("pageshow", function (e) {
            if (e.persisted) {
                clearTimeout(tid);
                tid = setTimeout(refreshRem, 300);
            }
        });


    }(1200, 1200));
~~~~~

​	***designWidth***是设计稿大小，如果没有设计稿大小就最好和***maxWidth***(最大长度)一样，我这两个都是1200。

​	***initRem*** 是**rem**和**px**的初始比例，我这里是设成了1：120，嫌大可以自己调。

​	代码放在**body**后面，用统一的**rem**做出来的网页可以等比缩放，效果还不错。