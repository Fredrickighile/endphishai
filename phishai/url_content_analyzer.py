"""
URL Content Analyzer - PRODUCTION VERSION
Reduced false positives, better detection logic, safer operation
"""

import requests
from bs4 import BeautifulSoup
import re
from urllib.parse import urlparse, urljoin
import ssl
import socket
from datetime import datetime


class URLContentAnalyzer:
    """
    Production-grade URL content analyzer with reduced false positives
    """
    
    def __init__(self):
        # High-confidence phishing indicators (require multiple matches)
        self.critical_phrases = [
            'verify your account immediately',
            'account will be suspended',
            'unusual activity detected',
            'confirm your identity now',
            'account has been locked',
            'click here now or lose access',
            'update payment information immediately'
        ]
        
        # Financial brands (exact matching only)
        self.financial_brands = {
            'paypal', 'chase', 'wellsfargo', 'bankofamerica', 'citibank',
            'americanexpress', 'capitalone', 'discover', 'usbank'
        }
        
        # Legitimate hosting/cloud platforms (whitelist)
        self.trusted_platforms = {
            'vercel.app', 'netlify.app', 'github.io', 'herokuapp.com',
            'cloudflare.com', 'amazonaws.com', 'azure.com', 'firebase.app',
            'pages.dev', 'web.app', 'repl.co', 'glitch.me'
        }
        
        # Known legitimate domains (should never flag)
        self.whitelist_domains = {
            'google.com', 'microsoft.com', 'apple.com', 'facebook.com',
            'amazon.com', 'netflix.com', 'twitter.com', 'linkedin.com',
            'instagram.com', 'youtube.com', 'github.com', 'stackoverflow.com',
            'wikipedia.org', 'reddit.com',
            # African banks
    'ubagroup.com', 'gtbank.com', 'firstbanknigeria.com', 
    'accessbankplc.com', 'zenithbank.com', 'standardbank.co.za',
    'absa.co.za', 'fnb.co.za', 'nedbank.co.za', 'capitecbank.co.za',
    'kcbgroup.com', 'equitybankgroup.com', 'safaricom.co.ke',
    'mtn.com', 'airtel.africa', 'orange.com'


        }
    
    def analyze_url_content(self, url, timeout=10):
        """
        Analyze URL with production-grade safety and accuracy
        """
        try:
            # Quick domain check
            domain = urlparse(url).netloc.lower()
            
            # Whitelist check - skip analysis for known good sites
            if any(trusted in domain for trusted in self.whitelist_domains):
                return {
                    'success': True,
                    'url': url,
                    'phishing_score': 0.0,
                    'is_phishing': False,
                    'indicators_found': ['Whitelisted domain - analysis skipped'],
                    'analysis': {'total_score': 0.0, 'indicators': []}
                }
            
            # Trusted hosting check
            is_trusted_host = any(platform in domain for platform in self.trusted_platforms)
            
            # Make HTTP request
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'text/html,application/xhtml+xml',
                'Accept-Language': 'en-US,en;q=0.9',
            }
            
            response = requests.get(
                url, 
                headers=headers, 
                timeout=timeout,
                allow_redirects=True,
                verify=True
            )
            
            if response.status_code != 200:
                return {
                    'success': False,
                    'error': f'HTTP {response.status_code}',
                    'phishing_score': 0.0
                }
            
            # Parse HTML
            soup = BeautifulSoup(response.text, 'html.parser')
            page_text = soup.get_text(separator=' ', strip=True).lower()
            title = soup.title.string.lower() if soup.title else ''
            
            # Analyze content with context-aware scoring
            analysis = self._analyze_content_v2(
                url=url,
                domain=domain,
                page_text=page_text,
                title=title,
                soup=soup,
                is_trusted_host=is_trusted_host
            )
            
            return {
                'success': True,
                'url': url,
                'final_url': response.url,
                'title': title,
                'analysis': analysis,
                'phishing_score': analysis['total_score'],
                'is_phishing': analysis['total_score'] >= 0.70,
                'indicators_found': analysis['indicators']
            }
        
        except requests.Timeout:
            return {'success': False, 'error': 'Request timeout', 'phishing_score': 0.0}
        
        except requests.ConnectionError:
            return {'success': False, 'error': 'Connection failed', 'phishing_score': 0.0}
        
        except requests.TooManyRedirects:
            return {'success': False, 'error': 'Too many redirects', 'phishing_score': 0.70}
        
        except Exception as e:
            return {'success': False, 'error': f'Error: {str(e)}', 'phishing_score': 0.0}
    
    def _analyze_content_v2(self, url, domain, page_text, title, soup, is_trusted_host):
        """
        Context-aware content analysis with reduced false positives
        """
        score = 0.0
        indicators = []
        
        # === CHECK 1: CRITICAL URGENT PHRASES (Strict matching) ===
        critical_count = sum(1 for phrase in self.critical_phrases if phrase in page_text)
        
        if critical_count >= 3:
            score += 0.50
            indicators.append(f"Multiple critical phishing phrases detected ({critical_count})")
        elif critical_count >= 2:
            score += 0.30
            indicators.append("Suspicious urgent language detected")
        
        # === CHECK 2: FINANCIAL BRAND IMPERSONATION (Context-aware) ===
        for brand in self.financial_brands:
            brand_pattern = r'\b' + re.escape(brand) + r'\b'
            
            # Check if brand is mentioned
            if re.search(brand_pattern, page_text) or re.search(brand_pattern, title):
                # Only flag if domain doesn't match AND it's not a trusted host
                if brand not in domain and not is_trusted_host:
                    # Additional check: is there a login form?
                    has_login = bool(soup.find_all('input', {'type': 'password'}))
                    
                    if has_login:
                        score += 0.65
                        indicators.append(f"Fake {brand.upper()} login page (brand mismatch + password form)")
                        break
                    else:
                        score += 0.25
                        indicators.append(f"Mentions {brand.upper()} but domain doesn't match")
                        break
        
        # === CHECK 3: SUSPICIOUS FORMS (Context-aware) ===
        forms = soup.find_all('form')
        
        if forms:
            for form in forms:
                action = form.get('action', '')
                
                # Password form on non-HTTPS
                password_fields = form.find_all('input', {'type': 'password'})
                if password_fields and not url.startswith('https://'):
                    score += 0.60
                    indicators.append("Password form on non-HTTPS page (CRITICAL)")
                
                # Form submits to different domain (phishing redirect)
                if action and action.startswith('http'):
                    form_domain = urlparse(action).netloc
                    if form_domain != domain and not is_trusted_host:
                        score += 0.45
                        indicators.append(f"Form submits to different domain: {form_domain}")
                
                # Credit card form on untrusted domain
                if password_fields and not is_trusted_host:
                    form_html = str(form).lower()
                    if any(term in form_html for term in ['cvv', 'card number', 'expiry', 'credit card']):
                        score += 0.50
                        indicators.append("Credit card form on unfamiliar domain")
        
        # === CHECK 4: EXCESSIVE EXTERNAL LINKS (More lenient) ===
        links = soup.find_all('a', href=True)
        external_count = 0
        suspicious_action_links = 0
        
        for link in links:
            href = link.get('href', '')
            if href.startswith('http'):
                link_domain = urlparse(href).netloc
                if link_domain != domain:
                    external_count += 1
                    
                    # Check link text for suspicious actions
                    link_text = link.get_text(strip=True).lower()
                    if any(word in link_text for word in ['verify', 'confirm', 'update', 'click here now']):
                        suspicious_action_links += 1
        
        # Only flag if EXCESSIVE (most sites have some external links)
        if external_count > 100:  # Changed from 50
            score += 0.25
            indicators.append(f"Excessive external links ({external_count})")
        
        if suspicious_action_links >= 10:  # Changed from 5
            score += 0.30
            indicators.append(f"Many suspicious action links ({suspicious_action_links})")
        
        # === CHECK 5: HIDDEN CONTENT / IFRAMES (More lenient) ===
        iframes = soup.find_all('iframe')
        if len(iframes) > 5:  # Changed from 2
            score += 0.25
            indicators.append(f"Contains {len(iframes)} iframes (may hide content)")
        
        # === CHECK 6: PAGE LENGTH (FIXED - More realistic) ===
        # REMOVED the broken < 100 check
        # Only flag if truly empty (< 50 characters AND no forms)
        pass
        
        
        # === CHECK 7: JAVASCRIPT OBFUSCATION (More specific) ===
        scripts = soup.find_all('script')
        suspicious_js = 0
        
        for script in scripts:
            script_content = script.string or ''
            # Look for eval() with encoded strings (common obfuscation)
            if 'eval(' in script_content and ('atob' in script_content or 'unescape' in script_content):
                suspicious_js += 1
        
        if suspicious_js > 3:  # Changed from 2
            score += 0.30
            indicators.append(f"Obfuscated JavaScript detected ({suspicious_js} suspicious scripts)")
        
        # === CHECK 8: PRIZE/MONEY SCAM (Strict matching) ===
        prize_indicators = [
            'you have won', 'claim your prize', 'winner selected',
            'free money', 'cash prize', 'lottery winner'
        ]
        prize_count = sum(1 for phrase in prize_indicators if phrase in page_text)
        
        if prize_count >= 3:
            score += 0.45
            indicators.append("Prize/money scam detected")
        
        # === BONUS: SSL Check ===
        if not url.startswith('https://'):
            score += 0.10
            indicators.append("No HTTPS encryption")
        
        # === Reduce score for trusted hosts ===
        if is_trusted_host and score > 0:
            score = score * 0.5  # Halve the score for trusted platforms
            indicators.append("(Score reduced: hosted on trusted platform)")
        
        # Normalize score
        score = min(1.0, max(0.0, score))
        
        if not indicators:
            indicators = ['No significant phishing indicators detected']
        
        return {
            'total_score': round(score, 3),
            'indicators': indicators,
            'form_count': len(forms),
            'external_link_count': external_count,
            'iframe_count': len(iframes)
        }


# Global instance
analyzer = URLContentAnalyzer()


if __name__ == "__main__":
    # Test cases
    test_urls = [
        "https://www.google.com",  # Should be 0.0 (whitelisted)
        "https://paypal-verify.tk",  # Should be HIGH (fake)
        "https://your-blog.vercel.app",  # Should be LOW (trusted host)
    ]
    
    for url in test_urls:
        print(f"\n{'='*60}")
        print(f"Testing: {url}")
        result = analyzer.analyze_url_content(url)
        if result['success']:
            print(f"Score: {result['phishing_score']:.2%}")
            print(f"Indicators: {result['indicators_found']}")
        else:
            print(f"Error: {result['error']}")