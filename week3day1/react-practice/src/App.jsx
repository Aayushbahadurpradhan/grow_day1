import { useState } from 'react';
import Button from './components/Button';
import Card from './components/Card';
import ListItem from './components/ListItem';
import Counter from './components/Counter';
import RenderLogger from './components/RenderLogger';
import DynamicList from './components/DynamicList';

function App() {
  const [count, setCount] = useState(0);
  const [list, setList] = useState([
    { id: 1, name: "Learn React" },
    { id: 2, name: "Build Projects" },
  ]);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);

  return (
    <div style={{ padding: 20 }}>
      <h1>React Practical</h1>

      <Card title="Reusable Components">
        <Button label="Click me" onClick={() => alert('Hello')} />
        <ul>
          <ListItem text="Reusable Item 1" />
          <ListItem text="Reusable Item 2" />
        </ul>
      </Card>

      <Card title="Counter with Lifted State">
        <Counter count={count} onIncrement={increment} onDecrement={decrement} />
        <Counter count={count} onIncrement={increment} onDecrement={decrement} />
      </Card>

      <Card title="Render Logger (React.memo)">
        <RenderLogger label="Memo Component" />
      </Card>

      <Card title="Dynamic List (with keys)">
        <DynamicList items={list} />
        <Button
          label="Add Random Item"
          onClick={() =>
            setList([...list, { id: Date.now(), name: `Task ${list.length + 1}` }])
          }
        />
      </Card>
    </div>
  );
}

export default App;
