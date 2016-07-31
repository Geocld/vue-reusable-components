## 滚动式日历组件

可自定义输出月份数量、进行单选/多选日期的日历组件

### 参数

`n_months`： 连续输出的月份数量,从本月之后算起(此参数受daterange参数影响,如daterange为true则n_months参数无效)

`is_show`： 日历是否显示，该参数需要父子组件双向绑定

`first_value`： 单选时绑定的值、多选是绑定的第一个值

`sec_value`： 多选时绑定的第二个值

`is_range`： 是否选择日期范围，默认为单选日期范围

`daterange`： 日历范围输出（如果此参数为true,则n_months参数无效），boolean，默认为false

`dateBegin`：  日历范围输出时的起始日期，以数组的形式传递，例如[2016, 8, 10]

`dateEnd`:  日历范围输出时的结束日期，以数组的形式传递，例如[2017, 12, 31]

`is_todayDisable`:  是否禁用今天之前的日期，boolean，默认为true，禁用今天之前日期

`select_sum`： 日期范围选择（is_range = true）时共选择的天数，父组件可根据需要以`select_sum.sync`的形式进行读取

### 使用

父组件：

```javascript
<calendar	 :n_months="13"
			:first_value.sync="first_value"
			:sec_value.sync="sec_value"
			:is_range="true"
			:is_show.sync="true"></calendar>
<script>
import calendar from 'calendar.vue'
export default {
  data () {
    return {
      first_value: '',
      sec_value: ''
    }
  },
  components: {
    calendar
  }
}
</script>
```



