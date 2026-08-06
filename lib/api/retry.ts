export async function withRetry<T>(
  fn: () => Promise<T>,
  retries: number = 1,
  delayMs: number = 500,
  shouldRetry?: (error: unknown) => boolean
): Promise<T> {
  let attempt = 0;
  while (attempt <= retries) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === retries) throw err;
      if (shouldRetry && !shouldRetry(err)) throw err;
      attempt++;
      await new Promise((resolve) => setTimeout(resolve, delayMs * Math.pow(2, attempt - 1)));
    }
  }
  throw new Error("Retry failed");
}
