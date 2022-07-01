<template>
  <div>
    <h1>Shop</h1>
    <div v-if="$fetchState.pending">
      <Loader />
    </div>
    <div v-else-if="$fetchState.error">
      An error occurred fetching shop data!
    </div>
    <div v-else>
      <div v-if="shop.length === 0">
        <p>No products are currently for sale, check back later!</p>
      </div>
      <div v-else>
        <ShopFilters
          :categories="categories"
          :selected-category="selectedCategory"
          @set-category="setCategory"
        />
        <div class="grid md:grid-cols-4 gap-6 md:gap-12">
          <ShopProduct
            v-for="price in shop"
            :key="price.id"
            :price="price"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageShopIndex',

  components: {
    Loader: () => import('@/components/layout/Loader.vue'),
    ShopFilters: () => import('@/components/shop/ShopFilters.vue'),
    ShopProduct: () => import('@/components/shop/ShopProduct.vue'),
  },

  scrollToTop: true,

  head: () => ({
    title: 'Shop',
  }),

  data: () => ({
    shop: [],
    categories: [],
    selectedCategory: null,
  }),

  async fetch () {
    this.shop = await this.$axios.get('/api/stripe/shoppable-products')
      .then(({ data: { prices } }) => prices)

    this.categories = this.shop.reduce((categories, price) => {
      if (price.product.metadata.category) {
        if (!categories.includes(price.product.metadata.category)) {
          categories.push(price.product.metadata.category);
        }
      }

      return categories;
    }, [])
  },

  computed: {
    products() {
      if (this.selectedCategory == null) {
        return this.shop;
      }

      return this.shop.filter(product => product.metadata.category === this.selectedCategory);
    },
  },

  methods: {
    setCategory(category) {
      this.selectedCategory = category;
    },
  },
}
</script>
