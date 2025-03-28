// /lib/cookie/cookieUtils.ts

export const checkSuccessPageCookie = async () => {
  try {
    const res = await fetch("/api/handle-cookies", { method: "GET" });

    if (res.ok) {
      const data = await res.json();
      return data.visited;
    } else {
      console.error("Failed to check cookie.");
    }
  } catch (error) {
    console.error("Error during cookie check:", error);
  }

  return false;
};

export const setSuccessPageCookie = async () => {
  try {
    await fetch("/api/handle-cookies", { method: "POST" });
  } catch (error) {
    console.error("Error during cookie set:", error);
  }
};
