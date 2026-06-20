import type { Favorite } from '../types'
import { ExternalLink, Trash2 } from 'lucide-react'

interface FavoritesListProps {
  favorites: Favorite[]
  onRemove: (id: number) => void
}

export function FavoritesList({ favorites, onRemove }: FavoritesListProps) {
  return (
    <ul className="flex flex-col gap-3 mt-4">
      {favorites.map((favorite) => (
        <li
          key={favorite.id}
          className="bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 flex items-center justify-between gap-4"
        >
          <div className="flex flex-col gap-1">
            <h4 className="text-white font-medium">{favorite.repo_name}</h4>
            <a
              href={favorite.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm transition-colors w-fit"
            >
              <ExternalLink size={13} />
              View on GitHub
            </a>
          </div>
          <button
            onClick={() => onRemove(favorite.id)}
            className="flex items-center gap-1 text-red-400 hover:text-red-300 hover:bg-red-900/30 px-3 py-1.5 rounded-lg text-sm transition-colors shrink-0"
          >
            <Trash2 size={14} />
            Remove
          </button>
        </li>
      ))}
    </ul>
  )
}
