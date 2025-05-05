import { useEffect, useState } from 'react';

export default function DataFetcher() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setPosts(data.slice(0, 5));
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, []);

  if (loading) return <p className="text-blue-600">Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <ul className="space-y-2">
      {posts.map(post => (
        <li key={post.id} className="p-4 bg-gray-50 rounded shadow">
          <h3 className="font-semibold">{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}
