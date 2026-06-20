import type { Repo } from '../types'
import { RepoCard } from '../components/RepoCard'
import { useState } from 'react'
import { Search, AlertCircle } from 'lucide-react'
import { addFavorite } from '../services/api'

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')

  const handleSearch = async () => {
    if (!username.trim()) return
    setLoading(true)
    setError('')
    try {
      // Calls GitHub's public API directly — no backend needed for search
      const response = await fetch(`https://api.github.com/users/${username}/repos`)
      const data = await response.json()

      // GitHub returns an object with message field when user not found or rate limited
      if (data.message) {
        if (data.message.includes('rate limit')) {
          setError('GitHub API rate limit reached. Wait a few minutes and try again.')
        } else {
          setError(`User "${username}" not found on GitHub.`)
        }
        setRepos([])
        return
      }

      setRepos(data)
    } catch (err) {
      setError('Failed to fetch repositories. Check your connection.')
    } finally {
      // Runs whether the request succeeded or failed
      setLoading(false)
    }
  }

  const handleSave = async (repo: Repo) => {
    try {
      await addFavorite(repo.id.toString(), repo.name, repo.html_url)
      alert('Repository saved to favorites!')
    } catch (err) {
      alert("Failed to save. Make sure you're logged in.")
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white">GitHub Repo Explorer</h1>
        <p className="text-gray-400">Search any GitHub username to explore their public repositories</p>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); handleSearch() }}
        className="flex gap-2"
      >
        <input
          type="text"
          className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 transition-colors"
          placeholder="Enter a GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Search size={16} />
          Search
        </button>
      </form>

      {error && (
        <div className="flex items-center gap-2 bg-red-900/30 border border-red-700 text-red-400 text-sm px-4 py-3 rounded-lg">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {loading && (
        <p className="text-gray-400 text-sm">Loading repositories...</p>
      )}

      {!loading && repos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} onSave={handleSave} />
          ))}
        </div>
      )}

      {!loading && repos.length === 0 && !error && username && (
        <p className="text-gray-500 text-sm">No repositories found.</p>
      )}
    </div>
  )
}
