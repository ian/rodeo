import SubscribeForm from './SubscribeForm'
import WhatsNew from './WhatsNew'

const HeroContent = () => {
  return (
    <div className="">
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-6 p-3 md:p-10">
          <WhatsNew className="mb-10" />
          <h1 className="text-5xl text-center md:text-left md:text-7xl font-extrabold mb-10">
            The Static Site Generator for NFTs
          </h1>
          <p className="text-lg md:text-3xl text-center md:text-left font-light text-black mb-10">
            Easily create a personal gallery that you own and deploy anywhere.
            Wrangle up all your NFTs 🤠
          </p>
          <SubscribeForm />
        </div>
        <div className="col-span-12 md:col-span-6 p-5 pb-0 md:p-0">
          <img
            className="hidden md:block"
            src={require('../assets/browser.png')}
            alt="browser"
          />
          <img
            src={require('../assets/browser-mobile.png')}
            alt="browser"
            className="md:hidden"
          />
        </div>
      </div>
    </div>
  )
}

export default HeroContent
