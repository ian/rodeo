![Banner](docs/banner.png)

# Rodeo - A static-site-generator for NFT Galleries

Rodeo is a static site generator (SSG) that builds a gallery of your collected and created NFTs to showcase on your website.

<!-- ![GitHub Logo](docs/console.gif) -->

# Installation

Use the giddyup package to start the installation process

```
npm -i giddyup
```

Enter project details

```
cd myproject
yarn dev
```

And you have your server up and running on http://localhost:8080

Edit the template in ./site and your changes will automatically be updated.

Additional documentation can be found at [https://app.gitbook.com/@tokenrodeo/s/docs/](https://app.gitbook.com/@tokenrodeo/s/docs/)

# Features

After launching it for the first time and authenticating with your wallet, Rodeo fetches all of the pictures and various metadata for the collection of NFTs stored in it.

## Quick setup

Rodeo uses WalletConnect to quickly fetch data for all of the assets stored in the authenticated wallet. Note: we only link to those assets and do not in any way interact with them such that they could become lost, traded, stolen, etc.

## Pick & choose what you want to display

Once a wallet is set up, you can choose which assets to display—by default Token Rodeo will display all of them.

## Custom themes (COMING SOON)

After picking which assets you want to display in your gallery, you can choose a theme that best showcases your work. You'll be set up with our default initially, but there will be more themes to choose from in the future.

## Lightning fast static site

With assets and a theme selected, Rodeo will generate your custom static site which can be quickly deployed on a hosting service of your choosing (our pick for this is Netlify). It's all compiled with the Eleventy static site generator and is designed for a super clean and fast experience for your viewers.
