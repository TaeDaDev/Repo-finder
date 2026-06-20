import { useEffect, useState } from 'react'
import type { Favorite } from '../types'
import { getFavorites, removeFavorite } from '../services/api'
import { FavoritesList } from '../components/FavoritesList'
import { Heart, AlertCircle } from 'lucide-react'

export default function Favorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  // Load favorites when the page mounts
  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getFavorites()
      if (Array.isArray(data)) {
        setFavorites(data)
      } else {
        setError(data.message || 'Unable to load favorites.')
      }
    } catch (err) {
      setError('Could not load favorites. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (id: number) => {
    try {
      await removeFavorite(id)
      // Remove from local state without refetching — avoids an extra network request
      setFavorites((prev) => prev.filter((f) => f.id !== id))
    } catch (err) {
      setError('Could not remove favorite. Please try again.')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Heart size={24} className="text-purple-400" />
        <h1 className="text-3xl font-bold text-white">Your Favorites</h1>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-900/30 border border-red-700 text-red-400 text-sm px-4 py-3 rounded-lg">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-400 text-sm">Loading favorites...</p>
      ) : favorites.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-xl px-5 py-8 text-center text-gray-400 text-sm">
          No favorites yet. Search GitHub repositories and save them to see them here.
        </div>
      ) : (
        <FavoritesList favorites={favorites} onRemove={handleRemove} />
      )}
    </div>
  )
}
