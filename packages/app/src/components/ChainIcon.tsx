import Image from 'next/image'
interface IChainIcon {
  name?: string
  iconUrl: string
}
export const ChainIcon = ({ name, iconUrl }: IChainIcon) => {
  return <Image alt={name ?? 'Chain icon'} src={iconUrl} width={20} height={20} />
}
