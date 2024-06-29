import { CardList } from '@/components/CardList'
import { SITE_DESCRIPTION, SITE_NAME } from '@/utils/site'
import { EXAMPLE_ITEMS } from './examples/examples'
import Bridge from '@/components/Bridge'

export default function Home() {
  return (
    <>
      <h2 className='text-2xl mb-2'>{SITE_NAME}</h2>
      <p>{SITE_DESCRIPTION}</p>
      <div className='mt-4'>
        <Bridge />
      </div>
    </>
  )
}
