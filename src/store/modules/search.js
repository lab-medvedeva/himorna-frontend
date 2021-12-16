import axios from 'axios'
export default {
    state: {
      result: null,
      ranges: {
        plus: [0.10, 0.80],
        minus: [-0.80, -0.1]
      },
      searchData: null
    },
    mutations: {
      setRange(state, {name, val}) {
        state.ranges[name] = val
      },
      setResults(state, result) {
        state.result = result
      },
      setSearch(state, searchData) {
        state.searchData = searchData
      }
    },
    actions: {
      async search({commit, state}, [searchData, page, max]) {
        let result;
        searchData.page = page;
        searchData.page_count = max;
        searchData.tresholds = [state.ranges.plus, state.ranges.minus];
        JSON.stringify(searchData)
        let query = `http://himorna.fbras.ru/lncrna/api/v1/search/results`;
        
        try {
          await axios
          .post(query, searchData, {headers: {'Content-Type': 'application/json'}, timeout: 180000})
          .then(response => {
            result = response.data
            commit('setResults', result)
          })
          .catch(error => {
            console.log(error);
          })
        } catch (error) {
          console.log(error);
        }
        return result
      },
      setSearch({commit}, searchData) {
        commit('setSearch', searchData)
      },
      setRange({commit}, {name, val}) {
        commit('setRange', {name, val})
      }
    },
    getters: {
        getSearchData: s => s.searchData,
        getResults: s => s.result,
        getRanges: s => s.ranges
    }
  }
  