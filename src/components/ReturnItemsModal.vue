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
          <img class="giftbox" src="/images/giftbox.svg" alt="" />
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
  cursor: pointer;
  transform: 0.3s ease;
}

.back-button:hover {
  background-color: #f3f2f2;
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
  cursor: pointer;
  transition: 0.3s ease;
}

.close-button:hover {
  filter: brightness(90%);
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
  cursor: pointer;
}

.start-return-button:hover {
  filter: brightness(90%);
}

.return-items-button {
  color: #2a46ff;
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  background-color: #f3f2f2;
  font-size: 20px;
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
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  background-color: #f3f2f2;
  font-size: 20px;
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
  font-size: 20px;
  background-color: #f3f2f2;
  border-radius: 8px;
  padding: 8px;
}

.giftbox {
  max-width: 10rem;
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

  .selected-customer-info {
    flex-direction: column;
  }
}
</style>
