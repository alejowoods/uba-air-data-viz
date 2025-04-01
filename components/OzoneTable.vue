<template>
    <div>
    <h3>{{ $t('ozone_values_table')}}</h3>
    <button @click="downloadTable" 
            class="mt-2 mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
            Download
    </button>
    </div>
    <div>
        <table ref="tableRef">
            <thead>
                <tr>
                    <th>{{ $t('table_date')}}</th>
                    <th>{{ $t('table_time')}}</th>
                    <th>{{ $t('table_value')}}</th>
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

const tableRef = ref(null);

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

const downloadTable = () => {
    console.log("📥 Downloading table...");

    const headers = [ 'Date', 'Time', 'Value'];
    const rows = ozoneRows.value.map(row => {
        return [row.date, row.time, row.value].join(';');
    });
    
    const csvContent = [headers.join(';'), ...rows].join('\n');
    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'ozone_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("✅ Table downloaded as CSV.");

};

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
