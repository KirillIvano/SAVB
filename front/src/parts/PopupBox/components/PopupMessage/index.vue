<script src="./script.ts"></script>
<style src="./styles.less" scoped></style>
<template>
	<div
		:class="{popupMessage: true, error: type === 'error'}"
	>
		<img
			:src="this.iconSrc"
			class="messageIcon"
		>
		<p class="messageContent">
			{{content}}
		</p>
	</div>
</template>
