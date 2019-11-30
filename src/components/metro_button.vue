<template>
	<a class="metro_button" v-bind:class="[type ? 'metro-'+type : 'metro-default']">
		<span class='btn_name'>{{desc}}</span>
		<span>
			<img v-bind:src="img_src" class="metro_img" />
		</span>
	</a>
</template>

<script>
	export default {
		data () {
			return {
				color: ''
			}
		},
		props: ['type', 'img_src', 'desc']
	}
</script>

<style scoped>
	a {
		color: #fff;
		border: 3px solid rgba(0, 0, 0, 0);
	}
	a:hover {
		color: #fff;
		border: 3px solid rgba(255, 255, 255, 0.7);
	}
	a:visited {
		color: #fff;
	}
	.metro_button {
		height: 6.25rem;
		width: 6.25rem;
		margin: 0.125rem;
		position: relative;
		float: left;
	}
	.btn_name {
		position: absolute;
		bottom: 0.2em;
		left: 0.4em;
		font-size: 0.8em;
	}
	
	.metro_img {
		width: 40px;
		height: 40px;
		top: 50%;
		left: 50%;
		position: relative;
		transform: translateX(-50%) translateY(-50%);
	}
	
	.metro-default {
		background-color: rgb(40, 150, 212);
	}
	.metro-submit {
		background-color: rgb(40, 150, 212);
	}
	.metro-discuss {
		background-color: rgb(40, 150, 212);
	}
	.metro-result {
		background-color: rgb(40, 150, 212);
	}
	.metro-solution {
		background-color: rgb(40, 150, 212);
	}
</style>
