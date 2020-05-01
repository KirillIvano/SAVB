<template>
	<div>
		{{count}}
	</div>
</template>

<script>
export default {
    data: () => ({
        count: 1,
    }),
    mounted: () => {
        console.log('component did mount');
    },
};
</script>

<style>
</style>
