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
              <v-btn text link to='problem'>题库</v-btn>
              <v-btn text link to='problem'>比赛</v-btn>
              <v-btn text link to='problemsubmit'>提交</v-btn>
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
	  }
	}
</script>

<style scoped>
	a {
        text-decoration: none;
        color: white;
    }
</style>