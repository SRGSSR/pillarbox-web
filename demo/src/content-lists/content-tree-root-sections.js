import ilProvider from '../core/il-provider';

/**
 * A section within the content hierarchy.
 *
 * @property {string} title - The title of the section node.
 * @property {string[]} values - An array of values associated with the section.
 * @property {function} resolve - A function that, when defined, resolves the next level
 *                                of the hierarchy asynchronously.
 */
class Section {

  /**
   * Creates an instance of Section.
   *
   * @param {Object} options - The options for creating the section.
   * @param {string} options.title - The title of the section.
   * @param {string[]} options.nodes - An array of nodes associated with the section.
   * @param {function} [options.resolve] - (Optional) A function that, when defined, resolves the next level
   *                                       of the hierarchy asynchronously.
   */
  constructor({ title, nodes, resolve = undefined }) {
    this.title = title;
    this.nodes = nodes;
    this.resolve = resolve;
  }

  /**
   * Checks if the node is a leaf node (i.e., has no further levels to resolve).
   *
   * @returns {boolean} True if the node is a leaf node, false otherwise.
   */
  isLeaf() {
    return !this.resolve;
  }
}

/**
 * An asynchronous tree-like structure that allows traversing the SRG SSR content
 * by category in a hierarchical fashion.
 *
 * @type {Section[]}
 */
export const contentTreeRootSections = [
  new Section({
    title: 'TV Topics',
    nodes: ['RSI', 'RTS', 'RTR', 'SRF', 'SWI'],
    resolve: async (bu) => new Section({
      title: `${bu} TV Topics`,
      nodes: await ilProvider.topics(bu),
      resolve: async (topic) => new Section({
        title: topic.title,
        nodes: await ilProvider.latestByTopic(topic.urn)
      })
    })
  }),
  new Section({
    title: 'TV Shows',
    nodes: ['RSI', 'RTS', 'RTR', 'SRF', 'SWI'],
    resolve: async (bu) => new Section({
      title: `${bu} TV Shows`,
      nodes: await ilProvider.shows(bu),
      resolve: async (show) => new Section({
        title: show.title,
        nodes: await ilProvider.latestByShow(show.urn)
      })
    })
  }),
  new Section({
    title: 'TV Latest Videos',
    nodes: ['RSI', 'RTS', 'RTR', 'SRF', 'SWI'],
    resolve: async (bu) => new Section({
      title: `${bu} TV Latest Videos`,
      nodes: await ilProvider.editorial(bu)
    })
  }),
  new Section({
    title: 'TV Livestreams',
    nodes: ['RSI', 'RTS', 'RTR', 'SRF'],
    resolve: async (bu) => new Section({
      title: `${bu} TV Livestreams`,
      nodes: await ilProvider.livestreams(bu)
    })
  }),
  new Section({
    title: 'Live web',
    nodes: ['RSI', 'RTS', 'RTR', 'SRF'],
    resolve: async (bu) => new Section({
      title: `${bu} Live web`,
      nodes: await ilProvider.scheduledLivestream(bu)
    })
  }),
  new Section({
    title: 'Live center',
    nodes: ['RSI', 'RTS', 'RTR', 'SRF'],
    resolve: async (bu) => new Section({
      title: `${bu} Live center`,
      nodes: await ilProvider.livecenter(bu)
    })
  }),
  new Section({
    title: 'Radio Shows',
    nodes: ['RSI', 'RTS', 'RTR', 'SRF'],
    resolve: async (bu) => new Section({
      title: `${bu} Radio Channels`,
      nodes: await ilProvider.channels(bu),
      resolve: async (channel) => new Section({
        title: `${channel.title} Radio shows`,
        nodes: await ilProvider.radioShowByChannel(channel.id),
        resolve: async (show) => new Section({
          title: show.title,
          nodes: await ilProvider.latestByShow(show.urn)
        })
      })
    })
  }),
  new Section({
    title: 'Radio Livestreams',
    nodes: ['RSI', 'RTS', 'RTR', 'SRF'],
    resolve: async (bu) => new Section({
      title: `${bu} Radio Livestreams`,
      nodes: await ilProvider.livestreams(bu, 'audio')
    })
  })
];
