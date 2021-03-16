---
description: >-
  Whenever you’re viewing a single token, you’re in the token context. This can
  be on individual token pages, as well as within a list view.
---

# Token

Use: `{{#is "token"}}{{/is}}` to detect this context

## Templates

The default template for a token is `token.hbs`, which is a required template in all Token Rodeo themes.

## Token object attributes

* `id` — the Object ID of the token
* `name` — the name of the token
* `type` — the token type
* `description` — the description of the token
* `collection` — the title of the token collection
* `created_by` — the address of the originator of the token
* `owned_by` — the address of the current owner of the token
* `tx_hash` — the hash of the transaction
* `contract_address` — the address to the smart contract
* `contract_name` — the name of the smart contract contract
* `contract_symbol` — the symbol of the smart contract \(e.g. `CK` for CryptoKitties\)
* `token_id` – the token ID \(not to be confused with the `id`\)
* `media` — the media of a given token. Can be an image, video, or audio file.
  * `image_url` — the URL for the image. Renders a static frame if token is a movie.
  * `video_url` — the URL for the video.
  * `audio_url` — the URL for the audio.
* `url` — the web URL for the token page
* `properties` — an array of token properties
* `featured` — indicates if the token is featured. Defaults to `false`.
* `timestamp` — date and time when the token was acquired
* `created_at` — date and time when the token was first created
* `published_at` — date and time when the token was published on the site
* `tags` — an array of tags associated with the token 
* `meta_title` — custom meta title for the token
* `meta_description` — custom meta description for the token

