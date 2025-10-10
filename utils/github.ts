import type { GitHubRepo } from '~/types'
import { FetchError } from 'ofetch'

export function extractRepoPath(githubUrl: string): string {
  // Handle various GitHub URL formats
  const patterns = [/github\.com\/([^/]+\/[^/]+)/, /github\.com\/([^/]+\/[^/]+)\.git/, /github\.com\/([^/]+\/[^/]+)\/$/]

  for (const pattern of patterns) {
    const match = githubUrl.match(pattern)
    if (match) {
      return match[1].replace(".git", "")
    }
  }

  throw new Error(`Invalid GitHub URL: ${githubUrl}`)
}

export function buildGitHubApiUrl(repoPath: string, endpoint: string): string {
  return `https://api.github.com/repos/${repoPath}${endpoint}`
}

export function buildRawGitHubUrl(repoPath: string, branch = "main", filePath: string): string {
  return `https://raw.githubusercontent.com/${repoPath}/${branch}/${filePath}`
}

export function decodeBase64(base64: string): string {
  if(typeof Buffer === "function") {
    return Buffer.from(base64, "base64").toString("utf-8")
  }
  
  // fallback to atom
  if(typeof atob === "function") {
    const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0))
    return new TextDecoder('utf-8').decode(bytes)
  }

  throw new Error("No base64 decoder found")
}

/**
 * Fetch GitHub stars for multiple repositories
 */
export async function fetchGitHubStars(githubUrls: string[]): Promise<Record<string, number>> {
  try {
    const config = useRuntimeConfig()
    const results: Record<string, number> = {}
    
    // Process requests in batches to avoid rate limiting
    const batchSize = 10
    const batches = []
    
    for (let i = 0; i < githubUrls.length; i += batchSize) {
      batches.push(githubUrls.slice(i, i + batchSize))
    }

    for (const batch of batches) {
      const promises = batch.map(async (githubUrl: string) => {
        try {
          const repoPath = extractRepoPath(githubUrl)
          const headers: Record<string, string> = {
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "Vue-Plugins-Collection"
          }

          // Add auth token if available for higher rate limits
          const token = config.githubToken || config.public.githubToken

          // Add auth token if available for higher rate limits
          if (token) {
            headers["Authorization"] = `Bearer ${token}`
          }

          const response = await $fetch<{ stargazers_count: number }>(
            buildGitHubApiUrl(repoPath, ""),
            {
              headers,
              timeout: 5000 // 5 second timeout
            }
          )

          results[githubUrl] = response.stargazers_count
        } catch (error) {
          console.error(`Failed to fetch stars for ${githubUrl}:`, error)
          results[githubUrl] = 0
        }
      })

      await Promise.all(promises)
      
      // Small delay between batches to be respectful to GitHub API
      if (batches.indexOf(batch) < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }

    return results
  } catch (error) {
    console.error('Failed to fetch GitHub stars:', error)
    return {}
  }
}

/**
 * Fetch comprehensive GitHub data for a single repository
 */
export async function fetchGitHubData(githubUrl: string): Promise<{
  stars: number
  forks: number
  issues: number
  lastCommit: string
  license: string
}> {
  try {
    const config = useRuntimeConfig()
    const repoPath = extractRepoPath(githubUrl)
    const headers: Record<string, string> = {
      "Accept": "application/vnd.github.v3+json",
      "User-Agent": "Vue-Plugins-Collection"
    }

    const token = config.githubToken || config.public.githubToken

    // Add auth token if available for higher rate limits
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    const response = await $fetch<GitHubRepo>(buildGitHubApiUrl(repoPath, ""), {
      headers,
      timeout: 10000 // 10 second timeout for individual requests
    })

    return {
      stars: response.stargazers_count,
      forks: response.forks_count,
      issues: response.open_issues_count,
      lastCommit: response.pushed_at,
      license: response.license?.name || "Unknown",
    }
  } catch (error) {
    console.error("Failed to fetch GitHub data:", error)
    return {
      stars: 0,
      forks: 0,
      issues: 0,
      lastCommit: new Date().toISOString(),
      license: "Unknown",
    }
  }
}

/**
 * Fetch README content from GitHub repository
 */
export async function fetchGitHubReadme(githubUrl: string): Promise<string> {
  try {
    const config = useRuntimeConfig()
    const repoPath = extractRepoPath(githubUrl)
    const readmeFiles = ["README.md", "README.rst", "README.txt", "readme.md", "readme.rst", "readme.txt"]

    for (const filename of readmeFiles) {
      try {
        const headers: Record<string, string> = {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Vue-Plugins-Collection",
        }

        // Add auth token if available for higher rate limits
        const token = config.githubToken || config.public.githubToken

        // Add auth token if available for higher rate limits
        if (token) {
          headers["Authorization"] = `Bearer ${token}`
        }

        const response = await $fetch<{ content: string; encoding: string }>(
          buildGitHubApiUrl(repoPath, `/contents/${filename}`),
          {
            headers,
            timeout: 10000 // Add timeout for README fetch too
          },
        )

        if (response.content && response.encoding === "base64") {
          let content = decodeBase64(response.content)

          // Fix relative URLs in the README to point to the correct GitHub URLs
          content = content.replace(
            /!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g,
            `![$1](${buildRawGitHubUrl(repoPath, "main", "$2")})`,
          )

          content = content.replace(
            /\[([^\]]+)\]\((?!https?:\/\/)([^)]+)\.md\)/g,
            `[$1](https://github.com/${repoPath}/blob/main/$2.md)`,
          )

          return content
        }
      } catch (error) {
        // Continue to next filename if this one fails
        if(error instanceof FetchError) {
          continue
        }
        
        // Rethrow other kinds of unexpected errors
        throw error
      }
    }

    return ""
  } catch (error) {
    console.error("Failed to fetch README:", error)
    return ""
  }
}
