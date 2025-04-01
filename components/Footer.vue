<template>
    <footer class="footer-fade text-center p-4 bg-gray-100 text-sm text-gray-600 mt-10">
        <p>{{ $t('footer_text') }}</p>
        <div class="mt-2 space-x-4">
            <a
                href="https://github.com/alejowoods"
                target="_blank"
                rel="noopener"
                class="text-blue-500 hover:underline"
                >
                {{ $t('github') }}
            </a>
            <a
                href="https://www.linkedin.com/in/lamorenos/"
                target="_blank"
                rel="noopener"
                class="text-blue-500 hover:underline"
                >
                {{ $t('linkedin') }}
            </a>
        </div>
    </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t: $t } = useI18n();
</script>

<style scoped>
.footer-fade {
    opacity: 0;
    animation: fadeIn 1.5s ease forwards;
}

@keyframes fadeIn {
    to {
        opacity: 1;
    }
}

</style>