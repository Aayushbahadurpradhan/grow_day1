import { Card, CardContent } from "@/components/ui/card";

export default function WeatherCard({ weather, unit }) {
  const temp =
    unit === "C"
      ? `${weather.temp} °C`
      : `${(weather.temp * 9 / 5 + 32).toFixed(1)} °F`;

  return (
    <Card className="w-full max-w-md border-2 border-blue-300 dark:border-blue-600 shadow-lg rounded-2xl bg-white dark:bg-gray-800 text-center transition-all">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          <i className="fas fa-location-dot mr-2"></i>
          {weather.city}
        </h2>

        <p className="text-5xl font-semibold text-gray-800 dark:text-white">
          {temp}
        </p>

        <p className="capitalize text-gray-600 dark:text-gray-300 text-lg">
          <i className="fas fa-cloud mr-2 text-blue-500">   .   </i>
          {weather.description}
        </p>
      </CardContent>
    </Card>
  );
}
