<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import BtnAction from './BtnAction.vue';
import type { GetUser } from '../services/UserService/response/GetUserResponse';

const props = defineProps<{
    is_open: boolean;
    user?: GetUser;
}>();

const emit = defineEmits<{
    (e: 'onOk', value: GetUser): void;
    (e: 'onCancel', value: boolean): void;
}>();

const open = ref(props.is_open);
const user = reactive<GetUser>({
    uid: props.user?.uid || 0,
    img: props.user?.img || '',
    name: props.user?.name || '',
    email: props.user?.email || ''
});

function fnSetInitUser() {
    user.uid = props.user?.uid || 0;
    user.img = props.user?.img || '';
    user.name = props.user?.name || '';
    user.email = props.user?.email || '';
}

function fnImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg';
}

watch(() => props.is_open, (new_value) => {
    open.value = new_value;
    fnSetInitUser();
});
</script>

<template>
    <a-modal v-model:open="open" :title="props.user ? 'Edit User' : 'Create User'" footer=""
        @cancel="emit('onCancel', false)">
        <div class="flex flex-col gap-4 items-center">
            <img class="size-20 rounded-full col-span-1" :src="user.img" alt="" @error="fnImageError" />
            <a-form :model="user" name="basic" layout="vertical" autocomplete="off" @finish="emit('onOk', user)"
                class="w-full">
                <a-form-item label="Image" name="img"
                    :rules="[{ required: true, message: 'Please input image URL address' }]">
                    <a-input v-model:value="user.img" />
                </a-form-item>
                <a-form-item label="Name" name="name" :rules="[{ required: true, message: 'Please input name' }]">
                    <a-input v-model:value="user.name" />
                </a-form-item>
                <a-form-item label="Email" name="email"
                    :rules="[{ required: true, type: 'email', message: 'Please input email' }]">
                    <a-input v-model:value="user.email" />
                </a-form-item>
                <div class="flex justify-evenly mt-12">
                    <a-form-item>
                        <BtnAction :title="props.user ? 'Edit' : 'Add'" color="blue" size="sm" />
                    </a-form-item>
                    <a-form-item>
                        <BtnAction title="Cancel" color="red" size="sm" @click="emit('onCancel', false)" />
                    </a-form-item>
                </div>
            </a-form>
        </div>
    </a-modal>
</template>
