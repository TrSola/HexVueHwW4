import {
  createApp,
  ref,
  onMounted,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

let productModal2 = null;
let delProductModal2 = null;

//記得加入.js
import productModal from "./ProductModal.js";
import delProductModal from "./DelProductModal.js";
import pagination from "./Pagination.js";
createApp({
  setup() {
    const apiUrl = "https://ec-course-api.hexschool.io/v2";
    const apiPath = "aca101139";

    const status = ref(false);
    const productList = ref([]);
    const tempProduct = ref({
      imagesUrl: [],
    });
    const pagination = ref({});

    const checkLogin = () => {
      axios
        .post(`${apiUrl}/api/user/check`)
        .then(() => {
          getData();
        })
        .catch((err) => {
          alert(err.data.message);
          window.location = "index.html";
        });
    };
    // 若()內未帶入參數 page預設值為 1
    const getData = (page = 1) => {
      axios
        .get(`${apiUrl}/api/${apiPath}/admin/products?page=${page}`)
        .then((res) => {
          productList.value = res.data.products;
          pagination.value = res.data.pagination;
        })
        .catch((err) => alert(err.response.data.message));
    };

    const openModal = (arg, product) => {
      if (arg === "new") {
        tempProduct.value = {
          imagesUrl: [],
        };
        status.value = "new";
        productModal2.show();
      } else if (arg === "edit") {
        tempProduct.value = { ...product };
        status.value = "edit";
        productModal2.show();
      } else if (arg === "delete") {
        tempProduct.value = { ...product };
        delProductModal2.show();
      }
    };

    const emitProductModal = (productModal) => {
      productModal2 = productModal;
    };
    const emitDelProductModal = (delProductModal) => {
      delProductModal2 = delProductModal;
    };

    onMounted(() => {
      // Retrieve Token
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)WillyToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      axios.defaults.headers.common.Authorization = token;

      checkLogin();
    });

    return {
      status,
      productList,
      tempProduct,
      openModal,
      getData,
      emitProductModal,
      emitDelProductModal,
      pagination,
    };
  },
  //components 以物件加入 與setup同層
  components: {
    productModal,
    delProductModal,
    pagination,
  },
}).mount("#app");
