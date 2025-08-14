import { ISanPham, ILoai } from "./lib/cautrucdata";
import Link from "next/link";

export default async function Home() {
  // Lấy sản phẩm hot
  const resSPHot = await fetch(`${process.env.APP_URL}/api/san_pham?hot=true`);
  const { products: hotProducts } = await resSPHot.json();

  // Lấy danh sách loại
  const resLoai = await fetch(`${process.env.APP_URL}/api/loai`);
  const loai_arr: ILoai[] = await resLoai.json();

  return (
    <main>
      {/* Hero Banner */}
      <div className="relative h-[500px] overflow-hidden">
        <img
          src="/img/bannerr.jpg"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-bold mb-4">
                Laptop Chính Hãng
              </h1>
              <p className="text-xl mb-8">
                Khám phá bộ sưu tập laptop mới nhất với giá tốt nhất thị trường
              </p>
              <Link
                href="/san_pham"
                className="bg-orange-500 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-600 transition-colors inline-flex items-center gap-2"
              >
                Xem sản phẩm
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Danh mục nổi bật */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-orange-900">
            Danh Mục Sản Phẩm
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {loai_arr.slice(0, 8).map((loai) => (
              <Link
                key={loai.id}
                href={`/san_pham/loai/${loai.id}`}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow group"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                  <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-orange-900 group-hover:text-orange-600 transition-colors">
                  {loai.ten_loai}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sản phẩm nổi bật */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-orange-900">
              Sản Phẩm Nổi Bật
            </h2>
            <Link
              href="/san_pham"
              className="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-2"
            >
              Xem tất cả
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {hotProducts.map((sp: ISanPham) => (
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
                      className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-orange-50 text-orange-300">
                      <span className="text-lg">Không có hình</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Hot
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
                    {sp.ten_sp}
                  </h3>
                  <p className="text-orange-600 font-bold text-xl">
                    {Number(sp.gia).toLocaleString("vi")} VNĐ
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cam kết */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-orange-900 mb-2">
                Giao Hàng Nhanh Chóng
              </h3>
              <p className="text-gray-600">
                Giao hàng trong vòng 24h cho khu vực nội thành
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-orange-900 mb-2">
                Bảo Hành Chính Hãng
              </h3>
              <p className="text-gray-600">
                Bảo hành chính hãng lên đến 24 tháng
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-orange-900 mb-2">
                Thanh Toán An Toàn
              </h3>
              <p className="text-gray-600">
                Hỗ trợ nhiều phương thức thanh toán an toàn
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Thương hiệu nổi bật */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-orange-900">
            Thương Hiệu Nổi Bật
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Dell', 'HP', 'Asus', 'Lenovo'].map((brand) => (
              <div key={brand} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-[3/2] relative mb-4">
                  <img
                    src={`/img/${brand.toLowerCase()}.png`}
                    alt={brand}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-lg text-orange-900">{brand}</h3>
                  <p className="text-gray-600 text-sm">Laptop chính hãng</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tin tức & Khuyến mãi */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-orange-900">
            Tin Tức & Khuyến Mãi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden group">
              <div className="aspect-[16/9] relative overflow-hidden">
                <img
                  src="/img/banner2.avif"
                  alt="Khuyến mãi"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
                  Khuyến mãi
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  Siêu sale laptop gaming
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  Giảm giá lên đến 30% cho các dòng laptop gaming cao cấp từ các thương hiệu hàng đầu.
                </p>
                <Link href="#" className="text-orange-500 hover:text-orange-600 font-medium inline-flex items-center gap-2">
                  Xem thêm
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden group">
              <div className="aspect-[16/9] relative overflow-hidden">
                <img
                  src="/img/bn.webp"
                  alt="Tin tức"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
                  Tin tức
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  Top laptop văn phòng 2024
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  Tổng hợp những mẫu laptop văn phòng tốt nhất cho năm 2024, phù hợp với mọi nhu cầu và ngân sách.
                </p>
                <Link href="#" className="text-orange-500 hover:text-orange-600 font-medium inline-flex items-center gap-2">
                  Xem thêm
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden group">
              <div className="aspect-[16/9] relative overflow-hidden">
                <img
                  src="/img/bannerr.jpg"
                  alt="Hướng dẫn"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
                  Hướng dẫn
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  Cách chọn laptop phù hợp
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  Những tiêu chí quan trọng cần cân nhắc khi chọn mua laptop để đảm bảo hiệu quả sử dụng tốt nhất.
                </p>
                <Link href="#" className="text-orange-500 hover:text-orange-600 font-medium inline-flex items-center gap-2">
                  Xem thêm
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Đăng ký nhận tin */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Đăng Ký Nhận Thông Tin
            </h2>
            <p className="text-lg mb-8 text-orange-100">
              Nhận ngay thông tin về sản phẩm mới và khuyến mãi hấp dẫn
            </p>
            <form className="flex gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <button
                type="submit"
                className="bg-white text-orange-600 px-8 py-3 rounded-full font-medium hover:bg-orange-100 transition-colors"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
