<template>
  <div>
    <el-button
      size="small"
      type="primary"
      :disabled="flag"
      style="margin-top:15px;margin-left:15px;"
      @click="onSubmit()"
    >确定</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
import { getMember, getModifyOrderLogisticsWay } from "../../api/profit";
import { APIExportReplenish } from "../../api/product";
import { compareUp, compareDown, getMonthDate } from "../../api/tools";

export default {
  data() {
    return {
      tableHeight: window.innerHeight - 137,
      tableData: [],
      goodsState: [],
      totalPrice1: 0,
      totalPrice: 0,
      member: [],
      flag:false,
      total: null,
      purchaser: [],
      condition: {
        sku: "",
        skName: "",
        pageSize: 20,
        page: 1
      },
      listLoading: false
    };
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "color:#337ab7;background:#f5f7fa";
      } else {
        return "";
      }
    },
    exportExcel(from) {
      from.type = "auReal";
      APIExportReplenish(from).then(res => {
        const blob = new Blob([res.data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        var file = res.headers["content-disposition"]
          .split(";")[1]
          .split("filename=")[1];
        var filename = JSON.parse(file);
        const downloadElement = document.createElement("a");
        const objectUrl = window.URL.createObjectURL(blob);
        downloadElement.href = objectUrl;
        // const filename =
        //   "Wish_" + year + month + strDate + hour + minute + second;
        downloadElement.download = filename;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
      });
    },
    sortNumber(column, prop, order) {
      const data = this.tableData;
      if (column.order === "descending") {
        this.tableData = data.sort(compareDown(data, column.prop));
      } else {
        this.tableData = data.sort(compareUp(data, column.prop));
      }
    },
    handleCurrentChange(val) {
      this.condition.page = val;
      this.onSubmit(this.condition);
    },
    handleSizeChange(val) {
      this.condition.pageSize = val;
      this.onSubmit(this.condition);
    },
    onSubmit() {
      this.flag = true
      getModifyOrderLogisticsWay().then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: "成功",
            type: "success"
          });
        } else {
          this.$message.error(res.data.message);
        }
        this.flag = false
      });
    }
  },
  mounted() {
    getMember().then(response => {
      const res = response.data.data;
      this.allMember = this.member = res.filter(
        ele => ele.position === "开发" && ele.parent_id === "1"
      );
      this.purchaser = res.filter(ele => ele.position === "采购");
      this.res = res.filter(ele => ele.position === "主管");
    });
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  margin-bottom: 10px;
  .el-form-item {
    margin-bottom: 0px;
  }
}
</style>
