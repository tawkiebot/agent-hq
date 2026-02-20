// Company logo fetching utilities

export interface CompanyInfo {
  name: string
  domain?: string
  product?: string
  fallbackIcon?: string
}

// Map of companies to their domains for logo fetching
export const companyDomains: Record<string, string> = {
  'OpenAI': 'openai.com',
  'Anthropic': 'anthropic.com',
  'GitHub': 'github.com',
  'Cursor': 'cursor.sh',
  'AutoGPT': 'agpt.co',
  'CrewAI': 'crewai.com',
  'LangChain': 'langchain.com',
  'Replit': 'replit.com',
  'Vercel': 'vercel.com',
  'Bolt': 'bolt.new',
  'Cognition': 'cognition-labs.com',
  'Hugging Face': 'huggingface.co',
  'Cohere': 'cohere.com',
  'Harvey': 'harvey.ai',
  'AlphaSense': 'alpha-sense.com',
  'Mistral': 'mistral.ai',
  'Perplexity': 'perplexity.ai',
  'Claude': 'anthropic.com',
  'Google': 'google.com',
  'Microsoft': 'microsoft.com',
  'Amazon': 'amazon.com',
  'Meta': 'meta.com',
  'Stability AI': 'stability.ai',
  'Midjourney': 'midjourney.com',
  'Runway': 'runwayml.com',
  'Jasper': 'jasper.ai',
  'Copy.ai': 'copy.ai',
  'Writer': 'writer.com',
  'Databricks': 'databricks.com',
  'Scale AI': 'scale.com',
  'Weights & Biases': 'wandb.ai',
  'Pinecone': 'pinecone.io',
  'Weaviate': 'weaviate.io',
  'Chroma': 'trychroma.com',
  'LlamaIndex': 'llamaindex.ai',
  'Flowise': 'flowiseai.com',
  'Dify': 'dify.ai',
}

/**
 * Get logo URL using Clearbit's logo API
 * This is a free service that provides company logos based on domain
 */
export function getClearbitLogoUrl(domain: string, size: number = 128): string {
  return `https://logo.clearbit.com/${domain}?size=${size}`
}

/**
 * Get logo URL using Google's favicon service as a fallback
 * Returns a smaller icon but works for most domains
 */
export function getGoogleFaviconUrl(domain: string, size: number = 64): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`
}

/**
 * Get logo URL with multiple fallback options
 */
export function getCompanyLogoUrl(
  companyName: string, 
  options: { 
    size?: number
    fallbackToDomain?: boolean 
    preferClearbit?: boolean
  } = {}
): string | null {
  const { 
    size = 128, 
    fallbackToDomain = true,
    preferClearbit = true 
  } = options
  
  const domain = companyDomains[companyName]
  
  if (!domain) {
    if (fallbackToDomain && companyName.includes('.')) {
      // If the company name looks like a domain, use it directly
      return preferClearbit 
        ? getClearbitLogoUrl(companyName, size)
        : getGoogleFaviconUrl(companyName, size)
    }
    return null
  }
  
  return preferClearbit 
    ? getClearbitLogoUrl(domain, size)
    : getGoogleFaviconUrl(domain, size)
}

/**
 * Fetch logo with automatic fallback
 * First tries Clearbit, then falls back to Google favicon
 */
export async function fetchCompanyLogo(
  companyName: string,
  size: number = 128
): Promise<string | null> {
  const domain = companyDomains[companyName]
  if (!domain) return null
  
  const clearbitUrl = getClearbitLogoUrl(domain, size)
  
  try {
    // Try to fetch from Clearbit first
    const response = await fetch(clearbitUrl, { method: 'HEAD' })
    if (response.ok) {
      return clearbitUrl
    }
  } catch {
    // Clearbit failed, try Google favicon
  }
  
  // Fallback to Google favicon service
  return getGoogleFaviconUrl(domain, Math.min(size, 256))
}

// Export company list for the landing page
export const prominentCompanies = [
  { name: 'OpenAI', product: 'GPT-4, ChatGPT' },
  { name: 'Anthropic', product: 'Claude' },
  { name: 'Google', product: 'Gemini, Bard' },
  { name: 'Microsoft', product: 'Copilot, Azure AI' },
  { name: 'GitHub', product: 'Copilot' },
  { name: 'Cursor', product: 'AI Editor' },
  { name: 'Vercel', product: 'v0' },
  { name: 'Replit', product: 'Ghostwriter' },
  { name: 'Perplexity', product: 'AI Search' },
  { name: 'Midjourney', product: 'Image Gen' },
  { name: 'Stability AI', product: 'Stable Diffusion' },
  { name: 'Hugging Face', product: 'Model Hub' },
  { name: 'Cohere', product: 'Enterprise LLM' },
  { name: 'Mistral', product: 'Open Models' },
  { name: 'Meta', product: 'Llama' },
  { name: 'Amazon', product: 'Bedrock' },
  { name: 'Databricks', product: 'Mosaic ML' },
  { name: 'LangChain', product: 'Framework' },
]
