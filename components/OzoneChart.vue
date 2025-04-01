<template>
    <div>
        <h3>{{ $t('ozone_values')}}</h3>
        <Line :data="chartData" :options="chartOptions" ref="chartRef"/>
        <button @click="downloadChart" 
            class="mt-2 mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
            Download
        </button>
    </div>
</template>

<script setup>
import { Line } from 'vue-chartjs';
import { computed } from 'vue'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    PointElement,
    LinearScale
} from 'chart.js'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    PointElement,
    LinearScale
)

const props = defineProps({ // receive data from Parent
    airData: Object
}) 

const chartRef = ref(null)
const downloadChart = () => {
    console.log("🧪 downloading chart...");

    const chartInstance = chartRef.value?.chart;

    if(!chartInstance) {
        console.warn("⚠️ No grafic instance found");
        return;
    }

    const image = chartInstance.toBase64Image('image/png');
    console.log("✅ PNG generated:", image);
    window.open(image, '_blank');


    console.log("📦 Downloading");
}

const chartOptions = {
responsive: true,
    scales: {
        x: {
        ticks: {
            autoSkip: false, // Show all the labels
            maxRotation: 45,
            minRotation: 45
        }
        },
        y: {
        beginAtZero: true
        }
    }
}
const chartData = computed(() => { // computed creates calculated ref variable, it would be updated if airData changes.
    
    const ozoneValues = [];
    const labels = [];

    if(!props.airData?.data) return { labels: [], datasets: []};

    const stationId = Object.keys(props.airData.data)[0];
    const rawMeasurements = props.airData.data[stationId];
    let lastDate = '';

    for (const [datatime, measures] of Object.entries(rawMeasurements)) {
        const date = datatime.split(' ')[0]; // just date without time.
        const components = measures.slice(3); 
        const ozone = components.find(component => component[0] === 3); // O3 is the third component.

        if(ozone) {

            if(date !== lastDate) {
                labels.push(date);
                lastDate = date;
            } else {
                labels.push('');
            }

            ozoneValues.push(Number(ozone[3])); // string to numbre
        }
    } 
    return {
        labels,
        datasets: [
            {
                label: 'Ozon (O₃)',
                data: ozoneValues,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1 
            }
        ]
    }

})
</script>

<style scoped>
</style>