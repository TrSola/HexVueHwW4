//module為不同作用域 需重新載入已在全域宣告的變數或物件
import { onMounted } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
let productModal = null;

export default {
  setup(props, { emit }) {
    const apiAdmin = `https://ec-course-api.hexschool.io/v2/api/aca101139/admin`;
    const confirmUpdate = () => {
      //不是寫入值 把.value去掉
      if (props.status === "new") {
        axios
          .post(`${apiAdmin}/product`, { data: props.tempProduct })
          .then((res) => {
            alert(res.data.message);
            productModal.hide();
            emit("get-data");
          })
          .catch((err) => alert(err.data.message));
      } else if (props.status === "edit") {
        axios
          .put(`${apiAdmin}/product/${props.tempProduct.id}`, {
            data: props.tempProduct,
          })
          .then((res) => {
            alert(res.data.message);
            productModal.hide();
            emit("get-data");
          })
          .catch((err) => alert(err.response.data.message));
      }
    };

    const createImages = () => {
      tempProduct.value.imagesUrl = [];
      tempProduct.value.imagesUrl.push("");
    };

    //onMounted包在setup內
    onMounted(() => {
      // 在此實體化才能正確讀取
      productModal = new bootstrap.Modal(
        document.getElementById("productModal"),
        {
          keyboard: false,
        }
      );
      emit("emitProductModal", productModal);
    });

    return { confirmUpdate, createImages };
  },

  props: ["status", "tempProduct"],

  template: `
    <div>
    <div
        id="productModal"
        ref="productModal"
        class="modal fade"
        tabindex="-1"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 id="productModalLabel" class="modal-title">
                <span v-if="status.value === 'new'">新增產品</span>
                <span v-else>編輯產品</span>
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="mb-2">
                    <div class="mb-3">
                      <label for="imageUrl" class="form-label"
                        >輸入圖片網址</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        placeholder="請輸入圖片連結"
                        v-model="tempProduct.imageUrl"
                      />
                    </div>
                    <img
                      class="img-fluid"
                      :src="tempProduct.imageUrl"
                      alt="主要圖片"
                    />
                  </div>
                  <h3>新增更多圖片</h3>
                  <template v-if="Array.isArray(tempProduct.imagesUrl)">
                    <div
                      v-for="(moreImg, i) in tempProduct.imagesUrl"
                      :key="moreImg + i"
                      class="mb-3"
                    >
                      <label :for="moreImg + i" class="form-label"
                        >更多圖片網址</label
                      >
                      <input
                        type="text"
                        v-model="tempProduct.imagesUrl[i]"
                        :id="moreImg + i"
                        class="form-control"
                      />
                      <img :src="tempProduct.imagesUrl[i]" class="img-fluid" />
                    </div>
                    <!-- 沒長度 = 空陣列 -->
                    <div
                      v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]"
                    >
                      <button
                        class="btn btn-outline-primary btn-sm d-block w-100"
                        @click="tempProduct.imagesUrl.push('')"
                      >
                        新增圖片
                      </button>
                    </div>
                    <div v-else>
                      <button
                        class="btn btn-outline-danger btn-sm d-block w-100"
                        @click="tempProduct.imagesUrl.pop()"
                      >
                        刪除圖片
                      </button>
                    </div>
                  </template>
                  <template v-else>
                    <div>
                      <button
                        class="btn btn-outline-primary btn-sm d-block w-100"
                        @click="createImages"
                      >
                        新增圖片
                      </button>
                    </div>
                  </template>
                </div>
                <div class="col-sm-8">
                  <div class="mb-3">
                    <label for="title" class="form-label">標題</label>
                    <input
                      id="title"
                      type="text"
                      class="form-control"
                      placeholder="請輸入標題"
                      v-model="tempProduct.title"
                    />
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="category" class="form-label">分類</label>
                      <input
                        id="category"
                        type="text"
                        class="form-control"
                        placeholder="請輸入分類"
                        v-model="tempProduct.category"
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="unit" class="form-label">單位</label>
                      <input
                        id="unit"
                        type="text"
                        class="form-control"
                        placeholder="請輸入單位"
                        v-model="tempProduct.unit"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="origin_price" class="form-label">原價</label>
                      <input
                        id="origin_price"
                        type="number"
                        min="0"
                        class="form-control"
                        placeholder="請輸入原價"
                        v-model.number="tempProduct.origin_price"
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">售價</label>
                      <input
                        id="price"
                        type="number"
                        min="0"
                        class="form-control"
                        placeholder="請輸入售價"
                        v-model.number="tempProduct.price"
                      />
                    </div>
                  </div>
                  <hr />

                  <div class="mb-3">
                    <label for="description" class="form-label">產品描述</label>
                    <textarea
                      id="description"
                      type="text"
                      class="form-control"
                      placeholder="請輸入產品描述"
                      v-model="tempProduct.description"
                    >
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <label for="content" class="form-label">說明內容</label>
                    <textarea
                      id="description"
                      type="text"
                      class="form-control"
                      placeholder="請輸入說明內容"
                      v-model="tempProduct.content"
                    >
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <div class="form-check">
                      <input
                        id="is_enabled"
                        class="form-check-input"
                        type="checkbox"
                        :true-value="1"
                        :false-value="0"
                        v-model="tempProduct.is_enabled"
                      />
                      <label class="form-check-label" for="is_enabled"
                        >是否啟用</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="confirmUpdate"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `,
};
