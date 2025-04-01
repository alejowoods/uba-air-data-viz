<template>
    <div>
        <h2>{{ $t('select_date_range')}} </h2>
        <!--start data imput-->
        <label for="startDate">{{ $t('start_date')}}:</label>
        <Datepicker
            v-model="startDate"
            :locale="currentLocale"
            :format="dateFormat"
            :placeholder="$t('placeholder_date')"
            @update:model-value="validateDates"
        />
        <!-- End Date Input -->
        <label for="endDate">{{ $t('end_date')}}:</label>
        <Datepicker
            v-model="endDate"
            :locale="currentLocale"
            :format="dateFormat"
            :placeholder="$t('placeholder_date')"
            @update:model-value="validateDates"
        />
        <!-- Error Message -->
        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
        <!-- Submit Button -->
        <button class='submit-button' @click="submitDates" :disabled="!valid">{{ $t('submit')}}</button>
        <button @click="resetForm"  class="mt-2 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600 transition">
        Reset</button>
    </div>
</template>

<script setup>
import {ref, defineEmits } from "vue";
import { useI18n } from 'vue-i18n';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

//reactive variables
const startDate = ref('');
const endDate = ref('');
const errorMessage = ref('');
const valid = ref(false);
const { t: $t } = useI18n();
const { locale } = useI18n()

const currentLocale = computed(() => locale.value)
const dateFormat = computed(() => {
    const formats = {
        de: 'dd.MM.yyyy',     
        en: 'MM/dd/yyyy',     
        es: 'dd/MM/yyyy'      
    }
    return formats[locale.value] || 'yyyy-MM-dd'
} )

//Emit events to the parent component 
const emit = defineEmits(['datesSelected']);

//received Props from Parent component (app.vue)
const props = defineProps({
    isLoading: Boolean
})

//Function to validate date selection 
const validateDates = () => {
    console.log("startDate:", startDate.value);
    console.log("endDate:", endDate.value);
    if (props.isLoading) return;

    if (!startDate.value || !endDate.value) {
        errorMessage.value = $t('error_message_both');
        valid.value = false;
        return;
    }

    if(new Date(startDate.value) > new Date(endDate.value)) {
        errorMessage.value = $t('error_message_wrong');
        return;
    }
    errorMessage.value = "";
    valid.value = true; 
};

//Submit selected dates
const submitDates = () => {

    if (!valid.value) return;     

    function formatDateDDMMYY (date){
        return date.toISOString().split('T')[0];
    } 

    // The event to emit
    emit('datesSelected', {startDate: formatDateDDMMYY(startDate.value), endDate: formatDateDDMMYY(endDate.value)});
    console.log("Emitting dates", {startDate: formatDateDDMMYY(startDate.value), endDate: formatDateDDMMYY(endDate.value)});
}

const resetForm = () => {
    startDate.value = '';
    endDate.value = '';
    errorMessage.value = '';
    valid.value = false;
}

</script>

<style scoped>
div {
    background: #f9f9f9;
    padding: 16px;
    border-radius: 8px;
    max-width: 300px;
    margin: auto;
}
h2 {
    text-align: center;
    margin-bottom: 10px;
}
input, button {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
}

.submit-button {
    background: #3b82f6; 
    border-radius: 6px; 
    color: white;
    border: none;
    cursor: pointer;
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #2563eb; /* azul más oscuro */
}

.submit-button:disabled {
    background: gray;
}

</style>
