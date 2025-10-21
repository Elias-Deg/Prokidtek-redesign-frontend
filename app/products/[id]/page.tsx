"use client"

import { useState, useEffect, use } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ChevronLeft, ChevronRight, Star, CheckCircle } from "lucide-react"
import { useProduct } from "@/hooks/use-products"
import { useProducts } from "@/hooks/use-products"
import { useReviews } from "@/hooks/use-reviews"

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [userComment, setUserComment] = useState("")
  const [showThankYouPopup, setShowThankYouPopup] = useState(false)

  const resolvedParams = use(params)
  const { product, loading: productLoading, error: productError } = useProduct(resolvedParams.id)
  const { products } = useProducts()
  const { reviews, loading: reviewsLoading } = useReviews(resolvedParams.id)

  // Initialize images and specs early to avoid reference errors
  const images = product?.images || [product?.image || "/placeholder.svg"]
  const specs = product?.specs || []

  useEffect(() => {
    setIsVisible(true)
    window.scrollTo(0, 0)
  }, [])

  // Keyboard navigation for image slideshow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (images.length > 1) {
        if (e.key === 'ArrowLeft') {
          prevImage()
        } else if (e.key === 'ArrowRight') {
          nextImage()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [images.length])

  if (productLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </main>
    )
  }

  if (productError || !product) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <p className="text-xl text-foreground/60">Product not found</p>
        </div>
        <Footer />
      </main>
    )
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleSubmitRating = () => {
    if (userRating > 0) {
      setShowThankYouPopup(true)
      setTimeout(() => {
        setShowThankYouPopup(false)
        setUserRating(0)
        setUserComment("")
      }, 3000)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Product Detail Section */}
      <section className={`py-12 px-4 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Image Gallery */}
            <div className="flex flex-col gap-6">
              <div className="relative">
                <img
                  src={images[currentImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-96 rounded-3xl object-cover transition-all duration-500 transform hover:scale-105"
                />

                {/* Image Navigation - Only show if more than 1 image */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
                    >
                      <ChevronLeft className="w-6 h-6 text-black" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
                    >
                      <ChevronRight className="w-6 h-6 text-black" />
                    </button>
                    
                    {/* Image counter */}
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery - Only show if more than 1 image */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-16 h-16 rounded-xl transition-all duration-300 transform hover:scale-110 overflow-hidden ${
                        idx === currentImageIndex ? "ring-2 ring-primary scale-110" : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div
              className={`flex flex-col justify-center transition-all duration-700 transform ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
            >
              <p className="text-sm text-primary font-semibold mb-2 uppercase tracking-wide">{product.category}</p>
              <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-foreground/30"}`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-foreground">{product.rating}</span>
                <span className="text-foreground/60">({product.reviews} reviews)</span>
              </div>

              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">{product.fullDescription}</p>

              {/* Specs */}
              {specs.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-foreground mb-4">Key Specifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {specs.map((spec, idx) => (
                      <div
                        key={idx}
                        className="bg-muted/50 p-4 rounded-2xl hover:bg-muted transition-colors duration-300"
                      >
                        <p className="text-sm text-foreground/70">{spec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button className="w-full border-2 border-primary text-primary px-8 py-4 rounded-full hover:bg-primary/10 transition-all duration-300 font-bold text-lg transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <h2 className="text-3xl font-bold text-foreground mb-8">Customer Reviews</h2>
            
            {reviewsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-foreground/60">Loading reviews...</p>
              </div>
            ) : reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review, idx) => (
                  <div
                    key={review.id}
                    className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                    style={{ animationDelay: `${300 + idx * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-bold text-lg">
                            {review.author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">{review.author}</h4>
                            {review.verified && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                          <p className="text-sm text-foreground/60">
                            {review.createdAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "fill-primary text-primary" : "text-foreground/30"
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm font-semibold text-foreground">
                          {review.rating}/5
                        </span>
                      </div>
                    </div>
                    <p className="text-foreground/80 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-foreground/60 text-lg">No reviews yet. Be the first to review this product!</p>
              </div>
            )}
          </div>

          <div
            className="mb-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 animate-fade-in-up shadow-lg"
            style={{ animationDelay: "400ms" }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">Rate This Product</h2>
            <div className="max-w-2xl">
              <div className="mb-6">
                <label className="block text-lg font-semibold text-foreground mb-4">Your Rating</label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setUserRating(star)}
                      className="transition-all duration-300 transform hover:scale-125"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= userRating ? "fill-primary text-primary" : "text-foreground/30 hover:text-primary/50"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-lg font-semibold text-foreground mb-4">Your Comment</label>
                <textarea
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  placeholder="Share your feedback about this product..."
                  className="w-full p-4 rounded-2xl border-2 border-border focus:border-primary focus:outline-none transition-colors resize-none"
                  rows={4}
                />
              </div>

              <button
                onClick={handleSubmitRating}
                disabled={userRating === 0}
                className={`w-full px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                  userRating === 0
                    ? "bg-foreground/20 text-foreground/50 cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:bg-accent"
                }`}
              >
                Submit Rating
              </button>
            </div>
          </div>

          {showThankYouPopup && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center animate-scale-in">
                <div className="text-6xl mb-6">👍</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Thank You for Your Review!</h3>
                <p className="text-foreground/70 text-lg">Your feedback helps us improve and serve you better.</p>
              </div>
            </div>
          )}

          {/* Related Products */}
          <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
            <h2 className="text-3xl font-bold text-foreground mb-8">Related Products</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProducts.slice(0, 3).map((relatedProduct, idx) => (
                <a
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group block bg-card border-2 border-border rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 shadow-lg"
                  style={{ animationDelay: `${600 + idx * 100}ms` }}
                >
                  <div className="h-40 bg-muted overflow-hidden group-hover:scale-110 transition-transform duration-500">
                    <img
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-foreground/70 text-sm mb-4">{relatedProduct.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold text-foreground">{relatedProduct.rating}</span>
                        <span className="text-xs text-foreground/60">({relatedProduct.reviews})</span>
                      </div>
                      <span className="text-primary font-bold">→</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Browse More Section */}
          <div
            className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-12 text-center animate-fade-in-up shadow-lg"
            style={{ animationDelay: "700ms" }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Explore More Categories</h2>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
              Discover our complete range of laptops, desktops, network devices, and audio equipment
            </p>
            <div className="grid md:grid-cols-4 gap-4">
              {["Laptops", "Desktops", "Network Devices", "Audio Equipment"].map((category, idx) => (
                <a
                  key={idx}
                  href="/products"
                  className="bg-white hover:bg-primary hover:text-primary-foreground text-foreground px-6 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  {category}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
