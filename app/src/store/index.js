import { createStore } from "vuex";
import api from "../Services/api";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    navList: {
      shop: [
        ["All-Products", 0],
        ["Tables", 0],
        ["Storage", 0],
        ["Seatings", 0],
        ["Lightings", 0],
        ["Accessories", 0],
      ],
      collections: [
        ["Artisan", 0],
        ["Bright", 0],
        ["Caterpillar", 0],
        ["Coco", 0],
        ["Collectables", 0],
        ["Karma Charcoal", 0],
        ["Outline", 0],
        ["Oxo", 0],
        ["Salvage", 0],
        ["Shelfmate", 0],
      ],
      craftsmanship: [
        ["Handcrafted Coco", 0],
        ["Handcrafted Iron", 0],
        ["Handcrafted Abaca", 0],
        ["Handcrafted Banana", 0],
        ["Handcrafted Rattan", 0],
        ["Handcrafted Teak", 0],
      ],
      service: [
        ["FAQ", 0],
        ["Payments & Refunds", 0],
        ["Returns", 0],
        ["Press", 0],
        ["Projects", 0],
        ["Contact", 0],
      ],
      menu: [
        ["Shop", 1],
        ["Collections", 1],
        ["Craftsmanship", 1],
        ["Service", 1],
        ["Stores", 0],
      ],
    },
    filters: {
      collections: [
        ["Artisan", 0],
        ["Bright", 0],
        ["Caterpillar", 0],
        ["Coco", 0],
        ["Collectables", 0],
        ["Karma Charcoal", 0],
        ["Outline", 0],
        ["Oxo", 0],
        ["Salvage", 0],
        ["Shelfmate", 0],
      ],
      rooms: [
        ["Dining Room", 0],
        ["Living Room", 0],
        ["Office", 0],
        ["Hallway", 0],
        ["Bedroom", 0],
      ],
    },
    cart: [],
    products: [],
    product: [],
    collections: [],
    priceFilter: 3000,
    sidebarIsOpen: false,
    filterSidebarIsOpen: false,
    cartIsOpen: false,
    colorChange: true,
    mobile: false,
    showColorChange: false,
    currentCategory: "All-Products",
    loading: false,
  },
  getters: {
    navmenu: (state) => state.navList,
    filters: (state) => state.filters,
    sidebarIsOpen: (state) => state.sidebarIsOpen,
    filterSidebarIsOpen: (state) => state.filterSidebarIsOpen,
    cartIsOpen: (state) => state.cartIsOpen,
    colorChange: (state) => state.colorChange,
    mobile: (state) => state.mobile,
    showColorChange: (state) => state.showColorChange,
    productList: (state) => state.products,
    product: (state) => state.product,
    currentCategory: (state) => state.currentCategory,
    collection: (state) => state.collections,
    priceFilter: (state) => state.priceFilter,
    loading: (state) => state.loading,
    cart: (state) => state.cart,
  },
  mutations: {
    sidebarToggle(state, openval) {
      state.sidebarIsOpen = openval;
    },
    cartToggle(state) {
      state.cartIsOpen = !state.cartIsOpen;
    },
    colorChangeOff(state) {
      state.colorChange = false;
    },
    colorChangeOn(state) {
      state.colorChange = true;
    },
    mobileToggle(state, viewport) {
      state.mobile = viewport;
    },
    colorChange(state, payload) {
      state.showColorChange = payload;
    },
    filterSidebarToggle(state) {
      state.filterSidebarIsOpen = !state.filterSidebarIsOpen;
    },
    setCollection(state, newList) {
      state.collections = newList;
    },
    priceFilter(state, newPriceFilter) {
      state.priceFilter = newPriceFilter;
    },
    setCategory(state, category) {
      state.currentCategory = category;
    },
    setLoading(state, load) {
      state.loading = load;
    },
    SET_PRODUCTS(state, response) {
      state.products = response;
    },
    SET_PRODUCT(state, response) {
      state.product = response;
    },
    SET_CART(state, newCart) {
      state.cart = newCart
    }
  },
  actions: {
    async FILTER_PRODUCTS({ commit, state }) {
      let response = await api().get("/products");
      let newData = [];
      let collection = state.collections;
      let priceFilter = state.priceFilter;
      let category = state.currentCategory;
      response.data.forEach((product) => {
        if (collection.length === 0) {
          if (product.price < priceFilter) {
            newData.push(product);
          }
        } else {
          console.log("in 2")
          collection.forEach((filter) => {
            if (product.title.includes(filter)) {
              if (product.price < priceFilter) {
                newData.push(product);
              }
            }
          });
        }
      });
      response.data = newData;
      if (
        category !== "All-Products"
      ) {
        response.data = response.data.filter(
          (product) => product.category === category
        );
      }
      commit("SET_PRODUCTS", response.data);
    },
    async LOAD_PRODUCTS({ commit }) {
      let response = await api().get("/products");
      commit("SET_PRODUCTS", response.data);
    },
    async LOAD_PRODUCT({ commit }, productId) {
      let response = await api().get(`/products/${productId}`);
      commit("SET_PRODUCT", response.data);
    },
    async ADD_TO_CART({ commit, state }, newItem) {
      let newCart = [...state.cart]
      let cartItemExists = false
      newCart.forEach((cartItem) => {
        if (cartItem.product._id === newItem.product._id) {
          cartItem.quantity++
          cartItemExists = true
        }
      })
      if (!cartItemExists)
        newCart.push(newItem)
      commit("SET_CART", newCart)
    },
    async CART_QUANTTY_INCREASE({ commit, state }, productId) {
      let newCart = [...state.cart]
      newCart.forEach((cartItem) => {
        if (cartItem.product._id === productId) {
          cartItem.quantity++
        }
      })
      commit("SET_CART", newCart)
    },
    async CART_QUANTTY_DECREASE({ commit, state }, productId) {
      let newCart = [...state.cart]
      newCart.forEach((item, index, object) => {
        if (item.product._id === productId) {
          if (item.quantity !== 1)
            item.quantity--
          else
            object.splice(index, 1);
        }
      })
      commit("SET_CART", newCart)
    },
    async CART_ITEM_DELETE({ commit, state }, productId) {
      let newCart = [...state.cart]
      newCart.forEach((item, index, object) => {
        if (item.product._id === productId) {
          object.splice(index, 1);
        }
      })
      commit("SET_CART", newCart)
    },
  },
  modules: {},
  plugins: [createPersistedState()]
});
