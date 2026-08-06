# Privacy Notes & Data Protection Architecture

1. **Temporary Audio Lifecycle**: Audio file uploads are streamed in 1 MB chunks to isolated temporary disk storage (`NamedTemporaryFile`) and deleted immediately via a `finally:` block upon transcription completion.
2. **Zero Content Logging**: Operational telemetry logs ONLY record request IDs, status codes, and execution duration in milliseconds. No user text, transcript, or audio payload is ever written to logs.
3. **No User Audio Archive**: Voice notes are processed strictly for the requested translation job and are not stored in any database or user history archive.
