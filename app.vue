<template>
  <Header />
  <div class="max-w-5xl mx-auto px-4">
    <DateSelector class="my-8" @datesSelected="handleDates" :isLoading="isLoading"/>
    <Spinner v-if="isLoading" />

    <div v-if="isLoading" class="text-center text-blue-600 font-semibold my-4">
      {{ $t('loading')}}
    </div>

    <div class="flex justify-center my-4">
      <div class="inline-flex border rounded overflow-hidden">
        <button
          @click="viewMode = 'chart'"
          :class="[
            'px-4 py-2 transition focus:outline-none',
            viewMode === 'chart'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-400 text-white hover:bg-gray-600',
            'rounded-l-md'
          ]"
        >
        {{ $t('chart')}}
        </button>
        <button
          @click="viewMode = 'table'"
          :class="[
            'px-4 py-2 transition focus:outline-none',
            viewMode === 'table'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-400 text-white hover:bg-gray-600',
          'rounded-r-md'
        ]"
        >
        {{ $t('table')}}
        </button>
        <button @click="resetApp" class="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition" 
        >Reset Data</button>
      </div>
    </div>
  
    <OzoneChart v-if="airData && viewMode === 'chart'" :airData="airData" />
    <OzoneTable v-if="airData && viewMode === 'table'" :airData="airData" />
    
    
  </div>
  <Footer />
</template>

<script setup>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
  import DateSelector from './components/DateSelector.vue'
  import OzoneChart from './components/OzoneChart.vue'
  import OzoneTable from './components/OzoneTable.vue'
  import Spinner from './components/Spinner.vue'
  import { useI18n } from 'vue-i18n'
  import { ref, Transition } from 'vue'

  const airData = ref(null)
  const viewMode = ref('chart')
  const isLoading = ref(false)

  const handleDates = async ({ startDate, endDate }) => {
    console.log("Received in parent", startDate, endDate);
    const stationId = 1639;
    const apiUrl = `/api/airdata?station=${stationId}&date_from=${startDate}&date_to=${endDate}`;

    isLoading.value = true;

    try {
      const response = await fetch(apiUrl);
      if(!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      
      const data = await response.json();  
      console.log('Received data:', data);
      airData.value = data;
      console.log('Saved airData:', airData.value);

    } catch (error) {
      console.error('API error: ', error);
    } finally {
      isLoading.value = false;
    }
  }

const resetApp = () => {
  airData.value = null
  viewMode.value = 'chart'
}


</script>