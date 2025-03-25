<template>
    <div>
        <h3>Ozonewerte (O₃)pro Tag</h3>
        <Line :data="chartData"/>
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

const chartData = computed(() => { // computed creates calculated ref variable, it would be updated if airData changes.
    const ozoneValues = [];
    const labels = [];

    if(!props.airData?.data) return { labels: [], datasets: []};

    const stationId = Object.keys(props.airData.data)[0];
    const rawMeasurements = props.airData.data[stationId];

    for (const [datatime, measures] of Object.entries(rawMeasurements)) {
        const date = datatime.split(' ')[0]; // just date without time.

        const components = measures.slice(3); 
        const ozone = components.find(component => component[0] === 3); // O3 is the third component.

        if(ozone) {
            labels.push(date);
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