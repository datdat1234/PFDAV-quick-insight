<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 pt-1">

    <!-- Lớp vệt sáng bóng (Glossy Highlight) phía sau nền -->
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/15 rounded-full blur-[120px] pointer-events-none"></div>

    <!-- Header / Banner Môn Học -->
    <header class="m-4 md:m-6 bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-md border border-white/80 shadow-[0_20px_50px_rgba(2,6,23,0.35)] rounded-2xl text-slate-900">
      <div class="max-w-6xl mx-auto px-6 py-6">

        <!-- Top Section: School + Semester Badge chung 1 hàng -->
        <div class="border-b border-slate-200/80 pb-5">
          <p class="text-blue-600 font-semibold tracking-wider text-xs uppercase">
            {{ mainInfo.schoolName }}
          </p>

          <h1 class="mt-2 text-2xl md:text-3xl font-bold mt-2 text-slate-900">
            {{ mainInfo.courseName.toUpperCase() }}
          </h1>
        </div>

        <!-- Bottom Section: Giảng viên & Bài tập -->
        <div class="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-sm text-slate-600">
          <div class="flex items-center gap-1.5">
            <span class="font-medium text-slate-400">Giảng viên:</span>
            <span class="font-semibold text-slate-800">{{ mainInfo.teacherName }}</span>
          </div>
          <!-- Badge Học kỳ nhỏ gọn -->
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50/80 text-blue-600 border border-indigo-200/80 shadow-xs">
            {{ mainInfo.semesterTitle }}
          </span>
        </div>

      </div>
    </header>

    <main class="m-4 md:m-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Sidebar / Thông tin nhóm -->
      <aside class="lg:col-span-1 space-y-6">
        <div class="p-6 bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-md border border-white/80 shadow-[0_20px_50px_rgba(2,6,23,0.35)] rounded-2xl text-slate-900">
          <h2 class="text-lg font-bold text-slate-900 border-b pb-3 mb-4 flex items-center gap-2">
            <span>👥</span> Thông tin nhóm
          </h2>

          <!-- Tên nhóm -->
          <div class="mb-4">
            <label class="text-xs text-slate-500 uppercase font-semibold">Tên nhóm</label>
            <p class="text-lg font-bold text-blue-700">{{ groupInfo.name }}</p>
          </div>

          <!-- Repository -->
          <div class="mb-6">
            <label class="text-xs text-slate-500 uppercase font-semibold">Mã nguồn nhóm</label>
            <a
              :href="groupInfo.repoUrl"
              target="_blank"
              rel="noopener"
              class="mt-1 flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-lg text-sm transition"
            >
              <span>📂</span> GitHub Repository
            </a>
          </div>

          <!-- Danh sách thành viên -->
          <div>
            <label class="text-xs text-slate-500 uppercase font-semibold mb-3 block">Thành viên nhóm</label>
            <div class="space-y-4">
              <div
                v-for="member in groupInfo.members"
                :key="member.mssv"
                class="p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm"
              >
                <div class="font-bold text-slate-800">{{ member.name }}</div>
                <div class="text-xs text-slate-500 mb-1">MSSV: {{ member.mssv }}</div>
                <div class="text-xs text-slate-600 bg-blue-50 text-blue-700 p-1.5 rounded mb-2">
                  <span class="font-semibold">Vai trò:</span> {{ member.role }}
                </div>
                <a
                  v-if="member.github"
                  :href="member.github"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                >
                  <span>🔗</span> GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Content Area / Mục lục & Bài tập con -->
      <section class="lg:col-span-3 space-y-6">
        <div class="bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-md border border-white/80 rounded-lg">
          <!-- Navigation Tabs (Mục lục các bài tập con) -->
          <div class="p-2 flex flex-wrap gap-2 rounded-lg bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-md border border-white/80 shadow-[0_20px_50px_rgba(2,6,23,0.35)] rounded-2xl text-slate-900">
            <button
              v-for="subProject in subProjects"
              :key="subProject.id"
              @click="activeTab = subProject.id"
              :class="[
                'px-4 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2',
                activeTab === subProject.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              ]"
            >
              <span>{{ subProject.icon }}</span>
              <span>{{ subProject.title }}</span>
            </button>
          </div>

          <!-- Dynamic Content của từng Bài tập con -->
          <div
            v-for="subProject in subProjects"
            :key="subProject.id"
            v-show="activeTab === subProject.id"
            class="p-6 md:p-8 bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-md border border-white/80 shadow-[0_20px_50px_rgba(2,6,23,0.35)] rounded-b-lg text-slate-900 space-y-6"
          >
            <div class="border-b border-slate-200 pb-4">
              <div class="flex items-center gap-3">
                <span class="text-3xl">{{ subProject.icon }}</span>
                <div>
                  <h2 class="text-xl font-bold text-slate-900">{{ subProject.title }}</h2>
                  <p class="text-sm text-slate-500">{{ subProject.description }}</p>
                </div>
              </div>
            </div>

            <!-- Nội dung chi tiết của Bài tập con -->
            <div class="space-y-4">
              <h3 class="font-semibold text-slate-800">Tóm tắt nội dung thực hiện:</h3>
              <p class="text-slate-600 text-sm leading-relaxed">
                {{ subProject.details }}
              </p>

              <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <h4 class="font-semibold text-sm text-slate-700">Kết quả & Báo cáo:</h4>
                <ul class="list-disc list-inside text-sm text-slate-600 space-y-1">
                  <li>Bộ dữ liệu thực hiện: <code class="bg-slate-200 px-1 rounded text-xs">{{ subProject.dataset }}</code></li>
                  <li>Mô hình / Phương pháp: {{ subProject.method }}</li>
                </ul>
              </div>

              <!-- Link trực tiếp đến bài làm/Notebook/Báo cáo chi tiết -->
              <div class="pt-4 flex gap-3">
                <a
                  :href="subProject.link"
                  target="_blank"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
                >
                  Xem báo cáo chi tiết <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="bg-white border-t border-slate-200 mt-6 py-6 text-center text-xs text-slate-500">
      <p>© 2026 {{ groupInfo.name }} - Trường Đại học Bách Khoa – Đại học Quốc gia Thành phố Hồ Chí Minh</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Tab hiện tại được chọn (Default: tabular)
const activeTab = ref('tabular')

// Main information
const mainInfo = ref ({
  schoolName: 'Trường Đại học Bách Khoa – Đại học Quốc gia Thành phố Hồ Chí Minh',
  courseName: 'Nền tảng lập trình cho phân tích và trực quan dữ liệu',
  teacherName: 'TS. Lê Thành Sách',
  semesterTitle: 'Học kỳ 261 (2026-2027)'
})

// Thông tin Nhóm
const groupInfo = ref({
  name: 'Quick Insight',

  repoUrl: 'https://github.com/datdat1234/PFDAV-quick-insight', // Link repository nhóm

  members: [
    {
      name: 'Lê Phước Đạt',
      mssv: '2670266',
      role: 'Xử lý dữ liệu Text & Image',
      github: 'https://github.com/datdat1234' // Để null nếu không có link
    },
    {
      name: 'Nguyễn Nhật Hạ',
      mssv: '2670276',
      role: 'Xử lý dữ liệu Tabular & Image',
      github: 'https://github.com/nhatha32'
    }
  ]
})

// Mục lục và nội dung các Bài tập lớn con
const subProjects = ref([
  {
    id: 'tabular',
    title: 'Tabular Data',
    icon: '📊',
    description: 'Phân tích và trực quan hóa dữ liệu dạng bảng',
    details: '',
    dataset: '',
    method: '',
    link: '#'
  },
  {
    id: 'text',
    title: 'Text Data',
    icon: '📝',
    description: 'Xử lý và phân tích dữ liệu văn bản',
    details: '',
    dataset: '',
    method: '',
    link: '#'
  },
  {
    id: 'image',
    title: 'Image Data',
    icon: '🖼️',
    description: 'Xử lý và trực quan hóa dữ liệu hình ảnh',
    details: '',
    dataset: '',
    method: '',
    link: '#'
  }
])
</script>

<style>
/* Đảm bảo Tailwind CSS đã được import trong project chính (main.js hoặc index.html) */
</style>