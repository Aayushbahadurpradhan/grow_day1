export default function DynamicList({ items }) {
    return (
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>  
        ))}
      </ul>
    );
  }
  