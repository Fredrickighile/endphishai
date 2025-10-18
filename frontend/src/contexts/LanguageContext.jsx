import React, { createContext, useContext, useState, useEffect } from "react";

// Translation data
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
  // Add more languages as needed...
  sw: {
    home: "Nyumbani",
    detect: "Gundua",
    learn: "Jifunze",
    about: "Kuhusu",
    aiActive: "AI Imetumika",
    nextGenAI: "Usalama wa AI wa Kizazi Kijacho kwa Afrika",
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

  const t = (key) => {
    return translationsData[key] || key;
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
