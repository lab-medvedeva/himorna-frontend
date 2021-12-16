<template>
    <div class="table-wrap">
      <h4 v-if="data.title">{{ data.title }}</h4>
        <table class="table">
          <tbody>
            <tr>
              <th v-for="(header, name, index) in data.data[0]" :key="index" id="table-header">{{ (function(x) {
                if (x == "HM") {
                  return ("Histone Modification")
                } else if (name == "Corr") {
                    return ("Correlation Coefficient")
                }else if (x == "number of lncRNAs with corr"){
                  return ("number of lncRNAs with correlated peaks")

                } else if (x == "number of peaks with corr") {
                    return ("number of peaks correlated with lncRNAs")

                } else if(x == "number of genes associated with peaks") {
                  return (" number of genes associated with lncRNA-correlated peaks")
                } else if (x == "number of tissues") {
                  return("number of biosamples")
                }
                else {
                  return(x)
                }
                })(name) }}</th>
            </tr>
            <tr v-for="(item, index) in data.data" :key="index">
              <td v-for="(td, name, index) in item" :key="index">
                <router-link v-if="name === 'Histone Modification' && td != 'None'" class="table-link" :to="{path: '/info/histone/' + td}">{{ td }}</router-link>
                <router-link v-else-if="name === 'lncRNA' && td != 'None'" class="table-link" :to="{path: '/info/lncrna/' + td}">{{ td }}</router-link>
                <router-link v-else-if="name === 'Gene' && td != 'None'" class="table-link" :to="{path: '/info/gene/' + td}">{{ td }}</router-link>
                <router-link v-else-if="name === 'Corr' && td != 'None'" class="table-link" :to="{name: 'Corr', query: {peak: item['Peak Id'], lncrna: item.lncRNA, hm: item['Histone Modification']}}">{{ td }}</router-link>
                <p v-else>{{ td }}</p>
              </td>
            </tr> 
          </tbody>
        </table>
        <div class="table-pagination" v-if="paginationShow">
          <p class="table-pagination__text">{{max * page - max + 1}}-{{max * page > data.all_counts ? data.all_counts : max * page}} of {{ data.all_counts ? data.all_counts : 'many'}} items</p>
          <div class="table-pagination__item back" @click="changePage('back')">
            <img src="@/assets/images/icon_arrow.svg">
          </div>
          <div class="table-pagination__item next" @click="changePage('next')">
            <img src="@/assets/images/icon_arrow.svg">
          </div>
        </div>
        <div class="block-nodata" v-if="!data">
          <p>No data</p>
        </div>
        <div class="block-nodata" v-if="data.all_counts === 0">
          <p>Nothing found</p>
        </div>
    </div>
</template>
<script>

export default {
  name: 'table',
  props: {
    data: {
      type: [Array, Object],
      required: true
    },
    max: {
      type: Number,
      required: false,
      default: 10
    },
    num: {
      type: Number,
      required: false,
      default: 1
    }
  },
  data: () => {
    return {
      page: 1
    }
  },
  methods: {
    changePage(direction) {
      if (direction === 'back') {
        this.page = this.page > 1 ? this.page - 1 : this.page
      } else {
        this.page = this.page < this.data.all_counts / this.max || !this.data.all_counts ? this.page + 1 : this.page
      }
    }
  },
  computed: {
    getPage() {
      return this.page
    },
    paginationShow () {
      let result = true;
      if (this.data.all_counts && this.data.data.length >= this.max) {
        result = this.max < this.data.all_counts && this.data
      } else {
        this.data.data && this.data.data.length !== this.max ? result = false : ''
      }
      return result
    }
  },
  watch: {
    async getPage () {
      let data;
      let route = this.$route.name;
      switch (route) {
        case 'result':
          this.$store.dispatch('setLoader', true)
          data = await this.$store.getters.getSearchData;
          await this.$store.dispatch('search', [data, this.page, this.max]);
          this.$store.dispatch('setLoader', false)
          break;
        case 'histone':
          this.$store.dispatch('setLoader', true)
          await this.$store.dispatch('fetchHistone', [this.$route.params.id, this.page, this.max]);
          this.$store.dispatch('setLoader', false)
          break;
        case 'lncrna':
          this.$store.dispatch('setLoader', true)
          await this.$store.dispatch('fetchLncrna', [this.$route.params.id, this.page, this.max]);
          this.$store.dispatch('setLoader', false)
          break;
        case 'gene':
          this.$store.dispatch('setLoader', true)
          await this.num == '2' ? this.$store.dispatch('fetchGene', [this.$route.params.id, this.$store.getters.getGeneData[1], this.$store.getters.getGeneData[2], this.page, this.max]) : this.$store.dispatch('fetchGene', [this.$route.params.id, this.page, this.max, this.$store.getters.getGeneData[3], this.$store.getters.getGeneData[4]]);
          this.$store.dispatch('setLoader', false)
          break;
        case 'corr':
          this.$store.dispatch('setLoader', true)
          await this.$store.dispatch('fetchCorr', [this.$route.params.id, this.page, this.max]);
          this.$store.dispatch('setLoader', false)
          break;
      
        default:
          break;
      }
    }
  }
}
</script>


<style>
#table-header {
  text-align: center;
}
</style>