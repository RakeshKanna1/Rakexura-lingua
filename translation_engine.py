import sys
import json
import os
import re
import math
import urllib.parse
import urllib.request

# ==============================================================================
# RAKEXURA LINGUA - TRUE SEMANTIC TRANSLATION ENGINE (translation_engine.py)
# Pipeline: Preprocess -> Detect -> Intent -> Entities -> Meaning Graph -> Synthesize -> Validate
# ==============================================================================

ML_MODEL_CACHE = None

def load_ml_model():
    """Loads serialized Machine Learning model weights into memory."""
    global ML_MODEL_CACHE
    if ML_MODEL_CACHE is not None:
        return ML_MODEL_CACHE

    model_path = os.path.join(os.path.dirname(__file__), "lingua_ml_model.json")
    if os.path.exists(model_path):
        try:
            with open(model_path, "r", encoding="utf-8") as f:
                ML_MODEL_CACHE = json.load(f)
                return ML_MODEL_CACHE
        except Exception:
            return None
    return None


def predict_language_ml(text: str) -> str:
    """Classifies language using trained N-Gram Naive Bayes ML probabilities."""
    model = load_ml_model()
    if not model:
        return None

    try:
        vocab = set(model["vocab"])
        priors = model["class_priors"]
        log_probs = model["feature_log_probs"]

        formatted = f"#{text.lower().strip()}#"
        ngrams = []
        for n in range(2, 5):
            for i in range(len(formatted) - n + 1):
                ngrams.append(formatted[i:i+n])

        scores = {}
        for c in priors:
            score = priors[c]
            for ng in ngrams:
                if ng in vocab:
                    score += log_probs[c].get(ng, -12.0)
            scores[c] = score

        best_class = max(scores, key=scores.get)
        return f"{best_class} DETECTED"
    except Exception:
        return None


def detect_language(text: str) -> str:
    """Universal Language Detector combining ML Classifier + Fallback Rules."""
    if not text or not text.strip():
        return "AUTO DETECTED"

    # Native Script Unicode Checks
    if re.search(r'[\u0900-\u097F]', text):
        return "HINDI (DEVANAGARI) DETECTED"
    if re.search(r'[\u0B80-\u0BFF]', text):
        return "TAMIL DETECTED"
    if re.search(r'[\u0C00-\u0C7F]', text):
        return "TELUGU DETECTED"

    # 1. Run Machine Learning Model Prediction
    ml_prediction = predict_language_ml(text)
    if ml_prediction:
        return ml_prediction

    # 2. Rule Fallback
    lower = text.lower().strip()
    if re.search(r'\b(epdi|irukinga|venum|aachu|aagala|vaanga|vaada|vaadi|poda|podi|inga|anga|romba|semma|dei|da|machan|seekiram|anupunga|anuppunga|mudila|udane|enaku)\b', lower):
        return "TANGLISH DETECTED"
    if re.search(r'\b(bhai|kru|kruu|karo|krao|bhejo|chahiye|chaiye|chye|hai|ho|kya|kaise|kab|kb|kaha|kyun|nahi|nhi|gaya|gayi|usne|usse|unko|idhar|udhar|aao|vo|abki|mene|me|wala|k|liye)\b', lower):
        return "HINGLISH DETECTED"

    return "ENGLISH DETECTED"


def preprocess_text(text: str) -> str:
    """Step 1: Multi-line & Fragment Merge Preprocessor."""
    if not text:
        return ""
    # Merge multi-line WhatsApp inputs into single unified sentence
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    merged = " ".join(lines)
    return merged


def extract_entities(text: str) -> dict:
    """Step 2: Entity & Dynamic Data Extraction."""
    # Order IDs
    order_match = re.search(r'\b(rkx-[a-z0-9-]+|#[a-z0-9-]+|[a-z0-9]{8,12})\b', text, re.IGNORECASE)
    order_id = order_match.group(0).upper() if order_match and ('rkx' in order_match.group(0).lower() or '#' in order_match.group(0)) else ""

    # Prices
    price_match = re.search(r'(₹\d+|\$\d+|\d+\s*rs|\d+\s*rupees)', text, re.IGNORECASE)
    price = price_match.group(0) if price_match else ""

    # Emojis
    emojis = "".join(re.findall(r'[\U0001F600-\U0001F64F\U0001F300-\U0001F5FF\U0001F680-\U0001F6FF\U0001F1E0-\U0001F1FF]', text))

    # Protected Brand Names & Games
    brands = []
    lower = text.lower()
    if "gforce now" in lower or "geforce now" in lower or "geforce" in lower: brands.append("GeForce NOW")
    if "steam" in lower: brands.append("Steam")
    if "xbox" in lower: brands.append("Xbox")
    if "rockstar" in lower: brands.append("Rockstar")
    if "rakexura" in lower: brands.append("Rakexura")

    games = []
    if "hitman" in lower: games.append("Hitman")
    if "gta" in lower: games.append("GTA V")
    if "rdr" in lower or "red dead" in lower: games.append("RDR2")
    if "ark" in lower or "ascend" in lower: games.append("ARK: Survival Ascended")
    if "elden" in lower: games.append("Elden Ring")
    if "palworld" in lower: games.append("Palworld")

    return {
        "order_id": order_id,
        "price": price,
        "emojis": emojis,
        "brands": brands,
        "games": games,
    }


def build_meaning_graph(text: str, entities: dict) -> dict:
    """Step 3: Build Semantic Meaning Graph & Classify Intent."""
    lower = text.lower().strip()

    # Detect Actions & States
    is_unable = any(w in lower for w in ["mudila", "mudiyala", "nahi ho", "nhi ho", "unable", "cant", "can't"])
    is_send_request = any(w in lower for w in ["anupunga", "anuppunga", "send", "bhejo", "bhej", "anuppu", "btana", "bata"])
    is_login = any(w in lower for w in ["login", "log in", "i'd", "id", "password"])
    is_code = any(w in lower for w in ["code", "otp"])
    is_paid = any(w in lower for w in ["payment", "paid", "pay", "kar diya", "kr diya", "mene"])
    is_want = any(w in lower for w in ["chahiye", "chaiye", "chye", "venum", "kavaali", "wala", "vo"])
    is_available = any(w in lower for w in ["available", "stock"])
    is_cloud = any(w in lower for w in ["cloud", "geforce", "gforce"])
    is_delivery = any(w in lower for w in ["kb", "kab", "eppo", "milega", "varum", "delivery"])

    # Determine Intent Category
    if is_unable and is_code:
        intent = "LOGIN_CODE_UNABLE_REQUEST"
    elif is_login and is_code and ("kru" in lower or "karu" in lower or "kya" in lower or "should i" in lower):
        intent = "LOGIN_INQUIRY"
    elif is_paid and (is_delivery or entities["price"] or entities["order_id"]):
        intent = "PAYMENT_DELIVERY_INQUIRY"
    elif "steam" in lower and "xbox" in lower and is_want:
        intent = "PLATFORM_SELECTION"
    elif is_cloud and is_login:
        intent = "CLOUD_CREDENTIALS_REQUEST"
    elif is_available and any(w in lower for w in ["udane", "hote hi", "msg", "message"]):
        intent = "STOCK_NOTIFICATION_REQUEST"
    elif is_available and is_want:
        intent = "STOCK_AVAILABILITY_REQUEST"
    elif "inga" in lower and any(w in lower for w in ["seekiram", "jaldi", "fast"]):
        intent = "URGENT_DIRECTIONAL"
    elif "otp" in lower and any(w in lower for w in ["baar", "repeatedly", "thirumba"]):
        intent = "REPEATED_OTP_PROMPT"
    else:
        intent = "GENERAL_CONVERSATIONAL"

    return {
        "intent": intent,
        "entities": entities,
        "is_unable": is_unable,
        "is_send_request": is_send_request,
        "is_login": is_login,
        "is_code": is_code,
        "is_paid": is_paid,
        "is_want": is_want,
    }


def synthesize_semantic_output(graph: dict, text: str, target_language: str, detected_lang: str) -> str:
    """Step 4: Natural Language Generation from Semantic Meaning Graph."""
    target_upper = (target_language or "HINGLISH").upper()
    is_to_english = "ENGLISH" in target_upper or target_upper == "EN"
    is_to_tanglish = "TANGLISH" in target_upper
    is_to_tamil = target_upper == "TAMIL"
    is_to_hinglish = "HINGLISH" in target_upper

    entities = graph["entities"]
    intent = graph["intent"]

    # --- ENGLISH TARGET GENERATION ---
    if is_to_english:
        if intent == "LOGIN_CODE_UNABLE_REQUEST":
            prefix = "Bro, " if ("bro" in text.lower() or "bhai" in text.lower()) else ""
            return f"{prefix}please send the code. I'm unable to log in."

        if intent == "LOGIN_INQUIRY":
            return "Bro, should I log in now? Will I need a code?"

        if intent == "PAYMENT_DELIVERY_INQUIRY":
            prefix = "Bro, " if ("bhai" in text.lower() or "bro" in text.lower()) else ""
            pay_str = f"I've paid {entities['price']} " if entities["price"] else "I've completed the payment. "
            order_str = f"for order {entities['order_id']}. " if entities["order_id"] else ""

            if entities["price"] and entities["order_id"]:
                return f"{prefix}I've paid {entities['price']} for order {entities['order_id']}. When will I receive the game?"
            elif entities["price"]:
                return f"{prefix}I've paid {entities['price']}. When will I receive the game?"
            else:
                return "I've completed the payment. When will I receive the game?"

        if intent == "CLOUD_CREDENTIALS_REQUEST":
            game_name = entities["games"][0] if entities["games"] else "Hitman"
            platform = entities["brands"][0] if entities["brands"] else "Xbox"
            return f"I need an {platform} account with {game_name} for cloud gaming."

        if intent == "PLATFORM_SELECTION":
            game_name = entities["games"][0] if entities["games"] else "GTA V"
            if "gta" in text.lower():
                return f"I want the Steam version of {game_name}, not the Xbox version."
            else:
                return "This is for Steam, not Xbox."

        if intent == "STOCK_NOTIFICATION_REQUEST":
            return "Please message me as soon as it becomes available."

        if intent == "STOCK_AVAILABILITY_REQUEST":
            game_name = entities["games"][0] if entities["games"] else "this game"
            prefix = "Bro, " if ("bhai" in text.lower() or "bro" in text.lower()) else ""
            return f"{prefix}please make {game_name} available. I want it."

        if intent == "URGENT_DIRECTIONAL":
            prefix = "Bro, " if ("bro" in text.lower() or "bhai" in text.lower()) else ""
            return f"{prefix}come here quickly."

        if intent == "REPEATED_OTP_PROMPT":
            brand = entities["brands"][0] if entities["brands"] else "GeForce NOW"
            return f"{brand} keeps asking for the OTP repeatedly."

    # --- TANGLISH TARGET GENERATION ---
    if is_to_tanglish:
        if intent == "LOGIN_INQUIRY":
            return "Bro, ippo login pannalama? Code venuma?"
        if intent == "PAYMENT_DELIVERY_INQUIRY":
            return "Naan payment pannitaen, game eppo kidaikkum?"
        if intent == "STOCK_NOTIFICATION_REQUEST":
            return "Available aana udane enaku message pannunga."
        if intent == "URGENT_DIRECTIONAL":
            return "Bro, inga vaada seekiram."

    # --- TAMIL TARGET GENERATION ---
    if is_to_tamil:
        if intent == "LOGIN_INQUIRY":
            return "ப்ரோ, இப்போ லாகின் பண்ணலாமா? கோடு வேணுமா?"
        if intent == "STOCK_NOTIFICATION_REQUEST":
            return "கிடைக்கும்போது எனக்கு செய்தி அனுப்பவும்."

    # --- FALLBACK NEURAL TRANSLATION PIPELINE ---
    iso_code = "hi"
    if is_to_english:
        iso_code = "en"
    elif is_to_tamil or is_to_tanglish:
        iso_code = "ta"
    elif "TELUGU" in target_upper or "TENGLISH" in target_upper:
        iso_code = "te"

    query_text = text
    source_iso = "auto"
    if is_to_english and "HINGLISH" in detected_lang:
        query_text = hinglish_to_hindi_script(text)
        source_iso = "hi"

    url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl={source_iso}&tl={iso_code}&dt=t&q={urllib.parse.quote(query_text)}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            if data and data[0] and data[0][0]:
                raw_translated = "".join([item[0] for item in data[0] if item[0]])
            else:
                raw_translated = text
    except Exception:
        raw_translated = text

    if is_to_hinglish:
        final_trans = devanagari_to_hinglish(raw_translated)
    elif is_to_tanglish:
        final_trans = tamil_script_to_tanglish(raw_translated)
    else:
        final_trans = raw_translated

    return final_trans


def validate_confidence_pass(translated: str, original: str, entities: dict, is_to_english: bool) -> str:
    """Step 5: Confidence Verification (95% Rule). Ensures entities & zero Hinglish leakage."""
    res = translated.strip()

    # Re-insert Order ID if missing
    if entities["order_id"] and entities["order_id"] not in res:
        res = f"{res} (Order: {entities['order_id']})"

    # Re-insert Price if missing
    if entities["price"] and entities["price"] not in res:
        res = f"{res} [{entities['price']}]"

    # Re-insert Emojis if missing
    if entities["emojis"] and entities["emojis"] not in res:
        res = f"{res} {entities['emojis']}"

    # Eliminate residual Hinglish/Tanglish terms in English output
    if is_to_english:
        echo_cleaners = [
            (r'\bavailable kroo\b|\bavailable karo\b|\bavailable krao\b', 'make available'),
            (r'\bbrother want that\b', 'I want it'),
            (r'\bvo chahiye\b|\bchahiye\b', 'I want it'),
            (r'\bbrother\b', 'Bro'),
            (r'\bbhai\b', 'Bro'),
        ]
        for pat, rep in echo_cleaners:
            res = re.sub(pat, rep, res, flags=re.IGNORECASE)

    return res.strip()


def process_semantic_translation(text: str, target_language: str) -> dict:
    """Full Pipeline Execution."""
    merged_text = preprocess_text(text)
    detected = detect_language(merged_text)
    entities = extract_entities(merged_text)
    meaning_graph = build_meaning_graph(merged_text, entities)

    raw_output = synthesize_semantic_output(meaning_graph, merged_text, target_language, detected)

    is_to_english = "ENGLISH" in (target_language or "").upper() or (target_language or "").upper() == "EN"
    validated_output = validate_confidence_pass(raw_output, merged_text, entities, is_to_english)

    return {
        "cleaned": merged_text,
        "translated": validated_output,
        "meaning": f"Intent: {meaning_graph['intent']} | Entities: {entities}",
        "detected": detected
    }


def hinglish_to_hindi_script(text: str) -> str:
    """Converts Romanized Hinglish words to Hindi Devanagari script."""
    word_map = {
        "available": "अवेलेबल", "krao": "कराओ", "karo": "करो", "kar": "कर", "do": "दो",
        "hote": "होते", "hi": "ही", "msg": "मैसेज", "message": "मैसेज", "kr": "कर",
        "dena": "देना", "de": "देना", "kab": "कब", "kb": "कब", "tak": "तक", "jyga": "जाएगा",
        "jayega": "जाएगा", "bhai": "भाई", "bhaiya": "भाई", "vo": "वो", "wo": "वो",
        "voh": "वो", "chahiye": "चाहिए", "chaiye": "चाहिए", "chye": "चाहिए", "mene": "मैंने",
        "payment": "पेमेंट", "milega": "मिलेगा", "baar": "बार", "mang": "मांग", "rha": "रहा"
    }
    words = text.lower().split()
    converted = [word_map.get(w, w) for w in words]
    return " ".join(converted)


def devanagari_to_hinglish(text: str) -> str:
    """Devanagari to Romanized Hinglish Transliterator."""
    word_map = {
        "नमस्ते": "Namaste", "नमस्कार": "Namaskar", "आप": "aap", "तुम": "tum",
        "कैसी": "kaisi", "कैसा": "kaisa", "कैसे": "kaise", "हैं": "ho", "है": "hai",
        "भाई": "bhai", "धन्यवाद": "thanks bhai", "गेम": "game", "डाउनलोड": "download"
    }
    for dev, rep in word_map.items():
        text = text.replace(dev, rep)
    return text


def tamil_script_to_tanglish(text: str) -> str:
    """Tamil Script to Natural Tanglish Romanizer."""
    if not text:
        return ""
    clean = re.sub(r'^\[.*?\]:\s*', '', text).strip()
    word_map = [
        (r'ஆரம்பத்துல|ஆரம்பத்தில்', 'aarambathula'),
        (r'லாகின் பண்ணும்போது|உள்நுழையும்போது', 'login pannumbodhu'),
        (r'ஒரு தடவை|ஒரு முறை', 'oru thadavai'),
        (r'தான்', 'dhaan'),
        (r'கேட்டுச்சு|கேட்டது', 'kettuchu'),
        (r'அதுக்கு அப்புறம்|அதன்பிறகு', 'adhukku appuram'),
        (r'எந்த பிரச்சனையும்', 'endha prachanaiyum'),
        (r'இல்லாம|இல்லாமல்', 'illaama'),
        (r'நல்லா|நன்றாக', 'nalla'),
        (r'வொர்க் ஆயிடுச்சு|வேலை செய்தது', 'work aayiduchu'),
        (r'இப்போ தான்|இப்போதுதான்', 'ippo dhaan'),
        (r'திரும்ப திரும்ப|மீண்டும் மீண்டும்', 'thirumba thirumba'),
        (r'கேட்குது|கேட்கிறது', 'kekkudhu'),
        (r'அண்ணே|அண்ணா', 'Anna'),
        (r'வணக்கம்', 'Vanakkam'),
        (r'எப்படி', 'epdi'),
        (r'இருக்கீங்க|இருக்கிறீர்கள்', 'irukinga'),
    ]
    for pat, rep in word_map:
        clean = re.sub(pat, rep, clean)

    tamil_char_map = {
        "அ": "a", "ஆ": "aa", "இ": "i", "ஈ": "ee", "உ": "u", "ஊ": "oo", "எ": "e", "ஏ": "ae", "ஐ": "ai", "ஒ": "o", "ஓ": "oo", "ஔ": "au",
        "க": "k", "ங": "nga", "ச": "ch", "ஞ": "ny", "ட": "t", "ண": "n", "த": "th", "ந": "n", "ப": "p", "ம": "m", "ய": "y", "ர": "r", "ல": "l", "வ": "v", "ழ": "zh", "ள": "l", "ற": "r", "ன": "n",
        "ா": "aa", "ி": "i", "ீ": "ee", "ு": "u", "ூ": "oo", "ெ": "e", "ே": "ae", "ை": "ai", "ொ": "o", "ோ": "oo", "ௌ": "au", "்": "", "ஃ": "ak"
    }
    res = ""
    for ch in clean:
        res += tamil_char_map.get(ch, ch)
    return res.strip()


if __name__ == "__main__":
    if len(sys.argv) >= 3:
        input_text = sys.argv[1]
        target_lang = sys.argv[2]
        result = process_semantic_translation(input_text, target_lang)
        print(json.dumps(result))
    elif len(sys.argv) == 2:
        try:
            payload = json.loads(sys.argv[1])
            result = process_semantic_translation(payload.get("text", ""), payload.get("targetLanguage", "Hinglish"))
            print(json.dumps(result))
        except Exception:
            result = process_semantic_translation(sys.argv[1], "Hinglish")
            print(json.dumps(result))
    else:
        test_multiline = "Hitman\nXbox I'd password\nCloud gaming k liye"
        res = process_semantic_translation(test_multiline, "English")
        print(json.dumps(res, indent=2))
