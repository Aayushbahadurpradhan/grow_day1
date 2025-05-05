import { useEffect } from 'react';

export default function MountLogger() {
  useEffect(() => {
    console.log('Mounted');
    return () => console.log('Unmounted');
  }, []);

  return <p className="text-green-600">I am mounted! (check console)</p>;
}
