<template>
  <section>
    <el-col :span="24"
            class="toolbar"
            style="position:fixed;bottom:0px;text-align:center;z-index:10;padding-bottom:8px;padding-top: 8px">
      <el-col :span="11"
              :offset="5">
      <el-button type="primary"
                 @click="update"
                 style="margin-left: 0px;float: left;margin-right: 10px">保存</el-button>
      <!--<el-dropdown @command="handleCommand"-->
                   <!--placement="top-start">-->
        <!--<el-button type="primary">标记完善<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i></el-button>-->
        <!--<el-dropdown-menu slot="dropdown">-->
          <!--<el-dropdown-item command="a">Wish</el-dropdown-item>-->
          <!--<el-dropdown-item command="b">Joom</el-dropdown-item>-->
        <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
        <el-select v-model="tips"
                   placeholder="--保存完善--" style="float: left;width: 150px">
          <el-option label="Wish"
                     value="Wish"></el-option>
          <el-option label="Joom"
                     value="Joom"></el-option>
        </el-select>
        <span class="exportAccount" style="margin-right: 10px">保存完善</span>
        <el-button type="success" style="float: left;margin-right: 10px">导出Wish模板</el-button>
      <el-select v-model="select"
                 placeholder="--请选择账号--" style="float: left;">
        <el-option label="是"
                   value="是"></el-option>
        <el-option label="否"
                   value="否"></el-option>
      </el-select>
        <span class="exportAccount">导出Joom模板</span>
      </el-col>
    </el-col>
    <el-col :span="24"
            style="padding: 0;margin-left: 15px">
      <h3 class="toolbar essential">基本信息</h3>
    </el-col>
    <el-form :model="wishForm"
             :inline="true"
             label-width="100px"
             ref="wishForm" style="margin-left: 15px">
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
              <el-input v-model="wishForm.mainImage">

              </el-input>
            </el-col>
            <el-col :span="2"
                    class="textZt"
                    style="margin-top: 15px">
            </el-col>
          </el-col>
          <el-col :span="10"
                  style="margin-left: 25px">
            <a :href="wishForm.mainImage"
               target="_blank">
              <img :src="wishForm.mainImage"
                   style="display: block; width: 155px;height: 155px" />
            </a>
          </el-col>
        </el-col>
      </el-row>
      <!--<el-row>-->
        <!--<el-col :span="5">-->
          <!--<el-form-item label=" ">-->
            <!--<a :href="wishForm.mainImage"-->
               <!--target="_blank">-->
              <!--<img :src="wishForm.mainImage"-->
                   <!--style="width:230px;height:150px;" />-->
            <!--</a>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="19">-->
          <!--<el-form-item label="主图">-->
            <!--<el-input v-model="wishForm.mainImage"-->
                      <!--size="small"-->
                      <!--style="width:1150px;"></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="19">-->
          <!--<el-form-item label="SKU">-->
            <!--<el-input size="small"-->
                      <!--v-model="wishForm.SKU"-->
                      <!--style="width:1150px;"></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="19">-->
          <!--<el-form-item label="是否备货">-->
            <!--<el-input v-model="wishForm.stockUp"-->
                      <!--size="small"-->
                      <!--disabled-->
                      <!--style="width:1150px;"></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <el-row>
        <el-col style="margin-bottom: 10px;margin-top: 5px" :span="24">
          <span  @click="sIs()" style="padding: 10px 20px;background: #409EFF;color: #fff;cursor: pointer;display: block;width: 70px;padding-left:10px;text-align: center;margin-left: 15px"><i :class="[shoIS?'el-icon-minus':'el-icon-plus']" style="margin-right: 5px"></i>附加图</span>
        </el-col>
      </el-row>
      <el-row style="margin-left: 15px">
        <el-col :span="24">
          <el-col :span="12"
                style="margin-top: 15px;margin-bottom: 2px"
                v-for="(item,index) in url"
                :key="index" v-show="shoIS" >
            <el-col :span="19">
            <el-col :span="24">
              <el-input v-model="url[index]"
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
            <a :href="url[index]"
               target="_blank">
              <img :src="url[index]"
                   style="display: block;width: 90px;height: 90px" />
            </a>
          </el-col>
        </el-col>
        </el-col>
      </el-row>
          <!--<el-col v-for="(item, index) in url"-->
                  <!--:key="index" style="margin-top: 15px" v-show="shoIS" :span="24">-->
            <!--<el-col :span="2">-->
              <!--<div style="margin-left:20px;">#{{index}}</div>-->
              <!--<a :href="url[index]"-->
                 <!--target="_blank">-->
                <!--<img :src="url[index]"-->
                     <!--class="image" />-->
              <!--</a>-->
            <!--</el-col>-->
            <!--<el-col :span="22">-->
              <!--<el-form-item>-->
                <!--<el-input v-model="url[index]"-->
                          <!--size="small"-->
                          <!--style="width:1000px;margin-top: 16px"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-button size="small"-->
                       <!--@click="addUrl">-->
              <!--<font size="3">增加</font>-->
            <!--</el-button>-->
            <!--<el-button size="small"-->
                       <!--@click="delUrl(index)">-->
              <!--<font size="3">删除</font>-->
            <!--</el-button>-->
            <!--<el-button size="small"-->
                       <!--@click="up(index)">-->
              <!--<font size="3">上移动</font>-->
            <!--</el-button>-->
            <!--<el-button size="small"-->
                       <!--@click="down(index)">-->
              <!--<font size="3">下移动</font>-->
            <!--</el-button>-->
          <!--</el-col>-->
      <el-col :span="24"
              style="padding: 0;">
        <h3 class="toolbar essential">主信息</h3>
      </el-col>
      <el-col :span="24">
        <el-form-item label="关键词Tags:">
          <el-input v-model="wishForm.wishTags"
                    size="small"
                    style="width:1500px;"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="最前关键词">
            <span>
              <span style="color: red">{{foremost}}</span>个字符
            </span>
             <span style="margin-left: 10px">
              <font style="color: red">说明：</font>性别定位/多个一卖等。如Women/Men/Girl/Baby/Kids/1PC/2PC/5PC/4 Colors/5Pcs Set…
            </span>
          <br>
          <el-input size="small"
                    v-model="wishForm.headKeywords"
                    style="width:1500px"
                    placeholder="--一个关键词--"
                    @input="top($event)"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="必选关键词">
             <span>
              <span style="color: red">{{bxlength}}</span>个关键词<span style="color: red;margin-left: 10px">{{bxtotal}}</span>个字符
            </span>
            <span>
              <font style="color: red;margin-left: 10px">说明：</font>物品名/材质/特征等。如T-Shirt(物品名)/V-neck(特征)/Cotton(材质)
            </span>
          <el-button type="text" @click="dialogTableVisible = true">批量设置</el-button>
          <div>
            必填
            <el-input size="small"
                      style="width:487px" v-model="mandatoryData[0]" @blur="mandatory()"></el-input>
            <el-input size="small"
                      style="width:487px" v-model="mandatoryData[1]" @blur="mandatory()"></el-input>
            <el-input size="small"
                      style="width:487px" v-model="mandatoryData[2]" @blur="mandatory()"></el-input>
          </div>
          <div>
            选填
            <el-input size="small"
                      style="width:487px" v-model="mandatoryData[3]" @blur="mandatory()"></el-input>
            <el-input size="small"
                      style="width:487px" v-model="mandatoryData[4]" @blur="mandatory()"></el-input>
            <el-input size="small"
                      style="width:487px" v-model="mandatoryData[5]" @blur="mandatory()"></el-input>

          </div>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="随机关键词">
            <span>
              <span style="color: red">{{sjlength}}</span>个关键词<span style="color: red;margin-left: 10px">{{sjtotal}}</span>个字符
            </span>
            <span>
              <font style="color: red;margin-left: 10px">说明：</font>形容词/品类热词等。如Fashion/Elegant/Hot/DIY/Casual…
            </span>
          <el-button type="text" @click="dialogTable = true">批量设置</el-button>
          <div>
            必填
            <el-input size="small"
                      style="width:290px" v-model="randomData[0]" @blur="random()"></el-input>
            <el-input size="small"
                      style="width:290px" v-model="randomData[1]" @blur="random()"></el-input>
            <el-input size="small"
                      style="width:290px" v-model="randomData[2]" @blur="random()"></el-input>
            <el-input size="small"
                      style="width:290px" v-model="randomData[3]" @blur="random()"></el-input>
            <el-input size="small"
                      style="width:290px" v-model="randomData[4]" @blur="random()"></el-input>
          </div>
          <div>
            选填
            <el-input size="small"
                      style="width:290px" v-model="randomData[5]" @blur="random()"></el-input>
            <el-input size="small"
                      style="width:290px" v-model="randomData[6]" @blur="random()"></el-input>
            <el-input size="small"
                      style="width:290px" v-model="randomData[7]" @blur="random()"></el-input>
            <el-input size="small"
                      style="width:290px" v-model="randomData[8]" @blur="random()"></el-input>
            <el-input size="small"
                      style="width:290px" v-model="randomData[9]" @blur="random()"></el-input>

          </div>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="最后关键词">
            <span>
              <span style="color: red">{{last}}</span>个字符
            </span>
            <span>
              <font style="color: red">说明：</font>附加说明词。如Randomly/S-3XL/2ml/(Color: Nude)/Big Size…
            </span>
          <br>
          <el-input size="small"
                    v-model="wishForm.tailKeywords"
                    style="width: 1500px"
                    placeholder="--最多一个关键词--"
                    @input="bottm($event)"
          ></el-input>
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
                    v-model="wishForm.inventory"
                    style="width:1500px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="运输时间">
          <el-input size="small"
                    v-model="wishForm.shippingTime"
                    style="width:1500px"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <el-col :span="24"
            style="padding: 0;margin-left: 15px">
      <h3 class="toolbar essential">多属性设置</h3>
    </el-col>
    <el-button @click="dialogVisible = true"
               style="margin-left:35px;" type="primary">多属性设置</el-button>
    <!-- 多属性设置对话框 -->
    <el-dialog title="多属性"
               :visible.sync="dialogVisible"
               width="80%">
      <el-table :data="tableData">
        <el-table-column type="selection"
                         width="30"
                         align="center"
                         header-align="center"></el-table-column>
        <el-table-column type="index"
                         width="50"
                         align="center"
                         header-align="center">
        </el-table-column>
        <el-table-column label="操作"
                         width="50"
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
        <el-table-column label="颜色"
                         prop="color"
                         header-align="center">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.color"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="尺寸"
                         prop="size"
                         header-align="center">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.size"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="数量"
                         prop="inventory"
                         header-align="center">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.inventory"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="价格(USD)"
                         prop="price"
                         header-align="center">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="运费(USD)"
                         prop="shipping"
                         header-align="center">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.shipping"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="建议零售价(USD)"
                         prop="msrp"
                         header-align="center">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.msrp"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="Joom零售价(USD)"
                         prop="joomPrice"
                         header-align="center">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.joomPrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="Joom运费(USD)"
                         prop="joomShipping"
                         header-align="center">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.joomShipping"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="运输时间"
                         prop="shippingTime"
                         header-align="center">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.shippingTime"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="主图"
                         prop="linkUrl"
                         header-align="center">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.linkUrl"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="图片"
                         prop="linkUrl"
                         header-align="center">
          <template slot-scope="scope">
            <img :src="scope.row.linkUrl"
                 style="width:50px;height:50px;">
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top:15px;">
        <el-col :span="2">
          <input placeholder="行数" v-model="rows"
                 style="width:62px;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center">
          <span class="xzz" @click="addClomun">新增行</span>
        </el-col>
        <el-col :span="3">
          <!--<el-input v-model="num"-->
                    <!--size="small"-->
                    <!--placeholder="数量"-->
                    <!--style="width:190px"></el-input>-->
          <!--<el-button size="small"-->
                     <!--@click="setNum">数量确定</el-button>-->
          <input placeholder="数量" v-model="num"
                 style="width:100px;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center">
          <span class="xzz1" @click="setNum">数量确定</span>
        </el-col>
        <el-col :span="3">
          <!--<el-input v-model="price"-->
                    <!--size="small"-->
                    <!--placeholder="价格"-->
                    <!--style="width:190px"></el-input>-->
          <!--<el-button size="small"-->
                     <!--@click="setPrice">价格确定</el-button>-->
          <input placeholder="价格" v-model="price"
                 style="width:100px;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center">
          <span class="xzz1" @click="setPrice">价格确定</span>
        </el-col>
        <el-col :span="3">
          <!--<el-input v-model="ship"-->
                    <!--size="small"-->
                    <!--placeholder="运费"-->
                    <!--style="width:190px"></el-input>-->
          <!--<el-button size="small"-->
                     <!--@click="setShip">运费确定</el-button>-->
          <input placeholder="运费" v-model="ship"
                 style="width:100px;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center">
          <span class="xzz1" @click="setShip">运费确定</span>
        </el-col>
        <el-col :span="3">
          <!--<el-input v-model="advicePrice"-->
                    <!--size="small"-->
                    <!--placeholder="建议零售价"-->
                    <!--style="width:190px"></el-input>-->
          <!--<el-button size="small"-->
                     <!--@click="setAdvice">建议零售价</el-button>-->
          <input placeholder="建议零售价" v-model="advicePrice"
                 style="width:85px;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center">
          <span class="xzz1" @click="setAdvice">建议零售价</span>
        </el-col>
        <el-col :span="3">
          <!--<el-input v-model="joomPrice"-->
                    <!--size="small"-->
                    <!--placeholder="Joom零售价"-->
                    <!--style="width:185px"></el-input>-->
          <!--<el-button size="small"-->
                     <!--@click="setJoom">Joom零售价</el-button>-->
          <input placeholder="Joom零售价" v-model="joomPrice"
                 style="width:82px;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center">
          <span class="xzz1" @click="setJoom">Joom零售价</span>
        </el-col>
        <el-col :span="3">
          <!--<el-input v-model="transport"-->
                    <!--size="small"-->
                    <!--placeholder="Joom运费"-->
                    <!--style="width:185px"></el-input>-->
          <!--<el-button size="small"-->
                     <!--@click="setTransport">Joom运费</el-button>-->
          <input placeholder="Joom运费" v-model="transport"
                 style="width:95px;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center">
          <span class="xzz1" @click="setTransport">Joom运费</span>
        </el-col>
        <el-col :span="3">
          <!--<el-input v-model="time"-->
                    <!--size="small"-->
                    <!--placeholder="运输时间"-->
                    <!--style="width:185px"></el-input>-->
          <!--<el-button size="small"-->
                     <!--@click="setTime">运输时间</el-button>-->
          <input placeholder="运输时间" v-model="time"
                 style="width:95px;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center">
          <span class="xzz1" @click="setTime">运输时间</span>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 批量设置对话框 -->
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
  </section>
</template>
<script type="text/ecmascript-6">
  import { APIPlatInfo, APISaveWishInfo, APIFinishPlat } from '../../api/product'
  export default {
    props: {
      id: {
        type: Number,
        default: 5
      }
    },
    data() {
      return {
        url: [],
        rows: null,
        dialogTableVisible:false,
        dialogTable:false,
        dialogFormVisible1:false,
        tips:"",
        num: null,
        foremost:0,
        price: null,
        ship: null,
        addPhoto:"",
        advicePrice: null,
        joomPrice: null,
        transport: null,
        time: null,
        dialogVisible: false,
        setVisible: false,
        select: '',
        wishForm: {},
        last:0,
        tableData: [],
        bxtotal:0,
        sjtotal:0,
        bxlength:0,
        sjlength:0,
        mandatoryData:["","","","","",""],
        randomData:["","","","","","","","","",""],
        shoIS:false,
        activeNames: ['2'],
        condition: {
          id: 0,
          plat: 'wish'
        }
      }
    },
    methods: {
      top(e){
        this.foremost=e.length
      },
      bottm(e){
        this.last=e.length
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
      revise(e, index) {
        this.url[index] = e
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
      addRess() {
        if (this.addPhoto == '') {
          this.$message.error('不能为空')
        } else {
          this.url.push(this.addPhoto)
          this.dialogFormVisible1 = false
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
                  this.url.splice(index, 1)
                })
                .catch(() => {})
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
        if (index == this.url.length - 1) {
          this.$message({
            message: '已经是最后一张了',
            type: 'success'
          })
          return
        }
        this.botOm(this.url, index, index + 1)
      },
      topIndex(index) {
        if (index == 0) {
          this.$message({
            message: '已经是第一张了',
            type: 'success'
          })
          return
        }
        this.swapItems(this.url, index, index - 1)
      },
      delSx(index) {
        this.tableData.splice(index, 1)
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
        console.log(this.mandatoryData)
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
      sIs(){
        this.shoIS=!this.shoIS
      },
      handleChange(val) {
        console.log(val);
      },
      // 删除URL
      delUrl(index) {
        this.url.splice(index, 1)
      },
      // 删除table行
      del(index, row) {
        this.tableData.splice(index, 1)
      },
      // 增加URL
      addUrl() {
        this.url.push('')
      },
      // 上移
      up(index) {
        if (index > 0) {
          const upData = this.url[index - 1]
          this.url.splice(index - 1, 1)
          this.url.splice(index, 0, upData)
        } else {
          alert('已经是第一条，不可上移')
        }
      },
      // 下移
      down(index) {
        if (index + 1 === this.url.length) {
          alert('已经是最后一条，不可下移')
        } else {
          const downData = this.url[index + 1]
          this.url.splice(index + 1, 1)
          this.url.splice(index, 0, downData)
        }
      },
      // 增加行
      addClomun() {
        for (let i = 0; i < this.rows; i++) {
          var obj={}
          obj.id=null
          obj.infoId=this.wishForm.infoId
          obj.sid=null
          obj.sku=''
          obj.color=''
          obj.size=null
          obj.inventory=null
          obj.price=null
          obj.shipping=''
          obj.msrp=null
          obj.shippingTime=''
          obj.linkUrl=''
          obj.goodsSkuId=null
          obj.weight=null
          obj.joomPrice=null
          obj.joomShipping=null
          this.tableData.push(obj)
        }
      },
      // 数量
      setNum() {
        if (this.num) {
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].inventory = this.num
          }
        } else {
          return false
        }
      },
      // 价格
      setPrice() {
        if (this.price) {
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].price = this.price
          }
        } else {
          return false
        }
      },
      // 运费
      setShip() {
        if (this.ship) {
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].shipping = this.ship
          }
        } else {
          return false
        }
      },
      // 建议零售价
      setAdvice() {
        if (this.advicePrice) {
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].msrp = this.advicePrice
          }
        } else {
          return false
        }
      },
      // joom零售价格
      setJoom() {
        if (this.joomPrice) {
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].joomPrice = this.joomPrice
          }
        } else {
          return false
        }
      },
      // joom运费
      setTransport() {
        if (this.transport) {
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].joomShipping = this.transport
          }
        } else {
          return false
        }
      },
      // 运输时间
      setTime() {
        if (this.time) {
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].shippingTime = this.time
          }
        } else {
          return false
        }
      },
      // 更新
      update() {
        const md=JSON.stringify(this.mandatoryData)
        const mr=JSON.stringify(this.randomData)
        const data = {
          basicInfo: {

          },
          skuInfo: []
        }
        data.basicInfo = this.wishForm
        data.basicInfo.extraImages = this.url.join('\\n')
        data.basicInfo.id=this.condition.id
        data.basicInfo.requiredKeywords=md
        data.basicInfo.randomKeywords=mr
        data.skuInfo = this.tableData
        APISaveWishInfo(data).then(res => {
          if (res.data.data[0] === 'success') {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          } else {
            this.$message.error('保存失败')
          }
        })
      },
      // 标记
      handleCommand(command) {
        const data = {
          id: 5,
          plat: []
        }
        if (command === 'a') {
          data.plat = ['wish']
        } else {
          data.plat = ['joom']
        }
        APIFinishPlat(data).then(res => {
          if (res.data.data[0] === 'success') {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          } else {
            this.$message.error('保存失败')
          }
        })
      },
      getData() {
        APIPlatInfo(this.condition).then(res => {
          this.wishForm = res.data.data.basicInfo
          this.tableData = res.data.data.skuInfo
          this.condition.id=this.wishForm.id
          const extraPic = res.data.data.basicInfo.extraImages
          const picture = extraPic.split('\n')[0]
          this.url = picture.split('\\n')
//          this.url.pop()
          this.wishForm.requiredKeywords=JSON.parse(this.wishForm.requiredKeywords)
          this.wishForm.randomKeywords=JSON.parse(this.wishForm.randomKeywords)
//          this.wishForm.mapPersons=this.wishForm.mapPersons.split(",")
//          this.wishForm.dictionaryName=this.wishForm.dictionaryName.split(",")
          if(this.wishForm.headKeywords){
            this.foremost=this.wishForm.headKeywords.length
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
      }
    },
    mounted() {
      this.condition.id = this.$route.params.id
      this.getData()
    }
  }
</script>
<style lang="scss" scoped>
  .image {
    width: 100px;
    height: 90px;
    margin-left: 10px;
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
  .el-form-item{
    margin-bottom: 10px;
  }
  .exportAccount{
    display: block;
    float: left;
    border: #dcdfe6 solid 1px;
    height: 38px;
    line-height: 38px;
    border-left: none;
    background: #fff;
    padding: 0 14px;
    font-size: 13px;
    cursor: pointer;
  }
</style>