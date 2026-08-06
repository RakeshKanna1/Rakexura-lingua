import logging
import sys

def setup_logging():
    logger = logging.getLogger("rakexura_lingua")
    logger.setLevel(logging.INFO)

    handler = logging.StreamHandler(sys.stdout)
    formatter = logging.Formatter(
        "[%(asctime)s] [%(levelname)s] [%(name)s] %(message)s"
    )
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    return logger

logger = setup_logging()

def log_api_event(event_name: str, request_id: str, mode: str, duration_ms: float, error_code: str = None):
    # Strictly anonymous operational log - NO user text or audio metadata!
    msg = f"EVENT={event_name} REQUEST_ID={request_id} MODE={mode} DURATION_MS={duration_ms:.2f}"
    if error_code:
        msg += f" ERROR={error_code}"
    logger.info(msg)
