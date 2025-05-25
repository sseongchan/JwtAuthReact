import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import { getProfile } from "./api/auth";
import { getWeatherForecast } from "./api/weatherforecastApi";

export default function App() {
  const [user, setUser] = useState(null);
  const [weatherData, setWeatherData] = useState([]);

  const loadProfile = async () => {
    try {
      const profile = await getProfile();
      setUser(profile.user);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const decodeJWT = (token) => {
    try {
      const payload = token.split(".")[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (err) {
      console.error("토큰 디코딩 실패", err);
      return null;
    }
  };

  const handleShowTokenInfo = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("토큰이 없습니다.");
      return;
    }
    const decoded = decodeJWT(token);
    console.log("🔓 디코딩된 JWT:", decoded);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // 토큰 제거
    setUser(null); // 상태 초기화
  };

  const fetchWeather = async () => {
    try {
      const data = await getWeatherForecast();
      setWeatherData(data);
    } catch (err) {
      alert("날씨 데이터 불러오기 실패");
    }
  };

  if (!user) {
    return <LoginForm onLogin={loadProfile} />;
  }

  return (
    <>
      <div>환영합니다, {user}님!</div>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={handleShowTokenInfo}>토큰정보</button>
      <button onClick={fetchWeather}>날씨 정보 가져오기</button>
      <ul>
        {weatherData.map((item, index) => (
          <li key={index}>
            📅 {item.date} | 🌡️ {item.temperatureC}℃ | {item.summary}
          </li>
        ))}
      </ul>
    </>
  );
}
