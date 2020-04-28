<template>
  <el-container style="height: 70vh;">
    <el-aside width="65%" style="background: white; overflow: hidden;">
      <el-container style="background: white;">
        <el-header height="10%" style="padding: 0px;">
          <el-form label-position="top" label-width="10px" :model="formLabelAlign">
            <el-form-item label="Example">
              <el-input v-model="formLabelAlign.name" placeholder="Please input" />
            </el-form-item>
          </el-form>
        </el-header>
        <el-main style="background: white;padding: 0px;">
          <div>
            <el-collapse v-model="activeNames" accordion>
              <el-collapse-item title="Product Info" name="1">
                <el-card class="box-card" style="padding-top: 14px;">
                  <el-row :gutter="20">
                    <el-col :span="4">
                      <div>
                        <el-avatar shape="square" :size="100" src="https://empty" @error="errorHandler">
                          <el-image>
                            <div slot="error" class="image-slot">
                              <i class="el-icon-picture-outline" />
                            </div>
                          </el-image>
                        </el-avatar>
                      </div>
                    </el-col>
                    <el-col :span="16">
                      Producto <br>
                      Example <br>
                      Example <br>
                      Example <br>
                    </el-col>
                    <el-col :span="4">
                      11,234.00
                    </el-col>
                  </el-row>
                </el-card>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-main>
        <el-footer height="10%" style="overflow: auto;padding: 0px;">
          <el-row :gutter="20" style="margin-left: -10px;margin-right: -10px;height: 20px;">
            <el-col :span="6">
              <div style="padding-top: 35px">
                <el-button type="primary" icon="el-icon-top" circle />
                <el-button type="primary" icon="el-icon-bottom" circle />
              </div>
            </el-col>
            <el-col :span="18">
              <el-form label-position="top" label-width="10px" :model="formLabelAlign" style="float: right; display: flex; line-height: 10px;">
                <el-form-item label="Example Number">
                  <el-input-number v-model="formLabelAlign.num" />
                </el-form-item>
                <el-form-item label="Example price">
                  <el-input-number v-model="formLabelAlign.num" />
                </el-form-item>
                <el-form-item label="Example quantity">
                  <el-input-number v-model="formLabelAlign.num" />
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <div>
            <el-table :data="tableData">
              <el-table-column prop="date" label="Date" width="140" />
              <el-table-column prop="name" label="Name" width="120" />
              <el-table-column prop="address" label="Address" />
            </el-table>
          </div>
        </el-footer>
      </el-container>
    </el-aside>
    <el-main>
      <el-row style="margin-bottom: 0px">
        <el-col :span="12" style="padding-right: 15px;">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Order Info</span>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ 'List item ' + o }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>totals(Bs)</span>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ 'List item ' + o }} 0000
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-form label-position="top" label-width="10px" :model="formLabelAlign">
        <el-form-item label="Example">
          <el-input v-model="formLabelAlign.name" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div>
        <el-row>
          <el-col :span="24"><div class="grid-content bg-purple-dark" /></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple" /></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light" /></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple" /></el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light" /></el-col>
          <el-col :span="8"><div class="grid-content bg-purple" /></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light" /></el-col>
          <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light" /></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple" /></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light" /></el-col>
          <el-col :span="4"><div class="grid-content bg-purple" /></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light" /></el-col>
          <el-col :span="4"><div class="grid-content bg-purple" /></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light" /></el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'VPOS',
  data() {
    const item = {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }
    return {
      tableData: Array(20).fill(item),
      currentDate: new Date(),
      input: 'Example',
      formLabelAlign: {
        name: '',
        num: 0
      },
      activeNames: '1'
    }
  },
  methods: {
    errorHandler() {
      return true
    }
  }
}
</script>

<style scoped>
.el-card__header {
    padding: 0px 20px;
    border-bottom: 1px solid #e6ebf5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
  .el-header {
    background: 'white';
    color: #333;
    line-height: 10px;
  }

  .el-aside {
    color: #333;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
