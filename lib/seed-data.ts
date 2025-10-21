import { Product, NewArrival, BestSelling, Testimonial, Review } from './types'
import { addProduct, addNewArrival, addBestSelling, addTestimonial, addReview } from './firebase-services'

export const seedProducts = async (): Promise<void> => {
  const products: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      name: "ProBook Elite 15",
      category: "laptops",
      description: "High-performance laptop for professionals",
      fullDescription: "Experience ultimate performance with the ProBook Elite 15. Engineered for professionals who demand speed and reliability. Features a stunning 15-inch display, all-day battery life, and premium build quality.",
      specs: ["Intel i7", "16GB RAM", "512GB SSD"],
      image: "/professional-laptop-computer.jpg",
      images: ["/professional-laptop-front-view.jpg", "/laptop-keyboard-and-screen.jpg", "/laptop-side-view.jpg"],
      rating: 4.8,
      reviews: 324,
      price: 1299,
      featured: true,
    },
    {
      name: "UltraBook Pro",
      category: "laptops",
      description: "Ultra-thin and powerful computing",
      fullDescription: "The thinnest powerhouse ever created. UltraBook Pro combines portability with desktop-class performance. Perfect for professionals on the go.",
      specs: ["Intel i9", "32GB RAM", "1TB SSD"],
      image: "/ultrabook-thin-laptop.jpg",
      images: ["/ultrabook-laptop-thin-design.jpg", "/ultrabook-keyboard.jpg", "/ultrabook-side-profile.jpg"],
      rating: 4.9,
      reviews: 512,
      price: 1899,
      featured: true,
    },
    {
      name: "WorkStation X1",
      category: "desktops",
      description: "Professional workstation for creative work",
      fullDescription: "Built for creators. WorkStation X1 delivers the power needed for 4K video editing, 3D rendering, and more. Professional-grade components ensure reliability.",
      specs: ["Xeon Processor", "64GB RAM", "2TB SSD"],
      image: "/professional-desktop-workstation.jpg",
      images: ["/desktop-workstation-tower.jpg", "/workstation-with-monitor.jpg", "/desktop-computer-setup.jpg"],
      rating: 4.7,
      reviews: 287,
      price: 2499,
      featured: true,
    },
    {
      name: "Desktop Pro Max",
      category: "desktops",
      description: "Powerful desktop for gaming and work",
      fullDescription: "Maximum performance for maximum productivity. Desktop Pro Max is ready for anything you throw at it. Gaming, streaming, or professional work.",
      specs: ["Intel i7", "32GB RAM", "1TB SSD"],
      image: "/gaming-desktop-computer.jpg",
      images: ["/gaming-desktop-tower.jpg", "/desktop-gaming-setup.jpg", "/desktop-computer-front.jpg"],
      rating: 4.6,
      reviews: 198,
      price: 1599,
      featured: false,
    },
    {
      name: "Enterprise Router 5G",
      category: "network",
      description: "Next-gen 5G network router",
      fullDescription: "Connect to the future with 5G technology. Enterprise Router 5G ensures blazing-fast connectivity for your entire network.",
      specs: ["5G Support", "WiFi 6E", "Gigabit Ports"],
      image: "/5g-network-router.jpg",
      images: ["/5g-router-device.jpg", "/network-device.jpg", "/network-hub-device.jpg"],
      rating: 4.5,
      reviews: 156,
      price: 899,
      featured: true,
    },
    {
      name: "Network Switch Pro",
      category: "network",
      description: "Enterprise-grade network switch",
      fullDescription: "Enterprise-grade reliability meets cutting-edge performance. Network Switch Pro handles your most demanding workloads.",
      specs: ["48 Ports", "10Gbps", "PoE Support"],
      image: "/network-switch-device.jpg",
      images: ["/network-device.jpg", "/network-hub-device.jpg", "/placeholder.svg"],
      rating: 4.4,
      reviews: 142,
      price: 1299,
      featured: false,
    },
    {
      name: "Studio Monitor Speakers",
      category: "audio",
      description: "Professional studio audio monitors",
      fullDescription: "Studio-quality sound for professionals. Studio Monitor Speakers deliver accurate, detailed audio for critical listening.",
      specs: ["120W Power", "Frequency: 20Hz-20kHz", "XLR Input"],
      image: "/audio-speakers.jpg",
      images: ["/professional-audio-headphones.jpg", "/placeholder.svg", "/placeholder.svg"],
      rating: 4.8,
      reviews: 267,
      price: 599,
      featured: true,
    },
    {
      name: "Wireless Headphones Pro",
      category: "audio",
      description: "Premium wireless audio experience",
      fullDescription: "Immerse yourself in sound. Wireless Headphones Pro combines premium audio with industry-leading noise cancellation.",
      specs: ["40hr Battery", "Active Noise Cancel", "Bluetooth 5.3"],
      image: "/professional-audio-headphones.jpg",
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      rating: 4.9,
      reviews: 891,
      price: 399,
      featured: true,
    },
  ]

  for (const product of products) {
    await addProduct(product)
  }
}

export const seedNewArrivals = async (): Promise<void> => {
  const newArrivals: Omit<NewArrival, 'id'>[] = [
    { productId: "1", dateAdded: new Date(), featured: true },
    { productId: "2", dateAdded: new Date(Date.now() - 86400000), featured: true },
    { productId: "3", dateAdded: new Date(Date.now() - 172800000), featured: true },
    { productId: "4", dateAdded: new Date(Date.now() - 259200000), featured: false },
  ]

  for (const arrival of newArrivals) {
    await addNewArrival(arrival)
  }
}

export const seedBestSelling = async (): Promise<void> => {
  const bestSelling: Omit<BestSelling, 'id'>[] = [
    { productId: "1", sales: 245, revenue: 612500, period: "monthly", featured: true },
    { productId: "2", sales: 189, revenue: 471750, period: "monthly", featured: true },
    { productId: "3", sales: 156, revenue: 390000, period: "monthly", featured: true },
    { productId: "8", sales: 312, revenue: 187200, period: "monthly", featured: true },
  ]

  for (const item of bestSelling) {
    await addBestSelling(item)
  }
}

export const seedTestimonials = async (): Promise<void> => {
  const testimonials: Omit<Testimonial, 'id' | 'createdAt'>[] = [
    {
      quote: "ProKidTek transformed our IT infrastructure. Their team was professional, responsive, and delivered exactly what we needed.",
      author: "James Wilson",
      company: "TechCorp",
      logo: "🏢",
      rating: 5,
      featured: true,
    },
    {
      quote: "Outstanding service and support. ProKidTek has been a reliable partner for our technology needs for over 5 years.",
      author: "Maria Garcia",
      company: "GlobalSystems",
      logo: "🌍",
      rating: 5,
      featured: true,
    },
    {
      quote: "Working with ProKidTek has been a great experience. Their team is professional, responsive, and always willing to go the extra mile.",
      author: "Yonas Mekonnen",
      company: "Yonas Mobile",
      logo: "📱",
      rating: 5,
      featured: true,
    },
    {
      quote: "Excellent quality and competitive pricing. ProKidTek is our go-to supplier for all tech needs.",
      author: "David Park",
      company: "StartUp Ventures",
      logo: "🚀",
      rating: 5,
      featured: true,
    },
  ]

  for (const testimonial of testimonials) {
    await addTestimonial(testimonial)
  }
}

export const seedReviews = async (): Promise<void> => {
  const reviews: Omit<Review, 'id' | 'createdAt'>[] = [
    // ProBook Elite 15 reviews
    {
      productId: "1",
      author: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely love this laptop! The performance is outstanding and the build quality is premium. Perfect for my work needs.",
      verified: true,
    },
    {
      productId: "1",
      author: "Michael Chen",
      rating: 4,
      comment: "Great laptop overall. Battery life could be better, but the speed and display quality make up for it.",
      verified: true,
    },
    {
      productId: "1",
      author: "Emily Rodriguez",
      rating: 5,
      comment: "Best laptop I've ever owned. The keyboard is comfortable and the screen is crystal clear. Highly recommended!",
      verified: true,
    },
    {
      productId: "1",
      author: "David Kim",
      rating: 4,
      comment: "Solid performance and reliable. The only downside is the price, but you get what you pay for.",
      verified: true,
    },
    
    // UltraBook Pro reviews
    {
      productId: "2",
      author: "Alex Thompson",
      rating: 5,
      comment: "Incredible thin design with desktop-level performance. Perfect for professionals who need power on the go.",
      verified: true,
    },
    {
      productId: "2",
      author: "Lisa Wang",
      rating: 5,
      comment: "The UltraBook Pro exceeded my expectations. Lightning fast and incredibly portable. Worth every penny!",
      verified: true,
    },
    {
      productId: "2",
      author: "James Wilson",
      rating: 4,
      comment: "Excellent laptop with top-tier specs. The only minor issue is the fan noise under heavy load.",
      verified: true,
    },
    
    // WorkStation X1 reviews
    {
      productId: "3",
      author: "Maria Garcia",
      rating: 5,
      comment: "This workstation is a beast! Handles 4K video editing like a dream. Perfect for creative professionals.",
      verified: true,
    },
    {
      productId: "3",
      author: "Robert Taylor",
      rating: 4,
      comment: "Powerful machine for demanding tasks. The build quality is excellent and it runs cool even under load.",
      verified: true,
    },
    {
      productId: "3",
      author: "Jennifer Lee",
      rating: 5,
      comment: "Outstanding performance for 3D rendering and video production. This workstation has transformed my workflow.",
      verified: true,
    },
    
    // Desktop Pro Max reviews
    {
      productId: "4",
      author: "Kevin Brown",
      rating: 4,
      comment: "Great gaming desktop with solid performance. The RGB lighting looks amazing and the cooling is excellent.",
      verified: true,
    },
    {
      productId: "4",
      author: "Amanda Davis",
      rating: 5,
      comment: "Perfect for both work and gaming. Fast, reliable, and well-built. Highly satisfied with this purchase.",
      verified: true,
    },
    
    // Enterprise Router 5G reviews
    {
      productId: "5",
      author: "Tom Anderson",
      rating: 5,
      comment: "Blazing fast 5G connectivity! This router has transformed our office network. Setup was easy and reliable.",
      verified: true,
    },
    {
      productId: "5",
      author: "Rachel Green",
      rating: 4,
      comment: "Excellent router with great range and speed. The 5G support is impressive and the WiFi 6E is future-proof.",
      verified: true,
    },
    
    // Network Switch Pro reviews
    {
      productId: "6",
      author: "Mark Johnson",
      rating: 4,
      comment: "Enterprise-grade switch that handles our network traffic perfectly. PoE support is a great feature.",
      verified: true,
    },
    {
      productId: "6",
      author: "Susan Miller",
      rating: 5,
      comment: "Reliable and fast network switch. The 48 ports give us plenty of room to grow. Highly recommended.",
      verified: true,
    },
    
    // Studio Monitor Speakers reviews
    {
      productId: "7",
      author: "John Smith",
      rating: 5,
      comment: "Studio-quality sound reproduction. These monitors are perfect for mixing and mastering. Crystal clear audio.",
      verified: true,
    },
    {
      productId: "7",
      author: "Patricia White",
      rating: 4,
      comment: "Excellent studio monitors with accurate sound. The XLR inputs are a nice touch for professional setups.",
      verified: true,
    },
    
    // Wireless Headphones Pro reviews
    {
      productId: "8",
      author: "Daniel Clark",
      rating: 5,
      comment: "Best wireless headphones I've ever used! The noise cancellation is incredible and battery life is amazing.",
      verified: true,
    },
    {
      productId: "8",
      author: "Michelle Adams",
      rating: 5,
      comment: "Premium sound quality with excellent comfort. The 40-hour battery life is perfect for long flights.",
      verified: true,
    },
    {
      productId: "8",
      author: "Christopher Moore",
      rating: 4,
      comment: "Great headphones with top-notch noise cancellation. The Bluetooth 5.3 connection is rock solid.",
      verified: true,
    },
  ]

  for (const review of reviews) {
    await addReview(review)
  }
}

export const seedAllData = async (): Promise<void> => {
  console.log('Starting data seeding...')
  
  try {
    await seedProducts()
    console.log('✅ Products seeded successfully')
    
    await seedNewArrivals()
    console.log('✅ New arrivals seeded successfully')
    
    await seedBestSelling()
    console.log('✅ Best selling seeded successfully')
    
    await seedTestimonials()
    console.log('✅ Testimonials seeded successfully')
    
    await seedReviews()
    console.log('✅ Reviews seeded successfully')
    
    console.log('🎉 All data seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding data:', error)
  }
}
