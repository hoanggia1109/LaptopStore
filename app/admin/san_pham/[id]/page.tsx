import { SanPhamModel, LoaiModel } from "@/app/lib/models";
import { ISanPham, ILoai } from "@/app/lib/cautrucdata";  
import UploadImage from "../UploadImage";

export default async function SuaSP({ params }: { params: { id: string } }) {
  const id = Number(params.id); // Tiếp nhận tham số id sản phẩm
  const loai_arr = await LoaiModel.findAll(); // Lấy ds loại
  const sp = await SanPhamModel.findByPk(id);

  if (!sp) {
    return <div className="p-6 text-red-500">Không tìm thấy sản phẩm</div>;
  }

  return (
    <form action={`/api/san_pham/${sp.id}`} method="POST" className="space-y-4 text-black">
      <h1 className="text-xl font-bold mb-4 bg-white p-2">Sửa Sản Phẩm</h1>
      <div className="flex justify-between">
        <div className="w-[48%]">Tên sản phẩm</div>
        <input type="text" name="ten_sp" defaultValue={sp.ten_sp} required className="border p-2 w-full" />
      </div>
      <div className="flex justify-between">
        <div className="w-[48%]">
          Hình ảnh (URL)
          <UploadImage name="hinh" />
          <input type="hidden" name="hinh" defaultValue={sp.hinh} />
          {sp.hinh && (
            <img src={sp.hinh} alt="Hình sản phẩm" className="w-20 h-20 mt-2 border rounded" />
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-[48%]">Giá gốc</div>
        <input type="number" name="gia" defaultValue={sp.gia} required className="border p-2 w-full" />
      </div>
      <div className="flex justify-between">
        <div className="w-[48%]">Giá KM</div>
        <input type="number" name="gia_km" defaultValue={sp.gia_km} className="border p-2 w-full" />
      </div>
      <div className="flex justify-between">
        <div className="w-[48%]">Ngày</div>
        <input type="date" name="ngay" defaultValue={sp.ngay} required className="border p-2 w-full" />
      </div>
      <div className="flex justify-between">
        <div className="w-[48%]">Loại sản phẩm</div>
        <select name="id_loai" defaultValue={sp.id_loai} className="border p-2 w-full">
          {loai_arr.map((c: any) => (
            <option key={c.id} value={c.id}>
              {c.ten_loai}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="w-[48%]">Ẩn/Hiện</div>
        <div className="flex gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="an_hien"
              value="1"
              defaultChecked={Boolean(sp.an_hien)}
              className="mr-2"
            />
            <span>Hiện</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="an_hien"
              value="0"
              defaultChecked={!Boolean(sp.an_hien)}
              className="mr-2"
            />
            <span>Ẩn</span>
          </label>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-[48%]">Nổi bật</div>
        <div className="flex gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="hot"
              value="1"
              defaultChecked={Boolean(sp.hot)}
              className="mr-2"
            />
            <span>Nổi bật</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="hot"
              value="0"
              defaultChecked={!Boolean(sp.hot)}
              className="mr-2"
            />
            <span>Bình thường</span>
          </label>
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Lưu sản phẩm
      </button>
    </form>
  );
} 