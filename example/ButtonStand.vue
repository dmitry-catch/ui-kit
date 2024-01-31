<script setup lang="ts">
import { ref } from 'vue'
import { Button, Icon } from '../src/main.js'

const onClick = () => {
	alert('CLICK')
}
const value = ref()
</script>

<template>
	<div class="ButtonStand">
		<div class="ButtonStand__ButtonStand__currentButtonsContainer">
			<div class="ButtonStand__currentButton">
				<p>Button_actual</p>
				<Button @click="onClick">Кнопка</Button>
			</div>
			<div class="ButtonStand__currentButton">
				<p>Disabled</p>
				<Button :disabled="true" @click="onClick">Кнопка</Button>
			</div>

			<div class="ButtonStand__currentButton">
				<p>accent</p>
				<Button class="accent" @click="onClick">Кнопка</Button>
			</div>
			<div class="ButtonStand__currentButton">
				<p>accent disabled</p>
				<Button class="accent" :disabled="true" @click="onClick">Кнопка</Button>
			</div>
			<div class="ButtonStand__currentButton">
				<p>minimal</p>
				<Button class="minimal" @click="onClick">Кнопка</Button>
			</div>
			<div class="ButtonStand__currentButton">
				<p>minimal disabled</p>
				<Button class="minimal" :disabled="true" @click="onClick">Кнопка</Button>
			</div>
			<div class="ButtonStand__currentButton">
				<p>functional</p>
				<Button class="functional" @click="onClick">Кнопка</Button>
			</div>
			<div class="ButtonStand__currentButton">
				<p>functional disabled</p>
				<Button class="functional" :disabled="true" @click="onClick">Кнопка</Button>
			</div>
			<div class="ButtonStand__currentButton">
				<p>icon</p>
				<Button class="icon">
					<Icon name="inbox" />
				</Button>
			</div>
			<div class="ButtonStand__currentButton">
				<p>icon functional</p>
				<Button class="icon functional">
					<Icon name="inbox" />
				</Button>
			</div>
			<div class="ButtonStand__currentButton">
				<p>icon disabled</p>
				<Button class="icon" :disabled="true">
					<Icon name="inbox" />
				</Button>
			</div>
			<div class="ButtonStand__currentButton">
				<p>icon functional disabled</p>
				<Button class="icon functional" :disabled="true">
					<Icon name="inbox" />
				</Button>
			</div>
			<div class="ButtonStand__currentButton">
				<p>warning</p>
				<Button class="warning" @click="onClick">Кнопка</Button>
			</div>
			<div class="ButtonStand__currentButton">
				<p>warning.accent</p>
				<Button class="warning accent" @click="onClick">Кнопка</Button>
			</div>
			<div class="ButtonStand__currentButton">
				<p>danger</p>
				<Button class="danger" @click="onClick">Кнопка</Button>
			</div>
			<div class="ButtonStand__currentButton">
				<p>.danger.accent</p>
				<Button class="danger accent" @click="onClick">Кнопка</Button>
			</div>
			<div class="ButtonStand__currentButton">
				<p>.info</p>
				<Button class="info" @click="onClick">Кнопка</Button>
			</div>
			<div class="ButtonStand__currentButton">
				<p>.info.accent</p>
				<Button class="info accent" @click="onClick">Кнопка</Button>
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
					>{{ value }}
				</Btn>
			</div>
		</div>
	</div>
</template>

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
