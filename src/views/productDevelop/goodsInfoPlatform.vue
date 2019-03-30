<template>
    <section class="toolbar">
        <el-tabs v-model="activeName"
                 type="card"
                 @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in this.allMenu"
                         :label="item.name"
                         :name="item.name"
                         :key="index">
            </el-tab-pane>
        </el-tabs>
        <div>
            <!-- 平台信息列表 -->
            <el-table :data="platData"
                      @selection-change="selsChange"
                      style="width: 97%;margin-left:20px">
                <el-table-column type="selection"
                                 fixed
                                 align="center"
                                 header-align="center"></el-table-column>
                <el-table-column type="index"
                                 fixed
                                 align="center"
                                 header-align="center">
                </el-table-column>
                <el-table-column label="操作"
                                 fixed
                                 header-align="center"
                                 width="70">
                    <template slot-scope="scope">
                        <el-tooltip content="查看">
                            <i class="el-icon-view"
                               @click="viewPlat(scope.$index, scope.row)"
                               style="color: #409EFF;cursor:pointer;"></i>
                        </el-tooltip>
                        <el-tooltip content="更新">
                            <i @click="platEdit(scope.$index, scope.row)"
                               class="el-icon-edit"
                               style="color: #409EFF;cursor:pointer;margin-left: 15px"></i>
                        </el-tooltip>
                        <!--<el-tooltip content="删除">-->
                            <!--<i class="el-icon-delete"-->
                               <!--style="color: #409EFF;cursor:pointer;"></i>-->
                        <!--</el-tooltip>-->
                    </template>
                </el-table-column>
                <el-table-column prop="picUrl"
                                 fixed
                                 label="主图"
                                 header-align="center">
                    <template slot-scope="scope">
                        <img :src='scope.row.picUrl'
                             style="width: 60px;height: 50px">
                    </template>
                </el-table-column>
                <el-table-column label="商品编码"
                                 header-align="center">
                    <el-table-column prop="goodsCode"
                                     :render-header="renderHeaderPlat"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="对应销售"
                                 header-align="center">
                    <el-table-column prop="possessMan1"
                                     :render-header="renderHeaderPlat"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="仓库"
                                 header-align="center">
                    <el-table-column prop="storeName"
                                     :render-header="renderHeaderPlat"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="是否备货"
                                 header-align="center">
                    <el-table-column prop="stockUp"
                                     :render-header="renderHeaderPlat"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="Wish待刊登"
                                 header-align="center">
                    <el-table-column prop="wishpublish"
                                     :render-header="renderHeaderPlat"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="完成状况"
                                 header-align="center">
                    <el-table-column prop="completeStatus"
                                     :render-header="renderHeaderPlat"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="商品名称"
                                 header-align="center">
                    <el-table-column prop="goodsName"
                                     :render-header="renderHeaderPlat"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="主类目"
                                 header-align="center">
                    <el-table-column prop="cate"
                                     :render-header="renderHeaderPlat"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="子类目"
                                 header-align="center">
                    <el-table-column prop=""
                                     :render-header="renderHeaderPlat"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="供应商名称"
                                 header-align="center">
                    <el-table-column prop="supplierName"
                                     :render-header="renderHeaderPlat"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="推荐人"
                                 header-align="center">
                    <el-table-column prop=""
                                     :render-header="renderHeaderPlat"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="开发员"
                                 header-align="center">
                    <el-table-column prop="developer"
                                     :render-header="renderHeaderPlat"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="采购"
                                 header-align="center">
                    <el-table-column prop="purchaser"
                                     :render-header="renderHeaderPlat"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="美工"
                                 header-align="center">
                    <el-table-column prop="possessman1"
                                     :render-header="renderHeaderPlat"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="是否是采集数据"
                                 header-align="center">
                    <el-table-column prop=""
                                     :render-header="renderHeaderPlat"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="禁售平台"
                                 header-align="center">
                    <el-table-column prop="dictionaryName"
                                     :render-header="renderHeaderPlat"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="开发时间"
                                 header-align="center">
                    <el-table-column prop="devDatetime"
                                     :render-header="renderHeaderPlat"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="更新时间"
                                 header-align="center">
                    <el-table-column prop="updateTime"
                                     :render-header="renderHeaderPlat"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="是否多属性"
                                 header-align="center">
                    <el-table-column prop="isVar"
                                     :render-header="renderHeaderPlat"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="商品状态"
                                 header-align="center">
                    <el-table-column prop="goodsStatus"
                                     :render-header="renderHeaderPlat"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="采购到货天数"
                                 header-align="center">
                    <el-table-column prop="filterType"
                                     :render-header="renderHeaderPlat"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
            </el-table>
            <!-- 平台信息查看对话框 -->
            <el-dialog title='查看'
                       :visible.sync="dialogPlat">
                <el-form :model="platForm"
                         label-position="left"
                         label-width="110px"
                         ref="platForm">
                    <el-form-item label="供应商链接1"
                                  prop=""
                                  class="item">
                        <span>{{}}</span>
                    </el-form-item>
                    <el-form-item label="供应商链接2"
                                  prop=""
                                  class="item">
                        <span>{{}}</span>
                    </el-form-item>
                    <el-form-item label="供应商链接3"
                                  prop=""
                                  class="item">
                        <span>{{}}</span>
                    </el-form-item>
                    <el-form-item label="平台参考链接1"
                                  prop=""
                                  class="item">
                        <span>{{}}</span>
                    </el-form-item>
                    <el-form-item label="平台参考链接2"
                                  prop=""
                                  class="item">
                        <span>{{}}</span></el-form-item>
                    <el-form-item label="平台参考链接3"
                                  prop=""
                                  class="item">
                        <span>{{}}</span></el-form-item>
                    <el-form-item label="是否液体"
                                  prop="IsLiquid"
                                  class="item"><span>{{platForm.IsLiquid}}</span></el-form-item>
                    <el-form-item label="是否粉末"
                                  prop="IsPowder"
                                  class="item"><span>{{platForm.IsPowder}}</span></el-form-item>
                    <el-form-item label="是否带磁"
                                  prop="isMagnetism"
                                  class="item"><span>{{platForm.isMagnetism}}</span></el-form-item>
                    <el-form-item label="是否带电"
                                  prop="IsCharged"
                                  class="item"><span>{{platForm.IsCharged}}</span></el-form-item>
                    <el-form-item label="描述"
                                  prop="description"
                                  class="item"><span>{{platForm.description}}</span></el-form-item>
                    <el-form-item label="商品名称"
                                  prop="GoodsName"
                                  class="item"><span>{{platForm.GoodsName}}</span></el-form-item>
                    <el-form-item label="中文申报名"
                                  prop="AliasCnName"
                                  class="item"><span>{{platForm.AliasCnName}}</span></el-form-item>
                    <el-form-item label="英文申报名"
                                  prop="AliasEnName"
                                  class="item"><span>{{platForm.AliasEnName}}</span></el-form-item>
                    <el-form-item label="Pack Name"
                                  prop=""
                                  class="item"><span>{{}}</span></el-form-item>
                    <el-form-item label="季节"
                                  prop="Season"
                                  class="item"><span>{{platForm.Season}}</span></el-form-item>
                    <el-form-item label="禁售平台"
                                  prop="DictionaryName"
                                  class="item"><span>{{platForm.DictionaryName}}</span></el-form-item>
                    <el-form-item label="供应商名称"
                                  prop="SupplierName"
                                  class="item"><span>{{platForm.SupplierName}}</span></el-form-item>
                    <el-form-item label="仓库"
                                  prop="StoreName"
                                  class="item"><span>{{platForm.StoreName}}</span></el-form-item>
                    <el-form-item label="采购"
                                  prop="Purchaser"
                                  class="item">
                        <span>{{platForm.Purchaser}}</span>
                    </el-form-item>
                    <el-form-item label="美工"
                                  prop="possessMan1"
                                  class="item">
                        <span>{{platForm.possessMan1}}</span>
                    </el-form-item>
                    <el-form-item label="责任人2"
                                  prop="possessMan2"
                                  class="item">
                        <span>{{platForm.possessMan2}}</span>
                    </el-form-item>
                    <el-form-item label="声明价"
                                  prop=""
                                  class="item">
                        <span></span>
                    </el-form-item>
                    <el-form-item label="图片"
                                  prop="picUrl"
                                  class="item">
                        <span>{{platForm.picUrl}}</span>
                    </el-form-item>
                    <el-form-item label="Goodsid"
                                  prop="goodsid"
                                  class="item">
                        <span>{{platForm.goodsid}}</span>
                    </el-form-item>
                    <el-form-item label="商品编码"
                                  prop="GoodsCode"
                                  class="item">
                        <span>{{platForm.GoodsCode}}</span>
                    </el-form-item>
                    <el-form-item label="是否备货"
                                  prop="stockUp"
                                  class="item">
                        <span>{{platForm.stockUp}}</span>
                    </el-form-item>
                    <el-form-item label="Achieve Status"
                                  prop="achieveStatus"
                                  class="item">
                        <span>{{platForm.achieveStatus}}</span>
                    </el-form-item>
                    <el-form-item label="开发时间"
                                  prop="devDatetime"
                                  class="item">
                        <span>{{platForm.devDatetime}}</span>
                    </el-form-item>
                    <el-form-item label="开发员"
                                  prop="developer"
                                  class="item">
                        <span>{{platForm.developer}}</span>
                    </el-form-item>
                    <el-form-item label="更新时间"
                                  prop="updateTime"
                                  class="item">
                        <span>{{platForm.updateTime}}</span>
                    </el-form-item>
                    <el-form-item label="图片状态"
                                  prop="picStatus"
                                  class="item">
                        <span>{{platForm.picStatus}}</span>
                    </el-form-item>
                    <el-form-item label="供应商ID"
                                  prop="SupplierID"
                                  class="item">
                        <span>{{platForm.SupplierID}}</span>
                    </el-form-item>
                    <el-form-item label="仓库ID"
                                  prop="StoreID"
                                  class="item">
                        <span>{{platForm.StoreID}}</span>
                    </el-form-item>
                    <el-form-item label="特殊属性名"
                                  prop=""
                                  class="item">
                        <span></span>
                    </el-form-item>
                    <el-form-item label="Bgoodsid"
                                  prop="bgoodsid"
                                  class="item">
                        <span>{{platForm.bgoodsid}}</span>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-pagination background
                           @size-change="handleSizeChangePlat"
                           @current-change="handleCurrentChangePlat"
                           :current-page="this.plat.currentPage"
                           :page-sizes="[10, 20, 30, 40]"
                           :page-size="this.plat.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="this.totalPlat"
                           style="position: fixed;bottom: 10px;left: 0;right: 0;margin-left: 700px">
            </el-pagination>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    import {
            APIGoodsInfo,
            APIPictureList,
            APIPlatList,
            APIAttribute,
            APIAttributeInfo,
            APIFinishAttribute,
            APIGenerateCode,
            APIPlat
    } from '../../api/product'
    import {getAttributeInfoStoreName,getAttributeInfoCat,getPlatGoodsStatus,getPlatCompletedPlat} from '../../api/profit'
    import { getMenu } from '../../api/login'
    export default {
        data() {
            return {
                dialogVisible: false,
                dialogPicture: false,
                dialogPlat: false,
                total: null,
                totalPic: null,
                totalPlat: null,
                activeName: '平台信息',
                sels: [],
                time1: '',
                time2: '',
                allMenu: [],
                goodsInfo:[],
                repertory:[],
                productState:[],
                oaGoods:[],
                mainCategory:[],
                goodsState:[],
                perfectPlatform:[],
                tableData: [

                ],
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
                    "oaGoods":{
                        approvalNote: null,
                        bGoodsid: null,
                        catNid: "",
                        cate: "",
                        checkStatus: "",
                        createDate: "",
                        devNum: "",
                        devStatus: "",
                        developer: "",
                        hopeCost: null,
                        hopeMonthProfit: null,
                        hopeRate: "",
                        hopeSale: "",
                        hopeWeight: "",
                        img: "",
                        introReason: "",
                        introducer: "",
                        mineId: null,
                        nid: "",
                        origin1: "",
                        origin2: null,
                        origin3: "",
                        salePrice: "",
                        stockUp: null,
                        subCate: "",
                        updateDate: "",
                        vendor1: "",
                        vendor2: "",
                        vendor3: null
                    }
                },
                plat: {
                    pageSize: 10,
                    currentPage: 1
                },
                viewForm: {
                    id: null
                },
                picForm: {
                    id: null
                },
                platForm: {},
                finish: {
                    id: []
                }
            }
        },
        methods: {
            handleClick(tab, event) {
                if (tab.label === '属性信息') {
                    this.$router.push({
                        path: `/v1/oa-goodsinfo/index`
                    })
                }
                if (tab.label === '图片信息') {
                    this.$router.push({
                        path: `/v1/oa-goodsinfo/goodsInfoPicture`
                    })
                }
                if (tab.label === '平台信息') {

                }
            },
            //属性信息分页
            handleCurrentChange(val) {
                this.condition.currentPage = val
                this.getData()
            },
            handleSizeChange(val) {
                this.condition.pageSize = val
                this.getData()
            },
            //导入普源
            passAll() {},
            //生成编码
            codeAll() {
                if (this.sels) {
                    let data = {
                        id: this.sels.map(e => e.id)[0]
                    }
                    APIGenerateCode(data).then(res => {
                        for (let i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].id === data.id) {
                                this.tableData[i].GoodsCode = res.data.data[0]
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
            del() {},
            //属性信息全选
            selsChange(sels) {
//      for(var i=0;i<sels.length;i++){
//        console.log(sels[i].id)
//      }
                this.sels = sels
            },
            //属性信息获取数据
            getData() {
                APIGoodsInfo(this.condition).then(res => {
                    this.tableData = res.data.data.items
                    this.total = res.data.data._meta.totalCount
                    this.condition.pageSize = res.data.data._meta.perPage
                    this.condition.currentPage = res.data.data._meta.currentPage
                })
            },
            //属性信息表头input框

            //图片信息分页
            handleSizeChangePic(val) {
                this.picture.pageSize = val
                this.getPic()
            },
            handleCurrentChangePic(val) {
                this.picture.currentPage = val
                this.getPic()
            },
            //图片信息查看
            viewPic(index, row) {
                this.dialogPicture = true
                // this.picForm.id = row.id
                // APIPictureInfo(this.picForm).then(res => {
                //   this.picForm = res.data.data
                // })
            },
            picEdit(index, row) {
                this.$router.push({
                    path: `/table/${row.id}`
                })
            },
            //图片信息获取数据
            getPic() {
                APIPictureList(this.picture).then(res => {
                    this.pictureData = res.data.data.items
                    this.totalPic = res.data.data._meta.totalCount
                    this.picture.pageSize = res.data.data._meta.perPage
                    this.picture.currentPage = res.data.data._meta.currentPage
                })
            },
            //图片信息表头input框

            //平台信息分页
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
                    this.platForm = res.data.data
                })
            },
            //平台信息更新
            platEdit(index, row) {
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
                    this.plat.currentPage = res.data.data._meta.currentPage
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
                if (this.activeName === '属性信息') {
                    if (this.time1 !== null && this.time1.length !== 0) {
                        this.condition.devDatetime = [this.formatDate(this.time1[0]), this.formatDate(this.time1[1])]
                    } else {
                        this.condition.devDatetime = []
                    }
                    if (this.time2 !== null && this.time2.length !== 0) {
                        this.condition.updateTime = [this.formatDate(this.time2[0]), this.formatDate(this.time2[1])]
                    } else {
                        this.condition.updateTime = []
                    }
                    this.getData()
                } else if (this.activeName === '图片信息') {
                    if (this.time1 !== null && this.time1.length !== 0) {
                        this.picture.devDatetime = [this.formatDate(this.time1[0]), this.formatDate(this.time1[1])]
                    } else {
                        this.picture.devDatetime = []
                    }
                    this.getPic()
                } else {
                    if (this.time1 !== null && this.time1.length !== 0) {
                        this.condition2.createDate = [this.formatDate(this.time1[0]), this.formatDate(this.time1[1])]
                    } else {
                        this.condition2.createDate = []
                    }
                    if (this.time2 !== null && this.time2.length !== 0) {
                        this.condition2.updateDate = [this.formatDate(this.time2[0]), this.formatDate(this.time2[1])]
                    } else {
                        this.condition2.updateDate = []
                    }
                    this.getReverse()
                }
            },
            //平台信息表头input框
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
                                        value: '',
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            // this.condition2.subCate = value
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
                                        value: '',
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            // this.condition2.subCate = value
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
                                    value: this.platData.storeName,
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                         this.platData.storeName=value
                                        this.$emit('input', value)
                                    },
                                    change: searchValue => {
//                                        this.filter()
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
                    let filters = [{ text: '1', value: '是' }, { text: '0', value: '否' }]
                    return h(
                            'el-select',
                            {
                                props: {
                                    placeholder: '请选择',
                                    value: '',
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        // this.condition2.stockUp=value
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
                                    value: '',
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        // this.condition2.stockUp=value
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
                                    value: '',
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        // this.condition2.stockUp=value
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
                                        value: '',
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            // this.condition2.subCate = value
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
                                    value: this.platData.cate,
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        this.platData.cate=value
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
                                        value: '',
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            // this.condition2.subCate = value
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
                                        value: '',
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            // this.condition2.subCate = value
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
                                        value: '',
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            // this.condition2.subCate = value
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
                                        value: '',
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            // this.condition2.subCate = value
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
                                        value: '',
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            // this.condition2.subCate = value
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
                                        value: '',
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            // this.condition2.subCate = value
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
                    let filters = [{ text: '1', value: '是' }, { text: '0', value: '否' }]
                    return h(
                            'el-select',
                            {
                                props: {
                                    placeholder: '请选择',
                                    value: '',
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        // this.condition2.stockUp=value
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
                                        value: '',
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            // this.condition2.subCate = value
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
                                            // this.condition2.subCate = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 17) {
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
                                            // this.condition2.subCate = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.filter()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 18) {
                    let filters = [{ text: '1', value: '是' }, { text: '0', value: '否' }]
                    return h(
                            'el-select',
                            {
                                props: {
                                    placeholder: '请选择',
                                    value: '',
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        // this.condition2.stockUp=value
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
                                    value: '',
                                    size: 'mini',
                                    clearable: true
                                },
                                on: {
                                    input: value => {
                                        // this.condition2.stockUp=value
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
                                        value: '',
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            // this.condition2.subCate = value
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
            this.getPlat()
            //仓库
            getAttributeInfoStoreName().then(response => {
                this.repertory =  response.data.data
            })
            getAttributeInfoCat().then(response => {
                this.mainCategory =  response.data.data
            })
            getPlatGoodsStatus().then(response => {
                this.goodsState =  response.data.data
            })
            getPlatCompletedPlat().then(response => {
                this.perfectPlatform =  response.data.data
            })
        }
    }
</script>

<style lang="scss" scoped>
</style>
