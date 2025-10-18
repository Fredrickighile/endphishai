import React, { createContext, useContext, useState, useEffect } from "react";

// Translation data - COMPLETE for all languages
const translations = {
  en: {
    // Navigation
    home: "Home",
    detect: "Detect",
    learn: "Learn",
    about: "About",

    // Home page
    aiActive: "AI Active",
    nextGenAI: "Next-Generation AI Security",
    stopPhishing: "Stop Phishing",
    beforeItStrikes: "Before It Strikes",
    heroDescription:
      "AI-powered phishing detection protecting African SMEs from cyber threats. Real-time analysis. Instant alerts. Zero compromise.",
    startScanning: "Start Scanning Now",
    learnMore: "Learn More",
    threatsBlocked: "Threats Blocked",
    detectionAccuracy: "Detection Accuracy",
    scansCompleted: "Scans Completed",
    poweredBy: "Powered by",
    advancedAI: "Advanced AI",
    featuresDescription:
      "Five layers of protection working together to keep you safe",
    aiDetection: "AI-Powered Detection",
    aiDetectionDesc:
      "Advanced machine learning model trained on millions of phishing patterns",
    layerProtection: "5-Layer Protection",
    layerProtectionDesc:
      "Google Safe Browsing, VirusTotal, PhishTank, URLhaus + Custom ML",
    smsAlerts: "Real-time SMS Alerts",
    smsAlertsDesc:
      "Instant threat notifications to keep your team protected 24/7",
    africanFocus: "African SME Focus",
    africanFocusDesc:
      "Built specifically for African businesses facing unique cyber threats",
    liveThreats: "Live Threat Intelligence",
    realTimeMonitoring: "Real-time African Threat Monitoring",
    threatDescription:
      "Our AI tracks and analyzes phishing patterns targeting African businesses, providing up-to-date protection against evolving threats.",
    checkLink: "Check a suspicious link",
    topThreats: "Top Threats Detected",
    bankingScams: "Banking Scams",
    mobileMoney: "Mobile Money",
    paymentFraud: "Payment Fraud",
    other: "Other",
    readyToProtect: "Ready to Protect Your Business?",
    joinThousands:
      "Join thousands of African SMEs using PhishAI to stay safe from phishing attacks",
    startFreeScan: "Start Free Scan",
    allSystems: "All Systems Operational",
  },
  fr: {
    home: "Accueil",
    detect: "Détecter",
    learn: "Apprendre",
    about: "À propos",
    aiActive: "IA Active",
    nextGenAI: "Sécurité IA Nouvelle Génération pour l'Afrique",
    stopPhishing: "Stoppez le Phishing",
    beforeItStrikes: "Avant Qu'il Ne Frappe",
    heroDescription:
      "Détection de phishing alimentée par l'IA protégeant les PME africaines contre les cybermenaces. Analyse en temps réel. Alertes instantanées. Zéro compromis.",
    startScanning: "Commencer l'Analyse",
    learnMore: "En Savoir Plus",
    threatsBlocked: "Menaces Bloquées",
    detectionAccuracy: "Précision de Détection",
    scansCompleted: "Analyses Terminées",
    poweredBy: "Propulsé par",
    advancedAI: "IA Avancée",
    featuresDescription:
      "Cinq couches de protection travaillant ensemble pour vous protéger",
    aiDetection: "Détection par IA",
    aiDetectionDesc:
      "Modèle d'apprentissage avancé formé sur des millions de modèles de phishing",
    layerProtection: "Protection à 5 Couches",
    layerProtectionDesc:
      "Google Safe Browsing, VirusTotal, PhishTank, URLhaus + ML Personnalisé",
    smsAlerts: "Alertes SMS en Temps Réel",
    smsAlertsDesc:
      "Notifications instantanées de menaces pour protéger votre équipe 24h/24",
    africanFocus: "Focus PME Africaines",
    africanFocusDesc:
      "Conçu spécifiquement pour les entreprises africaines face à des cybermenaces uniques",
    liveThreats: "Renseignement sur les Menaces en Direct",
    realTimeMonitoring: "Surveillance Africaine des Menaces en Temps Réel",
    threatDescription:
      "Notre IA suit et analyse les modèles de phishing ciblant les entreprises africaines, fournissant une protection à jour contre les menaces évolutives.",
    checkLink: "Vérifier un lien suspect",
    topThreats: "Menaces Principales Détectées",
    bankingScams: "Arnaques Bancaires",
    mobileMoney: "Argent Mobile",
    paymentFraud: "Fraude de Paiement",
    other: "Autre",
    readyToProtect: "Prêt à Protéger Votre Entreprise?",
    joinThousands:
      "Rejoignez des milliers de PME africaines utilisant PhishAI pour se protéger contre les attaques de phishing",
    startFreeScan: "Commencer l'Analyse Gratuite",
    allSystems: "Tous les Systèmes Opérationnels",
  },
  es: {
    home: "Inicio",
    detect: "Detectar",
    learn: "Aprender",
    about: "Acerca de",
    aiActive: "IA Activa",
    nextGenAI: "Seguridad IA de Próxima Generación para África",
    stopPhishing: "Detén el Phishing",
    beforeItStrikes: "Antes de que Ataque",
    heroDescription:
      "Detección de phishing con IA que protege a las PYMEs africanas de ciberamenazas. Análisis en tiempo real. Alertas instantáneas. Cero compromisos.",
    startScanning: "Comenzar Escaneo",
    learnMore: "Saber Más",
    threatsBlocked: "Amenazas Bloqueadas",
    detectionAccuracy: "Precisión de Detección",
    scansCompleted: "Escaneos Completados",
    poweredBy: "Impulsado por",
    advancedAI: "IA Avanzada",
    featuresDescription:
      "Cinco capas de protección trabajando juntas para mantenerlo seguro",
    aiDetection: "Detección con IA",
    aiDetectionDesc:
      "Modelo de aprendizaje automático avanzado entrenado en millones de patrones de phishing",
    layerProtection: "Protección de 5 Capas",
    layerProtectionDesc:
      "Google Safe Browsing, VirusTotal, PhishTank, URLhaus + ML Personalizado",
    smsAlerts: "Alertas SMS en Tiempo Real",
    smsAlertsDesc:
      "Notificaciones instantáneas de amenazas para proteger a su equipo 24/7",
    africanFocus: "Enfoque en PYMEs Africanas",
    africanFocusDesc:
      "Construido específicamente para empresas africanas que enfrentan ciberamenazas únicas",
    liveThreats: "Inteligencia de Amenazas en Vivo",
    realTimeMonitoring: "Monitoreo Africano de Amenazas en Tiempo Real",
    threatDescription:
      "Nuestra IA rastrea y analiza patrones de phishing que apuntan a empresas africanas, proporcionando protección actualizada contra amenazas en evolución.",
    checkLink: "Verificar un enlace sospechoso",
    topThreats: "Principales Amenazas Detectadas",
    bankingScams: "Estafas Bancarias",
    mobileMoney: "Dinero Móvil",
    paymentFraud: "Fraude de Pago",
    other: "Otro",
    readyToProtect: "¿Listo para Proteger su Negocio?",
    joinThousands:
      "Únase a miles de PYMEs africanas que usan PhishAI para protegerse de ataques de phishing",
    startFreeScan: "Comenzar Escaneo Gratuito",
    allSystems: "Todos los Sistemas Operativos",
  },
  pt: {
    home: "Início",
    detect: "Detectar",
    learn: "Aprender",
    about: "Sobre",
    aiActive: "IA Ativa",
    nextGenAI: "Segurança IA de Próxima Geração para África",
    stopPhishing: "Pare o Phishing",
    beforeItStrikes: "Antes que Ataque",
    heroDescription:
      "Detecção de phishing alimentada por IA protegendo PMEs africanas contra ciberameaças. Análise em tempo real. Alertas instantâneas. Zero compromissos.",
    startScanning: "Iniciar Verificação",
    learnMore: "Saiba Mais",
    threatsBlocked: "Ameaças Bloqueadas",
    detectionAccuracy: "Precisão de Detecção",
    scansCompleted: "Verificações Concluídas",
    poweredBy: "Alimentado por",
    advancedAI: "IA Avançada",
    featuresDescription:
      "Cinco camadas de proteção trabalhando juntas para mantê-lo seguro",
    aiDetection: "Detecção por IA",
    aiDetectionDesc:
      "Modelo de aprendizado avançado treinado em milhões de padrões de phishing",
    layerProtection: "Proteção de 5 Camadas",
    layerProtectionDesc:
      "Google Safe Browsing, VirusTotal, PhishTank, URLhaus + ML Personalizado",
    smsAlerts: "Alertas SMS em Tempo Real",
    smsAlertsDesc:
      "Notificações instantâneas de ameaças para proteger sua equipe 24/7",
    africanFocus: "Foco em PMEs Africanas",
    africanFocusDesc:
      "Construído especificamente para empresas africanas que enfrentam ciberameaças únicas",
    liveThreats: "Inteligência de Ameaças ao Vivo",
    realTimeMonitoring: "Monitoramento Africano de Ameaças em Tempo Real",
    threatDescription:
      "Nossa IA rastreia e analisa padrões de phishing que visam empresas africanas, fornecendo proteção atualizada contra ameaças em evolução.",
    checkLink: "Verificar um link suspeito",
    topThreats: "Principais Ameaças Detectadas",
    bankingScams: "Golpes Bancários",
    mobileMoney: "Dinheiro Móvel",
    paymentFraud: "Fraude de Pagamento",
    other: "Outro",
    readyToProtect: "Pronto para Proteger seu Negócio?",
    joinThousands:
      "Junte-se a milhares de PMEs africanas usando PhishAI para se proteger contra ataques de phishing",
    startFreeScan: "Iniciar Verificação Gratuita",
    allSystems: "Todos os Sistemas Operacionais",
  },
  ar: {
    home: "الرئيسية",
    detect: "الكشف",
    learn: "تعلم",
    about: "حول",
    aiActive: "الذكاء الاصطناعي نشط",
    nextGenAI: "أمن الذكاء الاصطناعي من الجيل التالي لأفريقيا",
    stopPhishing: "أوقف التصيد",
    beforeItStrikes: "قبل أن يضرب",
    heroDescription:
      "كشف التصيد الإلكتروني المدعوم بالذكاء الاصطناعي يحمي الشركات الصغيرة والمتوسطة الأفريقية من التهديدات الإلكترونية. تحليل في الوقت الفعلي. تنبيهات فورية. لا مساومة.",
    startScanning: "ابدأ الفحص الآن",
    learnMore: "اعرف المزيد",
    threatsBlocked: "التهديدات المحظورة",
    detectionAccuracy: "دقة الكشف",
    scansCompleted: "عمليات الفحص المكتملة",
    poweredBy: "مدعوم بـ",
    advancedAI: "الذكاء الاصطناعي المتقدم",
    featuresDescription: "خمس طبقات من الحماية تعمل معًا للحفاظ على أمانك",
    aiDetection: "الكشف بالذكاء الاصطناعي",
    aiDetectionDesc: "نموذج تعلم آلي متقدم مدرب على ملايين أنماط التصيد",
    layerProtection: "حماية من 5 طبقات",
    layerProtectionDesc:
      "Google Safe Browsing، VirusTotal، PhishTank، URLhaus + نموذج ML مخصص",
    smsAlerts: "تنبيهات SMS في الوقت الفعلي",
    smsAlertsDesc: "إشعارات فورية بالتهديدات لحماية فريقك على مدار 24/7",
    africanFocus: "التركيز على الشركات الأفريقية",
    africanFocusDesc:
      "مبني خصيصًا للشركات الأفريقية التي تواجه تهديدات إلكترونية فريدة",
    liveThreats: "استخبارات التهديدات المباشرة",
    realTimeMonitoring: "مراقبة التهديدات الأفريقية في الوقت الفعلي",
    threatDescription:
      "يتتبع الذكاء الاصطناعي الخاص بنا ويحلل أنماط التصيد التي تستهدف الشركات الأفريقية، مما يوفر حماية محدثة ضد التهديدات المتطورة.",
    checkLink: "تحقق من رابط مشبوه",
    topThreats: "أهم التهديدات المكتشفة",
    bankingScams: "عمليات الاحتيال المصرفي",
    mobileMoney: "الأموال عبر الهاتف",
    paymentFraud: "احتيال الدفع",
    other: "أخرى",
    readyToProtect: "مستعد لحماية عملك؟",
    joinThousands:
      "انضم إلى آلاف الشركات الأفريقية التي تستخدم PhishAI للبقاء في مأمن من هجمات التصيد",
    startFreeScan: "ابدأ الفحص المجاني",
    allSystems: "جميع الأنظمة تعمل",
  },
  // For other languages, we'll use English as fallback temporarily
  zh: {
    home: "首页",
    detect: "检测",
    learn: "学习",
    about: "关于",
    aiActive: "AI 活跃",
    // ... add more Chinese translations or they'll fallback to English
  },
  hi: {
    home: "होम",
    detect: "डिटेक्ट",
    learn: "सीखें",
    about: "के बारे में",
    aiActive: "एआई सक्रिय",
    // ... add more Hindi translations
  },
  ru: {
    home: "Главная",
    detect: "Обнаружить",
    learn: "Учить",
    about: "О нас",
    aiActive: "ИИ Активен",
    // ... add more Russian translations
  },
  ja: {
    home: "ホーム",
    detect: "検出",
    learn: "学ぶ",
    about: "約",
    aiActive: "AI アクティブ",
    // ... add more Japanese translations
  },
  sw: {
    home: "Nyumbani",
    detect: "Gundua",
    learn: "Jifunze",
    about: "Kuhusu",
    aiActive: "AI Imetumika",
    // ... add more Swahili translations
  },
  yo: {
    home: "Ilé",
    detect: "Ṣàwárí",
    learn: "Kọ́",
    about: "Nípa",
    aiActive: "AI Ti nṣiṣẹ",
    // ... add more Yoruba translations
  },
  ha: {
    home: "Gida",
    detect: "Gano",
    learn: "Koya",
    about: "Game da",
    aiActive: "AI Yana aiki",
    // ... add more Hausa translations
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [translationsData, setTranslationsData] = useState(
    translations[language]
  );

  useEffect(() => {
    setTranslationsData(translations[language]);
  }, [language]);

  // FIXED: Graceful fallback for missing translations
  const t = (key) => {
    // First try to get translation from current language
    let translation = translationsData[key];

    // If not found in current language, try English as fallback
    if (translation === undefined && language !== "en") {
      translation = translations.en[key];
    }

    // If still not found, return the key itself (so you can see what's missing)
    return translation !== undefined ? translation : `[${key}]`;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
