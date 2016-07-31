## 倒计时组件

可根据给定时间节点进行倒计时，最大单位从天开始计算，最小单位从秒开始计算。

### 参数

end_time: 结束事件，格式如：2016/11/11 10:00:00

### 用法

父组件：

```javascript
<time-count-down :end_time="'2016/11/11 10:00:00'"></time-count-down>
<script>
  import timeCountDown from 'timeCountDown.vue'

  export default {
    components: {
      timeCountDown
    }
  }
</script>
```

