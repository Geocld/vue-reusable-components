<template>
    <div class="notification" 
         v-if="is_show"
         :style="setStyle" 
         transition="slide">
         <!-- close button -->
        <div class="close"
            v-if="!options.autoClose"
            @click="close"></div>
        <!-- custom content -->
         <div class="content">
             <slot></slot>
         </div>
         <!-- process bar -->
         <div class="process-bar" 
              v-if="is_show && options.autoClose && options.processBar"
              :style="setTime" 
              :class="barControl"></div>
    </div>
</template>

<style scoped>
    .slide-transition { transition: all .3s ease; transform: translate3d(0, 0, 0); }
    .slide-enter, .slide-leave { transform: translate3d(0, -100%, 0); }
    .notification { position: fixed; top: 0; left: 0; width: 100%; z-index: 9; color: #fff; background-color: #21e7b6; }
    .notification .content { padding: .75rem 2rem; }
    .close { display: inline-block; width: 24px; height: 24px; position: relative; vertical-align: top; float: right; -webkit-appearance: none; background: rgba(51,51,51,0.2); }
    .close:before, .close:after { display: block; width: 50%; height: 2px; position: absolute; top: 50%; left: 50%; margin-left: -25%; margint-top: -1px; content: ''; background-color: #fff; }
    .close:before { transform: rotate(45deg); }
    .close:after { transform: rotate(-45deg); }
    .process-bar { position: fixed; top: 0; left: 0; z-index: 9; width: 100%; height: 3px; background-color: #000; transform: translate3d(0, 0, 0); }
    .process-leave { transform: translate3d(-100%, 0, 0); }
</style>

<script>
    module.exports = {
        props: {
            is_show: {
                type: Boolean,
                twoWay: true,
                default: false
            },
            options: {
                type: Object,
                twoWay: true,
                default: {}
            }
        },
        data: function() {
            return {
                timers: [],
                barControl: ''
            }
        },
        watch: {
            options: function() {
                var self = this;
                self.barControl = '';
                self.timers.forEach(function(timer) {
                    window.clearTimeout(timer);
                });
                self.timers = [];
                self.countdown();
            }
        },
        computed: {
            //notice style
            setStyle: function() {
                var self = this;
                return {
                    color: self.options.textColor || '#fff',
                    background: self.options.backgroundColor || '#21e7b6'
                }
            },
            //process bar style
            setTime: function() {
                var self = this;
                return {
                    transition: `all ${(this.options.showTime / 1000) || 3}s linear`,
                    background: this.options.barColor || '#03D6D2'
                }
            }
        },
        methods: {
            countdown: function() {
                var self = this;
                if (self.options.autoClose) {
                    if (self.options.autoClose) {
                        setTimeout(function() {
                            self.barControl = 'process-leave';
                        }, 10);
                    }
                    var t = setTimeout(function() {
                        self.close();
                    }, self.options.showTime || 2000);
                    self.timers.push(t);
                }
            },
            close: function() {
                var self = this;
                self.is_show = false;
                self.options = {};
            }
        }
    }
</script>
