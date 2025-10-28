import csv
import random
from pathlib import Path

# Load existing dataset
path = Path("phishing_data.csv")
rows = []

with path.open("r", encoding="utf-8") as f:
    reader = csv.reader(f)
    next(reader)
    rows = list(reader)

# Create new examples
new_examples = []

brands = ["Facebook", "Instagram", "Netflix", "Microsoft", "Apple", "Amazon", "Google", "Binance", "Coinbase"]
malicious_tlds = ["xyz", "top", "click", "work", "ml", "ga", "site", "win", "shop", "buzz"]
benign_domains = ["facebook.com", "instagram.com", "netflix.com", "apple.com", "amazon.com", "google.com", "microsoft.com", "binance.com", "coinbase.com"]

for brand in brands:
    # 5 malicious samples per brand
    for _ in range(5):
        new_examples.append((f"http://{brand.lower()}-secure-login.{random.choice(malicious_tlds)}/verify", 1))
        new_examples.append((f"urgent {brand} login required verify now at http://{brand.lower()}-alert.{random.choice(malicious_tlds)}", 1))
    # 3 safe samples per brand
    for _ in range(3):
        new_examples.append((f"https://www.{brand.lower()}.com", 0))
        new_examples.append((f"Your {brand} account login was successful", 0))

# Merge datasets and remove duplicates
combined = rows + [(t, str(l)) for t, l in new_examples]
unique = list({t.lower(): (t, l) for t, l in combined}.values())

# Write back
with path.open("w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["text", "label"])
    writer.writerows(unique)

print(f" Added {len(new_examples)} new examples. Total now: {len(unique)} rows.")
