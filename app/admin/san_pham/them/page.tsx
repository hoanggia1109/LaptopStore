import { LoaiModel } from "@/app/lib/models";
import UploadImage from "../UploadImage";

export default async function ThemSP() {
  const loai_arr = await LoaiModel.findAll();
  
  return (
    <form action="/api/san_pham" method="POST" className="space-y-4 text-black">
      <h1 className="text-xl font-bold mb-4 bg-white p-2">Thêm Sản Phẩm</h1>
      
      <div className="flex justify-between">
        <div className="w-[48%]">Tên sản phẩm</div>
        <input type="text" name="ten_sp" required className="border p-2 w-full" />
      </div>

      <div className="flex justify-between">
        <div className="w-[48%]">
          Hình ảnh (URL)
          <UploadImage name="hinh" />
          <input type="hidden" name="hinh" />
        </div>
      </div>

      <div className="flex justify-between">
        <div className="w-[48%]">Giá gốc</div>
        <input type="number" name="gia" required className="border p-2 w-full" />
      </div>

      <div className="flex justify-between">
        <div className="w-[48%]">Giá KM</div>
        <input type="number" name="gia_km" className="border p-2 w-full" />
      </div>

      <div className="flex justify-between">
        <div className="w-[48%]">Ngày</div>
        <input type="date" name="ngay" required className="border p-2 w-full" />
      </div>

      <div className="flex justify-between">
        <div className="w-[48%]">Loại sản phẩm</div>
        <select name="id_loai" className="border p-2 w-full">
          {loai_arr.map((c: ILoai) => (
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
            <input type="radio" name="an_hien" value="1" defaultChecked className="mr-2" />
            <span>Hiện</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" name="an_hien" value="0" className="mr-2" />
            <span>Ẩn</span>
          </label>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="w-[48%]">Nổi bật</div>
        <div className="flex gap-4">
          <label className="inline-flex items-center">
            <input type="radio" name="hot" value="1" defaultChecked className="mr-2" />
            <span>Nổi bật</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" name="hot" value="0" className="mr-2" />
            <span>Bình thường</span>
          </label>
        </div>
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Thêm sản phẩm
      </button>
    </form>
  );
} 