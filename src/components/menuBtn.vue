<template>
	<div>
		<div class="wrap">
			<div class="left circle">
				<!-- <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="45" height="45">
					<circle cx="50%" cy="50%" r="20" stroke-width="1" fill="orange" @click="finished"/>
				</svg> -->
				<div class="lc common" @click="finished"></div>
			</div>
			<div class="main circle">
				<div class="mc common" @click="turnOn"></div>
			</div>
			<div class="right circle">
				<div class="rc common" @click="add"></div>
			</div>
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="45">
				<defs>
					<filter id="goo">
						<feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
						<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
						<feBlend in="SourceGraphic" in2="goo" />
					</filter>
				</defs>
			</svg>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'menuBtn',
		methods:{
			turnOn() {
				const circles = document.querySelectorAll(".circle");
				circles.forEach(element => {
					element.classList.toggle("show");
				});
			},
			finished() {
				alert('已完成');
			},
			add() {
				this.$router.push('/add');
			},
			finished() {
				this.$router.push('/complete')
			}
		}
	}
</script>

<style scoped>
.common{
	width: 45px;
	height: 45px;
	background: lightgreen;
	border-radius: 50%;
	/* position: relative; */
	/* border: 1px solid #999; */
}
.wrap{
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 5px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	filter: url(#goo);
	border-top: 1px solid #999;
}
.main{
	z-index: 9;
	transition: transform .6s ease-out 0ms;
}
.circle{
	position: absolute;
}
.left {
	transition: transform .6s ease-out 0ms;
}

.right {
	transition: transform .6s ease-out 0ms;
}

.left.show {
	transform: translate(-100px, 0px);
}

.right.show {
	transform: translate(100px, 0px);
}
.main.show{
	transform: rotate(45deg);
}
.mc{
	background: url('../assets/add.png') no-repeat 100% #62A270;
	background-position: center;
}
.lc{
	background: url('../assets/list.png') no-repeat 100% #62A270;
	background-position: center;
}
.rc{
	background: url('../assets/pen.png') no-repeat 100% #62A270;
	background-position: center;
}
</style>