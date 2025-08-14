"use client"
import Link from "next/link"
import {useEffect, useState } from "react"

export default function Menu(){
    const [user, setUser] = useState({ho_ten:""})

    useEffect(()=>{
        const u = JSON.parse(sessionStorage.getItem("user")||"{}")
        setUser(u)
        window.addEventListener("login",(e)=>{
            const user = JSON.parse(sessionStorage.getItem("user")||"{}");
            setUser(user)
        });
    },[])

    const linkClasses = "text-white hover:text-orange-200 transition-all duration-300 px-3 py-2 rounded-md hover:bg-orange-800/50"
    
    return (
        <>
          <Link href="/" className={linkClasses}>Trang chủ</Link>
          <Link href="/san_pham" className={linkClasses}>Sản phẩm</Link>
          <Link href="/loai" className={linkClasses}>Loại</Link>
          <Link href="/admin" className={linkClasses}>Admin</Link>

          {user.ho_ten && (
            <div className="relative group">
              <button className="text-white hover:text-orange-200 transition-all duration-300 px-3 py-2 rounded-md hover:bg-orange-800/50 flex items-center gap-2">
                <span>Chào {user.ho_ten}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                <Link href="/doi-pass" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">
                  Đổi mật khẩu
                </Link>
                <Link href="/quen-pass" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">
                  Quên mật khẩu
                </Link>
                <button
                  onClick={() => {
                    sessionStorage.removeItem("user");
                    window.location.href = "/";
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-orange-50"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          )}

          {!user.ho_ten && (
            <>
              <Link href="/dangnhap" className={linkClasses}>Đăng nhập</Link>
              <Link href="/dangky" className={linkClasses}>Đăng ký</Link>
            </>
          )}
        </>
      )
}
