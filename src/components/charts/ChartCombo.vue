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
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    id: 'left-x-axis',
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    }),

    mounted () {
        let chartdata = {
            // labels: ['January', 'February', 'March', 'April'],
            datasets: [{
                type: 'scatter',
                label: 'Scatter',
                data: this.data.points,
                borderColor: '#31b0d9',
                backgroundColor: '#31b0d9'
                // xAxisID: 'left-y-axis'
            },
            {
                type: 'line',
                label: 'Line',
                data: this.data.line,
                fill: false,
                backgroundColor: '#fe5c78',
                borderColor: '#fe5c78'
                // xAxisID: 'left-x-axis'
            }],
        };
        let data = this.data.elements;
        console.log(data, 'chart');
        // data.forEach(element => {
        //     chartdata.labels.push(element.label)
        //     chartdata.datasets[0].data.push([0, element.value])
        // });
        this.renderChart(chartdata, this.options)
    }
}
</script>