import {
  buildBlock,
  decorateBlocks,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateTemplateAndTheme,
  loadBlocks,
  loadCSS,
  loadFooter,
  loadHeader,
  sampleRUM,
  toClassName,
  waitForLCP
} from './aem.js'

// add your LCP blocks to the list
const LCP_BLOCKS = []

/**
 * Gets all the metadata elements that are in the given scope.
 * @param {String} scope The scope/prefix for the metadata
 * @returns an array of HTMLElement nodes that match the given scope
 */
export function getAllMetadata(scope) {
  return [
    ...document.head.querySelectorAll(`meta[property^="${scope}:"],meta[name^="${scope}-"]`)
  ].reduce((res, meta) => {
    const id = toClassName(
      meta.name
        ? meta.name.substring(scope.length + 1)
        : meta.getAttribute('property').split(':')[1]
    )
    res[id] = meta.getAttribute('content')
    return res
  }, {})
}

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
  const h1 = main.querySelector('h1')
  const picture = main.querySelector('picture')
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING) {
    const section = document.createElement('div')
    section.append(buildBlock('hero', { elems: [picture, h1] }))
    main.prepend(section)
  }
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`)
  try {
    if (!window.location.hostname.includes('localhost'))
      sessionStorage.setItem('fonts-loaded', 'true')
  } catch (e) {
    // do nothing
  }
}

function autolinkModals(element) {
  element.addEventListener('click', async (e) => {
    const origin = e.target.closest('a')

    if (origin && origin.href && origin.href.includes('/modals/')) {
      e.preventDefault()
      const { openModal } = await import(`${window.hlx.codeBasePath}/blocks/modal/modal.js`)
      openModal(origin.href)
    }
  })
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    buildHeroBlock(main)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error)
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main)
  decorateIcons(main)
  buildAutoBlocks(main)
  decorateSections(main)
  decorateBlocks(main)
}

export function preloadFile(href, as) {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = as
  link.crossOrigin = 'anonymous'
  link.href = href
  document.head.appendChild(link)
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  decorateTemplateAndTheme()

  const main = doc.querySelector('main')
  if (main) {
    decorateMain(main)
    document.body.classList.add('appear')
    await waitForLCP(LCP_BLOCKS)
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts()
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  autolinkModals(doc)

  const main = doc.querySelector('main')
  await loadBlocks(main)

  const { hash } = window.location
  const element = hash ? doc.getElementById(hash.substring(1)) : false
  if (hash && element) element.scrollIntoView()

  const header = doc.querySelector('.header')
  if (header) loadHeader(header)
  const footer = doc.querySelector('.footer')
  if (footer) loadFooter(footer)

  await Promise.all([loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`), loadFonts()])

  sampleRUM('lazy')
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'))
  sampleRUM.observe(main.querySelectorAll('picture > img'))
}

export async function fetchIndex(indexFile, pageSize = 500) {
  const handleIndex = async (offset) => {
    const resp = await fetch(`/${indexFile}.json?limit=${pageSize}&offset=${offset}`)
    const json = await resp.json()

    const newIndex = {
      complete: json.limit + json.offset === json.total,
      offset: json.offset + pageSize,
      promise: null,
      data: [...window.index[indexFile].data, ...json.data]
    }

    return newIndex
  }

  window.index = window.index || {}
  window.index[indexFile] = window.index[indexFile] || {
    data: [],
    offset: 0,
    complete: false,
    promise: null
  }

  // Return index if already loaded
  if (window.index[indexFile].complete) {
    return window.index[indexFile]
  }

  // Return promise if index is currently loading
  if (window.index[indexFile].promise) {
    return window.index[indexFile].promise
  }

  window.index[indexFile].promise = handleIndex(window.index[indexFile].offset)
  const newIndex = await window.index[indexFile].promise
  window.index[indexFile] = newIndex

  return newIndex
}

/**
 * Check if consent was given for a specific topic.
 * @param {*} topic Topic identifier
 * @returns {boolean} True if consent was given
 */
export function getConsent() {
  console.warn('getConsent not implemented')
  return true
}

async function loadPage() {
  await loadEager(document)
  await loadLazy(document)
}

window.edegeLoadPage = async () => {
  const main = document.querySelector('main')

  if (main) {
    await loadEager(document)
    await loadBlocks(main)
  }
}

loadPage()
