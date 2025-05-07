// import { useState } from "react";
// import WeatherCard from "./components/WeatherCard";
// import WeatherForm from "./components/WeatherForm";

// function App() {
//   const [weather, setWeather] = useState(() => {
//     const saved = sessionStorage.getItem("weather");
//     return saved ? JSON.parse(saved) : "";
//   });
//   const [unit, setUnit] = useState("C");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchWeather = async (city) => {
//     const cityName = city?.trim() || "";
//     setLoading(true);
//     setError("");
//     setWeather("");

//     try {
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cd638ae85731cd6ac79b3ceda5047f00&units=metric`
//       );
//       if (!res.ok) throw new Error("City not found");
//       const data = await res.json();
//       const weatherData = {
//         city: data.name,
//         temp: data.main.temp,
//         description: data.weather[0].description,
//       };
//       setWeather(weatherData);
//       sessionStorage.setItem("weather", JSON.stringify(weatherData));
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-600 dark:to-gray-800 transition-all px-4 py-6">
//       <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-6 text-center border border-blue-200 dark:border-gray-700 flex flex-col items-center justify-center">
//         <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400">
//           Weather Widget
//         </h1>

//         <WeatherForm onSubmit={fetchWeather} />

//         <button
//           className="mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
//           onClick={() => setUnit(unit === "C" ? "F" : "C")}
//         >
//           Switch to °{unit === "C" ? "F" : "C"}
//         </button>

//         {loading && (
//           <div className="text-blue-600 font-medium animate-pulse">Loading...</div>
//         )}

//         {error && (
//           <div className="text-red-600 font-semibold">{error}</div>
//         )}

//         {weather && (
//           <div className="animate-fade-in">
//             <WeatherCard weather={weather} unit={unit} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;



// src/App.jsx

import { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import WeatherForm from "./components/WeatherForm";
import { fetchWeather as fetchWeatherService } from "./components/weatherService";

function App() {
  const [weather, setWeather] = useState(() => {
    const saved = sessionStorage.getItem("weather");
    return saved ? JSON.parse(saved) : "";
  });
  const [unit, setUnit] = useState("C");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = (city) =>
    fetchWeatherService(city, setWeather, setError, setLoading);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-600 dark:to-gray-800 transition-all px-4 py-6">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-6 text-center border border-blue-200 dark:border-gray-700 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400">
          Weather Widget
        </h1>

        <WeatherForm onSubmit={fetchWeather} />

        <button
          className="mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          onClick={() => setUnit(unit === "C" ? "F" : "C")}
        >
          Switch to °{unit === "C" ? "F" : "C"}
        </button>

        {loading && (
          <div className="text-blue-600 font-medium animate-pulse">Loading...</div>
        )}

        {error && <div className="text-red-600 font-semibold">{error}</div>}

        {weather && (
          <div className="animate-fade-in">
            <WeatherCard weather={weather} unit={unit} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
