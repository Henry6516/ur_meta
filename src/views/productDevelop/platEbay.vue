<template>
    <section>
        <el-col :span="24"
                style="position: fixed; bottom:0; z-index:10;background: #f2f2f2;padding: 8px 0;border-top: #eee solid 1px;">
            <el-col :span="12"
                    :offset="5">
                <el-button @click="keep()"
                           type="primary" style="float: left;margin-right:10px">保存当前数据</el-button>
                <el-button style="margin-left: 0;float: left;margin-right:10px"
                           type="success" @click="keepWs()">保存并完善</el-button>
                <el-select v-model="depot"
                           placeholder="--所有仓储--" style="float: left;margin-right:10px">
                    <el-option v-for="(item, key) in warehouse" :key='item.key' :label="item" :value="item"></el-option>
                </el-select>
                <el-select placeholder="--所有账号--"
                           clearable
                           multiple
                           collapse-tags
                           v-model="accountNum"
                           @change="forbidSale1($event)"
                           style="width: 220px;float: left;" class="selee">
                    <el-button plain
                               type="info"
                               @click="selectalld1">全选</el-button>
                    <el-button plain
                               type="info"
                               @click="noselectd1">取消</el-button>
                    <el-option v-for="(item, key) in accountNumber" :key='item.key' :label="item" :value="item"></el-option>
                </el-select>
                <span class="exportAccount" @click="exportEbay">导出所选账号</span>
                <!--<el-button type="danger">导出所选账号</el-button>-->
            </el-col>
        </el-col>
        <el-col :span="24"
                style="padding: 0;margin-left: 15px">
            <h3 class="toolbar essential">基本信息</h3>
        </el-col>
        <el-form :model="wishForm"
                 :inline="true"
                 label-width="80px"
                 ref="wishForm"
                 style="margin-left: 15px">
            <el-row>
                <el-row>
                    <el-col :span="24">
                        <el-col :span="12">
                            <el-col :span="2"
                                    class="textZt">
                                SKU
                            </el-col>
                            <el-col :span="21">
                                <el-input v-model="wishForm.sku">

                                </el-input>
                            </el-col>
                            <el-col :span="2"
                                    class="textZt"
                                    style="margin-top: 15px">
                                是否备货
                            </el-col>
                            <el-col :span="21"
                                    style="margin-top: 15px">
                                <el-input v-model="wishForm.stockUp"
                                          :disabled="true">

                                </el-input>
                            </el-col>
                            <el-col :span="2"
                                    class="textZt"
                                    style="margin-top: 15px">
                                主图
                            </el-col>
                            <el-col :span="21"
                                    style="margin-top: 15px">
                                <el-input v-model="wishForm.mainPage">

                                </el-input>
                            </el-col>
                            <el-col :span="2"
                                    class="textZt"
                                    style="margin-top: 15px">
                            </el-col>
                        </el-col>
                        <el-col :span="10"
                                style="margin-left: 25px">
                            <a :href="wishForm.mainPage"
                               target="_blank" style="display: block; width: 155px;height: 155px" >
                                <img :src="wishForm.mainPage"
                                     style="display: block; width: 155px;height: 155px" />
                            </a>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col style="margin-bottom: 5px;margin-top: 5px" :span="24">
                        <span  @click="sIs()" style="padding: 10px 20px;background: #409EFF;color: #fff;cursor: pointer;display: block;width: 70px;padding-left:10px;text-align: center;margin-left: 15px"><i :class="[shoIS1?'el-icon-minus':'el-icon-plus']" style="margin-right: 5px"></i>附加图</span>
                    </el-col>
                </el-row>
                <el-row style="margin-left: 15px">
                    <el-col :span="12"
                            style="margin-top: 15px;margin-bottom: 2px"
                            v-for="(item,index) in wishForm.extraPage"
                            :key="index" v-show="shoIS1">
                        <el-col :span="19">
                            <el-col :span="24">
                                <el-input v-model="wishForm.extraPage[index]"
                                          @input="revise($event,index)">

                                </el-input>
                            </el-col>
                            <el-col>
                                <p class="sx"
                                   @click="botIndex(index)">
                                    <i class="el-icon-arrow-down"></i>下移动
                                </p>
                                <p class="sx"
                                   @click="topIndex(index)">
                                    <i class="el-icon-arrow-up"></i>上移动
                                </p>
                                <p class="sx"
                                   @click="delDz(index)">
                                    <i class="el-icon-delete"></i>删除
                                </p>
                                <p class="sx"
                                   @click="dialogFormVisible1 = true">
                                    <i class="el-icon-plus"></i>增加
                                </p>
                                <p class="ss">
                                    #{{index+1}}
                                </p>
                            </el-col>
                        </el-col>
                        <el-col :span="3"
                                style="margin-left: 15px">
                            <a :href="wishForm.extraPage[index]"
                               target="_blank">
                                <img :src="wishForm.extraPage[index]"
                                     style="display: block;width: 90px;height: 90px" />
                            </a>
                        </el-col>
                    </el-col>
                    <!--<el-col :span="24" v-for="(item,index) in wishForm.extraPage">-->
                    <!--<el-col :span="8" style="margin-left: 15px;margin-top: 10px">-->
                    <!--<el-input :value="item">-->

                    <!--</el-input>-->
                    <!--</el-col>-->
                    <!--<el-col :span="0.5" class="ss">-->
                    <!--#{{index}}-->
                    <!--</el-col>-->
                    <!--<el-col :span="1" class="sx">-->
                    <!--增加-->
                    <!--</el-col>-->
                    <!--<el-col :span="1" class="sx">-->
                    <!--删除-->
                    <!--</el-col>-->
                    <!--<el-col :span="1" class="sx">-->
                    <!--上移动-->
                    <!--</el-col>-->
                    <!--<el-col :span="1" class="sx">-->
                    <!--下移动-->
                    <!--</el-col>-->
                    <!--<el-col :span="1">-->
                    <!--<img :src="item"-->
                    <!--style="display: block;margin-left: 20px;width: 60px;height: 60px" />-->
                    <!--</el-col>-->
                    <!--</el-col>-->
                </el-row>
                <el-col :span="6"
                        style="margin-top: 20px;padding-left: 20px">
                    <h3 class="spsz">
                        国家
                    </h3>
                    <el-input size="small"
                              style="width:245px; margin-top: 4px"
                              v-model="wishForm.country"></el-input>
                </el-col>
                <el-col :span="6"
                        style="margin-top: 20px">
                    <h3 class="spsz">
                        商品所在地
                    </h3>
                    <el-input size="small"
                              style="width:245px; margin-top: 4px"
                              v-model="wishForm.location"></el-input>
                </el-col>
                <el-col :span="6"
                        style="margin-top: 20px">
                    <h3 class="spsz">
                        邮编
                    </h3>
                    <el-input size="small"
                              style="width:245px; margin-top: 4px"
                              v-model="wishForm.postCode"></el-input>
                </el-col>
                <el-col :span="6"
                        style="margin-top: 20px">
                    <h3 class="spsz">
                        备货天数
                    </h3>
                    <el-input size="small"
                              style="width:245px; margin-top: 4px"
                              v-model="wishForm.prepareDay"></el-input>
                </el-col>
            </el-row>
            <el-col :span="24"
                    style="padding: 0">
                <el-col :span="24">
                    <h3 class="toolbar essential">站点组</h3>
                    <el-form-item label="站点"
                                  style="margin-bottom: 5px;margin-top: 5px">
                        <el-select size="small"
                        v-model="wishForm.site"
                                   @change="siteEbay($event)"
                        style="width:245px;">
                            <el-option v-for="(item, key) in ebaySite" :key='item.key' :label="item.siteName" :value="item.siteName"></el-option>
                        </el-select>
                        <!--<el-input size="small"-->
                                  <!--style="width:245px;"-->
                                  <!--v-model="wishForm.site"-->
                                  <!--:disabled="true"></el-input>-->
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <h3 class="toolbar essential">多属性</h3>
                    <el-button type="primary"
                               style="margin: 10px 0;margin-left: 17px"
                               @click="outerVisible = true">设置多属性</el-button>
                </el-col>
            </el-col>
            <!--<el-col :span="24" style="padding: 0">-->
            <!--<h3 class="toolbar essential">多属性</h3>-->
            <!--</el-col>-->
            <!--<el-col :span="24" style="padding: 0">-->
            <!--<el-button type="primary" style="margin: 10px 0" @click="outerVisible = true">设置多属性</el-button>-->
            <!--</el-col>-->
            <el-col :span="24"
                    style="padding: 0">
                <h3 class="toolbar essential">主信息</h3>
            </el-col>
            <el-col :span="6">
                <el-form-item label="刊登分类">
                    <el-input size="small"
                              style="width:245px;"
                              v-model="wishForm.listedCate"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="刊登分类2">
                    <el-input size="small"
                              style="width:245px;"
                              v-model="wishForm.listedSubcate"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="标题">
                    <el-input size="small"
                              style="width:245px;"
                              v-model="wishForm.title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="子标题">
                    <el-input size="small"
                              style="width:245px;"
                              v-model="wishForm.subTitle"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-col :span="24">
                     <span style="text-align: center;float: left;margin-left: 15px;margin-right: 13px">
                        最前关键词
                      </span>
                     <span>
                      <span style="color: red">{{foremost1}}</span>个字符
                    </span>
                     <span style="margin-left: 10px">
                      <font style="color: red">说明：</font>性别定位/多个一卖等。如Women/Men/Girl/Baby/Kids/1PC/2PC/5PC/4 Colors/5Pcs Set…
                    </span>
                </el-col>
                <el-col :span="22" style="margin-left: 100px;margin-top: 10px">
                    <el-input
                              v-model="wishForm.headKeywords"
                              style="width:100%"
                              placeholder="--一个关键词--"
                              @input="top1($event)"
                    ></el-input>
                </el-col>
            </el-col>
            <el-col :span="24">
                <el-col :span="24" style="margin-top: 4px">
                     <span style="text-align: center;margin-left: 15px;margin-right: 13px">
                    必选关键词
                   </span>
                      <span>
                          <span style="color: red">{{bxlength}}</span>个关键词<span style="color: red;margin-left: 10px">{{bxtotal}}</span>个字符
                        </span>
                        <span>
                          <font style="color: red;margin-left: 10px">说明：</font>物品名/材质/特征等。如T-Shirt(物品名)/V-neck(特征)/Cotton(材质)
                        </span>
                    <el-button type="text" @click="dialogTableVisible = true">批量设置</el-button>
                </el-col>
                <el-col :span="23">
                    <div style="margin-left: 70px;">
                        必填
                        <el-input
                                  style="width:32%" v-model="mandatoryData[0]" @blur="mandatory()"></el-input>
                        <el-input
                                  style="width:32%" v-model="mandatoryData[1]" @blur="mandatory()"></el-input>
                        <el-input
                                  style="width:32%" v-model="mandatoryData[2]" @blur="mandatory()"></el-input>
                    </div>
                    <div style="margin-left: 70px;margin-top: 5px">
                        选填
                        <el-input
                                  style="width:32%" v-model="mandatoryData[3]" @blur="mandatory()"></el-input>
                        <el-input
                                  style="width:32%" v-model="mandatoryData[4]" @blur="mandatory()"></el-input>
                        <el-input
                                  style="width:32%" v-model="mandatoryData[5]" @blur="mandatory()"></el-input>

                    </div>
                </el-col>
            </el-col>
            <el-col :span="24">
                <el-col :span="24" style="margin-top: 4px">
                     <span style="text-align: center;margin-left: 15px;margin-right: 13px">
                    随机关键词
                   </span>
                      <span>
              <span style="color: red">{{sjlength}}</span>个关键词<span style="color: red;margin-left: 10px">{{sjtotal}}</span>个字符
            </span>
            <span>
              <font style="color: red;margin-left: 10px">说明：</font>形容词/品类热词等。如Fashion/Elegant/Hot/DIY/Casual…
            </span>
                    <el-button type="text" @click="dialogTable = true">批量设置</el-button>
                </el-col>
                <el-col :span="23">
                    <div style="margin-left: 70px">
                        必填
                        <el-input
                                  style="width:19.1%" v-model="randomData[0]" @blur="random()"></el-input>
                        <el-input
                                  style="width:19.1%" v-model="randomData[1]" @blur="random()"></el-input>
                        <el-input
                                  style="width:19.1%" v-model="randomData[2]" @blur="random()"></el-input>
                        <el-input
                                  style="width:19.1%" v-model="randomData[3]" @blur="random()"></el-input>
                        <el-input
                                  style="width:19.3%" v-model="randomData[4]" @blur="random()"></el-input>
                    </div>
                    <div style="margin-left: 70px;margin-top: 5px">
                        选填
                        <el-input
                                  style="width:19.1%" v-model="randomData[5]" @blur="random()"></el-input>
                        <el-input
                                  style="width:19.1%" v-model="randomData[6]" @blur="random()"></el-input>
                        <el-input
                                  style="width:19.1%" v-model="randomData[7]" @blur="random()"></el-input>
                        <el-input
                                  style="width:19.1%" v-model="randomData[8]" @blur="random()"></el-input>
                        <el-input
                                  style="width:19.3%" v-model="randomData[9]" @blur="random()"></el-input>

                    </div>
                </el-col>
            </el-col>
            <el-col :span="24">
                <el-col :span="24" style="margin-top: 10px">
                     <span style="text-align: center;float: left;margin-left: 15px;margin-right: 13px">
                    最后关键词
                  </span>
                     <span>
              <span style="color: red">{{last}}</span>个字符
            </span>
            <span>
              <font style="color: red">说明：</font>附加说明词。如Randomly/S-3XL/2ml/(Color: Nude)/Big Size…
            </span>
                </el-col>
                <el-col :span="22" style="margin-left: 100px;margin-top: 10px;margin-bottom: 20px">
                    <el-input
                              v-model="wishForm.tailKeywords"
                              style="width: 100%"
                              placeholder="--最多一个关键词--"
                              @input="bottm1($event)"
                    ></el-input>
                </el-col>
            </el-col>
            <el-col :span="24">
                 <span  style="text-align: right;margin-top: 8px;float: left;padding-left: 40px">
                    *描述
                  </span>
                <el-col :span="22">
                    <el-input size="small"
                              v-model="wishForm.description"
                              type="textarea"
                              style="width:100%;margin-left: 27px"></el-input>
                </el-col>
            </el-col>
            <el-col :span="24" style="margin-top: 20px">
                <el-col :span="8">
                    <el-col :span="4" style="text-align: right;margin-top: 13px;padding-right: 10px">
                        数量
                    </el-col>
                    <el-col :span="20">
                        <el-input
                                  style="width:100%;"
                                  v-model="wishForm.quantity"></el-input>
                    </el-col>
                </el-col>
                <el-col :span="8">
                    <el-col :span="4" style="text-align: right;margin-top: 13px;padding-right: 10px">
                        UPC
                    </el-col>
                    <el-col :span="20">
                        <el-input
                                  style="width:100%;"
                                  v-model="wishForm.UPC"></el-input>
                    </el-col>
                </el-col>
                <el-col :span="8">
                    <el-col :span="4" style="text-align: right;margin-top: 13px;padding-right: 10px">
                        EAN
                    </el-col>
                    <el-col :span="19">
                        <el-input
                                  style="width:100%;"
                                  v-model="wishForm.EAN"></el-input>
                    </el-col>
                </el-col>
                <!--<el-form-item label="数量">-->
                <!--</el-form-item>-->
                <!--<el-form-item label="UPC">-->
                    <!--<el-input size="small"-->
                              <!--style="width:430px;"-->
                              <!--v-model="wishForm.UPC"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="EAN">-->
                    <!--<el-input size="small"-->
                              <!--style="width:430px;"-->
                              <!--v-model="wishForm.EAN"></el-input>-->
                <!--</el-form-item>-->
            </el-col>
            <el-col :span="24"
                    style="padding: 0">
                <h3 class="toolbar essential">物品属性</h3>
            </el-col>
            <!--<el-table :data="tableData"-->
            <!--style="width:100%;">-->
            <!--<el-table-column label="属性名称"-->
            <!--prop="">-->
            <!--<template slot-scope="scope">-->
            <!--<el-input size="small"-->
            <!--v-model="scope.row.Brand"></el-input>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="属性内容"-->
            <!--prop="Brand">-->
            <!--<template slot-scope="scope">-->
            <!--<el-input size="small"-->
            <!--v-model="scope.row.Brand"></el-input>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column>-->
            <!--<template slot-scope="scope">-->
            <!--<el-button size="small"-->
            <!--@click="del(scope.$index, scope.row)">删除</el-button>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--</el-table>-->
            <el-col :span="24">
                <el-col :span="7"
                        style="margin-left: 20px">
                    属性名称
                </el-col>
                <el-col :span="7"
                        style="margin-left: 15px">
                    属性内容
                </el-col>
                <el-col :span="24"
                        style="margin-top: 8px"
                        v-for="(item,index) in tableData"
                        :key="index">
                    <el-col :span="24"
                            style="margin-top: 10px"
                            v-for="(log,key) in item"
                            :key="key">
                        <el-col :span="7"
                                style="margin-left: 20px">
                            <el-input :value="key"  @input ="inputFunc($event,index)"></el-input>
                        </el-col>
                        <el-col :span="7"
                                style="margin-left: 15px">
                            <el-input :value="log"  @input ="inputFunc1($event,index)"></el-input>
                        </el-col>
                        <el-col :span="7"
                                style="margin-left: 15px">
                            <el-button @click="delSx(index)"
                                       type="danger"
                                       plain>删除</el-button>
                        </el-col>
                    </el-col>
                </el-col>
            </el-col>
            <el-col :span="24"
                    style="margin-top: 18px;margin-bottom: 5px">
                <el-button type="primary"
                           @click="dialogFormVisible = true"
                           style="margin-left: 20px">增加属性</el-button>
            </el-col>
            <el-col :span="24"
                    style="padding: 0">
                <h3 class="toolbar essential">物流设置</h3>
            </el-col>
            <el-col :span="12"
                    style="margin-bottom: 30px;">
                <h4 class="adres">境内运输方式</h4>
                <el-col :span="12">
                    <el-col :span="5" style="margin-top: 10px;text-align: center">
                        运输方式1
                    </el-col>
                    <el-col :span="19">
                        <el-select style="width: 95%"
                                   v-model="wishForm.inShippingMethod1"
                                   placeholder="--境内物流选择--">
                            <el-option v-for="(item, key) in ebayInFir" :key='item.key' :label="item.servicesName" :value="item.servicesName"></el-option>
                        </el-select>
                    </el-col>
                </el-col>
                <el-col :span="12">
                    <el-col :span="5" style="margin-top: 10px;text-align: center">
                        首件运费
                    </el-col>
                    <el-col :span="19">
                        <el-input
                                  placeholder="--USD--"
                                  style="width: 95%"
                                  v-model="wishForm.inFirstCost1"></el-input>
                    </el-col>
                </el-col>
                <el-col :span="12" style="margin-top: 15px">
                    <el-col :span="5" style="margin-top: 10px;text-align: center">
                        续件运费
                    </el-col>
                    <el-col :span="19">
                        <el-input
                                  placeholder="--USD--"
                                  style="width: 95%"
                                  v-model="wishForm.inSuccessorCost1"></el-input>
                    </el-col>
                </el-col>
                <el-col :span="12" style="margin-top: 15px">
                    <el-col :span="5" style="margin-top: 10px;text-align: center">
                        运输方式2
                    </el-col>
                    <el-col :span="19">
                        <el-select style="width: 95%"
                                   v-model="wishForm.inShippingMethod2"
                                   placeholder="--境内物流选择--">
                            <el-option v-for="(item, key) in ebayInSec" :key='item.key' :label="item.servicesName" :value="item.servicesName"></el-option>
                        </el-select>
                    </el-col>
                </el-col>
                <el-col :span="12" style="margin-top: 15px">
                    <el-col :span="5" style="margin-top: 10px;text-align: center">
                        首件运费
                    </el-col>
                    <el-col :span="19">
                        <el-input
                                  placeholder="--USD--"
                                  style="width: 95%"
                                  v-model="wishForm.inFirstCost2"></el-input>
                    </el-col>
                </el-col>
                <el-col :span="12" style="margin-top: 15px">
                    <el-col :span="5" style="margin-top: 10px;text-align: center">
                        续件运费
                    </el-col>
                    <el-col :span="19">
                        <el-input
                                  placeholder="--USD--"
                                  style="width: 95%"
                                  v-model="wishForm.inSuccessorCost2"></el-input>
                    </el-col>
                </el-col>
            </el-col>
            <el-col :span="12">
                <h4 class="adres">境外运输方式</h4>
                <el-col :span="12">
                    <el-col :span="5" style="margin-top: 10px;text-align: center">
                        运输方式1
                    </el-col>
                    <el-col :span="19">
                        <el-select style="width: 95%"
                                   v-model="wishForm.outShippingMethod1"
                                   placeholder="--境外物流选择--">
                            <el-option v-for="(item, key) in ebayOutFir" :key='item.key' :label="item.servicesName" :value="item.servicesName"></el-option>
                        </el-select>
                    </el-col>
                </el-col>
                <el-col :span="12">
                    <el-col :span="5" style="margin-top: 10px;text-align: center">
                        首件运费
                    </el-col>
                    <el-col :span="19">
                        <el-input
                                  placeholder="--USD--"
                                  style="width: 95%"
                                  v-model="wishForm.outFirstCost1"></el-input>
                    </el-col>
                </el-col>
                <el-col :span="12" style="margin-top: 15px">
                    <el-col :span="5" style="margin-top: 10px;text-align: center">
                        续件运费
                    </el-col>
                    <el-col :span="19">
                        <el-input
                                placeholder="--USD--"
                                style="width: 95%"
                                v-model="wishForm.outSuccessorCost1"></el-input>
                    </el-col>
                </el-col>
                <el-col :span="12" style="margin-top: 15px">
                    <el-col :span="5" style="margin-top: 10px;text-align: center">
                        运输方式2
                    </el-col>
                    <el-col :span="19">
                        <el-select style="width: 95%"
                                   v-model="wishForm.outShippingMethod2"
                                   placeholder="--境外物流选择--">
                            <!--<el-option v-for="(item, key) in ebayOutFir" :key='item.key' :label="item.servicesName" :value="item.servicesName"></el-option>-->
                        </el-select>
                    </el-col>
                </el-col>
                <el-col :span="12" style="margin-top: 15px">
                    <el-col :span="5" style="margin-top: 10px;text-align: center">
                        首件运费
                    </el-col>
                    <el-col :span="19">
                        <el-input
                                placeholder="--USD--"
                                style="width: 95%"
                                v-model="wishForm.outFirstCost2"></el-input>
                    </el-col>
                </el-col>
                <el-col :span="12" style="margin-top: 15px">
                    <el-col :span="5" style="margin-top: 10px;text-align: center">
                        续件运费
                    </el-col>
                    <el-col :span="19">
                        <el-input
                                placeholder="--USD--"
                                style="width: 95%"
                                v-model="wishForm.outSuccessorCost2"></el-input>
                    </el-col>
                </el-col>
            </el-col>
            <el-dialog title="批量增加必选关键词"
                       :visible.sync="dialogTableVisible">
                <el-input size="small"
                          type="textarea"
                          :rows="20"
                          placeholder="-多个必选关键词-"
                          @change="mandatoryDate($event)"
                ></el-input>
            </el-dialog>
            <el-dialog title="批量增加随机关键词"
                       :visible.sync="dialogTable">
                <el-input size="small"
                          type="textarea"
                          :rows="20"
                          placeholder="-多个随机关键词-"
                          @change="mandatoryDate1($event)"></el-input>
            </el-dialog>
            <el-dialog title="多属性设置"
                       :visible.sync="outerVisible"
                       style="padding: 0"
                       width="90%">
                <el-row>
                    <el-col :span="24">
                        <el-col :span="18">
                            多属性设置
                        </el-col>
                        <el-col :span="6"
                                style="text-align: right">
                            <!-- 第1-12条共12条数据 -->
                            <el-button @click="innerVisible = true"
                                       type="text">+增加属性</el-button>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <table id="oTable"
                               border="1px solid #ebeef5"
                               cellpadding="9"
                               style="border: 1px solid #ebeef5;background-color:#fff;color:#606266;width:52%;border-collapse:collapse;float: left;">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>
                                    <el-checkbox></el-checkbox>
                                </th>
                                <th style="line-height: 40px;height: 40px;padding: 9px 0">操作</th>
                                <th style="line-height: 40px;height: 40px;padding: 0">SKU</th>
                                <th style="line-height: 40px;height: 40px;padding: 0">数量</th>
                                <th style="line-height: 40px;height: 40px;padding: 0">价格</th>
                                <th style="line-height: 40px;height: 40px;padding: 0">图片地址</th>
                                <th style="line-height: 40px;height: 40px;padding: 0">图片</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, index) in tabDate"
                                :key="index"
                                style="text-align:center;">
                                <td>{{index+1}}</td>
                                <td>
                                    <el-checkbox></el-checkbox>
                                </td>
                                <td><i class="el-icon-delete" @click="delIndex(index,item.id)"></i></td>
                                <td>
                                    <el-input v-model="item.sku"></el-input>
                                </td>
                                <td>
                                    <el-input v-model="item.quantity"></el-input>
                                </td>
                                <td>
                                    <el-input v-model="item.retailPrice"></el-input>
                                </td>
                                <td>
                                    <el-input v-model="item.imageUrl"></el-input>
                                </td>
                                <td><img :src="item.imageUrl"
                                         style="width:50px;height:50px;"></td>
                            </tr>
                            </tbody>
                        </table>
                        <table id=""
                               border="1px solid #ebeef5"
                               cellpadding="9"
                               style="border: 1px solid #ebeef5;background-color:#fff;color:#606266;width:48%;border-collapse:collapse;float: left;">
                            <thead>
                            <tr>
                                <th v-for="(item,index) in tite"
                                    :key="index" style="position: relative;line-height: 40px">
                                    <el-input clearable
                                              v-model="tite[index]"></el-input>
                                    <i class="el-icon-delete"
                                       @click="titleDel(index)" style="position: absolute;right: 45px;top: 22px;z-index: 999;cursor: pointer"></i>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(log, index) in title"
                                :key="index"
                                style="text-align:center;">
                                <td  v-for="(item, index) in log.value"
                                     :key="index" style="line-height: 53px">
                                    <el-input v-model="log.value[index]"></el-input>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </el-col>
                </el-row>
               <el-row style="margin-top: 20px">
                    <el-row style="margin-top:15px;">
                        <el-col :span="2">
                            <input placeholder="行数" v-model="rows"
                                   style="width:72px;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center">
                            <span class="xzz" @click="addClomun">新增行</span>
                        </el-col>
                        <el-col :span="3">
                            <input placeholder="数量" v-model="num"
                                   style="width:120px;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center">
                            <span class="xzz1" @click="setNum">数量确定</span>
                        </el-col>
                        <el-col :span="3">
                            <input placeholder="零售价" v-model="price"
                                   style="width:120px;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center">
                            <span class="xzz1" @click="setPrice">价格确定</span>
                        </el-col>
                        <el-col :span="4">
                            <input placeholder="Does not apply" v-model="ship"
                                   style="width:120px;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center">
                            <span class="xzz1" @click="setShip">UPC/ENC确定</span>
                        </el-col>
                    </el-row>
                    <el-col :span="24"
                            style="margin-top: 20px;margin-bottom: 25px">
                        图片关联
                    </el-col>
                    <el-col :span="24">
                        <el-radio-group @change='radioBtn'
                                        v-model="radio">
                            <el-radio v-for="(item, index) in tite"
                                      :key="index"
                                      :label="tite[index]"
                                      :value="tite[index]"></el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <!-- <div slot="footer"
                     class="dialog-footer">
                    <el-button @click="keepData"
                               type="primary">保 存</el-button>
                    <el-button @click="outerVisible = false"
                               type="info">取 消</el-button>
                </div> -->
                <el-dialog width="30%"
                           title="添加属性"
                           :visible.sync="innerVisible"
                           append-to-body>
                    <el-input v-model="columns"
                              placeholder="属性名称"></el-input>
                    <div slot="footer"
                         class="dialog-footer">
                        <el-button @click="innerVisible = false"
                                   type="primary">取 消</el-button>
                        <el-button @click="addColumn"
                                   type="primary">确 定</el-button>
                    </div>
                </el-dialog>
            </el-dialog>
            <el-dialog title="增加属性"
                       :visible.sync="dialogFormVisible">
                <el-input placeholder="属性名称"
                          v-model="qualityId">

                </el-input>
                <el-input placeholder="属性内容"
                          style="margin-top: 15px"
                          v-model="qualityContent">

                </el-input>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary"
                               @click="addQuality">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="增加附加图"
                       :visible.sync="dialogFormVisible1">
                <el-input v-model="addPhoto">

                </el-input>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                    <el-button type="primary"
                               @click="addRess">确 定</el-button>
                </div>
            </el-dialog>
        </el-form>
    </section>
</template>
<script type="text/ecmascript-6">
    import { APIPlatInfo, APISaveWishInfo,APIPlatExportEbay,APIShippingEbay,APIFinishPlat,APIDeleteVariant,APIDeleteEbaySku } from '../../api/product'
    import { getPlatEbayAccount,getPlatEbayStore,getEbaySite } from '../../api/profit'
    import { APISaveEbayInfo} from '../../api/platebay'
    export default {
        data() {
            return {
                radio: '',
                columns: '',
                title: [],
                select: '',
                select1: '',
                depot:"",
                wishForm: {},
                mainForm: {},
                ebaySite:[],
                shoIS1:false,
                dialogTableVisible: false,
                dialogTable: false,
                outerVisible: false,
                innerVisible: false,
                dialogFormVisible: false,
                dialogFormVisible1: false,
                accountNum:"--所有账号",
                foremost1:0,
                bxtotal:0,
                sjtotal:0,
                bxlength:0,
                sjlength:0,
                tite:[],
                warehouse:[],
                rows:"",
                num:"",
                price:"",
                accountNumber:[],
                accountNumber1:[],
                ship:"",
                mandatoryData:["","","","","",""],
                randomData:["","","","","","","","","",""],
                last:0,
                tabDate: [],
                skuifo: [],
                qualityId: '',
                qualityContent: '',
                addPhoto: '',
                tabPosition: 'top',
                radio2: 3,
                activeName: 'first',
                tableData: [],
                unit1:"",
                ShippingInFir:{
                    pageSize:200,
                    type:'InFir',
                    site:''
                },
                ShippingSec:{
                    pageSize:200,
                    type:'InSec',
                    site:''
                },
                ShippingOutFir :{
                    pageSize:200,
                    type:'OutFir',
                    site:''
                },
                ebayInFir:[],
                ebayInSec:[],
                ebayOutFir:[],
                condition: {
                    id: 5,
                    id: 5,
                    plat: 'ebay'
                }
            }
        },
        methods: {
            keepWs(){
                const data = {
                    id: this.wishForm.infoId,
                    plat: []
                }
                data.plat = ['ebay']
                APIFinishPlat(data).then(res => {
                    if (res.data.code ==200) {
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        })
                    } else {
                        this.$message.error(res.data.message)
                    }
                })
            },
            siteEbay(e){
                this.wishForm.site=e
                this.OutFirebEbay()
                this.InFirEbay()
                this.InSecEbay()
            },
            exportEbay(){
                if(this.accountNum!=""){
                    let objStr={
                        id:this.wishForm.infoId,
                        account:this.accountNum
                    }
                    APIPlatExportEbay(objStr).then(res => {
                        const blob = new Blob([res.data], {
                            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
                        })
                        const downloadElement = document.createElement('a')
                        const objectUrl = window.URL.createObjectURL(blob)
                        downloadElement.href = objectUrl
                        const date = new Date()
                        const year = date.getFullYear()
                        let month = date.getMonth() + 1
                        let strDate = date.getDate()
                        let hour = date.getHours()
                        let minute = date.getMinutes()
                        let second = date.getSeconds()
                        if (month >= 1 && month <= 9) {
                            month = '0' + month
                        }
                        if (strDate >= 0 && strDate <= 9) {
                            strDate = '0' + strDate
                        }
                        if (hour >= 0 && hour <= 9) {
                            hour = '0' + hour
                        }
                        if (minute >= 0 && minute <= 9) {
                            minute = '0' + minute
                        }
                        if (second >= 0 && second <= 9) {
                            second = '0' + second
                        }
                        const filename =
                                'eBay_' + year + month + strDate + hour + minute + second
                        downloadElement.download = filename + '.xls'
                        document.body.appendChild(downloadElement)
                        downloadElement.click()
                        document.body.removeChild(downloadElement)
                    })
                }else {
                    this.$message.error('请选择账号')
                }
            },
            delIndex(index,row){
                console.log(row)
                let aryId={
                    id:row,
                    plat:'eBay'
                }
                APIDeleteEbaySku(aryId).then(res => {
                    if (res.data.code === 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.tabDate.splice(index, 1)
                        this.title.splice(index, 1)
                    } else {
                        this.$message.error('删除失败')
                    }
                })
            },
            forbidSale1(e){
                this.unit1=e.join(',')
            },
            selectalld1() {
                var ard1 = []
                for (const item in this.accountNumber) {
                    ard1.push(this.accountNumber[item])
                }
                this.accountNum = ard1
            },
            noselectd1() {
                this.accountNum = []
            },
            keepData(){
//                for(var i=0;i<this.tabDate.length;i++){
//                    var obj={}
//                    obj.columns={}
//                    obj.pictureKey=this.radio
//                    for(var k=0;k<this.title.length;k++){
//                        if(i==k){
//                            console.log(this.tite[k])
////                            obj.columns[name]= content
//                        }
//                        console.log(this.title[k].value)
//                    }
//                    console.log(JSON.parse(this.tabDate[i].property))
//                }
                for(var i=0;i<this.title.length;i++){
                    var obj={}
                    obj.columns=[]
                    obj.pictureKey=this.radio
                    for(var k=0;k<this.title[i].value.length;k++){
                        let strObj={}
                        strObj[this.tite[k]] = this.title[i].value[k]
                        obj.columns.push(strObj);
                    }
                    this.tabDate[i].property=obj
                }
            },
            addClomun(){
                for (let i = 0; i < this.rows; i++) {
                    var obj={}
                    obj.id="",
                    obj.itemId=null,
                    obj.sid="",
                    obj.infoId=this.wishForm.infoId,
                    obj.sku="",
                    obj.quantity="",
                    obj.retailPrice="",
                    obj.imageUrl="",
                    obj.property="",
                    this.tabDate.push(obj)
                    var lenth=0
                    if(this.title.length!=0){
                        for(var k=0;k<this.title.length;k++){
                            lenth=this.title[k].value.length
                        }
                    }else {
                        lenth=4
                    }
                    console.log(lenth)
                    var aryd={
                        label:[],
                        value:[]
                    }
                    for(var j=0;j<lenth;j++){
                        aryd.value.push(null)
                    }
                    this.title.push(aryd)
                    console.log(this.title)
                }
            },
            setNum(){
                if (this.num) {
                    for (let i = 0; i < this.tabDate.length; i++) {
                        this.tabDate[i].quantity = this.num
                    }
                } else {
                    return false
                }
            },
            setPrice(){
                if (this.price) {
                    for (let i = 0; i < this.tabDate.length; i++) {
                        this.tabDate[i].retailPrice = this.price
                    }
                } else {
                    return false
                }
            },
            setShip(){
                if (this.ship) {
                    var targetIndex=""
                    var tii=this.tite
                    for (var i = 0; i < tii.length; i++) {
                        if(tii[i]=="UPC"){
                            targetIndex=i
                        }
                    }
                    for(var j = 0; j < this.title.length; j++){
                        for(var k= 0; k <this.title[j].value.length; k++){
                            if(k==targetIndex){
                                this.title[j].value.splice(k,1,this.ship)
//                                this.title[j].value[k]=this.ship
//                                console.log(this.title[j].value[k])
                            }
                        }
                    }
                    this.title=this.title
                } else {
                    return false
                }
            },
            mandatoryDate(e){
                this.bxlength=0
                this.bxtotal=0
                var st1=0
                let arde=e.split(/[(\r\n)\r\n]+/)
                for(var i=0;i<arde.length;i++){
                    var daee=arde[i]
                    for(var j=0;j<this.mandatoryData.length;j++){
                        this.mandatoryData[i]=daee
                    }
                }
                for(var i=0;i<this.mandatoryData.length;i++){
                    if(this.mandatoryData[i]!=""){
                        this.bxlength++
                        st1+=this.mandatoryData[i].length
                    }
                }
                this.bxtotal=st1
            },
            mandatoryDate1(e){
                this.sjlength=0
                this.sjtotal=0
                var st2=0
                let arde1=e.split(/[(\r\n)\r\n]+/)
                for(var i=0;i<arde1.length;i++){
                    var daee=arde1[i]
                    for(var j=0;j<this.randomData.length;j++){
                        this.randomData[i]=daee
                    }
                }
                for(var i=0;i<this.randomData.length;i++){
                    if(this.randomData[i]!=""){
                        this.sjlength++
                        st2+=this.randomData[i].length
                    }
                }
                this.sjtotal=st2
            },
            mandatory(e){
                this.bxlength=0
                this.bxtotal=0
                var st1=0
                for(var i=0;i<this.mandatoryData.length;i++){
                    if(this.mandatoryData[i]!=""){
                        this.bxlength++
                        st1+=this.mandatoryData[i].length
                    }
                }
                this.bxtotal=st1
            },
            random(e){
                this.sjlength=0
                this.sjtotal=0
                var st2=0
                for(var i=0;i<this.randomData.length;i++){
                    if(this.randomData[i]!=""){
                        this.sjlength++
                        st2+=this.randomData[i].length
                    }
                }
                this.sjtotal=st2
            },
            top1(e){
                this.foremost1=e.length
            },
            bottm1(e){
                this.last=e.length
            },
            sIs(){
                this.shoIS1=!this.shoIS1
            },
            radioBtn() {
            },
            addColumn() {
                if (this.columns !== '') {
//                    const data = {
//                        label: '',
//                        value: []
//                    }
//                    data.label = this.columns
                    var str11=this.columns
                    this.tite.push(str11)
                    var desu=null
                    var lenth=0
                    for(var i=0;i<this.title.length;i++){
                        this.title[i].value.push(desu)
                        lenth=this.title[i].value.length
                    }
//                    var aryd={
//                        label:[],
//                        value:[]
//                    }
//                    for(var i=0;i<lenth;i++){
//                        aryd.value.push(null)
//                    }
//                    console.log(aryd)
//                    this.title.push(aryd)
                    this.innerVisible = false
                }
            },
            titleDel(index) {
                this.tite.splice(index, 1)
                for(var i=0;i<this.title.length;i++){
                    this.title[i].value.splice(index, 1)
                }
            },
            revise(e, index) {
                this.wishForm.extraPage[index] = e
            },
            swapItems(arr, index1, index2, direction) {
                if (direction == 'up') {
                    // 置顶
                    arr.unshift(arr[index1])
                    arr.splice(index1 + 1, 1)
                    return arr
                }
                arr[index1] = arr.splice(index2, 1, arr[index1])[0]
                return arr
            },
            botOm(arr, index1, index2, direction) {
                if (direction == 'down') {
                    arr.push(arr[index1])
                    arr.splice(index1, 1)
                    return arr
                }
                arr[index1] = arr.splice(index2, 1, arr[index1])[0]
                return arr
            },
            botIndex(index) {
                if (index == this.wishForm.extraPage.length - 1) {
                    this.$message({
                        message: '已经是最后一张了',
                        type: 'success'
                    })
                    return
                }
                this.botOm(this.wishForm.extraPage, index, index + 1)
            },
            topIndex(index) {
                if (index == 0) {
                    this.$message({
                        message: '已经是第一张了',
                        type: 'success'
                    })
                    return
                }
                this.swapItems(this.wishForm.extraPage, index, index - 1)
            },
            delSx(index) {
                this.tableData.splice(index, 1)
            },
            addQuality() {
                if (this.qualityId == '') {
                    this.$message.error('属性名不能为空')
                } else {
                    const name = this.qualityId
                    const content = this.qualityContent
                    const str = { [name]: content }
                    this.tableData.push(str)
                    this.dialogFormVisible = false
                }
            },
            addRess() {
                if (this.addPhoto == '') {
                    this.$message.error('不能为空')
                } else {
                    this.wishForm.extraPage.push(this.addPhoto)
                    this.dialogFormVisible1 = false
                }
            },
            delDz(index) {
//                this.$confirm('确定删除?', '提示', {
//                            confirmButtonText: '确定',
//                            cancelButtonText: '取消',
//                            type: 'warning'
//                        })
//                        .then(() => {
//                            this.$message({
//                                type: 'success',
//                                message: '删除成功!'
//                            })
                            this.wishForm.extraPage.splice(index, 1)
//                        })
//                        .catch(() => {})
            },
            inputFunc(e,index){
                let tab=this.tableData[index]
                let atrr=""
                let atr2=""
                for(var key in tab) {
                    atrr=key
                    atr2=tab[key]
                }
                this.tableData[index][e]=atr2
                delete this.tableData[index][atrr]
            },
            inputFunc1(e,index){
                let tab1=this.tableData[index]
                let atrr1=""
                for(var key in tab1) {
                    atrr1=key
                }
                this.tableData[index][atrr1]=e
            },
            increase() {
                const obj = {
                    '': ''
                }
                this.tableData.push(obj)
            },
            getData() {
                APIPlatInfo(this.condition).then(res => {
                    this.wishForm = res.data.data.basicInfo
                    this.tabDate = res.data.data.skuInfo
                    this.wishForm.extraPage = this.wishForm.extraPage.split('\\n')
                    this.wishForm.site==0?this.wishForm.site="美国":this.wishForm.site==3?this.wishForm.site="英国":this.wishForm.site==15?this.wishForm.site="澳大利亚":this.wishForm.site=this.wishForm.site
                    if(this.wishForm.extraPage[this.wishForm.extraPage.length - 1]==''){
                        this.wishForm.extraPage.pop()
                    }
                    this.tableData = JSON.parse(res.data.data.basicInfo.specifics).specifics
//                    const proper = JSON.parse(res.data.data.skuInfo[0].property).columns
                    if(this.tabDate.length!=0){
                        for(var i=0;i<this.tabDate.length;i++){
                            const proper = res.data.data.skuInfo[i].property.columns
                            var obj = {}
                            obj.label = []
                            obj.value = []
                            for(var k=0;k<proper.length;k++){
                               for (var key in proper[k]) {
                                obj.label.push(key)
                                obj.value.push(proper[k][key])
                               }
                                // obj.value.push(proper[k])
                            }
                            // for (var key in proper) {
                            //     obj.label.push(key)
                            //     obj.value.push(proper[key])
                            // }
                            this.title.push(obj)
                            console.log(this.title)
                        }
                        this.radio=res.data.data.skuInfo[0].property.pictureKey
                        this.tite=this.title[0].label
                    }else {
                        let arrDe=["Color","Size","款式3","UPC"]
                        this.tite=arrDe
                    }
                    this.wishForm.requiredKeywords=JSON.parse(this.wishForm.requiredKeywords)
                    this.wishForm.randomKeywords=JSON.parse(this.wishForm.randomKeywords)
                    if(this.wishForm.headKeywords){
                        this.foremost1=this.wishForm.headKeywords.length
                    }
                    if(this.wishForm.tailKeywords){
                        this.last=this.wishForm.tailKeywords.length
                    }
                    if(this.wishForm.requiredKeywords){
                        this.mandatoryData= this.wishForm.requiredKeywords
                    }
                    if(this.wishForm.randomKeywords){
                        this.randomData= this.wishForm.randomKeywords
                    }
                    if(this.wishForm.randomKeywords){
                        for(var i=0;i<this.wishForm.randomKeywords.length;i++){
                            if(this.wishForm.randomKeywords[i]!=""){
                                this.sjlength++
                                this.sjtotal+=this.wishForm.randomKeywords[i].length
                            }
                        }
                    }
                    if(this.wishForm.requiredKeywords){
                        for(var i=0;i<this.wishForm.requiredKeywords.length;i++){
                            if(this.wishForm.requiredKeywords[i]!=""){
                                this.bxlength++
                                this.bxtotal+=this.wishForm.requiredKeywords[i].length
                            }
                        }
                    }
                })
            },
            OutFirebEbay(){
                this.ShippingOutFir.site=this.wishForm.site
                APIShippingEbay(this.ShippingOutFir).then(response=>{
                    this.ebayOutFir =  response.data.data.items
                    if(response.data.data.items.length==0){
                        this.wishForm.outShippingMethod1=null
                    }
                })
            },
            InFirEbay(){
                this.ShippingInFir.site=this.wishForm.site
                APIShippingEbay(this.ShippingInFir).then(response=>{
                    this.ebayInFir =  response.data.data.items
                    if(response.data.data.items.length==0){
                        this.wishForm.inShippingMethod1=null
                    }
                })
            },
            InSecEbay(){
                this.ShippingSec.site=this.wishForm.site
                APIShippingEbay(this.ShippingSec).then(response=>{
                    this.ebayInSec =  response.data.data.items
                    if(response.data.data.items.length==0){
                        this.wishForm.inShippingMethod2=null
                    }
                })
            },
            keep() {
                for(var i=0;i<this.title.length;i++){
                    var obj={}
                    obj.columns=[]
                    obj.pictureKey=this.radio
                    for(var k=0;k<this.title[i].value.length;k++){
                        let strObj={}
                        strObj[this.tite[k]] = this.title[i].value[k]
                        obj.columns.push(strObj);
                    }
                    this.tabDate[i].property=obj
                }
                const md=JSON.stringify(this.mandatoryData)
                const mr=JSON.stringify(this.randomData)
                const url=this.wishForm.extraPage.join('\\n')
                let objStr={
                    specifics:this.tableData
                }
                var specificsData=JSON.stringify(objStr)
              const data = {
                basicInfo: {
                    "nid": this.wishForm.nid,
                    "goodsId": this.wishForm.goodsId,
                    "location": this.wishForm.location,
                    "country": this.wishForm.country,
                    "postCode": this.wishForm.postCode,
                    "prepareDay": this.wishForm.prepareDay,
                    "site": this.wishForm.site,
                    "listedCate": this.wishForm.listedCate,
                    "listedSubcate": this.wishForm.listedSubcate,
                    "title": this.wishForm.title,
                    "subTitle": this.wishForm.subTitle,
                    "description": this.wishForm.description,
                    "quantity": this.wishForm.quantity,
                    "nowPrice": this.wishForm.nowPrice,
                    "UPC": this.wishForm.UPC,
                    "EAN": this.wishForm.EAN,
                    "brand": this.wishForm.brand,
                    "MPN": this.wishForm.MPN,
                    "color": this.wishForm.color,
                    "type": this.wishForm.type,
                    "material": this.wishForm.material,
                    "intendedUse":this.wishForm.intendedUse,
                    "unit": this.wishForm.unit,
                    "bundleListing": this.wishForm.bundleListing,
                    "shape": this.wishForm.shape,
                    "features": this.wishForm.features,
                    "regionManufacture": this.wishForm.regionManufacture,
                    "reserveField": this.wishForm.reserveField,
                    "inShippingMethod1": this.wishForm.inShippingMethod1,
                    "inFirstCost1": this.wishForm.inFirstCost1,
                    "inSuccessorCost1": this.wishForm.inSuccessorCost1,
                    "inShippingMethod2": this.wishForm.inShippingMethod2,
                    "inFirstCost2": this.wishForm.inFirstCost2,
                    "inSuccessorCost2": this.wishForm.inSuccessorCost2,
                    "outShippingMethod1": this.wishForm.outShippingMethod1,
                    "outFirstCost1": this.wishForm.outFirstCost1,
                    "outSuccessorCost1": this.wishForm.outSuccessorCost1,
                    "outShipToCountry1": this.wishForm.outShipToCountry1,
                    "outShippingMethod2": this.wishForm.outShippingMethod2,
                    "outFirstCost2": this.wishForm.outFirstCost2,
                    "outSuccessorCost2": this.wishForm.outSuccessorCost2,
                    "outShipToCountry2": this.wishForm.outShipToCountry2,
                    "mainPage": this.wishForm.mainPage,
                    "extraPage": url,
                    "sku": this.wishForm.sku,
                    "infoId": this.wishForm.infoId,
                    "specifics": specificsData,
                    "iBayTemplate": this.wishForm.iBayTemplate,
                    "headKeywords": this.wishForm.headKeywords,
                    "requiredKeywords": md,
                    "randomKeywords": mr,
                    "tailKeywords": this.wishForm.tailKeywords,
                    "stockUp": this.wishForm.stockUp
                },
                skuInfo: []
                 }
                // data.basicInfo = this.wishForm
                data.skuInfo = this.tabDate
                APISaveEbayInfo(data).then(res => {
                    if (res.data.code === 200) {
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        })
                    } else {
                        this.$message.error(res.data.message)
                    }
                })
            }
        },
        mounted() {
            this.condition.id = this.$route.params.id
            this.getData()
            getPlatEbayAccount().then(response => {
                for(var item in response.data.data){
                    this.accountNumber.push(response.data.data[item])
                }
            })
            getPlatEbayStore().then(response => {
                this.warehouse =  response.data.data
            })
            getEbaySite().then(response=>{
                this.ebaySite =  response.data.data
            })
            setTimeout(()=>{
                this.OutFirebEbay()
                this.InFirEbay()
                this.InSecEbay()
            },1000)
        }
    }
</script>
<style lang="scss" scoped>
    section {
        padding-bottom: 40px;
        /*margin-top: 5px;*/
    }
    .essential {
        font-size: 16px;
        line-height: 45px;
        font-weight: normal;
        padding-left: 18px;
        border-left: 2px solid #2395f1;
    }
    .spsz {
        font-size: 15px;
        font-weight: normal;
        line-height: 40px;
        padding: 0;
        margin: 0;
        float: left;
        margin-right: 10px;
    }
    .textZt {
        line-height: 38px;
        text-align: center;
    }
    .sx {
        background: #eee;
        text-align: center;
        line-height: 34px;
        margin-left: 15px;
        margin-top: 12px;
        border-radius: 3px;
        cursor: pointer;
        width: 80px;
        float: right;
        font-size: 13px;
        border: #eee solid 1px;
    }
    .sx:nth-child(4) {
        background: #ecf5ff;
        color: #409eff;
        border: #b3d8ff solid 1px;
    }
    .sx:nth-child(3) {
        background: #fef0f0;
        color: #f56c6c;
        border: #fbc4c4 solid 1px;
    }
    .sx:nth-child(1) {
        background: #ecf5ff;
        color: #409eff;
        border: #b3d8ff solid 1px;
    }
    .sx:nth-child(2) {
        background: #ecf5ff;
        color: #409eff;
        border: #b3d8ff solid 1px;
    }
    .sx:hover {
        background: #409eff;
        color: #fff;
    }
    .sx:nth-child(3):hover {
        background: #f56c6c;
        color: #fff;
    }
    .ss {
        text-align: center;
        line-height: 38px;
        margin-left: 10px;
        margin-top: 12px;
        border-radius: 3px;
        cursor: pointer;
        width: 20px;
        float: left;
        color: red;
    }
    .adres {
        font-weight: normal;
        margin-top: 15px;
        margin-left: 5px;
    }
    .xzz{
        display: block;
        float: left;
        text-align: center;
        line-height: 30px;
        border: #ccc solid 1px;
        cursor: pointer;
        padding: 0 3px;
        font-size: 13px;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }
    .xzz1{
        display: block;
        float: left;
        text-align: center;
        line-height: 30px;
        border: #ccc solid 1px;
        cursor: pointer;
        padding: 0 8px;
        font-size: 13px;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }
    .exportAccount{
        display: block;
        float: left;
        border: #dcdfe6 solid 1px;
        height: 38px;
        line-height: 38px;
        border-left: none;
        background: #fff;
        padding: 0 10px;
        font-size: 13px;
        cursor: pointer;
    }
    .selee .el-input__inner{
        border-radius: 300px !important;
    }
</style>