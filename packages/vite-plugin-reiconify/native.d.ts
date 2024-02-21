import type {SvgProps} from 'react-native-svg'

declare module '*?react' {
  const Icon: React.FC<SVGProps & {size?: string | number}>
  export default Icon
}
