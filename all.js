function FBasyncInit(options, callback){
  const JS_FILES = [  
    'src/third-party/json2.js',

    'src/core/prelude.js',
    'src/common/type.js',

    'src/core/api.js',
    'src/core/auth.js',

    'src/core/canvas.js',
    'src/core/content.js',
    'src/core/cookie.js',
    'src/core/dialog.js',
    'src/core/event.js',
    'src/core/flash.js',
    'src/core/init.js',
    'src/core/insights.js',
    'src/core/intl.js',
    'src/core/json.js',
    'src/core/qs.js',
    'src/core/ui.js',
    'src/core/ui_methods.js',
    'src/core/xd.js',

    'src/compat/ui.js',

    'src/common/array.js',
    'src/common/dom.js',
    'src/common/obj.js',
    'src/common/string.js',

    'src/data/waitable.js',
    'src/data/query.js',
    'src/data/data.js',

    'src/xfbml/element.js',
    'src/xfbml/xfbml.js',
    'src/xfbml/helper.js',
    'src/xfbml/iframe_widget.js',
    'src/xfbml/button_element.js',
    'src/xfbml/edge_widget.js',

    'src/xfbml/tags/activity.js',
    'src/xfbml/tags/comments.js',
    'src/xfbml/tags/fan.js',
    'src/xfbml/tags/like.js',
    'src/xfbml/tags/live_stream.js',
    'src/xfbml/tags/loginbutton.js',
    'src/xfbml/tags/logoutbutton.js',
    'src/xfbml/tags/name.js',
    'src/xfbml/tags/profilepic.js',
    'src/xfbml/tags/recommendations.js',
    'src/xfbml/tags/serverfbml.js',
    'src/xfbml/tags/sharebutton.js',

    'src/strings/en_US.js'
  ];
  const CSS_FILES = [
    'src/css/dialog.css',
    'src/css/button.css',
    'src/css/share_button.css',
    'src/css/base.css',
    'src/css/iframe_widget.css'
  ];
  var jsLoaded = 0, cssLoaded = 0, css = "", xhr = [];
  if (!document.getElementById('fb-root')) {
    var fbRoot = document.createElement('div');
    fbRoot.id='fb-root';
    document.body.appendChild(fbRoot);
  }
  for (i in JS_FILES) {
    script = document.createElement('script');
    script.src = JS_FILES[i];
    script.addEventListener('load', function() {
      console.log(this);
      if (++jsLoaded == JS_FILES.length) {
        console.log('done js');
        FB.init(options);
        FB.Helper.invokeHandler(callback, FB);
        if (cssLoaded == CSS_FILES.length) 
          FB.Dom.addCssRules(css, ["pkg"]);
      }
    });
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  for (i in CSS_FILES) {
    xhr[i] = new XMLHttpRequest();
    xhr[i].open('GET',CSS_FILES[i]);
    xhr[i].onreadystatechange = function() {
      if (this.readyState != 4) 
        return;
      css += this.response.replace(/url\(\//g, 'url(http://static.ak.fbcdn.net/');
      if (++cssLoaded == CSS_FILES.length && jsLoaded == JS_FILES.length) 
        FB.Dom.addCssRules(css, ["pkg"]);
    };
    xhr[i].send();
  }
}
