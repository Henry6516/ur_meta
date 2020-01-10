import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'
import Home from '../views/Home.vue'
import index from '../views/index.vue'
import prize from '../views/prize.vue'
// 毛利润报表
import sell from '../views/reports/sell.vue'
import develop from '../views/reports/develop.vue'
import purchase from '../views/reports/purchase.vue'
import artist from '../views/reports/artist.vue'
import account from '../views/reports/account.vue'
import trending from '../views/reports/trending.vue'
import introduce from '../views/reports/introduce.vue'
import limit from '../views/reports/limit.vue'
import profit from '../views/reports/profit.vue'
import history from '../views/reports/history.vue'
// 数据中心
import stock from '../views/data/stock.vue'
import pcost from '../views/data/pcost.vue'
import perform from '../views/data/perform.vue'
import psales from '../views/data/psales.vue'
import saleschange from '../views/data/saleschange.vue'
import ptrend from '../views/data/pricetrend.vue'
import weight from '../views/data/weight.vue'
import delay from '../views/data/delay.vue'
import productdoc from '../views/data/productdoc.vue'
import saledoc from '../views/data/saledoc.vue'
import logisticsdoc from '../views/data/logisticsdoc.vue'
import shortagedoc from '../views/data/shortagedoc.vue'
import inventory from '../views/data/inventory.vue'
import departInventory from '../views/data/departInventory.vue'
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
import ukfic2 from '../views/tinytool/ukfic2.vue'
import order from '../views/tinytool/order.vue'
import paypal from '../views/tinytool/paypal.vue'
import risk from '../views/tinytool/risk.vue'
import risk1 from '../views/tinytool/risk1.vue'
import fixPrice from '../views/tinytool/fixPrice.vue'
import unusual from '../views/tinytool/unusual.vue'
import flow from '../views/tinytool/flow.vue'
import edition from '../views/tinytool/edition.vue'
import logistics from '../views/tinytool/logistics.vue'
import modify from '../views/tinytool/modify.vue'
import prescription from '../views/tinytool/prescription.vue'
import ukxn from '../views/tinytool/ukxn.vue'
import ukzc from '../views/tinytool/ukzc.vue'
import auzc from '../views/tinytool/auzc.vue'
import joomtool from '../views/tinytool/joomtool.vue'
import bidding from '../views/tinytool/bidding.vue'
import ebayBalance from '../views/tinytool/ebayBalance.vue'
import ukxnhw from '../views/tinytool/ukxnhw.vue'
// 设置中心
import deadFee from '../views/settings/deadFee.vue'
import operationFee from '../views/settings/operationFee.vue'
import exchange from '../views/settings/exchange.vue'
// 仓库工具
import picking from '../views/warehouse/picking.vue'
import splitcargo from '../views/warehouse/splitCargo.vue'
import pickStatistics from '../views/warehouse/pickStatistics.vue'
import pickStatisticsTable from '../views/warehouse/pickStatisticsTable.vue'
import skupick from '../views/warehouse/skupick.vue'
// 反馈中心
import requirements from '../views/feedback/requirements.vue'
import news from '../views/feedback/news.vue'
import logs from '../views/feedback/log.vue'
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
import basicInformationpaypal from '../views/productDevelop/basicInformationPay.vue'
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
import developShow from '../views/productDevelop/developShow.vue'
import categoryShow from '../views/productDevelop/categoryShow.vue'
import sale from '../views/productDevelop/sale.vue'
import wishShow from '../views/productDevelop/wishShow.vue'
import stockUp from '../views/productDevelop/stockUp.vue'
import nostockUp from '../views/productDevelop/nostockUp.vue'
import limite from '../views/productDevelop/limite.vue'
import productStock from '../views/productDevelop/productStock.vue'
import productShow from '../views/productDevelop/productShow.vue'
import saleProduct from '../views/productDevelop/saleProduct.vue'
import global from '../views/productDevelop/global.vue'
import developTrend from '../views/productDevelop/developTrend.vue'
import ebayRecommendEdit from '../views/productDevelop/ebayRecommendEdit.vue'
// 数据采集
import collection from '../views/productDevelop/collection.vue'
import collectionJoom from '../views/productDevelop/collectionJoom.vue'
import joomId from '../views/productDevelop/collectionJoomDetails.vue'
import joomRelation from '../views/productDevelop/joomRelation.vue'
import joomSubscribe from '../views/productDevelop/joomSubscribe.vue'
import joomSubscribeId from '../views/productDevelop/joomSubscribeId.vue'
import joomSubscribeShop from '../views/productDevelop/joomSubscribeShop.vue'
import joomSubscribeIdShop from '../views/productDevelop/joomSubscribeIdShop.vue'
// 报表中心
import reportForm from '../views/productDevelop/reportForm.vue'
import formEdit from '../views/productDevelop/formEdit.vue'
// 产品引擎
import proRecommend from '../views/analysis/proRecommend.vue'
import proAnalysis from '../views/analysis/proAnalysis.vue'
import mySubscribe from '../views/analysis/mySubscribe.vue'
import pushRules from '../views/analysis/pushRules.vue'
import ebayRule from '../views/analysis/ebayRule.vue'
import distributionRule from '../views/analysis/distributionRule.vue'
import reportFormPro from '../views/analysis/reportFormPro.vue'
import repeatTesting from '../views/analysis/repeatTesting.vue'
import recommendWish from '../views/analysis/recommendWish.vue'
import recommendEbay from '../views/analysis/recommendEbay.vue'

const routes = [
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true
  },
  {
    path: '/prize',
    component: prize,
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
        path: '/v1/report/dev-goods-profit',
        component: profit,
        name: '开发产品利润表'
      },
      {
        path: '/v1/report/account',
        component: account,
        name: '账号产品利润报表'
      },
      {
        path: '/v1/report/history-sales-profit',
        component: history,
        name: '历史利润表'
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
        path: '/v1/data-center/product',
        component: productdoc,
        name: '产品'
      },
      {
        path: '/v1/data-center/stock-status',
        component: inventory,
        name: '库存情况'
      },
      {
        path: '/v1/data-center/stock-depart-detail',
        component: departInventory,
        name: '部门库存情况'
      },
      {
        path: '/v1/data-center/sales',
        component: saledoc,
        name: '销售'
      },
      {
        path: '/v1/data-center/logistics',
        component: logisticsdoc,
        name: '物流'
      },
      {
        path: '/v1/data-center/shortage',
        component: shortagedoc,
        name: '缺货'
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
    path: '/v1/products-engine/index',
    component: Home,
    name: '产品引擎',
    iconCls: 'el-icon-message',
    children: [
      {
        path: '/v1/products-engine/recommend',
        component: proRecommend,
        name: '商品推荐',
        children: [
          {
            path: '/v1/products-engine/recommendWish',
            component: recommendWish,
            name: '每日推荐wish'
          },
          {
            path: '/v1/products-engine/recommendEbay',
            component: recommendEbay,
            name: '每日推荐ebay'
          }
        ]
      },
      {
        path: '/v1/products-engine/watch',
        component: mySubscribe,
        name: '我的订阅'
      },
      {
        path: '/v1/products-engine/rule',
        component: pushRules,
        name: '规则推送'
      },
      {
        path: '/v1/products-engine/dev-cat',
        component: ebayRule,
        name: 'ebay规则'
      },
      {
        path: '/v1/products-engine/dashboard',
        component: reportFormPro,
        name: '统计报表'
      },
      {
        path: '/v1/products-engine/image-inspect',
        component: repeatTesting,
        name: '去重检测'
      },
      {
        path: '/v1/products-engine/analysis',
        component: proAnalysis,
        name: '商品分析'
      },
      {
        path: '/v1/products-engine/dispatch-rule',
        component: distributionRule,
        name: '分配规则'
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
        path: '/v1/warehouse-tools/pick-tools',
        component: picking,
        name: '拣货单'
      },
      {
        path: '/v1/warehouse-tools/pick-statistics',
        component: pickStatistics,
        name: '拣货统计'
      },
      {
        path: '/v1/warehouse-tools/ware-statistics',
        component: pickStatisticsTable,
        name: '拣货统计报表'
      },
      {
        path: '/v1/warehouse-tools/ware-sku',
        component: skupick,
        name: '仓位SKU对应表'
      },
      {
        path: '/v1/warehouse-tools/sort-tools',
        component: splitcargo,
        name: '分货单'
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
      },
      {
        path: '/v1/update-log/index',
        component: logs,
        name: '更新日志'
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
        path: '/v1/tiny-tool/fix-price',
        component: fixPrice,
        name: '海外仓定价器',
        children: [
          {
            path: '/',
            component: ukfic2,
            name: '默认'
          },
          {
            path: '/v1/tiny-tool/keyword-analysis',
            component: bidding,
            name: '竞品分析'
          },
          {
            path: '/v1/tiny-tool/uk-fic',
            component: ukfic,
            name: 'UK虚拟仓定价器'
          },
          {
            path: '/v1/tiny-tool/uk-fic2',
            component: ukfic2,
            name: '欧洲虚拟仓定价器'
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
            path: '/v1/tiny-tool/ebay-virtual-store',
            component: modify,
            name: 'eBay海外仓修改在线数量'
          },
          {
            path: '/v1/tiny-tool/uk-replenish',
            component: ukxn,
            name: 'uk虚拟仓补货'
          },
          {
            path: '/v1/tiny-tool/uk-virtual-replenish',
            component: ukxnhw,
            name: 'uk虚拟仓海外仓补货'
          },
          {
            path: '/v1/tiny-tool/au-real-replenish',
            component: ukzc,
            name: 'uk真仓补货'
          },
          {
            path: '/v1/tiny-tool/uk-real-replenish',
            component: auzc,
            name: 'AU真仓补货'
          }
        ]
      },
      {
        path: '/v1/tiny-tool/exception',
        component: unusual,
        name: '风险异常'
      },
      {
        path: '/v1/tiny-tool/logistics-tool',
        component: flow,
        name: '物流工具'
      },
      {
        path: '/v1/tiny-tool/fyndiqz-upload',
        component: fyndiqzUpload,
        name: '产品上传'
      },
      {
        path: '/v1/tiny-tool/joom-tool',
        component: joomtool,
        name: 'JOOM小工具'
      },
      {
        path: '/v1/tiny-tool/declared-value',
        component: order,
        name: '修改订单申报价'
      },
      {
        path: '/v1/tiny-tool/ebay-balance',
        component: ebayBalance,
        name: 'ebay账号余额'
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
        path: '/v1/tiny-tool/blacklist',
        component: risk1,
        name: '黑名单'
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
      },
      {
        path: '/v1/tiny-tool/express-expired',
        component: prescription,
        name: '物流时效'
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
        path: '/v1/oa-goodsinfo/ebayEdit',
        component: ebayRecommendEdit,
        name: '智能推荐跳转'
      },
      {
        path: '/v1/oa-goodsinfo/index',
        component: goodsNav,
        name: '产品资料',
        children: [
          {
            path: '/v1/oa-goodsinfo/indexIfo',
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
          }
        ]
      },
      {
        path: '/v1/oa-data-mine/index',
        component: collection,
        name: '数据采集',
        children: [
          {
            path: '/v1/oa-data-mine/collectionJoom',
            component: collectionJoom,
            name: 'Joom'
          },
          {
            path: '/v1/oa-data-mine/joom-cate-mine-index',
            component: joomSubscribe,
            name: 'Joom订阅'
          },
          {
            path: '/v1/oa-data-mine/joom-store-mine-index',
            component: joomSubscribeShop,
            name: 'Joom店铺订阅'
          },
          {
            path: '/joom/:id',
            component: joomId,
            name: 'joomId'
          },
          {
            path: '/joomSubscribeId/:id',
            component: joomSubscribeId,
            name: 'joomSubscribeId'
          },
          {
            path: '/joomSubscribeIdShop/:id',
            component: joomSubscribeIdShop,
            name: 'joomSubscribeIdShop'
          },
          {
            path: '/joomRelation/:id',
            component: joomRelation,
            name: 'joomRelation'
          }
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
        path: '/v1/basic-info/paypal',
        component: basicInformationpaypal,
        name: 'paypal'
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
      },
      {
        path: '/v1/oa-data/product',
        component: reportForm,
        name: '报表中心',
        children: [
          {
            path: '/v1/oa-data/dev-perform',
            component: developShow,
            name: '开发表现'
          },
          {
            path: '/v1/oa-data/cat-perform',
            component: categoryShow,
            name: '类目表现'
          },
          {
            path: '/v1/oa-data/sales',
            component: sale,
            name: '销售产品列表'
          },
          {
            path: '/v1/oa-data/wish',
            component: wishShow,
            name: 'wish待刊登'
          },
          {
            path: '/v1/report/dev-limit',
            component: limite,
            name: '开发款数限制'
          },
          {
            path: '/v1/oa-data/stock',
            component: stockUp,
            name: '备货产品表现'
          },
          {
            path: '/v1/oa-data/product-perform',
            component: productShow,
            name: '产品表现'
          },
          {
            path: '/v1/oa-data/sales-perform',
            component: saleProduct,
            name: '销售产品表现'
          },
          {
            path: '/v1/oa-data/stock-perform',
            component: productStock,
            name: '备货产品库存'
          },
          {
            path: '/v1/oa-data/global-market',
            component: global,
            name: '全球市场分析'
          },
          {
            path: '/v1/oa-data/dev-data',
            component: developTrend,
            name: '开发趋势图'
          },
          {
            path: '/v1/oa-data/nonstock',
            component: nostockUp,
            name: '不备货产品表现'
          }
        ]
      },
      {
        path: '/form/:id',
        component: formEdit,
        name: 'formTable'
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
