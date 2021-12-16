// import eventsList from '@/data/events.json'
import axios from 'axios'
export default {
    state: {
      histone: null,
      gene: null,
      geneData: null,
      lncrna: null,
      corr: null
    },
    mutations: {
      setHistone(state, result) {
        state.histone = result
      },
      setGene(state, result) {
        state.gene = result
      },
      setLncrna(state, result) {
        state.lncrna = result
      },
      setCorr(state, result) {
        state.corr = result
      },
      setGeneData(state, result) {
        state.geneData = result
      }
    },
    actions: {
      async fetchHistone({commit}, [histone, page, max]) {
        let result;
        let query = `http://himorna.fbras.ru/lncrna/api/v1/info/modification?hm=${histone}&page=${page}&page_count=${max}`;
        try {
          await axios
          .get(query)
          .then(response => {
            result = response.data
            commit('setHistone', result)
          })
          .catch(error => {
            console.log(error);
          })
        } catch (error) {
          console.error(error);
        }
        return result
      },
      async fetchGene({commit}, [gene, page, max, opage, omax]) {
        let result;
        commit('setGeneData', [gene, page, max, opage, omax])
        try {
          await axios
          .get(`http://himorna.fbras.ru/lncrna/api/v1/info/gene?gene=${gene}&page=${page}&page_count=${max}&other_page=${opage}&other_page_count=${omax}`)
          .then(response => {
            result = response.data
            commit('setGene', result)
          })
          .catch(error => {
            console.log(error);
          })
        } catch (error) {
          console.error(error);
        }
        return result
      },
      async fetchLncrna({commit}, [lncrna, page, max]) {
        let result;
        try {
          await axios
          .get(`http://himorna.fbras.ru/lncrna/api/v1/info/lncrna?lncrna=${lncrna}&page=${page}&page_count=${max}`)
          .then(response => {
            result = response.data
            commit('setLncrna', result)
          })
          .catch(error => {
            console.log(error);
          })
        } catch (error) {
          console.error(error);
        }
        return result
      },
      async fetchCorr({commit}, [params, page, max]) {
        let result;
        let query = `http://himorna.fbras.ru/lncrna/api/v1/info/corr?peak_id=${params.peak}&lncrna=${params.lncrna}&hm=${params.hm}&page=${page}&page_count=${max}`;
        try {
          await axios
          .get(query)
          .then(response => {
            result = response.data.response
            commit('setCorr', result)
          })
          .catch(error => {
            console.log(error);
          })
        } catch (error) {
          console.error(error);
        }
        return result
      }
    },
    getters: {
        getHistone: s => s.histone,
        getGene: s => s.gene,
        getGeneData: s => s.geneData,
        getLncrna: s => s.lncrna,
        getCorr: s => s.corr
    }
  }
  