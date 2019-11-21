<template>
    <section class="toolbar">
        <!--<el-tabs v-model="activeName"-->
                 <!--type="card"-->
                 <!--@tab-click="handleClick">-->
            <!--<el-tab-pane v-for="(item, index) in this.allMenu"-->
                         <!--:label="item.name"-->
                         <!--:name="item.name"-->
                         <!--:key="index">-->
            <!--</el-tab-pane>-->
        <!--</el-tabs>-->
        <div class="infoTable">
            <!-- 图片信息列表 -->
            <el-table :data="pictureData"
                      @selection-change="selsChange" :height="tableHeight">
                <!-- <el-table-column type="selection"
                                 fixed
                                 align="center"
                                 header-align="center"></el-table-column> -->
                <el-table-column type="index"
                                 fixed
                                 align="center"
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
                            <i @click="picEdit(scope.$index, scope.row)"
                               class="el-icon-edit"
                               style="color: #409EFF;cursor:pointer;"></i>
                        </el-tooltip>
                        <el-tooltip content="标记已完善">
                            <i class="el-icon-star-on"
                               style="color: #409EFF;cursor:pointer;" @click="signPerfect(scope.$index, scope.row)"></i>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="picUrl"
                                 fixed
                                 label="商品图片"
                                 header-align="center" width="80">
                    <template slot-scope="scope">
                        <el-tooltip placement="right" :open-delay='10' class="exxHover" popper-class="page-login-toolTipClass">
                            <div slot="content"><img :src="scope.row.picUrl" style="width: 300px;height: 300px;"></div>
                            <img :src="scope.row.picUrl" style="width: 60px;height: 60px">
                        </el-tooltip>
                        <!-- <img :src='scope.row.picUrl'
                             style="width: 70px;height: 60px"> -->
                    </template>
                </el-table-column>
                <el-table-column label="商品编码"
                                 header-align="center">
                    <el-table-column prop="goodsCode"
                                     :render-header="renderHeaderPic"
                                     width='125'
                                     align="center">
                    <template slot-scope="scope">
                    <a :class="scope.row.stockUp=='是'?'redCu':'redblack'">{{scope.row.goodsCode}}</a>
                    </template>                 
                    </el-table-column>
                </el-table-column>
                <el-table-column label="是否备货"
                                 header-align="center">
                    <el-table-column prop="stockUp"
                                     :render-header="renderHeaderPic"
                                     width='108'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="图片状态"
                                 header-align="center">
                    <el-table-column prop="picStatus"
                                     :render-header="renderHeaderPic"
                                     width='115'
                                     align="center">
                        <template slot-scope="scope">
                            <a :class="scope.row.picStatus=='待处理'?'clasRed1':'clasGreen1'">{{scope.row.picStatus}}</a>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="商品名称"
                                 header-align="center">
                    <el-table-column prop="goodsName"
                                     :render-header="renderHeaderPic"
                                     width='140'
                                     align="center">
                        <template slot-scope="scope">
                            <a :class="!scope.row.goodsName?'clasRed':''">{{scope.row.goodsName?scope.row.goodsName:"未设置"}}</a>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="开发员"
                                 header-align="center">
                    <el-table-column prop="developer"
                                     :render-header="renderHeaderPic"
                                     width='110'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="供应商链接1"
                                 header-align="center">
                    <el-table-column prop="vendor1"
                                     :render-header="renderHeaderPic"
                                     width='165'
                                     align="center">
                        <template slot-scope="scope">
                            <a :href="scope.row.vendor1" target="_blank" class="classa" :class="!scope.row.vendor1?'clasRed':''">{{!scope.row.vendor1?'未设置':scope.row.vendor1 | cutOut}}</a>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="供应商链接2"
                                 header-align="center">
                    <el-table-column prop="oaGoods.vendor2"
                                     :render-header="renderHeaderPic"
                                     width='165'
                                     align="center">
                        <template slot-scope="scope">
                            <a :href="scope.row.vendor2" target="_blank" class="classa" :class="!scope.row.vendor2?'clasRed':''">{{!scope.row.vendor2?'未设置':scope.row.vendor2 | cutOut}}</a>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="供应商链接3"
                                 header-align="center">
                    <el-table-column prop="oaGoods.vendor3"
                                     :render-header="renderHeaderPic"
                                     width='165'
                                     align="center">
                        <template slot-scope="scope">
                            <a :href="scope.row.vendor3" target="_blank" class="classa" :class="!scope.row.vendor3?'clasRed':''">{{!scope.row.vendor3?'未设置':scope.row.vendor3 | cutOut}}</a>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="平台链接1"
                                 header-align="center">
                    <el-table-column prop="oaGoods.origin1"
                                     :render-header="renderHeaderPic"
                                     width='165'
                                     align="center">
                        <template slot-scope="scope">
                            <a :href="scope.row.origin1" target="_blank" class="classa" :class="!scope.row.origin1?'clasRed':''">{{!scope.row.origin1?'未设置':scope.row.origin1 | cutOut}}</a>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="平台链接2"
                                 header-align="center">
                    <el-table-column prop="oaGoods.origin2"
                                     :render-header="renderHeaderPic"
                                     width='165'
                                     align="center">
                        <template slot-scope="scope">
                            <a :href="scope.row.origin2" target="_blank" class="classa" :class="!scope.row.origin2?'clasRed':''">{{!scope.row.origin2?'未设置':scope.row.origin2 | cutOut}}</a>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="平台链接3"
                                 header-align="center">
                    <el-table-column prop="oaGoods.origin3"
                                     :render-header="renderHeaderPic"
                                     width='165'
                                     align="center">
                        <template slot-scope="scope">
                            <a :href="scope.row.origin3" target="_blank" class="classa" :class="!scope.row.origin3?'clasRed':''">{{!scope.row.origin3?'未设置':scope.row.origin3 | cutOut}}</a>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="开发时间"
                                 header-align="center">
                    <el-table-column prop="devDatetime"
                                     :render-header="renderHeaderPic"
                                     width='160'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="美工"
                                 header-align="center">
                    <el-table-column prop="possessMan1"
                                     :render-header="renderHeaderPic"
                                     width='110'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="是否多属性"
                                 header-align="center">
                    <el-table-column prop="isVar"
                                     :render-header="renderHeaderPic"
                                     width='108'
                                     align="center">
                    </el-table-column>
                </el-table-column>
            </el-table>
            <!-- 图片信息查看对话框 -->
            <el-dialog title='详情' :visible.sync="dialogPicture" width="75%" top="2.2%">
                <el-form
                        label-position="left"
                        class="goodProForm"
                        ref="picForm" style="width: 100%;overflow: hidden;padding:0 2px;">
                        <el-row>
                            <el-col :span="24">
                                <a :href="goodsInfoPic.picUrl" target="_blank"><img :src="goodsInfoPic.picUrl" style="width: 125px;height: 125px;border:#d4d4d4 solid 1px;border-radius:5px;"></a>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="图片地址" prop="picUrl" class="item">
                                <a :href="goodsInfoPic.picUrl" target="_blank"><el-input size="small" v-model="goodsInfoPic.picUrl" class="goodFormchild" style="width:95%;" disabled></el-input></a>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="商品编码" prop="goodsCode" class="item">
                                <el-input size="small" v-model="goodsInfoPic.goodsCode" style="width:95%;" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="商品名称" prop="goodsName" class="item">
                                <el-input size="small" v-model="goodsInfoPic.goodsName" style="width:95%;" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="是否备货" prop="stockUp" class="item">
                                <el-input size="small" v-model="goodsInfoPic.stockUp" style="width:95%;" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="图片状态" prop="achieveStatus" class="item">
                                <el-input size="small" v-model="goodsInfoPic.picStatus" style="width:95%;" disabled></el-input>
                                </el-form-item>
                            </el-col>  
                            <el-col :span="4">
                                <el-form-item label="采购" prop="purchaser" class="item">
                                <el-input size="small" v-model="goodsInfoPic.purchaser" style="width:95%;" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="开发员" prop="developer" class="item">
                                <el-input size="small" v-model="goodsInfoPic.developer" style="width:95%;" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="美工" prop="possessMan1" class="item">
                                <el-input size="small" v-model="goodsInfoPic.possessMan1" style="width:95%;" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="供应商名称" prop="supplierName" class="item">
                                <el-input size="small" v-model="goodsInfoPic.supplierName" style="width:95%;" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="中文申报名" prop="aliasCnName" class="item">
                                <el-input size="small" v-model="goodsInfoPic.aliasCnName" style="width:95%;" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="英文申报名" prop="aliasEnName" class="item">
                                <el-input size="small" v-model="goodsInfoPic.aliasEnName" style="width:95%;" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="规格" prop="packName" class="item">
                                <el-input size="small" v-model="goodsInfoPic.packName" style="width:95%;" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="季节" prop="season" class="item">
                                <el-input size="small" v-model="goodsInfoPic.season" style="width:95%;" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="仓库" prop="storeName" class="item">
                                <el-input size="small" v-model="goodsInfoPic.storeName" style="width:95%;" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="是否液体" prop="isLiquid" class="item">
                                <el-input size="small" v-model="goodsInfoPic.isLiquid" style="width:95%;" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="是否粉末" prop="isPowder" class="item">
                                <el-input size="small" v-model="goodsInfoPic.isPowder" style="width:95%;" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="是否带磁" prop="isMagnetism" class="item">
                                <el-input size="small" v-model="goodsInfoPic.isMagnetism" style="width:95%;" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="是否带电" prop="isCharged" class="item">
                                <el-input size="small" v-model="goodsInfoPic.isCharged" style="width:95%;" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="是否多属性" prop="isVar" class="item">
                                <el-input size="small" v-model="goodsInfoPic.isVar" style="width:95%;" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="禁售平台" prop="dictionaryName" class="item">
                                <el-input size="small" v-model="goodsInfoPic.dictionaryName" style="width:95%;" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="开发时间" prop="devDatetime" class="item">
                                <el-input size="small" v-model="goodsInfoPic.devDatetime" style="width:95%;" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="更新时间" prop="updateTime" class="item">
                                <el-input size="small" v-model="goodsInfoPic.updateTime" style="width:95%;" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="描述" prop="description" class="item">
                                <el-input size="small" v-model="goodsInfoPic.description" style="width:99%;" disabled type="textarea" rows="6"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                </el-form>
            </el-dialog>
            <el-pagination background
                           @size-change="handleSizeChangePic"
                           @current-change="handleCurrentChangePic"
                           :current-page="this.picture.page"
                           :page-sizes="[10, 20, 30, 40]"
                           :page-size="this.picture.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="this.totalPic">
            </el-pagination>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    import goodsInfoPicture from './goodsInfoPicture.vue'
    import goodsInfoPlatform from './goodsInfoPlatform.vue'
    import {
            APIGoodsInfo,
            APIPictureList,
            APIPlatList,
            APIAttribute,
            APIAttributeInfo,
            APIFinishAttribute,
            APIGenerateCode,
            APIPlat,
            APIDeleteVariant,
            APIPicturePreview,
            APIFinishPicture
    } from '../../api/product'
    import {getAttributeInfoStoreName,getAttributeInfoCat,getPlatGoodsStatus,getPlatCompletedPlat} from '../../api/profit'
    import { getMenu } from '../../api/login'
    export default {
        data() {
            return {
                tableHeight:window.innerHeight -135,
                dialogVisible: false,
                dialogPicture: false,
                dialogPlat: false,
                total: null,
                totalPic: null,
                totalPlat: null,
                activeName: '属性信息',
                sels: [],
                time1: '',
                time2: '',
                allMenu: [],
                repertory:[],
                productState:[],
                mainCategory:[],
                perfectPlatform:[],
                goodsState:[],
                goodsInfo:[],
                oaGoods:[],
                goodsInfoPlat:[],
                oaGoodsPlat:[],
                goodsInfoPic:[],
                oaGoodsPic:[],
                tableData: [
                ],
                picId:{
                    id: null
                },
                pictureData: [],
                platData: [],
                show: {
                    status: true,
                    picture: false,
                    plat: false
                },
                condition: {
                    "pageSize":10,
                    "page":1,
                    "goodsCode":"",
                    "achieveStatus":"",
                    "goodsName":"",
                    "developer":"",
                    "devDatetime":[],
                    "updateTime":[],
                    "aliasCnName":"",
                    "aliasEnName":"",
                    "stockUp":"",
                    "isLiquid":"",
                    "isPowder":"",
                    "isMagnetism":"",
                    "isCharged":"",
                    "isVar":""
                },
                picture: {
                    "pageSize": 10,
                    "page": 1,
                    "goodsCode": "",
                    "achieveStatus": "",
                    "goodsName": "",
                    "developer": "",
                    "devDatetime": [],
                    "updateTime": [],
                    "aliasCnName": "",
                    "aliasEnName": "",
                    "stockUp": "",
                    "isLiquid": "",
                    "isPowder": "",
                    "isMagnetism": "",
                    "isCharged": "",
                    "isVar": "",
                    'picStatus':'',    
                    origin1: "",
                    origin2: null,
                    origin3: "",
                    vendor1: "",
                    vendor2: "",
                    vendor3: null
                },
                plat: {
                    picUrl:null,
                    goodsCode:null,
                    possessMan:null,
                    storeName:null,
                    stockUp:null,
                    wishPublish:null,
                    completeStatus:null,
                    goodsName:null,
                    cate:null,
                    subCate:null,
                    supplierName:null,
                    introducer:null,
                    developer:null,
                    purchaser:null,
                    possessMan1:null,
                    mid:null,
                    dictionaryName:null,
                    devDatetime:[],
                    updateTime:[],
                    isVar:null,
                    goodsStatus:null,
                    stockDays:null,
                    pageSize: 10,
                    page: 1
                },
                viewForm: {
                    id: null
                },
                picForm: {
                    id: null
                },
                platForm: {
                    id: null
                },
                finish: {
                    id: []
                }
            }
        },
        filters: {
            cutOut: function (value) {
                if (!value) return ''
                value = value.substring(0,21)
                return value
            }
        },
        methods: {
//            handleClick(tab, event) {
//                if (tab.label === '属性信息') {
//                    sessionStorage.setItem('judge', "属性信息")
//                    this.show['status'] = true
//                    this.getData()
//                } else {
//                    this.show['status'] = false
//                }
//                if (tab.label === '图片信息') {
//                    sessionStorage.setItem('judge', "图片信息")
//                    this.show['picture'] = true
//                    this.getPic()
//                } else {
//                    this.show['picture'] = false
//                }
//                if (tab.label === '平台信息') {
//                    sessionStorage.setItem('judge', "平台信息")
//                    this.show['plat'] = true
//                    this.getPlat()
//                    getAttributeInfoStoreName().then(response => {
//                        this.repertory =  response.data.data
//                    })
//                    getAttributeInfoCat().then(response => {
//                        this.mainCategory =  response.data.data
//                    })
//                    getPlatGoodsStatus().then(response => {
//                        this.goodsState =  response.data.data
//                    })
//                    getPlatCompletedPlat().then(response => {
//                        this.perfectPlatform =  response.data.data
//                    })
//                } else {
//                    this.show['plat'] = false
//                }
//            },
            //属性信息分页
            handleCurrentChange(val) {
                this.condition.page = val
                this.getData()
            },
            handleSizeChange(val) {
                this.condition.pageSize = val
                this.getData()
            },
            //属性信息查看
            view(index, row) {
                this.dialogVisible = true
                this.viewForm.id = row.id
                APIAttributeInfo(this.viewForm).then(res => {
//        this.viewForm = res.data.data
                    this.goodsInfo = res.data.data.basicInfo.goodsInfo
                    this.oaGoods = res.data.data.basicInfo.oaGoods
                })
            },
            //标记
            mark(index, row) {
                this.finish.id = row.id
                APIFinishAttribute(this.finish).then(res => {
                    if (res.data.code === 200) {
                        this.$message({
                            message: '标记成功',
                            type: 'success'
                        })
                        this.getData()
                    } else {
                        this.$message.error(res.data.message)
                    }
                })
            },
            //批量标记
            markAll() {
                this.finish.id = this.sels.map(e => e.id)
                APIFinishAttribute(this.finish).then(res => {
                    if (res.data.code === 200) {
                        this.$message({
                            message: '标记成功',
                            type: 'success'
                        })
                        this.getData()
                    } else {
                        this.$message.error(res.data.message)
                    }
                })
            },
            //导入普源
            passAll() {
            },
            //生成编码
            codeAll() {
                if (this.sels) {
                    let data = {
                        id: this.sels.map(e => e.id)[0]
                    }
                    APIGenerateCode(data).then(res => {
                        if(res.data.code==200){
                            this.$message({
                                message: '生成成功',
                                type: 'success'
                            })
                            for (let i = 0; i < this.tableData.length; i++) {
                                if (this.tableData[i].id === data.id) {
                                    this.tableData[i].GoodsCode = res.data.data[0]
                                }
                            }
                        }
                    })
                }
            },
            //单元格样式
            cellStyle({ row, column, rowIndex, columnIndex }) {
                if (row.isVar === '是' && columnIndex === 4) {
                    return 'color: red'
                }
            },
            //属性信息删除
            del(index,row) {
                let arrId = []
                arrId.push(row.id)
                let aryId={
                    id:arrId
                }
                APIDeleteVariant(aryId).then(res => {
                    if (res.data.code === 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.getData()
                    } else {
                        this.$message.error('删除失败')
                    }
                })
            },
            //属性信息全选
            selsChange(sels) {
                this.sels = sels
            },
            //属性信息获取数据
            getData() {
                APIGoodsInfo(this.condition).then(res => {
                    this.tableData = res.data.data.items
                    this.total = res.data.data._meta.totalCount
                    this.condition.pageSize = res.data.data._meta.perPage
                    this.condition.page = res.data.data._meta.currentPage
                })
            },
            //属性信息表头input框
            renderHeader(h, { column, $index }) {
                if ($index === 0) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: '',
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.goodsCode = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 1) {
                    let filters = [{ text: '是', value: '是' }, { text: '否', value: '否' }]
                    return h(
                            'el-select',
                            {
                                props: {
                                    placeholder: '请选择',
                                    value: this.condition.stockUp,
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        this.condition.stockUp=value
                                        this.$emit('input', value)
                                    },
                                    change: searchValue => {
                                        this.filter()
                                    }
                                }
                            },
                            [
                                filters.map(item => {
                                    return h('el-option', {
                                        props: {
                                            value: item.text,
                                            label: item.value
                                        }
                                    })
                                })
                            ]
                    )
                } else if ($index === 2) {
                    let filters = [
                        { text: '待处理', value: '待处理' },
                        { text: '已完善', value: '已完善' },
                        { text: '已导入', value: '已导入' }
                    ]
                    return h(
                            'el-select',
                            {
                                props: {
                                    placeholder: '请选择',
                                    value: this.condition.achieveStatus,
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        this.condition.achieveStatus=value
                                        this.$emit('input', value)
                                    },
                                    change: searchValue => {
                                        this.filter()
                                    }
                                }
                            },
                            [
                                filters.map(item => {
                                    return h('el-option', {
                                        props: {
                                            value: item.text,
                                            label: item.value
                                        }
                                    })
                                })
                            ]
                    )
                } else if ($index === 3) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.condition.goodsName,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.goodsName=value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
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
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.condition.developer,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.developer=value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if($index === 5){
                    return h('el-date-picker',{
                        props:{
                            value:this.time1,
                            size:'mini',
                            type:'daterange',
                        },
                        style:{
                            width:'180px',
                            padding:'2px',
                        },
                        on:{
                            input:value=>{
                                this.time1=value
                                this.$emit('input', value)
                            },
                            change:value => {
                                this.filter()
                            }
                        }
                    })
                } else if ($index === 6) {
                    return h('el-date-picker',{
                        props:{
                            value:this.time2,
                            size:'mini',
                            type:'daterange',
                        },
                        style:{
                            width:'180px',
                            padding:'2px',
                        },
                        on:{
                            input:value=>{
                                this.time2=value
                                this.$emit('input', value)
                            },
                            change:value => {
                                this.filter()
                            }
                        }
                    })
                } else if ($index === 7) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value:this.condition.aliasCnName,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.aliasCnName = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 8) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.condition.aliasEnName,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.aliasEnName = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 9) {
                    let filters = [{ text: '是', value: '是' }, { text: '否', value: '否' }]
                    return h(
                            'el-select',
                            {
                                props: {
                                    placeholder: '请选择',
                                    value: this.condition.isLiquid,
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        this.condition.isLiquid = value
                                        this.$emit('input', value)
                                    },
                                    change: searchValue => {
                                        this.filter()
                                    }
                                }
                            },
                            [
                                filters.map(item => {
                                    return h('el-option', {
                                        props: {
                                            value: item.text,
                                            label: item.value
                                        }
                                    })
                                })
                            ]
                    )
                } else if ($index === 10) {
                    let filters = [{ text: '是', value: '是' }, { text: '否', value: '否' }]
                    return h(
                            'el-select',
                            {
                                props: {
                                    placeholder: '请选择',
                                    value: this.condition.isPowder,
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        this.condition.isPowder = value
                                        this.$emit('input', value)
                                    },
                                    change: searchValue => {
                                        this.filter()
                                    }
                                }
                            },
                            [
                                filters.map(item => {
                                    return h('el-option', {
                                        props: {
                                            value: item.text,
                                            label: item.value
                                        }
                                    })
                                })
                            ]
                    )
                } else if ($index === 11) {
                    let filters = [{ text: '是', value: '是' }, { text: '否', value: '否' }]
                    return h(
                            'el-select',
                            {
                                props: {
                                    placeholder: '请选择',
                                    value: this.condition.isMagnetism,
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        this.condition.isMagnetism = value
                                        this.$emit('input', value)
                                    },
                                    change: searchValue => {
                                        this.filter()
                                    }
                                }
                            },
                            [
                                filters.map(item => {
                                    return h('el-option', {
                                        props: {
                                            value: item.text,
                                            label: item.value
                                        }
                                    })
                                })
                            ]
                    )
                } else if ($index === 12) {
                    let filters = [{ text: '是', value: '是' }, { text: '否', value: '否' }]
                    return h(
                            'el-select',
                            {
                                props: {
                                    placeholder: '请选择',
                                    value: this.condition.isCharged,
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        this.condition.isCharged = value
                                        this.$emit('input', value)
                                    },
                                    change: searchValue => {
                                        this.filter()
                                    }
                                }
                            },
                            [
                                filters.map(item => {
                                    return h('el-option', {
                                        props: {
                                            value: item.text,
                                            label: item.value
                                        }
                                    })
                                })
                            ]
                    )
                } else if ($index === 13) {
                    let filters = [{ text: '是', value: '是' }, { text: '否', value: '否' }]
                    return h(
                            'el-select',
                            {
                                props: {
                                    placeholder: '请选择',
                                    value: this.condition.isVar,
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        this.condition.isVar = value
                                        this.$emit('input', value)
                                    },
                                    change: searchValue => {
                                        this.filter()
                                    }
                                }
                            },
                            [
                                filters.map(item => {
                                    return h('el-option', {
                                        props: {
                                            value: item.text,
                                            label: item.value
                                        }
                                    })
                                })
                            ]
                    )
                }
            },
            upte(index,row){
                sessionStorage.setItem('judge', "属性信息")
                this.$router.push({
                    path: `/${row.id}`
                })
            },
            formatTen(num) {
                return num > 9 ? (num + "") : ("0" + num)
            },
            formatDate(date) {
                const year = date.getFullYear()
                const month = date.getMonth() + 1
                const day = date.getDate()
                const hour = date.getHours()
                const minute = date.getMinutes()
                const second = date.getSeconds()
                return year + "-" + this.formatTen(month) + "-" + this.formatTen(day)
            },
            filter() {
                if (this.time1 !== null && this.time1.length !== 0) {
                    this.picture.devDatetime = [this.formatDate(this.time1[0]), this.formatDate(this.time1[1])]
                } else {
                    this.picture.devDatetime = []
                }
                this.getPic()
            },
            //图片信息
            signPerfect(index,row){
                let objSin={
                    id:row.id
                }
                APIFinishPicture(objSin).then(res => {
                    if(res.data.code==200){
                        this.$message({
                            message: '成功',
                            type: 'success'
                        })
                        this.getPic()
                    }else {
                        this.$message.error(res.data.message)
                    }
                })
            },
            handleSizeChangePic(val) {
                this.picture.pageSize = val
                this.getPic()
            },
            handleCurrentChangePic(val) {
                this.picture.page = val
                sessionStorage.setItem('sepagePic', val)
                this.getPic()
            },
            //图片信息查看
            viewPic(index, row) {
                this.dialogPicture = true
                this.picId.id = row.id
                APIPicturePreview(this.picId).then(res => {
                    this.goodsInfoPic = res.data.data
                })
            },
            picEdit(index, row) {
                sessionStorage.setItem('judge', "图片信息")
                this.$router.push({
                    path: `/table/${row.id}`
                })
                // let Logistics=this.$router.resolve({
                //    path: `/table/${row.id}`
                // })     
                //  window.open(Logistics.href);
            },
            //图片信息获取数据
            getPic() {
                APIPictureList(this.picture).then(res => {
                    this.pictureData = res.data.data.items
                    for(let i=0;i<this.pictureData.length;i++){
                    var strData=this.pictureData[i].picUrl
                    var replaceStr;
                    var reg=/([\s\S]+)(.(jpg_)?\d{2}x\d+)([\s\S]+)/g
                    var result=reg.exec(strData);
                    if(result){
                        if(result[1].charAt(result[1].length-1)=='.'){
                        result[1] = result[1].substring(0, result[1].length - 1); 
                        }
                        replaceStr=result[1]+result[result.length-1]
                        this.pictureData[i].picUrl=replaceStr
                        }
                    }
                    this.totalPic = res.data.data._meta.totalCount
                    this.picture.pageSize = res.data.data._meta.perPage
                    this.picture.page = res.data.data._meta.currentPage
                })
            },
            //图片信息表头input框
            renderHeaderPic(h, { column, $index }) {
                if ($index === 0) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.picture.goodsCode,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.picture.goodsCode = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 1) {
                    let filters = [{ text: '是', value: '是' }, { text: '否', value: '否' }]
                    return h(
                            'el-select',
                            {
                                props: {
                                    placeholder: '请选择',
                                    value: this.picture.stockUp,
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        this.picture.stockUp = value
                                        this.$emit('input', value)
                                    },
                                    change: searchValue => {
                                        this.filter()
                                    }
                                }
                            },
                            [
                                filters.map(item => {
                                    return h('el-option', {
                                        props: {
                                            value: item.text,
                                            label: item.value
                                        }
                                    })
                                })
                            ]
                    )
                }else if ($index === 2) {
                    let filters = [
                        { text: '待处理', value: '待处理' },
                        { text: '已完善', value: '已完善' }
                    ]
                    return h(
                            'el-select',
                            {
                                props: {
                                    placeholder: '请选择',
                                    value: this.picture.picStatus,
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        this.picture.picStatus = value
                                        this.$emit('input', value)
                                    },
                                    change: searchValue => {
                                        this.filter()
                                    }
                                }
                            },
                            [
                                filters.map(item => {
                                    return h('el-option', {
                                        props: {
                                            value: item.text,
                                            label: item.value
                                        }
                                    })
                                })
                            ]
                    )
                } else if ($index === 3) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.picture.goodsName,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.picture.goodsName = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                }  else if ($index === 4) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.picture.developer,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.picture.developer = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
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
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.picture.vendor1,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.picture.vendor1 = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 6) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.picture.vendor2,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.picture.vendor2 = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 7) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.picture.vendor3,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.picture.vendor3 = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 8) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.picture.origin1,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.picture.origin1 = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 9) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.picture.origin2,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.picture.origin2 = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 10) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.picture.origin3,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.picture.origin3 = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 11) {
                    return h('el-date-picker',{
                        props:{
                            value:this.time1,
                            size:'mini',
                            type:'daterange',
                        },
                        style:{
                            width:'145px',
                            padding:'2px',
                        },
                        on:{
                            input:value=>{
                                this.time1=value
                                this.$emit('input', value)
                            },
                            change:value => {
                                this.filter()
                            }
                        }
                    })
                } else if ($index === 12) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.picture.possessMan1,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.picture.possessMan1 = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 13) {
                    let filters = [{ text: '是', value: '是' }, { text: '否', value: '否' }]
                    return h(
                            'el-select',
                            {
                                props: {
                                    placeholder: '请选择',
                                    value: this.picture.isVar,
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        this.picture.isVar = value
                                        this.$emit('input', value)
                                    },
                                    change: searchValue => {
                                        this.filter()
                                    }
                                }
                            },
                            [
                                filters.map(item => {
                                    return h('el-option', {
                                        props: {
                                            value: item.text,
                                            label: item.value
                                        }
                                    })
                                })
                            ]
                    )
                }
            },
            //平台信息
            handleSizeChangePlat(val) {
                this.plat.pageSize = val
                this.getPlat()
            },
            handleCurrentChangePlat(val) {
                this.plat.page = val
                this.getPlat()
            },
            //平台信息查看
            viewPlat(index, row) {
                this.dialogPlat = true
                this.platForm.id = row.id
                APIPlat(this.platForm).then(res => {
                    this.goodsInfoPlat = res.data.data
                    if(this.goodsInfoPlat.oaGoods){
                        this.oaGoodsPlat=this.goodsInfoPlat.oaGoods
                    }else {
                        this.oaGoodsPlat=[]
                    }
                })
            },
            //平台信息更新
            platEdit(index, row) {
                sessionStorage.setItem('judge', "平台信息")
                this.$router.push({
                    path: `/plat/${row.id}`
                })
            },
            //平台信息获取数据
            getPlat() {
                APIPlatList(this.plat).then(res => {
                    this.platData = res.data.data.items
                    this.totalPlat = res.data.data._meta.totalCount
                    this.plat.pageSize = res.data.data._meta.perPage
                    this.plat.page = res.data.data._meta.currentPage
                })
            },
            renderHeaderPlat(h, { column, $index }) {
                if ($index === 0) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.plat.goodsCode,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.plat.goodsCode = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
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
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.plat.mapPersons,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.plat.mapPersons= value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 2) {
                    let filters = this.repertory
                    return h(
                            'el-select',
                            {
                                props: {
                                    placeholder: '请选择',
                                    value: this.plat.storeName,
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        this.plat.storeName=value
                                        this.$emit('input', value)
                                    },
                                    change: searchValue => {
                                        this.filter()
                                    }
                                }
                            },
                            [
                                filters.map(item => {
                                    return h('el-option', {
                                        props: {
                                            value: item,
                                            label: item
                                        }
                                    })
                                })
                            ]
                    )
                } else if ($index === 3) {
                    let filters = [{ text: '是', value: '是' }, { text: '否', value: '否' }]
                    return h(
                            'el-select',
                            {
                                props: {
                                    placeholder: '请选择',
                                    value: this.plat.stockUp,
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        this.plat.stockUp=value
                                        this.$emit('input', value)
                                    },
                                    change: searchValue => {
                                        this.filter()
                                    }
                                }
                            },
                            [
                                filters.map(item => {
                                    return h('el-option', {
                                        props: {
                                            value: item.text,
                                            label: item.value
                                        }
                                    })
                                })
                            ]
                    )
                } else if ($index === 4) {
                    let filters = [{ text: 'Y', value: 'Y' }, { text: 'N', value: 'N' }]
                    return h(
                            'el-select',
                            {
                                props: {
                                    placeholder: '请选择',
                                    value:this.plat.wishPublish,
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        this.plat.wishPublish=value
                                        this.$emit('input', value)
                                    },
                                    change: searchValue => {
                                        this.filter()
                                    }
                                }
                            },
                            [
                                filters.map(item => {
                                    return h('el-option', {
                                        props: {
                                            value: item.text,
                                            label: item.value
                                        }
                                    })
                                })
                            ]
                    )
                } else if ($index === 5) {
//                    let filters = [{ text: '未设置', value: '未设置' }, { text: 'eBay已完善', value: 'eBay已完善' }, { text: 'Wish已完善', value: 'Wish已完善' }, { text: 'Joom已完善', value: 'Joom已完善' }, { text: 'Wish已完善|eBay已完善', value: 'Wish已完善|eBay已完善' }, { text: 'Wish已完善|Joom已完善', value: 'Wish已完善|Joom已完善' }, { text: 'Joom已完善|eBay已完善', value: 'Joom已完善|eBay已完善'}, { text: 'Wish已完善|Joom已完善|eBay已完善', value: 'Wish已完善|Joom已完善|eBay已完善'}]
                    let filters=this.perfectPlatform
                    return h(
                            'el-select',
                            {
                                props: {
                                    placeholder: '请选择',
                                    value: this.plat.completeStatus,
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        this.plat.completeStatus=value
                                        this.$emit('input', value)
                                    },
                                    change: searchValue => {
                                        this.filter()
                                    }
                                }
                            },
                            [
                                filters.map(item => {
                                    return h('el-option', {
                                        props: {
                                            value: item,
                                            label: item
                                        }
                                    })
                                })
                            ]
                    )
                } else if ($index === 6) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.plat.goodsName,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.plat.goodsName = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 7) {
                    let filters = this.mainCategory
                    return h(
                            'el-select',
                            {
                                props: {
                                    placeholder: '请选择',
                                    value: this.plat.cate,
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        this.plat.cate=value
                                        this.$emit('input', value)
                                    },
                                    change: searchValue => {
                                        this.filter()
                                    }
                                }
                            },
                            [
                                filters.map(item => {
                                    return h('el-option', {
                                        props: {
                                            value: item,
                                            label: item
                                        }
                                    })
                                })
                            ]
                    )
                } else if ($index === 8) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.plat.subCate,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.plat.subCate = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 9) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.plat.supplierName,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.plat.supplierName = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 10) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.plat.introducer,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.plat.introducer = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 11) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.plat.developer,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.plat.developer = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 12) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.plat.purchaser,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.plat.purchaser = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 13) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.plat.possessMan1,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.plat.possessMan1 = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 14) {
                    let filters = [{ text: '是', value: '是' }, { text: '否', value: '否' }]
                    return h(
                            'el-select',
                            {
                                props: {
                                    placeholder: '请选择',
                                    value: this.plat.mid ,
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        this.plat.mid=value
                                        this.$emit('input', value)
                                    },
                                    change: searchValue => {
                                        this.filter()
                                    }
                                }
                            },
                            [
                                filters.map(item => {
                                    return h('el-option', {
                                        props: {
                                            value: item.text,
                                            label: item.value
                                        }
                                    })
                                })
                            ]
                    )
                } else if ($index === 15) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.plat.dictionaryName,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.plat.dictionaryName = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 16) {
                    return h('el-date-picker',{
                        props:{
                            value:this.time1,
                            size:'mini',
                            type:'daterange',
                        },
                        style:{
                            width:'200px',
                            padding:'2px',
                        },
                        on:{
                            input:value=>{
                                this.time1=value
                                this.$emit('input', value)
                            },
                            change:value => {
                                this.filter()
                            }
                        }
                    })
                } else if ($index === 17) {
                    return h('el-date-picker',{
                        props:{
                            value:this.time2,
                            size:'mini',
                            type:'daterange',
                        },
                        style:{
                            width:'200px',
                            padding:'2px',
                        },
                        on:{
                            input:value=>{
                                this.time2=value
                                this.$emit('input', value)
                            },
                            change:value => {
                                this.filter()
                            }
                        }
                    })
                } else if ($index === 18) {
                    let filters = [{ text: '是', value: '是' }, { text: '否', value: '否' }]
                    return h(
                            'el-select',
                            {
                                props: {
                                    placeholder: '请选择',
                                    value: this.plat.isVar,
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        this.plat.isVar=value
                                        this.$emit('input', value)
                                    },
                                    change: searchValue => {
                                        this.filter()
                                    }
                                }
                            },
                            [
                                filters.map(item => {
                                    return h('el-option', {
                                        props: {
                                            value: item.text,
                                            label: item.value
                                        }
                                    })
                                })
                            ]
                    )
                } else if ($index === 19) {
                    let filters = this.goodsState
                    return h(
                            'el-select',
                            {
                                props: {
                                    placeholder: '请选择',
                                    value: this.plat.goodsStatus,
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        this.plat.goodsStatus=value
                                        this.$emit('input', value)
                                    },
                                    change: searchValue => {
                                        this.filter()
                                    }
                                }
                            },
                            [
                                filters.map(item => {
                                    return h('el-option', {
                                        props: {
                                            value: item,
                                            label: item
                                        }
                                    })
                                })
                            ]
                    )
                } else if ($index === 20) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.plat.stockDays,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.plat.stockDays=value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                }
            }
        },
        mounted() {
            getMenu().then(response => {
                const res = response.data.data
                const menu = res.filter(e => e.name === '产品中心')
                let arr=menu[0].children
                for(let i=0;i<arr.length;i++){
                    if(arr[i].name=="产品资料"){
                        this.allMenu=arr[i].tabs
                    }
                }
            })
            const seePage=sessionStorage.getItem("sepagePic")
            if(seePage){
                this.picture.page=Number(seePage)
            }
            this.getPic()
        }
    }
</script>

<style lang="scss" scoped>
    .clasRed{
        color: #c55 !important;
    }
    .clasGreen{
        color: #0E9A00;
    }
    .classa{
        color: #337ab7;
        text-decoration: none;
    }
    .clasRed1 {
      color: #f56c6c;
      border: rgba(245, 108, 108, 0.2) solid 1px;
      background: rgba(245, 108, 108, 0.1);
      width: 85%;
      margin: auto;
      line-height: 32px;
      display: block;
      border-radius: 5px;
    }
    .clasGreen1 {
      color: #0e9a00;
      border-radius: 5px;
      width: 85%;
      margin: auto;
      line-height: 32px;
      display: block;
      border: rgba(3, 82, 38, 0.2) solid 1px;
      background: rgba(33, 170, 95, 0.1);
    }
    .redCu {
      color: red;
      font-weight: bold;
    }
.redblack {
  color: #606266;
}
</style>