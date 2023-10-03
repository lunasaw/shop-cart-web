<template>
  <div class="app-container">
    <!-- Header 区域 -->
    <cart-header></cart-header>

    <!-- 商品 Item 项组件 -->
    <cart-item v-for="item in list" :key="item.id" :item="item"></cart-item>

    <!-- Foote 区域 -->
    <cart-footer
      :totalCount="totalCount"
      :totalPrice="totalPrice"
    ></cart-footer>
  </div>
</template>

<script>
import CartHeader from "@/components/cart-header.vue";
import CartFooter from "@/components/cart-footer.vue";
import CartItem from "@/components/cart-item.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    CartHeader,
    CartFooter,
    CartItem,
  },
  data() {
    return {
      itemList: [],
    };
  },
  computed: {
    ...mapState("cart", ["list", "totalCount", "totalPrice"]),
    cartList() {
      return this.$store.state.cart.list;
    },
  },
  created() {
    this.dataInit();
    console.log(this.$store.state.cart.list);
  },
  methods: {
    dataInit() {
      this.$store.dispatch("cart/fetchList");
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
  padding: 50px 0;
  font-size: 14px;
}
</style>
