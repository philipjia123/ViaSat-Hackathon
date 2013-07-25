console.log('watermark: Start');

(function() {
  console.log('watermark: Init defaults');
  var defaults = {
        file: 'square.png',
        topLeft: [0, 0],
        bottomRight: [0, 0],
        xrepeat: 0,
        opacity: 0.5
    },
    extend = function() {
      var args, target, i, object, property;
      args = Array.prototype.slice.call(arguments);
      target = args.shift() || {};
      for (i in args) {
        object = args[i];
        for (property in object) {
          if (object.hasOwnProperty(property)) {
            if (typeof object[property] === 'object') {
              target[property] = extend(target[property], object[property]);
            } else {
              target[property] = object[property];
            }
          }
        }
      }
      return target;
    };

  /**
   * register the thubmnails plugin
   */
  videojs.plugin('watermark', function(options) {
    console.log('watermark: Register init');

    var settings, video, div, img, player;
    settings = extend(defaults, options);

    /* Grab the necessary DOM elements */
    video = this.el();
  
	//Grab video player
	player = window.my_video_id;
	console.debug('player', player);

    // create the watermark element
    div = document.createElement('div');
    img = document.createElement('img');
    div.appendChild(img);
	
	//Video resize function
	/*var resize = function(){
		console.log('fullscreen change!');
	}
	
	//Video fullscreen event
	player.on("fullscreenchange", console.log("hi"));*/
	
	//Click event
	img.onclick = function(){
		window.open("http://google.com");
		player.pause();
	}
	
	//Mouse over event
	img.onmouseover = function(){
		div.style.opacity = options.opacity + 0.3;
	}
	
	//Mouse out event
	img.onmouseout = function(){
		div.style.opacity = options.opacity;
	}
	
	//Mouse down event
	img.onmousedown = function(){
		div.style.opacity = options.opacity + 0.5;
	}
	
    img.className = 'vjs-watermark';
	
	//Grab image file
    img.src = options.file;

	var top = String(options.topLeft[1] * player.height() + "px");
	var left = String(options.topLeft[0] * player.width() + "px");
	
	var h = String((options.bottomRight[1] - options.topLeft[1])  * player.height() + "px");
	var w = String((options.bottomRight[0] - options.topLeft[0]) * player.width() + "px");
	
	img.style.top = top;
	img.style.left = left;
	img.style.height = h;
	img.style.width = w;
	
    div.style.opacity = options.opacity;

    // add the watermark to the player
    video.appendChild(div);

    //video.oncontextmenu = function(){alert("Hello!");}
    console.log('watermark: Register end');
  });
})();
