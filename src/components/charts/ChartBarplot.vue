<script>
import { Bar } from 'vue-chartjs'
export default {
    name: 'ChartBarplot',
    props: {
        data: {
            type: Array,
            required: true
        },
        labels: {
            type: Array,
            required: true
        }
    },
    extends: Bar,
    components: {
        Bar
    },
    data: () => ({
        chartdata: null,
        options: {
            legend: {
                display: false
            },
            plugins: {
                datalabels: {
                    display: false,
                },
},
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                    {
                        id: 'left-x-axis',
                        type: 'linear',
                        position: 'top',
                        ticks: {
                            beginAtZero: true,
                            stepSize: 10,
                            display: false
                        }
                    },
                    {
                        id: 'bar-x-axis',
                        type: 'category',
                        position: 'bottom',
                        gridLines : {
                            display : false
                        },
                        offset: true
                    }
                ]
            }
        }
    }),
    computed: {

        getData() {
            return this.data
        }
    },
    methods: {
        init() {
            this.chartdata = {
                labels: [],
                datasets: [],
            };
            let data = this.data;
            console.log(data, 'daatata');
            this.chartdata.labels = this.labels
            let colors = ['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9', '#3498DB', '#1ABC9C', '#16A085', '#16A085', '#27AE60', '#2ECC71', '#F1C40F', '#F39C12', '#D35400', '#34495E', '#2C3E50', '#A93226', '#CB4335', '#884EA0', '#7D3C98', '#2471A3', '#2E86C1', '#17A589', '#28B463']
            data.forEach((element, index) => {
                console.log(element);
                this.chartdata.datasets.push({
                    type: 'scatter',
                    label: 'Scatter',
                    data: element,
                    xAxisID:'left-x-axis',
                    borderColor: colors[index],
                    backgroundColor: colors[index]
                })
                this.chartdata.datasets.push({
                    type: 'bar',
                    label: 'bar',
                    data: [],
                    xAxisID:'bar-x-axis',
                    backgroundColor: 'red'
                })
            });
            this.renderChart(this.chartdata, this.options)
        }
    },
    mounted () {
        this.init()
        console.log(this.data);
        
    },
    watch: {
        getData () {
            this.init()
        }
    }

}
</script>