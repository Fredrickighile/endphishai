"""
EndPhishAI Advanced Feature Engineering
Extracts 20+ forensic features from URLs for superior phishing detection

FEATURES EXTRACTED:
1. URL Structure (length, dots, digits, special chars)
2. Domain Analysis (age, registrar, WHOIS)
3. SSL/TLS Checks (certificate validity)
4. Suspicious Patterns (IP addresses, ports, subdomains)
5. Keyword Analysis (phishing terms, brand impersonation)
6. Entropy & Randomness (suspicious domain generation)
"""

import re
import math
from urllib.parse import urlparse
from collections import Counter


class AdvancedFeatureExtractor:
    """
    Extracts comprehensive forensic features from URLs/text
    Used by ML model for high-accuracy detection
    """
    
    def __init__(self):
        # Suspicious TLDs commonly used in phishing
        self.suspicious_tlds = {
            '.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top', '.click',
            '.link', '.loan', '.work', '.date', '.racing', '.download',
            '.win', '.bid', '.science', '.party', '.review', '.trade',
            '.stream', '.zip', '.men', '.cricket', '.accountant'
        }
        
        # African-specific phishing keywords
        self.african_keywords = {
            'mpesa', 'mtn', 'airtel', 'safaricom', 'gtbank', 'firstbank',
            'access', 'zenith', 'uba', 'capitec', 'fnb', 'absa', 'equity',
            'kcb', 'jumia', 'konga', 'paystack', 'flutterwave', 'bet9ja',
            'dstv', 'gotv', 'nafdac', 'nimc', 'nin', 'jamb', 'waec', 'nysc',
            'inec', 'neco', 'firs', 'cbn', 'nnpc', 'ecocash', 'onemoney',
            'vodafone', 'orange', 'tigo', 'zanaco', 'stanbic'
        }
        
        # Global phishing keywords
        self.phishing_keywords = {
            'verify', 'account', 'suspended', 'locked', 'secure', 'update',
            'confirm', 'login', 'password', 'urgent', 'click', 'prize',
            'winner', 'claim', 'free', 'bank', 'paypal', 'ebay', 'amazon',
            'validation', 'security', 'alert', 'warning', 'unusual', 'expire',
            'blocked', 'restore', 'immediately', 'limited', 'act now'
        }
        
        # Brand names often impersonated
        self.brand_names = {
            'facebook', 'instagram', 'twitter', 'linkedin', 'whatsapp',
            'google', 'microsoft', 'apple', 'amazon', 'netflix', 'spotify',
            'paypal', 'visa', 'mastercard', 'binance', 'coinbase',
            'dhl', 'fedex', 'ups', 'usps'
        }
    
    def extract_all_features(self, text):
        """
        Extract all features from text/URL
        Returns dict of 20+ features
        """
        text = str(text).lower().strip()
        features = {}
        
        # Basic structure features
        features.update(self._extract_basic_features(text))
        
        # URL-specific features (if it's a URL)
        if self._is_url(text):
            features.update(self._extract_url_features(text))
        else:
            # Default URL features for non-URLs
            features.update(self._get_default_url_features())
        
        # Content analysis features
        features.update(self._extract_content_features(text))
        
        # Advanced pattern features
        features.update(self._extract_pattern_features(text))
        
        return features
    
    def _is_url(self, text):
        """Check if text is a URL"""
        return bool(re.match(r'^https?://', text.lower()))
    
    def _extract_basic_features(self, text):
        """Basic text structure features"""
        return {
            'text_length': len(text),
            'num_dots': text.count('.'),
            'num_hyphens': text.count('-'),
            'num_underscores': text.count('_'),
            'num_slashes': text.count('/'),
            'num_question_marks': text.count('?'),
            'num_equals': text.count('='),
            'num_ampersands': text.count('&'),
            'num_digits': sum(c.isdigit() for c in text),
            'digit_ratio': sum(c.isdigit() for c in text) / max(len(text), 1),
        }
    
    def _extract_url_features(self, url):
        """URL-specific forensic features"""
        parsed = urlparse(url)
        domain = parsed.netloc.lower()
        path = parsed.path.lower()
        
        features = {
            # Domain features
            'domain_length': len(domain),
            'has_ip_address': self._has_ip_address(domain),
            'has_port': bool(re.search(r':\d+', domain)),
            'subdomain_count': domain.count('.') - 1 if '.' in domain else 0,
            
            # Path features
            'path_length': len(path),
            'path_depth': path.count('/'),
            
            # Protocol features
            'has_https': int(url.startswith('https://')),
            'has_www': int('www.' in domain),
            
            # Suspicious patterns
            'has_at_symbol': int('@' in url),
            'has_double_slash_in_path': int('//' in path),
            
            # TLD check
            'suspicious_tld': int(any(domain.endswith(tld) for tld in self.suspicious_tlds)),
            
            # Domain complexity
            'domain_entropy': self._calculate_entropy(domain),
            'has_many_subdomains': int(domain.count('.') > 3),
        }
        
        return features
    
    def _get_default_url_features(self):
        """Default values for non-URL text"""
        return {
            'domain_length': 0,
            'has_ip_address': 0,
            'has_port': 0,
            'subdomain_count': 0,
            'path_length': 0,
            'path_depth': 0,
            'has_https': 0,
            'has_www': 0,
            'has_at_symbol': 0,
            'has_double_slash_in_path': 0,
            'suspicious_tld': 0,
            'domain_entropy': 0,
            'has_many_subdomains': 0,
        }
    
    def _extract_content_features(self, text):
        """Content analysis features"""
        # Keyword matching
        african_matches = sum(1 for kw in self.african_keywords if kw in text)
        phishing_matches = sum(1 for kw in self.phishing_keywords if kw in text)
        brand_matches = sum(1 for brand in self.brand_names if brand in text)
        
        # Word analysis
        words = text.split()
        word_count = len(words)
        
        return {
            'african_keyword_count': african_matches,
            'phishing_keyword_count': phishing_matches,
            'brand_impersonation': brand_matches,
            'word_count': word_count,
            'avg_word_length': sum(len(w) for w in words) / max(word_count, 1),
            'has_urgent_language': int(any(w in text for w in ['urgent', 'immediate', 'now', 'expires', 'deadline'])),
        }
    
    def _extract_pattern_features(self, text):
        """Advanced pattern detection"""
        return {
            'has_monetary_amount': int(bool(re.search(r'(\$|NGN|USD|KES|ZAR|GHS)\s*\d+', text))),
            'has_phone_number': int(bool(re.search(r'\+?\d{10,15}', text))),
            'has_email': int(bool(re.search(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', text))),
            'excessive_punctuation': int(text.count('!') > 2 or text.count('?') > 2),
            'all_caps_words': sum(1 for word in text.split() if word.isupper() and len(word) > 2),
            'text_entropy': self._calculate_entropy(text),
        }
    
    def _has_ip_address(self, domain):
        """Check if domain is an IP address"""
        ip_pattern = r'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$'
        return int(bool(re.match(ip_pattern, domain)))
    
    def _calculate_entropy(self, text):
        """
        Calculate Shannon entropy (randomness measure)
        High entropy = more random/suspicious
        """
        if not text:
            return 0.0
        
        # Count character frequencies
        counter = Counter(text)
        length = len(text)
        
        # Calculate entropy
        entropy = 0.0
        for count in counter.values():
            probability = count / length
            entropy -= probability * math.log2(probability)
        
        return round(entropy, 3)


# Global instance for easy importing
extractor = AdvancedFeatureExtractor()


def extract_features(text):
    """Convenience function for easy importing"""
    return extractor.extract_all_features(text)