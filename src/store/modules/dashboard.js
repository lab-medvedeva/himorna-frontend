// import eventsList from '@/data/events.json'
import axios from 'axios'
export default {
    state: {
      dashboardTable: null
    },
    mutations: {
      setTableDashboard(state, table) {
        state.dashboardTable = table
      }
    },
    actions: {
      async getDashboard({commit}) {
        let result;
        try {
          await axios
          .get('http://himorna.fbras.ru/lncrna/api/v1/dashboard')
          .then(responce => {
            result = responce.data
            console.log(typeof(responce.data.table.data))
            console.log(responce.data.table.data)
            /*result.table.data = result.table.data.map(s => (
              {
              Histone_Modification: s.HM
            }
            ))
            */

            //console.log(responce.data.map(s => ({letter: s.HM})))
            commit('setTableDashboard', result)
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
        getDashboardTable: s => s.dashboardTable
    }
  }
  