<script lang="ts">
import {Vue, Prop, Component} from 'vue-property-decorator';

@Component({
    mounted() {
        console.log('I mounted');
    },
})
export default class Button extends Vue {
	@Prop()
	isDisabled: boolean;
	@Prop({required: false})
	additionalClass: string;
	@Prop()
	handleClick: () => void;
}
</script>

<style lang="less" src="./styles.less" scoped></style>

<template>
	<button
		class="button"
		:disabled="isDisabled"
		@click="handleClick"
	>
		<slot />
	</button>
</template>
