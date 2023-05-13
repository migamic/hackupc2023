import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Line, Circle } from 'react-konva';

const Map = ({ graph_data }) => {
  const scaleFactor = 200;
  const layerRef = useRef(null);
  const [offsetX, setOffsetX] = useState(-100);
  const [offsetY, setOffsetY] = useState(-100);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const nodes = graph_data.nodes.map(node => ({
    ...node,
    x: node.x * scaleFactor - offsetX,
    y: node.y * scaleFactor - offsetY,
  }));

  const getNodeById = id => nodes.find(node => node.id === id);

  const handleArrowKeyPress = e => {
    switch (e.keyCode) {
      case 37: // Left arrow key
        setOffsetX(prevOffsetX => prevOffsetX - 10);
        break;
      case 38: // Up arrow key
        setOffsetY(prevOffsetY => prevOffsetY - 10);
        break;
      case 39: // Right arrow key
        setOffsetX(prevOffsetX => prevOffsetX + 10);
        break;
      case 40: // Down arrow key
        setOffsetY(prevOffsetY => prevOffsetY + 10);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleArrowKeyPress);
    return () => {
      window.removeEventListener('keydown', handleArrowKeyPress);
    };
  }, []);

  return (
    <Stage width={width} height={height}>
      <Layer ref={layerRef}>
        {graph_data.edges.map((edge, index) => {
          const source = getNodeById(edge.source);
          const target = getNodeById(edge.target);

          return (
            <Line
              key={index}
              points={[source.x, source.y, target.x, target.y]}
              stroke="white"
              strokeWidth={edge.weight}
              text={edge.name}
              fontSize={12}
              fontFamily="Arial"
              lineCap="round"
              />
              );
        })}

        {nodes.map((node, index) => (
          <Circle
            key={index}
            x={node.x}
            y={node.y}
            radius={1}
            fill="white"
            stroke="white"
            strokeWidth={1}
          />
        ))}

      </Layer>
    </Stage>
  );
};

export default Map;
