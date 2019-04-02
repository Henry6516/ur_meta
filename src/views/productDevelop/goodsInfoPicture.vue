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
        <div>
            <!-- 图片信息列表 -->
            <el-table :data="pictureData"
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
                               style="color: #409EFF;cursor:pointer;"></i>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="picUrl"
                                 fixed
                                 label="商品图片"
                                 header-align="center">
                    <template slot-scope="scope">
                        <img :src='scope.row.picUrl'
                             style="width: 60px;height: 50px">
                    </template>
                </el-table-column>
                <el-table-column label="商品编码"
                                 header-align="center">
                    <el-table-column prop="goodsCode"
                                     :render-header="renderHeaderPic"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="是否备货"
                                 header-align="center">
                    <el-table-column prop="stockUp"
                                     :render-header="renderHeaderPic"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="商品名称"
                                 header-align="center">
                    <el-table-column prop="goodsName"
                                     :render-header="renderHeaderPic"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="供应商链接1"
                                 header-align="center">
                    <el-table-column prop="vendor1"
                                     :render-header="renderHeaderPic"
                                     width='170'
                                     align="center">
                        <template slot-scope="scope">
                            <a :href="scope.row.vendor1" target="_blank">{{scope.row.vendor1 | cutOut }}</a>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="供应商链接2"
                                 header-align="center">
                    <el-table-column prop="oaGoods.vendor2"
                                     :render-header="renderHeaderPic"
                                     width='170'
                                     align="center">
                        <template slot-scope="scope">
                            <a :href="scope.row.vendor2" target="_blank">{{scope.row.vendor2 | cutOut }}</a>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="供应商链接3"
                                 header-align="center">
                    <el-table-column prop="oaGoods.vendor3"
                                     :render-header="renderHeaderPic"
                                     width='170'
                                     align="center">
                        <template slot-scope="scope">
                            <a :href="scope.row.vendor3" target="_blank">{{scope.row.vendor3 | cutOut }}</a>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="平台链接1"
                                 header-align="center">
                    <el-table-column prop="oaGoods.origin1"
                                     :render-header="renderHeaderPic"
                                     width='170'
                                     align="center">
                        <template slot-scope="scope">
                            <a :href="scope.row.origin1" target="_blank">{{scope.row.origin1 | cutOut }}</a>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="平台链接2"
                                 header-align="center">
                    <el-table-column prop="oaGoods.origin2"
                                     :render-header="renderHeaderPic"
                                     width='170'
                                     align="center">
                        <template slot-scope="scope">
                            <a :href="scope.row.origin2" target="_blank">{{scope.row.origin2 | cutOut }}</a>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="平台链接3"
                                 header-align="center">
                    <el-table-column prop="oaGoods.origin3"
                                     :render-header="renderHeaderPic"
                                     width='170'
                                     align="center">
                        <template slot-scope="scope">
                            <a :href="scope.row.origin3" target="_blank">{{scope.row.origin3 | cutOut }}</a>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="图片状态"
                                 header-align="center">
                    <el-table-column prop="picStatus"
                                     :render-header="renderHeaderPic"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="开发员"
                                 header-align="center">
                    <el-table-column prop="developer"
                                     :render-header="renderHeaderPic"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="开发时间"
                                 header-align="center">
                    <el-table-column prop="devDatetime"
                                     :render-header="renderHeaderPic"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="美工"
                                 header-align="center">
                    <el-table-column prop="possessMan1"
                                     :render-header="renderHeaderPic"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="是否多属性"
                                 header-align="center">
                    <el-table-column prop="isVar"
                                     :render-header="renderHeaderPic"
                                     width='150'
                                     align="center">
                    </el-table-column>
                </el-table-column>
            </el-table>
            <!-- 图片信息查看对话框 -->
            <el-dialog title='查看'
                       :visible.sync="dialogPicture">
                <el-form
                         label-position="left"
                         label-width="110px"
                         ref="picForm">
                    <el-form-item label="图片"
                                  prop="goodsInfo.picUrl"
                                  class="item1">
                        <img :src='goodsInfo.picUrl'
                             style="width: 150px;height: 100px;">
                    </el-form-item>
                    <el-form-item label="图片地址"
                                  prop="picUrl"
                                  class="item">
                        <span>{{goodsInfo.picUrl}}</span>
                    </el-form-item>
                    <el-form-item label="商品名称"
                                  prop="GoodsName"
                                  class="item">
                        <span>{{goodsInfo.goodsName}}</span></el-form-item>
                    <el-form-item label="商品编码"
                                  prop="GoodsCode"
                                  class="item">
                        <span>{{goodsInfo.goodsCode}}</span>
                    </el-form-item>
                    <el-form-item label="是否备货"
                                  prop="stockUp"
                                  class="item">
                        <span>{{goodsInfo.stockUp === 1 ? '是' : '否'}}</span>
                    </el-form-item>
                    <el-form-item label="供应商名称"
                                  prop="supplierName"
                                  class="item"><span>{{goodsInfo.supplierName}}</span></el-form-item>
                    <el-form-item label="中文申报名"
                                  prop="aliasCnName"
                                  class="item"><span>{{goodsInfo.aliasCnName}}</span></el-form-item>
                    <el-form-item label="英文申报名"
                                  prop="aliasEnName"
                                  class="item"><span>{{goodsInfo.aliasEnName}}</span></el-form-item>
                    <el-form-item label="规格"
                                  prop=""
                                  class="item"><span>{{goodsInfo.packName}}</span></el-form-item>
                    <el-form-item label="季节"
                                  prop="season"
                                  class="item"><span>{{goodsInfo.season}}</span></el-form-item>
                    <el-form-item label="仓库"
                                  prop="storeName"
                                  class="item"><span>{{goodsInfo.storeName}}</span></el-form-item>
                    <el-form-item label="是否液体"
                                  prop="isLiquid"
                                  class="item"><span>{{goodsInfo.isLiquid}}</span></el-form-item>
                    <el-form-item label="是否粉末"
                                  prop="isPowder"
                                  class="item"><span>{{goodsInfo.isPowder}}</span></el-form-item>
                    <el-form-item label="是否带磁"
                                  prop="isMagnetism"
                                  class="item"><span>{{goodsInfo.isMagnetism}}</span></el-form-item>
                    <el-form-item label="是否带电"
                                  prop="isCharged"
                                  class="item"><span>{{goodsInfo.isCharged}}</span></el-form-item>
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
    import {
            APIGoodsInfo,
            APIPictureList,
            APIPlatList,
            APIAttribute,
            APIAttributeInfo,
            APIFinishAttribute,
            APIGenerateCode,
            APIPictureInfo,
            APIPlat,
            APIPicturePreview
    } from '../../api/product'
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
                activeName: '图片信息',
                sels: [],
                time1: '',
                time2: '',
                allMenu: [],
                goodsInfo:[],
                oaGoods:[],
                tableData: [

                ],
                pictureData: [],
                platData: [],
                show: {
                    status: true,
                    picture: false,
                    plat: false
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
                picForm: [

                ],
                picId:{
                    id: null
                },
                platForm: {},
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
            handleClick(tab, event) {
                if (tab.label === '属性信息') {
                    this.$router.push({
                        path: `/v1/oa-goodsinfo/index`
                    })
                }
                if (tab.label === '图片信息') {
                } else {

                }
                if (tab.label === '平台信息') {
                    this.$router.push({
                        path: `/v1/oa-goodsinfo/goodsInfoPlatform`
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
                this.sels = sels
            },
            //图片信息分页
            handleSizeChangePic(val) {
                this.picture.pageSize = val
                this.getPic()
            },
            handleCurrentChangePic(val) {
                this.picture.page = val
                this.getPic()
            },
            //图片信息查看
            viewPic(index, row) {
                this.dialogPicture = true
                 this.picId.id = row.id
                APIPicturePreview(this.picId).then(res => {
                   this.goodsInfo = res.data.data
                 })
            },
            picEdit(index, row) {
                sessionStorage.setItem('judge', "图片信息")
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
                } else if ($index === 2) {
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
                                        value: this.picture.oaGoods.vendor1,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.picture.oaGoods.vendor1 = value
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
                                        value: this.picture.oaGoods.vendor2,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.picture.oaGoods.vendor2 = value
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
                                        value: this.picture.oaGoods.vendor3,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.picture.oaGoods.vendor3 = value
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
                                        value: this.picture.oaGoods.origin1,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.picture.oaGoods.origin1 = value
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
                                        value: this.picture.oaGoods.origin2,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.picture.oaGoods.origin2 = value
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
                                        value: this.picture.oaGoods.origin3,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.picture.oaGoods.origin3 = value
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
                } else if ($index === 11) {
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
                                        value: this.picture.possessman1,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.picture.possessman1 = value
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

            //平台信息分页
            handleSizeChangePlat(val) {
                this.plat.pageSize = val
                this.getPlat()
            },
            handleCurrentChangePlat(val) {
                this.plat.currentPage = val
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
                } else if ($index === 5) {
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
            this.getPic()
        }
    }
</script>

<style lang="scss" scoped>
</style>
