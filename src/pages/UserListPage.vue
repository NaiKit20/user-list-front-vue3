<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CardUser from '../components/CardUser.vue';
import TopBar from '../components/TopBar.vue';
import type { TypeResponse } from '../services/TypeResponse';
import type { GetUser } from '../services/UserService/response/GetUserResponse';
import { userService } from '../services/UserService/UserService';
import { fnNotiAlert } from '../components/NotiAlert';

const users = ref<TypeResponse<GetUser[]>>();

async function fnGetAllUser() {
  try {
    users.value = await userService.getAllUser();
  } catch {
    fnNotiAlert('Failed to fetch users');
  }
}

onMounted(async () => {
  fnGetAllUser();
});
</script>

<template>
  <div class="min-h-screen bg-gray-200 flex flex-col p-4 gap-4">
    <TopBar @on-fetch-data="fnGetAllUser" />
    <div class="rounded-md bg-white p-4 grid grid-cols-10">
      <span class="col-span-1"></span>
      <div class="col-span-2">Name</div>
      <div class="col-span-1">ID</div>
      <div class="col-span-3">Email</div>
    </div>
    <CardUser v-for="user in users?.data" :user="user" @on-fetch-data="fnGetAllUser" />
  </div>
</template>