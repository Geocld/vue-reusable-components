## 无slot弹窗

具有两个事件按钮和一个取消按钮的弹窗。

### 参数

is_show： 弹窗是否出现，默认false，该参数需要进行双向绑定

mask_transition： 遮罩动画，用户可自行定义遮罩出现动画，如不设置则默认使用自带动画

modal_transition： 弹窗动画，用户可自行定义弹窗出现动画，如不设置则默认使用自带动画

background_color：遮罩背底色，用户可自定义遮罩背底色，如不设置则默认使用自带背底色

### 事件

event1： 按钮1的事件

event2： 按钮2的事件

### 使用

```javascript
<modal :is_show.sync="is_show_modal" 
       @event1="event1"
       @event2="event2">
</modal>
<script>
  import modal from 'components/modal.vue'
  export default {
    data () {
      return {
        is_show_modal: false
      }
    },
    methods: {
      event1: function() {
        alert('event1')
      },
      event2: function() {
        alert('event2')
      }
    },
    components: {
      modal
    }
  }
</script>
```



