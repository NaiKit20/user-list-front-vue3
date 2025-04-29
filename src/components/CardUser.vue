<script setup lang="ts">
import { ref } from 'vue';
import type { GetUser } from '../services/UserService/response/GetUserResponse';
import BtnAction from './BtnAction.vue';
import ModalUser from './ModalUser.vue';
import { userService } from '../services/UserService/UserService';
import ModalConfirm from './ModalConfirm.vue';
import { fnNotiAlert } from './NotiAlert';

const props = defineProps<{
    user: GetUser;
}>();

const emit = defineEmits<{
    (e: 'onFetchData'): void;
}>();

const user_modal = ref<boolean>(false);
const cf_modal = ref<boolean>(false);

async function fnUpdateUser(user: GetUser) {
    try {
        const res = await userService.updateUser(user.uid, user);

        if (res.statusCode == 200) {
            user_modal.value = false;
            emit('onFetchData');
        }
    } catch {
        fnNotiAlert("This email is already in use.");
    }
}

async function fnDeleteUser() {
    try {
        const res = await userService.deleteUserById(props.user.uid);

        if (res.statusCode == 200) {
            cf_modal.value = false;
            emit('onFetchData');
        }
    } catch {
        fnNotiAlert("Failed to delete user");
    }
}

function fnImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg';
}
</script>

<template>
    <div class="rounded-md bg-white p-4 grid grid-cols-10 items-center">
        <img class="size-20 rounded-full col-span-1" :src="props.user.img" alt="" @error="fnImageError" />
        <div class="col-span-2">{{ props.user.name }}</div>
        <div class="col-span-1">{{ props.user.uid }}</div>
        <div class="col-span-3">{{ props.user.email }}</div>
        <div class="col-span-3 flex justify-evenly">
            <BtnAction title="Edit" color="blue" size="sm" @click="user_modal = true" />
            <BtnAction title="Delete" color="red" size="sm" @click="cf_modal = true" />
        </div>
        <ModalUser :is_open="user_modal" @on-cancel="user_modal = $event" @onOk="fnUpdateUser($event)"
            :user="props.user" />
        <ModalConfirm :is_open="cf_modal" :title="`Delete User ${props.user?.name}`" @on-cancel="cf_modal = $event"
            @onOk="fnDeleteUser" />
    </div>
</template>