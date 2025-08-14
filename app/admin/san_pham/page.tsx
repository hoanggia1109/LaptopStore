import { ISanPham } from "@/app/lib/cautrucdata";
import Link from "next/link";
import NutXoaSP from "./NutXoaSP";

export default async function AdminProducts() {
  // Lấy tất cả sản phẩm cho trang admin
  const res = await fetch(`${process.env.APP_URL}/api/san_pham?admin=true`);
  const { products: sp_arr, totalItems } = await res.json();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-orange-900">Quản lý sản phẩm</h1>
          <p className="text-gray-600 mt-1">Tổng số: {totalItems} sản phẩm</p>
        </div>
        <Link
          href="/admin/san_pham/them"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Thêm sản phẩm
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-orange-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-orange-900">ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-orange-900">Hình ảnh</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-orange-900">Tên sản phẩm</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-orange-900">Giá</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-orange-900">Hot</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-orange-900">Hiển thị</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-orange-900">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100">
              {sp_arr.map((sp: ISanPham) => (
                <tr key={sp.id} className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-600">#{sp.id}</td>
                  <td className="px-6 py-4">
                    <div className="w-16 h-16 relative">
                      {sp.hinh ? (
                        <img
                          src={sp.hinh}
                          alt={sp.ten_sp}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full bg-orange-50 rounded-lg flex items-center justify-center">
                          <span className="text-orange-300">No image</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{sp.ten_sp}</div>
                    <div className="text-sm text-gray-500">
                      Ngày: {new Date(sp.ngay).toLocaleDateString("vi-VN")}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-orange-600">
                    {Number(sp.gia).toLocaleString("vi")} VNĐ
                    {sp.gia_km && Number(sp.gia_km) > 0 && (
                      <div className="text-xs text-gray-500 line-through">
                        {Number(sp.gia_km).toLocaleString("vi")} VNĐ
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {sp.hot ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        Hot
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Normal
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {sp.an_hien ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Hiện
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Ẩn
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <Link
                        href={`/admin/san_pham/${sp.id}`}
                        className="text-orange-600 hover:text-orange-900"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <NutXoaSP id={sp.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 