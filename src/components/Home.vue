<template>
  <el-container class="container">
    <!-- 首部 -->
    <el-header style="background-color:#f5f5f5;">
      <div>
        <img src="../assets/images/log.jpg" style="border-radius: 10px;">
        <!-- <span>团队</span><br> -->
        <span style="font-size: 14px; color: #000000; cursor: default;margin-left: 1300px;">{{user_name}}</span>
      </div>
      <el-button @click="loginout" style="margin-right: -20px;">退出</el-button>
    </el-header>
    <el-container>
      <!-- 左侧内容区 -->
      <el-aside :width="istoggle ? '64px':'230px'" style="background-color: #f5f5f5;">
        <!-- <div
          class="toggle-button"
          @click="togglefoldopen"
        >|||</div> -->
        <!-- 侧边栏区域 -->
        <el-menu
          background-color="#f5f5f5"
          text-color="#000000"
          active-text-color="#ffd04b"
          :collapse="istoggle"
          :collapse-transition="false"
          :router="true"
          default-active="$router.path"
          unique-opened
        >

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-comment"></i>
              <span>我的</span>
            </template>
            <el-menu-item index="/myself">
              <i class="el-icon-user-solid"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>成员</span>
            </template>
            <el-menu-item index="/members">
              <i class="el-icon-user"></i>
              <span slot="title">成员信息</span>
            </el-menu-item>
          </el-submenu>
  
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-message-solid"></i>
              <span>动态</span>
            </template>
            <el-menu-item index="/logs">
              <i class="el-icon-message"></i>
              <span slot="title">团队动态</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容区 -->
      <el-main>
       <!-- 路由占位符 -->
       <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      istoggle: false,
      user_name: ''
    }
  },
  created() {
    document.title= "BarTeam's homepage",
    this.showNumber()
  },
  updated() {
    this.Activefolding()
  },
  methods: {
    loginout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async showNumber() {
    const res = await this.$http.get('myself');
    this.user_name = res.data.data.user_name;
    },
    // 跳转到发布日志和修改日志，侧边栏自动隐藏
    Activefolding() {
      const route_path = this.$route.path
      if(route_path == '/addlog' || route_path == '/updatelog') {
        this.istoggle = true
      }else{
        this.istoggle = false
      }
    }
  }
}
</script>
<style scoped>
.container {
  height: 100%;
}
.el-header {
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  box-shadow: 0 3px 0 #e5e5e5;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
}

.el-header > div {
    color: #000000;
    font-size: 22px;
    font-weight: 900px;
    display: flex;
    align-items: center;
    text-align: center;
    margin-left: 15px;
  }

.el-header img {
  width: 60px;
  height: 50px;
  margin-top: -2px;
}
.el-submenu i {
  color:#746e6e;
}
.el-submenu span {
  color: #000000;
}
.el-aside {
  background-color: #fafafa;
  border-right: none;
}
.el-aside > .el-menu {
    border-right: none;
  }
.el-main {
  background-color: #ffffffa9;
  border-left: 1px solid #e5e5e5;
}
.toggle-button {
  font-size: 15px;
  height: 56px;
  line-height: 56px;
  color: #746e6e;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.toggle-button:hover {
  background: rgb(196,196,196);
}
.el-button {
  background:whitesmoke;
  outline-style: none;
}
.el-button:hover {
  color: #606266;
}
</style>
