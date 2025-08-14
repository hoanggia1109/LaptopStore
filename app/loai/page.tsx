import { LoaiModel } from "@/app/lib/models";
import Link from "next/link";
import NutXoaLoai from "./NutXoaLoai";

export default async function LoaiList() {
  const loai_arr = await LoaiModel.findAll();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-orange-900">Danh Sách Loại</h1>
        <Link
          href="/loai/them"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Thêm loại mới
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-orange-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-orange-900">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-orange-900">Tên loại</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-orange-900">Thứ tự</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-orange-900">Ẩn/Hiện</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-orange-900">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-100">
            {loai_arr.map((loai: any) => (
              <tr key={loai.id} className="hover:bg-orange-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-600">#{loai.id}</td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{loai.ten_loai}</div>
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-600">{loai.thu_tu}</td>
                <td className="px-6 py-4 text-center">
                  {loai.an_hien ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Hiện
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Ẩn
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center space-x-3">
                    <Link
                      href={`/loai/${loai.id}`}
                      className="text-orange-600 hover:text-orange-900"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    <NutXoaLoai id={loai.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
