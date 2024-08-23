<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="24">
        <blockquote style="font-size: 14px">
          <div>
            wHitE | 博客 Blog 博客前台地址
            <br/>
            <el-link href="http://blog.whitecc.top" type="primary" target="_blank">http://blog.whitecc.top</el-link>
          </div>
          <div>
            前台接口文档地址
            <br/>
            <el-link href="http://blog.whitecc.top/prod-api/swagger-ui/index.html#/" type="primary" target="_blank">
              http://blog.whitecc.top/prod-api/swagger-ui/index.html#/
            </el-link>
          </div>
          <br/>
          <div>
            云服务器管理控制台
            <el-link href="https://ecs.console.aliyun.com/home" type="primary" target="_blank">>点我进入&lt;</el-link>
          </div>
          <div>
            域名控制台
            <el-link
                href="https://dc.console.aliyun.com/next/index?spm=5176.12818093_47.products-recent.ddomain.225d16d0NSeDb2#/overview"
                type="primary" target="_blank">>点我进入&lt;
            </el-link>
          </div>
          <div>
            mc服务器控制台
            <el-link
                href="mcserver.admin.whitecc.top"
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
                  <el-image class="avatar" :src="'/src/assets/images/'+developer.avatar"/>
                  <div style="padding-left: 10px;">
                    <div><b>{{ developer.name }}</b></div>
                    <div>{{ developer.desc }}, <s>{{ developer.remark }}</s></div>
                  </div>
                </div>
              </li>
            </ul>
          </el-col>
          <el-col :span="5">
            <h4>亲友团</h4>
            <ul>
              <li v-for="(friend,index) in friends" :key="friend.id">
                <div v-if="index<3" style="display: flex;align-items: center;margin-bottom: 10px">
                  <el-image class="avatar" :src="'/src/assets/images/'+friend.avatar"/>
                  <div style="padding-left: 10px;">
                    <div><b>{{ friend.name }}</b></div>
                    <div>{{ friend.desc }}, <s>{{ friend.remark }}</s></div>
                  </div>
                </div>
              </li>
            </ul>
          </el-col>
          <el-col :span="5">
            <ul style="margin-top: 31.59px">
              <li v-for="(friend,index) in friends" :key="friend.id">
                <div v-if="index>=3" style="display: flex;align-items: center;margin-bottom: 10px">
                  <el-image class="avatar" :src="'/src/assets/images/'+friend.avatar"/>
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
              <i class="el-icon-s-promotion"></i> 工信部备案信息：
              <el-link href="https://beian.miit.gov.cn" target="_blank">皖ICP备2024053724号-1</el-link>
            </p>
            <p>
              <i class="el-icon-s-promotion"></i> 公安局备案信息：
              <el-link href="https://beian.miit.gov.cn" target="_blank">正在审核中...</el-link>
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
              <span>更新日志</span>
            </div>
          </template>
          <el-collapse accordion>
            <el-collapse-item title="v1.0.0 - 2024-06-18">
              <ol>
                <li>wHitE 博客正式发布</li>
              </ol>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
      <!--      <el-col :xs="24" :sm="24" :md="12" :lg="8">-->
      <!--        <el-card class="update-log">-->
      <!--          <template v-slot:header>-->
      <!--            <div class="clearfix">-->
      <!--              <span>捐赠支持</span>-->
      <!--            </div>-->
      <!--          </template>-->
      <!--          <el-collapse accordion>-->
      <!--            <el-collapse-item title="你可以请网站作者喝杯咖啡表示鼓励">-->
      <!--              <div class="body">-->
      <!--                <el-image-->
      <!--                    src="@/assets/images/wxpay.jpg"-->
      <!--                    alt="donate"-->
      <!--                    style="width:50%"-->
      <!--                />-->
      <!--                <el-image-->
      <!--                    src="@/assets/images/alipay.jpg"-->
      <!--                    alt="donate"-->
      <!--                    style="width:50%"-->
      <!--                />-->
      <!--              </div>-->
      <!--            </el-collapse-item>-->
      <!--          </el-collapse>-->
      <!--        </el-card>-->
      <!--      </el-col>-->
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <template v-slot:header>
            <div class="clearfix">
              <span>捐赠支持</span>
            </div>
          </template>
          <el-collapse accordion>
            <el-collapse-item title="你可以请网站作者喝杯咖啡表示鼓励 (bushi)">
              <div class="body">
                <el-image
                    src="@/assets/images/none_wxpay.jpg"
                    alt="donate"
                    style="width:50%"
                />
                <el-image
                    src="@/assets/images/none_alipay.jpg"
                    alt="donate"
                    style="width:50%"
                />
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="Index">
const version = ref('1.0.0')
const Developers = ref([
  {id: 0, name: "wHitE_", desc: "程序员", remark: "创始人", avatar: "wHiTeCC_.png"}
])
const friends = ref([
  {id: 1, name: "bobo", desc: "陪玩", remark: "黑莓大师", avatar: "bobo.png"},
  {id: 2, name: "xigong_", desc: "情趣玩具", remark: "性奴", avatar: "xigong_.png"},
  {id: 3, name: "Cachron", desc: "傻逼", remark: "菜逼", avatar: "cachron.png"},
  {id: 4, name: "Olish", desc: "小骚货", remark: "瓦批", avatar: "olish.jpg"},
  {id: 5, name: "magic_jack", desc: "疑似诗人", remark: "黑鬼", avatar: "magic_jack.png"},
])

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

