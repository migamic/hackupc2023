import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Line, Circle, Text } from 'react-konva';
import Konva from 'konva';
import { interpolate } from 'd3-interpolate';
import background from './darkmap.png';

const Map = ({ graph_data, poi_data, ext_data, direction }) => {
  const scaleFactor = 450;
  const layerRef = useRef(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [centerNodeId, setCenterNodeId] = useState(3497460947);
  const [targetOffset, setTargetOffset] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  const backgroundX = offsetX;
  const backgroundY = offsetY;

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
    x: node.x * scaleFactor - offsetX +350,
    y: node.y * scaleFactor - offsetY -480,
  }));

  const pois = poi_data.POIs.map(poi => ({
    ...poi,
    x: poi.x * scaleFactor - offsetX + 350,
    y: poi.y * scaleFactor - offsetY - 480,
  }));

  const ext_nodes = ext_data.nodes.map(node => ({
    ...node,
    id: node.id,
    x: node.x * scaleFactor - offsetX +350,
    y: node.y * scaleFactor - offsetY -480,
    neighbours : node.neighbours,
  }));

  const getNodeById = id => nodes.find(node => node.id === id);
  const getExtNodeById = id => ext_nodes.find(node => node.id === id);
  const updateCenterNodeId = (newId) => {
    setCenterNodeId(newId);
  };

    const prevOffsetXRef = useRef(offsetX);
    const prevOffsetYRef = useRef(offsetY);

    const animateGraph = (prevOffset, nextOffset, callback) => {
        const animationDuration = 1000;
        const interpolatorX = interpolate(prevOffset.x, nextOffset.x);
        const interpolatorY = interpolate(prevOffset.y, nextOffset.y);
        let startTimestamp;
      
        const step = timestamp => {
          if (!startTimestamp) startTimestamp = timestamp;
          const elapsed = timestamp - startTimestamp;
          const progress = Math.min(elapsed / animationDuration, 1);
          const interpolatedX = interpolatorX(progress);
          const interpolatedY = interpolatorY(progress);
      
          setOffsetX(interpolatedX);
          setOffsetY(interpolatedY);
      
          prevOffsetXRef.current = interpolatedX;
          prevOffsetYRef.current = interpolatedY;
      
          if (progress < 1) {
            animationFrameRef.current = requestAnimationFrame(step);
            if (callback) {
                callback();
              }
          } else {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
          }
        };
      
        animationFrameRef.current = requestAnimationFrame(step);
      };
      
  

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
        e.preventDefault();
        const prevCenterNodeId = centerNodeId;
        const prevCenterNode = getExtNodeById(prevCenterNodeId);
        const nextIndex = prevCenterNode.neighbours[Math.floor(Math.random() * prevCenterNode.neighbours.length)];
        const nextCenterNode = getExtNodeById(nextIndex);
    
        const prevOffset = { x: prevCenterNode.x - width / 2, y: prevCenterNode.y - height / 2 };
        const nextOffset = { x: nextCenterNode.x - width / 2, y: nextCenterNode.y - height / 2 };
        console.log("prev id");
        console.log(centerNodeId);
        animateGraph(prevOffset, nextOffset,() => updateCenterNodeId(nextIndex));
        
        
        //setCenterNodeId(nextCenterNode.id);
        console.log("next id");
        console.log(centerNodeId);
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
            radius={1}
            fill="white"
            stroke="white"
            strokeWidth={1}
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

        <Circle
            x={width/2}
            y={height/2}
            radius={5}
            fill={'red'}
            stroke="white"
            strokeWidth={0.5}
        />
      </Layer>
    </Stage>
  );
};

export default Map;
