# Structure

## Templates

Two template files are required: `index.hbs` and `token.hbs`. Everything else is optional.

We set you up with `default.hbs` as a base layout for your theme and we recommend getting started there.

Theme templates are hierarchical, so one template can extend another template. This prevents base HTML from being repeated. Here are some commonly used templates and their uses:

### default.hbs

`default.hbs` is the starter kit that gets you set up with `<html>`, `<head>` or `<body>` on every page, in addition to the required `{{rodeo_head}}` and `{{ghost_foot}}`.

### index.hbs

This is the basic setup for a list of assets. It can be configured to look like a gallery, a list, or any display setup that you'd like. `index.hbs` template pairs with `default.hbs` and lists of tokens get set up with the `{{#foreach}}` helper.

### home.hbs

This can be used if you want to have a homepage that doesn't just land directly on the default `index.hbs` list. It's only valid at the base directory, available at `/`.

### token.hbs

This template is used to display a single token, which is used alongisde `default.hbs`. It uses the `{{#token}}` helper to add all of the various metadata and details about the token.

### tag.hbs

Tag template pages work similar to `index.hbs` but sets up a unique style for a given tag. Otherwise tag pages default ot the list style of choice.

### wallet.hbs

Similar to the `tag.hbs` template, this allows a given wallet address to have its own index style. This is more useful in sites that have multiple wallets configured.

### error.hbs

This is the default template used in the event that the user encounters an error, so long as a template with a specific error code is not set up.

### **error-{{error-code}}.hbs**

This is an optional theme for error-code specific pages. So if you want to set up a funny `404` look no further!

### **robots.txt**

By default, Rodeo sets you up with a `robots.txt` file, but if you'd like to customize it this is where you'd do it.  


