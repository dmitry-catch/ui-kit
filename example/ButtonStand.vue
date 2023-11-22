<style>
.ButtonStand {
	display: flex;
	flex-direction: column;
	margin: 100px 0px;
}
.ButtonStand__ButtonStand__currentButtonsContainer {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	width: 100%;
}
.ButtonStand__currentButton {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>
<template>
	<div class="ButtonStand">
		<div class="ButtonStand__ButtonStand__currentButtonsContainer">
			<div class="ButtonStand__currentButton">
				<p>Btn_actual</p>
				<Btn @click="onClick">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>Disabled</p>
				<Btn :disabled="true" @click="onClick">Кнопка</Btn>
			</div>

			<div class="ButtonStand__currentButton">
				<p>accent</p>
				<Btn class="accent" @click="onClick">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>accent disabled</p>
				<Btn class="accent" :disabled="true" @click="onClick">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>minimal</p>
				<Btn class="minimal" @click="onClick">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>minimal disabled</p>
				<Btn class="minimal" :disabled="true" @click="onClick">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>functional</p>
				<Btn class="functional" @click="onClick">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>functional disabled</p>
				<Btn class="functional" :disabled="true" @click="onClick">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>icon</p>
				<Btn class="icon"><Icon name="inbox" /></Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>icon functional</p>
				<Btn class="icon functional"><Icon name="inbox" /></Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>icon disabled</p>
				<Btn class="icon" :disabled="true"><Icon name="inbox" /></Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>icon functional disabled</p>
				<Btn class="icon functional" :disabled="true"><Icon name="inbox" /></Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>warning</p>
				<Btn class="warning" @click="onClick">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>warning.accent</p>
				<Btn class="warning accent" @click="onClick">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>danger</p>
				<Btn class="danger" @click="onClick">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>.danger.accent</p>
				<Btn class="danger accent" @click="onClick">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>.info</p>
				<Btn class="info" @click="onClick">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>.info.accent</p>
				<Btn class="info accent" @click="onClick">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>.dropdown</p>
				<Btn
					:dropdown="[
						{
							name: 'ss',
							value: 1,
							action: (e) => {
								value = e.data.name
							}
						},
						{
							name: 's22222s',
							value: 2,
							action: (e) => {
								value = e.data.name
							}
						},
						{
							name: 'sdddds',
							value: 3,
							action: (e) => {
								value = e.data.name
							}
						}
					]"
					class="dropdown"
					>{{ value }}</Btn
				>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Btn, Icon } from '../src/main'
const onClick = () => {
	alert('CLICK')
}
const value = ref()
</script>
