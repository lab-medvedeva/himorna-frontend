<template>
  <main class="main">
    <Header />
    <section class="section research">
      <div class="wrap">
        <!-- <img src="@/assets/images/welcome.jpg" class="welcome-image"> -->
        <div class="welcome-content">
          <!--<h2>Welcome to website of scientific experiment</h2>
          
          <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p class="text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>-->
            
            <h2> Welcome to HiMoRNA!</h2>
            <p class="text">Long non-coding RNAs (lncRNAs) play an important role in genome regulation. Specifically, many lncRNAs interact with chromatin, recruit epigenetic complexes and, in this way, affect large-scale gene expression programs. However, the experimental data about lncRNA-chromatin interactions is still limited. The majority of experimental protocols do not uncover the mechanics of lncRNA-based genome-wide epigenetic regulation. Here we present HiMoRNA (Histone-Modifying RNA) database, a resource containing  correlated lncRNA–epigenetic changes in specific genomic locations genome-wide. HiMoRNA integrates a large amount of multi-omics data to characterize the effects of lncRNA on epigenetic modifications and gene expression. The current release of HiMoRNA includes more than 5 million associations in humans for 10 histone modifications and 4145 lncRNA. HiMoRNA provides a user-friendly interface to facilitate browsing, searching and retrieving of lncRNAs associated with epigenetic profiles of various chromatin loci. We believe that HiMoRNA is a convenient and valuable resource that can greatly facilitate functional annotation of lncRNAs.
</p>
      <div class="button orange" @click="downloadDatabaseFile()">
                    <p>Download Database</p>
                </div>
      <div class="wrap">
        <!-- <h2 class="section-title">Research results</h2>
        <p class="section-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>-->

        <Table :max="11" v-if="getTable || research" :data="getTable.table || research.table" />
      </div>
      <div>
          <router-link tag="div" class="button orange" to="/search">
            <p>Dashboard</p>
          </router-link>
          </div>

         
        </div>

      
      </div>
        <!--<div class="scroll-down">
          <p class="scroll-down__text">Scroll down</p>
          <img src="@/assets/images/scroll-down.svg" width="40px">
        </div>-->
    </section>

    <!-- <section class="section">
      <div class="wrap">
        <h2 class="section-title">How we did it?</h2>
        <p class="section-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
        <div class="section-block">
          <div class="section-content">
            <h2>1. Welcome to website of scientific experiment</h2>
            <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p class="text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <router-link tag="div" class="button orange" to="/search">
              <p>Search</p>
            </router-link>
          </div>
          <div class="section-image" :style="{backgroundImage: 'url(' + require('@/assets/images/section-1.jpg') + ')'}"></div>
        </div>
        <div class="section-block">
          <div class="section-content">
            <h2>2. Welcome to website of scientific experiment</h2>
            <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p class="text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <router-link tag="div" class="button orange" to="/search">
              <p>Search</p>
            </router-link>
          </div>
          <div class="section-image" :style="{ backgroundImage: 'url(~@/assets/images/section-1.jpg)' }"></div>
        </div>
      </div>
    </section> 
    <section class="section research">
      <div class="wrap">
        <h2 class="section-title">Research results</h2>
        <p class="section-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>

        <Table :max="11" v-if="getTable || research" :data="getTable.table || research.table" />
      </div>
    </section>-->
    <Footer />
  </main>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Table from '@/components/Table';
export default {
  name: 'dashboard',
  components: {
    Header,
    Table,
    Footer
  },
  data() {
    return {
      research: null
    }
  },
  computed: {
    getTable () {
      return this.$store.getters.getDashboardTable
    }
  },
  async mounted () {
    this.research = await this.$store.dispatch('getDashboard')
  },
  methods: {
    downloadDatabaseFile() {
      /*
      axios({
                    url: 'http://fbras.himorna.ru/lncrna/api/v1/peaks.zst', // File URL Goes Here
                    method: 'GET',
                    responseType: 'blob',
                }).then((res) => {
                     saveAs(res.data, 'peaks.zst')
                });
                */
               window.open('http://himorna.fbras.ru/lncrna/api/v1/peaks.zst')
    }
  }
}

</script>
