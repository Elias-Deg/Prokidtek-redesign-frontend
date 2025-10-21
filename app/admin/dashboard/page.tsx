"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogOut, Package, Star, Mail, TrendingUp } from "lucide-react"

// Lightweight inline SVG charts (no external deps)
function SimpleLineChart({ data, width = 300, height = 160, stroke = "#fe4f08" }: { data: number[]; width?: number; height?: number; stroke?: string }) {
  const paddingX = 20
  const paddingY = 12
  const innerW = width - paddingX * 2
  const innerH = height - paddingY * 2
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = Math.max(1, max - min)
  const step = innerW / Math.max(1, data.length - 1)
  const points = data
    .map((v, i) => {
      const x = paddingX + i * step
      const y = paddingY + innerH - ((v - min) / range) * innerH
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      <polyline points={points} fill="none" stroke={stroke} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
      {data.map((v, i) => {
        const x = paddingX + i * step
        const y = paddingY + innerH - ((v - min) / range) * innerH
        return <circle key={i} cx={x} cy={y} r={3} fill={stroke} />
      })}
    </svg>
  )
}

function SimpleBarChart({ data, width = 300, height = 160, fill = "#ff6b1a" }: { data: number[]; width?: number; height?: number; fill?: string }) {
  const paddingX = 20
  const paddingY = 12
  const innerW = width - paddingX * 2
  const innerH = height - paddingY * 2
  const max = Math.max(1, ...data)
  const barW = innerW / data.length - 8

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      {data.map((v, i) => {
        const x = paddingX + i * (barW + 8)
        const h = (v / max) * innerH
        const y = paddingY + innerH - h
        return <rect key={i} x={x} y={y} width={barW} height={h} rx={4} ry={4} fill={fill} />
      })}
    </svg>
  )}

interface AdminStats {
  totalProducts: number
  newArrivals: number
  bestSelling: number
  totalReviews: number
  totalEmails: number
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState<AdminStats>({
    totalProducts: 156,
    newArrivals: 12,
    bestSelling: 8,
    totalReviews: 342,
    totalEmails: 47,
  })
  const router = useRouter()

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminSession")
    router.push("/admin/login")
  }

  if (!isAuthenticated) {
    return null
  }

  const dashboardItems = [
    {
      title: "New Arrivals",
      count: stats.newArrivals,
      icon: Package,
      href: "/admin/new-arrivals",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Best Selling",
      count: stats.bestSelling,
      icon: TrendingUp,
      href: "/admin/best-selling",
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Product Details",
      count: stats.totalProducts,
      icon: Package,
      href: "/admin/products",
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Client Testimonials",
      count: 6,
      icon: Star,
      href: "/admin/testimonials",
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Home Reviews",
      count: 7,
      icon: Star,
      href: "/admin/home-reviews",
      color: "bg-pink-50 text-pink-600",
    },
    {
      title: "Reviews",
      count: stats.totalReviews,
      icon: Star,
      href: "/admin/reviews",
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      title: "Contact Emails",
      count: stats.totalEmails,
      icon: Mail,
      href: "/admin/emails",
      color: "bg-red-50 text-red-600",
    },
    {
      title: "Seed Database",
      count: "Setup",
      icon: Package,
      href: "/admin/seed-data",
      color: "bg-indigo-50 text-indigo-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-800">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/prokidtek-logo.png" alt="ProKidTek" className="h-10 w-auto" />
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-300 font-medium hover:scale-105"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-background mb-2">Welcome to Admin Panel</h2>
          <p className="text-background">Manage your ProKidTek products, reviews, and customer inquiries</p>
        </div>

        {/* Two-column layout: left sticky actions, right cards + charts */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left rail: Quick Actions (sticky) */}
          <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-in-up">
              <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {dashboardItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 p-3 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className={`${item.color} p-2 rounded-lg`}>
                      <item.icon size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.count} items</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Right content: Cards on top, charts below */}
          <section className="lg:col-span-3 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {dashboardItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 group cursor-pointer transform hover:scale-105 hover:-translate-y-1 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon size={24} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-3xl font-bold text-primary">{item.count}</p>
                  </Link>
                )
              })}
            </div>

            {/* Charts section (placeholders) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h4 className="text-lg font-semibold text-foreground mb-2">Best Selling (last 30 days)</h4>
                <div className="h-64 rounded-lg border border-border p-2">
                  {/** sample line chart */}
                  <SimpleLineChart data={[12, 19, 13, 25, 22, 30, 28, 35, 31, 40, 38, 45]} />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h4 className="text-lg font-semibold text-foreground mb-2">New Arrivals (weekly)</h4>
                <div className="h-64 rounded-lg border border-border p-2">
                  {/** sample bar chart */}
                  <SimpleBarChart data={[5, 8, 6, 9, 12, 7, 10, 14, 11, 9, 13, 16]} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
