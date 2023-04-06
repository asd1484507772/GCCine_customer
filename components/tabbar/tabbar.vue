<template>
	<view>
		<u-tabbar :value="value" inactiveColor="#959AA5" activeColor="#FF4361">
			<u-tabbar-item url="navigate/navigate?title=navigate" text="首页" icon="home" @click="click1"></u-tabbar-item>
			<u-tabbar-item text="影院" icon="photo" @click="click1"></u-tabbar-item>
			<u-tabbar-item text="我的" icon="account" @click="click1"></u-tabbar-item>
		</u-tabbar>

	</view>
</template>

<script>
	export default {
		name: "tabbar",
		props: {
			value: {
				type: Number,
				required: true,
			},
		},
		data() {
			return {
				
			};
		},
		methods: {
			click1(e) {
				switch (e) {
					case 0:
						uni.$u.route({
							type: 'navigateTo',
							url: 'pages/home/home',
						})
						break;
					case 1:
						uni.$u.route({
							type: 'navigateTo',
							url: 'pages/cinema/cinema',
						})
						break;
					case 2:
						uni.$u.route({
							type: 'navigateTo',
							url: 'pages/mine/mine',
						})
						break;
				}
			}
		}
	}
</script>

<style>

</style>
