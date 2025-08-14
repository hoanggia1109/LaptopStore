import { ISanPham, ILoai } from "@/app/lib/cautrucdata";
import Link from "next/link";

interface Props {
  params: { id: string };
  searchParams: { page?: string };
}

async function fetchLoai(): Promise<ILoai[]> {
  const res = await fetch(`${process.env.APP_URL}/api/loai`);
  return await res.json();
}

export default async function SanPhamTheoLoai({ params, searchParams }: Props) {
  const idLoai = params.id;
  const currentPage = Number(searchParams.page) || 1;
  const itemsPerPage = 12;

  // Lấy danh sách sản phẩm theo loại với phân trang
  const resSP = await fetch(
    `${process.env.APP_URL}/api/san_pham?loai=${idLoai}&page=${currentPage}&limit=${itemsPerPage}`
  );
  const { products: sp_arr, totalPages, totalItems } = await resSP.json();

  // Lấy danh sách loại
  const loai_arr: ILoai[] = await fetchLoai();
  const tenLoai = loai_arr.find((loai) => loai.id.toString() === idLoai)?.ten_loai ?? idLoai;

  // Tính toán range cho phân trang
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);
  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="relative flex gap-8">
      {/* Sidebar danh mục loại */}
      <div className="w-1/4">
        <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto bg-white rounded-lg shadow-lg">
          <div className="p-4 border-b border-orange-100">
            <h2 className="text-xl font-bold text-orange-600">
              Danh mục loại
            </h2>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
          {loai_arr.map((loai) => (
            <li key={loai.id}>
              <Link
                href={`/san_pham/loai/${loai.id}`}
                    className={`text-orange-600 hover:text-orange-500 transition-colors duration-200 flex items-center group ${
                      loai.id.toString() === idLoai ? "font-bold" : ""
                }`}
              >
                    <span className={`w-1 h-4 bg-orange-400 mr-2 group-hover:h-6 transition-all duration-200 ${
                      loai.id.toString() === idLoai ? "h-6" : ""
                    }`}></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                {loai.ten_loai}
                    </span>
              </Link>
            </li>
          ))}
        </ul>
          </div>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <section className="w-3/4">
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg p-4 mb-6 shadow-lg">
          <h1 className="text-2xl font-bold uppercase text-white">
            {tenLoai} ({totalItems} sản phẩm)
        </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sp_arr.map((sp: ISanPham) => (
            <div
              key={sp.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative overflow-hidden pt-[100%]">
                {sp.hinh ? (
                  <img
                    src={sp.hinh}
                    alt={sp.ten_sp}
                    className="absolute inset-0 w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-orange-50 text-orange-300">
                    <span className="text-lg">Không có hình</span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 text-orange-900 line-clamp-2 min-h-[3.5rem] group-hover:text-orange-600 transition-colors">
                  {sp.ten_sp}
                </h2>
                <p className="text-orange-600 font-bold mb-4 text-right text-xl">
                {Number(sp.gia).toLocaleString("vi")} VNĐ
              </p>
                <div className="flex justify-between items-center pt-3 border-t border-orange-100">
                <Link
                  href={`/san_pham/${sp.id}`}
                    className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-200 text-sm font-medium shadow-md hover:shadow-lg"
                >
                    Mua ngay
                </Link>
                <Link
                  href={`/san_pham/${sp.id}`}
                    className="text-orange-500 hover:text-orange-700 font-medium transition-colors duration-200"
                >
                  Chi tiết
                </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-1">
            {currentPage > 1 && (
              <Link
                href={`/san_pham/loai/${idLoai}?page=1`}
                className="px-3 py-2 bg-orange-100 text-orange-800 rounded-md hover:bg-orange-200 transition-colors"
              >
                «
              </Link>
            )}
            
            {currentPage > 1 && (
              <Link
                href={`/san_pham/loai/${idLoai}?page=${currentPage - 1}`}
                className="px-3 py-2 bg-orange-100 text-orange-800 rounded-md hover:bg-orange-200 transition-colors"
              >
                ‹
              </Link>
            )}
            
            <div className="flex gap-1">
              {pages.map((page) => (
                <Link
                  key={page}
                  href={`/san_pham/loai/${idLoai}?page=${page}`}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    currentPage === page
                      ? "bg-orange-500 text-white"
                      : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                  }`}
                >
                  {page}
                </Link>
              ))}
            </div>

            {currentPage < totalPages && (
              <Link
                href={`/san_pham/loai/${idLoai}?page=${currentPage + 1}`}
                className="px-3 py-2 bg-orange-100 text-orange-800 rounded-md hover:bg-orange-200 transition-colors"
              >
                ›
              </Link>
            )}

            {currentPage < totalPages && (
              <Link
                href={`/san_pham/loai/${idLoai}?page=${totalPages}`}
                className="px-3 py-2 bg-orange-100 text-orange-800 rounded-md hover:bg-orange-200 transition-colors"
              >
                »
              </Link>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
