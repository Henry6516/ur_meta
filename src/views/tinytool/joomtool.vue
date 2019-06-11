<template>
    <!-- <div>死库</div> -->
    <div class='main'>
        <div class='frist'>
            <div>
                <p>下载Joom模板 :
                    <el-button @click='fhTemplate'>下载模板
                    </el-button>
                </p>
                <el-upload class='upload-demo' drag :action='action' multiple :headers='headers' :onError='uploadError' :on-success='uploadSuccess'>
                    <i class='el-icon-upload'></i>
                    <div class='el-upload__text'>将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                </el-upload>
            </div>
        </div>
    </div>
</template>

<script>
import { uploadJoom, getHeaders } from '../../api/api'
import { APIDownJoom } from "../../api/product";
import XLSX from 'xlsx'

export default {
  data() {
    return {
      action: 'upload',
      headers: Object()
    }
  },
  methods: {
    uploadSuccess(response, file, fileList) {
      if(response.code==200 && response.data[0]=='上传成功'){
          this.$message({
                message: '上传成功',
                type: 'success'
              })
      }else{
          this.$message.error(response.message)
      }
    },
    uploadError(err, file, fileList) {
      console.log(err)
    },
    fhTemplate() {
      APIDownJoom().then(res => {
        const blob = new Blob([res.data], {
          type: "application/vnd.ms-excel;charset=UTF-8"
        });
        var file = res.headers["content-disposition"].split(";")[1].split("filename=")[1];
          var filename=JSON.parse(file)
          const downloadElement = document.createElement("a");
          const objectUrl = window.URL.createObjectURL(blob);
          downloadElement.href = objectUrl;
          // const filename =
          //   "joom_" + year + month + strDate + hour + minute + second;
          downloadElement.download = filename;
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
      });
    },
  },
  mounted() {
    this.action = uploadJoom()
    this.headers = getHeaders()
  }
}
</script>

<style scoped lang='scss'>
.main {
  .frist {
    float: left;
    margin-left: 100px;
  }
}
</style>