<template>
	<div class="wrapbox" ref="wrapbox">
		<div class="content">
			<div v-if="datalist.length != 0">
				<div class="wrap" v-for="(item, index) in datalist">
					<div class="text">
						{{ item.content }}
					</div>
					<div class="mark">
						<img class="circle" :src="require(`../assets/${item.typeid}.png`)"></img>
						<div class="time">{{ item.time }}</div>
						<div class="type">{{ item.type }}</div>
						<div class="icon" @click="cancel(index)"></div>
					</div>
				</div>
			</div>
			<div v-else style="position: absolute;top:5%">————————— 暂无条目 ————————</div>
		</div>
	</div>
</template>

<script>
	import BScroll from '@better-scroll/core'

	export default{
		name: 'list',
		data(){
			return{
				content: {},
				selected: "",
				time:this.getTime(),
				datalist:[]
			};
		},
		created(){
			this.$http.get('/api/getlist')
			.then(res => {
				this.datalist = res.data
				console.log(res.data)
				this.$nextTick(() => {
					this.scroll = new BScroll(this.$refs.wrapbox, {
						scrollY: true,
						click: true
					})
				})
			})
			.catch(err => {
				this.$toast.fail('数据异常')
				console.log(`error: ${err}`)
			})
		},
		methods:{
			getTime(){
				let year = new Date().getFullYear();
				let month = new Date().getMonth() + 1;
				let day = new Date().getDate();
				let today = `${year} · ${month < 10 ? '0' + month :  month} · ${day < 10 ? '0' + day : day}`
				return today;
			},
			cancel(e){
				let selected = this.datalist[e]
				let time = this.time
				let { id } = selected

				this.$http.post('/api/delete',{
					data:{ id, time }
				})
				.then(res => {
					this.$toast.success('已完成')
				})
				.catch(err => {
					this.$toast.fail('数据异常')
					console.log(`error: ${err}`)
				})
				this.datalist.splice(e,1);
			}
		}
	}
</script>

<style scoped>
.wrapbox{
	height: 88vh;
	overflow: hidden;
}
.wrap{
	border: 1px solid black;
	border-radius: 5px;
	margin: 18px;
	box-shadow: 4px 4px 6px #999;
}
.text{
	height: 110px;
	border-bottom: 1px solid black;
}
.mark{
	height: 60px;
	position: relative;
}
.circle{
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: 1.5px solid #999;
	position: relative;
	left: 10px;
	top: 5px;
	/* background: url('../assets/book.png') no-repeat; */
}
.time{
	position:absolute;
	left: 95px;
	bottom: 35px;
}
.type{
	position:absolute;
	left: 95px;
	bottom: 5px;
}
.icon{
	background: url('../assets/delete.png') no-repeat;
	background-size: 100%;
    width: 8%;
    height: 60%;
    position: absolute;
    right: 10px;
    bottom: 0px;
}
</style>