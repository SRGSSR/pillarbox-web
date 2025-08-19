In this tutorial, we’ll walk through how to integrate **@srgssr/pillarbox-web** using 
**import maps** and the [esm.sh](https://esm.sh) CDN. This approach ensures that all dependencies 
(like `video.js` and `videojs-contrib-eme`) resolve to a single shared instance, preventing runtime
inconsistencies.

## Setting Up Pillarbox with esm.sh

[esm.sh](https://esm.sh) makes this easy by allowing us to declare **external dependencies**. This
way, both Pillarbox and its plugins share the same `video.js` instance.

Here’s a minimal working example:

```html

<script type="importmap">
  {
    "imports": {
      "video.js": "https://esm.sh/video.js@8.23.3",
      "videojs-contrib-eme": "https://esm.sh/videojs-contrib-eme@5.5.1?external=video.js",
      "@srgssr/pillarbox-web": "https://esm.sh/@srgssr/pillarbox-web@1.23.1?external=video.js,videojs-contrib-eme"
    }
  }
</script>

<script type="module">
  import pillarbox from "@srgssr/pillarbox-web";

  console.log("Pillarbox loaded", pillarbox.VERSION);
</script>
```

### Explanation:

* `video.js` is pinned to version **8.23.3**.
* `videojs-contrib-eme` declares `video.js` as **external**, so it won’t load its own copy.
* `@srgssr/pillarbox-web` declares both `video.js` and `videojs-contrib-eme` as **external**,
  reusing the same instances defined above.

This ensures all dependencies are aligned and avoids duplication.

## Alternative: Using JSPM’s Import Map Generator

If you’d rather not manage dependencies manually, you can generate a ready-to-use import map
with [JSPM Generator](https://generator.jspm.io/).

Simply enter `@srgssr/pillarbox-web` and the plugins you want to use and JSPM will output a verbose 
but working import map that resolves all transitive dependencies.

## Why Import Maps?

When importing modules from a CDN, you risk ending up with **duplicate instances** of shared
dependencies. For example, Pillarbox and `videojs-contrib-eme` both depend on `video.js`. If loaded
separately, you may face issues like plugins not attaching properly because they’re referencing
different `video.js` instances.

**Import maps** solve this by explicitly telling the browser which CDN URLs to use for specific
package names, ensuring consistency.
