<template>
  <div v-if="showModal" class="modal-backdrop">
    <div class="modal-container">
      <template v-if="screen === 'returnItems'">
        <div class="modal-header">
          <div class="header-left">
            <div class="back-button" @click="handleBack">
              <img src="/images/left-arrow.png" alt="" />
            </div>
            <div class="header-title">
              <h5 class="header-title-return">Return Items</h5>
              <h3 class="header-title-select">Select customer</h3>
            </div>
          </div>
          <div class="close-button" @click="closeModal">
            <img src="/images/close.png" alt="" />
          </div>
        </div>

        <div class="mobile-header">
          <div class="mobile-header-top">
            <div class="back-button" @click="handleBack">
              <img src="/images/left-arrow.png" alt="" />
            </div>
            <div class="close-button" @click="closeModal">
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
            <button class="start-return-button" @click="startReturn(customer)">
              Start return
              <img src="/images/right-arrow.png" alt="" />
            </button>
          </div>
        </div>
      </template>

      <template v-else-if="screen === 'backModal'">
        <div class="back-content">
          <button class="return-items-button" @click="returnItems">
            Return Items
          </button>
        </div>
      </template>

      <template v-else-if="screen === 'startReturn'">
        <div class="start-return-content">
          <div>Returning item</div>
          <img class="truck" src="/images/truck.svg" alt="" />
          <div class="selected-customer-id">
            {{ selectedCustomer.datasource_id }}
          </div>
          <div class="selected-customer-info">
            <div>
              {{
                `${selectedCustomer.name.split(" ")[0]} ${
                  selectedCustomer.name_2.split(" ")[0]
                },`
              }}
            </div>
            <div v-if="selectedCustomer.shipping_addresses.length > 0">
              {{ selectedCustomer.shipping_addresses[0]?.city }}
            </div>
            <div v-if="selectedCustomer.shipping_addresses.length == 0">
              {{ selectedCustomer.store_locations[0]?.city }}
            </div>
          </div>
          <button class="ok-button" @click="returnItems">OK</button>
        </div>
      </template>
    </div>
  </div>
  <div v-else class="background-container">
    <button class="return-items-button" @click="openModal">Return Items</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: true,
      screen: "returnItems",
      searchQuery: "",
      selectedCustomer: null,
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
      this.screen = "backModal";
    },
    closeModal() {
      this.showModal = false;
    },
    returnItems() {
      this.screen = "returnItems";
    },
    openModal() {
      this.showModal = true;
      this.screen = "returnItems";
    },
    startReturn(customer) {
      this.selectedCustomer = customer;
      this.screen = "startReturn";
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
  padding: 2rem;
  box-sizing: border-box;
}

.modal-container {
  background: #ffffff;
  width: 48rem;
  max-width: 95%;
  display: flex;
  flex-direction: column;
  border-radius: 1.5rem;
  max-height: calc(100vh - 64px);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.mobile-header {
  display: none;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.mobile-header-title {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 0.5rem;
}

.mobile-header-top {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.back-button {
  flex-shrink: 0;
  border: 1px solid #f3f2f2;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transform: 0.3s ease;
}

.back-button:hover {
  background-color: #f3f2f2;
}

.header-title {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
}

.header-title-return,
.header-title-select {
  margin: 0;
}

.header-title-return {
  font-size: 0.75rem;
  font-weight: 600;
}

.header-title-select {
  font-size: 1.125rem;
}

.header-left {
  display: flex;
  gap: 1.125rem;
}

.close-button {
  background-color: #f3f2f2;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.5rem;
  flex-shrink: 0;
  cursor: pointer;
  transition: 0.3s ease;
}

.close-button:hover {
  filter: brightness(90%);
}

.results-count {
  font-weight: 600;
  font-size: 0.75rem;
}

.search-bar {
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  border-bottom: 1px solid #e4e4e5;
  align-items: center;
}

.search-input {
  min-width: 0;
  width: 19rem;
  height: 2.5rem;
  background-color: #f3f2f2;
  border: none;
  border-radius: 1.5rem;
  color: #62717e;
  font-weight: 600;
  font-size: 0.875rem;
  background-image: url("../../public/images/search.png");
  background-repeat: no-repeat;
  background-position: 0.625rem center;
  background-size: 1.25rem auto;
  padding-right: 0.625rem;
  padding-left: 2.5rem;
}

.customer-row {
  display: flex;
  padding: 0.75rem 1rem;
  justify-content: space-between;
  border-top: 1px solid #f3f2f2;
}

.initials-square {
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  font-size: 1rem;
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
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 1.5rem;
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
  gap: 1rem;
  align-items: center;
  width: 28.438rem;
  min-width: 0;
}

.customer-full-name {
  display: flex;
  gap: 0.25rem;
  font-weight: 500;
  font-size: 0.875rem;
}

.customer-id-parent {
  display: flex;
  gap: 0.25rem;
}

.parent-full-name {
  display: flex;
  gap: 0.25rem;
  font-weight: 500;
  font-size: 0.875rem;
}

.customer-id {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 0.625rem;
  background-color: #f3f2f2;
  border-radius: 1.5rem;
  padding: 0rem 0.5rem;
}

.location-info {
  display: flex;
  width: 10.25rem;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  margin-left: 0.625rem;
  flex-shrink: 2;
}

.customer-info {
  flex-shrink: 1;
}

.start-return-button {
  background-color: #f3f2f2;
  border-radius: 1.5rem;
  border: none;
  color: #2a46ff;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0rem 0.625rem;
  text-align: center;
  flex-wrap: nowrap;
  flex-shrink: 0;
  margin-left: 0.625rem;
  cursor: pointer;
}

.start-return-button:hover {
  filter: brightness(90%);
}

.return-items-button {
  color: #2a46ff;
  padding: 0.625rem 1rem;
  border-radius: 0.625rem;
  border: none;
  background-color: #f3f2f2;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  text-align: center;
  flex-wrap: nowrap;
  flex-shrink: 0;
  transition: 0.3s ease;
  cursor: pointer;
}

.return-items-button:hover {
  filter: brightness(90%);
  transform: scale(1.05);
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

.back-content {
  height: calc(100vh - 64px);
  max-width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.start-return-content {
  height: calc(100vh - 64px);
  max-width: 95%;
  display: flex;
  flex-direction: column;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.selected-customer-info {
  display: flex;
  gap: 0.25rem;
}

.ok-button {
  margin-top: 0.5rem;
  color: #2a46ff;
  padding: 0.625rem 1rem;
  border-radius: 0.625rem;
  border: none;
  background-color: #f3f2f2;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  text-align: center;
  flex-wrap: nowrap;
  flex-shrink: 0;
  transition: 0.3s ease;
  cursor: pointer;
}

.ok-button:hover {
  filter: brightness(90%);
  transform: scale(1.05);
}

.selected-customer-id {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.25rem;
  background-color: #f3f2f2;
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.truck {
  max-width: 10rem;
}

@media (max-width: 540px) {
  .search-bar {
    flex-direction: column;
    gap: 0.625rem;
    padding: 0px 1rem 1rem 1rem;
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

  .selected-customer-info {
    flex-direction: column;
  }
}
</style>
