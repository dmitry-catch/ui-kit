<style></style>

<template>
	<Tabs v-model="tab">
		<Tab :value="1"><span>Tag</span></Tab>
		<Tab :value="'2'">2</Tab>
		<Tab :value="33">33</Tab>
		<Tab :value="null">null <Tag>33</Tag></Tab>
	</Tabs>
</template>

<script setup lang="ts">
import Tabs from '../src/ui/controls/Tabs/Tabs.vue'
import Tab from '../src/ui/controls/Tabs/Tab.vue'
import { ref } from 'vue'
import Tag from '../src/ui/text/Tag.vue'
const tab = ref(null)
</script>
