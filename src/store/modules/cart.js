import data from "@/assets/json/cart/index.json";
export default {
  namespaced: true,
  state() {
    return {
      list: [],
      totalCount: 0,
      totalPrice: 0,
    };
  },
  mutations: {
    refresh(state) {
      state.totalPrice = state.list.reduce(
        (sum, item) => sum + item.count * item.price,
        0
      );
      state.totalCount = state.list.reduce((sum, item) => sum + item.count, 0);
    },
    updateList(state, payload) {
      state.list = payload;
    },
    add(state, payload) {
      state.list = state.list.map((item) => {
        if (item.id === payload.id) {
          item.count++;
        }
        return item;
      });
    },
    sub(state, payload) {
      state.list = state.list.map((item) => {
        if (item.id === payload.id) {
          if (item.count <= 0) {
            return item;
          }
          item.count--;
        }
        return item;
      });
    },
  },
  actions: {
    async fetchList(context) {
      // axios
      context.commit("updateList", data.cart);
      context.commit("refresh");
    },
    async add(context, payload) {
      console.log(context);
      context.commit("add", payload);
      context.commit("refresh");
    },
    async sub(context, payload) {
      context.commit("sub", payload);
      context.commit("refresh");
    },
  },
};
