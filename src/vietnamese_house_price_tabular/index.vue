<template>
  <div class="project-header">
    <div class="project-heading">
      <span class="project-icon">{{ subProject.icon }}</span>
      <div>
        <h2 class="project-title">{{ subProject.title }}</h2>
        <p class="project-description">{{ subProject.description }}</p>
      </div>
    </div>
  </div>
  <div class="project-details">
    <div>
        <h3 class="font-semibold text-slate-800">Tóm tắt nội dung thực hiện:</h3>
        <p class="text-slate-600 text-sm leading-relaxed">
            {{ subProject.details }}
        </p>
        </div>

        <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
        <h4 class="font-semibold text-sm text-slate-700">Kết quả & Báo cáo:</h4>
        <ul class="list-disc list-inside text-sm text-slate-600 space-y-1">
            <li>Bộ dữ liệu thực hiện: <code class="bg-slate-200 px-1 rounded text-xs">{{ subProject.dataset }}</code></li>
            <li>Mô hình / Phương pháp: {{ subProject.method }}</li>
        </ul>
    </div>
    <button
      type="button"
      :aria-expanded="isReportExpanded"
      class="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 text-sm font-medium transition"
      @click="isReportExpanded = !isReportExpanded"
    >
      <span
        class="report-chevron"
        :class="{ 'report-chevron-expanded': isReportExpanded }"
        aria-hidden="true"
      ></span>
      {{ isReportExpanded ? 'Ẩn báo cáo chi tiết' : 'Xem toàn bộ báo cáo chi tiết' }}
    </button>

    <div v-if="isReportExpanded" class="mt-4 space-y-4">
        hi!!!
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isReportExpanded = ref(false)

defineProps({
  subProject: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.report-chevron {
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 5px solid currentColor;
  transition: transform 160ms ease;
}

.report-chevron-expanded {
  transform: rotate(90deg);
}
</style>