<template>
	<view>
		<view style="color: red;text-align: center;">sdfsdgdf</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			let data = '1排7列'
			let nums = data.split('排')
			console.log(nums[1].split('列')[0])
		},
		methods: {
			
		}
	}
</script>

<style lang="less">

</style>
