import type { Repo } from '../types'
import { Star, Code, ExternalLink, Bookmark } from 'lucide-react'

interface RepoCardProps {
  repo: Repo
  onSave: (repo: Repo) => void
}

export function RepoCard({ repo, onSave }: RepoCardProps) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 flex flex-col gap-3 hover:border-purple-500 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-white font-semibold text-lg leading-tight">{repo.name}</h3>
        <button
          onClick={() => onSave(repo)}
          className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white text-sm px-3 py-1.5 rounded-lg transition-colors shrink-0"
        >
          <Bookmark size={14} />
          Save
        </button>
      </div>

      {/* Show placeholder if no description provided */}
      <p className="text-gray-400 text-sm leading-relaxed">
        {repo.description || 'No description provided.'}
      </p>

      <div className="flex items-center gap-4 text-sm text-gray-400">
        {repo.language && (
          <span className="flex items-center gap-1">
            <Code size={14} className="text-purple-400" />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star size={14} className="text-yellow-400" />
          {repo.stargazers_count.toLocaleString()}
        </span>
      </div>

      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm transition-colors w-fit"
      >
        <ExternalLink size={14} />
        View on GitHub
      </a>
    </div>
  )
}
