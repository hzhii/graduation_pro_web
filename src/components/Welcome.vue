<template>
  <el-calendar v-model="value" id="calendar">
    <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
    <template slot="dateCell" slot-scope="{ date, data }">
      <!--自定义内容-->
      <div>
        <div class="calendar-day">
          {{
            data.day
              .split("-")
              .slice(2)
              .join("-")
          }}
        </div>
        <div v-for="item in calendarData">
          <div
            v-if="item.months.indexOf(data.day.split('-').slice(1)[0]) != -1"
          >
            <!-- 将时间戳进行转换，判断是否为当天 -->
            <div
              v-if="
                item.days.indexOf(
                  data.day
                    .split('-')
                    .slice(2)
                    .join('-')
                ) != -1
              "
            >
              <!-- 提示的样式 -->
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.things"
                placement="right"
              >
                <!-- 具体的日历排程内容 -->
                <div class="is-selected">{{ item.things }}</div>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </template>
  </el-calendar>
</template>
<script>
export default {
  name: "calendar",
  data() {
    return {
      calendarData: [
        { months: ["02"], days: ["11"], things: "看电影" },
        { months: ["02"], days: ["11"], things: "去公园野炊" },
        { months: ["02"], days: ["11"], things: "看星星" },
        { months: ["02"], days: ["14"], things: "看月亮" }
      ],
      value: new Date()
    };
  }
};
</script>
<style lang="less">
.el-calendar-table:not(.is-range) td.next,
.el-calendar-table:not(.is-range) td.prev {
  opacity: 0.7;
  .calendar-day,
  .is-selected {
    color: #e4edf9;
  }
}

.calendar-day {
  text-align: left;
  color: #202535;
  line-height: 30px;
  font-size: 12px;
}
.is-selected {
  color: #f8a535;
  font-size: 10px;
}
#calendar
  .el-button-group
  > .el-button:not(:first-child):not(:last-child):after {
  content: "当月";
}
</style>
