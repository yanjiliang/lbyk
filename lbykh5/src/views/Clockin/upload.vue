<template>
    <div>
        <v-header :left-text="`上传${columnName}`"></v-header>

        <div class="upload">
            <div v-if="columnName === '视频'">
                <div class="forPreview_video" v-for="(item, index) in uploadVideoList" :key="index">
                    <video :src="videoSrc"></video>
                    <van-icon name="delete" @click="delBtn(index)" class="delte"/>
                </div>
                <van-uploader v-show="uploadVideoList.length < 2" preview-size="80px" accept="video/*" :before-read="beforeRead" :after-read="afterRead"></van-uploader>
            </div>

            <div v-if="columnName === '文档'">
                <div class="forPreview_doc" v-for="(item, index) in uploadDocList" :key="index"> 
                    <span>{{item.name}}</span>
                    <span>{{item.size | formatSize}}</span>
                    <van-icon name="delete" @click="delBtn(index)" class="delte"/>
                </div>
                <van-uploader v-show="uploadDocList.length < 2" preview-size="80px" accept=".doc, .docx, .xml, .xlsx, .pdf" :before-read="beforeRead" :after-read="afterRead"></van-uploader>
            </div>

            <div v-if="columnName === '音频'">
                <div class="forPreview_audio" v-for="(item, index) in uploadAudioList" :key="index">
                    <span>{{item.name}}</span>
                    <span>{{item.size | formatSize}}</span>
                    <van-icon name="delete" @click="delBtn(index)" class="delte"/>
                </div>
                <van-uploader v-show="uploadAudioList.length < 2" preview-size="80px" accept="audio/*" :before-read="beforeRead" :after-read="afterRead"></van-uploader>
            </div>

            <div v-if="columnName === '图片'">
                <div class="forPreview_pic" v-for="(item, index) in uploadPicList" :key="index">
                    <img :src="picSrc" alt="">
                    <van-icon name="delete" @click="delBtn(index)" class="delte"/>
                </div>
                <van-uploader v-show="uploadPicList.length < 2" accept="image/*" preview-size="80px" :before-read="beforeRead" :after-read="afterRead"></van-uploader>
            </div>

            <div class="diy-submit">
                <van-button @click="doSubmit($event)">提交</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import VHeader from '../../common/header'
    import { uploadFile, addResources} from '../../http/mock'
    import Toast from 'vant'
    export default {
        name: "Upload",
        components: {
            VHeader
        },
        data(){
            return{
                tagList: [],  
                uploadTitle: '',
                currentTag: null,
                tagId: null,
                columnName: localStorage.getItem('columnName'),
                fileIdArr: [],

                uploadVideoList: [],  // 选中的上传视频列表
                videoSrc: '',   // 选中的视频的src，用来显示视频
                uploadDocList: [],  // 选中的上传文档列表
                uploadAudioList: [],  // 选中的上传音频列表
                uploadPicList: [],  // 选中的上传图片列表
                picSrc: '',  // 选中的图片的src，用来显示图片缩略图
            }
        },
        filters: {
            formatSize(val) {  // 格式化文件大小
                if (val > 0) {
                    return (val / 1024 / 1024).toFixed(2) + 'M';
                } else {
                    return '0M';
                }
            },
        },
        methods: {
            // vant上传文件前校验文件事件
            // 文件选中后先提交给后台，后台根据选中的文件，返回数组（这一业务根据后台而定）
            beforeRead(file){
                let formData = new FormData();  // 为上传文件定义一个formData对象
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                let uploadUrl = URL.createObjectURL(file);  // 将选中的上传文件转化为二进制文件，显示在页面上
                if(this.columnName === '视频'){
                    this.uploadVideoList.push(file);
                    this.videoSrc = uploadUrl;
                    // 这里使用foreach是为了将选中的多个文件都添加进定义的formdata变量中
                    this.uploadVideoList.forEach(item => {
                        formData.append(item.name, item)
                    })
                }else if(this.columnName === '文档'){
                    this.uploadDocList.push(file);
                    this.uploadDocList.forEach(item => {
                        formData.append(item.name, item)
                    })
                }else if(this.columnName === '音频'){
                    this.uploadAudioList.push(file);
                    this.uploadAudioList.forEach(item => {
                        formData.append(item.name, item)
                    })
                }else if(this.columnName === '图片'){
                    this.uploadPicList.push(file);
                    this.picSrc = uploadUrl;
                    this.uploadPicList.forEach(item => {
                        formData.append(item.name, item)
                    })
                }


                // formData.append(file.name, file);  // 单个文件上传时可以这么写，上面的foreach就可以删掉
                this.$api.post(uploadFile, formData, config).then(res => {
                    this.fileIdArr = res.data.data;   // 把選中的文件傳送給後台
                }).catch(err => {
                    Toast('文件上傳失敗！')
                })
            },
            // 删除待上传的文件
            delBtn(index){
                if(this.columnName === '视频'){
                    // 先判断当前的选中的索引是否是在有效范围中，如果不是则跳出方法 
                    if(isNaN(index) || index >= this.uploadVideoList.length){
                        return false;
                    }
                    let tmp = [];
                    // 将没被选中的上传文件存放进一个临时数组中
                    for(let i = 0; i < this.uploadVideoList.length; i++){
                        if(this.uploadVideoList[i] !== this.uploadVideoList[index]){
                            tmp.push(this.uploadVideoList[i]);
                        }
                    }
                    // 存放当前未被选中的上传文件
                    this.uploadVideoList = tmp;
                }

                if(this.columnName === '文档'){
                    console.log(this.uploadDocList.length)
                    if(isNaN(index) || index >= this.uploadDocList.length){
                        return false;
                    }
                    let tmp = [];
                    for(let i = 0; i < this.uploadDocList.length; i++){
                        if(this.uploadDocList[i] !== this.uploadDocList[index]){
                            tmp.push(this.uploadDocList[i]);
                        }
                    }
                    this.uploadDocList = tmp;
                }

                if(this.columnName === '音频'){
                    if(isNaN(index) || index >= this.uploadAudioList.length){
                        return false;
                    }
                    let tmp = [];
                    for(let i = 0; i < this.uploadAudioList.length; i++){
                        if(this.uploadAudioList[i] !== this.uploadAudioList[index]){
                            tmp.push(this.uploadAudioList[i]);
                        }
                    }
                    this.uploadAudioList = tmp;
                }

                if(this.columnName === '图片'){
                    if(isNaN(index) || index >= this.uploadPicList.length){
                        return false;
                    }
                    console.log('uuu')
                    let tmp = [];
                    for(let i = 0; i < this.uploadPicList.length; i++){
                        if(this.uploadPicList[i] !== this.uploadPicList[index]){
                            tmp.push(this.uploadPicList[i]);
                        }
                    }
                    this.uploadPicList = tmp;
                }
            },
            doSubmit(){
                let params = {
                    classify: this.tagId,        // 针对视频资源时对应的分类id
                    file: this.fileIdArr,   // 选择完文件后，调用uploadFile这个接口，后端返回的数组
                    resourceColumnId: JSON.parse(localStorage.getItem('columnId')),   // 资源栏目id(视频、图片、音频、文档)
                    title: this.uploadTitle    // 上传时填写的标题
                };
                let columnName = localStorage.getItem('columnName')
                this.$api.post(addResources, params).then(res => {
                    if(res.data.code === 1001){
                        if(columnName === '视频'){
                            this.$router.push({name: 'myVideo'});
                        }else {
                            this.$router.push({name: 'myResourceClassify'});
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
        },
        mounted(){
            this.getClassifyList();
        }
    }
</script>
