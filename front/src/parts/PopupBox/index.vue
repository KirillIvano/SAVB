<script lang="ts" src="./script.ts"></script>
<style src="./styles.less" scoped></style>

<template>
	<div class="popupBox">
		<popup-message
			v-for="(message) in messages"
			:key="message.id"
			:content="`${message.content}_${message.id}`"
			:type="message.type"
		/>
	</div>
</template>
