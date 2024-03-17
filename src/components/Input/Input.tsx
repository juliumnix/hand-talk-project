import {
  StyleSheet,
  TextInputProps,
  TextInput,
  ViewProps,
  StyleProp,
  ViewStyle
} from 'react-native';

interface InputProps extends TextInputProps {
  style?: ViewStyle;
}
export function Input({ style, ...InputProps }: InputProps) {
  return <TextInput style={[styles.container, style]} {...InputProps} />;
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    width: '50%',
    borderColor: '#adb5bd',
    color: '#212529',
    marginBottom: 16
  }
});
