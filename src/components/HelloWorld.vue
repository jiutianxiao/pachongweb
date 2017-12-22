<template>
  <div>
    <el-row>
      <el-col :span="10">
        <el-input placeholder="请输入内容" v-model="input">
          <div slot="append" :plain="true" @click="addDataBefor">添加</div>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button class="el-icon-close" @click="delAllData">清除所有</el-button>
      </el-col>
      <el-col :span="2">
        <el-button class="el-icon-close" @click="delData">清除</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="showData"
      style="width: 100%"
      height="600">
          <span v-for="(index,item) in showData[0]">
            {{item}}
          <el-table-column
            :fixed="item==='title'"
            :prop="item"
            :label="item==='title'?'参数':item"
            width="120">
          </el-table-column></span>
    </el-table>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import ElRow from "element-ui/packages/row/src/row";
  export default {
    components: {ElRow},
    data() {
      return {
        input: null
      }
    },
    computed: mapState(["showData"]),
    methods: {
      ...mapMutations(["addData", "delAllData", ["delData"]]),
      addDataBefor(){
        console.log(this.showData);
        if (this.input) {
          let data = this.input.trim();
          if (data.length) {
            this.addData(data)
          } else {
            this.$message({message: "不能输入空格", duration: 300});
          }
        } else {
          this.$message({message: "不能为空", duration: 300})
        }
      }
    }
  }
</script>
