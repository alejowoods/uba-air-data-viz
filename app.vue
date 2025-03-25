<template>
  <div class="bg-blue-500 text-white p-4">
    <h1 class="text-xl font-bold">UBA Immissionsdatenvisalisierung</h1>
  </div>
  <div>
    <DateSelector @datesSelected="handleDates" />
    <OzoneChart v-if="airData" :airData="airData" />

  </div>
</template>

<script setup>
  import DateSelector from './components/DateSelector.vue'
  import OzoneChart from './components/OzoneChart.vue'
  import { ref } from 'vue'

  const airData = ref(null)

  const handleDates = async ({ startDate, endDate }) => {
    console.log("Received in parent", startDate, endDate);
    const stationId = 1639;
    
    const apiUrl = `/api/airdata?station=${stationId}&date_from=${startDate}&date_to=${endDate}`;

    try {
      const response = await fetch(apiUrl);

      if(!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();  
      airData.value = data;
      console.log('Saved airData:', airData.value);

    } catch (error) {
      console.error('API error: ', error);
    }
  }

</script>
