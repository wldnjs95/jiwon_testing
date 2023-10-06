import styles from './searchBox.module.css'
import Image from 'next/image';

export default function SearchBox() {
    return (
    <div className={styles['search-box']}>
        <input className={styles['search-input']}
        type='text' 
        placeholder='Search for ...'>
        </input>
        <button className={styles['search-icon']}>
            <Image src='/searchicon.svg' width={30} height={30}/>
        </button>
    </div>
    )
  }