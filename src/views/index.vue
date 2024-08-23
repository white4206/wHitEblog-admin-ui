<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="24">
        <blockquote style="font-size: 14px">
          <div>
            <svg-icon icon-class="logo"/>
            Blog | wHitE 博客 前台
            <br/>
            <el-link href="http://blog.whitecc.top" type="primary" target="_blank">http://blog.whitecc.top</el-link>
          </div>
          <div>
            <svg-icon icon-class="demon"/>
            IP查询工具
            <br/>
            <el-link href="http://fun.whitecc.top/ipAddress" type="primary" target="_blank">
              http://fun.whitecc.top/ipAddress
            </el-link>
          </div>
          <div>
            <svg-icon icon-class="swaggerUi"/>
            前台接口文档
            <br/>
            <el-link href="http://blog.whitecc.top/prod-api/swagger-ui/index.html#/" type="primary" target="_blank">
              http://blog.whitecc.top/prod-api/swagger-ui/index.html#/
            </el-link>
          </div>
          <br/>
          <div>
            <svg-icon icon-class="mcsm"/>
            服务器程序控制台
            <br/>
            <el-link href="http://server.admin.whitecc.top" type="primary" target="_blank">
              http://server.admin.whitecc.top
            </el-link>
          </div>
          <div>
            <svg-icon icon-class="mcsm"/>
            MC服务器控制台
            <br/>
            <el-link href="http://mcserver.admin.whitecc.top" type="primary" target="_blank">
              http://mcserver.admin.whitecc.top
            </el-link>
          </div>
          <div>
            <svg-icon icon-class="resource"/>
            服务器静态资源
            <br/>
            <el-link href="http://server.whitecc.top" type="primary" target="_blank">
              http://server.whitecc.top
            </el-link>
          </div>
          <br/>
          <div>
            <svg-icon icon-class="ali"/>
            云服务器管理控制台
            <el-link href="https://ecs.console.aliyun.com/home" type="primary" target="_blank">>点我进入&lt;</el-link>
          </div>
          <div>
            <svg-icon icon-class="ali"/>
            域名控制台
            <el-link
                href="https://dc.console.aliyun.com/next/index?spm=5176.12818093_47.products-recent.ddomain.225d16d0NSeDb2#/overview"
                type="primary" target="_blank">>点我进入&lt;
            </el-link>
          </div>
          <br/>
          <h4 class="text-primary">
            wHitE | 博客 Blog 博客相关链接地址
          </h4>
        </blockquote>

        <hr/>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" style="padding-left: 20px">
        <h2>wHitE 博客后台管理系统</h2>
        <p>
          本系统完全基于RouYi后台管理系统框架。 本系统仅供个人团队使用, 不进行任何商业盈利行为。
        </p>
        <p>
          <b>当前版本:</b> <span>v{{ version }}</span>
        </p>
        <p>
          <el-tag type="">~ 优雅简洁 ~</el-tag>
        </p>
        <p>
          <el-button type="primary" icon="Cloudy" plain
                     @click="goTarget('https://github.com/white4206?tab=repositories')">访问 Github
          </el-button>
          <el-button icon="Cloudy" plain @click="goTarget('https://gitee.com/white420')">访问码云</el-button>
        </p>
      </el-col>

      <el-col :sm="24" :lg="12" style="padding-left: 50px">
        <el-row>
          <el-col :span="12">
            <h2>个人团队</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <h4>开发者</h4>
            <ul>
              <li v-for="developer in Developers" :key="developer.id">
                <div style="display: flex;align-items: center">
                  <el-image class="avatar" :src="developer.avatar"/>
                  <div style="padding-left: 10px;">
                    <div><b>{{ developer.name }}</b></div>
                    <div>{{ developer.desc }}, <s>{{ developer.remark }}</s></div>
                  </div>
                </div>
              </li>
            </ul>
          </el-col>
          <el-col :span="12">
            <h4>亲友团</h4>
            <ul style="display: grid;grid-template-rows: repeat(3, 1fr);grid-template-columns: repeat(2, 1fr);column-gap: 20px">
              <li v-for="friend in friends" :key="friend.id">
                <div style="display: flex;align-items: center;margin-bottom: 10px">
                  <el-image class="avatar" :src="friend.avatar"/>
                  <div style="padding-left: 10px;">
                    <div><b>{{ friend.name }}</b></div>
                    <div>{{ friend.desc }}, <s>{{ friend.remark }}</s></div>
                  </div>
                </div>
              </li>
            </ul>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider/>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <template v-slot:header>
            <div class="clearfix">
              <span>相关信息</span>
            </div>
          </template>
          <div class="body">
            <p>
              工信部备案信息：
              <el-link href="https://beian.miit.gov.cn" target="_blank">皖ICP备2024053724号-1</el-link>
            </p>
            <p>
              公安局备案信息：
              <el-link href="https://beian.miit.gov.cn" target="_blank">
                <img style="height: 12px;margin-right: 5px" src="@/assets/images/record.png" alt=""/>
                <span>皖公网安备34130202000761</span>
              </el-link>
            </p>
            <p>
              <i class="el-icon-s-promotion"></i> 版权信息：
              <el-link href="http://blog.whitecc.top/personal?author=1" target="_blank">&copy;2024 By wHitE_
                个人开发者
              </el-link>
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <template v-slot:header>
            <div class="clearfix">
              <span>wHitE 博客前台更新日志</span>
            </div>
          </template>
          <el-collapse accordion>
            <el-collapse-item title="v1.0.0 - 2024-08-23">
              <ol>
                <li>v1.0.0 版本正式部署使用</li>
                <li>wHitE 博客前台前端页面设计基本完成</li>
                <li>wHitE 博客前台后端系统设计完成</li>
                <li>优化部分前端页面</li>
                <li>优化了前后端的代码</li>
                <li>重写了部分代码逻辑</li>
                <li>新增 particlesjs 提供动态美观的页面背景画布</li>
                <li>新增 nprogress 加载进度条</li>
                <li>完成 ckeditor5 的导入及使用</li>
                <li>新增 file-saver 提供文件保存功能</li>
                <li>新增 colorthief 识别图片颜色主题</li>
                <li>新增 plyr 视频播放器</li>
                <li>新增 prismjs 代码高亮</li>
                <li>新增 vuedraggable 拖动组件</li>
                <li>
                  新增 fast-glob 提供文件深度查找并新增 svg-icon 提供根据名称显示 svg 图标功能和 icon-select 组件提供
                  svg 图标选择器功能
                </li>
                <li>重写引入模块的部分样式</li>
                <li>整体样式的调整</li>
                <li>修复部分 dev bug</li>
                <li>替换后端 redis 客户端(lettuce)为 jedis 解决 redis 超时重连问题</li>
                <li>
                  设置 MySQL 连接存活时间以解决 MySQ L连接存活状态不一致导致的数据库操作错误及控制台警告提示等问题
                </li>
                <li>CorsFilter 解决跨域问题</li>
                <li>新增 jwt 登录令牌功能</li>
                <li>新增 shiro 权限框架</li>
                <li>新增邮件发送功能</li>
                <li>新增 thymeleaf 模板提供给邮件发送服务</li>
                <li>
                  引入 @MultiRequestBody 解决前后端交互不能传输多个复杂类型的问题，同时导入 fastjson 处理时间日期序列化问题
                </li>
                <li>新增文件上传功能</li>
                <li>新增定时任务功能(未投入使用)</li>
                <li>新增 ip2region 提供IP属地查询功能</li>
                <li>更新了 ip2region 离线数据</li>
                <li>引用 jsoup 解决后端解析页面问题</li>
                <li>新增IP查询工具</li>
                <li>优化 nginx 配置文件</li>
                <li>新增 nginx 自定义错误页面</li>
                <li>新增 spring boot 自定义错误页面</li>
                <li>上线静态资源页面 舍弃tomcat提供的开放静态资源</li>
                <li>添加 fancyindex 模块后重新编译 nginx</li>
                <li>使用 fancyindex 主题并在其基础上修改部分前端样式</li>
                <li>上线服务器程序控制台页面</li>
                <li>上线MC服务器控制台页面</li>
                <li>修复了原始版本遗漏的其他问题及 bug</li>
              </ol>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <!--        <el-card class="update-log">-->
        <!--          <template v-slot:header>-->
        <!--            <div class="clearfix">-->
        <!--              <span>捐赠支持</span>-->
        <!--            </div>-->
        <!--          </template>-->
        <!--          <el-collapse accordion>-->
        <!--            <el-collapse-item title="你可以请网站作者喝杯咖啡表示鼓励 (bushi)">-->
        <!--              <div class="body">-->
        <!--                <el-image :src="wxpay" alt="donate" style="width:50%"/>-->
        <!--                <el-image :src="alipay" alt="donate" style="width:50%"/>-->
        <!--              </div>-->
        <!--            </el-collapse-item>-->
        <!--          </el-collapse>-->
        <!--        </el-card>-->
        <el-card class="update-log">
          <template v-slot:header>
            <div class="clearfix">
              <span>wHitE 博客后台更新日志</span>
            </div>
          </template>
          <el-collapse accordion>
            <el-collapse-item title="v1.0.0 - 2024-08-23">
              <ol>
                <li>v1.0.0 版本正式部署使用</li>
                <li>wHitE 博客后台前端页面在RouYi框架基础上修改基本完成</li>
                <li>wHitE 博客后台后端系统在RouYi框架基础上修改设计基本完成</li>
                <li>整体样式调整</li>
                <li>替换页面中显示的RouYi相关字段为 wHitE 博客相关字段</li>
                <li>新增 particlesjs 提供动态美观的页面背景画布，修改登陆页面前端样式</li>
                <li>修改主页面前端样式</li>
                <li>新增部分前台内容管理</li>
                <li>新增IP工具查询记录管理</li>
              </ol>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="Index">
import SvgIcon from "@/components/SvgIcon/index.vue";

const version = ref('1.0.0')
const Developers = ref([
  {
    id: 0,
    name: "wHitE_",
    desc: "程序员",
    remark: "创始人",
    avatar: new URL("@/assets/images/wHiTeCC_.png", import.meta.url).href
  }
])
const friends = ref([
  {
    id: 1,
    name: "bobo",
    desc: "陪玩",
    remark: "黑莓大师",
    avatar: new URL("@/assets/images/bobo.png", import.meta.url).href
  },
  {
    id: 2,
    name: "xigong_",
    desc: "情趣玩具",
    remark: "性奴",
    avatar: new URL("@/assets/images/xigong_.png", import.meta.url).href
  },
  {
    id: 3,
    name: "Cachron",
    desc: "傻逼",
    remark: "菜逼",
    avatar: new URL("@/assets/images/cachron.png", import.meta.url).href
  },
  {
    id: 4,
    name: "Olish",
    desc: "小骚货",
    remark: "瓦批",
    avatar: new URL("@/assets/images/olish.jpg", import.meta.url).href
  },
  {
    id: 5,
    name: "majic_jack",
    desc: "疑似诗人",
    remark: "黑鬼",
    avatar: new URL("@/assets/images/majic_jack.png", import.meta.url).href
  },
])
const wxpay = ref(new URL("@/assets/images/none_wxpay.jpg", import.meta.url).href)
const alipay = ref(new URL("@/assets/images/none_alipay.jpg", import.meta.url).href)

function goTarget(url) {
  window.open(url, '__blank')
}

onMounted(() => {
})
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }

  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}

.avatar {
  cursor: pointer;
  transition: 0.2s;
}

.avatar:hover {
  transform: scale(1.05);
  transition: 0.2s;
}
</style>

