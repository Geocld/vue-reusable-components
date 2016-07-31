<template>
    <section class="modal" v-if="is_show" :transition="mask_transition" @click="is_show = false">
        <div class="modal-wrap"
             v-if="is_show"
             :style="{ 'background-color': background_color }"
             :transition="modal_transition"
             @click.stop>
            <div class="user-option">
                <div class="red" @click="$dispatch('event1')">事件1</div>
                <div class="normal" @click="$dispatch('event2')">事件2</div>
            </div>
            <div class="cancel" @click="is_show = false">取消</div>
        </div>
    </section>
</template>

<style scoped>
    .modal { position : fixed; z-index : 10000; top : 0; left : 0; right : 0; bottom : 0; background : rgba(0, 0, 0, .5) }
    .modal .modal-wrap { position : absolute; bottom : 0; left : 0; right : 0; margin: 5px; }
    .modal .user-option { margin-bottom: 10px; border: 1px solid #eee; border-radius: 10px; }
    .modal .red, .modal .normal, .modal .cancel { height: 42px; line-height: 42px; text-align: center; background-color: #fff; font-size: 16px; }
    .modal .red { border-bottom: 1px solid #eee; border-top-left-radius: 6px; border-top-right-radius: 6px; color: #FF5A5F; }
    .modal .normal { border-bottom-left-radius: 6px; border-bottom-right-radius: 6px; color: #007AFF; }
    .modal .cancel { border-top: 1px solid #eee; opacity: 1; border-radius: 8px; color: #007AFF; }
    
    /* animation */
    .slide-up-transition {
        transition : all .3s ease;
        opacity    : 1;
    }
    .slide-up-enter, .slide-up-leave {
        transform : translateY(30px);
        opacity   : 0;
    }

    .fade-enter {
        -webkit-animation : fade-in .3s;
    }
    .fade-leave {
        -webkit-animation : fade-out .3s;
    }
    @-webkit-keyframes fade-in {
        0% {
            opacity : 0;
        }
        100% {
            opacity : 1;
        }
    }
    @-webkit-keyframes fade-out {
        0% {
            opacity : 1;
        }
        100% {
            opacity : 0;
        }
    }
</style>

<script>
    module.exports = {
        props : {
            //弹窗是否出现
            is_show            : {
                type    : Boolean,
                twoWay  : true,
                default : false
            },
            mask_transition    : {
                type    : String,
                default : 'fade'
            },
            modal_transition   : {
                type    : String,
                default : 'slide-up'
            },
            background_color   : String,
        }
    }
</script>
