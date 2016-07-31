<template>
    <section class="modal" v-if="is_show" :transition="mask_transition" @click="is_show = false">
        <div class="modal-wrap"
             v-if="is_show"
             :style="{ 'background-color': background_color }"
             :transition="modal_transition"
             @click.stop>
            <header class="modal-title">{{ title }}</header>
            <div class="modal-content">
                <slot></slot>
            </div>
            <footer class="modal-actions">
                <div class="modal-action" v-if="use_action_cancel" @click="is_show = false">取消</div>
                <div class="modal-action" v-if="use_action_confirm" @click="$dispatch('do-confirm')">确认</div>
            </footer>
        </div>
    </section>
</template>

<style scoped>
    .modal { position : fixed; z-index : 10000; top : 0; left : 0; right : 0; bottom : 0; background : rgba(255, 255, 255, .9); }
    .modal .modal-wrap { position : absolute; bottom : 0; left : 0; right : 0; min-height : 100px; background : #fff; box-shadow : 0 -2px 8px -3px rgba(0, 0, 0, .3); }
    .modal .modal-title { margin : 0 15px; line-height : 50px; text-align : center; font-weight : bold; border-bottom : 1px solid #eee; }
    .modal .modal-content { max-height: 300px; overflow-y : auto; }
    .modal .modal-actions { display : flex; line-height : 44px; text-align : center; border-top : 1px solid #eee; }
    .modal .modal-actions .modal-action { flex : 1; }
    .modal .modal-actions .modal-action:not(:first-child) { border-left : 1px solid #eee; }
    .slide-up-transition {
        transition : all .3s ease;
        opacity    : 1;
    }
    .slide-up-enter, .slide-up-leave {
        transform : translateY(30px);
        opacity   : 0;
    }
</style>

<script>
    module.exports = {
        props : {
            is_show            : {
                type    : Boolean,
                twoWay  : true,
                default : false
            },
            use_action_cancel  : {
                type    : Boolean,
                default : true
            },
            use_action_confirm : {
                type    : Boolean,
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
            title              : String,
            background_color   : String
        }
    }
</script>
