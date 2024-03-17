import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle
} from 'react-native';

interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  textColor?: string;
}
export function Button({
  onPress,
  text,
  style,
  isLoading,
  textColor
}: ButtonProps) {
  const containerStyle = StyleSheet.compose(styles.container, style);
  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#F8F9FA" />
      ) : (
        <Text style={{ color: textColor ? textColor : '#F8F9FA' }}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#212529',
    height: 40,
    borderRadius: 8
  }
});
