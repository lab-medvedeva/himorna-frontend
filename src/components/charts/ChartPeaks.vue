<script>
import { Bar } from 'vue-chartjs'
export default {
    name: 'ChartPeaks',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    extends: Bar,
    components: {
        Bar
    },
    data: () => ({
        options: {
            legend: {
                display: false
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }),

    mounted () {
        let chartdata = {
            labels: [],
            datasets: [{
                label: '',
                data: [],
                minBarLength: 0,
                backgroundColor: [
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    '#fe5c78',
                    // 'rgba(44, 105, 154, 1)',
                    // 'rgba(4, 139, 168, 1)',
                    // 'rgba(13, 179, 158, 1)',
                    // 'rgba(22, 219, 147, 1)',
                    // 'rgba(131, 227, 119, 1)',
                    // '#83e377',
                    // '#b9e769',
                    // '#efea5a',
                    // '#f1c453',
                    // '#f29e4c',
                    // '#f26d4c',
                    // '#f24c4c',
                    // 'rgba(242, 76, 100, 1)',
                    // 'rgba(242, 76, 115, 1)',
                    // 'rgba(242, 76, 130, 1)',
                    // 'rgba(242, 76, 145, 1)',
                    // 'rgba(242, 76, 160, 1)',
                    // 'rgba(242, 76, 175, 1)',
                    // 'rgba(222, 76, 190, 1)',
                    // 'rgba(182, 76, 230, 1)',
                    // 'rgba(120, 76, 242, 1)',
                    // 'rgba(70, 89, 202, 1)',
                    // 'rgba(50, 89, 160, 1)',
                ]
            }]
        };
        let data = this.data.elements;
        console.log(data, 'chartв');
        data.forEach(element => {
            chartdata.labels.push(element.label)
            chartdata.datasets[0].data.push([0, element.value])
        });
        this.renderChart(chartdata, this.options)
    }
}
</script>