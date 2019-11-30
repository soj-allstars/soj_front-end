<template>
	<div>
		<h2 class='que_title'>{{title}}</h2>
		<p class='que_option'>{{option}}</p>
		<p class='que_description'>{{description}}</p>
		<p class='que_appendix'>{{appendix}}</p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: 'A + B problem',
				option: '1000ms | standard input output',
				description: 'just add them up',
				appendix: 'appendix'
			};
		}
	}
</script>

<style scoped>
	.que_title {
		text-align: center;
	}
	.que_option {
		text-align: center;
		color: dodgerblue;
	}
	.que_description {
		
	}
	.que_appendix {
		
	}
</style>
