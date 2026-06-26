"""
EndPhishAI - NLP AI Module
Transformer disabled for Render free tier (insufficient RAM)
Heuristic layers handle detection - works great for demos
"""

import re
from typing import Dict, List, Tuple


class RealNLPPhishingAI:
    
    def __init__(self):
        print("Initializing NLP AI (heuristic mode)...")
        self.ai_available = False
        print("Transformer disabled - using heuristic NLP (production mode)")
        
        self.phishing_intents = {
            'urgency': [
                'urgent', 'immediate', 'now', 'asap', 'quickly', 'hurry',
                'expire', 'deadline', 'limited time', 'act now', 'right now',
                'haraka', 'gaggawa', 'kiakia'
            ],
            'threat': [
                'suspend', 'close', 'block', 'lock', 'disable', 'terminate',
                'restricted', 'limited', 'frozen', 'deactivate', 'banned',
                'imefungwa', 'kulle', 'bloque'
            ],
            'action_required': [
                'verify', 'confirm', 'update', 'validate', 'authenticate',
                'complete', 'review', 'check', 'secure', 'restore', 'click',
                'thibitisha', 'jerisi', 'tabbatar', 'verifier', 'bonyeza'
            ],
            'reward': [
                'win', 'won', 'prize', 'congratulation', 'selected', 'lucky',
                'claim', 'reward', 'bonus', 'free', 'gift', 'winner',
                'zawadi', 'cin nasara', 'gagner'
            ],
            'financial': [
                'account', 'payment', 'card', 'bank', 'credit', 'debit',
                'transaction', 'billing', 'invoice', 'refund', 'money',
                'mpesa', 'm-pesa', 'mtn', 'airtel', 'pesa', 'kudi', 'akaunti'
            ]
        }
        
        self.legitimate_patterns = {
            'transaction_confirmation': [
                'your transaction', 'payment received', 'order confirmed',
                'successfully processed', 'transaction successful',
                'muamala umefanikiwa', 'cinikin ya yi nasara'
            ],
            'informational': [
                'newsletter', 'update', 'announcement', 'reminder',
                'notification', 'alert', 'notice'
            ]
        }

    def analyze_text(self, text: str) -> Dict:
        if not text or len(text.strip()) < 10:
            return self._create_result(0.0, "Text too short for analysis", [])
        
        text = text.strip()
        
        intent_score, intent_indicators = self._classify_intent(text)
        sentiment_score, sentiment_type = self._analyze_sentiment(text)
        linguistic_score, linguistic_indicators = self._analyze_linguistic_patterns(text)
        context_score, context_indicators = self._analyze_context(text)
        language_score, detected_language = self._detect_language_and_analyze(text)
        
        final_score = (
            intent_score * 0.40 +
            sentiment_score * 0.20 +
            linguistic_score * 0.20 +
            context_score * 0.20
        )
        
        all_indicators = (
            intent_indicators +
            linguistic_indicators +
            context_indicators +
            [f"Language: {detected_language}"]
        )
        
        if sentiment_type == 'negative':
            all_indicators.append("Negative/threatening tone detected")
        
        return self._create_result(
            final_score,
            self._generate_explanation(final_score, sentiment_type, detected_language),
            all_indicators[:8]
        )

    def _classify_intent(self, text: str) -> Tuple[float, List[str]]:
        text_lower = text.lower()
        score = 0.0
        indicators = []
        
        intent_matches = {}
        for intent_type, keywords in self.phishing_intents.items():
            matches = sum(1 for kw in keywords if kw in text_lower)
            if matches > 0:
                intent_matches[intent_type] = matches
        
        if 'urgency' in intent_matches and 'action_required' in intent_matches:
            score += 0.70
            indicators.append("Urgency + Action Required (classic phishing)")
        
        if 'urgency' in intent_matches and 'financial' in intent_matches:
            score += 0.65
            indicators.append("Urgent financial action requested")
        
        if 'threat' in intent_matches and 'financial' in intent_matches:
            score += 0.70
            indicators.append("Threatening financial consequences")
        
        if 'action_required' in intent_matches and 'financial' in intent_matches:
            score += 0.60
            indicators.append("Financial verification requested")
        
        if 'reward' in intent_matches and 'action_required' in intent_matches:
            score += 0.60
            indicators.append("Fake reward scam pattern")
        
        if 'urgency' in intent_matches:
            score += 0.25
            indicators.append("Urgency tactics detected")
        
        if 'threat' in intent_matches:
            score += 0.30
            indicators.append("Threatening language detected")
        
        return min(score, 1.0), indicators

    def _analyze_sentiment(self, text: str) -> Tuple[float, str]:
        text_lower = text.lower()
        
        negative_words = [
            'suspend', 'block', 'close', 'lock', 'lose', 'lost', 'fraud',
            'unauthorized', 'suspicious', 'risk', 'danger', 'problem',
            'issue', 'error', 'fail', 'invalid', 'decline'
        ]
        
        positive_words = [
            'thank', 'congratulation', 'success', 'complete', 'confirm',
            'secure', 'safe', 'protect', 'welcome'
        ]
        
        negative_count = sum(1 for word in negative_words if word in text_lower)
        positive_count = sum(1 for word in positive_words if word in text_lower)
        
        if negative_count > positive_count and negative_count > 2:
            return 0.45, 'negative'
        elif positive_count > negative_count:
            return 0.10, 'positive'
        else:
            return 0.25, 'neutral'

    def _analyze_linguistic_patterns(self, text: str) -> Tuple[float, List[str]]:
        score = 0.0
        indicators = []
        
        if text.count('!') > 2:
            score += 0.30
            indicators.append(f"Excessive exclamation marks ({text.count('!')})")
        
        if text.count('?') > 2:
            score += 0.25
            indicators.append(f"Multiple questions ({text.count('?')})")
        
        caps_words = [w for w in text.split() if w.isupper() and len(w) > 2]
        if len(caps_words) > 2:
            score += 0.35
            indicators.append(f"Excessive capitalization ({len(caps_words)} words)")
        
        urls = re.findall(r'https?://\S+', text)
        if urls:
            score += 0.20
            indicators.append(f"Contains {len(urls)} URL(s)")
        
        return min(score, 1.0), indicators

    def _analyze_context(self, text: str) -> Tuple[float, List[str]]:
        text_lower = text.lower()
        score = 0.0
        indicators = []
        
        is_legitimate = False
        for pattern_type, patterns in self.legitimate_patterns.items():
            if any(pattern in text_lower for pattern in patterns):
                is_legitimate = True
                break
        
        if is_legitimate:
            score -= 0.30
            indicators.append("Contains legitimate communication patterns")
        
        brands = ['paypal', 'facebook', 'google', 'amazon', 'netflix',
                  'mpesa', 'm-pesa', 'mtn', 'airtel', 'gtbank', 'firstbank']
        
        brand_mentions = [brand for brand in brands if brand in text_lower]
        if brand_mentions and any(word in text_lower for word in ['verify', 'thibitisha', 'confirm', 'suspend', 'lock']):
            score += 0.55
            indicators.append(f"Brand impersonation attempt ({', '.join(brand_mentions)})")
        
        return max(score, 0.0), indicators

    def _detect_language_and_analyze(self, text: str) -> Tuple[float, str]:
        text_lower = text.lower()
        
        if any(w in text_lower for w in ['thibitisha', 'haraka', 'akaunti', 'mpesa', 'bonyeza', 'salio']):
            return 0.0, "Swahili"
        elif any(w in text_lower for w in ['compte', 'verifier', 'bloque', 'maintenant']):
            return 0.0, "French"
        elif any(w in text_lower for w in ['kiakia', 'jerisi', 'owo', 'wahala']):
            return 0.0, "Yoruba"
        elif any(w in text_lower for w in ['gaggawa', 'tabbatar', 'asusun', 'kudi', 'matsala']):
            return 0.0, "Hausa"
        else:
            return 0.0, "English"

    def _generate_explanation(self, score: float, sentiment: str, language: str) -> str:
        if score >= 0.70:
            return f"Multiple phishing indicators detected with {sentiment} sentiment in {language} text"
        elif score >= 0.50:
            return f"Suspicious patterns typical of phishing attempts detected ({language})"
        elif score >= 0.30:
            return f"Some concerning patterns detected, proceed with caution"
        else:
            return f"Analysis suggests legitimate communication"

    def _create_result(self, score: float, explanation: str, indicators: List[str]) -> Dict:
        return {
            'nlp_score': round(float(score), 3),
            'explanation': explanation,
            'indicators': indicators,
            'ai_method': 'Linguistic Pattern Analysis',
            'confidence': round(min(abs(score - 0.5) * 2, 1.0), 3)
        }


nlp_ai = RealNLPPhishingAI()


def analyze_text_with_nlp_ai(text: str) -> Dict:
    return nlp_ai.analyze_text(text)