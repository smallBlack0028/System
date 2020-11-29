import Vue from 'vue'
import VueRouter from 'vue-router'
// 路由懒加载
const Login = () => import('@/components/Login.vue')
const Home  = () => import('@/components/Home.vue')
const Welcome  = () => import('@/components/homechildren/Welcome.vue')
const Myself  = () => import('@/components/homechildren/Myself.vue')
const Logs  = () => import('@/components/homechildren/Logs.vue')
const Getlogbyid  = () => import('@/components/homechildren/Getlogbyid.vue')
const Addlog  = () => import('@/components/homechildren/Addlog.vue')
const Updatelog  = () => import('@/components/homechildren/Updatelog.vue')
const Members = () => import('@/components/homechildren/Members.vue')
const MemberInfo = () => import('@/components/homechildren/MemberInfo.vue')

Vue.use(VueRouter)
// Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { 
      path: '/home', 
      component: Home,
      redirect: '/welcome', 
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/myself', component: Myself },
        { path: '/logs', component: Logs },
        { path: '/getlogbyid', component: Getlogbyid },
        { path: '/addlog', component: Addlog },
        { path: '/updatelog', component: Updatelog },
        {
          path: '/members',
          component: Members
        },
        {
          // 只能跳转到id为数字类型的
          path: '/memberinfo/:id(\\d+)',
          //默认隐藏
          hidden: true,
          component: MemberInfo
        },
      ]
    }
  ],
  // 使用hash模式
  mode: 'hash'
})


// // 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // next() 放行 next('/login) 强制跳转
  if(to.path == '/login') return next()
  // 从sessionStorage中获取id
  const tokenStr = window.sessionStorage.getItem('id');
  // 如果tokenStr为空时，直接跳转到登录页面
  if(!tokenStr) {
    next('/login');
  }
  else {
    next();
  }
})
export default router
