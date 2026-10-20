export type Language = "tr" | "en" | "es";

export interface Translations {
  appName: string;
  appBadge: string;
  apiConnected: string;
  apiMissing: string;
  addCourse: string;
  captureNote: string;
  settings: string;
  howToUse: string;
  totalCoursesCount: (count: number) => string;
  totalNotesCount: (count: number) => string;

  heroTag: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBtnCapture: string;
  heroBtnCourse: string;
  heroBtnInfo: string;

  allNotes: string;
  starredNotes: string;
  courseLibrary: string;
  newCourseBtn: string;
  noCoursesYet: string;
  noNotesFoundTitle: string;
  noNotesFoundSubtitle: string;
  firstNoteBtn: string;
  searchPlaceholder: string;
  notesCountBadge: (count: number) => string;

  captureModalTitle: string;
  captureModalSubtitle: string;
  cameraOptionTitle: string;
  cameraOptionDesc: string;
  uploadOptionTitle: string;
  uploadOptionDesc: string;
  retakePhoto: string;
  courseCategoryLabel: string;
  autoDetectCourse: string;
  customPromptLabel: string;
  customPromptPlaceholder: string;
  startAnalysisBtn: string;
  processingBtn: string;
  analyzingStep1: string;
  analyzingStep2: string;
  analyzingStep3: string;
  apiKeyMissingWarning: string;
  enterKeyBtn: string;
  cancelBtn: string;
  invalidImageError: string;

  detailSummaryTab: string;
  detailOcrTab: string;
  detailPhotoTab: string;
  detailEditTab: string;
  summaryTitle: string;
  keyPointsTitle: string;
  examTipsTitle: string;
  copyMarkdown: string;
  copied: string;
  downloadMarkdown: string;
  deleteNote: string;
  deleteConfirm: string;
  fullOcrDesc: string;
  openOriginalPhoto: string;
  editTitleLabel: string;
  editCourseLabel: string;
  editSummaryLabel: string;
  editOcrLabel: string;
  editTagsLabel: string;
  saveChangesBtn: string;

  settingsTitle: string;
  settingsSubtitle: string;
  apiKeyLabel: string;
  securityNoteTitle: string;
  securityNoteDesc: string;
  getApiKeyLink: string;
  saveKeyBtn: string;
  keySaved: string;

  newCourseTitle: string;
  newCourseSubtitle: string;
  courseNameLabel: string;
  courseNamePlaceholder: string;
  courseCodeLabel: string;
  courseCodePlaceholder: string;
  courseColorLabel: string;
  courseDescLabel: string;
  courseDescPlaceholder: string;
  courseNameRequired: string;
  createCourseBtn: string;

  infoModalTitle: string;
  infoModalSubtitle: string;
  infoStep1Title: string;
  infoStep1Desc: string;
  infoStep2Title: string;
  infoStep2Desc: string;
  infoStep3Title: string;
  infoStep3Desc: string;
  infoStep4Title: string;
  infoStep4Desc: string;
  infoStep5Title: string;
  infoStep5Desc: string;
  infoCloseBtn: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  tr: {
    appName: "NoteForge",
    appBadge: "AI",
    apiConnected: "Gemini Bağlı",
    apiMissing: "API Anahtarı Girin",
    addCourse: "Ders Ekle",
    captureNote: "Fotoğraf Çek / Not Yükle",
    settings: "Ayarlar",
    howToUse: "Nasıl Kullanılır?",
    totalCoursesCount: (c) => `${c} Ders`,
    totalNotesCount: (n) => `${n} Not Arşivde`,

    heroTag: "Yapay Zeka Destekli Ders Asistanı",
    heroTitle: "Tahtayı Fotoğrafla, Notları Otomatik Grupla ve Özetle.",
    heroSubtitle:
      "Derste tahtaya yazılan formülleri, hocanın notlarını veya el yazısı defterinizi yükleyin. Gemini Vision eksiksiz metne dönüştürsün, akıllı özet ve sınav tüyoları çıkarsın.",
    heroBtnCapture: "Fotoğraf Çek / Not Yükle",
    heroBtnCourse: "Yeni Ders Oluştur",
    heroBtnInfo: "Kullanım Rehberi",

    allNotes: "Tüm Notlar",
    starredNotes: "Yıldızlı Notlar",
    courseLibrary: "Ders Kütüphanesi",
    newCourseBtn: "Yeni Ders Ekle",
    noCoursesYet: "Henüz ders eklenmedi",
    noNotesFoundTitle: "Henüz Ders Notu Yok",
    noNotesFoundSubtitle:
      "Arşiviniz temiz! Tahtanın veya defterinizin fotoğrafını çekerek ilk ders notunuzu ekleyin.",
    firstNoteBtn: "İlk Notu Fotoğrafla",
    searchPlaceholder: "Notlarda, özetlerde veya derslerde ara...",
    notesCountBadge: (c) => `${c} not`,

    captureModalTitle: "Yeni Ders Notu Çıkar",
    captureModalSubtitle:
      "Tahtanın, defterin veya slaytın fotoğrafını yükleyin, yapay zeka metne ve özete dönüştürsün",
    cameraOptionTitle: "Kamera İle Çek",
    cameraOptionDesc: "Tahtayı veya defteri telefon/webcam ile doğrudan fotoğrafla",
    uploadOptionTitle: "Fotoğraf Yükle",
    uploadOptionDesc: "Galeriden, ekran görüntülerinden veya dosyadan seç",
    retakePhoto: "Yeniden Çek / Değiştir",
    courseCategoryLabel: "Ders Kategorisi",
    autoDetectCourse: "✨ Yapay Zeka Otomatik Belirlesin",
    customPromptLabel: "Özel Odak / Talimat (İsteğe bağlı)",
    customPromptPlaceholder: "Örn: Formüllere odaklan, soru çözümlerini adım adım yaz",
    startAnalysisBtn: "Metne & Özete Dönüştür",
    processingBtn: "Not Analiz Ediliyor...",
    analyzingStep1: "Görsel optimize ediliyor...",
    analyzingStep2: "El yazısı & formüller okunuyor...",
    analyzingStep3: "Özet ve sınav tüyoları oluşturuluyor...",
    apiKeyMissingWarning: "Görseli işlemek için Gemini API anahtarı gerekiyor.",
    enterKeyBtn: "Anahtar Gir",
    cancelBtn: "İptal",
    invalidImageError: "Lütfen geçerli bir görsel dosyası seçin (PNG, JPG, WEBP).",

    detailSummaryTab: "Akıllı Özet & Sınav Tüyoları",
    detailOcrTab: "Tahta / Defter Tam Metni",
    detailPhotoTab: "Orijinal Fotoğraf",
    detailEditTab: "Düzenle",
    summaryTitle: "Ders Özeti (AI Summary)",
    keyPointsTitle: "Önemli Çıkarımlar & Formüller",
    examTipsTitle: "Sınavda Çıkabilecek Noktalar & Hoca Tüyoları",
    copyMarkdown: "Markdown Kopyala",
    copied: "Kopyalandı",
    downloadMarkdown: "Markdown İndir",
    deleteNote: "Notu Sil",
    deleteConfirm: "Bu ders notunu silmek istediğinize emin misiniz?",
    fullOcrDesc: "Görselden çıkarılmış biçimlendirilmiş tam metin ve formüller",
    openOriginalPhoto: "Fotoğrafı Tam Boyutta Aç / İndir",
    editTitleLabel: "Başlık",
    editCourseLabel: "Ders",
    editSummaryLabel: "Özet",
    editOcrLabel: "Tam Metin (OCR)",
    editTagsLabel: "Etiketler (Virgülle ayırın)",
    saveChangesBtn: "Değişiklikleri Kaydet",

    settingsTitle: "Gemini API Ayarları",
    settingsSubtitle: "Görsel tanıma ve özetleme için API anahtarınız",
    apiKeyLabel: "Google Gemini API Key",
    securityNoteTitle: "Güvenli & Yerel Saklama",
    securityNoteDesc:
      "API anahtarınız yalnızca kendi tarayıcınızda (localStorage) saklanır, üçüncü taraf sunuculara iletilmez.",
    getApiKeyLink: "Ücretsiz Gemini API Anahtarı Al (Google AI Studio)",
    saveKeyBtn: "Kaydet",
    keySaved: "Kaydedildi",

    newCourseTitle: "Yeni Ders Ekle",
    newCourseSubtitle: "Notlarınızı kategorize etmek için yeni bir ders oluşturun",
    courseNameLabel: "Ders Adı *",
    courseNamePlaceholder: "Örn: Diferansiyel Denklemler",
    courseCodeLabel: "Ders Kodu (İsteğe bağlı)",
    courseCodePlaceholder: "Örn: MAT201",
    courseColorLabel: "Tema Rengi",
    courseDescLabel: "Açıklama (İsteğe bağlı)",
    courseDescPlaceholder: "Örn: 3. Dönem Matematik Bölümü",
    courseNameRequired: "Lütfen ders adını girin.",
    createCourseBtn: "Ders Ekle",

    infoModalTitle: "NoteForge AI Nasıl Kullanılır?",
    infoModalSubtitle: "Derste çekilen fotoğraflardan akıllı kütüphaneye 5 adımda geçiş:",
    infoStep1Title: "1. Ücretsiz Gemini API Anahtarı Ekleyin",
    infoStep1Desc:
      "Sağ üstteki 'API Anahtarı Girin' butonuna tıklayın. Google AI Studio üzerinden tamamen ücretsiz API anahtarı alıp kaydedin.",
    infoStep2Title: "2. Tahtanın veya Defterin Fotoğrafını Çekin",
    infoStep2Desc:
      "'Fotoğraf Çek / Not Yükle' butonuna tıklayarak derste telefon kamerasıyla tahtayı fotoğraflayın veya galerinizden yükleyin.",
    infoStep3Title: "3. Yapay Zeka Çözümlemesi",
    infoStep3Desc:
      "Gemini Multimodal Vision, görseldeki el yazılarını ve matematik formüllerini ($LaTeX$) eksiksiz dijital metne dönüştürür.",
    infoStep4Title: "4. Otomatik Gruplama & Akıllı Özet",
    infoStep4Desc:
      "Yapay zeka dersin konusunu tespit ederek notu doğru derse atar. Size 2 dakikada okunacak bir özet ve sınav tüyoları sunar.",
    infoStep5Title: "5. Düzenleyin ve İndirin",
    infoStep5Desc:
      "Notları istediğiniz zaman düzenleyebilir, Markdown formatında indirebilir veya orijinal fotoğrafı inceleyebilirsiniz.",
    infoCloseBtn: "Anladım, Başla!",
  },

  en: {
    appName: "NoteForge",
    appBadge: "AI",
    apiConnected: "Gemini Connected",
    apiMissing: "Enter API Key",
    addCourse: "Add Course",
    captureNote: "Take Photo / Upload",
    settings: "Settings",
    howToUse: "How to Use?",
    totalCoursesCount: (c) => `${c} Courses`,
    totalNotesCount: (n) => `${n} Notes in Library`,

    heroTag: "AI-Powered Academic Note Assistant",
    heroTitle: "Snap the Board, Auto-Categorize & Summarize Notes.",
    heroSubtitle:
      "Upload chalkboard formulas, professor slides, or handwritten notebooks. Gemini Vision converts them to formatted text, generates smart summaries, and extracts exam tips.",
    heroBtnCapture: "Take Photo / Upload",
    heroBtnCourse: "Create New Course",
    heroBtnInfo: "User Guide",

    allNotes: "All Notes",
    starredNotes: "Starred Notes",
    courseLibrary: "Course Library",
    newCourseBtn: "Add New Course",
    noCoursesYet: "No courses added yet",
    noNotesFoundTitle: "No Notes Yet",
    noNotesFoundSubtitle:
      "Your library is empty! Snap a photo of your chalkboard or notebook to add your first lecture note.",
    firstNoteBtn: "Capture First Note",
    searchPlaceholder: "Search in notes, summaries, or courses...",
    notesCountBadge: (c) => `${c} notes`,

    captureModalTitle: "Extract New Lecture Note",
    captureModalSubtitle:
      "Upload a chalkboard, notebook, or slide photo and let AI convert it into text & summary",
    cameraOptionTitle: "Take with Camera",
    cameraOptionDesc: "Directly capture chalkboard or notebook using phone/webcam",
    uploadOptionTitle: "Upload Photo",
    uploadOptionDesc: "Select from gallery, screenshots, or local files",
    retakePhoto: "Retake / Replace",
    courseCategoryLabel: "Course Category",
    autoDetectCourse: "✨ AI Auto-Detect Course",
    customPromptLabel: "Custom Focus / Instruction (Optional)",
    customPromptPlaceholder: "E.g., Focus on formulas, write step-by-step problem solutions",
    startAnalysisBtn: "Convert to Text & Summary",
    processingBtn: "Analyzing Note...",
    analyzingStep1: "Optimizing image...",
    analyzingStep2: "Reading handwriting & formulas...",
    analyzingStep3: "Generating summary & exam tips...",
    apiKeyMissingWarning: "A Gemini API Key is required to process images.",
    enterKeyBtn: "Enter Key",
    cancelBtn: "Cancel",
    invalidImageError: "Please select a valid image file (PNG, JPG, WEBP).",

    detailSummaryTab: "Smart Summary & Exam Tips",
    detailOcrTab: "Board / Notebook Full Text",
    detailPhotoTab: "Original Photo",
    detailEditTab: "Edit",
    summaryTitle: "Lecture Summary (AI)",
    keyPointsTitle: "Key Takeaways & Formulas",
    examTipsTitle: "Likely Exam Questions & Tips",
    copyMarkdown: "Copy Markdown",
    copied: "Copied",
    downloadMarkdown: "Download Markdown",
    deleteNote: "Delete Note",
    deleteConfirm: "Are you sure you want to delete this lecture note?",
    fullOcrDesc: "Full formatted text and formulas extracted from the image",
    openOriginalPhoto: "Open / Download Original Full Photo",
    editTitleLabel: "Title",
    editCourseLabel: "Course",
    editSummaryLabel: "Summary",
    editOcrLabel: "Full Text (OCR)",
    editTagsLabel: "Tags (Comma-separated)",
    saveChangesBtn: "Save Changes",

    settingsTitle: "Gemini API Settings",
    settingsSubtitle: "Your API key for vision recognition and summarization",
    apiKeyLabel: "Google Gemini API Key",
    securityNoteTitle: "Secure & Local Storage",
    securityNoteDesc:
      "Your API key is only stored locally in your browser (localStorage) and never transmitted to third-party servers.",
    getApiKeyLink: "Get Free Gemini API Key (Google AI Studio)",
    saveKeyBtn: "Save",
    keySaved: "Saved",

    newCourseTitle: "Add New Course",
    newCourseSubtitle: "Create a new subject to categorize your lecture notes",
    courseNameLabel: "Course Name *",
    courseNamePlaceholder: "E.g., Differential Equations",
    courseCodeLabel: "Course Code (Optional)",
    courseCodePlaceholder: "E.g., MATH201",
    courseColorLabel: "Theme Color",
    courseDescLabel: "Description (Optional)",
    courseDescPlaceholder: "E.g., Fall Semester Computer Science",
    courseNameRequired: "Please enter a course name.",
    createCourseBtn: "Add Course",

    infoModalTitle: "How to Use NoteForge AI?",
    infoModalSubtitle: "From classroom chalkboard to smart digital library in 5 steps:",
    infoStep1Title: "1. Add Free Gemini API Key",
    infoStep1Desc:
      "Click 'Enter API Key' at the top right. Get a 100% free API key from Google AI Studio and save it.",
    infoStep2Title: "2. Snap Chalkboard or Notebook Photo",
    infoStep2Desc:
      "Click 'Take Photo / Upload' to snap the board in class using your phone camera or upload from files.",
    infoStep3Title: "3. Multimodal AI Extraction",
    infoStep3Desc:
      "Gemini Multimodal Vision reads messy handwriting, diagrams, and LaTeX math formulas into clean text.",
    infoStep4Title: "4. Auto-Categorize & Smart Summary",
    infoStep4Desc:
      "AI automatically recognizes the course subject, groups it into your library, and generates high-yield exam tips.",
    infoStep5Title: "5. Edit & Export",
    infoStep5Desc:
      "Edit notes anytime, download as clean Markdown (.md), or inspect the original chalkboard picture side-by-side.",
    infoCloseBtn: "Got It, Let's Start!",
  },

  es: {
    appName: "NoteForge",
    appBadge: "IA",
    apiConnected: "Gemini Conectado",
    apiMissing: "Ingresar Clave API",
    addCourse: "Agregar Materia",
    captureNote: "Tomar Foto / Subir",
    settings: "Ajustes",
    howToUse: "¿Cómo Funciona?",
    totalCoursesCount: (c) => `${c} Materias`,
    totalNotesCount: (n) => `${n} Notas en Biblioteca`,

    heroTag: "Asistente Académico con Inteligencia Artificial",
    heroTitle: "Fotografía la Pizarra, Agrupa y Resume tus Apuntes.",
    heroSubtitle:
      "Sube fotos de la pizarra, diapositivas o cuadernos escritos a mano. Gemini Vision los convierte en texto ordenado, genera resúmenes inteligentes y extrae consejos para exámenes.",
    heroBtnCapture: "Tomar Foto / Subir",
    heroBtnCourse: "Crear Nueva Materia",
    heroBtnInfo: "Guía de Uso",

    allNotes: "Todas las Notas",
    starredNotes: "Notas Destacadas",
    courseLibrary: "Biblioteca de Materias",
    newCourseBtn: "Agregar Materia",
    noCoursesYet: "Aún no hay materias",
    noNotesFoundTitle: "No Hay Notas Aún",
    noNotesFoundSubtitle:
      "¡Tu biblioteca está vacía! Toma una foto de la pizarra o cuaderno para agregar tu primer apunte.",
    firstNoteBtn: "Capturar Primera Nota",
    searchPlaceholder: "Buscar en notas, resúmenes o materias...",
    notesCountBadge: (c) => `${c} notas`,

    captureModalTitle: "Extraer Nueva Nota de Clase",
    captureModalSubtitle:
      "Sube la foto de la pizarra, cuaderno o diapositiva para convertirla en texto y resumen con IA",
    cameraOptionTitle: "Tomar con Cámara",
    cameraOptionDesc: "Captura la pizarra o cuaderno directamente con tu móvil o webcam",
    uploadOptionTitle: "Subir Foto",
    uploadOptionDesc: "Selecciona desde la galería, capturas o archivos locales",
    retakePhoto: "Repetir / Cambiar Foto",
    courseCategoryLabel: "Categoría de Materia",
    autoDetectCourse: "✨ La IA lo Detectará Automáticamente",
    customPromptLabel: "Instrucción Específica (Opcional)",
    customPromptPlaceholder: "Ej: Enfócate en fórmulas, escribe paso a paso las soluciones",
    startAnalysisBtn: "Convertir a Texto y Resumen",
    processingBtn: "Analizando Nota...",
    analyzingStep1: "Optimizando imagen...",
    analyzingStep2: "Leyendo letra manuscrita y fórmulas...",
    analyzingStep3: "Generando resumen y consejos de examen...",
    apiKeyMissingWarning: "Se requiere una clave API de Gemini para procesar imágenes.",
    enterKeyBtn: "Ingresar Clave",
    cancelBtn: "Cancelar",
    invalidImageError: "Por favor selecciona un archivo de imagen válido (PNG, JPG, WEBP).",

    detailSummaryTab: "Resumen Inteligente y Exámenes",
    detailOcrTab: "Texto Completo de Pizarra",
    detailPhotoTab: "Foto Original",
    detailEditTab: "Editar",
    summaryTitle: "Resumen de Clase (IA)",
    keyPointsTitle: "Puntos Clave y Fórmulas",
    examTipsTitle: "Preguntas de Examen y Consejos",
    copyMarkdown: "Copiar Markdown",
    copied: "Copiado",
    downloadMarkdown: "Descargar Markdown",
    deleteNote: "Eliminar Nota",
    deleteConfirm: "¿Estás seguro de que deseas eliminar este apunte?",
    fullOcrDesc: "Texto completo y fórmulas formateadas extraídas de la imagen",
    openOriginalPhoto: "Abrir / Descargar Foto Original",
    editTitleLabel: "Título",
    editCourseLabel: "Materia",
    editSummaryLabel: "Resumen",
    editOcrLabel: "Texto Completo (OCR)",
    editTagsLabel: "Etiquetas (Separadas por comas)",
    saveChangesBtn: "Guardar Cambios",

    settingsTitle: "Configuración de Gemini API",
    settingsSubtitle: "Tu clave API para reconocimiento visual y resúmenes",
    apiKeyLabel: "Clave API de Google Gemini",
    securityNoteTitle: "Almacenamiento Seguro y Local",
    securityNoteDesc:
      "Tu clave API se almacena únicamente en tu navegador (localStorage) y nunca se envía a terceros.",
    getApiKeyLink: "Obtener Clave Gemini Gratis (Google AI Studio)",
    saveKeyBtn: "Guardar",
    keySaved: "Guardado",

    newCourseTitle: "Agregar Nueva Materia",
    newCourseSubtitle: "Crea una materia para organizar tus notas de clase",
    courseNameLabel: "Nombre de Materia *",
    courseNamePlaceholder: "Ej: Ecuaciones Diferenciales",
    courseCodeLabel: "Código de Materia (Opcional)",
    courseCodePlaceholder: "Ej: MAT201",
    courseColorLabel: "Color del Tema",
    courseDescLabel: "Descripción (Opcional)",
    courseDescPlaceholder: "Ej: 3er Semestre de Ingeniería",
    courseNameRequired: "Por favor ingresa el nombre de la materia.",
    createCourseBtn: "Agregar Materia",

    infoModalTitle: "¿Cómo Usar NoteForge IA?",
    infoModalSubtitle: "De la pizarra del aula a tu biblioteca digital en 5 pasos:",
    infoStep1Title: "1. Agrega tu Clave API de Gemini Gratis",
    infoStep1Desc:
      "Haz clic en 'Ingresar Clave API' arriba. Consigue una clave gratuita en Google AI Studio y guárdala.",
    infoStep2Title: "2. Toma Foto de la Pizarra o Cuaderno",
    infoStep2Desc:
      "Haz clic en 'Tomar Foto / Subir' para capturar la pizarra durante la clase con tu móvil o subirla de tu galería.",
    infoStep3Title: "3. Extracción con IA Multimodal",
    infoStep3Desc:
      "Gemini Multimodal Vision digitaliza letra manuscrita, diagramas y fórmulas matemáticas ($LaTeX$) sin errores.",
    infoStep4Title: "4. Auto-Agrupación y Resumen Inteligente",
    infoStep4Desc:
      "La IA detecta la materia correspondiente, guarda la nota en su categoría y te ofrece un resumen clave con consejos para exámenes.",
    infoStep5Title: "5. Edita y Exporta",
    infoStep5Desc:
      "Edita tus notas en cualquier momento, descárgalas en formato Markdown (.md) o consulta la foto original de la pizarra.",
    infoCloseBtn: "¡Entendido, Empezar!",
  },
};
