<script setup lang="ts">
import clsx from 'clsx';

const props = defineProps<{
    title: string;
    color: 'blue' | 'red';
    size: 'sm' | 'md';
}>();

const emit = defineEmits<{
    (e: 'click'): void;
}>();
</script>

<template>
    <button html-type="submit" :class="clsx(
        props.color === 'blue' ? 'bg-blue-500' : 'bg-red-500',
        props.size === 'sm' ? 'w-32' : 'w-40',
        '!text-white',
        'px-4 py-2 rounded-md active:scale-102'
    )" @click="emit('click')">
        {{ props.title }}
    </button>
</template>
