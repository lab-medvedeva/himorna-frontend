<template>
    <main class="main">
        <Header />
        <section class="detail">
            <div class="wrap">
                <h2 class="section-title">Histone modification: {{$route.params.id}}</h2>
                <div class="block">
                  <div class="block-wrap" v-if="modification || getData">
                      <h4>{{ modification.chart.title || getData.chart.title }}</h4>
                      <ChartPeaks :data="modification.chart || getData.chart" />
                  </div>
                  <div class="block-none" v-if="!modification && !this.$store.getters.loader">
                      <h4>There is no data</h4>
                  </div>
                </div>
                <Table :max="10" v-if="modification" :data="getData.table || modification.table" />
            </div>
        </section>
        <Loader />
        <Footer />
    </main>
</template>
<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Table from '@/components/Table';
import Loader from '@/components/Loader';
import ChartPeaks from '@/components/charts/ChartPeaks'

export default {
  name: 'histone',
  components: {
    Header,
    Table,
    Loader,
    Footer,
    ChartPeaks
  },
  data() {
    return {
      modification: null
    }
  },
  computed: {
    getData () {
      return this.$store.getters.getHistone
    }
  },
  async mounted () {
    this.$store.dispatch('setLoader', true)
    this.modification = await this.$store.dispatch('fetchHistone', [this.$route.params.id, 1, 10])
    this.$store.dispatch('setLoader', false)
  }
}

</script>
