export default async function fetchModel(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Ghi rõ lỗi HTTP để dễ debug
      const errorText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    // Ghi rõ URL bị lỗi và chi tiết lỗi ra console
    console.error(`⚠️ Fetch error at ${url}:\n`, err.message || err);
    throw err; // vẫn throw để component có thể xử lý
  }
}
