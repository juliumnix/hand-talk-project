import { Canvas } from '@react-three/fiber';
import Geometry3D from '../../components/Geometry3D/Geometry3D';

export default function RenderScreen() {
  return (
    <Canvas style={{ backgroundColor: 'black' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <Geometry3D geometryFigureName="cube" color="red" position={[0, 2, 0]} />

      <Geometry3D
        geometryFigureName="cone"
        color="yellow"
        rotation={90}
        position={[0, 0, 0]}
      />

      <Geometry3D
        geometryFigureName="cone"
        color="green"
        position={[0, -2, 0]}
      />
    </Canvas>
  );
}
