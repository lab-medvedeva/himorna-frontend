<template>
    <main class="main">
        <Header />
        <section class="detail">
            <div class="wrap">
                <h2 class="section-title">Gene: {{$route.params.id}}</h2>
                <div class="block">
                  <div class="block-wrap" v-if="gene">
                      <h4>{{gene.chart.title}}</h4>
                      <ChartPeaks :data="getData.chart || gene.chart" />
                  </div>
                  <div class="block-none" v-if="!gene && !this.$store.getters.loader">
                      <h4>There is no data</h4>
                  </div>
                </div>
                <Links v-if="gene" :data="getData.links || gene.links" />
                <Table title="Data by choosen lncRNA" :max="10" v-if="gene" :data="getData.table || gene.table" />
                <Table class="double-top" :num='2' :max="10" v-if="gene" :data="getData.other_peaks_table || gene.other_peaks_table" />
            </div>
        </section>
        <Footer />
        <Loader />
    </main>
</template>
<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Table from '@/components/Table';
import Links from '@/components/Links';
import Loader from '@/components/Loader';
import ChartPeaks from '@/components/charts/ChartPeaks'

export default {
  name: 'gene',
  components: {
    Header,
    Table,
    Links,
    Loader,
    Footer,
    ChartPeaks
  },
  data() {
    return {
      gene: null
    }
  },
  computed: {
    getData () {
      return this.$store.getters.getGene
    }
  },
  async mounted () {
    this.$store.dispatch('setLoader', true)
    this.gene = await this.$store.dispatch('fetchGene', [this.$route.params.id, 1, 10, 1, 10])
    this.$store.dispatch('setLoader', false)
  }
}

</script>
