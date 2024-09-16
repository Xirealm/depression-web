import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref({
    account: "",
    type: "",
  });
  const setUser = (
    account: string,
    type: string,
  ) => {
    user.value = { account,type }
  };
  const logout = () => {
    user.value = {
      account: "",
      type: "",
    };
  };
  return {
    user,
    setUser,
    logout,
  };
},
{
    persist:true
});