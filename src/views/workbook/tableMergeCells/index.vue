<template>
  <div class="container">
    <el-table
      :cell-class-name="cellclass"
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
      :row-class-name="tableRowClassName"
      :header-cell-style="{
        height: '68px',
        backgroundColor: '#F0F5FF',
        fontSize: '14px',
      }"
    >
      <!-- <el-table-column prop="id" label="ID" width="180"> </el-table-column> -->
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="amount1" label="数值 1（元）"> </el-table-column>
      <el-table-column prop="amount2" label="数值 2（元）"> </el-table-column>
      <el-table-column prop="amount3" label="数值 3（元）"> </el-table-column>
    </el-table>
  </div>
</template>
<script setup name="TableMergeCells">
const { proxy } = getCurrentInstance();
const rrowSpanArr = ref([]);
const data = reactive({
  tableData: [
    {
      // id: "12987122",
      name: "王小虎",
      amount1: "234",
      amount2: "3.2",
      amount3: 10,
    },
    {
      // id: "12987123",
      name: "王小虎",
      amount1: "165",
      amount2: "4.43",
      amount3: 12,
    },
    {
      // id: "12987124",
      name: "王小虎",
      amount1: "324",
      amount2: "1.9",
      amount3: 9,
    },
    {
      // id: "12987125",
      name: "王小虎",
      amount1: "621",
      amount2: "2.2",
      amount3: 17,
    },
    {
      // id: "12987126",
      name: "王小虎",
      amount1: "539",
      amount2: "4.1",
      amount3: 15,
    },
    {
      // id: "12987127",
      name: "王小虎",
      amount1: "59",
      amount2: "41",
      amount3: 16,
    },
  ],
});
const { tableData } = toRefs(data);
function tableRowClassName({ row, rowIndex }) {
  if (rowIndex === 1) {
    return "warning-row";
  } else if (rowIndex === 3) {
    return "success-row";
  }
  return "";
}
// 给符合条件边框提亮
function cellclass(data) {
  if (data.row.isTop) return "topStyle";
}
function handleTableData(tableData) {
  let rowSpanArr = [],
    position = 0;
  for (let [index, item] of tableData.entries()) {
    console.log([index, item], "[index, item]");
    if (index == 0) {
      rowSpanArr.push(1);
      position = 0;
    } else {
      //此处注意name为要合并的列名，tableData[index - 1]为上一行数据，tableData[index]为当前行数据
      if (item.name == tableData[index - 1].name) {
        rowSpanArr[position] += 1; //项目名称相同，合并到同一个数组中
        rowSpanArr.push(0);
      } else {
        // https://blog.csdn.net/weixin_55977434/article/details/132088138
        // this.$set(tableData,index,row)来更新tableData中的数据
        this.$set(this.tableData, index, {
          ...this.tableData[index],
          isTop: 1,
        });
        rowSpanArr.push(1);
        position = index;
      }
    }
    console.log(rowSpanArr, "rowSpanArr");
  }
  rrowSpanArr.value = rowSpanArr;
  console.log(rrowSpanArr.value, "rrowSpanArr.value");
}

function objectSpanMethod({ row, column, rowIndex, columnIndex }) {
  //#region
  /**start***基础判断*******/
  // if (columnIndex === 0) {
  //   // 判断是不是第一列，只有第一列才执行合并
  //   if (rowIndex % 2 === 0) {
  //     // 判断能不能被2整除
  //     return {
  //       rowspan: 2, // 从当前单元格开始，执行合并2行
  //       colspan: 1, // 从当前单元格开始，执行合并1列
  //     };
  //   } else {
  //     return {
  //       // 第一列的其他元素不执行合并
  //       rowspan: 0, // 为0，不执行合并
  //       colspan: 0, // 为0，不执行合并
  //     };
  //   }
  // }
  /*******基础判断*******end*/
  //#endregion
  //#region
  /*******确定行数做合并单元格*****start*************/

  // console.log(row, column, rowIndex, columnIndex);
  // if (columnIndex === 1) {
  //   if (rowIndex % 6 === 0) {
  //     return {
  //       rowspan: 6,
  //       colspan: 1,
  //     };
  //   } else {
  //     return {
  //       rowspan: 0,
  //       colspan: 0,
  //     };
  //   }
  // }
  /******确定行数做合并单元格*******end*/
  //#endregion

  /**动态合并某一行重复数据start 配合handleTableData()*/
  if (columnIndex === 0) {
    const rowSpan = rrowSpanArr.value[rowIndex];
    console.log(rowSpan, "vvv123");
    return {
      rowspan: rowSpan, //行
      colspan: 1, //列
    };
  }
  /**动态合并某一行重复数据end */
}
onMounted(() => {
  handleTableData(tableData.value);
});
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
