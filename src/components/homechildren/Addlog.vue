<template>
  <div style="width:90%; height:100%; margin:0 auto">
    <el-form :data="releaselog">
      <el-form-item
        label="发布标题:"
        prop="title"
      >
        <el-col :span="6">
          <el-input v-model="releaselog.title"></el-input>
        </el-col>
        <el-form-item style="float: right;">
          <el-button
            type="primary"
            @click="releaselogcontent"
          >发布</el-button>
          <el-button @click="goback">取 消</el-button>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <mavon-editor
          v-model="releaselog.content"
          @change="handle"
          style="height: 700px;"
        ></mavon-editor>
      </el-form-item>
    </el-form>
    <!-- 显示markdown格式的文本内容 -->
    <!-- <article v-html="myhtml"></article> -->
  </div>
</template>
<script>
export default {
  name: "addlog",
  data() {
    // 初始化数据
    return {
      myhtml:'',
      releaselog: {
        "title": "",
        "content": ""
      },
      // markdownOptionAll:{
      //           bold: true, // 粗体
      //           italic: true, // 斜体
      //           header: true, // 标题
      //           underline: true, // 下划线
      //           strikethrough: true, // 中划线
      //           mark: true, // 标记
      //           superscript: true, // 上角标
      //           subscript: true, // 下角标
      //           quote: true, // 引用
      //           ol: true, // 有序列表
      //           ul: true, // 无序列表
      //           link: true, // 链接
      //           imagelink: true, // 图片链接
      //           code: true, // code
      //           table: true, // 表格
      //           fullscreen: false, // 全屏编辑
      //           readmodel: false, // 沉浸式阅读
      //           htmlcode: true, // 展示html源码
      //           help: true, // 帮助
      //           undo: true, // 上一步
      //           redo: true, // 下一步
      //           trash: true, // 清空
      //           save: false, // 保存（触发events中的save事件）
      //           navigation: true, // 导航目录
      //           alignleft: true, // 左对齐
      //           aligncenter: true, // 居中
      //           alignright: true, // 右对齐
      //           subfield: false, // 单双栏模式
      //           preview: true, // 预
      //           ishljs:true
      //       },
    }
  },
  methods: {
    // render将文本渲染成markdown
    handle(value, render) {
      this.myhtml = render;
      console.log(this.myhtml)
    },
    // 发送添加日志请求
    releaselogcontent() {
      this.$http.post('logs',
        {
          title: this.releaselog.title,
          content: this.myhtml
        })
        .then(res => {
          console.log(res);
          if (res.data.meta.success !== true) {
            this.$message.error('发布失败')
          } else {
            this.$message.success('发布成功')
            // 发布成功后跳转到日志列表页
            this.$router.push('/logs')
          }
        });

    },
    // 点击返回按钮跳转到日志列表页面
    goback() {
      this.$router.push('/logs')
    }
  }
}
</script>
<style scoped>

</style>