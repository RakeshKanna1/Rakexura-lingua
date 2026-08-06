import time
from collections import defaultdict
from fastapi import Request, HTTPException, status, Response

class RateLimiter:
    def __init__(self, text_limit_per_min: int = 30, audio_limit_per_min: int = 8):
        self.text_limit = text_limit_per_min
        self.audio_limit = audio_limit_per_min
        self._requests = defaultdict(list)

    def _clean_old(self, key: str, now: float):
        self._requests[key] = [t for t in self._requests[key] if now - t < 60]

    def check_rate_limit(self, request: Request, mode: str, response: Response):
        client_ip = request.client.host if request.client else "127.0.0.1"
        key = f"{client_ip}:{mode}"
        now = time.time()

        self._clean_old(key, now)

        limit = self.audio_limit if mode in ("voice", "upload") else self.text_limit
        current_count = len(self._requests[key])

        if current_count >= limit:
            retry_after = 60 - int(now - self._requests[key][0]) if self._requests[key] else 60
            response.headers["Retry-After"] = str(max(1, retry_after))
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail={
                    "code": "RATE_LIMIT",
                    "message": "Too many requests. Please wait a moment before trying again.",
                },
                headers={"Retry-After": str(max(1, retry_after))},
            )

        self._requests[key].append(now)

rate_limiter = RateLimiter()
