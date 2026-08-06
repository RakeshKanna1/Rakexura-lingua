import json
import math
import os
import random
from collections import defaultdict

# ==============================================================================
# RAKEXURA LINGUA - MASSIVE DATASET GENERATOR & PYTHON ML MODEL TRAINER
# Trains on 10,000+ Dataset Samples per Language (Tanglish, Hinglish, Tenglish, English)
# ==============================================================================

def generate_10k_datasets():
    print("Generating 10,000+ dataset samples per language...")
    dataset = []

    # 1. TANGLISH DATASET GENERATOR (10,000+ Samples)
    tang_greetings = ["epdi irukinga", "epdi irukenga", "vanakkam bro", "dei inga vaada", "vaadi inga", "sollunga bro", "enna bro", "semma bro", "romba thanks bro", "nalla iruka bro"]
    tang_subjects = ["game", "app", "order", "otp", "code", "payment", "price", "account", "delivery", "details", "stock", "refund"]
    tang_verbs = ["download aachu aana open aagala", "innum varala bro", "venum bro", "accept panna matengudhu", "kammi panna mudiyuma", "confirm pannunga", "stock iruka", "mistake ah logout aayidichi"]
    tang_fillers = ["bro", "da", "machan", "dei", "pa", "nga", "machi", "boss"]

    tanglish_samples = set()
    while len(tanglish_samples) < 10000:
        g = random.choice(tang_greetings)
        s = random.choice(tang_subjects)
        v = random.choice(tang_verbs)
        f = random.choice(tang_fillers)
        num = random.randint(100, 9999)

        phrase_type = random.randint(1, 5)
        if phrase_type == 1:
            phrase = f"{g} {f}"
        elif phrase_type == 2:
            phrase = f"{s} {v} {f}"
        elif phrase_type == 3:
            phrase = f"{g} {s} {v}"
        elif phrase_type == 4:
            phrase = f"{f} en order {num} {v}"
        else:
            phrase = f"{s} {num} {v} {f}"

        tanglish_samples.add(phrase)

    for sample in tanglish_samples:
        dataset.append((sample, "TANGLISH"))

    # 2. HINGLISH DATASET GENERATOR (10,000+ Samples)
    hing_greetings = ["kaise ho aap bhai", "kya haal hai bhai", "namaste bhai", "bhai idhar aao", "batao bhai", "kya baat hai bhai", "mast service hai bhai", "bahut bahut thanks bhai", "haan bhai theek hai"]
    hing_subjects = ["game", "app", "order", "otp", "code", "payment", "price", "account", "delivery", "details", "stock", "refund"]
    hing_verbs = ["download ho gaya lekin open nahi ho raha", "abhi tak nahi mila", "chahiye galti se logout ho gaya", "accept nahi kar raha hai", "thoda kam ho sakta hai kya", "confirm kar do", "available hai kya", "kab tak delivery hoga"]
    hing_fillers = ["bhai", "bhaiya", "bro", "sir", "boss", "dost"]

    hinglish_samples = set()
    while len(hinglish_samples) < 10000:
        g = random.choice(hing_greetings)
        s = random.choice(hing_subjects)
        v = random.choice(hing_verbs)
        f = random.choice(hing_fillers)
        num = random.randint(100, 9999)

        phrase_type = random.randint(1, 5)
        if phrase_type == 1:
            phrase = f"{g} {f}"
        elif phrase_type == 2:
            phrase = f"{s} {v} {f}"
        elif phrase_type == 3:
            phrase = f"{g} {s} {v}"
        elif phrase_type == 4:
            phrase = f"{f} mera order {num} {v}"
        else:
            phrase = f"{s} {num} {v} {f}"

        hinglish_samples.add(phrase)

    for sample in hinglish_samples:
        dataset.append((sample, "HINGLISH"))

    # 3. TENGLISH DATASET GENERATOR (10,000+ Samples)
    teng_greetings = ["ela unnavu bro", "hi bro", "cheppandi bro", "chala thanks bro", "bagunara bro"]
    teng_subjects = ["game", "app", "order", "otp", "code", "payment", "price", "account", "delivery", "details"]
    teng_verbs = ["download ayindi kani open kavatledu", "eppudu delivery avutundi", "entha bro", "kavali bro", "pampinchandi", "kavatledu"]
    teng_fillers = ["bro", "andi", "boss"]

    tenglish_samples = set()
    while len(tenglish_samples) < 10000:
        g = random.choice(teng_greetings)
        s = random.choice(teng_subjects)
        v = random.choice(teng_verbs)
        f = random.choice(teng_fillers)
        num = random.randint(100, 9999)

        phrase_type = random.randint(1, 4)
        if phrase_type == 1:
            phrase = f"{g} {f}"
        elif phrase_type == 2:
            phrase = f"{s} {v} {f}"
        elif phrase_type == 3:
            phrase = f"{f} naa order {num} {v}"
        else:
            phrase = f"{s} {num} {v} {f}"

        tenglish_samples.add(phrase)

    for sample in tenglish_samples:
        dataset.append((sample, "TENGLISH"))

    # 4. ENGLISH DATASET GENERATOR (10,000+ Samples)
    eng_greetings = ["hello how are you brother", "good morning support", "hi there", "thank you very much", "please help me"]
    eng_subjects = ["game", "application", "order", "otp code", "activation key", "payment", "product price", "account credentials", "delivery status", "refund"]
    eng_verbs = ["has downloaded but is not opening", "when will it be delivered", "what is the price", "i accidentally logged out", "is it currently available in stock", "please confirm the transaction"]
    eng_fillers = ["please", "brother", "support", "sir", "team"]

    english_samples = set()
    while len(english_samples) < 10000:
        g = random.choice(eng_greetings)
        s = random.choice(eng_subjects)
        v = random.choice(eng_verbs)
        f = random.choice(eng_fillers)
        num = random.randint(100, 9999)

        phrase_type = random.randint(1, 4)
        if phrase_type == 1:
            phrase = f"{g} {f}"
        elif phrase_type == 2:
            phrase = f"{s} {v} {f}"
        elif phrase_type == 3:
            phrase = f"{f} my order {num} {v}"
        else:
            phrase = f"{s} {num} {v} {f}"

        english_samples.add(phrase)

    for sample in english_samples:
        dataset.append((sample, "ENGLISH"))

    print(f"Total dataset samples generated: {len(dataset):,} (10,000 per language)")
    return dataset


class NgramTfidfNaiveBayesTrainer:
    def __init__(self, n_range=(2, 4)):
        self.n_range = n_range
        self.vocab = set()
        self.class_counts = defaultdict(int)
        self.feature_counts = defaultdict(lambda: defaultdict(int))
        self.class_priors = {}
        self.feature_log_probs = defaultdict(dict)
        self.total_docs = 0

    def extract_ngrams(self, text):
        text = f"#{text.lower().strip()}#"
        ngrams = []
        for n in range(self.n_range[0], self.n_range[1] + 1):
            for i in range(len(text) - n + 1):
                ngrams.append(text[i:i+n])
        return ngrams

    def train(self, dataset):
        self.total_docs = len(dataset)

        print("Extracting character n-gram feature vectors across 40,000 dataset samples...")
        for text, label in dataset:
            self.class_counts[label] += 1
            ngrams = set(self.extract_ngrams(text))
            for feature in ngrams:
                self.vocab.add(feature)
                self.feature_counts[label][feature] += 1

        print(f"Vocabulary size: {len(self.vocab):,} unique n-gram features.")
        print("Calculating Bayesian log priors P(C) and likelihood probabilities P(x|C)...")

        for label, count in self.class_counts.items():
            self.class_priors[label] = math.log(count / self.total_docs)

        vocab_size = len(self.vocab)
        for label in self.class_counts:
            total_features_in_class = sum(self.feature_counts[label].values())
            for feature in self.vocab:
                count = self.feature_counts[label][feature]
                if count > 0:
                    prob = (count + 1) / (total_features_in_class + vocab_size)
                    self.feature_log_probs[label][feature] = round(math.log(prob), 4)

    def save_model(self, filepath="lingua_ml_model.json"):
        model_data = {
            "dataset_info": {
                "total_samples": self.total_docs,
                "samples_per_class": dict(self.class_counts),
            },
            "vocab": list(self.vocab),
            "class_priors": self.class_priors,
            "feature_log_probs": self.feature_log_probs,
            "classes": list(self.class_counts.keys()),
        }
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(model_data, f, indent=2)
        print(f"ML Model trained on 40,000 samples and saved to '{filepath}'!")


if __name__ == "__main__":
    print("==========================================================")
    print("RAKEXURA LINGUA 40,000 DATASET MACHINE LEARNING TRAINER")
    print("==========================================================")
    dataset = generate_10k_datasets()
    trainer = NgramTfidfNaiveBayesTrainer()
    trainer.train(dataset)
    trainer.save_model("lingua_ml_model.json")
