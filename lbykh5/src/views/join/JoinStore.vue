<template>

    <div class="join_body_bg">
        <div class="join_card">

            <div class="join_inviter">
                <span class="fl"><img :src=tableData.avatar /></span>
                <span><span>{{tableData.name}}</span>邀请您加入</span>
            </div>

            <div class="join_org">
                <div><img :src=tableData.logo></div>
                <div>{{tableData.storeName}}</div>
                <div>已启用蜡笔优课进行工作协作,请尽快加入</div>
            </div>

            <div class="join_input">
                <div class="join_input_item">
                    <input  type="tel" pattern="[0-9]*" maxlength="11"  class="lb_mobliePhone" v-model="mobliePhone" placeholder="手机号码"
                           @blur="getUser()">
                </div>
                <div class="join_input_item">
                    <div class="code_input fl"><input  type="tel" pattern="[0-9]*"  class="lb_checkCode" v-model="checkCodes"
                                                      maxlength="4" placeholder="验证码"></div>
                    <div class="get_code fr">
                        <span v-show="showTow" style="color:red;">{{count}}s</span>
                        <button v-show="flag" @click="getCheckCode()" :disabled="isDisabled">获取验证码</button>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="join_input_item" v-if="show">
                    <input type="text" class="username" v-model="description" maxlength="7" placeholder="真实姓名">
                </div>

            </div>
            <div class="join_submit">
                <!-- <el-button type="danger" @click="submit(tableData.storeId)">提交</el-button> -->
                <vant-button class="btn" @click="submit(tableData.storeId)">提交</vant-button>
                <!-- 做修改 -->
            </div>
        </div>

        <div class="join_bottom">
            <img src="../../images/JoinStore/lb_Mobile_Login.png"/>
        </div>

    </div>
</template>


<script>
import { Toast } from 'vant'
    export default {

        data() {

            return {
                ip: this.$ip.getIp(),
                tableData: [],
                mobliePhone: '',
                mobliePhoneMessage: '',
                centerDialogVisible: false,
                show: false,
                checkCodes: "",
                description: "",
                showTow: false,
                count: '',
                isDisabled: false,
                flag: true,
            }

        },

        mounted() {
            //var storeId = this.$route.params.storeId; //获取链接中的门店id
            //var userId = this.$route.params.userId;   //获取门店id

            //调用初始化方法
            this.GetRequest();
        },

        methods: {
            GetRequest() {  

                var url = location.search;
                
                //获取url中"?"符后的字串  
                
                var theRequest = new Object(); 
                
                if (url.indexOf("?") != -1) { 
                
                    var str = url.substr(1); 
                    
                    let strs = str.split("&");  
                    
                    for(var i = 0; i < strs.length; i ++) {  
                        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
                        
                    }  
                }  
                let storeId = theRequest.storeId
                let cuid = theRequest.cuid
                this.getDate(storeId,cuid)
                
                } ,
            //获取门店用户数据
            getDate(storeId, userId) {
                var url = this.ip + "store/customerAndStoreInfo?cuid=" + userId + "&storeId=" + storeId;
                this.$http.post(url).then((response => {
                        if (response.body.result == 'success') {
                            this.tableData = response.body.data;
                        }
                    }),
                )
            },

            //点击提交触发方法
            submit(storeIds) {

                if(this.checkCode() == false){
                    return false;
                }

                if (this.mobliePhone == "" || this.mobliePhone.length < 11) {
                    // this.messages("error", "手机号码不能为空,且长度必须为11位!")
                    Toast('手机号码不能为空,且长度必须为11位!')
                    return false;
                }

                if (this.checkCodes == "" || this.checkCodes.length < 4) {
                    // this.messages("error", "验证码不能为空,且验证码长度必须为4位!");
                    Toast('验证码不能为空,且验证码长度必须为4位!')
                    return false;
                }

                //校验姓名
                if (this.show == true) {
                    var nameReg = /^[\u4E00-\u9FA5]{2,5}$/;
                    if (!nameReg.test(this.description)) {
                        // this.messages("error", "姓名格式不正确,姓名为您的真实姓名!")
                        Toast('姓名格式不正确,姓名为您的真实姓名!')
                        return false;
                    }
                }

                // var url = this.ip + "/joining-store/applyByH5";
                var url = this.ip + "joining-store/applyByH5";

                //发送提交请求
                this.$http.post(url, {
                    storeId: storeIds,
                    phone: this.mobliePhone,
                    code: this.checkCodes,
                    name: this.description
                }, {emulateJSON: true}).then((response => {
                        this.aa = response
                        //h5端使用，（0）已注册，(1)未注册, (2)验证码错误 (3)已存在该组织
                        //applicationSuccess(0),//申请成功  noStore(1),//没有门店  storeAuditFailed(2),//门店审核未通过  verificationCodeError(3),//验证码错误  registerError(4),//注册失败
                        //existingStore(5),//已经是门店员工  haveApplied(6),//已经申请
                        // if (response.body.status == 0) {
                        //     //申请成功
                        //     this.$router.push('/applySuccess/0');

                        // } else if (response.body.status == 1) {

                        //     this.$router.push('/applySuccess/1')

                        // } else if (response.body.status == 3) {

                        //     this.$router.push('/applySuccess/0')

                        // } else if (response.body.status == 2) {
                        //     this.messages("error", "验证码错误,或已过期!");
                        // }

                        switch(response.body.data){
                            case 0:
                                //申请成功
                                this.$router.push({path:'/applySuccess',query:{status:0}})
                                
                                break;
                            case 1:
                                //没有门店
                                this.$router.push({path:'/applySuccess',query:{status:1}})
                                break;
                            case 2:
                                //门店审核未通过
                                this.$router.push({path:'/applySuccess',query:{status:2}})
                                break;
                            case 3:
                                //验证码错误
                                Toast("验证码错误,或已过期!");
                                break;
                            case 4:
                                //注册失败
                                this.$router.push({path:'/applySuccess',query:{status:4}})
                                break;
                            case 5:
                                //已经是门店员工
                                this.$router.push({path:'/applySuccess',query:{status:5}})
                                break;
                            case 6:
                                //已经申请
                                this.$router.push({path:'/applySuccess',query:{status:6}})
                                break;
                        }


                    }), (error => {
                        console.log(error.body);
                    })
                )
            },


            //获取验证码
            getCheckCode() {

                //检验手机号码
                if (this.checkCode() == false) {
                    return false;
                }

                //按钮设置状态
                this.isDisabled = true;

                this.flag = false;

                //设置倒计时显示状态
                this.showTow = true;

                var url = this.ip + "smsVerCode/sendCode?phone=" + this.mobliePhone;

                this.$http.post(url, {emulateJson: true}).then()

                //定时
                const TIME_COUNT = 60;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.showTow = true;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.showTow = false;
                            this.flag = true;
                            this.isDisabled = false;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }
                //this.isDisabled = false;

            },


            //检验输入手机号码
            checkCode() {
                if (this.mobliePhone == "") {
                    // this.messages("error", "手机号码不能为空!");
                    Toast('手机号码不能为空!')
                    return false;
                }

                var reg = 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/;
                if (!reg.test(this.mobliePhone)) {
                    // this.messages("error", "号码格式不正确,请输入11位纯数字");
                    // Notify({ type: 'warning', message: '号码格式不正确,请输入11位纯数字' ,duration:1000});
                    Toast('号码格式不正确,请输入11位纯数字')
                    return false;
                }
                return true;
            },


            //获取用户信息
            getUser() {

                //检验手机号码文本框
                if (this.checkCode() == false) {
                    return false;
                }
                var url = this.ip + "customer/checkByPhone?phone=" + this.mobliePhone;
                this.$http.post(url, {emulateJson: true}).then((response => {
                        if (response.body.data == true) {
                            console.log("已注册");
                            this.show = false;
                        } else {
                            this.show = true;
                        }
                    }), (response => {
                        console.log(response.body.data);
                    }),
                )
            },

            
        }
    }

</script>

<style scoped>
    @import url(../../../public/reset.css);
    @import url(../../css/join/JoinStore.css);
</style>


