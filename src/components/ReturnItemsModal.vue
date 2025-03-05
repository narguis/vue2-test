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

      <div class="search-bar">
        <input
          type="text"
          placeholder="Search for ID or name"
          class="search-input"
        />
        <div class="results-count">56 of 56</div>
      </div>

      <div class="customer-list">
        <div class="customer-row">
          <div class="initials-square">GN</div>

          <div class="customer-info">
            <div class="customer-name">Guilherme Narguis</div>
            <div class="customer-city">Brasília</div>
          </div>

          <button class="start-return-btn">Start return</button>
        </div>
      </div>
    </div>
  </div>
</template>

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
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.back-button {
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
  padding-left: 40px;
}
</style>
