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
				<Btn @click="onClick" :disabled="true">Кнопка</Btn>
			</div>

			<div class="ButtonStand__currentButton">
				<p>accent</p>
				<Btn @click="onClick" class="accent">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>accent disabled</p>
				<Btn @click="onClick" class="accent" :disabled="true">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>minimal</p>
				<Btn @click="onClick" class="minimal">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>minimal disabled</p>
				<Btn @click="onClick" class="minimal" :disabled="true">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>functional</p>
				<Btn @click="onClick" class="functional">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>functional disabled</p>
				<Btn @click="onClick" class="functional" :disabled="true">Кнопка</Btn>
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
				<Btn @click="onClick" class="warning">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>warning.accent</p>
				<Btn @click="onClick" class="warning accent">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>danger</p>
				<Btn @click="onClick" class="danger">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>.danger.accent</p>
				<Btn @click="onClick" class="danger accent">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>.info</p>
				<Btn @click="onClick" class="info">Кнопка</Btn>
			</div>
			<div class="ButtonStand__currentButton">
				<p>.info.accent</p>
				<Btn @click="onClick" class="info accent">Кнопка</Btn>
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
