<script lang="ts" src="./script.ts"></script>

<template>
	<div>
		<h1>You successfully created token!</h1>
		<p>
			choose your group
		</p>

		<p
			v-for="group in groups"
			:key="group.id"
		>
			{{group.name}}
		</p>
	</div>
</template>

<style lang="less" scoped></style>
