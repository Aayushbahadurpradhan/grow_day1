import { useState } from 'react';
import DataFetcher from './components/DataFetcher';
import Modal from './components/Modal';
import MountLogger from './components/MountLogger';
import Timer from './components/Timer';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [showLogger, setShowLogger] = useState(true);

  return (
    <div className="min-h-screen p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">React Lifecycle & Effects</h1>

      <section className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">1. Posts Fetcher with Cleanup</h2>
        <DataFetcher />
      </section>

      <section className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">2. Modal with Children Slots</h2>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Open Modal
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <h3 className="text-lg font-bold mb-2">Custom Header</h3>
            <p>This is the body of the modal.</p>
            <div className="mt-2">Footer content here</div>
          </Modal>
        )}
      </section>

      <section className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">3. Mount Logger</h2>
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded mb-2"
          onClick={() => setShowLogger(prev => !prev)}
        >
          Toggle Logger
        </button>
        {showLogger && <MountLogger />}
      </section>

      <section className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">4. Timer</h2>
        <Timer />
      </section>
    </div>
  );
}
