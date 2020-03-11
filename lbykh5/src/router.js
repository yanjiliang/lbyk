import Router from 'vue-router'
import Vue from 'vue'

import GoodClass from './views/goodclass/GoodClass.vue'

Vue.use(Router);


const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/msgList',
            name: 'msgList',
            meta: {
                title: '消息'
            },
            component: () => import('./views/msgasist/msgList.vue'),
        },

        {
            path: '/userPrivate',
            name: 'userPrivate',
            meta: {
                title: '蜡笔优课用户隐私政策'
            },
            component: () => import('./views/user/UserPrivate'),
        },

        {
            path: '/userServiceAgreement',
            name: 'userServiceAgreement',
            meta: {
                title: '蜡笔优课用户服务协议'
            },
            component: () => import('./views/user/UserServiceAgreement'),
        },

        {
            path: '/lbykServiceAgreement',
            name: 'lbykServiceAgreement',
            meta: {
                title: '蜡笔优课服务协议'
            },
            component: () => import('./views/user/lbykServiceAgreement.vue'),
        },


        {
            // path: '/joinStore/:storeId/:userId',
            path: '/joinStore',
            name: 'joinStore',
            meta: {
                title: '欢迎加入蜡笔优课'
            },
            component: () => import('./views/join/JoinStore')
        },

        {
            path: '/applySuccess',
            name: 'applySuccess',
            meta: {
                title: '欢迎加入蜡笔优课'
            },
            component: () => import('./views/join/ApplySuccess')
        },

        {
            path: '/GoodClass',
            name: 'goodclass',
            meta: {
                title: '好课'
            },
            component: GoodClass
        },

        {
            path: '/Teacher',
            name: 'Teacher',
            meta: {
                title: '授课老师'
            },
            component: () => import('./views/goodclass/Teacher.vue')
        },

        {
            path: '/classdetail',
            name: 'classdetail',
            meta: {
                title: '课程详情'
            },
            component: () => import('./views/goodclass/ClassDetail.vue')
        },

        {
            path: '/classdetailOrg',
            name: 'classdetailOrg',
            meta: {
                title: '课程详情-机构'
            },
            component: () => import('./views/goodclass/ClassDetailOrg.vue')
        },


        {
            path: '/ClassDetailShare',
            name: 'ClassDetailShare',
            meta: {
                title: '课程详情'
            },
            component: () => import('./views/goodclass/ClassDetailShare.vue')
        },

        {
            // H5课程已下架
            path: '/ClassSoldOut',
            name: 'ClassSoldOut',
            meta: {
                title: '课程已下架'
            },
            component: () => import('./views/goodclass/ClassSoldOut.vue')
        },

        {
            // H5预约失败
            path: '/AppointmentFail',
            name: 'AppointmentFail',
            meta: {
                title: '预约失败'
            },
            component: () => import('./views/goodclass/AppointmentFail.vue')
        },

        {
            // H5预约成功
            path: '/AppointmentSuccess',
            name: 'AppointmentSuccess',
            meta: {
                title: '预约成功'
            },
            component: () => import('./views/goodclass/AppointmentSuccess.vue')
        },

        {
            // APP预约成功
            path: '/OrderSuccessApp',
            name: 'OrderSuccessApp',
            meta: {
                title: '预约成功'
            },
            component: () => import('./views/goodclass/OrderSuccessApp.vue')
        },

        {
            // APP预约失败
            path: '/OrderFaileApp',
            name: 'OrderFaileApp',
            meta: {
                title: '预约失败'
            },
            component: () => import('./views/goodclass/OrderFaileApp.vue')
        },

        {
            // APP课程已下架
            path: '/ClassSoldOutApp',
            name: 'ClassSoldOutApp',
            meta: {
                title: '课程已下架'
            },
            component: () => import('./views/goodclass/ClassSoldOutApp.vue')
        },

        {
            path: '/addorganize',
            name: 'addorganize',
            meta: {
                title: '机构入驻'
            },
            component: () => import('./views/addorganize/Addorganize.vue')
        },

        {
            path: '/OrgIndex',
            name: 'OrgIndex',
            meta: {
                title: '机构主页'
            },
            component: () => import('./views/goodclass/OrgIndex.vue')
        },

        {
            path: '/OrgIndexShare',
            name: 'OrgIndexShare',
            meta: {
                title: '机构主页'
            },
            component: () => import('./views/goodclass/OrgIndexShare.vue')
        },

        {
            path: '/storemanagement',
            name: 'storemanagement',
            meta: {
                title: '门店管理'
            },
            component: () => import('./views/mine/StoreManagement.vue')
        },

        {
            path: '/enrollmentManagement',
            name: 'enrollmentManagement',
            meta: {
                title: '招生管理'
            },
            component: () => import('./views/mine/EnrollmentManagement.vue')
        },

        {
            path: '/myorders',
            name: 'myorders',
            meta: {
                title: '我的预约'
            },
            component: () => import('./views/mine/MyOrders.vue')
        },

        {
            path: '/helpandreport',
            name: 'helpandreport',
            meta: {
                title: '帮助与反馈'
            },
            component: () => import('./views/mine/helpandreport.vue')
        },

        {
            path: '/aboutus',
            name: 'aboutus',
            meta: {
                title: '关于我们'
            },
            component: () => import('./views/mine/aboutus.vue')
        },

        {
            path: '/orderManagement',
            name: 'orderManagement',
            meta: {
                title: '预约管理'
            },
            component: () => import('./views/mine/OrderManagement.vue')
        },

        {
            path: '/OrgIndexMana',
            name: 'OrgIndexMana',
            meta: {
                title: '机构主页-管理'
            },
            component: () => import('./views/mine/OrgIndexMana.vue')
        },

        {
            path: '/classStatement',
            name: 'classStatement',
            meta: {
                title: '课节结算单'
            },
            component: () => import('./views/ClassTime/ClassStatement.vue')
        },

        {
            path: '/activityPage',
            name: 'activityPage',
            meta: {
                title: '首发特惠'
            },
            component: () => import('./views/activity/ActivityPage.vue')
        },

        {
            path: '/PayPage',
            name: 'PayPage',
            meta: {
                title: '支付订单'
            },
            component: () => import('./views/Paypage/PayPage.vue')
        },

        {
            path: '/aliPay',
            name: 'aliPay',
            meta: {
                title: '支付宝支付'
            },
            component: () => import('./views/Paypage/aliPay.vue')
        },
        
        {
            path: '/RenewPage',
            name: 'RenewPage',
            meta: {
                title: '续费'
            },
            component: () => import('./views/Paypage/RenewPage.vue')
        },
        
        {
            path: '/CreateClock',
            name: 'CreateClock',
            meta: {
                title: '创建/编辑打卡'
            },
            component: () => import('./views/Clockin/CreateClock.vue')
        },
        
        {
            path: '/CreateClockMana',
            name: 'CreateClockMana',
            meta: {
                title: '打卡管理'
            },
            component: () => import('./views/Clockin/CreateClockMana.vue')
        },
        
        {
            path: '/QuickToClock',
            name: 'QuickToClock',
            meta: {
                title: '快速打卡'
            },
            component: () => import('./views/Clockin/QuickToClock.vue')
        },

        {
            path: '/ClockDetail',
            name: 'ClockDetail',
            meta: {
                title: '打卡详情'
            },
            component: () => import('./views/Clockin/ClockDetail.vue')
        },
        
    ]
})


router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next()
})

export default router