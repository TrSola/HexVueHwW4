export default {
  setup(props, { emit }) {
    // 將emit寫在function內回傳出去
    const emitPages = (i) => {
      emit("emit-pages", i);
    };
    return { emitPages };
  },
  //這裡的props => 'pages'是給下方template用的
  props: ["pages"],

  template: `
    <div>
    <div class="page">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li
                class="page-item"
                :class="{'disabled': pages.current_page === 1}"
              >
                <a
                  class="page-link"
                  href="#"
                  aria-label="Previous"
                  @click.prevent="emitPages(pages.current_page - 1)"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li
                v-for="(item, index) in pages.total_pages"
                :key="index"
                class="page-item"
                :class="{'active': item === pages.current_page}"
              >
                <span class="page-link" v-if="item === pages.current_page"
                  >{{ item }}</span
                >
                <a
                  class="page-link"
                  href="#"
                  v-else
                  @click.prevent="emitPages(item)"
                  >{{ item }}</a
                >
              </li>
              <li
                class="page-item"
                :class="{'disabled': pages.current_page === pages.total_pages}"
              >
                <a
                  class="page-link"
                  href="#"
                  aria-label="Next"
                  @click.prevent="emitPages(pages.current_page + 1)"
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
    </div>
    `,
};
