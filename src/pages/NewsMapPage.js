import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import WeatherWidget from "./WeatherWidget";

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const TOMORROW_API_KEY = process.env.REACT_APP_TOMORROW_API_KEY;
const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;

function decodeHtmlEntities(text) {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}

function NewsMapPage() {
  const [regionInput, setRegionInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [newsMarkers, setNewsMarkers] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [selectedArticleIndex, setSelectedArticleIndex] = useState(null);
  const [openedInfoWindow, setOpenedInfoWindow] = useState(null);
  const [weather, setWeather] = useState(null);
  const mapRef = useRef(null);

  const articleRefs = useRef([]);
  const markerIcons = [
    "/marker-red.png",
    "/marker-blue.png",
    "/marker-green.png",
    "/marker-orange.png",
    "/marker-pink.png",
    "/marker-navy.png",
    "/marker-gray.png"
  ];

  const fetchWeather = async (regionName) => {
    try {
      const geocodeRes = await axios.get("https://dapi.kakao.com/v2/local/search/keyword.json", {
        headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` },
        params: { query: regionName },
      });

      const docs = geocodeRes.data.documents;
      if (!docs || docs.length === 0) {
        console.warn("좌표 검색 실패:", regionName);
        setWeather(null);
        return;
      }

      const { x: lng, y: lat } = docs[0];

      const weatherRes = await axios.get("https://api.tomorrow.io/v4/weather/realtime", {
        params: {
          location: `${lat},${lng}`,
          apikey: TOMORROW_API_KEY,
          units: "metric",
        },
      });

      const data = weatherRes.data.data.values;
      setWeather({
        temp: data.temperature,
        humidity: data.humidity,
        precipitationProbability: data.precipitationProbability,
        pm25: data.particulateMatter25,
        weatherCode: data.weatherCode,
      });
    } catch (error) {
      console.error("Tomorrow.io 날씨 요청 실패:", error);
      setWeather(null);
    }
  };

  // 날씨 코드 → 한글 해석
  const getWeatherDescription = (code) => {
    const mapping = {
      1000: "쾌청함",
      1100: "대체로 맑음",
      1101: "부분 흐림",
      1102: "흐림",
      1001: "구름 많음",
      4000: "비",
      4200: "약한 비",
      4201: "강한 비",
      5000: "눈",
      5001: "약한 눈",
      5100: "강한 눈",
      8000: "뇌우",
      // 필요 시 추가 가능
    };
    return mapping[code] || `알 수 없음 (코드: ${code})`;
  };

  // 날씨 코드 → 이모지 아이콘
  const getWeatherIcon = (code) => {
    if ([1000, 1100].includes(code)) return "☀️";
    if ([1101, 1102, 1001].includes(code)) return "⛅";
    if ([4000, 4200, 4201].includes(code)) return "🌧️";
    if ([5000, 5001, 5100].includes(code)) return "❄️";
    if ([8000].includes(code)) return "🌩️";
    return "🌈";
  };

  // 미세먼지 등급 변환
  const getPm25Grade = (pm25) => {
    if (pm25 <= 15) return { label: "좋음", color: "green" };
    if (pm25 <= 35) return { label: "보통", color: "orange" };
    return { label: "나쁨", color: "red" };
  };


  const fetchVideoForArticle = async (article, location) => {
    const fallbackQueries = [
      `${article.title} ${location.name}`,
      `${categoryInput} ${location.name}`,
      `${location.name} ${categoryInput} 관련 뉴스`,
      `${article.title}`.slice(0, 30),
    ];

    for (const query of fallbackQueries) {
      try {
        const videoResponse = await axios.get("https://www.googleapis.com/youtube/v3/search", {
          params: {
            part: "snippet",
            q: query,
            type: "video",
            key: YOUTUBE_API_KEY,
            maxResults: 1,
            publishedAfter: "2024-09-01T00:00:00Z",
            order: "relevance",
          },
        });
        const video = videoResponse.data.items[0];
        if (video) {
          return `<iframe width="100%" height="200" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>`;
        }
      } catch (err) {
        console.error("유튜브 검색 실패 (쿼리:", query, ")", err);
      }
    }

    return "<p>관련 영상을 불러오지 못했습니다.</p>";
  };

  const handleSearch = async () => {
    if (!regionInput || !categoryInput) {
      alert("지역과 카테고리를 입력해주세요.");
      return;
    }

    await fetchWeather(regionInput); // 🔔 검색 시 날씨도 요청

    try {
      const response = await axios.get("https://news-map-wmye.onrender.com/search_news", {
        params: { region: regionInput, category: categoryInput },
      });

      if (response.data.error) {
        alert(response.data.error);
        return;
      }

      const { news } = response.data;

      if (!window.naver || !window.naver.maps) {
        console.error("네이버 지도 API가 로드되지 않았습니다.");
        return;
      }

      const map = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(37.5665, 126.9780),
        zoom: 10,
      });

      newsMarkers.forEach((marker) => marker.setMap(null));

      const validNews = news.filter((article) => article.locations.length > 0);
      if (validNews.length > 0) {
        const firstLat = parseFloat(validNews[0].locations[0].lat);
        const firstLng = parseFloat(validNews[0].locations[0].lng);
        map.setCenter(new window.naver.maps.LatLng(firstLat, firstLng));
      }

      const markers = await Promise.all(news.flatMap(async (article, index) => {
        return await Promise.all(article.locations.map(async (location, locIndex) => {
          const markerIcon = markerIcons[(index + locIndex) % markerIcons.length];

          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(
              parseFloat(location.lat),
              parseFloat(location.lng)
            ),
            map: map,
            icon: {
              url: markerIcon,
              size: new window.naver.maps.Size(30, 30),
              scaledSize: new window.naver.maps.Size(30, 30),
            },
          });

          const videoIframe = await fetchVideoForArticle(article, location);

          const infoWindow = new window.naver.maps.InfoWindow({
            content: `
              <div style="padding:15px; width:400px; background:white; border-radius:8px; font-family:sans-serif; display:flex; gap:10px;">
                <div style="flex:1">
                  <h4 style="margin: 0 0 5px 0;">${decodeHtmlEntities(article.title)}</h4>
                  <p style="display: inline-block; background-color: #f0f0f0; color: #333; font-size: 13px; padding: 4px 8px; border-radius: 12px; margin: 5px 0;">
                    📍 <strong>장소: ${location.name}</strong>
                  </p>
                  <p style="font-size: 14px;">${decodeHtmlEntities(article.description)}</p>
                  <a href="${article.link}" target="_blank" rel="noopener noreferrer" style="color:#0078FF;">🔗 NEWS LINK</a>           
                </div>
                <div style="flex:1; display:flex; flex-direction:column; justify-content:space-between;">
                  <div style="display:inline-block; background-color:#f0f0f0; color:#333; font-size:13px; padding:4px 8px; border-radius:12px; margin-bottom:8px; display:flex; align-items:center; gap:6px; margin-top:auto;">
                    <img src='https://www.svgrepo.com/show/13671/youtube.svg' alt='YouTube Icon' width='16' height='16'/>
                    <strong>관련 YouTube</strong>
                  </div>
                  ${videoIframe}
                </div>
              </div>
            `,
          });


          window.naver.maps.Event.addListener(marker, "click", () => {
            if (infoWindow.getMap()) {
              infoWindow.close();
              setOpenedInfoWindow(null);
              setSelectedArticleIndex(null);
            } else {
              if (openedInfoWindow) openedInfoWindow.close();
              infoWindow.open(map, marker);
              setOpenedInfoWindow(infoWindow);
              setSelectedArticleIndex(index);
              const el = articleRefs.current[index];
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          });

          return marker;
        }));
      }));

      setNewsMarkers(markers.flat());
      setNewsList(news);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>

      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "10px" }}>
          {/* 검색창 */}
          <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            <input
              type="text"
              value={regionInput}
              onChange={(e) => setRegionInput(e.target.value)}
              placeholder="예: 서울특별시"
              style={{ flex: 1, padding: "8px" }}
            />
            <input
              type="text"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              placeholder="예: 축제"
              style={{ flex: 1, padding: "8px" }}
            />
            <button
              onClick={handleSearch}
              style={{
                padding: "10px 16px",
                backgroundColor: "#0078FF",
                color: "white",
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              검색
            </button>
          </div>

          {/* 지도 */}
          <div id="map" style={{ width: "100%", height: "600px", borderRadius: "8px" }}></div>
          {/* 날씨 위젯: 기존 길찾기 영역 대체 */}
          <WeatherWidget region={regionInput} />

        </div>

        {/* 오른쪽 사이드바 전체 */}
        <div style={{ flex: 1, maxHeight: "950px", overflowY: "auto", paddingRight: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>

          {/* ✅ 흰색 박스: 헤드라인 + 뉴스 리스트 */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "20px",
            height: "1850px",                     // 지도와 동일한 높이
            overflowY: "auto",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{ color: "black", marginTop: 0 }}>📰 '{regionInput}의 {categoryInput}'에 대해서 찾고 계신가요?</h2>

            <div style={{ overflowY: "auto" }}>
              {newsList.length === 0 ? (
                <p>지역과 카테고리를 입력 후 검색해 주세요.</p>
              ) : (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {newsList.map((article, index) => (
                    <li
                      key={index}
                      ref={(el) => (articleRefs.current[index] = el)}
                      style={{
                        marginBottom: "15px",
                        borderBottom: "1px solid #ddd",
                        paddingBottom: "10px",
                        backgroundColor: selectedArticleIndex === index ? "#f0f8ff" : "transparent",
                        transition: "background-color 0.3s",
                      }}
                    >
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "#0078FF" }}
                      >
                        <h4>{decodeHtmlEntities(article.title)}</h4>
                      </a>
                      <p>{decodeHtmlEntities(article.description || "요약문을 가져올 수 없습니다.")}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* 날씨 위젯: 뉴스 리스트 바깥으로 분리된 카드 */}


        </div>
      </div>
    </div>
  );
}

export default NewsMapPage;
