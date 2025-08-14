"use client"
import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-orange-900 mb-2">
          Quản trị hệ thống
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quản lý sản phẩm */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-orange-900">Sản phẩm</h2>
            <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div className="space-y-2">
            <Link
              href="/admin/san_pham"
              className="block w-full text-left px-4 py-2 bg-orange-50 text-orange-700 rounded hover:bg-orange-100 transition-colors"
            >
              Danh sách sản phẩm
            </Link>
            <Link
              href="/admin/san_pham/them"
              className="block w-full text-left px-4 py-2 bg-orange-50 text-orange-700 rounded hover:bg-orange-100 transition-colors"
            >
              Thêm sản phẩm mới
            </Link>
          </div>
        </div>

        {/* Quản lý loại */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-orange-900">Loại sản phẩm</h2>
            <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div className="space-y-2">
            <Link
              href="/admin/loai"
              className="block w-full text-left px-4 py-2 bg-orange-50 text-orange-700 rounded hover:bg-orange-100 transition-colors"
            >
              Danh sách loại
            </Link>
            <Link
              href="/admin/loai/them"
              className="block w-full text-left px-4 py-2 bg-orange-50 text-orange-700 rounded hover:bg-orange-100 transition-colors"
            >
              Thêm loại mới
            </Link>
          </div>
        </div>

        {/* Thống kê */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-orange-900">Thống kê</h2>
            <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="space-y-2">
            <Link
              href="/admin/thong-ke/san-pham"
              className="block w-full text-left px-4 py-2 bg-orange-50 text-orange-700 rounded hover:bg-orange-100 transition-colors"
            >
              Thống kê sản phẩm
            </Link>
            <Link
              href="/admin/thong-ke/doanh-thu"
              className="block w-full text-left px-4 py-2 bg-orange-50 text-orange-700 rounded hover:bg-orange-100 transition-colors"
            >
              Thống kê doanh thu
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="text-4xl font-bold mb-2">150</div>
          <div className="text-orange-100">Tổng sản phẩm</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="text-4xl font-bold mb-2">12</div>
          <div className="text-orange-100">Loại sản phẩm</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="text-4xl font-bold mb-2">45</div>
          <div className="text-orange-100">Sản phẩm hot</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="text-4xl font-bold mb-2">28</div>
          <div className="text-orange-100">Sản phẩm mới</div>
        </div>
      </div>
    </div>
  )
}
