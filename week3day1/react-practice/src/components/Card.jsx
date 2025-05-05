export default function Card({ title, children }) {
    return (
      <div style={{ border: '1px solid #ccc', padding: 10, margin: 10 }}>
        <h3>{title}</h3>
        <div>{children}</div>
      </div>
    );
  }
  