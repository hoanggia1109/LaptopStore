// app/loai/NutXoaLoai.tsx
"use client";
import { useRouter } from "next/navigation";

export default function NutXoaLoai({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Bạn có chắc chắn muốn xóa loại này?")) {
      try {
        const res = await fetch(`/api/loai/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          router.refresh();
        } else {
          alert("Có lỗi xảy ra khi xóa loại");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Có lỗi xảy ra khi xóa loại");
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-900"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  );
}
