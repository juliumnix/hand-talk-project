import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function App() {
  const Box = (props: JSX.IntrinsicElements['mesh']) => {
    const meshRef = useRef<any>();
    useFrame((state, delta) => {
      meshRef.current!.rotation.x = Math.PI / 4;
      meshRef.current!.rotation.z += delta; // Rotação para deixar a parte de cima deitada
      meshRef.current!.rotation.y += delta;
    });
    return (
      <mesh {...props} ref={meshRef}>
        <coneGeometry />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    );
  };

  return (
    <Canvas style={{ backgroundColor: 'black' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box />
    </Canvas>
  );
}
