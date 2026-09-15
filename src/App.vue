<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans">
    <!-- Header / Banner Môn Học -->
    <header class="bg-blue-900 text-white shadow-lg">
      <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-blue-700 pb-6">
          <div>
            <p class="text-blue-300 font-medium tracking-wide text-sm uppercase">
              Đại học Bách Khoa – ĐHQG-HCM | Khoa KHKT Máy tính
            </p>
            <h1 class="text-2xl md:text-3xl font-bold mt-1">
              Nền tảng lập trình cho phân tích và trực quan dữ liệu
            </h1>
          </div>
          <div class="bg-blue-800 px-4 py-2 rounded-lg text-right border border-blue-700">
            <p class="text-xs text-blue-200">Học kỳ & Năm học</p>
            <p class="font-semibold text-sm">Học kỳ 261 (2026–2027)</p>
          </div>
        </div>

        <!-- Thông tin chi tiết môn học -->
        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-100">
          <div>
            <span class="font-semibold text-white">Giảng viên hướng dẫn:</span> ThS./TS. Lê Thành Sách
          </div>
          <div class="md:text-right">
            <span class="font-semibold text-white">Loại bài tập:</span> Bài tập lớn môn học
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Sidebar / Thông tin nhóm -->
      <aside class="lg:col-span-1 space-y-6">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
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
        <!-- Navigation Tabs (Mục lục các bài tập con) -->
        <div class="bg-white p-2 rounded-xl shadow-sm border border-slate-200 flex flex-wrap gap-2">
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
          class="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200 space-y-6"
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
      </section>
    </main>

    <footer class="bg-white border-t border-slate-200 mt-12 py-6 text-center text-xs text-slate-500">
      <p>© 2026 {{ groupInfo.name }} - Đại học Bách Khoa – ĐHQG-HCM</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Tab hiện tại được chọn (Default: tabular)
const activeTab = ref('tabular')

// Thông tin Nhóm
const groupInfo = ref({
  name: 'Quick Insight', // Thay bằng tên khớp với sheet GroupRegistration
  repoUrl: 'https://github.com/datdat1234/PFFDA-FE', // Link repository nhóm
  members: [
    {
      name: 'Lê Phước Đạt',
      mssv: '2670266',
      role: 'Xử lý dữ liệu Text & Image',
      github: 'https://github.com/datdat1234' // Để null nếu không có link
    },
    {
      name: 'Nguyễn Nhật Hạ',
      mssv: '2110001',
      role: 'Xử lý dữ liệu Tabular & Image',
      github: 'https://github.com/tranthib'
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
    details: 'Thực hiện thu thập, làm sạch và khám phá dữ liệu (EDA) trên tập dữ liệu dạng bảng. Áp dụng các kỹ thuật trực quan hóa để rút ra tri thức.',
    dataset: 'housing_prices.csv',
    method: 'Pandas, Seaborn, Random Forest',
    link: '#'
  },
  {
    id: 'text',
    title: 'Text Data',
    icon: '📝',
    description: 'Xử lý và phân tích dữ liệu văn bản',
    details: 'Tiền xử lý văn bản (Tokenization, Stopwords removal), trích xuất đặc trưng (TF-IDF/Embeddings) và phân tích cảm xúc hoặc phân loại văn bản.',
    dataset: 'reviews_dataset.json',
    method: 'NLTK, SpaCy, Transformers',
    link: '#'
  },
  {
    id: 'image',
    title: 'Image Data',
    icon: '🖼️',
    description: 'Xử lý và trực quan hóa dữ liệu hình ảnh',
    details: 'Trích xuất đặc trưng hình ảnh, phân loại ảnh hoặc phát hiện đối tượng. Trực quan hóa các Feature Maps và Confusion Matrix.',
    dataset: 'custom_image_folder/',
    method: 'OpenCV, PyTorch, CNN',
    link: '#'
  }
])
</script>

<style>
/* Đảm bảo Tailwind CSS đã được import trong project chính (main.js hoặc index.html) */
</style>