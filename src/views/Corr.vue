<template>
    <main class="main">
        <Header />
        <section class="detail">
            <div class="wrap">
                <h2 v-if="getdata || corr" class="section-title">{{getData.title || corr.title}}</h2>
                <div class="block">
                  <div class="block-wrap" v-if="getData || corr">
                      <h4>{{corr.chart.title}}</h4>
                      <ChartCombo :data="getData.chart || corr.chart" />
                  </div>
                  <div class="block-none" v-if="!getData && !this.$store.getters.loader">
                      <h4>There is no data</h4>
                  </div>
                </div>
                <Links v-if="corr" :data="corr.links" />
                <Table class="table-wrap_long" :max="10" title="Data by choosen Correlation" v-if="getData || corr" :data="getData.table || corr.table" />
                <Loader />
            </div>
        </section>
        <Footer />
    </main>
</template>
<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Table from '@/components/Table';
import Links from '@/components/Links';
import Loader from '@/components/Loader';
import ChartCombo from '@/components/charts/ChartCombo'

export default {
  name: 'lncrna',
  components: {
    Header,
    Table,
    Links,
    Footer,
    Loader,
    ChartCombo
  },
  data() {
    return {
      corr: null
    }
  },
  computed: {
    getData () {
      return this.$store.getters.getCorr
    }
  },
  async mounted () {
    this.$store.dispatch('setLoader', true)
    this.corr = await this.$store.dispatch('fetchCorr', [this.$route.query, 1, 10])
    this.$store.dispatch('setLoader', false)
  }
}

</script>
