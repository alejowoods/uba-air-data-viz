<template>
    <div>
    <h3>Ozonwerte (O₃) – Tabelle</h3>
    </div>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Datum</th>
                    <th>Uhrzeit</th>
                    <th>Ozon (O₃) µg/m³</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in ozoneRows" :key="index">
                    <td>{{ row.date }}</td>
                    <td>{{ row.time }}</td>
                    <td>{{ row.value }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    airData:Object
})

const ozoneRows = computed(() => {
    const rows = []
    if(!props.airData?.data) return rows
    console.log('📦 Table received airData:', props.airData);

    const stationId = Object.keys(props.airData.data)[0]
    const rawMeasurements = props.airData.data[stationId]

    for (const [datetime, mesures] of Object.entries(rawMeasurements)) {
        const date = datetime.split(' ')[0]
        const time = datetime.split(' ')[1].slice(0, 5)
        
        const components = mesures.slice(3)
        const ozone = components.find( component => component[0] === 3)

        if(ozone) {
            rows.push({
                date,
                time,
                value: Number(ozone[3])
            })
        }
    }
    return rows
})

</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 16px;
}

th, td {
    padding: 8px;
    border: 1px solid #ccc;
    text-align: center;
}

th {
    background-color: #f0f0f0;
}
</style>
