"use client"

import { useState, useEffect } from 'react'
import { getProductReviews, Review } from '@/lib/firebase-services'

export function useReviews(productId: string) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        const productReviews = await getProductReviews(productId)
        setReviews(productReviews)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch reviews')
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchReviews()
    }
  }, [productId])

  return { reviews, loading, error }
}
