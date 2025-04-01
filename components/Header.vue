<template>
    <header class="bg-blue-500 text-white py-3">
        <div class="max-w-5xl mx-auto px-4 flex flex-wrap justify-between items-center">
            <h1 class="text-base sm:text-lg md:text-xl font-bold">
                {{ $t('title')}} 
            </h1>
            <div class="flex gap-3 mt-2 sm:mt-0">
                <button class="my-8" v-if="locale !== 'de'" @click="switchLanguage('de')">🇩🇪 Deutsch</button>
                <button class="my-8" v-if="locale !== 'en'" @click="switchLanguage('en')">🇬🇧 English</button>
                <button class="my-8" v-if="locale !== 'es'" @click="switchLanguage('es')">🇨🇴 Español</button>
            </div>
        </div>
    </header>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t: $t } = useI18n();

const { locale } = useI18n()
function switchLanguage(lang) {
    locale.value = lang
}

</script>

<style scoped>

</style>