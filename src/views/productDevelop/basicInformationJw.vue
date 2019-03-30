<template>
    <section>
        <el-tabs v-model="activeName"
                 type="card"
                 @tab-click="handleClick" class="toolbar">
            <el-tab-pane v-for="(item, index) in this.allMenu"
                         :label="item.name"
                         :name="item.name"
                         :key="index">
            </el-tab-pane>
        </el-tabs>
        <div>
            <el-row class="contentt">
                <el-col :span="24">
                    <el-button type="primary" @click="addJoomAdd()"><i class="el-icon-plus"></i>创建条目</el-button>
                </el-col>
            </el-row>
            <el-row class="content1">
                <el-col :span="24" class="font14">
                    第1-10条，共{{totalAdd}}条数据.
                </el-col>
                <el-col :span="24" style="margin-top: 20px">
                    <el-table :data="dateAdd"
                              border
                              class="elTable"
                              style="width: 98%;">
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
                                       @click="viewPicAdd(scope.$index, scope.row)"
                                       style="color: #409EFF;cursor:pointer;"></i>
                                </el-tooltip>
                                <el-tooltip content="更新">
                                    <i @click="editAdd(scope.$index, scope.row)"
                                       class="el-icon-edit"
                                       style="color: #409EFF;cursor:pointer;"></i>
                                </el-tooltip>
                                <el-tooltip content="删除">
                                    <i class="el-icon-delete"
                                       style="color: #409EFF;cursor:pointer;" @click="delAdd(scope.$index, scope.row)"></i>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column label="规则编号"
                                         header-align="center">
                            <el-table-column prop="id"
                                             :render-header="renderHeaderPicAdd"
                                             align="center">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="大于等于重量(g)"
                                         header-align="center">
                            <el-table-column prop="greaterEqual"
                                             :render-header="renderHeaderPicAdd"
                                             align="center"
                                             width="180">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="小于重量(g)"
                                         header-align="center">
                            <el-table-column prop="less"
                                             :render-header="renderHeaderPicAdd"
                                             align="center">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="价格增加($)"
                                         header-align="center">
                            <el-table-column prop="addedPrice"
                                             :render-header="renderHeaderPicAdd"
                                             align="center">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="创建时间"
                                         header-align="center">
                            <el-table-column prop="createDate"
                                             :render-header="renderHeaderPicAdd"
                                             align="center">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="更新时间"
                                         header-align="center">
                            <el-table-column prop="updateDate"
                                             :render-header="renderHeaderPicAdd"
                                             align="center">
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-pagination
                    background
                    @size-change="handleSizeChangeAdd"
                    @current-change="handleCurrentChangeAdd"
                    :current-page="conditionAdd.page"
                    :page-size="conditionAdd.pageSize"
                    :total="this.totalAdd"
                    background
                    layout="prev, pager, next" style="margin: 20px 0;margin-left: 10px">
            </el-pagination>
            <el-dialog title="详情" :visible.sync="dialogPictureAdd">
                <el-row class="contentt" style="margin-top: 0">
                    <el-col :span="24" class="cTop">
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">规则编号</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input :value="delistAdd.id" :disabled="true"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">大于等于重量(g)</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input :value="delistAdd.greaterEqual" :disabled="true"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">小于重量(g)</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input :value="delistAdd.less" :disabled="true"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">价格增加($)</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input :value="delistAdd.addedPrice" :disabled="true"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">添加时间($)</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input :value="delistAdd.createDate" :disabled="true"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">更新时间($)</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input :value="delistAdd.updateDate" :disabled="true"></el-input>
                            </el-col>
                        </el-col>
                    </el-col>
                </el-row>
            </el-dialog>
            <el-dialog title="创建规则" :visible.sync="dialogPictureBjAdd">
                <el-row class="contentt" style="margin-top: 0">
                    <el-col :span="24" class="cTop">
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">大于等于重量(g)</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="greaterThan"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">小于重量(g)</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="lessThan"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">价格增加($)</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="priceAdd"></el-input>
                            </el-col>
                        </el-col>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogPictureBjAdd = false">取 消</el-button>
                    <el-button type="primary" @click="addJoomTjAdd()">添 加</el-button>
                </div>
            </el-dialog>
            <el-dialog title="编辑规则" :visible.sync="disLoginAdd">
                <el-row class="contentt" style="margin-top: 0">
                    <el-col :span="24" class="cTop">
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">大于等于重量(g)</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="contenAdd.greaterEqual"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">小于重量(g)</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="contenAdd.less"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">价格增加($)</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="contenAdd.addedPrice"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">创建时间</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="contenAdd.createDate" :disabled="true"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">更新时间</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="contenAdd.updateDate" :disabled="true"></el-input>
                            </el-col>
                        </el-col>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="disLoginAdd = false">取 消</el-button>
                    <el-button type="primary" @click="saveAdd()">保 存</el-button>
                </div>
            </el-dialog>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    import { APIWishSuffix,
            APICreateWish,
            APIDeleteJoom,
            APIJoomSuffix,
            APICreateJoom,
            APIJoomInfo,
            APIUpdateJoom,
            APIEbaySuffix,
            APICreateEbay
            ,APIEbayInfo,
            APIDeleteEbay,
            APIUpdateEbay,
            APIShippingService,
            APICreateShipping,
            APIShippingInfo,
            APIUpdateShipping,
            APIDeleteShipping,
            APIJoomWish,
            APICreateContrast,
            APIContrastInfo,
            APIUpdateContrast,
            APIDeleteContrast} from '../../api/product'
    import { getMenu } from '../../api/login'
    export default {
        data() {
            return {
                allMenu:[],
                activeName: 'Joom对比Wish价格',
                dateAdd:[],
                totalAdd:0,
                dialogPictureAdd:false,
                dialogPictureBjAdd:false,
                disLoginAdd:false,
                greaterThan:null,
                lessThan:null,
                priceAdd:null,
                crteadAdd:null,
                updateAdd:null,
                contenAdd:[],
                delistAdd:[],
                conditionAdd:{
                    "greaterEqual": null,
                    "less": null,
                    "addedPrice": null,
                    "createDate":null,
                    "updateDate":null,
                    "pageSize": 10,
                    "page":1
                }
            }
        },
        methods: {
            addJoomTjAdd(){
                    var condate={
                        "greaterEqual": this.greaterThan,
                        "less": this.lessThan,
                        "addedPrice": this.priceAdd
                    }
                APICreateContrast(condate).then(res => {
                        if(res.data.data){
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            })
                            this.conditionAdd.page=1
                            this.conditionAdd.greaterEqual=null
                            this.conditionAdd.less=null
                            this.conditionAdd.addedPrice=null
                            this.conditionAdd.createDate=null
                            this.conditionAdd.updateDate=null
                            this.conditionAdd.pageSize=10
                            this.getDateAdd()
                            this.dialogPictureBjAdd = false
                        }
                    })
            },
            editAdd(index,row){
                this.disLoginAdd = true
                let conId={
                    id:row.id
                }
                APIContrastInfo(conId).then(res => {
                    if(res.data.message=="success"){
                        this.contenAdd=res.data.data
                    }
                })
            },
            saveAdd(){
                APIUpdateContrast(this.contenAdd).then(res => {
                    if(res.data.data){
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        })
                        this.disLoginAdd= false
                        this.getDateAdd()
                    }
                })
            },
            delAdd(index, row){
                this.$confirm('确定删除?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        })
                        .then(() => {
                            let conId={
                                id:row.id
                            }
                            APIDeleteContrast(conId).then(res => {
                                if(res.data.message=="success"){
                                    this.$message({
                                        message: '删除成功',
                                        type: 'success'
                                    })
                                    this.getDateAdd()
                                }
                            })
                        })
                        .catch(() => {})
            },
            addJoomAdd(){
                this.dialogPictureBjAdd = true
            },
            viewPicAdd(index, row) {
                let conId={
                    id:row.id
                }
                this.dialogPictureAdd = true
                APIContrastInfo(conId).then(res => {
                    if(res.data.message=="success"){
                        this.delistAdd=res.data.data
                    }
                })
            },

            handleSizeChangeAdd(val) {
                this.conditionAdd.pageSize = val
                this.getDateAdd()
            },
            handleCurrentChangeAdd(val) {
                this.conditionAdd.page = val
                this.getDateAdd()
            },
            renderHeaderPicAdd(h, { column, $index }) {
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
                                        value: this.conditionAdd.id,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.conditionAdd.id = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getDateAdd()
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
                                        value: this.conditionAdd.greaterEqual,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.conditionAdd.greaterEqual = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getDateAdd()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 2) {
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
                                        value: this.conditionAdd.less,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.conditionAdd.less = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getDateAdd()
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
                                        value: this.conditionAdd.addedPrice,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.conditionAdd.addedPrice = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getDateAdd()
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
                                        value: this.conditionAdd.createDate,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.conditionAdd.createDate = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getDateAdd()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 5) {
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
                                        value: this.conditionAdd.updateDate,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.conditionAdd.updateDate = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getDateAdd()
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
                    this.$router.push({
                        path: '/v1/basic-info/joom',
                    })
                }
                if (tab.label === 'eBay运输方式') {
                    this.$router.push({
                        path: '/v1/basic-info/ys',
                    })
                }
                if (tab.label === 'Joom对比Wish价格') {

                }
                if (tab.label === '开发采购美工对应关系') {
                    this.$router.push({
                        path: '/v1/basic-info/art',
                    })
                }
            },
            getDateAdd(){
                APIJoomWish(this.conditionAdd).then(res => {
                    this.dateAdd = res.data.data.items
                    this.totalAdd = res.data.data._meta.totalCount
                    this.conditionAdd.pageSize = res.data.data._meta.perPage
                    this.conditionAdd.page = res.data.data._meta.currentPage
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
            this.getDateAdd()
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
        padding: 16px 0 !important;
    }
</style>
