Pillarbox's ability to decode and play specific media formats relies on the browser's built-in
capabilities. Codec support can vary among different browsers.

To delve deeper into how codecs work and to check the most up-to-date information, you can refer to
the following online resources:

- [Video.js HTML5 Video Support][html5-video-support] - A comprehensive overview of HTML5 codec
  support by browser.
- [MSDN Working with media in HTML5][msdn-html5-media] - Also provides insights into supported media
  formats in HTML5.
- [Video Codecs - MDN Web Docs][mdn-video-codecs] - In-depth explanation of video codecs and their
  usage in browsers.

### Adaptive Streaming Support

Adaptive streaming refers to the dynamic adjustment of bandwidth and, usually, the quality of a
media stream in real-time, responding to the user's available bandwidth.

Pillarbox supports adaptive media streaming by harnessing the capabilities of
the [videojs/http-streaming][videojs-http-streaming] library. Refer to the
following [Compatibility Chart][compatibility-chart] for a breakdown of compatibility with various
browsers; consider checking the library's documentation for the latest information.

### DRM Support

Pillarbox provides Digital Rights Management (DRM) support via
the [videojs/videojs-contrib-eme][videojs-contrib-eme] library. Consider checking the library's
documentation for the latest information.

[html5-video-support]: https://videojs.com/html5-video-support/
[msdn-html5-media]: https://learn.microsoft.com/en-us/archive/msdn-magazine/2011/november/html5-working-with-media-in-html5#supported-media-formats-in-html5
[mdn-video-codecs]: https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs
[videojs-http-streaming]: https://github.com/videojs/http-streaming
[compatibility-chart]: https://github.com/videojs/http-streaming/tree/main?tab=readme-ov-file#compatibility
[videojs-contrib-eme]: https://github.com/videojs/videojs-contrib-eme
