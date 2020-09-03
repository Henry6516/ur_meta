<template>
    <section>
        <div>
            <el-row class="contentt">
                <el-col :span="24">
                    <el-button type="primary" @click="addJoom()"><i class="el-icon-plus"></i>添加Joom账号</el-button>
                </el-col>
            </el-row>
            <el-row class="content1">
                <el-col :span="24" class="font14">
                    第1-10条，共{{total}}条数据.
                </el-col>
                <el-col :span="23" style="margin-top: 20px">
                    <el-table :data="date"
                              border
                              class="elTable"
                              style="width: 100%">
                        <el-table-column type="index"
                                         fixed
                                         align="center"
                                         width="80"
                                         header-align="center">
                        </el-table-column>
                        <el-table-column label="操作"
                                         fixed
                                         header-align="center"
                                         width="80">
                            <template slot-scope="scope">
                                <el-tooltip content="查看">
                                    <i class="el-icon-view"
                                       @click="viewPic(scope.$index, scope.row)"
                                       style="color: #409EFF;cursor:pointer;"></i>
                                </el-tooltip>
                                <el-tooltip content="更新">
                                    <i @click="edit(scope.$index, scope.row)"
                                       class="el-icon-edit"
                                       style="color: #409EFF;cursor:pointer;"></i>
                                </el-tooltip>
                                <el-tooltip content="删除">
                                    <i class="el-icon-delete"
                                       style="color: #409EFF;cursor:pointer;" @click="del(scope.$index, scope.row)"></i>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column label="Joom账号"
                                         header-align="center">
                            <el-table-column prop="joomName"
                                             :render-header="renderHeaderPic"
                                             align="center">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="指定子店铺"
                                         header-align="center">
                            <el-table-column prop="joomSuffix"
                                             :render-header="renderHeaderPic"
                                             align="center">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="图片网址代码"
                                         header-align="center">
                            <el-table-column prop="imgCode"
                                             :render-header="renderHeaderPic"
                                             align="center">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="主图"
                                         header-align="center">
                            <el-table-column prop="mainImg"
                                             :render-header="renderHeaderPic"
                                             align="center">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="SKU后缀"
                                         header-align="center">
                            <el-table-column prop="skuCode"
                                             :render-header="renderHeaderPic"
                                             align="center">
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="condition.page"
                    :page-size="condition.pageSize"
                    :total="this.total"
                    background
                    layout="prev, pager, next" style="margin: 20px 0;margin-left: 10px">
            </el-pagination>
            <el-dialog title="Joom账号详情" :visible.sync="dialogPicture">
                <el-row>
                    <table style="width: 100%;margin: auto;border-collapse:collapse;">
                        <thead style="background: #409EFF;border:#409EFF solid 1px ">
                        <th width="25%" style="text-align: center;color: #fff;font-weight: normal;line-height: 45px;border-right: #d4d4d4 solid 1px">Joom账号</th>
                        <th width="25%" style="text-align: center;color: #fff;font-weight: normal;line-height: 45px;border-right: #d4d4d4 solid 1px">图片网址代码</th>
                        <th width="25%" style="text-align: center;color: #fff;font-weight: normal;line-height: 45px;border-right: #d4d4d4 solid 1px">主图</th>
                        <th width="25%" style="text-align: center;color: #fff;font-weight: normal;line-height: 45px;">SKU后缀</th>
                        </thead>
                        <tbody>
                        <tr>
                            <td width="25%" style="text-align: center;font-weight: normal;line-height: 45px;border: #d4d4d4 solid 1px">{{delist.joomName}}</td>
                            <td width="25%" style="text-align: center;font-weight: normal;line-height: 45px;border: #d4d4d4 solid 1px">{{delist.imgCode}}</td>
                            <td width="25%" style="text-align: center;font-weight: normal;line-height: 45px;border: #d4d4d4 solid 1px">{{delist.mainImg}}</td>
                            <td width="25%" style="text-align: center;font-weight: normal;line-height: 45px;border: #d4d4d4 solid 1px">{{delist.skuCode}}</td>
                        </tr>
                        </tbody>
                    </table>
                </el-row>
            </el-dialog>
            <el-dialog title="添加Joom账号" :visible.sync="dialogPictureBj">
                <el-row class="contentt" style="margin-top: 0">
                    <el-col :span="24" class="cTop">
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">Joom账号</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="joomaccount"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">指定子店铺</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="joomSuffix"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">图片网址代码</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="photo"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" class="cTop">
                            <el-col :span="24" style="margin-bottom: 20px">
                                <el-col :span="3">
                                    <p class="basp" style="margin-left: 15px">主图</p>
                                </el-col>
                                <el-col :span="20">
                                    <el-input v-model="masterGraph"></el-input>
                                </el-col>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">SKU后缀</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="skuSuffix"></el-input>
                            </el-col>
                        </el-col>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogPictureBj = false">取 消</el-button>
                    <el-button type="primary" @click="addJoomTj()">添 加</el-button>
                </div>
            </el-dialog>
            <el-dialog title="编辑Joom账号" :visible.sync="disLogin">
                <el-row class="contentt" style="margin-top: 0">
                    <el-col :span="24" class="cTop">
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">Joom账号</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="conten.joomName"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">指定子店铺</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="conten.joomSuffix"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">图片网址代码</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="conten.imgCode"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" class="cTop">
                            <el-col :span="24" style="margin-bottom: 20px">
                                <el-col :span="3">
                                    <p class="basp" style="margin-left: 15px">主图</p>
                                </el-col>
                                <el-col :span="20">
                                    <el-input v-model="conten.mainImg"></el-input>
                                </el-col>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">SKU后缀</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="conten.skuCode"></el-input>
                            </el-col>
                        </el-col>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="disLogin = false">取 消</el-button>
                    <el-button type="primary" @click="save()">保 存</el-button>
                </div>
            </el-dialog>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    import { APIWishSuffix,APICreateWish,APIDeleteJoom,APIJoomSuffix,APICreateJoom,APIJoomInfo,APIUpdateJoom } from '../../api/product'
    import { getMenu } from '../../api/login'
    export default {
        data() {
            return {
                allMenu:[],
                activeName: 'Joom账号字典',
                date:[],
                total:0,
                dialogPicture:false,
                dialogPictureBj:false,
                disLogin:false,
                joomaccount:null,
                photo:null,
                masterGraph:null,
                skuSuffix:null,
                joomSuffix:null,
                conten:[],
                delist:[],
                condition:{
                    "joomName": null,
                    "joomSuffix": null,
                    "imgCode": null,
                    "mainImg": null,
                    "skuCode": null,
                    "pageSize": 10,
                    "page":1
                }
            }
        },
        methods: {
            addJoomTj(){
                if(this.joomaccount){
                    var condate={
                        "joomName": this.joomaccount,
                        "joomSuffix": this.joomSuffix,
                        "imgCode": this.photo,
                        "mainImg": this.masterGraph,
                        "skuCode": this.skuSuffix
                    }
                    this.joomaccount = null;
                    this.joomSuffix = null;
                    this.photo = null;
                    this.masterGraph = null;
                    this.skuSuffix = null;
                    APICreateJoom(condate).then(res => {
                        if(res.data.data){
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            })
                            this.condition.page=1
                            this.condition.joomName=null
                            this.condition.joomSuffix=null
                            this.condition.imgCode=null
                            this.condition.mainImg=null
                            this.condition.skuCode=null
                            this.condition.pageSize=10
                            this.getDate()
                            this.dialogPictureBj = false
                        }
                    })
                }else {
                    this.$message.error('Joom账号不能为空')
                }
            },
            edit(index,row){
                this.disLogin = true
                let conId={
                    id:row.id
                }
                APIJoomInfo(conId).then(res => {
                    if(res.data.message=="success"){
                        this.conten=res.data.data
                    }
                })
            },
            save(){
                APIUpdateJoom(this.conten).then(res => {
                    if(res.data.data){
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        })
                        this.disLogin = false
                        this.getDate()
                    }
                })
            },
            del(index, row){
                this.$confirm('确定删除?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        })
                        .then(() => {
                            let conId={
                                id:row.id
                            }
                            APIDeleteJoom(conId).then(res => {
                                if(res.data.message=="success"){
                                    this.$message({
                                        message: '删除成功',
                                        type: 'success'
                                    })
                                    this.getDate()
                                }
                            })
                        })
                        .catch(() => {})
            },
            addJoom(){
                this.dialogPictureBj = true
            },
            viewPic(index, row) {
                let conId={
                    id:row.id
                }
                this.dialogPicture = true
                APIJoomInfo(conId).then(res => {
                   if(res.data.message=="success"){
                    this.delist=res.data.data
                   }
                })
            },

            handleSizeChange(val) {
                this.condition.pageSize = val
                this.getDate()
            },
            handleCurrentChange(val) {
                this.condition.page = val
                this.getDate()
            },
            renderHeaderPic(h, { column, $index }) {
                if ($index === 0) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '30px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.condition.joomName,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.joomName = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getDate()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 1) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '30px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.condition.joomSuffix,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.joomSuffix = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getDate()
                                        }
                                    }
                                })
                            ]
                    )
                }else if ($index === 2) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '30px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.condition.imgCode,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.imgCode = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getDate()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 3) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '30px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.condition.mainImg,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.mainImg = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getDate()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 4) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '30px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.condition.skuCode,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.skuCode = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getDate()
                                        }
                                    }
                                })
                            ]
                    )
                }
            },
            handleClick(tab, event) {
                if (tab.label === 'Wish账号字典') {
                    this.$router.push({
                        path: '/v1/basic-info/ebay-suffix',
                    })
                }
                if (tab.label === 'eBay账号字典') {
                    this.$router.push({
                        path: '/v1/basic-info/ebay',
                    })
                }
                if (tab.label === 'Joom账号字典') {

                }
                if (tab.label === 'eBay运输方式') {
                    this.$router.push({
                        path: '/v1/basic-info/ys',
                    })
                }
                if (tab.label === 'Joom对比Wish价格') {
                    this.$router.push({
                        path: '/v1/basic-info/jw',
                    })
                }
                if (tab.label === '开发采购美工对应关系') {
                    this.$router.push({
                        path: '/v1/basic-info/art',
                    })
                }
            },
            getDate(){
                APIJoomSuffix(this.condition).then(res => {
                    this.date = res.data.data.items
                    this.total = res.data.data._meta.totalCount
                    this.condition.pageSize = res.data.data._meta.perPage
                    this.condition.page = res.data.data._meta.currentPage
                })
            },
        },
        mounted() {
            getMenu().then(response => {
                const res = response.data.data
                const menu = res.filter(e => e.name === '产品中心')
                let arr=menu[0].children
                for(let i=0;i<arr.length;i++){
                    if(arr[i].name=="基本信息"){
                        this.allMenu=arr[i].tabs
                    }
                }
            })
            this.getDate()
        }
    }
</script>

<style lang="scss">
    .contentt{
        margin-left: 20px;
        margin-top: 15px;
    }
    .content1{
        margin-left: 20px;
        margin-top: 20px;
    }
    .basp{
        padding: 0;
        margin: 0;
        line-height: 40px;
    }
    .cTop{
        margin-top: 0px;
    }
    .baspj{
        text-align: center;
    }
    .top20{
        margin-top: 25px;
    }
    .font14{
        font-size: 14px;
    }
    .elTable td{
        padding: 8px 0 !important;
    }
</style>
