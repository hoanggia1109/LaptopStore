import { SanPhamModel } from "@/app/lib/models";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const loai = url.searchParams.get("loai");
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = Number(url.searchParams.get("limit")) || 12;
  const isAdmin = url.searchParams.get("admin") === 'true';
  const isHot = url.searchParams.get("hot");
  const offset = (page - 1) * limit;

  let where: any = {};
  if (loai) {
    where.id_loai = Number(loai);
  }
  if (isHot === 'true') {
    where.hot = true;
  }

  // Nếu là request từ trang admin, lấy tất cả sản phẩm
  if (isAdmin) {
    const sp_arr = await SanPhamModel.findAll({
      where,
      order: [["id", "desc"]],
    });
    return NextResponse.json({
      products: sp_arr,
      totalItems: sp_arr.length
    });
  }

  // Nếu là request thông thường, áp dụng phân trang
  const { count, rows: sp_arr } = await SanPhamModel.findAndCountAll({
    where,
    order: [["id", "desc"]],
    limit: isHot ? 8 : limit,
    offset: isHot ? 0 : offset,
  });

  return NextResponse.json({
    products: sp_arr,
    totalItems: count,
    currentPage: page,
    itemsPerPage: limit,
    totalPages: Math.ceil(count / limit)
  });
}

export async function POST(req: Request) {
  const formData = await req.formData();
  // Lấy dữ liệu từ form
  const ten_sp = formData.get("ten_sp") as string;
  const gia = Number(formData.get("gia"));
  const gia_km = Number(formData.get("gia_km"));
  const hinh = formData.get("hinh") as string;
  const ngay = formData.get("ngay") as string;
  const id_loai = Number(formData.get("id_loai"));
  const an_hien = formData.get("an_hien") === "1";
  const hot = formData.get("hot") === "1";

  await SanPhamModel.create({ ten_sp, gia, gia_km, hinh, ngay, id_loai, an_hien, hot });

  return NextResponse.redirect(new URL("/san_pham", req.url));
}
