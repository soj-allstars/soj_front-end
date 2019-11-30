<template>
	<div>
		<div v-for="i in 10">
			<question_item></question_item>
		</div>
	</div>
</template>

<script>
	import question_item from '@/components/question_item.vue'
	export default {
	  data () {
		return {
		  msg: 'Welcome to Your Vue.js App'
		}
	  },
	  components: {
		question_item
	  }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
