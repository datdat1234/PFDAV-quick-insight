<template>
  <div class="page-shell">

    <!-- Lớp vệt sáng bóng (Glossy Highlight) phía sau nền -->
    <div class="glow-blue"></div>
    <div class="glow-cyan"></div>

    <!-- Header / Banner Môn Học -->
    <header class="course-header">
      <div class="header-inner">

        <!-- Top Section: School + Semester Badge chung 1 hàng -->
        <div class="header-top">
          <div class="school-semester-row">
            <div class="school-info">
              <p>{{ mainInfo.schoolName }}</p>
              <p>{{ mainInfo.majorName }}</p>
            </div>

            <!-- Badge Học kỳ nhỏ gọn -->
            <span class="semester-badge">
              {{ mainInfo.semesterTitle }}
            </span>
          </div>

          <h1 class="course-title">
            {{ mainInfo.courseName.toUpperCase() }}
          </h1>
        </div>

        <!-- Bottom Section: Giảng viên & Bài tập -->
        <div class="instructor-row">
          <div class="instructor-group">
            <span class="instructor-label">Giảng viên:</span>
            <span class="instructor-name">{{ mainInfo.teacherName }}</span>
          </div>
        </div>

      </div>
    </header>

    <main class="content-layout">
      <!-- Sidebar / Thông tin nhóm -->
      <aside class="group-sidebar">
        <div class="group-panel">
          <h2 class="section-title">
            <span>👥</span> Thông tin nhóm
          </h2>

          <!-- Tên nhóm -->
          <div class="group-name-field">
            <label class="field-label">Tên nhóm</label>
            <p class="group-name">{{ groupInfo.name }}</p>
          </div>

          <!-- Repository -->
          <div class="repo-field">
            <label class="field-label">Mã nguồn nhóm</label>
            <a
              :href="groupInfo.repoUrl"
              target="_blank"
              rel="noopener"
              class="repo-link"
            >
              <span>📂</span> GitHub Repository
            </a>
          </div>

          <!-- Danh sách thành viên -->
          <div>
            <label class="field-label member-list-label">Thành viên nhóm</label>
            <div class="members-list">
              <div
                v-for="member in groupInfo.members"
                :key="member.mssv"
                class="member-card"
              >
                <div class="member-name">{{ member.name }}</div>
                <div class="member-id">MSSV: {{ member.mssv }}</div>
                <div class="member-role">
                  <span class="font-semibold">Vai trò:</span> {{ member.role }}
                </div>
                <a
                  v-if="member.github"
                  :href="member.github"
                  target="_blank"
                  rel="noopener"
                  class="profile-link"
                >
                  <span>🔗</span> GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Content Area / Mục lục & Bài tập con -->
      <section class="project-section">
        <div class="projects-panel">
          <!-- Navigation Tabs (Mục lục các bài tập con) -->
          <div class="project-tabs">
            <button
              v-for="subProject in subProjects"
              :key="subProject.id"
              @click="activeTab = subProject.id"
              :class="[
                'project-tab',
                activeTab === subProject.id
                  ? 'project-tab-active'
                  : 'project-tab-inactive'
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
            class="project-content"
          >
            <div class="project-header">
              <div class="project-heading">
                <span class="project-icon">{{ subProject.icon }}</span>
                <div>
                  <h2 class="project-title">{{ subProject.title }}</h2>
                  <p class="project-description">{{ subProject.description }}</p>
                </div>
              </div>
            </div>

            <!-- Nội dung chi tiết của Bài tập con -->
            <div class="project-details">
              <h1 class="coming-soon">Coming soon!!!</h1>
              <!-- <h3 class="font-semibold text-slate-800">Tóm tắt nội dung thực hiện:</h3>
              <p class="text-slate-600 text-sm leading-relaxed">
                {{ subProject.details }}
              </p>

              <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <h4 class="font-semibold text-sm text-slate-700">Kết quả & Báo cáo:</h4>
                <ul class="list-disc list-inside text-sm text-slate-600 space-y-1">
                  <li>Bộ dữ liệu thực hiện: <code class="bg-slate-200 px-1 rounded text-xs">{{ subProject.dataset }}</code></li>
                  <li>Mô hình / Phương pháp: {{ subProject.method }}</li>
                </ul>
              </div>-->

              <!-- Link trực tiếp đến bài làm/Notebook/Báo cáo chi tiết -->
              <!--<div class="pt-4 flex gap-3">
                <a
                  :href="subProject.link"
                  disabled="true"
                  target="_blank"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
                >
                  Xem báo cáo chi tiết
                </a>
              </div>-->
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="page-footer">
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
  schoolName: 'Đại học Bách Khoa – Đại học Quốc gia Thành phố Hồ Chí Minh',
  majorName: 'Khoa Khoa học và Kỹ thuật Máy Tính',
  courseName: 'Nền tảng lập trình cho phân tích và trực quan dữ liệu',
  teacherName: 'Lê Thành Sách',
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