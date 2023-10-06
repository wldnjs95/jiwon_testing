import Image from 'next/image'
import styles from './page.module.css'
import Searchbox from './searchBox.js'


export default function Home() {
  return (
   <div className='search-list'>
      <div className='ut-logo'>
        <Image src="/UT_logo.svg" alt="UT Logo SVG" width={841} height={65} />
       </div>
       <Searchbox/>

       <div className='filter'>
        <span className='filter-title'>
          Filter by ...
        </span>
       </div>
  
  </div>
  )
}

