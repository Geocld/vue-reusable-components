## 顶部通知

可自行定义内容、进度条的顶部通知

### 参数

is_show： boolean，控制通知是否出现，需双向绑定，默认flase

options： object，对通知的一系列操作，可设置如下值：

​	options.contents: 通知栏内容，string

​	options.autoClose: 通知栏是否自动关闭, boolean

​	options.backgroundColo: 通知栏背底色, string

​	options.textColor: 通知栏文字颜色, string

​	options.showTime: 通知栏在自动关闭状态下的显示时间,number

​	options.processBar: 是否显示倒计时进度条, boolean

​	options.barColor: 进度条颜色，string

### 使用

```javascript
<notice :is_show.sync="is_show" 
        :options.sync="options">
{{ contents }}
</notice>

<div style="margin-top: 100px;">
    <button @click="open">open1</button>
    <button @click="open2">open2</button>
    <button @click="open3">open3</button>
</div>
<script>
  import notice from 'notice.vue'
  export default {
    data () {
      return {
        is_show: false,
        options: {},
        contents: ''
      }
    },
    components: {
      notice
    },
    methods: {
      open: function() {
        var self = this;
        var opt = {
          autoClose: true,
        }
        self.options = opt;
        self.contents = 'this is one'
        self.is_show = true;
      },
      open2: function() {
        var self = this;
        var opt = {
          autoClose: false,
          backgroundColor: '#f77'
        }
        self.options = opt;
        self.contents = 'hello world'
        self.is_show = true;
      },
      open3: function() {
        var self = this;
        var opt = {
          autoClose: true,
          backgroundColor: '#f77',
          textColor: '#333',
          showTime: 5000,
          processBar: true
        }
        self.options = opt;
        self.contents = '33333'
        self.is_show = true;
      }
    }
  }
</script>
```

