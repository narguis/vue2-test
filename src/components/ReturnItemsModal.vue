<template>
  <div class="modal-backdrop">
    <div class="modal-container">
      <div class="modal-header">
        <div class="header-left">
          <div class="back-button">
            <img src="/images/left-arrow.png" alt="" />
          </div>
          <div class="header-title">
            <h5 class="header-title-return">Return Items</h5>
            <h3 class="header-title-select">Select customer</h3>
          </div>
        </div>
        <div class="close-button">
          <img src="/images/close.png" alt="" />
        </div>
      </div>

      <div class="mobile-header">
        <div class="mobile-header-top">
          <div class="back-button">
            <img src="/images/left-arrow.png" alt="" />
          </div>
          <div class="close-button">
            <img src="/images/close.png" alt="" />
          </div>
        </div>
        <div class="mobile-header-title">
          <h5 class="header-title-return">Return Items</h5>
          <h3 class="header-title-select">Select customer</h3>
        </div>
      </div>

      <div class="search-bar">
        <input
          type="text"
          placeholder="Search for ID or name"
          class="search-input"
          v-model="searchQuery"
        />
        <div class="results-count">
          {{ queriedCustomers.length }} of {{ totalCustomers }}
        </div>
      </div>

      <div class="customer-list">
        <div
          v-for="customer in queriedCustomers"
          :key="customer.datasource_id"
          class="customer-row"
        >
          <div class="row-leftside">
            <div class="initials-square">
              {{ customer.name[0] }}{{ customer.name_2[0] }}
            </div>

            <div class="customer-info">
              <div class="customer-id-parent">
                <div class="customer-id">
                  {{ customer.datasource_id }}
                </div>
                <div class="parent-full-name" v-if="customer.parent">
                  <div class="parent-name">
                    {{ customer.parent.name.split(" ")[0] }}
                  </div>
                  <div class="dot" v-if="customer.parent.name_2">•</div>
                  <div class="parent-surname">
                    {{ customer.parent.name_2.split(" ")[0] }}
                  </div>
                </div>
              </div>
              <div class="customer-full-name">
                <div class="customer-name">
                  {{ customer.name.split(" ")[0] }}
                </div>
                <div class="dot" v-if="customer.name_2">•</div>
                <div class="customer-surname">
                  {{ customer.name_2.split(" ")[0] }}
                </div>
              </div>
            </div>
          </div>
          <div class="location-info">
            <div class="customer-city">
              <div v-if="customer.shipping_addresses.length > 0">
                {{ customer.shipping_addresses[0]?.city }}
              </div>
              <div v-if="customer.shipping_addresses.length == 0">
                {{ customer.store_locations[0]?.city }}
              </div>
            </div>
          </div>
          <button class="start-return-button">
            Start return
            <img src="/images/right-arrow.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datasource_id: "10005_1",
      name: "Guilherme",
      name_2: "Narguis",
      status: "Approved",
      city: "Brasília",
      parent_name: "Miss",
      parent_name_2: "Narguis",
      customerCount: 56,
      searchQuery: "",
    };
  },

  computed: {
    totalCustomers() {
      return this.$store.state.customers.length;
    },
    queriedCustomers() {
      return this.$store.getters.queriedCustomers(this.searchQuery);
    },
  },

  methods: {
    handleBack() {
      alert("Back");
    },
    startReturn() {
      alert("Start return");
    },
  },

  created() {
    this.$store.dispatch("loadCustomers");
  },
};
</script>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  box-sizing: border-box;
}

.modal-container {
  background: #ffffff;
  width: 768px;
  max-width: 95%;
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  max-height: calc(100vh - 64px);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.mobile-header {
  display: none;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.mobile-header-title {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 8px;
}

.mobile-header-top {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.back-button {
  flex-shrink: 0;
  border: 1px solid #f3f2f2;
  width: 40px;
  height: 40px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-title {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}

.header-title-return,
.header-title-select {
  margin: 0;
}

.header-title-return {
  font-size: 12px;
  font-weight: 600;
}

.header-title-select {
  font-size: 18px;
}

.header-left {
  display: flex;
  gap: 18px;
}

.close-button {
  background-color: #f3f2f2;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  flex-shrink: 0;
}

.results-count {
  font-weight: 600;
  font-size: 12px;
}

.search-bar {
  display: flex;
  padding: 16px;
  justify-content: space-between;
  border-bottom: 1px solid #e4e4e5;
  align-items: center;
}

.search-input {
  min-width: 0;
  width: 304px;
  height: 40px;
  background-color: #f3f2f2;
  border: none;
  border-radius: 24px;
  color: #62717e;
  font-weight: 600;
  font-size: 14px;
  background-image: url("../../public/images/search.png");
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 20px auto;
  padding-right: 10px;
  padding-left: 40px;
}

.customer-row {
  display: flex;
  padding: 12px 16px;
  justify-content: space-between;
  border-top: 1px solid #f3f2f2;
}

.initials-square {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  font-size: 16px;
  color: #ffffff;
  font-weight: 700;
  background: linear-gradient(
    133.53deg,
    #00ffa3 2.44%,
    rgba(0, 194, 255, 0.17) 100%
  );
  flex-shrink: 0;
}

.initials-square::after {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 24px;
  background-color: #2dc579;
  background-image: url("../../public/images/checkmark.png");
  background-repeat: no-repeat;
  bottom: 0;
  right: 0;
  background-position: center;
  background-size: calc(100% - 4px);
  padding: 1px;
  border: 1px solid #ffffff;
}

.row-leftside {
  display: flex;
  gap: 16px;
  align-items: center;
  width: 455px;
  min-width: 0;
}

.customer-full-name {
  display: flex;
  gap: 4px;
  font-weight: 500;
  font-size: 14px;
}

.customer-id-parent {
  display: flex;
  gap: 4px;
}

.parent-full-name {
  display: flex;
  gap: 4px;
  font-weight: 500;
  font-size: 14px;
}

.customer-id {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 10px;
  background-color: #f3f2f2;
  border-radius: 24px;
  padding: 0px 8px;
}

.location-info {
  display: flex;
  width: 164px;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;
}

.start-return-button {
  background-color: #f3f2f2;
  border-radius: 24px;
  border: none;
  color: #2a46ff;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0px 10px;
  text-align: center;
  flex-wrap: nowrap;
  flex-shrink: 0;
  margin-left: 10px;
}

.customer-list {
  overflow: auto;
  scrollbar-width: none;
}

.customer-info,
.location-info {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

@media (max-width: 540px) {
  .search-bar {
    flex-direction: column;
    gap: 10px;
    padding: 0px 16px 16px 16px;
  }
  .search-input {
    width: 80%;
  }

  .mobile-header {
    display: flex;
  }

  .modal-header {
    display: none;
  }
}
</style>
