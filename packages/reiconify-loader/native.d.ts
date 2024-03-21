declare module '*.svg?react' {
  import type {SvgProps} from 'react-native-svg'
  const Icon: React.FC<SvgProps & {size?: string | number}>
  export default Icon
}
