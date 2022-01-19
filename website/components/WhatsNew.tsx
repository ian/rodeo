import { useEffect, useState } from 'react'
import Link from 'next/link'

type Props = { className?: string }

export default function WhatsNew(props: Props) {
  const [version, setVersion] = useState()

  useEffect(() => {
    getPackageVersion()
  }, [])

  const getPackageVersion = () => {
    const url = 'https://api.npms.io/v2/package/giddyup'
    fetch(url)
      .then((res) => res.json())
      .then((data) => setVersion(data.collected.metadata.version))
  }

  return (
    <div
      className={[
        'flex flex-col md:flex-row md:justify-between',
        props.className
      ].join(' ')}
    >
      <span className="bg-white flex w-1/2 md:w-auto items-center m-auto md:ml-0 bg-opacity-50 py-2 px-4 rounded-full whitespace-nowrap">
        <img
          src={require('../assets/bell-icon.svg')}
          alt="Icon Bell"
          className="mr-1"
        />
        What's New
      </span>
      <Link href="https://github.com/rodeoNFT/gallery">
        <a
          target="_blank"
          rel="nofollow"
          className="p-2 m-auto md:mr-0 flex items-center"
        >
          <span className="self-center">Just shipped version {version} </span>
          <img
            src={require('../assets/right-anchor.svg')}
            className="ml-2 h-4"
          />
        </a>
      </Link>
    </div>
  )
}
