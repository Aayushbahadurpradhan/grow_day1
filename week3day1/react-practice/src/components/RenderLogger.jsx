import React, { useRef } from 'react';

function RenderLogger({ label }) {
  const renders = useRef(0);
  renders.current++;
  console.log(`${label} renders:`, renders.current);

  return <p>{label} render count: {renders.current}</p>;
}

export default React.memo(RenderLogger);
