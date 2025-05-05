export default function Modal({ onClose, children }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
          {children}
          <div className="mt-4 text-right">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
  