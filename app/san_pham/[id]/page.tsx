import { ISanPham, ILoai } from "@/app/lib/cautrucdata";
import Link from "next/link";

interface Props {
  params: { id: string };
}

export default async function ChiTietSanPham({ params }: Props) {
  const id = params.id;

  // Lấy thông tin sản phẩm
  const res = await fetch(`${process.env.APP_URL}/api/san_pham/${id}`);
  
  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-orange-600 mb-4">
            Không tìm thấy sản phẩm
          </h1>
          <Link
            href="/san_pham"
            className="text-orange-500 hover:text-orange-600 underline"
          >
            Quay lại danh sách sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  const sanPham: ISanPham = await res.json();

  // Lấy thông tin loại sản phẩm
  const resLoai = await fetch(`${process.env.APP_URL}/api/loai/${sanPham.id_loai}`);
  const loai: ILoai = await resLoai.json();

  // Lấy sản phẩm cùng loại
  const resSPCungLoai = await fetch(`${process.env.APP_URL}/api/san_pham?loai=${sanPham.id_loai}`);
  const { products: spCungLoai } = await resSPCungLoai.json();

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link href="/san_pham" className="text-orange-500 hover:text-orange-600">
          Sản phẩm
        </Link>
        <span className="text-gray-500">/</span>
        <Link href={`/san_pham/loai/${loai.id}`} className="text-orange-500 hover:text-orange-600">
          {loai.ten_loai}
        </Link>
        <span className="text-gray-500">/</span>
        <span className="text-gray-600">{sanPham.ten_sp}</span>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Hình ảnh sản phẩm */}
          <div className="md:w-1/2 p-8">
            <div className="aspect-square rounded-lg overflow-hidden bg-orange-50">
              {sanPham.hinh ? (
                <img
                  src={sanPham.hinh}
                  alt={sanPham.ten_sp}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-orange-300">
                  <span className="text-lg">Không có hình</span>
                </div>
              )}
            </div>
          </div>

          {/* Thông tin sản phẩm */}
          <div className="md:w-1/2 p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-orange-900 mb-2">
                {sanPham.ten_sp}
              </h1>
              <Link 
                href={`/san_pham/loai/${loai.id}`}
                className="text-orange-500 hover:text-orange-600 text-sm"
              >
                {loai.ten_loai}
              </Link>
            </div>

            <div className="space-y-6">
              {/* Giá */}
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-orange-600">
                    {Number(sanPham.gia).toLocaleString("vi")} VNĐ
                  </span>
                  {sanPham.gia_km && Number(sanPham.gia_km) > 0 && (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        {Number(sanPham.gia_km).toLocaleString("vi")} VNĐ
                      </span>
                      <span className="text-orange-500 font-medium">
                        {Math.round((1 - Number(sanPham.gia) / Number(sanPham.gia_km)) * 100)}% giảm
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Trạng thái */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg border">
                  <span className={`w-3 h-3 rounded-full ${sanPham.hot ? 'bg-orange-500' : 'bg-gray-300'}`}></span>
                  <span className="text-gray-600">
                    {sanPham.hot ? 'Sản phẩm Hot' : 'Sản phẩm Thường'}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg border">
                  <span className={`w-3 h-3 rounded-full ${sanPham.an_hien ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="text-gray-600">
                    {sanPham.an_hien ? 'Đang kinh doanh' : 'Ngừng kinh doanh'}
                  </span>
                </div>
              </div>

              {/* Thông tin thêm */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600">
                    Ngày đăng: {new Date(sanPham.ngay).toLocaleDateString("vi-VN", {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="text-gray-600">
                    Mã sản phẩm: SP{String(sanPham.id).padStart(5, '0')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span className="text-gray-600">
                    Danh mục: {loai.ten_loai}
                  </span>
                </div>
              </div>

              {/* Nút mua hàng */}
              <div className="pt-6 border-t">
                <button className="w-full bg-orange-500 text-white py-4 px-6 rounded-full font-medium hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sản phẩm cùng loại */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-orange-900 mb-6">
          Sản phẩm cùng loại
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {spCungLoai.slice(0, 4).map((sp: ISanPham) => (
            <Link
              key={sp.id}
              href={`/san_pham/${sp.id}`}
              className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square relative overflow-hidden">
                {sp.hinh ? (
                  <img
                    src={sp.hinh}
                    alt={sp.ten_sp}
                    className="absolute inset-0 w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-orange-50 text-orange-300">
                    <span className="text-lg">Không có hình</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
                  {sp.ten_sp}
                </h3>
                <p className="text-orange-600 font-bold">
                  {Number(sp.gia).toLocaleString("vi")} VNĐ
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}