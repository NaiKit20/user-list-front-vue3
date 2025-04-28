<script setup lang="ts">
import { ref, watch } from 'vue';
import BtnAction from './BtnAction.vue';

const props = defineProps<{
    is_open: boolean;
    title: string;
}>();

const emit = defineEmits<{
    (e: 'onOk'): void;
    (e: 'onCancel', value: boolean): void;
}>();

const open = ref(props.is_open);

watch(() => props.is_open, (new_value) => {
    open.value = new_value;
});
</script>

<template>
    <a-modal v-model:open="open" @cancel="emit('onCancel', false)">
        <div class="text-xl text-center font-bold m-8">
            {{ props.title }}
        </div>
        <template #footer>
            <div class="flex justify-center gap-8 mt-8">
                <BtnAction title="Delete" color="blue" size="sm" @click="emit('onOk')" />
                <BtnAction title="Cancel" color="red" size="sm" @click="emit('onCancel', false)" />
            </div>
        </template>
    </a-modal>
</template>
