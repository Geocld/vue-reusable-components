<template>
	<div>
		{{ count_day }}<em>天</em>{{ count_hour }}<em>时</em>{{ count_minute }}<em>分</em>{{ count_sec }}<em>秒</em>
	</div>
</template>

<script>
	export default {
		props: [ 'end_time' ],
		data() {
			return {
				now: '',
            	timeEnd: ''
			}
		},
		created: function() {
            var self = this;
            self.timeEnd = new Date(self.end_time);
            window.setInterval(function() {
                var time_now = new Date(); // 获取当前时间
                self.now = time_now.getTime();
            },1000);
        },
		computed: {
            count_day: function() {
                var self = this;
                var int_day = 0;
                var time_now = new Date(); // 获取当前时间
                self.now = time_now.getTime();
                var time_distance = self.timeEnd - self.now;
                if (time_distance >= 0) {
                    int_day = Math.floor(time_distance / 86400000);
                    time_distance -= int_day * 86400000;
                }
                return int_day
            },
            count_hour: function() {
                var self = this;
                var int_day = 0, int_hour = 0;
                var time_distance = self.timeEnd - self.now; // 时间差：活动结束时间减去当前时间
                if (time_distance >= 0) {
                    // 相减的差数换算成天数
                    int_day = Math.floor(time_distance / 86400000);
                    time_distance -= int_day * 86400000;

                    // 相减的差数换算成小时
                    int_hour = Math.floor(time_distance / 3600000);
                    time_distance -= int_hour * 3600000;
                    // 判断小时小于10时，前面加0进行占位
                    if (int_hour < 10) int_hour = "0" + int_hour;
                }
                return int_hour
            },
            count_minute: function() {
                var self = this;
                var int_day = 0, int_hour = 0, int_minute = 0;
                var time_distance = self.timeEnd - self.now; // 时间差：活动结束时间减去当前时间
                if (time_distance >= 0) {
                    // 相减的差数换算成天数
                    int_day = Math.floor(time_distance / 86400000);
                    time_distance -= int_day * 86400000;

                    // 相减的差数换算成小时
                    int_hour = Math.floor(time_distance / 3600000);
                    time_distance -= int_hour * 3600000;
                    // 相减的差数换算成分钟
                    int_minute = Math.floor(time_distance / 60000);
                    time_distance -= int_minute * 60000;

                    // 判断分钟小于10时，前面加0进行占位
                    if (int_minute < 10) int_minute = "0" + int_minute;

                }
                return int_minute
            },
            count_sec: function() {
                var self = this;
                var int_day, int_hour, int_minute, int_second = 0;
                var time_distance = self.timeEnd - self.now; // 时间差：活动结束时间减去当前时间
                if (time_distance >= 0) {
                    // 相减的差数换算成天数
                    int_day = Math.floor(time_distance / 86400000);
                    time_distance -= int_day * 86400000;

                    // 相减的差数换算成小时
                    int_hour = Math.floor(time_distance / 3600000);
                    time_distance -= int_hour * 3600000;
                    // 相减的差数换算成分钟
                    int_minute = Math.floor(time_distance / 60000);
                    time_distance -= int_minute * 60000;

                    // 相减的差数换算成秒数
                    int_second = Math.floor(time_distance / 1000);
                    // 判断秒数小于10时，前面加0进行占位
                    if (int_second < 10) int_second = "0" + int_second;
                }
                return int_second
            }
        }
	}
</script>
