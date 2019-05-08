<template>
    <section>
        <div>
            <el-row class="contentt">
                <el-col :span="24">
                    <el-button type="primary" @click="addJoomEbayYs()"><i class="el-icon-plus"></i>添加运输方式</el-button>
                </el-col>
            </el-row>
            <el-row class="content1">
                <el-col :span="24" class="font14">
                    第1-20条，共{{totalEbayYs}}条数据.
                </el-col>
                <el-col :span="24" style="margin-top: 20px">
                    <el-table :data="dateEbayYs"
                              border
                              class="elTable"
                              :height="tableHeight"
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
                                       @click="viewPicEbayYs(scope.$index, scope.row)"
                                       style="color: #409EFF;cursor:pointer;"></i>
                                </el-tooltip>
                                <el-tooltip content="更新">
                                    <i @click="editEbayYs(scope.$index, scope.row)"
                                       class="el-icon-edit"
                                       style="color: #409EFF;cursor:pointer;"></i>
                                </el-tooltip>
                                <el-tooltip content="删除">
                                    <i class="el-icon-delete"
                                       style="color: #409EFF;cursor:pointer;" @click="delEbayYs(scope.$index, scope.row)"></i>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column label="运输方式"
                                         header-align="center">
                            <el-table-column prop="servicesName"
                                             :render-header="renderHeaderPicEbayYs"
                                             align="center">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="属性"
                                         header-align="center">
                            <el-table-column prop="type"
                                             :render-header="renderHeaderPicEbayYs"
                                             align="center"
                                             width="180">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="国家名称"
                                         header-align="center">
                            <el-table-column prop="site"
                                             :render-header="renderHeaderPicEbayYs"
                                             align="center"
                                             width="180">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="Ibay识别运输方式"
                                         header-align="center">
                            <el-table-column prop="ibayShipping"
                                             :render-header="renderHeaderPicEbayYs"
                                             align="center">
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-pagination
                    background
                    @size-change="handleSizeChangeEbayYs"
                    @current-change="handleCurrentChangeEbayYs"
                    :current-page="conditionEbayYs.page"
                    :page-size="conditionEbayYs.pageSize"
                    :total="this.totalEbayYs"
                    background
                    layout="prev, pager, next" style="margin: 20px 0;margin-left: 10px;margin-bottom:0">
            </el-pagination>
            <el-dialog title="运输方式详情" :visible.sync="dialogPictureEbayYs">
                <el-row class="contentt" style="margin-top: 0">
                    <el-col :span="24" class="cTop">
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">运输方式</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input :value="delistEbayYs.servicesName" :disabled="true"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp" style="margin-left: 13px">属性</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input :value="delistEbayYs.type" :disabled="true"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">国家名称</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input :value="delistEbayYs.site" :disabled="true"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">ibay识别运输方式</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input :value="delistEbayYs.ibayShipping" :disabled="true"></el-input>
                            </el-col>
                        </el-col>
                    </el-col>
                </el-row>
            </el-dialog>
            <el-dialog title="添加运输方式" :visible.sync="dialogPictureBjEbayYs">
                <el-row class="contentt" style="margin-top: 0">
                    <el-col :span="24" class="cTop">
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">运输方式</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="transportYs"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp" style="margin-left: 13px">属性</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="attributeYs"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">国家名称</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="countryYs"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">IBay识别运输方式</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="transportEbayYs"></el-input>
                            </el-col>
                        </el-col>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogPictureBjEbayYs = false">取 消</el-button>
                    <el-button type="primary" @click="addJoomTjEbayYs()">添 加</el-button>
                </div>
            </el-dialog>
            <el-dialog title="编辑运输方式" :visible.sync="disLoginEbayYs">
                <el-row class="contentt" style="margin-top: 0">
                    <el-col :span="24" class="cTop">
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">运输方式</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="contenEbayYs.servicesName"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp" style="margin-left: 13px">属性</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="contenEbayYs.type"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">国家名称</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="contenEbayYs.site"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">ibay识别运输方式</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="contenEbayYs.ibayShipping"></el-input>
                            </el-col>
                        </el-col>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="disLoginEbayYs = false">取 消</el-button>
                    <el-button type="primary" @click="saveEbayYs()">保 存</el-button>
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
            APIDeleteShipping} from '../../api/product'
    import { getMenu } from '../../api/login'
    export default {
        data() {
            return {
                tableHeight: window.innerHeight - 275,
                allMenu:[],
                activeName: 'eBay运输方式',
                dateEbayYs:[],
                totalEbayYs:0,
                dialogPictureEbayYs:false,
                dialogPictureBjEbayYs:false,
                disLoginEbayYs:false,
                transportYs:null,
                attributeYs:null,
                countryYs:null,
                transportEbayYs:null,
                contenEbayYs:[],
                delistEbayYs:[],
                conditionEbayYs:{
                    "servicesName": null,
                    "type": null,
                    "site": null,
                    "ibayShipping": null,
                    "pageSize": 20,
                    "page":1
                }
            }
        },
        methods: {
            addJoomTjEbayYs(){
                    var condate={
                        "servicesName": this.transportYs,
                        "type": this.attributeYs,
                        "site": this.countryYs,
                        "ibayShipping": this.transportEbayYs
                    }
                    this.transportYs = null;
                    this.attributeYs = null;
                    this.countryYs = null;
                    this.transportEbayYs = null;
                    APICreateShipping(condate).then(res => {
                        if(res.data.data){
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            })
                            this.conditionEbayYs.page=1
                            this.conditionEbayYs.servicesName=null
                            this.conditionEbayYs.type=null
                            this.conditionEbayYs.site=null
                            this.conditionEbayYs.ibayShipping=null
                            this.conditionEbayYs.pageSize=20
                            this.getDateEbayYs()
                            this.dialogPictureBjEbayYs = false
                        }
                    })
            },
            editEbayYs(index,row){
                this.disLoginEbayYs = true
                let conId={
                    id:row.id
                }
                APIShippingInfo(conId).then(res => {
                    if(res.data.message=="success"){
                        this.contenEbayYs=res.data.data
                    }
                })
            },
            saveEbayYs(){
                APIUpdateShipping(this.contenEbayYs).then(res => {
                    if(res.data.data){
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        })
                        this.disLoginEbayYs = false
                        this.getDateEbayYs()
                    }
                })
            },
            delEbayYs(index, row){
                this.$confirm('确定删除?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        })
                        .then(() => {
                            let conId={
                                id:row.id
                            }
                            APIDeleteShipping(conId).then(res => {
                                if(res.data.message=="success"){
                                    this.$message({
                                        message: '删除成功',
                                        type: 'success'
                                    })
                                    this.getDateEbayYs()
                                }
                            })
                        })
                        .catch(() => {})
            },
            addJoomEbayYs(){
                this.dialogPictureBjEbayYs = true
            },
            viewPicEbayYs(index, row) {
                let conId={
                    id:row.id
                }
                this.dialogPictureEbayYs = true
                APIShippingInfo(conId).then(res => {
                    if(res.data.message=="success"){
                        this.delistEbayYs=res.data.data
                    }
                })
            },

            handleSizeChangeEbayYs(val) {
                this.conditionEbayYs.pageSize = val
                this.getDateEbayYs()
            },
            handleCurrentChangeEbayYs(val) {
                this.conditionEbayYs.page = val
                this.getDateEbayYs()
            },
            renderHeaderPicEbayYs(h, { column, $index }) {
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
                                        value: this.conditionEbayYs.servicesName,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.conditionEbayYs.servicesName = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getDateEbayYs()
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
                                        value: this.conditionEbayYs.type,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.conditionEbayYs.type = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getDateEbayYs()
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
                                        value: this.conditionEbayYs.site,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.conditionEbayYs.site = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getDateEbayYs()
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
                                        value: this.conditionEbayYs.ibayShipping,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.conditionEbayYs.ibayShipping = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getDateEbayYs()
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
            getDateEbayYs(){
                APIShippingService(this.conditionEbayYs).then(res => {
                    this.dateEbayYs = res.data.data.items
                    this.totalEbayYs = res.data.data._meta.totalCount
                    this.conditionEbayYs.pageSize = res.data.data._meta.perPage
                    this.conditionEbayYs.page = res.data.data._meta.currentPage
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
            this.getDateEbayYs()
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
