/**
 * Interface for truncate options
 */
interface TruncateOptions {
  /** Maximum length before truncation */
  length?: number
  /** String to append after truncation */
  suffix?: string
  /** Whether to preserve whole words */
  preserveWords?: boolean
  /** Truncate from start (true) or end (false) */
  fromStart?: boolean
  /** Whether to handle HTML tags */
  html?: boolean
}

/**
 * Default options for truncation
 */
const DEFAULT_OPTIONS: Required<TruncateOptions> = {
  length: 30,
  suffix: '...',
  preserveWords: false,
  fromStart: true,
  html: false,
}

/**
 * Utility function to truncate text with various options
 * @param text - The text to truncate
 * @param options - Configuration options
 * @returns Truncated text
 */
const truncate = (text: string | null | undefined, options: TruncateOptions = {}): string => {
  // Merge default options with provided options
  const config: Required<TruncateOptions> = { ...DEFAULT_OPTIONS, ...options }
  const { length, suffix, preserveWords, fromStart, html } = config

  // Handle invalid input
  if (!text || typeof text !== 'string') {
    return ''
  }

  // Return original text if it's shorter than the limit
  if (text.length <= length) {
    return text
  }

  // Handle HTML content
  if (html) {
    // Simple HTML tag stripping for length calculation
    const stripHtml = (str: string): string => str.replace(/<[^>]*>/g, '')
    const textContent = stripHtml(text)

    if (textContent.length <= length) {
      return text
    }

    // More complex HTML handling
    let stripped = ''
    let tagStack: string[] = []
    let contentLength = 0

    for (
      let i = fromStart ? 0 : text.length - 1;
      fromStart ? i < text.length : i >= 0;
      fromStart ? i++ : i--
    ) {
      const char = text[i]

      if (char === '<') {
        const tagEnd = text.indexOf('>', i)
        const tag = text.slice(i, tagEnd + 1)
        if (tag.match(/^<\//)) {
          tagStack.push(tag)
        } else {
          tagStack.pop()
        }
        stripped += tag
        i = tagEnd
        continue
      }

      if (contentLength < length) {
        stripped += char
        contentLength++
      } else {
        break
      }
    }

    // Close any remaining open tags
    tagStack.reverse().forEach((tag) => {
      stripped += tag
    })

    return fromStart ? stripped + suffix : suffix + stripped
  }

  // Handle word preservation
  if (preserveWords) {
    const words = fromStart ? text.split(' ') : text.split(' ').reverse()
    let truncated = ''

    if (fromStart) {
      for (const word of words) {
        if ((truncated + word).length <= length) {
          truncated += (truncated ? ' ' : '') + word
        } else {
          break
        }
      }
      return truncated + (truncated.length < text.length ? suffix : '')
    } else {
      for (const word of words) {
        if ((truncated + word).length <= length) {
          truncated = word + (truncated ? ' ' : '') + truncated
        } else {
          break
        }
      }
      return (truncated.length < text.length ? suffix : '') + truncated
    }
  }

  // Simple truncation without word preservation
  return fromStart ? text.slice(0, length) + suffix : suffix + text.slice(-length)
}

export type { TruncateOptions }
export { truncate }
