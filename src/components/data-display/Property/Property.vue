<template>
	<div class="Property">
		<span class="Property__name text-medium secondary">
			<slot name="name"><span class="warning">[[No property name provided]]</span></slot>
			<span class="Property__delimeter">: </span>
		</span>
		<span class="Property__value text-medium">
			<slot name="value"><span class="warning">[[No property value provided]]</span></slot>
		</span>
	</div>
</template>
<style>
/* TODO: move to appropriate place */
</style>
