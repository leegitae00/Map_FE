import { useEffect, useState } from "react";
import axios from "axios";

const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export default function WeatherWidget({ region }) {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);


    useEffect(() => {
        if (!region?.trim()) return;

        const fetchWeather = async () => {
            try {
                // 🔁 Step 1: 카카오로 위도/경도 가져오기
                const kakaoRes = await axios.get(
                    "https://dapi.kakao.com/v2/local/search/keyword.json",
                    {
                        headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` },
                        params: { query: region },
                    }
                );

                const docs = kakaoRes.data.documents;
                if (!docs || docs.length === 0) {
                    console.warn("좌표 검색 실패:", region);
                    setWeather(null);
                    return;
                }

                const { x: lng, y: lat } = docs[0];

                // 🌦 Step 2: 위도/경도로 현재 날씨 요청
                const weatherRes = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather`,
                    {
                        params: {
                            lat,
                            lon: lng,
                            appid: WEATHER_API_KEY,
                            units: "metric",
                            lang: "kr",
                        },
                    }
                );

                const weatherData = weatherRes.data;

                setWeather({
                    temp: Math.round(weatherData.main.temp),
                    description: weatherData.weather[0].description,
                    name: weatherData.name,
                    icon: weatherData.weather[0].icon,
                });

                // 🔮 Step 3: 위도/경도로 3시간 예보 요청
                const forecastRes = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast`,
                    {
                        params: {
                            lat,
                            lon: lng,
                            appid: WEATHER_API_KEY,
                            units: "metric",
                            lang: "kr",
                        },
                    }
                );

                const forecastData = forecastRes.data;

                if (forecastData.cod === "200") {
                    const next5 = forecastData.list.slice(0, 5).map((item) => ({
                        time: new Date(item.dt * 1000).getHours() + "시",
                        temp: Math.round(item.main.temp),
                        icon: item.weather[0].icon,
                    }));
                    setForecast(next5);
                }
            } catch (err) {
                console.error("날씨 정보를 가져오는데 실패했습니다.", err);
                setWeather(null);
                setForecast([]);
            }
        };

        fetchWeather();
    }, [region]);

    return (
        <div style={{ width: "100%", backgroundColor: "#D2B48C", color: "white", padding: "20px", borderRadius: "20px" }}>
            {weather ? (
                <>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>{weather.name}</p>
                    <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="날씨" />
                    <p style={{ fontSize: "40px" }}>{weather.temp}°C</p>
                    <p>{weather.description}</p>
                    <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
                        {forecast.map((item, idx) => (
                            <div key={idx} style={{ textAlign: "center" }}>
                                <p>{item.time}</p>
                                <img src={`http://openweathermap.org/img/wn/${item.icon}.png`} alt="예보" />
                                <p>{item.temp}°</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : region ? (
                <p>날씨 정보를 불러올 수 없습니다.</p>
            ) : null}
        </div>
    );
}
