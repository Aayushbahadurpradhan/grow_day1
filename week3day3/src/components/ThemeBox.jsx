export default function ThemeBox() {
    return (
      <div className="mt-4 p-6 rounded-lg shadow transition-colors duration-300 
                      bg-blue-500">
        <h2 className="text-xl font-semibold">Themed Box</h2>
        <p>This box changes theme globally using Context API + Reducer!</p>
      </div>
    );
  }
  