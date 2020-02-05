<template>
	<v-app id='mainpage'>
        <v-app-bar
          app
          clipped-right
          color="blue-grey"
          dark
        >
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
          <v-toolbar-title>SOJ</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
              <v-btn text link :to="{ name: 'problemSet' }">题库</v-btn>
              <v-btn text link :to="{ name: 'problem', params: { pid: 1 }}">比赛</v-btn>
              <v-btn text link :to="{ name: 'problemSubmitRes', query: { submission_id: 1}}">提交</v-btn>
              <v-btn text lnkk :to="{ name: 'login' }">登录</v-btn>
              <v-btn text lnkk :to="{ name: 'addProblem' }">加题</v-btn>
          </v-toolbar-items>
        </v-app-bar>
        
		<v-navigation-drawer
		  v-model="drawer"
          disable-resize-watcher
          disable-route-watcher
		  app
		>
		  <v-list dense>
		    <v-list-item @click.stop="left = !left">
		      <v-list-item-action>
		        <v-icon>mdi-exit-to-app</v-icon>
		      </v-list-item-action>
		      <v-list-item-content>
		        <v-list-item-title>留着以后做用户的侧边栏</v-list-item-title>
		      </v-list-item-content>
		    </v-list-item>
            <v-list-item @click.stop="left = !left">
              <v-list-item-action>
                <v-icon>mdi-exit-to-app</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{serveUrl()}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
		  </v-list>
		</v-navigation-drawer>
        
        <v-content>
            <!-- 显示不同页面的地方 -->
            <router-view></router-view>
        </v-content>
        
        <v-footer
         class='font-weight-medium'
        >
            <v-col
             class='text-center'
             cols='12'
            >
                {{new Date().getFullYear()}} - <strong>SOJ</strong>
            </v-col>
            
        </v-footer>
	</v-app>
</template>

<script>
	export default {
        data : function () {
            return {
                drawer: false
            }
        },
        methods : {
            mylogin: function() {
                var thisCom = this;
                $.ajax({
                    //请求方式
                    type : "POST",
                    //请求地址
                    url : thisCom.serveUrl() + '/api/user/login/',
                    //POST里面的data
                    data: {
                        username: "soj",
                        password: "soj",
                        keep: true
                    },
                    crossDomain: true,
                    xhrFields: {
                      withCredentials: true
                    },
                    //请求成功
                    success : function(result) {
                        alert(result.detail);
                    },
                    //请求失败，包含具体的错误信息
                    error : function(e){
                      console.log(e.status);
                      console.log(e.responseText);
                      alert('出了点问题，请重新提交。');
                    },
                    
                });
            }
        }
	}
</script>

<style scoped>
	a {
        text-decoration: none;
        color: white;
    }
</style>