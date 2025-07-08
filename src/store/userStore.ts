import { defineStore } from "pinia";
import { useCarStore } from "./cart";

export const useUserStore = defineStore("user", {
  state: () => ({
    // username:null as string | null,
    username: "",
    isLoggedIn: false,
  }),
  actions: {
    login(user: string) {
      this.username = user;
      this.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify({ username: user }));

      const cartStore = useCarStore();
      cartStore.loadCart();
    },
    logout() {
      const cartStore = useCarStore();
      cartStore.clearCart();

      this.username = "";
      this.isLoggedIn = false;
      localStorage.removeItem("user");
    },

    loadFromStorage() {
      const data = localStorage.getItem("user");
      if (data) {
        const { username } = JSON.parse(data);
        this.username = username;
        this.isLoggedIn = true;

        const cartStore = useCarStore();
        cartStore.loadCart();
      }
    },
  },
});
