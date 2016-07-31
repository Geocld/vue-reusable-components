## 带slot弹窗

可自定义title，弹窗内内容的modal

### 参数

is_show： 控制弹窗出现以及隐藏，默认为false，需双向绑定

use_action_cancel： 是否设置用户取消按钮，默认为true

use_action_confirm： 是否设置用户确认按钮，默认为false

mask_transition： 遮罩动画，用户可自定义遮罩动画，若此项不设置则使用默认动画

modal_transition：对话框动画，用户可自定义对话框动画，若此项不设置则使用默认动画

title：弹窗标题

background_color： 遮罩颜色

### 事件

do-confirm： 用户确认按钮事件

### 使用

```javascript
<modal :is_show.sync="is_show_modal" 
       :use_action_confirm="true" 
       :title="'test'" @do-confirm="doConfirm">
       <div style="height:200px;">slot content</div>
</modal>
<script>
import modal from 'components/modal-slot.vue'
export default {
  data () {
    return {
      is_show_modal: false
    }
  },
  methods: {
    doConfirm: function() {
      alert('confirm')
    }
  },
  components: {
    modal
  }
}
</script>
```

