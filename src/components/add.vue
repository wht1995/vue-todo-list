<template>
	<div class="wrap">
		<my-header titleName="新事件"></my-header>
		<div class="editBox">
			<div class="edit">
				<p>New Plan</p>
			</div>
			<textarea class="editArea" placeholder="新建事项..." v-model="newText"></textarea>
			<p class="time">———— {{ time }} ————</p>
			<div style="display: flex;margin-bottom: 25px;width: 60%;justify-content: space-around">
				<div class="circle" :style="{backgroundImage: `url( ${this.imgSrc} )`}"></div>
				<select class="choose" @change="getType" v-model="selected">
					<option value="0">学习</option>
					<option value="1">锻炼</option>
					<option value="2">娱乐</option>
				</select>
			</div>
			
			<van-button type="primary" size="normal" style="margin-bottom: 20px;width: 50%" @click="add">添加</van-button>
		</div>
	</div>
</template>

<script>
	import myHeader from './header';

	export default{
		name:'add',
		components:{
			myHeader
		},
		data() {
			return {
				newText:"",
				selected:'0',
				type:'学习',
				time: this.getTime(),
				img:{
					'book': require('../assets/0.png'),
					'ex': require('../assets/1.png'),
					'sing': require('../assets/2.png')
				},
				imgSrc:require('../assets/0.png')
			};
		},
		methods: {
			back(){
				this.$router.push('/list')
			},
			getTime(){
				let year = new Date().getFullYear();
				let month = new Date().getMonth() + 1;
				let day = new Date().getDate();
				let today = `${year} · ${month < 10 ? '0' + month :  month} · ${day < 10 ? '0' + day : day}`
				return today;
			},
			getType(){
				if(event.target.value == 0){
					this.imgSrc = this.img['book']
					this.type = event.target[0].innerHTML
				}
				if(event.target.value == 1){
					this.imgSrc = this.img['ex']
					this.type = event.target[1].innerHTML
				}
				if(event.target.value == 2){
					this.imgSrc = this.img['sing']
					this.type = event.target[2].innerHTML
				}
			},
			add(){
				let [newText, selected, type, time] = [this.newText, this.selected, this.type, this.time]
				console.log(selected)
				if(newText == ''){
					this.$toast.fail('请输入内容	');
					return
				}
				this.$http.post('/api/add',{
					data:{
						content: newText,
						typeid: selected,
						type: type,
						time: time
					}
				})
				.then(res => {
					this.newText = ""
					this.$toast.success('添加成功')
				})
				.catch(err => console.log('err:' + err))
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
	.editBox{
		border-radius: 5px;
		border: 1px solid #999;
		margin: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-shadow: 4px 4px 6px #999;
	}
	.editArea{
		display: block;
		resize: none;
		outline: none;
		border: 1px solid black;
		border-radius: 5px;
		width: 85%;
		height: 100px;
	}
	.choose{
		width: 40%;
	    display: inline-block;
	    text-align: center;
	    border: 1px solid;
	    border-radius: 3px;
	    height: 40px;
	    outline: none;
	    /* margin: 30px 0; */
	    background-color: #fff;
	}
	.circle{
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 1.5px solid #999;
		background-size: 100%;
		/* background: url('../assets/book.png') no-repeat; */
	}
</style>