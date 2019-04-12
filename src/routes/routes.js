import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'
import Home from '../views/Home.vue'
import index from '../views/index.vue'
// 毛利润报表
import sell from '../views/reports/sell.vue'
import develop from '../views/reports/develop.vue'
import purchase from '../views/reports/purchase.vue'
import artist from '../views/reports/artist.vue'
import account from '../views/reports/account.vue'
import trending from '../views/reports/trending.vue'
import introduce from '../views/reports/introduce.vue'
// 数据中心
import stock from '../views/data/stock.vue'
import pcost from '../views/data/pcost.vue'
import perform from '../views/data/perform.vue'
import psales from '../views/data/psales.vue'
import saleschange from '../views/data/saleschange.vue'
import ptrend from '../views/data/pricetrend.vue'
import weight from '../views/data/weight.vue'
import delay from '../views/data/delay.vue'
// 销售工具
import ebay from '../views/tool/ebay.vue'
import ebaysku from '../views/tool/ebaysku.vue'
import wishsku from '../views/tool/wishsku.vue'
import smtsku from '../views/tool/smtsku.vue'
// UR小工具
import express from '../views/tinytool/express.vue'
import brand from '../views/tinytool/brand.vue'
import fyndiqzUpload from '../views/tinytool/fyndiqzUpload.vue'
import goods from '../views/tinytool/goods.vue'
import uk from '../views/tinytool/uk.vue'
import au from '../views/tinytool/au.vue'
import ukfic from '../views/tinytool/ukfic.vue'
import order from '../views/tinytool/order.vue'
import paypal from '../views/tinytool/paypal.vue'
import risk from '../views/tinytool/risk.vue'
import edition from '../views/tinytool/edition.vue'
import logistics from '../views/tinytool/logistics.vue'
// 设置中心
import deadFee from '../views/settings/deadFee.vue'
import operationFee from '../views/settings/operationFee.vue'
import exchange from '../views/settings/exchange.vue'
//仓库工具
import picking from '../views/warehouse/picking.vue'
// 反馈中心
import requirements from '../views/feedback/requirements.vue'
import news from '../views/feedback/news.vue'
// 产品中心
import goodsNav from '../views/productDevelop/goodsNav.vue'
import productRecommend from '../views/productDevelop/productRecommend.vue'
import productApprove from '../views/productDevelop/productApprove.vue'
import goodsInfo from '../views/productDevelop/goodsInfo.vue'
import goodsInfoPicture from '../views/productDevelop/goodsInfoPicture.vue'
import goodsInfoPlatform from '../views/productDevelop/goodsInfoPlatform.vue'
import edit from '../views/productDevelop/edit.vue'
import picEdit from '../views/productDevelop/picEdit.vue'
import platEdit from '../views/productDevelop/platEdit.vue'
import supplierManagement from '../views/productDevelop/supplierManagement.vue'
import supplierProduct from '../views/productDevelop/supplierProduct.vue'
import basicInformation from '../views/productDevelop/basicInformation.vue'
import basicInformationeBay from '../views/productDevelop/basicInformationeBay.vue'
import basicInformationJoom from '../views/productDevelop/basicInformationJoom.vue'
import basicInformationJoomYs from '../views/productDevelop/basicInformationJoomYs.vue'
import basicInformationJw from '../views/productDevelop/basicInformationJw.vue'
import basicInformationArt from '../views/productDevelop/basicInformationArt.vue'
import paymentDetailed from '../views/productDevelop/paymentDetailed.vue'
import paymentId from '../views/productDevelop/paymentId.vue'
import ordermanage from '../views/productDevelop/ordermanage.vue'
import ord1 from '../views/productDevelop/ord1.vue'
import ord2 from '../views/productDevelop/ord2.vue'
import paymentDetail from '../views/productDevelop/paymentDetail.vue'

const routes = [
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true
  },
  {
    path: '/404',
    component: NotFound,
    name: '主页'
  },
  {
    path: '/site/index',
    component: Home,
    name: '毛利润报表',
    iconCls: 'el-icon-message',
    children: [
      {
        path: '/v1/report/sales',
        component: sell,
        name: '销售毛利润报表'
      },
      {
        path: '/develop',
        component: develop,
        name: '开发毛利润报表'
      },
      {
        path: '/purchase',
        component: purchase,
        name: '采购毛利润报表'
      },
      {
        path: '/artist',
        component: artist,
        name: '美工毛利润报表'
      },
      {
        path: '/v1/report/introduce',
        component: introduce,
        name: '推荐人毛利报表'
      },
      {
        path: '/v1/report/account',
        component: account,
        name: '账号产品利润报表'
      },
      {
        path: '/v1/report/sales-trend',
        component: trending,
        name: '销售额走势'
      },
      {
        path: '/index',
        component: index,
        name: '首页',
        hidden: true
      }
    ]
  },
  {
    path: '/v1/data-center/options',
    component: Home,
    name: '数据中心',
    iconCls: 'el-icon-message',
    children: [
      {
        path: '/v1/perform/cost',
        component: pcost,
        name: '平台物流费用'
      },
      {
        path: '/v1/data-center/out-of-stock-info',
        component: stock,
        name: '缺货产品分析'
      },
      {
        path: '/v1/perform/perform',
        component: perform,
        name: '新品开发表现'
      },
      {
        path: '/v1/perform/sales',
        component: psales,
        name: '销售变化表'
      },
      {
        path: '/v1/data-center/sales-change',
        component: saleschange,
        name: '销量环比变化'
      },
      {
        path: '/v1/data-center/price-trend',
        component: ptrend,
        name: '价格指数分析'
      },
      {
        path: '/v1/data-center/weight-diff',
        component: weight,
        name: '重量差异对比'
      },
      {
        path: '/v1/data-center/delay-delivery',
        component: delay,
        name: '延迟发货率分析'
      }
    ]
  },
  {
    path: '/site/index',
    component: Home,
    name: '销售工具',
    iconCls: 'el-icon-message',
    children: [
      {
        path: '/v1/tool/ebay-template',
        component: ebay,
        name: 'eBay销售工具'
      },
      {
        path: '/v1/tool/ebaysku-template',
        component: ebaysku,
        name: 'eBay工具'
      },
      {
        path: '/v1/tool/wishsku-template',
        component: wishsku,
        name: 'Wish工具'
      },
      {
        path: '/v1/tool/smtsku-template',
        component: smtsku,
        name: 'SMT工具'
      }
    ]
  },
  {
    path: '/v1/settings/options',
    component: Home,
    name: '设置中心',
    iconCls: 'el-icon-message',
    children: [
      {
        path: '/v1/settings/dev-dead-fee',
        component: deadFee,
        name: '死库费用'
      },
      {
        path: '/v1/settings/dev-operate-fee',
        component: operationFee,
        name: '运营杂费'
      },
      {
        path: '/v1/settings/exchange',
        component: exchange,
        name: '美元设置'
      }
    ]
  },
  {
    path: '/v1/warehouse-tools/index',
    component: Home,
    name: '仓库工具',
    iconCls: 'el-icon-message',
    children: [
      {
        path: '/v1/warehoue-tools/pick-index',
        component: picking,
        name: '拣货单'
      }
    ]
  },
  {
    path: '/v1/feedback/index',
    component: Home,
    name: '反馈中心',
    iconCls: 'el-icon-message',
    children: [
      {
        path: '/v1/requirements/index',
        component: requirements,
        name: '需求管理'
      },
      {
        path: '/v1/news/index',
        component: news,
        name: '公告管理'
      }
    ]
  },
  {
    path: '/v1/tiny-tool/options',
    component: Home,
    name: 'UR小工具',
    iconCls: 'el-icon-message',
    children: [
      {
        path: '/v1/tiny-tool/express',
        component: express,
        name: '物流查询网址'
      },
      {
        path: '/v1/tiny-tool/brand',
        component: brand,
        name: '品牌列表'
      },
      {
        path: '/v1/tiny-tool/goods-picture',
        component: goods,
        name: '产品一览表'
      },
      {
        path: '/v1/tiny-tool/fyndiqz-upload',
        component: fyndiqzUpload,
        name: '产品上传'
      },
      {
        path: '/v1/tiny-tool/uk-fic',
        component: ukfic,
        name: 'UK虚拟仓定价器'
      },
      {
        path: '/v1/tiny-tool/uk',
        component: uk,
        name: 'UK真仓定价'
      },
      {
        path: '/v1/tiny-tool/au',
        component: au,
        name: 'AU真仓定价'
      },
      {
        path: '/v1/tiny-tool/declared-value',
        component: order,
        name: '修改订单申报价'
      },
      {
        path: '/v1/tiny-tool/exception-pay-pal',
        component: paypal,
        name: '异常paypal列表'
      },
      {
        path: '/v1/tiny-tool/risk-control',
        component: risk,
        name: '风险控制'
      },
      {
        path: '/v1/tiny-tool/exception-edition',
        component: edition,
        name: '异常改订单'
      },
      {
        path: '/v1/tiny-tool/express-tracking',
        component: logistics,
        name: '物流跟踪'
      }
    ]
  },
  {
    path: '/v1/oa-goods/list',
    component: Home,
    name: '产品中心',
    iconCls: 'el-icon-message',
    children: [
      {
        path: '/v1/oa-goods/list',
        component: productRecommend,
        name: '产品开发'
      },
      {
        path: '/v1/check/check-list',
        component: productApprove,
        name: '产品审批'
      },
      {
        path: '/v1/oa-goodsinfo/index',
        component: goodsNav,
        name: '产品资料',
        children: [
          {
            path: '/v1/oa-goodsinfo/index',
            component: goodsInfo,
            name: '属性信息'
          },
          {
            path: '/v1/oa-goodsinfo/goodsInfoPicture',
            component: goodsInfoPicture,
            name: '图片信息'
          },
          {
            path: '/v1/oa-goodsinfo/goodsInfoPlatform',
            component: goodsInfoPlatform,
            name: '平台信息'
          },
          {
            path: '/:id',
            component: edit,
            name: 'tables'
          },
          {
            path: '/table/:id',
            component: picEdit,
            name: 'pictureTable'
          },
          {
            path: '/plat/:id',
            component: platEdit,
            name: 'platTable'
          },
        ]
      },
      {
        path: '/v1/supplier/supplier-list',
        component: supplierManagement,
        name: '供应商管理'
      },
      {
        path: '/v1/supplier/supplier-goods-list',
        component: supplierProduct,
        name: '供应商产品管理'
      },
      {
        path: '/v1/basic-info/ebay-suffix',
        component: basicInformation,
        name: '基本信息'
      },
      {
        path: '/v1/basic-info/ebay',
        component: basicInformationeBay,
        name: 'ebay'
      },
      {
        path: '/v1/basic-info/joom',
        component: basicInformationJoom,
        name: 'joom'
      },
      {
        path: '/v1/basic-info/ys',
        component: basicInformationJoomYs,
        name: 'ebay运输'
      },
      {
        path: '/v1/basic-info/jw',
        component: basicInformationJw,
        name: 'Joom和Wish价格对比'
      },
      {
        path: '/v1/basic-info/art',
        component: basicInformationArt,
        name: '开发采购美工对应关系'
      },
      {
        path: '/v1/supplier/mx',
        component: paymentDetailed,
        name: '付款明细'
      },
      {
        path: '/v1/supplier/gl',
        component: ordermanage,
        name: '供应商订单'
      },
      {
        path: '/v1/basic-info/cgd',
        component: paymentDetail,
        name: '同步采购单'
      },
      {
        path: '/ord1/:id',
        component: ord1,
        name: '订单明细'
      },
      {
        path: '/ord2/:id',
        component: ord2,
        name: '付款明细2'
      },
      {
        path: '/payment/:id',
        component: paymentId,
        name: 'payment'
      }
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: {
      path: '/404'
    }
  }
]

export default routes