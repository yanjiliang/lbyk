import Router from 'vue-router'
import Vue from 'vue'

const msgList = () =>
    import ('./views/msgasist/msgList.vue')

const JoinStore = () =>
    import ('./views/join/JoinStore')
const UserPrivate = () =>
    import ('./views/user/UserPrivate')
const UserServiceAgreement = () =>
    import ('./views/user/UserServiceAgreement')
const lbykServiceAgreement = () =>
    import ('./views/user/lbykServiceAgreement.vue')
const ApplySuccess = () =>
    import ('./views/join/ApplySuccess')


import GoodClass from './views/goodclass/GoodClass.vue'
const ClassDetail = () =>
    import ('./views/goodclass/ClassDetail.vue')
const ClassDetailOrg = () =>
    import ('./views/goodclass/ClassDetailOrg.vue')
const ClassDetailShare = () =>
    import ('./views/goodclass/ClassDetailShare.vue')
const OrgIndex = () =>
    import ('./views/goodclass/OrgIndex.vue')
const OrgIndexShare = () =>
    import ('./views/goodclass/OrgIndexShare.vue')
const OrderSuccessApp = () =>
    import ('./views/goodclass/OrderSuccessApp.vue')
const OrderFaileApp = () =>
    import ('./views/goodclass/OrderFaileApp.vue')
const ClassSoldOutApp = () =>
    import ('./views/goodclass/ClassSoldOutApp.vue')



const Addorganize = () =>
    import ('./views/addorganize/Addorganize.vue')
const Teacher = () =>
    import ('./views/goodclass/Teacher.vue')
const ClassSoldOut = () =>
    import ('./views/goodclass/ClassSoldOut.vue')
const AppointmentFail = () =>
    import ('./views/goodclass/AppointmentFail.vue')
const AppointmentSuccess = () =>
    import ('./views/goodclass/AppointmentSuccess.vue')


const StoreManagement = () =>
    import ('./views/mine/StoreManagement.vue')
const EnrollmentManagement = () =>
    import ('./views/mine/EnrollmentManagement.vue')
const OrderManagement = () =>
    import ('./views/mine/OrderManagement.vue')
const MyOrders = () =>
    import ('./views/mine/MyOrders.vue')
const OrgIndexMana = () =>
    import ('./views/mine/OrgIndexMana.vue')
const helpandreport = () =>
    import ('./views/mine/helpandreport.vue')
const aboutus = () =>
    import ('./views/mine/aboutus.vue')


const ClassStatement = () =>
    import ('./views/ClassTime/ClassStatement.vue')


const ActivityPage = () =>
    import ('./views/activity/ActivityPage.vue')


const PayPage = () =>
    import ('./views/Paypage/PayPage.vue')
const aliPay = () =>
    import ('./views/Paypage/aliPay.vue')
const RenewPage = () =>
    import ('./views/Paypage/RenewPage.vue')

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
            component: msgList
        },

        {
            path: '/userPrivate',
            name: 'userPrivate',
            meta: {
                title: '蜡笔优课用户隐私政策'
            },
            component: UserPrivate,
        },

        {
            path: '/userServiceAgreement',
            name: 'userServiceAgreement',
            meta: {
                title: '蜡笔优课用户服务协议'
            },
            component: UserServiceAgreement
        },

        {
            path: '/lbykServiceAgreement',
            name: 'lbykServiceAgreement',
            meta: {
                title: '蜡笔优课服务协议'
            },
            component: lbykServiceAgreement
        },


        {
            // path: '/joinStore/:storeId/:userId',
            path: '/joinStore',
            name: 'joinStore',
            meta: {
                title: '欢迎加入蜡笔优课'
            },
            component: JoinStore
        },

        {
            path: '/applySuccess',
            name: 'applySuccess',
            meta: {
                title: '欢迎加入蜡笔优课'
            },
            component: ApplySuccess
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
            component: Teacher
        },

        {
            path: '/classdetail',
            name: 'classdetail',
            meta: {
                title: '课程详情'
            },
            component: ClassDetail
        },

        {
            path: '/classdetailOrg',
            name: 'classdetailOrg',
            meta: {
                title: '课程详情-机构'
            },
            component: ClassDetailOrg
        },


        {
            path: '/ClassDetailShare',
            name: 'ClassDetailShare',
            meta: {
                title: '课程详情'
            },
            component: ClassDetailShare
        },

        {
            // H5课程已下架
            path: '/ClassSoldOut',
            name: 'ClassSoldOut',
            meta: {
                title: '课程已下架'
            },
            component: ClassSoldOut
        },

        {
            // H5预约失败
            path: '/AppointmentFail',
            name: 'AppointmentFail',
            meta: {
                title: '预约失败'
            },
            component: AppointmentFail
        },

        {
            // H5预约成功
            path: '/AppointmentSuccess',
            name: 'AppointmentSuccess',
            meta: {
                title: '预约成功'
            },
            component: AppointmentSuccess
        },

        {
            // APP预约成功
            path: '/OrderSuccessApp',
            name: 'OrderSuccessApp',
            meta: {
                title: '预约成功'
            },
            component: OrderSuccessApp
        },

        {
            // APP预约失败
            path: '/OrderFaileApp',
            name: 'OrderFaileApp',
            meta: {
                title: '预约失败'
            },
            component: OrderFaileApp
        },

        {
            // APP课程已下架
            path: '/ClassSoldOutApp',
            name: 'ClassSoldOutApp',
            meta: {
                title: '课程已下架'
            },
            component: ClassSoldOutApp
        },

        {
            path: '/addorganize',
            name: 'addorganize',
            meta: {
                title: '机构入驻'
            },
            component: Addorganize
        },

        {
            path: '/OrgIndex',
            name: 'OrgIndex',
            meta: {
                title: '机构主页'
            },
            component: OrgIndex
        },

        {
            path: '/OrgIndexShare',
            name: 'OrgIndexShare',
            meta: {
                title: '机构主页'
            },
            component: OrgIndexShare
        },

        {
            path: '/storemanagement',
            name: 'storemanagement',
            meta: {
                title: '门店管理'
            },
            component: StoreManagement
        },

        {
            path: '/enrollmentManagement',
            name: 'enrollmentManagement',
            meta: {
                title: '招生管理'
            },
            component: EnrollmentManagement
        },

        {
            path: '/myorders',
            name: 'myorders',
            meta: {
                title: '我的预约'
            },
            component: MyOrders
        },

        {
            path: '/helpandreport',
            name: 'helpandreport',
            meta: {
                title: '帮助与反馈'
            },
            component: helpandreport
        },

        {
            path: '/aboutus',
            name: 'aboutus',
            meta: {
                title: '关于我们'
            },
            component: aboutus
        },

        {
            path: '/orderManagement',
            name: 'orderManagement',
            meta: {
                title: '预约管理'
            },
            component: OrderManagement
        },

        {
            path: '/OrgIndexMana',
            name: 'OrgIndexMana',
            meta: {
                title: '机构主页-管理'
            },
            component: OrgIndexMana
        },

        {
            path: '/classStatement',
            name: 'classStatement',
            meta: {
                title: '课节结算单'
            },
            component: ClassStatement
        },

        {
            path: '/activityPage',
            name: 'activityPage',
            meta: {
                title: '首发特惠'
            },
            component: ActivityPage
        },

        {
            path: '/PayPage',
            name: 'PayPage',
            meta: {
                title: '支付订单'
            },
            component: PayPage
        },

        {
            path: '/aliPay',
            name: 'aliPay',
            meta: {
                title: '支付宝支付'
            },
            component: aliPay
        },
        
        {
            path: '/RenewPage',
            name: 'RenewPage',
            meta: {
                title: '续费'
            },
            component: RenewPage
        },
    ]
})


router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next()
})

export default router