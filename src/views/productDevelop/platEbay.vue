<template>
    <section>
        <el-col :span="24"
                style="position: fixed; bottom:0; z-index:10;background: #f2f2f2;padding: 10px 0;border-top: #eee solid 1px;">
            <el-col :span="11"
                    :offset="5">
                <el-button @click="keep()"
                           type="primary">保存当前数据</el-button>
                <el-button style="margin-left: 0"
                           type="success">保存并完善</el-button>
                <el-select v-model="select"
                           placeholder="--所有仓储--">
                    <el-option label="是"
                               value="是"></el-option>
                    <el-option label="否"
                               value="否"></el-option>
                </el-select>
                <el-select v-model="select"
                           placeholder="--所有账号--">
                    <el-button plain
                               type="info">全选</el-button>
                    <el-button plain
                               type="info">取消</el-button>
                    <el-option label="是"
                               value="是"></el-option>
                    <el-option label="否"
                               value="否"></el-option>
                </el-select>
                <el-button type="danger">导出所选账号</el-button>
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
                                附加图
                            </el-col>
                        </el-col>
                        <!--<el-col :span="12">-->
                        <!--<el-col :span="2" class="textZt">-->
                        <!--是否备货-->
                        <!--</el-col>-->
                        <!--<el-col :span="20">-->
                        <!--<el-input v-model="wishForm.stockUp" :disabled="true">-->

                        <!--</el-input>-->
                        <!--</el-col>-->
                        <!--</el-col>-->
                        <!--<el-col :span="12">-->
                        <!--<el-col :span="24" style="margin-bottom: 10px;margin-top: 15px">-->
                        <!--<el-col :span="2" class="textZt">-->
                        <!--是否备货-->
                        <!--</el-col>-->
                        <!--<el-col :span="21">-->
                        <!--<el-input v-model="wishForm.stockUp" :disabled="true">-->

                        <!--</el-input>-->
                        <!--</el-col>-->
                        <!--</el-col>-->
                        <!--<el-col :span="24" style="margin-bottom: 10px;margin-top: 15px">-->
                        <!--<el-col :span="2" class="textZt">-->
                        <!--主图-->
                        <!--</el-col>-->
                        <!--<el-col :span="21">-->
                        <!--<el-input v-model="wishForm.mainPage">-->

                        <!--</el-input>-->
                        <!--</el-col>-->
                        <!--</el-col>-->
                        <!--<el-col :span="24">-->
                        <!--<el-col :span="2" class="textZt">-->
                        <!--附加图-->
                        <!--</el-col>-->
                        <!--</el-col>-->
                        <!--</el-col>-->
                        <el-col :span="10"
                                style="margin-left: 25px">
                            <a :href="wishForm.mainPage"
                               target="_blank">
                                <img :src="wishForm.mainPage"
                                     style="display: block; width: 155px;height: 155px" />
                            </a>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row style="margin-left: 15px">
                    <el-col :span="12"
                            style="margin-top: 15px;margin-bottom: 2px"
                            v-for="(item,index) in wishForm.extraPage"
                            :key="index">
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
                        <!--<el-select size="small"-->
                        <!--v-model="select"-->
                        <!--style="width:245px;">-->
                        <!--<el-option label="美国站"-->
                        <!--value="美国站"></el-option>-->
                        <!--<el-option label="中国站"-->
                        <!--value="中国站"></el-option>-->
                        <!--</el-select>-->
                        <el-input size="small"
                                  style="width:245px;"
                                  v-model="wishForm.site"
                                  :disabled="true"></el-input>
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
                              style="width:245px;"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="刊登分类2">
                    <el-input size="small"
                              style="width:245px;"></el-input>
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
            <el-col :span="12">
                <el-form-item label="最前关键词">
          <span>
            <font style="color: red">说明：</font>性别定位/多个一卖等。如Women/Men/Girl/Baby/Kids/1PC/2PC/5PC/4
            Colors/5Pcs Set…
          </span>
                    <br />
                    <el-input size="small"
                              style="width:660px"
                              placeholder="--一个关键词--"
                              v-model="wishForm.headKeywords"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="最后关键词"
                              wight="82">
          <span>
            <font style="color: red">说明：</font>附加说明词。如Randomly/S-3XL/2ml/(Color: Nude)/Big Size…
          </span>
                    <br />
                    <el-input size="small"
                              style="width: 700px"
                              placeholder="--最多一个关键词--"
                              v-model="wishForm.tailKeywords"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="必选关键词">
          <span>
            <font style="color: red">说明：</font>物品名/材质/特征等。如T-Shirt(物品名)/V-neck(特征)/Cotton(材质)
          </span>
                    <el-button type="text"
                               @click="dialogTableVisible = true">批量设置</el-button>
                    <div>
                        必填
                        <el-input size="small"
                                  style="width:220px"></el-input>
                        <el-input size="small"
                                  style="width:220px"></el-input>
                        <el-input size="small"
                                  style="width:220px"></el-input>
                    </div>
                    <div>
                        选填
                        <el-input size="small"
                                  style="width:220px"></el-input>
                        <el-input size="small"
                                  style="width:220px"></el-input>
                        <el-input size="small"
                                  style="width:220px"></el-input>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="随机关键词">
          <span>
            <font style="color: red">说明：</font>形容词/品类热词等。如Fashion/Elegant/Hot/DIY/Casual…
          </span>
                    <el-button type="text"
                               @click="dialogTable = true">批量设置</el-button>
                    <div>
                        必填
                        <el-input size="small"
                                  style="width:135px"></el-input>
                        <el-input size="small"
                                  style="width:135px"></el-input>
                        <el-input size="small"
                                  style="width:135px"></el-input>
                        <el-input size="small"
                                  style="width:135px"></el-input>
                        <el-input size="small"
                                  style="width:135px"></el-input>
                    </div>
                    <div>
                        选填
                        <el-input size="small"
                                  style="width:135px"></el-input>
                        <el-input size="small"
                                  style="width:135px"></el-input>
                        <el-input size="small"
                                  style="width:135px"></el-input>
                        <el-input size="small"
                                  style="width:135px"></el-input>
                        <el-input size="small"
                                  style="width:135px"></el-input>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="描述">
                    <el-input size="small"
                              v-model="wishForm.description"
                              type="textarea"
                              style="width:1500px"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="数量">
                    <el-input size="small"
                              style="width:430px;"
                              v-model="wishForm.quantity"></el-input>
                </el-form-item>
                <el-form-item label="UPC">
                    <el-input size="small"
                              style="width:430px;"
                              v-model="wishForm.UPC"></el-input>
                </el-form-item>
                <el-form-item label="EAN">
                    <el-input size="small"
                              style="width:430px;"
                              v-model="wishForm.EAN"></el-input>
                </el-form-item>
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
                    style="margin-bottom: 10px;padding-left: 15px">
                <h4 class="adres">境内运输方式</h4>
                <el-form-item label="运输方式1">
                    <el-select size="small"
                               v-model="select"
                               placeholder="--境内物流选择--">
                        <el-option label="是"
                                   value="是"></el-option>
                        <el-option label="否"
                                   value="否"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="首件运费">
                    <el-input size="small"
                              placeholder="--USD--"
                              style="width:150px;"></el-input>
                </el-form-item>
                <el-form-item label="续件运费">
                    <el-input size="small"
                              placeholder="--USD--"
                              style="width:150px;"></el-input>
                </el-form-item>
                <el-form-item label="运输方式2">
                    <el-select size="small"
                               v-model="select"
                               placeholder="--境内物流选择--">
                        <el-option label="是"
                                   value="是"></el-option>
                        <el-option label="否"
                                   value="否"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="首件运费">
                    <el-input size="small"
                              placeholder="--USD--"
                              style="width:150px;"></el-input>
                </el-form-item>
                <el-form-item label="续件运费">
                    <el-input size="small"
                              placeholder="--USD--"
                              style="width:150px;"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12"
                    style="padding-left: 15px">
                <h4 class="adres">境外运输方式</h4>
                <el-form-item label="运输方式1">
                    <el-select size="small"
                               v-model="select"
                               placeholder="--境外物流选择--">
                        <el-option label="是"
                                   value="是"></el-option>
                        <el-option label="否"
                                   value="否"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="首件运费">
                    <el-input size="small"
                              placeholder="--USD--"
                              style="width:150px;"></el-input>
                </el-form-item>
                <el-form-item label="续件运费">
                    <el-input size="small"
                              placeholder="--USD--"
                              style="width:150px;"></el-input>
                </el-form-item>
                <el-form-item label="运输方式2">
                    <el-select size="small"
                               v-model="select"
                               placeholder="--境外物流选择--">
                        <el-option label="是"
                                   value="是"></el-option>
                        <el-option label="否"
                                   value="否"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="首件运费">
                    <el-input size="small"
                              placeholder="--USD--"
                              style="width:150px;"></el-input>
                </el-form-item>
                <el-form-item label="续件运费">
                    <el-input size="small"
                              placeholder="--USD--"
                              style="width:150px;"></el-input>
                </el-form-item>
            </el-col>
            <el-dialog title="批量增加关键词"
                       :visible.sync="dialogTableVisible">
                <el-input size="small"
                          type="textarea"
                          :rows="20"
                          placeholder="-多个必选关键词-"></el-input>
            </el-dialog>
            <el-dialog title="批量增加关键词"
                       :visible.sync="dialogTable">
                <el-input size="small"
                          type="textarea"
                          :rows="20"
                          placeholder="-多个随机关键词-"></el-input>
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
                <!-- <el-button @click="innerVisible = true">添加属性</el-button> -->
                <!-- <el-table :data="tabDate">
                  <el-table-column type="selection"
                                   align="center"
                                   header-align="center"></el-table-column>
                  <el-table-column type="index"
                                   align="center"
                                   header-align="center">
                  </el-table-column>
                  <el-table-column label="操作"
                                   header-align="center"
                                   align="center">
                    <template slot-scope="scope">
                      <el-tooltip content="删除">
                        <i class="el-icon-delete"
                           @click="del(scope.$index, scope.row)"
                           style="color:#409EFF;cursor:pointer;"></i>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column label="SKU"
                                   prop="sku"
                                   header-align="center">
                    <template slot-scope="scope">
                      <el-input size="small"
                                v-model="scope.row.sku"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="数量"
                                   prop="color"
                                   header-align="center">
                    <template slot-scope="scope">
                      <el-input size="small"
                                v-model="scope.row.quantity"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="价格"
                                   prop="size"
                                   header-align="center">
                    <template slot-scope="scope">
                      <el-input size="small"
                                v-model="scope.row.retailPrice"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="图片地址"
                                   prop="imageUrl"
                                   header-align="center">
                    <template slot-scope="scope">
                      <el-input size="small"
                                v-model="scope.row.imageUrl"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="图片"
                                   prop="imageUrl"
                                   header-align="center">
                    <template slot-scope="scope">
                      <img :src="scope.row.imageUrl"
                           style="width:50px;height:50px;">
                    </template>
                  </el-table-column>
                  <el-table-column label="Color"
                                   prop="imageUrl"
                                   header-align="center">
                    <template slot-scope="scope">
                      <el-input size="small"
                                v-model="scope.row.property.Color"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Size"
                                   prop="imageUrl"
                                   header-align="center">
                    <template slot-scope="scope">
                      <el-input size="small"
                                v-model="scope.row.property.Size"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="款式3"
                                   prop="imageUrl"
                                   header-align="center">
                    <template slot-scope="scope">
                      <el-input size="small"
                                v-model="scope.row.property.Color"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="CPU"
                                   prop="imageUrl"
                                   header-align="center">
                    <template slot-scope="scope">
                      <el-input size="small"
                                v-model="scope.row.property.Color"></el-input>
                    </template>
                  </el-table-column>
                </el-table> -->
                <table id="oTable"
                       border="1px solid #ebeef5"
                       cellpadding="9"
                       style="border: 1px solid #ebeef5;background-color:#fff;color:#606266;width:100%;border-collapse:collapse;">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>
                            <el-checkbox></el-checkbox>
                        </th>
                        <th>操作</th>
                        <th>SKU</th>
                        <th>数量</th>
                        <th>价格</th>
                        <th>图片地址</th>
                        <th>图片</th>
                        <th v-for="(item, index) in title"
                            :key="index">
                            <el-input clearable
                                      v-model="item.label"></el-input>
                            <i class="el-icon-delete"
                               @click="titleDel(index)"></i>
                        </th>
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
                        <td><i class="el-icon-delete"></i></td>
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
                        <td v-for="(item, index) in title"
                            :key="index">
                            <el-input v-model="item.value"></el-input>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <el-row style="margin-top: 20px">
                    <el-col :span="24">
                        <el-col :span="2">
                            <el-input placeholder="行数">

                            </el-input>
                        </el-col>
                        <el-col :span="1"
                                style="margin-left: 10px">
                            <el-button type="primary">新增行</el-button>
                        </el-col>
                        <el-col :span="2">
                            <el-input placeholder="数量"
                                      style="margin-left: 25px">

                            </el-input>
                        </el-col>
                        <el-col :span="1"
                                style="margin-left: 36px">
                            <el-button type="primary">数量确定</el-button>
                        </el-col>
                        <el-col :span="2"
                                style="margin-left: 40px">
                            <el-input placeholder="零售价">

                            </el-input>
                        </el-col>
                        <el-col :span="1"
                                style="margin-left: 12px">
                            <el-button type="primary">价格确定</el-button>
                        </el-col>
                        <el-col :span="2"
                                style="margin-left: 40px">
                            <el-input placeholder="Does not apply">

                            </el-input>
                        </el-col>
                        <el-col :span="2"
                                style="margin-left: 10px">
                            <el-button type="primary">UPC/EAN确定</el-button>
                        </el-col>
                        <el-col :span="1"
                                style="margin-left: 5px">
                            <el-button type="success">保存</el-button>
                        </el-col>
                        <el-col :span="1"
                                style="margin-left: 12px">
                            <el-button type="danger">删除行</el-button>
                        </el-col>
                    </el-col>
                    <el-col :span="24"
                            style="margin-top: 20px;margin-bottom: 25px">
                        图片关联
                    </el-col>
                    <el-col :span="24">
                        <el-radio-group @change='radioBtn'
                                        v-model="radio">
                            <el-radio v-for="(item, index) in title"
                                      :key="index"
                                      :label="item.label"
                                      :value="item.label"></el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button @click="outerVisible = false"
                               type="primary">取 消</el-button>
                </div>
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
    import { APIPlatInfo, APISaveWishInfo } from '../../api/product'
    import { APISaveEbayInfo } from '../../api/platebay'
    export default {
        data() {
            return {
                radio: 'Color',
                columns: '',
                title: [],
                select: '',
                select1: '',
                wishForm: {},
                mainForm: {},
                dialogTableVisible: false,
                dialogTable: false,
                outerVisible: false,
                innerVisible: false,
                dialogFormVisible: false,
                dialogFormVisible1: false,
                tabDate: [],
                skuifo: [],
                qualityId: '',
                qualityContent: '',
                addPhoto: '',
                tabPosition: 'top',
                radio2: 3,
                activeName: 'first',
                tableData: [],
                condition: {
                    id: 5,
                    plat: 'ebay'
                }
            }
        },
        methods: {
            radioBtn() {
                console.log(this.radio)
            },
            addColumn() {
                if (this.columns !== '') {
                    const data = {
                        label: '',
                        value: ''
                    }
                    data.label = this.columns
                    this.title.push(data)
                    this.innerVisible = false
                }
            },
            titleDel(index) {
                this.title.splice(index, 1)
            },
            revise(e, index) {
                this.wishForm.extraPage[index] = e
                console.log(this.wishForm.extraPage)
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
                    console.log(this.addPhoto)
                    this.wishForm.extraPage.push(this.addPhoto)
                    this.dialogFormVisible1 = false
                    console.log(this.wishForm.extraPage)
                }
            },
            delDz(index) {
                this.$confirm('确定删除?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        })
                        .then(() => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            this.wishForm.extraPage.splice(index, 1)
                        })
                        .catch(() => {})
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
                console.log(this.tableData)
            },
            getData() {
                APIPlatInfo(this.condition).then(res => {
                    this.wishForm = res.data.data.basicInfo
                    this.tabDate = res.data.data.skuInfo
                    this.wishForm.site == 0 ? (this.wishForm.site = '美国') : ''
                    this.wishForm.extraPage = this.wishForm.extraPage.split('\\n')
                    this.wishForm.extraPage.pop()
                    this.tableData = JSON.parse(res.data.data.basicInfo.specifics).specifics
                    const proper = JSON.parse(res.data.data.skuInfo[0].property).columns
                    for (const i in proper) {
                        const obj = {
                            label: i,
                            value: proper[i]
                        }
                        this.title.push(obj)
                    }
                })
            },
            keep() {
                const data = {
                    basicInfo: {
                        id: 3,
                        SKU: this.wishForm.sku,
                        title: this.wishForm.title,
                        description: this.wishForm.description,
                        inventory: 10000,
                        price: '0.00',
                        msrp: '0.00',
                        shipping: '0.00',
                        shippingTime: '7-21',
                        tags: '',
                        mainImage: this.wishForm.mainPage,
                        goodsId: null,
                        infoId: 5,
                        extraImages: 'enim',
                        headKeywords: null,
                        requiredKeywords: null,
                        randomKeywords: null,
                        tailKeywords: null,
                        wishTags: null,
                        stockUp: '否'
                    },
                    skuInfo: []
                }
                // data.basicInfo = this.wishForm
                data.skuInfo = this.tabDate
                APISaveEbayInfo(data).then(res => {
                    if (res.data.data[0] === 'success') {
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        })
                    } else {
                        this.$message.error('保存失败')
                    }
                })
            }
        },
        mounted() {
            this.condition.id = this.$route.params.id
            this.getData()
            console.log(this.$route.params.id)
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
</style>