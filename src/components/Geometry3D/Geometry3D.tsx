import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

interface Object3DProps {
  rotation?: number;
  position?: [number, number, number];
  geometryFigureName: GeometryFigureNameType;
  color: string;
}

interface Rotation {
  rotation: { x: number; y: number; z: number };
}

export type GeometryFigureNameType = 'cube' | 'cone' | 'dodecahedron';

export function Geometry3D({
  rotation = 0,
  geometryFigureName,
  color,
  position
}: Object3DProps) {
  const [active, setActive] = useState(false);
  const meshRef = useRef<Rotation>();

  useFrame((_, delta) => {
    meshRef.current!.rotation.z = -rotation * (Math.PI / 180);

    if (active) {
      meshRef.current!.rotation.x = delta;
      meshRef.current!.rotation.y += delta;
    }
  });

  const geometricFigurePicker = () => {
    switch (geometryFigureName) {
      case 'cone':
        return (
          <>
            <coneGeometry args={[0.5, 1]} />
            <meshStandardMaterial color={color} />
          </>
        );
      case 'cube':
        return (
          <>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
          </>
        );
      case 'dodecahedron':
        return (
          <>
            <dodecahedronGeometry args={[0.8, 0, 0]} />
            <meshStandardMaterial color={color} />
          </>
        );
      default:
        return <></>;
    }
  };
  return (
    <mesh
      rotation={[0, 0, rotation]}
      ref={meshRef}
      position={position}
      onClick={() => setActive(!active)}
    >
      {geometricFigurePicker()}
    </mesh>
  );
}
