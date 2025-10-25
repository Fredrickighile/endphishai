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

# Import the NLP AI module for advanced text analysis
try:
    from nlp_ai_analyzer import analyze_text_with_nlp_ai
    NLP_AI_AVAILABLE = True
    print("NLP AI Module: Loaded successfully")
except ImportError:
    NLP_AI_AVAILABLE = False
    print("NLP AI Module: Not available - using standard detection only")


class ProductionPhishingDetector:
    """
    Multi-layer phishing detection system combining:
    - Machine Learning (Random Forest)
    - Advanced Heuristics
    - NLP AI for text analysis
    - Content Analysis (optional)
    """

    def __init__(self, model_dir="./models"):
        self.model_dir = Path(model_dir)
        self.model = None
        self.vectorizer = None
        self.scaler = None
        self.ml_available = False
        self._load_model()
        
        # Suspicious top-level domains commonly used in phishing
        self.suspicious_tlds = {
            '.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top', '.click',
            '.link', '.loan', '.work', '.date', '.racing', '.download',
            '.win', '.bid', '.science', '.party', '.review', '.trade',
            '.stream', '.zip', '.men', '.cricket', '.accountant', '.faith',
            '.webcam', '.gdn', '.mom'
        }
        
        # Trusted TLDs for government, education, and non-profit organizations
        self.trusted_tlds = {
            '.gov', '.gov.uk', '.gov.au', '.gov.ng', '.gov.za', '.gov.ke',
            '.mil', '.govt.nz',
            '.edu', '.ac.uk', '.ac.za', '.ac.ke', '.edu.ng', '.edu.au',
            '.org', '.int'
        }
        
        # Major brands frequently targeted by phishing attacks
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
        
        # Regex patterns that indicate legitimate communications
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
        
        # Multilingual phishing keywords (English and major African languages)
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
        
        # Common phrases in casual, non-threatening conversations
        self.casual_patterns = {
            'hi', 'hello', 'hey', 'how are you', 'good morning', 
            'good afternoon', 'good evening', 'see you', 'talk soon',
            'catch you later', 'meeting at', 'coffee', 'lunch', 'dinner',
            'running late', 'on my way', 'just checking', 'let me know',
            'sounds good', 'okay', 'sure', 'thanks', 'thank you'
        }
    
    def _load_model(self):
        """
        Load pre-trained machine learning models if available.
        Falls back to heuristic-only detection if models not found.
        """
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
        """
        Main detection method that coordinates all analysis layers.
        
        Args:
            input_text: The URL, email, or message to analyze
            use_content_analysis: Whether to perform deep webpage content analysis
            safe_analyzer: Optional safe analyzer object for content scanning
            
        Returns:
            Dictionary containing prediction, confidence score, and explanations
        """
        # Log detection request details for debugging
        print(f"\n{'='*70}")
        print(f"DETECTION REQUEST")
        print(f"{'='*70}")
        print(f"Input: {input_text[:100]}...")
        print(f"Content Analysis: {use_content_analysis}")
        print(f"Safe Analyzer: {safe_analyzer is not None}")
        print(f"Is URL: {self._is_url(input_text)}")
        print(f"NLP AI Available: {NLP_AI_AVAILABLE}")
        print(f"{'='*70}\n")
        
        # Clean and validate input
        input_text = self._sanitize_input(input_text)
        
        if not input_text:
            print("Empty input detected")
            return self._safe_result("Empty input", confidence=0.0)
        
        # Quick filter: detect casual conversations (very low risk)
        if self._is_casual_conversation(input_text):
            print("Detected as casual conversation")
            return self._safe_result("Normal conversation", confidence=0.05)
        
        # Auto-fix common URL format issues
        if self._looks_like_domain(input_text) and not input_text.startswith('http'):
            print(f"Auto-fixed URL format: {input_text}")
            input_text = 'http://' + input_text
        
        # Fast-track: trusted domains (government, education)
        if self._is_url(input_text):
            if self._is_trusted_tld(input_text):
                print("Trusted TLD detected (.gov/.edu)")
                return self._safe_result("Verified government/education domain", confidence=0.0)
        
        # Check for legitimate transaction patterns
        is_legitimate, legit_score, legit_reasons = self._check_legitimate_context(input_text)
        if is_legitimate:
            print(f"Legitimate transaction detected: {legit_reasons}")
            return self._safe_result("; ".join(legit_reasons), confidence=legit_score)
        
        # Optional: Deep content analysis for URLs
        if use_content_analysis and safe_analyzer and self._is_url(input_text):
            print(f"\n{'='*70}")
            print(f"RUNNING SAFE CONTENT ANALYSIS")
            print(f"{'='*70}\n")
            return self._detect_with_safe_content_analysis(input_text, safe_analyzer)
        else:
            if use_content_analysis:
                print("Content analysis requested but conditions not met:")
                if not safe_analyzer:
                    print("   - Safe analyzer not provided")
                if not self._is_url(input_text):
                    print("   - Input is not a URL")
        
        # Standard detection: Heuristics + ML + NLP AI
        print("Running standard detection (Heuristics + ML + NLP AI)...")
        heuristic_result = self._analyze_heuristics(input_text)
        ml_score = self._analyze_ml(input_text) if self.ml_available else None
        
        # NLP AI Analysis for text-based threats (emails, SMS, messages)
        nlp_result = None
        if NLP_AI_AVAILABLE and not self._is_url(input_text):
            print("Running NLP AI Analysis...")
            nlp_result = analyze_text_with_nlp_ai(input_text)
            
            # Boost detection score if NLP AI finds phishing patterns
            if nlp_result['nlp_score'] > 0.5:
                boost = nlp_result['nlp_score'] * 0.3
                heuristic_result['score'] = min(heuristic_result['score'] + boost, 1.0)
                # Add top NLP indicators to the reason list
                heuristic_result['reasons'].extend(nlp_result['indicators'][:3])
                print(f"   NLP AI detected phishing patterns (score: {nlp_result['nlp_score']:.2%})")
            else:
                print(f"   NLP AI suggests legitimate content (score: {nlp_result['nlp_score']:.2%})")
        
        return self._combine_scores(heuristic_result, ml_score, input_text, nlp_result)
    
    def _detect_with_safe_content_analysis(self, url, safe_analyzer):
        """
        Enhanced detection using safe webpage content scanning.
        Combines URL structure analysis with actual page content inspection.
        """
        print(f"Starting safe webpage content analysis...")
        print(f"Target URL: {url}")
        
        try:
            # Step 1: Run standard URL-based detection
            print("Step 1: Running standard detection...")
            standard_result = self.detect_phishing(url, use_content_analysis=False)
            print(f"   Standard Score: {standard_result['confidence']:.2%}")
            
            # Step 2: Scan actual webpage content
            print("Step 2: Scanning webpage content (safely)...")
            content_result = safe_analyzer.analyze_safely(url)
            
            if content_result.get('success'):
                print(f"Content scan successful")
                print(f"   Content Score: {content_result.get('phishing_score', 0):.2%}")
                
                indicators = content_result.get('indicators_found', [])
                print(f"   Indicators Found: {len(indicators)}")
                
                # Handle whitelisted domains
                if content_result.get('whitelisted'):
                    print("Domain is whitelisted - returning safe result")
                    return {
                        'prediction': 'safe',
                        'confidence': 0.0,
                        'explanation': 'Whitelisted domain - analysis skipped for safety',
                        'heuristic_score': 0.0,
                        'ml_score': None,
                        'method': 'Whitelist Check',
                        'content_analysis_performed': True,
                        'content_indicators': indicators
                    }
                
                # Combine scores with dynamic weighting
                standard_score = standard_result['confidence']
                content_score = content_result.get('phishing_score', 0)
                
                # Weight content analysis higher when it's very confident
                if content_score >= 0.70:
                    final_score = (0.3 * standard_score) + (0.7 * content_score)
                    print(f"   Using high-confidence weighting (70% content)")
                elif content_score >= 0.40:
                    final_score = (0.5 * standard_score) + (0.5 * content_score)
                    print(f"   Using balanced weighting (50/50)")
                else:
                    final_score = (0.7 * standard_score) + (0.3 * content_score)
                    print(f"   Using standard-focused weighting (70% standard)")
                
                print(f"Final Combined Score: {final_score:.2%}")
                
                # Determine final prediction based on combined score
                if final_score >= 0.70:
                    prediction = 'phishing'
                    print(f"VERDICT: PHISHING")
                elif final_score >= 0.50:
                    prediction = 'suspicious'
                    print(f"VERDICT: SUSPICIOUS")
                else:
                    prediction = 'safe'
                    print(f"VERDICT: SAFE")
                
                # Combine explanations from both analyses
                content_summary = ', '.join(indicators[:2]) if indicators else 'No content indicators'
                combined_explanation = f"{standard_result['explanation']}; Content Analysis: {content_summary}"
                
                print(f"{'='*70}\n")
                
                return {
                    'prediction': prediction,
                    'confidence': round(final_score, 3),
                    'explanation': combined_explanation,
                    'heuristic_score': standard_result.get('heuristic_score', 0.0),
                    'ml_score': standard_result.get('ml_score'),
                    'method': 'Enhanced AI + Safe Content Analysis',
                    'content_analysis_performed': True,
                    'content_indicators': indicators
                }
            else:
                # Content analysis failed - return standard result with error info
                error_msg = content_result.get('error', 'Unknown error')
                print(f"Content scan failed: {error_msg}")
                print(f"{'='*70}\n")
                standard_result['content_analysis_performed'] = False
                standard_result['content_analysis_error'] = error_msg
                return standard_result
                
        except Exception as e:
            # Handle any unexpected errors during content analysis
            print(f"Content analysis exception: {e}")
            print(f"{'='*70}\n")
            standard_result = self.detect_phishing(url, use_content_analysis=False)
            standard_result['content_analysis_performed'] = False
            standard_result['content_analysis_error'] = str(e)
            return standard_result
    
    def _is_trusted_tld(self, url):
        """
        Check if URL uses a trusted top-level domain.
        Government and education domains are generally safe.
        """
        try:
            parsed = urlparse(url.lower())
            domain = parsed.netloc
            
            for tld in self.trusted_tlds:
                if domain.endswith(tld):
                    return True
            return False
        except:
            return False
    
    def _is_casual_conversation(self, text):
        """
        Detect normal casual messages that are clearly not phishing attempts.
        Uses pattern matching to identify friendly, informal communication.
        """
        text_lower = text.lower()
        
        # Short messages with multiple casual phrases are likely safe
        if len(text) < 200:
            casual_count = sum(1 for pattern in self.casual_patterns if pattern in text_lower)
            if casual_count >= 2:
                return True
        
        # Check for combination of safe indicators
        has_no_url = 'http' not in text_lower and 'www.' not in text_lower
        has_casual = any(pattern in text_lower for pattern in self.casual_patterns)
        has_no_urgency = not any(word in text_lower for word in ['urgent', 'immediate', 'verify', 'suspended'])
        
        if has_no_url and has_casual and has_no_urgency:
            return True
        
        return False
    
    def _check_legitimate_context(self, text):
        """
        Check if message contains indicators of legitimate business communication.
        Looks for transaction confirmations, reference numbers, etc.
        """
        text_lower = text.lower()
        legitimacy_score = 0.0
        reasons = []
        
        # Check against legitimate pattern library
        for pattern in self.legitimate_patterns:
            if re.search(pattern, text_lower):
                legitimacy_score += 0.25
                reasons.append("Legitimate pattern detected")
                if legitimacy_score >= 0.50:
                    break
        
        # Look for transaction-specific elements
        has_ref = bool(re.search(r'(reference|receipt|transaction|order).*[A-Z0-9]{6,}', text_lower))
        has_amount = bool(re.search(r'(amount|total|paid).*[$€£¥₦₹]\s*[\d,]+', text_lower))
        
        if has_ref and has_amount:
            legitimacy_score += 0.40
            reasons.append("Valid transaction structure")
        
        is_legitimate = legitimacy_score >= 0.50
        return is_legitimate, legitimacy_score, reasons
    
    def _fuzzy_brand_match(self, domain):
        """
        Detect typosquatting attempts using fuzzy string matching.
        Identifies domains that are very similar to legitimate brands.
        """
        domain_clean = re.sub(r'[^a-z0-9]', '', domain.lower())
        
        for brand in self.major_brands:
            if brand in domain_clean:
                # Exact match to legitimate domain
                if domain.endswith(f"{brand}.com") or domain == f"{brand}.com":
                    return False, brand, 1.0
                else:
                    # Brand name in domain but not exact match - suspicious
                    return True, brand, 0.9
            
            # Check for high similarity (potential typosquatting)
            similarity = SequenceMatcher(None, brand, domain_clean).ratio()
            if similarity > 0.85 and similarity < 1.0:
                return True, brand, similarity
        
        return False, None, 0.0
    
    def _analyze_heuristics(self, text):
        """
        Advanced heuristic analysis using pattern recognition.
        Examines URL structure, keywords, and suspicious indicators.
        """
        score = 0.0
        reasons = []
        text_lower = text.lower()
        is_url = self._is_url(text)
        
        if is_url:
            parsed = urlparse(text)
            domain = parsed.netloc.lower()
            
            # IP addresses instead of domains are highly suspicious
            if self._is_ip_address(domain):
                score += 0.70
                reasons.append("Uses IP address (common in phishing)")
            
            # Check for suspicious top-level domains
            for tld in self.suspicious_tlds:
                if domain.endswith(tld):
                    score += 0.55
                    reasons.append(f"Suspicious domain extension ({tld})")
                    break
            
            # Check for brand impersonation attempts
            is_typosquat, brand, similarity = self._fuzzy_brand_match(domain)
            if is_typosquat:
                score += 0.65
                reasons.append(f"Potential {brand.upper()} impersonation")
            
            # Excessive subdomains are suspicious
            subdomain_count = domain.count('.') - 1
            if subdomain_count > 3:
                score += 0.40
                reasons.append(f"Suspicious subdomain structure")
            
            # Non-standard ports can indicate proxy/redirect
            if re.search(r':\d+', domain):
                score += 0.35
                reasons.append("Non-standard port number")
            
            # Lack of HTTPS is a red flag
            if not text.startswith('https://'):
                score += 0.25
                reasons.append("No secure connection (HTTP)")
            
            # @ symbol in URL is a redirect trick
            if '@' in text:
                score += 0.60
                reasons.append("URL redirection trick detected")
        
        # Analyze phishing keywords across multiple languages
        phishing_keyword_count = 0
        for language, keywords in self.phishing_keywords.items():
            for keyword in keywords:
                if keyword in text_lower:
                    phishing_keyword_count += 1
        
        if phishing_keyword_count >= 3:
            score += 0.50
            reasons.append(f"Multiple phishing keywords")
        elif phishing_keyword_count >= 2:
            score += 0.30
            reasons.append(f"Phishing keywords detected")
        
        # Check for urgency tactics combined with action requests
        urgency_words = ['urgent', 'immediate', 'expires', 'act now', 'limited time']
        has_urgency = sum(1 for word in urgency_words if word in text_lower) >= 2
        has_link = 'http' in text_lower or 'click here' in text_lower
        
        if has_urgency and has_link:
            score += 0.45
            reasons.append("Urgency tactics + suspicious link")
        
        # Prize/lottery scam indicators
        if re.search(r'(win|won|prize|lottery|free money|\$\d{4,}|₦\d{6,})', text_lower):
            score += 0.40
            reasons.append("Prize/money scam indicators")
        
        # Normalize score to 0-1 range
        score = max(0.0, min(1.0, score))
        
        if not reasons:
            reasons = ['No suspicious patterns detected']
        
        return {'score': score, 'reasons': reasons}
    
    def _analyze_ml(self, text):
        """
        Machine learning prediction using trained Random Forest model.
        Combines TF-IDF text features with extracted numerical features.
        """
        try:
            from advanced_features import extract_features
            
            # Extract 30+ numerical features
            features_dict = extract_features(text)
            features_df = pd.DataFrame([features_dict])
            features_scaled = self.scaler.transform(features_df)
            
            # Vectorize text using TF-IDF
            text_vec = self.vectorizer.transform([text])
            
            # Combine features and predict
            combined = hstack([text_vec, features_scaled])
            proba = self.model.predict_proba(combined)[0]
            return float(proba[1]) if len(proba) > 1 else float(proba[0])
        except:
            return None
    
    def _combine_scores(self, heuristic_result, ml_score, text, nlp_result=None):
        """
        Combine scores from multiple detection layers into final prediction.
        Uses weighted averaging with strict thresholds.
        """
        h_score = heuristic_result['score']
        
        # Determine method and calculate weighted final score
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
        
        # Apply strict thresholds for classification
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
        
        # Add NLP AI results if analysis was performed
        if nlp_result:
            response['nlp_analysis'] = {
                'performed': True,
                'score': nlp_result['nlp_score'],
                'method': nlp_result['ai_method'],
                'confidence': nlp_result['confidence'],
                'indicators': nlp_result['indicators']
            }
        
        return response
    
    def _safe_result(self, reason, confidence=0.05):
        """Create a standardized safe result response"""
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
        """Remove potentially harmful characters and normalize input"""
        if not text or not isinstance(text, str):
            return ""
        # Remove control characters
        text = re.sub(r'[\x00-\x1f\x7f-\x9f]', '', text)
        # Normalize whitespace and limit length
        return ' '.join(text.split()).strip()[:2000]
    
    def _looks_like_domain(self, text):
        """Check if text appears to be a domain name"""
        text = text.strip().lower()
        if ' ' in text or len(text) > 200:
            return False
        return bool(re.match(r'^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+', text))
    
    def _is_url(self, text):
        """Check if text is a valid URL"""
        return bool(re.match(r'^https?://', text.lower()))
    
    def _is_ip_address(self, domain):
        """Check if domain is an IP address"""
        return bool(re.match(r'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$', domain))


# Initialize global detector instance
detector = ProductionPhishingDetector()


def detect_phishing(text, use_content_analysis=False, safe_analyzer=None):
    """
    Convenience function for external use.
    Primary interface for phishing detection.
    """
    return detector.detect_phishing(text, use_content_analysis, safe_analyzer)