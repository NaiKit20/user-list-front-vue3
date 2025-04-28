<script setup lang="ts">
import { ref } from 'vue';
import BtnAction from './BtnAction.vue';
import ModalUser from './ModalUser.vue';
import type { GetUser } from '../services/UserService/response/GetUserResponse';
import { userService } from '../services/UserService/UserService';
import { fnNotiAlert } from './NotiAlert';

const emit = defineEmits<{
  (e: 'onFetchData'): void;
}>();

const is_open = ref<boolean>(false);

async function fnAddUser(user: GetUser) {
  try {
    const res = await userService.addUser(user);

    if (res.statusCode == 201) {
      is_open.value = false;
      emit('onFetchData');
    }
  } catch {
    fnNotiAlert("This email is already in use.");
  }
}
</script>

<template>
  <div class="flex justify-between items-center">
    <div class="text-blue-500 font-bold text-xl">List User</div>
    <BtnAction title="Create User +" color="blue" size="md" @click="is_open = true" />
    <ModalUser :is_open="is_open" @on-cancel="is_open = $event" @onOk="fnAddUser($event)" />
  </div>
</template>
