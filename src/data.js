export const profile = {
  name: "Teguh Al Azizul",
  email: "teguh23ti@mahasiswa.pcr.ac.id",
  linkedin: "https://www.linkedin.com/in/teguhalazizul",
  github: "https://github.com/teguhalazizul",
  booking: "https://cal.com/teguh-al-azizul/meeting-about-the-project?overlayCalendar=true",
};

export const skills = ["Python", "PHP", "Kotlin", "Java", "JavaScript", "TypeScript", "SQL", "React.js", "Laravel", "Tailwind CSS", "Supabase", "Android Studio", "Git", "Figma", "ArcGIS", "Unity", "Machine Learning", "Data Analytics"];

/* ---------- UI text ---------- */
const ui = {
  en: {
    nav: { about: "About", experience: "Experience", projects: "Projects", achievements: "Achievements", contact: "Contact" },
    navBook: "Book a Session ↗", light: "◐ Light", dark: "◑ Dark", themeLabel: "Toggle theme", langLabel: "Switch language",
    hello: "Available for new opportunities",
    lead: "Building web apps, Android apps, and machine learning solutions — from idea and system design to deployment.",
    viewProjects: "View Projects ↓", contactMe: "Contact Me",
    photoAlt: "Photo of Teguh Al Azizul", badgeGpa: "GPA 3.75", badgeAward: "Outstanding Student 2026",
    secAbout: "About", secExp: "Experience", secProj: "Selected Projects", secAch: "Achievements", secContact: "Contact",
    orgsTitle: "Organizations & Leadership", letsWork: "Let's work together",
    bookTitle: "Want to discuss a project?",
    bookText: "Have an idea for a web app, Android app, or machine learning solution? Book a discussion session directly through my calendar.",
    bookBtn: "Book a Session ↗",
  },
  id: {
    nav: { about: "Tentang", experience: "Pengalaman", projects: "Proyek", achievements: "Prestasi", contact: "Kontak" },
    navBook: "Booking Sesi ↗", light: "◐ Terang", dark: "◑ Gelap", themeLabel: "Ganti tema", langLabel: "Ganti bahasa",
    hello: "Tersedia untuk peluang baru",
    lead: "Membangun web, aplikasi Android, dan solusi machine learning — dari ide, desain sistem, hingga deployment.",
    viewProjects: "Lihat Proyek ↓", contactMe: "Hubungi Saya",
    photoAlt: "Foto Teguh Al Azizul", badgeGpa: "IPK 3.75", badgeAward: "Mawapres 2026",
    secAbout: "Tentang", secExp: "Pengalaman", secProj: "Proyek Pilihan", secAch: "Prestasi", secContact: "Kontak",
    orgsTitle: "Organisasi & Kepemimpinan", letsWork: "Mari bekerja sama",
    bookTitle: "Ingin diskusi rancang project?",
    bookText: "Punya ide web, aplikasi Android, atau solusi machine learning? Booking sesi diskusi langsung lewat kalender saya.",
    bookBtn: "Booking Sesi ↗",
  },
};

/* ---------- content (en / id) ---------- */
const roles = ["Software Developer", "Full-Stack Web & Android", "Machine Learning Enthusiast"];

const about = {
  en: "Informatics Engineering student at Politeknik Caltex Riau focused on software development, web & mobile applications, and machine learning. Currently working as an IT Programmer at PT Amber Karya, handling all of the company's internal systems from design to deployment. Active in organizations and experienced in leading teams.",
  id: "Mahasiswa Teknik Informatika Politeknik Caltex Riau yang berfokus pada pengembangan perangkat lunak, web & aplikasi, serta machine learning. Saat ini bekerja sebagai IT Programmer di PT Amber Karya, menangani seluruh sistem internal perusahaan dari perancangan hingga deployment. Aktif berorganisasi dan terbiasa memimpin tim.",
};

const statsRaw = [
  { value: 3.75, decimals: 2, label: { en: "GPA / 4.00", id: "IPK / 4.00" } },
  { value: 900, suffix: "+", label: { en: "Members led (ITSA)", id: "Anggota dipimpin (ITSA)" } },
  { value: 11, label: { en: "Projects built", id: "Proyek dibangun" } },
  { value: 9, label: { en: "Awards & achievements", id: "Penghargaan & prestasi" } },
];

const experienceRaw = [
  {
    company: "PT Amber Karya",
    role: { en: "IT Programmer", id: "IT Programmer" },
    period: { en: "Aug 2026 — Present", id: "Agu 2026 — Sekarang" },
    desc: {
      en: "Handling all of the company's information systems: maintenance, bug fixing, and development of internal web (PHP) and Android (Kotlin & Java) systems. Covering the full cycle end to end: requirements brainstorming, system and database design, front-end, back-end, and server deployment. Modules include stock & inventory, HR dashboard, and barcode/QR label printing.",
      id: "Menangani seluruh sistem informasi perusahaan: pemeliharaan, perbaikan, dan pengembangan sistem internal berbasis web (PHP) dan Android (Kotlin & Java). Mengerjakan siklus end-to-end: brainstorming kebutuhan, perancangan sistem & database, front-end, back-end, hingga deployment ke server. Modul: stok & inventory, dashboard HR, cetak label barcode/QR.",
    },
  },
  {
    company: "PT Amber Karya",
    role: { en: "IT Support (Intern)", id: "IT Support (Magang)" },
    period: { en: "Jul 2026 — Aug 2026", id: "Jul 2026 — Agu 2026" },
    desc: {
      en: "Provided IT support to employees during a one-month internship.",
      id: "Memberikan dukungan IT kepada karyawan selama magang satu bulan.",
    },
  },
];

const projectsRaw = [
  { year: "2026", tags: ["PHP", "MySQL", "REST API"],
    title: { en: "E-System: Integrated Manufacturing Information System", id: "E-System: Sistem Informasi Manufaktur Terintegrasi" },
    desc: { en: "Web-based manufacturing information system (PHP & MySQL) that integrates warehouse stock management, quality control, assets, and HR, complete with a REST API for Android applications.", id: "Sistem informasi manufaktur berbasis web (PHP & MySQL) yang mengintegrasikan manajemen stok gudang, quality control, aset, dan HR, lengkap dengan REST API untuk aplikasi Android." } },
  { year: "2026", tags: ["Android", "Kotlin", "PHP", "MySQL"],
    title: { en: "E-Inventory: Location-Based Stock Opname (Android + Web)", id: "E-Inventory: Stock Opname per Lokasi (Android + Web)" },
    desc: { en: "Stock opname system with QR scanning, physical counting per location, auditor approval, and automatic label printing to replace the manual paper-based counting process.", id: "Sistem stock opname berbasis Android dan web dengan scan QR, hitung fisik per lokasi, approval auditor, dan cetak label otomatis untuk menggantikan proses hitung manual berbasis kertas." } },
  { year: "2026", tags: ["Android", "Kotlin", "Retrofit", "PHP"],
    title: { en: "E-Stock: Warehouse Stock Management (Android)", id: "E-Stock: Manajemen Stok Gudang (Android)" },
    desc: { en: "Android app for incoming, outgoing, location transfer, adjustment, and stock take transactions in real time with barcode/QR scanning.", id: "Aplikasi Android manajemen stok gudang untuk transaksi barang masuk, keluar, pindah lokasi, adjustment, dan stock take secara real-time dengan scan barcode/QR." } },
  { year: "2026", tags: ["Kotlin", "Machine Learning", "IoT", "Python"],
    title: { en: "Smart Oil Palm Basket", id: "Keranjang Pintar Kelapa Sawit" },
    desc: { en: "ML-based Android app that predicts harvest yields and detects weighing fraud for oil palm, integrated with IoT sensors to give farmers accurate, real-time data.", id: "Aplikasi Android berbasis ML untuk memprediksi hasil panen dan mendeteksi kecurangan penimbangan sawit, terintegrasi sensor IoT dengan data real-time bagi petani." } },
  { year: "2025", tags: ["React.js", "Tailwind CSS", "JavaScript"],
    title: { en: "Digital Bank Jatah Indonesia", id: "Digital Bank Jatah Indonesia" },
    desc: { en: "Main contributor to the company profile website of a digital bank: modern, responsive interface that reflects the brand identity.", id: "Kontributor utama website company profile bank digital: antarmuka modern, responsif, dan mencerminkan identitas brand." } },
  { year: "2025", tags: ["Python", "Scikit-learn", "Random Forest"],
    title: { en: "Plant Watering Prediction (AI)", id: "Prediksi Penyiraman Tanaman (AI)" },
    desc: { en: "Classifies watering needs from soil moisture, temperature, pH, rainfall, and N-P-K nutrients with high accuracy.", id: "Klasifikasi kebutuhan penyiraman dari kelembaban tanah, suhu, pH, curah hujan, dan unsur hara N-P-K dengan akurasi tinggi." } },
  { year: "2025", tags: ["React.js", "Supabase"],
    title: { en: "AzGuh Waterpark Reservation", id: "Reservasi AzGuh Waterpark" },
    desc: { en: "Ticket and facility reservation platform replacing a manual system that caused long queues, complete with SRS (SKPL) and SDD (DDPL) documents.", id: "Platform reservasi tiket & fasilitas untuk menggantikan sistem manual yang menyebabkan antrian panjang, lengkap dengan dokumen SKPL dan DDPL." } },
  { year: "2025", tags: ["Python", "Pandas", "Classification"],
    title: { en: "E-Commerce Churn Prediction", id: "Prediksi Churn E-Commerce" },
    desc: { en: "Machine learning model that predicts customers likely to leave a service, helping businesses retain customers proactively.", id: "Model machine learning untuk memprediksi pelanggan yang berhenti menggunakan layanan, membantu retensi pelanggan secara proaktif." } },
  { year: "2024", tags: ["Inertia", "Web"],
    title: { en: "Peatland Hero", id: "Peatland Hero" },
    desc: { en: "Educational website and sales platform for peatland commodities. Won the Best Innovation award at the Siak Innovation Challenge.", id: "Website edukasi & platform penjualan komoditas lahan gambut. Meraih penghargaan Inovasi Terbaik di Siak Innovation Challenge." } },
  { year: "2024", tags: ["Laravel", "MySQL", "Figma"],
    title: { en: "Dapur Marani Canteen System", id: "Sistem Kantin Dapur Marani" },
    desc: { en: "Canteen management web app with full UI/UX design in Figma: menu management, online ordering, and an admin dashboard.", id: "Aplikasi web manajemen kantin dengan UI/UX penuh di Figma: manajemen menu, pemesanan online, dan dashboard pengelola." } },
  { year: "2023", tags: ["PHP Native", "MySQL"],
    title: { en: "GSG Reservation — Politeknik Caltex Riau", id: "Reservasi GSG Politeknik Caltex Riau" },
    desc: { en: "Digitized reservations for the campus multipurpose building: schedule management, booking form, and admin data management.", id: "Digitalisasi reservasi Gedung Serbaguna kampus: manajemen jadwal, form pemesanan, dan pengelolaan data oleh admin." } },
];

const achievementsRaw = [
  { year: "2026", title: { en: "1st Place Pilmapres Region 17 Riau & Riau Islands", id: "Juara 1 Pilmapres Wilayah 17 Riau & Kepri" }, note: { en: "Diploma category", id: "Cabang Diploma" } },
  { year: "2026", title: { en: "Outstanding Student (Mawapres) of PCR", id: "Mahasiswa Berprestasi (Mawapres) PCR" }, note: { en: "Institution level", id: "Tingkat institusi" } },
  { year: "2026", title: { en: "1st Place Programming — Rakerwil 7 Permikomnas", id: "Juara 1 Programming — Rakerwil 7 Permikomnas" }, note: { en: "Region 2", id: "Wilayah 2" } },
  { year: "2025", title: { en: "1st Place KMIPN VII — ICT Innovation Creation", id: "Juara 1 KMIPN VII — Cipta Inovasi Bidang TIK" }, note: { en: "National", id: "Nasional" } },
  { year: "2025", title: { en: "Top 10 BPDP Oil Palm Research Competition", id: "10 Besar Lomba Riset Sawit BPDP" }, note: { en: "Oil Palm Plantation Fund Management Agency", id: "Badan Pengelola Dana Perkebunan Kelapa Sawit" } },
  { year: "2025", title: { en: "1st Place Data Analyst — Muswil VII Permikomnas", id: "Juara 1 Data Analyst — Muswil VII Permikomnas" }, note: { en: "Region II", id: "Wilayah II" } },
  { year: "2025", title: { en: "Best Innovation — Siak Innovation Challenge", id: "Inovasi Terbaik — Siak Innovation Challenge" }, note: { en: "Siak Regency Government", id: "Pemerintah Kabupaten Siak" } },
  { year: "2024", title: { en: "Bronze Medal — GINECO 2024", id: "Medali Perunggu — GINECO 2024" }, note: { en: "International", id: "Internasional" } },
  { year: "2023", title: { en: "Siak Scholarship Recipient, Batch 23", id: "Penerima Beasiswa Siak Angkatan 23" }, note: { en: "The only recipient at PCR", id: "Satu-satunya di PCR" } },
];

const orgsRaw = [
  { period: "2025/2026",
    role: { en: "Governor of ITSA (Head of Association)", id: "Gubernur ITSA (Ketua Himpunan)" },
    where: { en: "Informatics Engineering Student Association, PCR", id: "Himpunan Mahasiswa Teknik Informatika PCR" },
    desc: { en: "Led 900+ active members, coordinated all work programs, and bridged students with the institution.", id: "Memimpin 900+ anggota aktif, mengoordinasi seluruh program kerja dan menjadi jembatan mahasiswa dengan institusi." } },
  { period: "2024/2025",
    role: { en: "Head of KM PCR Siak", id: "Ketua KM PCR Siak" },
    where: { en: "Student community from Siak Regency", id: "Komunitas mahasiswa asal Kabupaten Siak" },
    desc: { en: "Facilitated networking among Siak students and represented the region on campus.", id: "Memfasilitasi jaringan antar mahasiswa Siak dan menjadi representasi daerah di kampus." } },
  { period: "2024/2025",
    role: { en: "Head of Religious Outreach Department", id: "Kepala Departemen Syiar Keumatan" },
    where: { en: "UKMI Al Ruhul Jadid", id: "UKMI Al Ruhul Jadid" },
    desc: { en: "Designed and ran Tabligh Akbar, Nuzul Quran, and Iftar Jama'i events attended by hundreds of the campus community.", id: "Merancang dan menjalankan Tabligh Akbar, Nuzul Quran, dan Iftar Jama'i yang dihadiri ratusan civitas akademika." } },
  { period: "2024—2025",
    role: { en: "Best ISO Mentor 2024 & Most Lively 2025", id: "Pembina ISO Terbaik 2024 & Terheboh 2025" },
    where: { en: "PCR Campus Introduction", id: "Pengenalan Kampus PCR" },
    desc: { en: "Guided new students throughout the campus introduction period.", id: "Membimbing mahasiswa baru selama masa pengenalan kampus." } },
];

const pick = (v, l) => (v && typeof v === "object" && !Array.isArray(v) && "en" in v ? v[l] : v);
const flat = (o, l) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, pick(v, l)]));

export function content(lang) {
  const l = lang === "id" ? "id" : "en";
  return {
    ui: ui[l],
    roles,
    about: about[l],
    stats: statsRaw.map((s) => flat(s, l)),
    experience: experienceRaw.map((x) => flat(x, l)),
    projects: projectsRaw.map((x) => flat(x, l)),
    achievements: achievementsRaw.map((x) => flat(x, l)),
    orgs: orgsRaw.map((x) => flat(x, l)),
  };
}
