<template>
	<div id="" class="">
		<van-tabbar v-model="active">
			<van-tabbar-item icon="search">
				<router-link to="/Search">搜索</router-link>
			</van-tabbar-item>
			<van-tabbar-item icon="home-o">
				<router-link to="/Home">主页</router-link>
			</van-tabbar-item>
			<van-tabbar-item icon="user-o">
				<router-link to="/User">用户</router-link>
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	// 导入组件
	// import  from ''

	export default {
		props: [],
		data() {
			return {}
		},
		// 生命周期初始化函数
		// created: {
		//
		// },
		// 方法
		methods: {},
		// 监听器
		watch: {},
		// 当前组件的计算属性
		computed: {},
		// 过滤器
		filters: {},
		// Vue 中自定义属性
		directives: {},
		name: 'FootserBar',
		components: {
			// 导入组件
		}
	}
</script>

<style lang="less" scoped>
</style>
