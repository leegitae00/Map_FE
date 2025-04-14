// WeatherWidget.jsx 또는 WeatherWidget.js

import { useEffect, useState } from "react";

export default function WeatherWidget({ region }) {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);

    const API_KEY = "1197f4b03945bcab7633e933abaf49b3";

    useEffect(() => {
        if (!region?.trim()) return;

        const fetchWeather = async () => {
            try {
                const weatherRes = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${region}&appid=${API_KEY}&units=metric&lang=kr`
                );
                const weatherData = await weatherRes.json();

                if (weatherData.cod === 200) {
                    setWeather({
                        temp: Math.round(weatherData.main.temp),
                        description: weatherData.weather[0].description,
                        name: weatherData.name,
                        icon: weatherData.weather[0].icon,
                    });
                } else {
                    setWeather(null);
                }

                const forecastRes = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${region}&appid=${API_KEY}&units=metric&lang=kr`
                );
                const forecastData = await forecastRes.json();

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
        <div
            style={{
                width: "100%",
                backgroundColor: "black",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "20px",
                fontSize: "18px",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "2px solid white",
            }}
        >
            {weather ? (
                <>
                    <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "4px" }}>
                        {weather.name}
                    </p>
                    <img
                        src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                        alt="현재 날씨 아이콘"
                        style={{ width: "80px", height: "80px" }}
                    />
                    <p style={{ fontSize: "40px", fontWeight: "bold" }}>{weather.temp}°C</p>
                    <p style={{ fontSize: "20px", marginBottom: "16px" }}>{weather.description}</p>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            borderTop: "1px solid #eee",
                            paddingTop: "10px",
                        }}
                    >
                        {forecast.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    flex: 1,
                                }}
                            >
                                <p style={{ fontSize: "14px", color: "#ccc" }}>{item.time}</p>
                                <img
                                    src={`http://openweathermap.org/img/wn/${item.icon}.png`}
                                    alt="예보 아이콘"
                                    style={{ width: "40px", height: "40px" }}
                                />
                                <p style={{ fontSize: "16px" }}>{item.temp}°</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : region ? (
                <p style={{ color: "#888", padding: "10px" }}>날씨 정보를 불러올 수 없습니다.</p>
            ) : null}
        </div>
    );
}
