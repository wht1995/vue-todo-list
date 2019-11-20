<template>
	<div>
		<my-header titleName="已完成"></my-header>
		<div class="wrap" ref="wrap">
			<div class="parent-content">
				<div v-if='datalist.length > 0'>
					<div class="box" v-for="(item, index) in datalist">
						<img class="circle" :src="require(`../assets/${name}`)">
						<div class="content">
							<div class="text">{{ item.content }}</div>
							<div class="type">类型：{{ item.type }}</div>
							<div class="date">完成日：{{ item.time }}</div>
						</div>
					</div>
				</div>
				<div v-else style="position: absolute;top:15%;background:lightgreen">————————— 暂无条目 ————————</div>
			</div>
		</div>
	</div>
</template>

<script>
	import myHeader from './header'
	import BScroll from '@better-scroll/core'

	export default {
		data(){
			return{
				datalist:[],
			}
		},
		created(){
			this.$http.get('/api/get_compelete')
			.then(res => {
				this.datalist = res.data
				this.$nextTick(() => {
					this.scroll = new BScroll(this.$refs.wrap, {})
				})
			})
			.catch(err => {
				this.$toast.fail('数据异常')
				console.log(`error: ${err}`)
			})
			
		},
		components:{
			myHeader
		}
	}
</script>

<style scoped>
.wrap{
	margin-top: 10px;
	height: 84vh;
	overflow: hidden;
}
.box{
	position: relative;
	border-left: 1px solid black;
	border-top: 1px solid #fff;
	border-bottom: 1px solid #fff;
	margin: 0px 5px 0 30px;
}
.content{
	border: 1px solid purple;
	border-radius: 5px;
	margin: 15px 15px 0px 25px;
}
.text{
	background: lightpink;
	height: 45px;
	padding: 5px;
}
.type{
	margin: 5px;
}
.date{
	margin: 5px;
}
.circle{
	position: absolute;
	left: -22px;
	top: 50px;
	z-index: 99;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: 1.5px solid #999;
	background-size: 100%;
	background: #fff;
	/* background: url('../assets/sing.png') no-repeat center #fff; */
}
</style>