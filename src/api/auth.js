export async function login(username, password) {
  const res = await fetch("https://localhost:7039/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("로그인 실패");
  }

  const data = await res.json();
  localStorage.setItem("token", data.token);
  console.log(localStorage.getItem("token"));
  return data;
}

export async function getProfile() {
  const token = localStorage.getItem("token");
  const res = await fetch("https://localhost:7039/api/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("인증 실패");
  }

  return await res.json();
}
