import { useGetErrorLogsQuery } from '../api/jsonPlaceholderApi'

export default function ErrorLogService() {
  const { data, error, isLoading } = useGetErrorLogsQuery(undefined, {
    pollingInterval: 5000, 
  })

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Error Logs (Polling every 5s)</h2>
      {isLoading && <p className="text-gray-500">Polling logs...</p>}
      {error && <p className="text-red-500">Error loading logs</p>}

      <ul className="space-y-2">
        {data?.slice(0, 5).map((log) => (
          <li key={log.id} className="bg-gray-100 p-2 rounded">
            <strong>{log.name}</strong>: {log.body}
          </li>
        ))}
      </ul>
    </div>
  )
}
