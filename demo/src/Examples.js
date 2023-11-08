export const EXAMPLES = {
  'SRGSSR': [
    {
      'title': 'Horizontal video',
      'src': 'urn:rts:video:6820736',
      'type': 'srgssr/urn'
    },
    {
      'title': 'Square video',
      'src': 'urn:rts:video:8393241',
      'type': 'srgssr/urn'
    },
    {
      'title': 'Vertical video',
      'src': 'urn:rts:video:13444390',
      'type': 'srgssr/urn'
    },
    {
      'title': 'Token-protected video',
      'description': 'Ski alpin, Slalom Messieurs',
      'src': 'urn:swisstxt:video:rts:c56ea781-99ad-40c3-8d9b-444cc5ac3aea',
      'type': 'srgssr/urn'
    },
    {
      'title': 'Superfluously token-protected video',
      'description': 'Telegiornale flash',
      'src': 'urn:rsi:video:15916771',
      'type': 'srgssr/urn'
    },
    {
      'title': 'DRM-protected video',
      'description': 'Top Models 8870',
      'src': 'urn:rts:video:13639837',
      'type': 'srgssr/urn'
    },
    {
      'title': 'Live video',
      'description': 'SRF 1',
      'src': 'urn:srf:video:c4927fcf-e1a0-0001-7edd-1ef01d441651',
      'type': 'srgssr/urn'
    },
    {
      'title': 'DVR video livestream',
      'description': 'RTS 1',
      'src': 'urn:rts:video:3608506',
      'type': 'srgssr/urn'
    },
    {
      'title': 'DVR audio livestream',
      'description': 'Couleur 3 (DVR)',
      'src': 'urn:rts:audio:3262363',
      'type': 'srgssr/urn'
    },
    {
      'title': 'On-demand audio stream',
      'description': 'Il lavoro di TerraProject per una fotografia documentaria',
      'src': 'urn:rsi:audio:8833144',
      'type': 'srgssr/urn'
    },
    {
      'title': 'Expired URN',
      'description': 'Content that is not available anymore',
      'src': 'urn:rts:video:13382911',
      'type': 'srgssr/urn'
    },
    {
      'title': 'Unknown URN',
      'description': 'Content that does not exist',
      'src': 'urn:srf:video:unknown',
      'type': 'srgssr/urn'
    }
  ],
  'HLS': [
    {
      'title': 'VOD - HLS',
      'description': 'Switzerland says sorry! The fondue invasion',
      'src': 'https://swi-vod.akamaized.net/videoJson/47603186/master.m3u8'
    },
    {
      'title': 'VOD - HLS (short)',
      'description': 'Des violents orages ont touché Ajaccio, chef-lieu de la Corse, jeudi',
      'src': 'https://rts-vod-amd.akamaized.net/ww/13317145/f1d49f18-f302-37ce-866c-1c1c9b76a824/master.m3u8'
    },
    {
      'title': 'Brain Farm Skate Phantom Flex',
      'description': '4K video',
      'src': 'https://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8'
    },
    {
      'title': 'Video livestream - HLS',
      'description': 'Couleur 3 en vidéo (live)',
      'src': 'https://rtsc3video.akamaized.net/hls/live/2042837/c3video/3/playlist.m3u8?dw=0'
    },
    {
      'title': 'Video livestream with DVR - HLS',
      'description': 'Couleur 3 en vidéo (DVR)',
      'src': 'https://rtsc3video.akamaized.net/hls/live/2042837/c3video/3/playlist.m3u8'
    },
    {
      'title': 'Video livestream with DVR and timestamps - HLS',
      'description': 'Tageschau',
      'src': 'https://tagesschau.akamaized.net/hls/live/2020115/tagesschau/tagesschau_1/master.m3u8'
    },
    {
      'title': 'Audio livestream - HLS',
      'description': 'Couleur 3 (DVR)',
      'src': 'https://lsaplus.swisstxt.ch/audio/couleur3_96.stream/playlist.m3u8'
    },
    {
      'title': 'Apple Basic 4:3',
      'description': '4x3 aspect ratio, H.264 @ 30Hz',
      'src': 'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_4x3/bipbop_4x3_variant.m3u8'
    },
    {
      'title': 'Apple Basic 16:9',
      'description': '16x9 aspect ratio, H.264 @ 30Hz',
      'src': 'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9/bipbop_16x9_variant.m3u8'
    },
    {
      'title': 'Apple Advanced 16:9 (TS)',
      'description': '16x9 aspect ratio, H.264 @ 30Hz and 60Hz, Transport stream',
      'src': 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8'
    },
    {
      'title': 'Apple Advanced 16:9 (fMP4)',
      'description': '16x9 aspect ratio, H.264 @ 30Hz and 60Hz, Fragmented MP4',
      'src': 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8'
    },
    {
      'title': 'Apple Advanced 16:9 (HEVC/H.264)',
      'description': '16x9 aspect ratio, H.264 and HEVC @ 30Hz and 60Hz',
      'src': 'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_adv_example_hevc/master.m3u8'
    },
    {
      'title': 'Apple Atmos',
      'src': 'https://devstreaming-cdn.apple.com/videos/streaming/examples/adv_dv_atmos/main.m3u8'
    },
    {
      'title': 'Apple WWDC Keynote 2023',
      'src': 'https://events-delivery.apple.com/0105cftwpxxsfrpdwklppzjhjocakrsk/m3u8/vod_index-PQsoJoECcKHTYzphNkXohHsQWACugmET.m3u8'
    },
    {
      'title': 'Apple tv trailer',
      'description': 'Lot of audios and subtitles choices',
      'src': 'https://play-edge.itunes.apple.com/WebObjects/MZPlayLocal.woa/hls/subscription/playlist.m3u8?cc=CH&svcId=tvs.vds.4021&a=1522121579&isExternal=true&brandId=tvs.sbd.4000&id=518077009&l=en-GB&aec=UHD\n'
    },
    {
      'title': 'Multiple subtitles and audio tracks',
      'description': 'On some devices codec may crash',
      'src': 'https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
    },
    {
      'title': '4K, HEVC',
      'src': 'https://cdn.bitmovin.com/content/encoding_test_dash_hls/4k/hls/4k_profile/master.m3u8'
    },
    {
      'title': 'VoD, single audio track',
      'src': 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
    },
    {
      'title': 'AES-128',
      'src': 'https://bitmovin-a.akamaihd.net/content/art-of-motion_drm/m3u8s/11331.m3u8'
    },
    {
      'title': 'HLS - Fragmented MP4',
      'src': 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8'
    },
    {
      'title': 'HLS - Alternate audio language',
      'src': 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel-multi-lang.ism/.m3u8'
    },
    {
      'title': 'HLS - Audio only',
      'src': 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel-multi-lang.ism/.m3u8?filter=(type!=%22video%22)'
    },
    {
      'title': 'HLS - Trickplay',
      'src': 'https://demo.unified-streaming.com/k8s/features/stable/no-handler-origin/tears-of-steel/tears-of-steel-trickplay.m3u8'
    },
    {
      'title': 'Limiting bandwidth use',
      'src': 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8?max_bitrate=800000'
    },
    {
      'title': 'Dynamic Track Selection',
      'src': 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8?filter=%28type%3D%3D%22audio%22%26%26systemBitrate%3C100000%29%7C%7C%28type%3D%3D%22video%22%26%26systemBitrate%3C1024000%29'
    },
    {
      'title': 'Pure live',
      'src': 'https://demo.unified-streaming.com/k8s/live/stable/live.isml/.m3u8'
    },
    {
      'title': 'Timeshift (5 minutes)',
      'src': 'https://demo.unified-streaming.com/k8s/live/stable/live.isml/.m3u8?time_shift=300'
    },
    {
      'title': 'Live audio',
      'src': 'https://demo.unified-streaming.com/k8s/live/stable/live.isml/.m3u8?filter=(type!=%22video%22)'
    },
    {
      'title': 'Pure live (scte35)',
      'src': 'https://demo.unified-streaming.com/k8s/live/stable/scte35.isml/.m3u8'
    },
    {
      'title': 'fMP4, clear',
      'src': 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel-fmp4.ism/.m3u8'
    },
    {
      'title': 'fMP4, HEVC 4K',
      'src': 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel-hevc.ism/.m3u8'
    },
    {
      'title': 'Test1',
      'description': 'Forced subtitles',
      'src': 'https://prd.vod-srgssr.ch/origin/1053457/fr/master.m3u8?complexSubs=true'
    }
  ],
  'DASH': [
    {
      'title': 'VoD - Dash (H264)',
      'src': 'https://storage.googleapis.com/wvmedia/clear/h264/tears/tears.mpd'
    },
    {
      'title': 'VoD - Dash Widewine cenc (H264)',
      'src': 'https://storage.googleapis.com/wvmedia/cenc/h264/tears/tears.mpd',
      'keySystems': {
        'com.widevine.alpha': 'https://proxy.uat.widevine.com/proxy?video_id=2015_tears&provider=widevine_test'
      }
    },
    {
      'title': 'VoD - Dash (H265)',
      'src': 'https://storage.googleapis.com/wvmedia/clear/hevc/tears/tears.mpd'
    },
    {
      'title': 'VoD - Dash widewine cenc (H265)',
      'src': 'https://storage.googleapis.com/wvmedia/cenc/hevc/tears/tears.mpd',
      'keySystems': {
        'com.widevine.alpha': 'https://proxy.uat.widevine.com/proxy?video_id=2015_tears&provider=widevine_test'
      }
    },
    {
      'title': 'VoD - Dash - MP4',
      'src': 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.mp4/.mpd'
    },
    {
      'title': 'Dash - Fragmented MP4',
      'src': 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.mpd'
    },
    {
      'title': 'Dash - TrickPlay',
      'src': 'https://demo.unified-streaming.com/k8s/features/stable/no-handler-origin/tears-of-steel/tears-of-steel-trickplay.mpd'
    },
    {
      'title': 'Dash - Tiled thumbnails (live/timeline)',
      'src': 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel-tiled-thumbnails-timeline.ism/.mpd'
    },
    {
      'title': 'Dash - Accessibility - hard of hearing',
      'src': 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel-hoh-subs.ism/.mpd'
    },
    {
      'title': 'Dash - Single - fragmented TTML',
      'src': 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel-en.ism/.mpd'
    },
    {
      'title': 'Dash - Multiple - RFC 5646 language tags',
      'src': 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel-rfc5646.ism/.mpd'
    },
    {
      'title': 'Dash - Multiple - fragmented TTML',
      'src': 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel-ttml.ism/.mpd'
    },
    {
      'title': 'Dash - Audio only',
      'src': 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel-multi-lang.ism/.mpd?filter=(type!=%22video%22)'
    },
    {
      'title': 'Dash - Multiple audio codecs',
      'src': 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel-multi-codec.ism/.mpd'
    },
    {
      'title': 'Dash - Alternate audio language',
      'src': 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel-multi-lang.ism/.mpd'
    },
    {
      'title': 'Dash - Accessibility - audio description',
      'src': 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel-desc-aud.ism/.mpd'
    },
    {
      'title': 'Dash - Pure live',
      'src': 'https://demo.unified-streaming.com/k8s/live/stable/live.isml/.mpd'
    },
    {
      'title': 'Dash - Timeshift (5 minutes)',
      'src': 'https://demo.unified-streaming.com/k8s/live/stable/live.isml/.mpd?time_shift=300'
    },
    {
      'title': 'Dash - DVB DASH low latency',
      'src': 'https://demo.unified-streaming.com/k8s/live/stable/live-low-latency.isml/.mpd'
    }
  ],
  'MP4': [
    {
      'title': 'VOD - MP4',
      'description': 'The dig',
      'src': 'https://media.swissinfo.ch/media/video/dddaff93-c2cd-4b6e-bdad-55f75a519480/rendition/154a844b-de1d-4854-93c1-5c61cd07e98c.mp4'
    },
    {
      'title': 'AVC Progressive',
      'src': 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/MI201109210084_mpeg-4_hd_high_1080p25_10mbits.mp4'
    },
    {
      'title': 'Test1',
      'description': 'Forced subtitles',
      'src': 'https://prd.vod-srgssr.ch/origin/1053457/fr/master.m3u8?complexSubs=true'
    }
  ]
};
