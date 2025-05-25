export async function getWeatherForecast() {
  const token = localStorage.getItem("token");

  const res = await fetch("https://localhost:7039/weatherforecast", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("날씨 데이터를 불러오지 못했습니다.");
  }

  return await res.json();
}
