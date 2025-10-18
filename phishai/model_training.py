"""
PhishAI Advanced Model Training Script 

"""

import pandas as pd
import joblib
from pathlib import Path
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score, confusion_matrix
from scipy.sparse import hstack
import numpy as np

# Import our advanced feature extractor
from advanced_features import extract_features


def train_advanced_model(csv_path="phishing_data_FIXED.csv", output_dir="./models"):
    """
    Train advanced phishing detection model with forensic features
    """
    print("\n" + "="*70)
    print(" PhishAI ADVANCED Model Training - V2")
    print("="*70 + "\n")

    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    # Load CSV
    print(f" Loading data from {csv_path}...")
    df = pd.read_csv(csv_path)
    
    if "text" not in df.columns or "label" not in df.columns:
        raise ValueError("CSV must contain 'text' and 'label' columns")

    print(f" Loaded {len(df):,} samples")
    print(f"   - Phishing: {sum(df['label'] == 1):,}")
    print(f"   - Safe: {sum(df['label'] == 0):,}\n")

    # Extract advanced features
    print(" Extracting ADVANCED forensic features (30+ features)...")
    feature_list = []
    
    for idx, text in enumerate(df["text"]):
        if idx % 200 == 0 and idx > 0:
            print(f"    Processing... {idx}/{len(df)}")
        features = extract_features(text)
        feature_list.append(features)
    
    feature_df = pd.DataFrame(feature_list)
    print(f" Extracted {feature_df.shape[1]} forensic features")
    print(f"   Feature names: {', '.join(feature_df.columns[:10])}...\n")

    # Split data
    print(" Splitting data (80% train, 20% test)...")
    X_train_text, X_test_text, y_train, y_test, X_train_feats, X_test_feats = train_test_split(
        df["text"], df["label"], feature_df, 
        test_size=0.2, 
        random_state=42, 
        stratify=df["label"]
    )

    # TF-IDF Vectorization
    print(" TF-IDF vectorization (ngrams=1-3, max_features=5000)...")
    vectorizer = TfidfVectorizer(
        max_features=5000,
        ngram_range=(1, 3),  # Improved: tri-grams
        min_df=2,            # Ignore rare terms
        max_df=0.95          # Ignore too common terms
    )
    X_train_vec = vectorizer.fit_transform(X_train_text)
    X_test_vec = vectorizer.transform(X_test_text)
    print(f"   TF-IDF shape: {X_train_vec.shape}")

    # Scale numerical features
    print("  Scaling numerical features...")
    scaler = StandardScaler()
    X_train_num = scaler.fit_transform(X_train_feats)
    X_test_num = scaler.transform(X_test_feats)

    # Combine TF-IDF + Numerical features
    print(" Combining text + forensic features...")
    X_train_combined = hstack([X_train_vec, X_train_num])
    X_test_combined = hstack([X_test_vec, X_test_num])
    print(f"   Combined feature shape: {X_train_combined.shape}\n")

    # Try to import XGBoost, fallback to RandomForest
    try:
        import xgboost as xgb
        print(" Training XGBoost model (advanced)...")
        
        model = xgb.XGBClassifier(
            n_estimators=500,
            max_depth=8,
            learning_rate=0.05,
            subsample=0.8,
            colsample_bytree=0.8,
            random_state=42,
            scale_pos_weight=1,  # Balance classes
            use_label_encoder=False,
            eval_metric='logloss'
        )
        
    except ImportError:
        print("  XGBoost not installed, using RandomForest (still good)...")
        print("    To install XGBoost: pip install xgboost\n")
        
        model = RandomForestClassifier(
            n_estimators=500,      # Increased from 300
            max_depth=20,          # Deeper trees
            min_samples_split=5,
            min_samples_leaf=2,
            random_state=42,
            class_weight='balanced',  # Handle imbalanced data
            n_jobs=-1              # Use all CPU cores
        )

    # Train model
    model.fit(X_train_combined, y_train)
    
    # Cross-validation score
    print("\n Running 5-fold cross-validation...")
    cv_scores = cross_val_score(model, X_train_combined, y_train, cv=5, scoring='accuracy')
    print(f"   CV Accuracy: {cv_scores.mean():.1%} (+/- {cv_scores.std() * 2:.1%})")

    # Evaluate on test set
    print("\n Evaluating on test set...")
    y_pred = model.predict(X_test_combined)
    y_pred_proba = model.predict_proba(X_test_combined)[:, 1]
    
    accuracy = accuracy_score(y_test, y_pred)
    print(f"\n Test Accuracy: {accuracy:.1%}")
    
    # Detailed metrics
    print("\n Classification Report:")
    print(classification_report(
        y_test, y_pred, 
        target_names=["Safe", "Phishing"],
        digits=3
    ))
    
    # Confusion Matrix
    cm = confusion_matrix(y_test, y_pred)
    print(" Confusion Matrix:")
    print(f"   True Negatives:  {cm[0][0]:>4} | False Positives: {cm[0][1]:>4}")
    print(f"   False Negatives: {cm[1][0]:>4} | True Positives:  {cm[1][1]:>4}\n")
    
    # Feature importance (if available)
    if hasattr(model, 'feature_importances_'):
        print("🔝 Top 10 Most Important Features:")
        
        # Get feature names
        tfidf_features = vectorizer.get_feature_names_out()
        forensic_features = X_train_feats.columns
        all_feature_names = list(tfidf_features) + list(forensic_features)
        
        # Get importances
        importances = model.feature_importances_
        indices = np.argsort(importances)[-10:][::-1]
        
        for i, idx in enumerate(indices, 1):
            if idx < len(all_feature_names):
                feat_name = all_feature_names[idx]
                print(f"   {i:>2}. {feat_name[:40]:<40} {importances[idx]:.4f}")
        print()

    # Save models
    print(" Saving models...")
    joblib.dump(model, output_path / "phishing_model.pkl")
    joblib.dump(vectorizer, output_path / "vectorizer.pkl")
    joblib.dump(scaler, output_path / "scaler.pkl")
    print(f"   ✅ Model saved to: {output_path}\n")

    print("="*70)
    print("✨ ADVANCED TRAINING COMPLETE!")
    print("="*70)
    print(f" Final Accuracy: {accuracy:.1%}")
    print(f" Total Features: {X_train_combined.shape[1]:,}")
    print(f" Model Type: {type(model).__name__}")
    print("="*70 + "\n")
    
    return accuracy


if __name__ == "__main__":
    train_advanced_model()