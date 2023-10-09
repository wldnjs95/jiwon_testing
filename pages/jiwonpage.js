import Image from 'next/image'
import styles from './jiwonpage.module.css'
import Searchbox from './searchBox.js'
import Link from 'next/link'


export default function Home() {
    return (
        <div className={styles['search-list']}>

            <div className={styles['navbar']}>
                <Link href="#" className={styles['login-text']}>
                    Login  {/* 로그인 페이지로 이동하는 링크 */}
                </Link>
            </div>

            <div className={styles['ut-logo']}>
                <Image src="/UT_logo.svg" alt="UT Logo SVG" width={841} height={65} />
            </div>

            <Searchbox />

            <div className={styles['filter']}>
                <p className={styles['filter-title']}>
                    Filter by ...
                </p>
                <div className={styles['filters-row']}>
                    <div className={styles['filter-department']}>
                        <input className={styles['filter-input']}
                            type='text'
                            placeholder='Department'>
                        </input>
                        <button className={styles['filter-icon']}>
                            <Image src='/arrowdown.svg' width={11} height={5} />
                        </button>
                    </div>

                    <div className={styles['filter-course']}>
                        <input className={styles['filter-input']}
                            type='text'
                            placeholder='Course'>
                        </input>
                        <button className={styles['filter-icon']}>
                            <Image src='/arrowdown.svg' width={11} height={5} />
                        </button>
                    </div>

                    <div className={styles['filter-professor']}>
                        <input className={styles['filter-input']}
                            type='text'
                            placeholder='Professor'>
                        </input>
                        <button className={styles['filter-icon']}>
                            <Image src='/arrowdown.svg' width={11} height={5} />
                        </button>
                    </div>

                </div> {/*filters-row*/}
            </div> {/*filter div*/}

            <div className={styles['grouped-list']}>
                <div className={styles['list-box']}>

                </div>
            </div>



        </div>
    )
}

