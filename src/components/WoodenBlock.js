import {useBox} from "use-cannon";
import React from "react";
import {useLoader} from "react-three-fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import woodImg from "../assets/wood/dark.jpg";

const widthBlock = 4;
const heightBlock = 2;
const depthBlock = 12;

export function WoodenBlock ({position, rotation}, ) {
  const texture = useLoader(TextureLoader, woodImg);

  const [ref, api] = useBox(() => ({
    mass: 1,
    position: position,
    rotation: rotation,
    args: [widthBlock, heightBlock, depthBlock]
  }))

  return (
    <mesh castShadow ref={ref} onClick={() => {
      api.velocity.set(0, 2, 0)
    }}>
      <boxBufferGeometry attach="geometry" args={[widthBlock, heightBlock, depthBlock]}  />
      <meshStandardMaterial map={texture} attachArray="material" />
      <meshStandardMaterial map={texture} attachArray="material" />
      <meshStandardMaterial map={texture} attachArray="material" />
      <meshStandardMaterial map={texture} attachArray="material" />
      <meshStandardMaterial map={texture} attachArray="material" />
      <meshStandardMaterial map={texture} attachArray="material" />
    </mesh>
  );
}

export function WoodenTower () {
  const rows = 18;
  const cols = 3;

  const elems = [];

  for (let i = 0; i < rows; i++) {


    for (let j = 0; j < cols; j++) {
      const transformBlock = {};
      if (i%2 === 0) {
        transformBlock.position = [widthBlock * j, 0.1 + heightBlock/2+(i * heightBlock), 0]
        transformBlock.rotation = [0, 0, 0]
      } else {
        transformBlock.position = [widthBlock, 0.1 + heightBlock/2+(i * heightBlock), (1-j) * widthBlock]
        transformBlock.rotation = [0, Math.PI/2, 0];
      }
      elems.push(transformBlock);
    }

  }


  return <>
    {elems.map((elem, index) => <WoodenBlock key={index+1} position={elem.position} rotation={elem.rotation} />)}
  </>;
}
