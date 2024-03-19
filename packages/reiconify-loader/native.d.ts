import type {SvgProps} from 'react-native-svg'

declare module '*.svg?react' {
  const Icon: React.FC<SVGProps & {size?: string | number}>
  export default Icon
}
