import Link from 'next/link'
import Logo from './Logo'

const Header = () => {
  return (
    <div className="flex justify-between p-3 mb-10 md:mb-0 md:p-10 items-center">
      <Logo className="h-8 md:h-auto" />
      <div className="flex items-center">
        <Link href="https://twitter.com/rodeoNFT">
          <a target="_blank" className="px-2 md:px-4 md:py-4">
            Twitter
          </a>
        </Link>
        {/* <Link href="https://docs.token.rodeo/docs/">
          <a target="_blank" className="px-2 md:px-10 md:py-4">
            Docs
          </a>
        </Link> */}
        <Link href="https://github.com/rodeoNFT/gallery">
          <a
            target="_blank"
            className="ml-2 px-3 p-2 md:px-10 md:py-4 bg-black text-white rounded"
          >
            Github
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Header
