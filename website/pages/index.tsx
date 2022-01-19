import Head from 'next/head'

import Home from '@/views/Home'

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Rodeo - The static site generator (SSG) for NFTs.</title>
        <meta
          name="description"
          content="Easily create a
            personal gallery that you own and deploy anywhere."
        />
      </Head>
      <Home />
    </>
  )
}

export default HomePage
