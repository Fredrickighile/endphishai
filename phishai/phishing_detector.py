"""
EndPhishAI - Production-Grade Phishing Detector
Integrates ML, Heuristics, and NLP AI for comprehensive threat detection
"""

import re
from urllib.parse import urlparse
import joblib
from pathlib import Path
import pandas as pd
from scipy.sparse import hstack
from difflib import SequenceMatcher

try:
    from nlp_ai_analyzer import analyze_text_with_nlp_ai
    NLP_AI_AVAILABLE = True
    print("NLP AI Module: Loaded successfully")
except ImportError:
    NLP_AI_AVAILABLE = False
    print("NLP AI Module: Not available - using standard detection only")


class ProductionPhishingDetector:

    def __init__(self, model_dir="./models"):
        self.model_dir = Path(model_dir)
        self.model = None
        self.vectorizer = None
        self.scaler = None
        self.ml_available = False
        self._load_model()

        self.suspicious_tlds = {
            '.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top', '.click',
            '.link', '.loan', '.work', '.date', '.racing', '.download',
            '.win', '.bid', '.science', '.party', '.review', '.trade',
            '.stream', '.zip', '.men', '.cricket', '.accountant', '.faith',
            '.webcam', '.gdn', '.mom'
        }

        self.trusted_tlds = {
            '.gov', '.gov.uk', '.gov.au', '.gov.ng', '.gov.za', '.gov.ke',
            '.mil', '.govt.nz',
            '.edu', '.ac.uk', '.ac.za', '.ac.ke', '.edu.ng', '.edu.au',
            '.org', '.int'
        }

        self.major_brands = {
            'google', 'facebook', 'microsoft', 'apple', 'amazon', 'netflix',
            'instagram', 'whatsapp', 'twitter', 'linkedin', 'youtube', 'tiktok',
            'paypal', 'visa', 'mastercard', 'stripe', 'binance', 'coinbase',
            'chase', 'wellsfargo', 'bankofamerica', 'citibank',
            'gtbank', 'firstbank', 'accessbank', 'zenith', 'uba', 'ecobank',
            'standardbank', 'absa', 'nedbank', 'fnb', 'capitec',
            'equitybank', 'kcb', 'coopbank', 'barclays', 'stanbic',
            'safaricom', 'mtn', 'airtel', 'vodacom', 'orange', 'etisalat',
            'jumia', 'konga', 'takealot', 'alibaba', 'ebay', 'shopify'
        }

        self.legitimate_ng_domains = {
            'gosub.ng', 'jumia.com.ng', 'konga.com', 'paystack.com',
            'flutterwave.com', 'gtbank.com', 'firstbanknigeria.com',
            'zenithbank.com', 'nairaland.com', 'bellanaija.com'
        }

        self.legitimate_patterns = [
            r'transaction.*(successful|completed|confirmed)',
            r'payment.*(received|sent|processed)',
            r'order.*confirmed',
            r'(reference|receipt|confirmation).*(number|code|id):\s*[A-Z0-9-]+',
            r'(customer|help|support|contact)\.',
            r'account\.(google|microsoft|apple|facebook)',
            r'(login|signin|accounts)\.(google|microsoft|apple)',
            r'noreply@',
            r'no-reply@',
            r'notifications@',
            r'@.*\.(gov|edu|ac\.)'
        ]

        self.phishing_keywords = {
            'english': {
                'verify account', 'urgent action', 'suspended account',
                'confirm identity', 'unusual activity', 'click here',
                'claim prize', 'you won', 'expires soon', 'act now',
                'restore access', 'locked account', 'security alert'
            },
            'swahili': {
                'thibitisha haraka', 'akaunti imefungwa', 'malipo bure',
                'zawadi kubwa', 'shinda', 'hatari ya usalama', 'fungua link',
                'tatizo la akaunti', 'imekataliwa', 'nenda kwa'
            },
            'yoruba': {
                'jerisi kiakia', 'akooole ti di', 'owo funni', 'ebun nla',
                'bori', 'idaniloju', 'wahala pelu', 'titipa owo', 'ibamo'
            },
            'hausa': {
                'tabbatar gaggawa', 'asusun kulle', 'kudi kyauta',
                'cin nasara', 'matsala', 'gyara asusun', 'danna nan'
            }
        }

        self.casual_patterns = {
            'hi', 'hello', 'hey', 'how are you', 'good morning',
            'good afternoon', 'good evening', 'see you', 'talk soon',
            'catch you later', 'meeting at', 'coffee', 'lunch', 'dinner',
            'running late', 'on my way', 'just checking', 'let me know',
            'sounds good', 'okay', 'sure', 'thanks', 'thank you'
        }

        # Homoglyph map — characters attackers swap to fool the eye
        self.HOMOGLYPHS = {
            '0': 'o', '1': 'l', '3': 'e', '4': 'a', '5': 's',
            '6': 'g', '7': 't', '8': 'b', '@': 'a',
            'vv': 'w', 'rn': 'm', 'cl': 'd', 'ii': 'u',
        }

    def _load_model(self):
        model_path = self.model_dir / "phishing_model.pkl"
        vectorizer_path = self.model_dir / "vectorizer.pkl"
        scaler_path = self.model_dir / "scaler.pkl"

        if model_path.exists() and vectorizer_path.exists() and scaler_path.exists():
            try:
                self.model = joblib.load(model_path)
                self.vectorizer = joblib.load(vectorizer_path)
                self.scaler = joblib.load(scaler_path)
                self.ml_available = True
                print("ML Model: Loaded successfully")
            except Exception as e:
                print(f"ML Model: Loading error - {e}")
                self.ml_available = False
        else:
            print("ML Model: Not found - using heuristics only")
            self.ml_available = False

    def detect_phishing(self, input_text, use_content_analysis=False, safe_analyzer=None):
        input_text = self._sanitize_input(input_text)

        if not input_text:
            return self._safe_result("Empty input", confidence=0.0)

        if self._is_casual_conversation(input_text):
            return self._safe_result("Normal conversation", confidence=0.05)

        if self._looks_like_domain(input_text) and not input_text.startswith('http'):
            input_text = 'http://' + input_text

        if self._is_url(input_text):
            if self._is_trusted_tld(input_text):
                return self._safe_result("Verified government/education domain", confidence=0.0)

        is_legitimate, legit_score, legit_reasons = self._check_legitimate_context(input_text)
        if is_legitimate:
            return self._safe_result("; ".join(legit_reasons), confidence=legit_score)

        if use_content_analysis and safe_analyzer and self._is_url(input_text):
            return self._detect_with_safe_content_analysis(input_text, safe_analyzer)

        heuristic_result = self._analyze_heuristics(input_text)
        ml_score = self._analyze_ml(input_text) if self.ml_available else None

        nlp_result = None
        if NLP_AI_AVAILABLE and not self._is_url(input_text):
            nlp_result = analyze_text_with_nlp_ai(input_text)
            if nlp_result['nlp_score'] > 0.5:
                boost = nlp_result['nlp_score'] * 0.3
                heuristic_result['score'] = min(heuristic_result['score'] + boost, 1.0)
                heuristic_result['reasons'].extend(nlp_result['indicators'][:3])

        return self._combine_scores(heuristic_result, ml_score, input_text, nlp_result)

    def _detect_with_safe_content_analysis(self, url, safe_analyzer):
        try:
            standard_result = self.detect_phishing(url, use_content_analysis=False)
            content_result = safe_analyzer.analyze_safely(url)

            if content_result.get('success'):
                indicators = content_result.get('indicators_found', [])
                analysis_data = content_result.get('analysis', {})
                actual_content_data = {
                    'html_elements': analysis_data.get('html_elements', 0),
                    'scripts_count': analysis_data.get('scripts_count', 0),
                    'forms_count': analysis_data.get('forms_count', 0),
                    'external_links': analysis_data.get('external_links', 0)
                }

                if content_result.get('whitelisted'):
                    return {
                        'prediction': 'safe', 'confidence': 0.0,
                        'explanation': 'Whitelisted trusted domain',
                        'heuristic_score': 0.0, 'ml_score': None,
                        'method': 'Whitelist Check + Content Scan',
                        'content_analysis_performed': True,
                        'content_indicators': indicators,
                        'content_analysis_data': actual_content_data,
                        'analysis': actual_content_data, 'phishing_score': 0.0
                    }

                standard_score = standard_result['confidence']
                content_score = content_result.get('phishing_score', 0)

                if content_score >= 0.70:
                    final_score = (0.3 * standard_score) + (0.7 * content_score)
                elif content_score >= 0.40:
                    final_score = (0.5 * standard_score) + (0.5 * content_score)
                else:
                    final_score = (0.7 * standard_score) + (0.3 * content_score)

                if final_score >= 0.70:
                    prediction = 'phishing'
                elif final_score >= 0.50:
                    prediction = 'suspicious'
                else:
                    prediction = 'safe'

                content_summary = ', '.join(indicators[:2]) if indicators else 'No content indicators'
                return {
                    'prediction': prediction,
                    'confidence': round(final_score, 3),
                    'explanation': f"{standard_result['explanation']}; Content: {content_summary}",
                    'heuristic_score': standard_result.get('heuristic_score', 0.0),
                    'ml_score': standard_result.get('ml_score'),
                    'method': 'Enhanced AI + Deep Content Analysis',
                    'content_analysis_performed': True,
                    'content_indicators': indicators,
                    'content_analysis_data': actual_content_data,
                    'analysis': actual_content_data,
                    'phishing_score': content_score
                }
            else:
                standard_result['content_analysis_performed'] = False
                standard_result['content_analysis_error'] = content_result.get('error', 'Unknown')
                return standard_result

        except Exception as e:
            standard_result = self.detect_phishing(url, use_content_analysis=False)
            standard_result['content_analysis_performed'] = False
            standard_result['content_analysis_error'] = str(e)
            return standard_result

    def _normalize_homoglyphs(self, text):
        """Replace homoglyphs with their real characters"""
        result = text
        for fake, real in self.HOMOGLYPHS.items():
            result = result.replace(fake, real)
        return result

    def _fuzzy_brand_match(self, domain):
        """
        Detect typosquatting and homoglyph attacks.
        Catches: paypa1.com, g00gle.com, arnazon.com, rn-impersonation
        """
        domain_clean = re.sub(r'[^a-z0-9.-]', '', domain.lower())
        domain_clean = re.sub(r'^www\.', '', domain_clean)
        domain_parts = domain_clean.split('.')
        domain_name = domain_parts[0] if domain_parts else domain_clean

        # Normalize homoglyphs for comparison
        domain_normalized = self._normalize_homoglyphs(domain_name)

        for brand in self.major_brands:
            brand_clean = brand.lower()

            # ── EXACT LEGITIMATE MATCH — always safe ──────────────
            if (domain_clean == f"{brand_clean}.com" or
                    domain_clean == f"{brand_clean}.ng" or
                    domain_clean == f"{brand_clean}.co.uk" or
                    domain_clean == f"{brand_clean}.com.ng"):
                return False, brand_clean, 1.0

            # ── HOMOGLYPH ATTACK ──────────────────────────────────
            # paypa1.com → paypal, g00gle.com → google
            if domain_normalized == brand_clean and domain_name != brand_clean:
                return True, brand_clean, 0.98

            # ── HYPHEN IMPERSONATION ──────────────────────────────
            # paypal-secure.xyz, mtn-verify.tk
            if (f"{brand_clean}-" in domain_clean or
                    f"-{brand_clean}" in domain_clean):
                if not domain_clean.endswith(f"{brand_clean}.com"):
                    return True, brand_clean, 0.95

            # ── SUBDOMAIN IMPERSONATION ───────────────────────────
            # paypal.fake-site.com
            if domain_clean.startswith(f"{brand_clean}."):
                if domain_clean != f"{brand_clean}.com":
                    return True, brand_clean, 0.90

            # ── FUZZY MATCH (lowered threshold to catch more) ─────
            # arnazon, micosoft, gooogle
            similarity = SequenceMatcher(None, brand_clean, domain_name).ratio()
            if 0.80 <= similarity < 1.0 and len(brand_clean) > 4:
                if domain_name != brand_clean:
                    return True, brand_clean, similarity

        return False, None, 0.0

    def _is_trusted_tld(self, url):
        try:
            parsed = urlparse(url.lower())
            domain = parsed.netloc
            for tld in self.trusted_tlds:
                if domain.endswith(tld):
                    return True
            return False
        except:
            return False

    def _is_legitimate_nigerian_domain(self, domain):
        try:
            domain_lower = domain.lower()
            return any(
                domain_lower == legit or domain_lower.endswith(f".{legit}")
                for legit in self.legitimate_ng_domains
            )
        except:
            return False

    def _is_casual_conversation(self, text):
        text_lower = text.lower()
        if len(text) < 200:
            casual_count = sum(1 for pattern in self.casual_patterns if pattern in text_lower)
            if casual_count >= 2:
                return True
        has_no_url = 'http' not in text_lower and 'www.' not in text_lower
        has_casual = any(pattern in text_lower for pattern in self.casual_patterns)
        has_no_urgency = not any(word in text_lower for word in ['urgent', 'immediate', 'verify', 'suspended'])
        if has_no_url and has_casual and has_no_urgency:
            return True
        return False

    def _check_legitimate_context(self, text):
        text_lower = text.lower()
        legitimacy_score = 0.0
        reasons = []

        for pattern in self.legitimate_patterns:
            if re.search(pattern, text_lower):
                legitimacy_score += 0.25
                reasons.append("Legitimate pattern detected")
                if legitimacy_score >= 0.50:
                    break

        has_ref = bool(re.search(r'(reference|receipt|transaction|order).*[A-Z0-9]{6,}', text_lower))
        has_amount = bool(re.search(r'(amount|total|paid).*[$€£¥₦₹]\s*[\d,]+', text_lower))

        if has_ref and has_amount:
            legitimacy_score += 0.40
            reasons.append("Valid transaction structure")

        is_legitimate = legitimacy_score >= 0.50
        return is_legitimate, legitimacy_score, reasons

    def _analyze_heuristics(self, text):
        score = 0.0
        reasons = []
        text_lower = text.lower()
        is_url = self._is_url(text)

        if is_url:
            parsed = urlparse(text)
            domain = parsed.netloc.lower()

            if self._is_legitimate_nigerian_domain(domain):
                return {'score': 0.0, 'reasons': ['Verified Nigerian domain']}

            if self._is_ip_address(domain):
                score += 0.70
                reasons.append("Uses IP address (common in phishing)")

            for tld in self.suspicious_tlds:
                if domain.endswith(tld):
                    score += 0.55
                    reasons.append(f"Suspicious domain extension ({tld})")
                    break

            is_typosquat, brand, similarity = self._fuzzy_brand_match(domain)
            if is_typosquat:
                score += 0.65
                reasons.append(f"Potential {brand.upper()} impersonation (typosquat/homoglyph)")

            subdomain_count = domain.count('.') - 1
            if subdomain_count > 3:
                score += 0.40
                reasons.append("Suspicious subdomain structure")

            if re.search(r':\d+', domain):
                score += 0.35
                reasons.append("Non-standard port number")

            if not text.startswith('https://') and not domain.endswith('.gov.ng') and not domain.endswith('.edu.ng'):
                score += 0.25
                reasons.append("No secure connection (HTTP)")

            if '@' in text:
                score += 0.60
                reasons.append("URL redirection trick detected")

        phishing_keyword_count = 0
        for language, keywords in self.phishing_keywords.items():
            for keyword in keywords:
                if keyword in text_lower:
                    phishing_keyword_count += 1

        if phishing_keyword_count >= 3:
            score += 0.50
            reasons.append("Multiple phishing keywords detected")
        elif phishing_keyword_count >= 2:
            score += 0.30
            reasons.append("Phishing keywords detected")

        urgency_words = ['urgent', 'immediate', 'expires', 'act now', 'limited time']
        has_urgency = sum(1 for word in urgency_words if word in text_lower) >= 2
        has_link = 'http' in text_lower or 'click here' in text_lower

        if has_urgency and has_link:
            score += 0.45
            reasons.append("Urgency tactics + suspicious link")

        if re.search(r'(win|won|prize|lottery|free money|\$\d{4,}|₦\d{6,})', text_lower):
            score += 0.40
            reasons.append("Prize/money scam indicators")

        score = max(0.0, min(1.0, score))

        if not reasons:
            reasons = ['No suspicious patterns detected']

        return {'score': score, 'reasons': reasons}

    def _analyze_ml(self, text):
        try:
            from advanced_features import extract_features
            features_dict = extract_features(text)
            features_df = pd.DataFrame([features_dict])
            features_scaled = self.scaler.transform(features_df)
            text_vec = self.vectorizer.transform([text])
            combined = hstack([text_vec, features_scaled])
            proba = self.model.predict_proba(combined)[0]
            return float(proba[1]) if len(proba) > 1 else float(proba[0])
        except:
            return None

    def _combine_scores(self, heuristic_result, ml_score, text, nlp_result=None):
        h_score = heuristic_result['score']

        if ml_score is not None:
            final_score = (0.7 * ml_score) + (0.3 * h_score)
            method = "Hybrid AI (ML + Enhanced Heuristics"
            if nlp_result:
                method += " + NLP AI)"
            else:
                method += ")"
        else:
            final_score = h_score
            method = "Enhanced Heuristics"
            if nlp_result:
                method += " + NLP AI"

        if final_score >= 0.65:
            prediction = "phishing"
        elif final_score >= 0.45:
            prediction = "suspicious"
        else:
            prediction = "safe"

        explanation = "; ".join(heuristic_result['reasons'][:3])

        response = {
            'prediction': prediction,
            'confidence': round(float(final_score), 3),
            'explanation': explanation,
            'heuristic_score': round(float(h_score), 3),
            'ml_score': round(float(ml_score), 3) if ml_score is not None else None,
            'method': method,
            'content_analysis_performed': False
        }

        if nlp_result:
            response['nlp_analysis'] = {
                'performed': True,
                'score': nlp_result['nlp_score'],
                'method': nlp_result.get('ai_method', 'NLP-AI'),
                'confidence': nlp_result.get('confidence', None),
                'indicators': nlp_result.get('indicators', [])
            }

        return response

    def _safe_result(self, reason, confidence=0.05):
        return {
            'prediction': 'safe',
            'confidence': confidence,
            'explanation': reason,
            'heuristic_score': 0.0,
            'ml_score': None,
            'method': 'Whitelist/Context Analysis',
            'content_analysis_performed': False
        }

    def _sanitize_input(self, text):
        if not text or not isinstance(text, str):
            return ""
        text = re.sub(r'[\x00-\x1f\x7f-\x9f]', '', text)
        return ' '.join(text.split()).strip()[:2000]

    def _looks_like_domain(self, text):
        text = text.strip().lower()
        if ' ' in text or len(text) > 200:
            return False
        return bool(re.match(r'^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+', text))

    def _is_url(self, text):
        return bool(re.match(r'^https?://', text.lower()))

    def _is_ip_address(self, domain):
        return bool(re.match(r'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$', domain))


detector = ProductionPhishingDetector()


def detect_phishing(text, use_content_analysis=False, safe_analyzer=None):
    return detector.detect_phishing(text, use_content_analysis, safe_analyzer)