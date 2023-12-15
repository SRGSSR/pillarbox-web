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
   * @param {function} [options.next] - (Optional) A function that, when defined, resolves the next level
   *                                    of the hierarchy asynchronously.
   */
  constructor({ title, nodes, resolve = undefined, next = undefined }) {
    this.title = title;
    this.nodes = nodes;
    this.resolve = resolve;
    this.next = next;
  }

  /**
   * Checks if the node is a leaf node (i.e., has no further levels to resolve).
   *
   * @returns {boolean} True if the node is a leaf node, false otherwise.
   */
  isLeaf() {
    return !this.resolve;
  }

  /**
   * Fetch more nodes from the next function if available.
   * @param signal
   * @returns {Promise<*>}
   */
  async fetchNext(signal = undefined) {
    if (!this.next) return;
    const data = await this.next(signal);

    this.next = data.next;
    this.nodes.push(...data.results);

    return data.results;
  }
}

const toNodesAndNext = (data) =>  ({ nodes: data.results, next: data.next });

/**
 * An asynchronous tree-like structure that allows traversing the SRG SSR content
 * by category in a hierarchical fashion.
 *
 * @type {Section[]}
 */
export const listsSections = [
  new Section({
    title: 'TV Topics',
    nodes: ['RSI', 'RTR', 'RTS', 'SRF', 'SWI'],
    resolve: async (bu) => new Section({
      title: `${bu} TV Topics`,
      nodes: await ilProvider.topics(bu),
      resolve: async (topic) => new Section({
        title: topic.title,
        ...toNodesAndNext(await ilProvider.latestByTopic(topic.urn))
      })
    })
  }),
  new Section({
    title: 'TV Shows',
    nodes: ['RSI', 'RTR', 'RTS', 'SRF', 'SWI'],
    resolve: async (bu) => new Section({
      title: `${bu} TV Shows`,
      nodes: await ilProvider.shows(bu),
      resolve: async (show) => new Section({
        title: show.title,
        ...toNodesAndNext(await ilProvider.latestByShow(show.urn))
      })
    })
  }),
  new Section({
    title: 'TV Latest Videos',
    nodes: ['RSI', 'RTR', 'RTS', 'SRF'],
    resolve: async (bu) => new Section({
      title: `${bu} TV Latest Videos`,
      ...toNodesAndNext(await ilProvider.editorial(bu))
    })
  }),
  new Section({
    title: 'TV Livestreams',
    nodes: ['RSI', 'RTR', 'RTS', 'SRF'],
    resolve: async (bu) => new Section({
      title: `${bu} TV Livestreams`,
      nodes: await ilProvider.livestreams(bu)
    })
  }),
  new Section({
    title: 'Live web',
    nodes: ['RSI', 'RTR', 'RTS', 'SRF'],
    resolve: async (bu) => new Section({
      title: `${bu} Live web`,
      ...toNodesAndNext(await ilProvider.scheduledLivestream(bu))
    })
  }),
  new Section({
    title: 'Live center',
    nodes: ['RSI', 'RTR', 'RTS', 'SRF'],
    resolve: async (bu) => new Section({
      title: `${bu} Live center`,
      nodes: await ilProvider.livecenter(bu)
    })
  }),
  new Section({
    title: 'Radio Shows',
    nodes: ['RSI', 'RTR', 'RTS', 'SRF'],
    resolve: async (bu) => new Section({
      title: `${bu} Radio Channels`,
      nodes: await ilProvider.channels(bu),
      resolve: async (channel) => new Section({
        title: `${channel.title} Radio shows`,
        nodes: await ilProvider.radioShowByChannel(bu, channel.id),
        resolve: async (show) => new Section({
          title: show.title,
          ...toNodesAndNext(await ilProvider.latestByShow(show.urn))
        })
      })
    })
  }),
  new Section({
    title: 'Radio Livestreams',
    nodes: ['RSI', 'RTR', 'RTS', 'SRF'],
    resolve: async (bu) => new Section({
      title: `${bu} Radio Livestreams`,
      nodes: await ilProvider.livestreams(bu, 'audio')
    })
  })
];
