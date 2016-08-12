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
<!------------------------------ 连续输出模式 ---------------------------------------->

        <!-- 连续输出n个月份,多选,同时可传入json禁用指定日期 -->
        <!--<calendar    :n_months="n_months"-->
                     <!--:first_value.sync="first_value"-->
                     <!--:sec_value.sync="sec_value"-->
                     <!--:is_range="true"-->
                     <!--:is_show.sync="true"-->
                     <!--:is_single_month="is_single_month"-->
                     <!--:json_data="json_data"-->
                     <!--:cur_year.sync="cur_year"-->
                     <!--:cur_month.sync="cur_month"></calendar>-->

        <!-- 连续输出n个月份,单选,同时可传入json禁用指定日期 -->
        <!--<calendar    :n_months="n_months"-->
                     <!--:first_value.sync="first_value"-->
                     <!--:is_show.sync="true"-->
                     <!--:is_single_month="is_single_month"-->
                     <!--:json_data="json_data"-->
                     <!--:cur_year.sync="cur_year"-->
                     <!--:cur_month.sync="cur_month"></calendar>-->

        <!-- 日期区间输出,多选,同时可传入json禁用指定日期 -->
        <!--<calendar    :daterange="true"-->
                     <!--:date-begin="[2016, 7, 20]"-->
                     <!--:date-end="[2016, 10, 10]"-->
                     <!--:first_value.sync="first_value"-->
                     <!--:sec_value.sync="sec_value"-->
                     <!--:is_range="true"-->
                     <!--:is_show.sync="true"-->
                     <!--:is_single_month="is_single_month"-->
                     <!--:json_data="json_data"-->
                     <!--:cur_year.sync="cur_year"-->
                     <!--:cur_month.sync="cur_month"></calendar>-->

        <!-- 日期区间输出,单选,同时可传入json禁用指定日期 -->
        <!--<calendar    :daterange="true"-->
                     <!--:date-begin="[2016, 7, 20]"-->
                     <!--:date-end="[2016, 10, 10]"-->
                     <!--:first_value.sync="first_value"-->
                     <!--:is_show.sync="true"-->
                     <!--:is_single_month="is_single_month"-->
                     <!--:json_data="json_data"-->
                     <!--:cur_year.sync="cur_year"-->
                     <!--:cur_month.sync="cur_month"></calendar>-->

        <!------------------------------ 单月份输出模式 ---------------------------------------->
        <!-- 多选,同时可传入json禁用指定日期 -->
        <calendar    :first_value.sync="first_value"
                     :sec_value.sync="sec_value"
                     :is_show.sync="true"
                     :is_single_month="is_single_month"
                     :is_range="true"
                     :json_data="json_data"
                     :cur_year.sync="cur_year"
                     :cur_month.sync="cur_month"></calendar>

        <!-- 单选,同时可传入json禁用指定日期 -->
        <!--<calendar    :first_value.sync="first_value"-->
                     <!--:is_show.sync="true"-->
                     <!--:is_single_month="is_single_month"-->
                     <!--:json_data="json_data"-->
                     <!--:cur_year.sync="cur_year"-->
                     <!--:cur_month.sync="cur_month"></calendar>-->

        <!-- 区间输出,多选,同时可传入json禁用指定日期 -->
        <!--<calendar    :daterange="true"-->
                     <!--:date-begin="[2016, 7, 20]"-->
                     <!--:date-end="[2016, 10, 10]"-->
                     <!--:first_value.sync="first_value"-->
                     <!--:is_show.sync="true"-->
                     <!--:is_single_month="is_single_month"-->
                     <!--:is_range="true"-->
                     <!--:json_data="json_data"-->
                     <!--:cur_year.sync="cur_year"-->
                     <!--:cur_month.sync="cur_month"></calendar>-->

        <!-- 区间输出,单选,同时可传入json禁用指定日期 -->
        <!--<calendar    :daterange="true"-->
                     <!--:date-begin="[2016, 8, 15]"-->
                     <!--:date-end="[2016, 10, 10]"-->
                     <!--:first_value.sync="first_value"-->
                     <!--:is_show.sync="true"-->
                     <!--:is_single_month="is_single_month"-->
                     <!--:json_data="json_data"-->
                     <!--:cur_year.sync="cur_year"-->
                     <!--:cur_month.sync="cur_month"></calendar>-->
<script>
import calendar from 'calendar.vue'
export default {
  data () {
    return {
      first_value: '',
      sec_value : '',

      is_single_month: true, //是否为单日期输出,默认为true
      is_daterange: false, //是否指定日期范围输出,默认false
      n_months: 3, //连续输出模式下输出月份的个数
      cur_year: 0, //单月份输出模式下日历的当前年份、连续输出模式下日历的第一个年份
      cur_month: 0,//单月份输出模式下日历的当前月份、连续输出模式下日历的第一个月份
      json_data: {}//需要自定义禁用日期的object
    }
  },
  created: function() {
    //单月份输出时需要在父组件定义此事件,每次切换月份需要重新渲染
    var self = this;
    this.dayDisable();

    //json数据处理后需要重新渲染日历
    Vue.nextTick(function() {
      self.$broadcast('re_render');
    });
  },
  events: {
    //单月份输出时需要在父组件定义此事件,每次切换月份需要重新渲染
    'change': function() {
      var self = this;
      self.dayDisable();
      Vue.nextTick(function() {
        self.$broadcast('re_render');
      });
    }
  },
  components: {
    calendar
  }
}
</script>
```



