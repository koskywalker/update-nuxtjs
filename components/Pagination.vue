.<template>
  <div
    class="pagination"
  >
    <client-only>
      <paginate
        v-model="pageNumber"
        :page-count="pageCount"
        :click-handler="transitionPage"
        :prev-text="'前へ'"
        :next-text="'次へ'"
        :container-class="'paginationList'"
        :page-class="'paginationListItem'"
        :page-link-class="'paginationListItemLink'"
        :prev-class="'paginationListItem paginationListItem--prev-next'"
        :prev-link-class="'paginationListItemLink'"
        :next-class="'paginationListItem paginationListItem--prev-next'"
        :next-link-class="'paginationListItemLink'"
        :break-view-class="'paginationListItem paginationListItem--breakView'"
        :break-view-link-class="'paginationListItemLink paginationListItemLink--breakView'"
        :active-class="'paginationListItem--active'"
        :disabled-class="'paginationListItem--disabled'"
        :hide-prev-next="true"
      />
    </client-only>
  </div>
</template>

<script>
import { CONSTANTS } from '@/assets/js/constants'
if (process.client) {
  require('@/plugins/vuejs-paginate.js')
}

export default {
  props: {
    path: {
      type: String,
      default () {
        return ''
      },
    },
    postsNumber: {
      type: Number,
      default () {
        return 0
      },
    },
  },
  data () {
    return {
      pageNumber: parseInt(this.$route.params.id) || 1,
    }
  },
  computed: {
    pageCount () {
      return Math.ceil(this.postsNumber / CONSTANTS.BASE_SETTINGS.POSTS_NUMBER_PER_PAGE)
    },
  },
  methods: {
    transitionPage (pageNumber) {
      this.$router.push(`${this.path}/${pageNumber}`)
      this.pageNumber = pageNumber
    },
  },
}
</script>

<style lang="scss">
.pagination {
  padding: 3rem 0;

  &List {
    align-items: center;
    display: flex;
    justify-content: center;

    &Item {
      margin: 0 0.3rem;

      &Link {
        color: $color_navy;
        display: block;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        width: 2rem;
      }

      &--breakView {
        margin: 0;
      }

      &--active .paginationListItemLink,
      &--disabled .paginationListItemLink {
        pointer-events: none;
      }

      &--active .paginationListItemLink {
        background-color: $color_navy;
        color: $color_white;
      }

      &:not(.paginationListItem--active):not(.paginationListItem--disabled) .paginationListItemLink:hover {
        background-color: $color_gray_middle;
      }
    }
  }
}
</style>
