import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Line, Circle, Text } from 'react-konva';
import background from './darkmap.png';

const Map = ({ graph_data, poi_data, ext_data, direction }) => {
  const scaleFactor = 950;
  const layerRef = useRef(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [centerNodeId, setCenterNodeId] = useState(3497460947);
  const backgroundX = offsetX;
  const backgroundY = offsetY;

  // Button Handling
  useEffect(() => {
    switch(direction){
      case "UP":
        console.log("Direction changed:", direction);
        break;
      case "DOWN":
        console.log("Direction changed:", direction);
        break;
      case "LEFT":
        console.log("Direction changed:", direction);
        break;
      case "RIGHT":
        console.log("Direction changed:", direction);
        break;
    }
  }, [direction]);
  
  

  const nodes = graph_data.nodes.map(node => ({
    ...node,
    x: node.x * scaleFactor - offsetX + 350,
    y: node.y * scaleFactor - offsetY - 480,
  }));

  const pois = poi_data.POIs.map(poi => ({
    ...poi,
    x: poi.x * scaleFactor - offsetX + 350,
    y: poi.y * scaleFactor - offsetY - 480,
  }));

  const ext_nodes = ext_data.nodes.map(node => ({
    ...node,
    neighbours : node.neighbours,
  }));

  const getNodeById = id => nodes.find(node => node.id === id);
  const getExtNodeById = id => ext_nodes.find(node => node.id === id);
  
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
      case 32: // Space bar
        setCenterNodeId(prevCenterNodeId => {
          const currentIndex = graph_data.nodes.findIndex(node => node.id === prevCenterNodeId);
          const nextIndex = (currentIndex + 1) % graph_data.nodes.length;
          const nextCenterNode = graph_data.nodes[nextIndex];
          setOffsetX(nextCenterNode.x * scaleFactor - width / 2);
          setOffsetY(nextCenterNode.y * scaleFactor - height / 2);
          return nextCenterNode.id;
        });
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
    <Stage
      width={width}
      height={height}
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: `-${backgroundX}px -${backgroundY}px`}}
    >
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
            radius={node.id === centerNodeId ? 5 : 1}
            fill={node.id === centerNodeId ? 'red' : 'white'}
            stroke="white"
            strokeWidth={node.id === centerNodeId ? 0.5 : 1}
          />
        ))}

        {pois.map((poi, index) => (
          <Circle
            key={index}
            x={poi.x}
            y={poi.y}
            radius={5}
            fill="green"
            stroke="white"
            strokeWidth={0.5}
          />
        ))}

        {pois.map((poi, index) => (
          <Text
            key={index}
            x={poi.x}
            y={poi.y}
            text={poi.name}
            fontSize={8}
            fontFamily="Arial"
            fill="black"
            align="left"
            verticalAlign="middle"
            offsetX={16}
            offsetY={-6}
          />
        ))}


        

      </Layer>
    </Stage>
  );
};

export default Map;
