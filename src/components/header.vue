<template>
	<div>
		<div class="nav">
			<div class="icon" @click="back"></div>
			<p class="title"><strong>{{ titleName }}</strong></p>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'my-header',
		props:['titleName'],
		methods: {
			back(){
				this.$router.push('./list')
			}
		}
	}
</script>

<style scoped>
	.nav{
		border-bottom: 1px solid black;
		height: 6vh;
	}
	.icon{
		background: url('../assets/back.png') no-repeat center;
		width: 32px;
		height: inherit;
		position: relative;
		left: 15px;
		display: inline-block;
	}
	.title{
		display: inline-block;
		position:absolute;
		left:50%;
		transform:translate(-50%,0);
	}
</style>