<template>
	<div>
		<div id="top_wrapper">
			<h1>顶部</h1>
		</div>
		<div id='bottom_wrapper'>
			<div id="left_wrapper">
				<ques_con></ques_con>
			</div>
			<div id="right_wrapper">
				<m_btn type='submit' desc='提交' img_src='static/svg/submit.svg' href='#'></m_btn>
				<m_btn type='discuss' desc='讨论' img_src='static/svg/discuss.svg' href='#'></m_btn>
				<m_btn type='result' desc='评测结果' img_src='static/svg/result.svg' href='#'></m_btn>
				<m_btn type='solution' desc='题解' img_src='static/svg/solution.svg' href='#'></m_btn>
			</div>
		</div>
		
	</div>
</template>

<script>
	import ques_con from "@/components/question_content.vue"
	import m_btn from "@/components/metro_button.vue"
	export default {
		data () {
			return {
				msg: 'this is a question.'
			}
		},
		components: {
			ques_con,
			m_btn
		}
	}
</script>

<style scoped>
	body {
	  margin: 0;
	  padding: 0;
  }
  h1 {
	  margin: 0;
	  padding: 0;
  }
	#top_wrapper {
		height: 200px;
		width: 99%;
		background-color: aliceblue;
		padding: 0;
		margin: 0.5rem;
	}
	#bottom_wrapper {
		width: 99%;
		display: inline-block;
		background-color: pink;
		padding: 0;
	}
	#left_wrapper {
		width: 52%;
		background-color: beige;
		float: left;
		margin: 1rem;
		padding: 1.875rem
	}
	#right_wrapper {
		width: 30%;
		background-color: rgb(70, 70, 70);
		float: left;
		margin: 1rem;
		padding: 1.875rem;
	}
</style>
