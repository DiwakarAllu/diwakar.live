export async function fetchWithFallback(apiUrl, fallbackData, options = {}) {
  const { timeout = 3000, retries = 1 } = options;

  const fetchAttempt = () =>
    new Promise((resolve, reject) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);

      fetch(apiUrl, { signal: controller.signal })
        .then((res) => (res.ok ? res.json() : Promise.reject("Bad response")))
        .then((data) => {
          clearTimeout(timer);
          resolve(data);
        })
        .catch((err) => {
          clearTimeout(timer);
          reject(err);
        });
    });

  for (let i = 0; i <= retries; i++) {
    try {
      const data = await fetchAttempt();
      return { success: true, data };
    } catch (e) {
      if (i === retries) return { success: false, data: fallbackData };
    }
  }
}
