import io
import unittest
from fastapi.testclient import TestClient
from app.main import app

class TestAPIEndpoints(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_health_check(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "ok")

    def test_readiness_check(self):
        response = self.client.get("/ready")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "ready")

    def test_translate_text_success(self):
        payload = {
            "requestId": "test_req_01",
            "mode": "text",
            "sourceLanguage": "HINGLISH",
            "targetLanguage": "ENGLISH",
            "text": "Kal meeting kitne baje hai?",
        }
        response = self.client.post("/v1/translate/text", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertIn("meeting", data["data"]["translation"].lower())
        self.assertEqual(data["data"]["requestId"], "test_req_01")

    def test_translate_text_empty_input(self):
        payload = {
            "mode": "text",
            "sourceLanguage": "AUTO DETECT",
            "targetLanguage": "ENGLISH",
            "text": "   ",
        }
        response = self.client.post("/v1/translate/text", json=payload)
        self.assertEqual(response.status_code, 400)
        self.assertFalse(response.json()["success"])

    def test_translate_audio_unsupported_extension(self):
        fake_audio = io.BytesIO(b"RIFF....WAVEfmt ")
        files = {"file": ("test.txt", fake_audio, "text/plain")}
        response = self.client.post("/v1/translate/audio", files=files)
        self.assertEqual(response.status_code, 415)
        self.assertFalse(response.json()["success"])

    def test_request_id_sanitization(self):
        payload = {
            "requestId": "test_req_injection_<script>",
            "mode": "text",
            "sourceLanguage": "HINGLISH",
            "targetLanguage": "ENGLISH",
            "text": "Bhai abhi aa raha hoon.",
        }
        response = self.client.post("/v1/translate/text", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertNotIn("<script>", data["data"]["requestId"])

if __name__ == "__main__":
    unittest.main()
