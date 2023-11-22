<style>
.ContentContainer {
	--content-container-content-spacing: calc(2 * var(--design-gap-unit));
	display: flex;
	flex-direction: column;
	gap: var(--content-container-content-spacing);
}
.ContentContainer > hr {
	margin-inline: 10px;
}
.ContentContainer > hr:not(:first-child) {
	margin-block-start: calc(var(--content-container-content-spacing) * -0.5);
}
.ContentContainer > hr:not(:last-child) {
	margin-block-end: calc(var(--content-container-content-spacing) * -0.5);
}
</style>
<template>
	<div class="ContentContainer">
		<slot></slot>
	</div>
</template>
