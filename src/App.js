import React, {Suspense} from "react";
import {Canvas, useLoader} from "react-three-fiber";
import {OrbitControls, Stars} from "drei";
import "./styles.css";
import {Physics, usePlane} from "use-cannon";
import {WoodenTower} from "./components/WoodenBlock";
import {DoubleSide} from "three";
import tableImg from "./assets/wood/table.jpg";
import {TextureLoader} from "three/src/loaders/TextureLoader";

function Plane() {
  const texture = useLoader(TextureLoader, tableImg);

  const [ref] = usePlane(() => ({
    rotation: [-Math.PI/2, 0, 0],
    args: [100, 100]
  }))

  return (
    <mesh receiveShadow ref={ref} rotation={[-Math.PI/2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" map={texture} side={DoubleSide} />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas shadowMap>
      <OrbitControls />
      <Stars />
      <ambientLight intensity="0.5" />
      <spotLight  intensity={1} position={[30, 30, 50]} angle={0.8} penumbra={1} castShadow  />
      <Physics>
        <Plane />
        <Suspense fallback={null}>
          <WoodenTower />
        </Suspense>
      </Physics>
    </Canvas>
  );
}
