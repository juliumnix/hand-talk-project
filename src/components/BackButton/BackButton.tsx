import { Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface BackButtonProps {
  isWhite?: boolean;
}
export function BackButton({ isWhite }: BackButtonProps) {
  const navigation = useNavigation();
  return (
    <Pressable style={{ paddingTop: 8 }} onPress={() => navigation.goBack()}>
      <Ionicons
        name="arrow-back"
        size={32}
        color={isWhite ? 'white' : 'black'}
      />
    </Pressable>
  );
}
