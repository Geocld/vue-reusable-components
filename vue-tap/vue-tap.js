(function() {
	var vueTap = {};
	vueTap.install = function(Vue) {
		Vue.directive('tap', {
			isFn: true,
			acceptStatement : true,
			bind: function() {

			},
			update: function(fn) {
				var self = this;
				self.tapObj = {};
				self.count = 0;
				self.p = 0;

				if (typeof fn !== 'function') {
					return false
				}
				self.handler = function(e) {
					e.tapObj = self.tapObj;
					fn.call(self, e);
				}

				this.el.addEventListener('touchstart', function(e) {
					self.touchstart(e, self);
				});

				// this.el.addEventListener('touchmove', function(e) {
				// 	self.touchMove(e, self);
				// });

				this.el.addEventListener('touchend', function(e) {
					self.touchend(e, self, fn)
				});
			},
			unbind: function() {

			},
			//是否是点击
			isTap: function() {
				var self = this;
				var tapObj = self.tapObj;
				return self.time < 150 && Math.abs(tapObj.distanceX) < 4 && Math.abs(tapObj.distanceY) < 4;
			},
			touchstart: function(e, self) {
				self.tapObj.distanceX = 0;
				self.tapObj.distanceY = 0;
				var touches = e.touches[0];
				var tapObj = self.tapObj;

				tapObj.pageX = touches.pageX;
				tapObj.pageY = touches.pageY;
				tapObj.clientX = touches.clientX;
				tapObj.clientY = touches.clientY;
				self.time = +new Date();
			},
			//touchmove暂无有效方法
			// touchMove: function(e, self) {
			// 	var touches = e.touches[0];
			// 	var status = 'swiper';
			// 	var tapObj = self.tapObj;
			// 	tapObj.distanceX = touches.pageX - tapObj.pageX;
			// 	tapObj.distanceY = touches.pageY - tapObj.pageY;

			// 	//算法
			// 	self.count++; //滑动次数
			// 	self.p = self.p + 0.5 * tapObj.distanceY * tapObj.distanceY / tapObj.distanceX;
			// 	var pAvg = self.p / self.count; //平均值
			// 	var touchS = (2/3) * (2 * pAvg * tapObj.distanceX) * Math.sqrt(2 * pAvg * tapObj.distanceX);
				
			// 	var target = e.currentTarget;
			// 	var targetW = target.getBoundingClientRect().height;
			// 	var targetH = target.getBoundingClientRect().width;
			// 	var targetS = 0;

			// 	if((targetH / targetW) > 0.1405) {
   //          		targetS = (2/3) * (Math.abs(tapObj.distanceX) * targetW * 0.0197) * Math.sqrt( Math.abs(tapObj.distanceX) * targetW * 0.0197 );
			// 	}
			// 	else {
			// 		targetS = (2/3) * ( targetH * targetH * Math.abs(tapObj.distanceX) / targetW) * Math.sqrt( targetH * targetH * Math.abs(tapObj.distanceX) / targetW);
			// 	}
			// 	console.log(Math.abs(touchS), '手指曲线')
			// 	//console.log(targetS, '目标曲线')
			// 	if (touchS < targetS) {
			// 		//self.handler(e);
			// 	}
			// },
			touchend: function(e, self) {
				var touches = e.changedTouches[0];
				var tapObj = self.tapObj;
				self.time = +new Date() - self.time;
				tapObj.distanceX = tapObj.pageX - touches.pageX;
				tapObj.distanceY = tapObj.pageY - touches.pageY;

				//计算滑动方向
				var x1 = tapObj.pageX;
				var x2 = tapObj.pageX + tapObj.distanceX;
				var y1 = tapObj.pageY;
				var y2 = tapObj.pageY + tapObj.distanceY;

				var status = Math.abs(x2 - x1) >= Math.abs(y2 - y1) ? (x2 - x1 > 0 ? 'left' : 'right') : (y2 - y1 > 0 ? 'up' : 'down');

				if(self.isTap()) {
					setTimeout(function() {
						console.log('tap')
						self.handler(e);
					},20);
				}
				else {
					console.log(status);
					self.handler(e);
				}
				self.p = 0;
				self.count = 0;
			}
		});
	};

	if (typeof exports == "object") {
        module.exports = vueTap;
    } else if (typeof define == "function" && define.amd) {
        define([], function(){ return vueTap })
    } else if (window.Vue) {
        window.vueTap = vueTap;
        Vue.use(vueTap);
    }
})();