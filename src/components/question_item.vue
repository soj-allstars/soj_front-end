<template>
	<div class="question_item_wrapper">
		<p>
			<a href='#'>{{question_description}}</a>
		</p>
	</div>
</template>

<script>
	export default {
	  data () {
	    return {
	      question_description: 'A + B sum'
	    }
	  }
	}
</script>

<style>
	.question_item_wrapper {
		background-color: beige;
		font-size: 1em;
		display: block;
		margin: 5px;
		padding: 5px;
	}
</style>