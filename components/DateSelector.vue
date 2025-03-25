<template>
    <div>
        <h2>Select Date Range</h2>

        <!--start data imput-->
        <label for="startDate">Start Date:</label>
        <input type="date" id="startDate" v-model="startDate" @change="validateDates" />

        <!-- End Date Input -->
        <label for="endDate">End Date:</label>
        <input type="date" id="endDate" v-model="endDate" @change="validateDates" />

        <!-- Error Message -->
        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>

        <!-- Submit Button -->
        <button @click="submitDates" :disabled="!valid">Submit</button>
    </div>
</template>

<script setup>
import {ref, defineEmits } from "vue";

//reactive variables
const startDate = ref('');
const endDate = ref('');
const errorMessage = ref('');
const valid = ref(false);

//Emit events to the parent component 
const emit = defineEmits(['datesSelected']);

//Function to validate date selection 
const validateDates = () => {
    console.log("startDate:", startDate.value);
    console.log("endDate:", endDate.value);

    if (!startDate.value || !endDate.value) {
        errorMessage.value = "Both dates must be selected";
        valid.value = false;
        return;
    }

    if(new Date(startDate.value) > new Date(endDate.value)) {
        errorMessage.value = "Start date cannot be after end date"; 
        return;
    }
    errorMessage.value = "";
    valid.value = true; 
};

//Submit selected dates
const submitDates = () => {
    if (!valid.value) return;
    console.log("Emitting dates", {startDate: startDate.value, endDate: endDate.value});
    
    // The event to emit
    emit('datesSelected', {startDate: startDate.value, endDate: endDate.value});
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
button {
    background: blue;
    color: white;
    border: none;
    cursor: pointer;
}
button:disabled {
    background: gray;
}
</style>
