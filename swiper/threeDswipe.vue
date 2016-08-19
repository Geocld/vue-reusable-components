<template>
  <div id="wrap">
    <slot></slot>
  </div>
</template>

<style>
  #wrap { width: 100%; height: 100vh; }
</style>

<script type="text/ecmascript-6">
  export default {
    props: {
      is_auto_play: {
        type: Boolean,
        default: false
      },
      auto_play_time: {
        type: Number,
        default: 3000
      },
      is_loop: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        speed: 500,
        is_touch: false,
        cube: {},
        timer: {}
      }
    },
    ready() {
      var self = this;
      var wrap = document.getElementById("wrap");
      self.turn(wrap);
      if (self.is_auto_play) {
        self.timer = setInterval (() => self.up(), self.auto_play_time);
      }
    },
    methods: {
      //翻转
      turn(wrap) {
        var self = this;
        wrap.style.webkitPerspective = wrap.offsetHeight / 2 + 'px';
        var speed = self.speed;
        self.is_touch = false;
        var movedeg = 0;
        var y = 0;
        var main = document.createElement('div');
        main.style.width = '100%';
        main.style.height = '100%';
        main.style.position = 'relative';
        main.style.webkitTransform = 'rotate3d(1, 0, 0, 0deg) translate3d(0, 0,' + wrap.offsetHeight / -2 + 'px)';
        main.style.webkitTransformStyle = 'preserve-3d';

        var cube = document.createElement('div');
        self.cube = cube;
        cube.style.webkitTransition = '0s';
        cube.style.transition = '0s';
        cube.style.width = '100%';
        cube.style.height = '100%';
        cube.style.webkitTransform = 'rotate3d(1, 0, 0, 0deg)';
        cube.style.webkitTransformStyle = 'preserve-3d';

        var n = wrap.children.length;
        for(let i = 0; i < n; i++) {
          wrap.children[0].style.width = '100%';
          wrap.children[0].style.height = '100%';
          wrap.children[0].style.position = 'absolute';
          if (i == 0) { //当前
            wrap.children[0].style.webkitTransform = 'rotate3d(1, 0, 0, 0deg) translate3d(0, 0,' + wrap.offsetHeight / 2 + 'px)';
          }
          else if (i == 1) { //下一张
            wrap.children[0].style.webkitTransform = 'rotate3d(1, 0, 0, -90deg) translate3d(0, 0,' + wrap.offsetHeight / 2 + 'px)';
          }
          else if (i == n - 1) { //上一张
            wrap.children[0].style.webkitTransform = 'rotate3d(1, 0, 0, 90deg) translate3d(0, 0,' + wrap.offsetHeight / 2 + 'px)';
          }
          else {
            wrap.children[0].style.webkitTransform = 'rotate3d(1, 0, 0, 0deg) translate3d(0, 0,' + wrap.offsetHeight / -2 + 'px)';
          }
          cube.appendChild(wrap.children[0]); //dom转移，而非复制
        }
        main.appendChild(cube);
        wrap.appendChild(main);

        //console.log(self.cube)
        for (let k = 0; k < self.cube.children.length; k++) {
          self.cube.children[k].index = k;
        }

        function fnmove() { //move动作
          movedeg = Math.round((y - event.touches[0].screenY) / 5);
          //循环操作
          if (!self.is_loop) {
            if (self.cube.children[0].index == 0) {
              if (movedeg < 0) {
                movedeg = 0;
              }
            }
            else if (self.cube.children[0].index == self.cube.children.length - 1) {
              if (movedeg > 0) {
                movedeg = 0;
              }
            }
          }
          cube.style.webkitTransform = 'rotate3d(1, 0, 0,' + movedeg + 'deg)';
          event.preventDefault();
        }

        //开始触摸事件
        wrap.addEventListener('touchstart', function() {
          if (self.is_touch) {
            this.removeEventListener('touchmove', fnmove, false);
            return
          }
          //触摸时停止自动播放
          clearInterval(self.timer);
          y = event.touches[0].screenY;
          if (event.touches.length == 1) {
            cube.style.transition = "0s";   
            cube.style.webkitTransition = "0s";
            this.addEventListener("touchmove", fnmove, false);
          }
        }, false);

        //触摸结束事件
        wrap.addEventListener('touchend', function() {
          if (self.is_touch) return

          if (movedeg > 20) {
            self.up();
          }
          else if (movedeg < -20) {
            self.down();
          }
          else {
            cube.style.transition = self.speed + "ms";
            cube.style.webkitTransition= self.speed + "ms";
            cube.style.webkitTransform = "rotate3d(1, 0, 0, 0deg)";
          }
          movedeg = 0;
          if (self.is_auto_play) {
            self.timer = setInterval (() => self.up(), self.auto_play_time);
          }
        }, false);
      },
      down() {
        var self = this;
        if(self.is_touch) return
        self.is_touch = true;
        self.cube.style.transition = self.speed + 'ms';
        self.cube.style.webkitTransition = self.speed + "ms";
        self.cube.style.webkitTransform = "rotate3d(1, 0, 0, -90deg)";
        setTimeout(() => {
          //将最后一个元素设置为第一个元素
          self.cube.insertBefore(self.cube.children[self.cube.children.length - 1], self.cube.children[0]);
          self.cube.style.transition = '0s';
          self.cube.style.webkitTransition = '0s';
          self.cube.style.webkitTransform = 'rotate3d(1, 0, 0, 0deg)';
          self.change();
          self.is_touch = false;
          console.log(self.cube.children[0].index)
        }, self.speed);
      },
      up() {
        var self = this;
        if(self.is_touch) return
        self.is_touch = true;
        self.cube.style.transition = self.speed + 'ms';
        self.cube.style.webkitTransition = self.speed + "ms";
        self.cube.style.webkitTransform = "rotate3d(1, 0, 0, 90deg)";
        setTimeout(() => {
          self.cube.appendChild(self.cube.children[0]); //将第一个放到最后
          self.cube.style.transition = '0s';
          self.cube.style.webkitTransition = '0s';
          self.cube.style.webkitTransform = 'rotate3d(1, 0, 0, 0deg)';
          self.change();
          self.is_touch = false;
          console.log(self.cube.children[0].index)
        }, self.speed);
      },
      change() {
        var self = this;
        for (let n = 0; n < self.cube.children.length; n++) {
          if (n == 0) {
            self.cube.children[n].style.webkitTransform = 'rotate3d(1, 0, 0, 0deg) translate3d(0, 0,' + self.cube.offsetHeight / 2 + 'px)';
          }
          else if (n == 1) {
            self.cube.children[n].style.webkitTransform = 'rotate3d(1, 0, 0, -90deg) translate3d(0, 0,' + self.cube.offsetHeight / 2 + 'px)';
          }
          else if (n == self.cube.children.length - 1) {
            self.cube.children[n].style.webkitTransform = 'rotate3d(1, 0, 0, 90deg) translate3d(0, 0,' + self.cube.offsetHeight / 2 + 'px)';
          }
          else {
            self.cube.children[n].style.webkitTransform = 'rotate3d(1, 0, 0, 0deg) translate3d(0, 0,' + self.cube.offsetHeight / -2 + 'px)';
          }
        }
      }
    }
  }
</script>