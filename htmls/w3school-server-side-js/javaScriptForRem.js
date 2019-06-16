
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
            tid = setTimeout(refreshRem, 300);
        }, false);


        win.addEventListener("pageshow", function (e) {
            if (e.persisted) {
                clearTimeout(tid);
                tid = setTimeout(refreshRem, 300);
            }
        });


    }(1200, 1200));
