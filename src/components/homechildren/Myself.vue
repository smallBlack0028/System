<template>
  <!-- 面包屑导航区 -->
  <div class="container">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb> -->
    <el-divider></el-divider>
    <!-- 个人信息内容 -->
    <!-- 图片区域 -->
    <div>
      <div class="block" style="width: 600px; box-shadow: 1px 1px 1px gray;">
        <el-image :src="src"></el-image>
        <div class="info" style="height: 150px; background-color: rgba(58, 58, 36, 0.863); margin-top: -25px;">
          <h2 style="font-weight: 500px; font-size: 24px; width: 100%; margin: 0 0 0 100px; padding-top: 40px; color: #ffffff;">
            {{info.user_name}}
          </h2>
        </div>
      </div>
      <div class="content">
        <i  class="el-icon-guide"><span>{{info.account_number}}</span></i><span class="editor" @click="updatamessage()">编辑资料</span><br>
        <i  class="el-icon-phone-outline"><span>{{info.mobile}}</span></i><br>
        <i  class="el-icon-user"><span>{{info.gender}}</span><span>{{info.grade}}</span><span>{{info.class}}</span><span>{{info.qq}}</span></i><br>
        <i  class="el-icon-message"><span>{{info.email}}</span></i><br>
        <!-- <el-divider style="margin-top: 10000px;"></el-divider> -->
        <div>
          <div class="block">
            <el-carousel height="310px" style="margin-top: 59px;">
              <el-carousel-item v-for="item in imgagesList" :key="item">
                <img :src="item" alt="">
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改信息对话框 -->
    <el-dialog
      title="修改信息"
      :visible.sync="changedialogVisible"
      width="50%"
      @close="changedialogclosed"
    >
      <el-form
        :model="messageform"
        :rules="ruleFormRules"
        ref="ruleFormRef"
        label-width="70px"
        class="demo-ruleForm"
      >
       <el-form-item
          label="手机号"
          prop="mobile"
        >
          <el-input v-model="messageform.mobile"></el-input>
        </el-form-item>
        <el-form-item
          label="用户名"
          prop="user_name"
        >
          <el-input v-model="messageform.user_name"></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input v-model="messageform.email"></el-input>
        </el-form-item>
        <el-form-item
          label="年级"
          prop="grade"
        >
          <el-input v-model="messageform.grade"></el-input>
        </el-form-item>
        <el-form-item
          label="班级"
          prop="class"
        >
          <el-input v-model="messageform.class"></el-input>
        </el-form-item>
        <el-form-item
          label="性别"
          prop="gender"
        >
          <el-radio
            v-model="messageform.gender"
            label="男"
          >男</el-radio>
          <el-radio
            v-model="messageform.gender"
            label="女"
          >女</el-radio>
        </el-form-item>
        <el-form-item
          label="QQ"
          prop="qq"
        >
          <el-input v-model="messageform.qq"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changemessage">确 定</el-button>
        <el-button @click="changedialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// 导入时间格式组件
import moment from 'moment';
import 'moment/locale/zh-cn'
moment.locale('zh-cn');
export default {
  data() {
    // 验证邮箱规则
    var checkEmail = (rule, value, cb) => {
      const regemail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if (regemail.test(value)) {
        //  邮箱合法
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    // 验证手机号规则
    var checkPhone = (rule, value, cb) => {
      const regphone = /^[1][3,4,5,7,8][0-9]{9}$/
      if (regphone.test(value)) {
        //  手机号合法
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      // 初始化列表信息
      info: [],
      timer: '',
      // 图片
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      // 走马灯背景
      imgagesList: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605597897824&di=a5f45312849f230c4673db4c3aec30fa&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201307%2F24%2F20130724214943_3yXjd.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605597897826&di=0f3f51e6725ba48a9b0aecc2a8db52a0&imgtype=0&src=http%3A%2F%2Fww3.sinaimg.cn%2Flarge%2Fd75e3906jw1ecmce9bfdwj20y80jvqd6.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605597897822&di=57e10ca6863b17fa2a049f979026a4fc&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171011%2Fd25da91c966b415fb8bab79f6bc43a9f.jpeg',
      ],
      // 控制修改信息对话框得显示与隐藏
      changedialogVisible: false,
      //查询到的信息对象
      messageform: [],
      // 修改表单的验证规则
      ruleFormRules: {
        user_name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        grade: [
          { required: true, message: '请输入年级', trigger: 'blur' }
        ],
        class: [
          { required: true, message: '请输入班级', trigger: 'blur' }
        ],
        gender: [
          { checked: true, message: '请输入性别', trigger: 'blur' }
        ],
        qq: [
          { required: true, message: '请输入QQ', trigger: 'blur' },
          { min: 9, max: 10, message: '长度在 9 到 10 个字符', trigger: 'blur' }
        ]

      }
    }
  },
  created() {
    this.getpersonlist(),
    document.title="Personal information"
  },
  methods: {
    // 获取个人信息数据
    getpersonlist() {
      this.$http.get('myself')
        .then(res => {
          // 获取到的数据传递给列表
          this.info = res.data.data;
          this.timer = moment(new Date(info.register_time)).format('YYYY-MM-DD HH:mm:ss');
          // console.log(timer)
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
    },
    // 点击修改按钮，获取信息
    updatamessage() {
      this.changedialogVisible = true
      this.$http.get('myself')
        .then(res => {
          this.messageform = res.data.data;
          if (res.data.meta.success !== true) {
            return this.$message.error('查询用户信息失败')
          }
        })
    },
    // 监听修改信息对话框的关闭事件
    changedialogclosed() {
      this.$refs.ruleFormRef.resetFields()
    },
    // 点击确定按钮，发送请求，并进行预校验
    changemessage() {
      this.$refs.ruleFormRef.validate(valid => {
        if (!valid) return  // 发起修改信息的网络请求
        this.$http.put('myself', this.messageform)
          .then(res => {
            if (res.data.meta.success === true) {
              this.$message.success('更新信息成功')
                // 刷新数据
             this.getpersonlist()
            }else{
              this.$message.error('更新信息失败')
            }
          })
           // 点击确定关闭对话框
            this.changedialogVisible = false
            
      })
    }
  },
}
</script>
<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.iconEdit {
  background-color: rgba(231, 135, 9, 0.452);
  margin: 0 35px;
  border-style: none;
}
.iconEdit:hover {
  background-color: gray;
}
/* 右侧内容的样式 */
.content {
  width: 500px; 
  height: 502px; 
  margin-left: 600px;
  margin-top: -529px;
  background-color: #ffffff;
  border-right: 1px solid #000000;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
  box-shadow: 1px 1px 1px gray;
  padding-top: 25px;
}
i {
  padding-top: 15px;
  padding-left: 35px;
  
}
.content span {
  padding-left: 25px;
  color: #000000;
  font-weight: 400;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.content .editor {
  font-size: 14px;
  cursor: pointer;
  margin-left: 160px;
  color: cornflowerblue;
}

/* 走马灯样式  */
.el-carousel__item h3 {
    color: #000000;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

/* .el-carousel__item:nth-child(2n) {
    background-image: url(../../assets/images/loginBg.jpg);
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
} */
</style>