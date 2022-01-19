import React from 'react'

import Header from '@/components/Header'
import HeroContent from '@/components/HeroContent'
import styles from './Home.module.scss'

const Home = () => {
  return (
    <div className={styles.subscriptionWrapper}>
      <div className={styles.w1}>
        <Header />
        <HeroContent />
      </div>
    </div>
  )
}

export default Home
