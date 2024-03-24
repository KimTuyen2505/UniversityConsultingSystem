import React from "react";

export default function Forum() {
  const majors = {
    "Ngành Sư Phạm":
      "SƯ PHẠM NGỮ VĂN,SƯ PHẠM LỊCH SỬ,GIÁO DỤC TIỂU HỌC,GIÁO DỤC MẦM NON".split(
        ","
      ),
    "Ngành Kinh Tế":
      "THƯƠNG MẠI ĐIỆN TỬ,KIỂM TOÁN,MARKETING,LOGISTICS VÀ QUẢN LÝ CHUỖI CUNG ỨNG,QUẢN LÝ CÔNG NGHIỆP,QUẢN TRỊ KINH DOANH,TÀI CHÍNH - NGÂN HÀNG,KẾ TOÁN".split(
        ","
      ),
    "Ngành Ngoại Ngữ":
      "NGÔN NGỮ HÀN QUỐC,NGÔN NGỮ TRUNG QUỐC,NGÔN NGỮ ANH".split(","),
    "Ngành Công Nghiệp Văn Hóa":
      "TRUYỀN THÔNG ĐA PHƯƠNG TIỆN,ÂM NHẠC,THIẾT KẾ ĐỒ HỌA".split(","),
    "Ngành Tự Nhiên - Thực Phẩm":
      "TOÁN HỌC,CÔNG NGHỆ SINH HỌC,CÔNG NGHỆ THỰC PHẨM,HÓA HỌC".split(","),
    "Ngành Khoa Học Quản Lý":
      "TÂM LÝ HỌC,QUẢN LÝ ĐẤT ĐAI,LUẬT,GIÁO DỤC HỌC,QUẢN LÝ NHÀ NƯỚC,QUẢN LÝ TÀI NGUYÊN VÀ MÔI TRƯỜNG,KỸ THUẬT MÔI TRƯỜNG".split(
        ","
      ),
    "Ngành Kỹ Thuật - Công Nghệ":
      "CÔNG NGHỆ THÔNG TIN,CÔNG NGHỆ KỸ THUẬT Ô TÔ,KỸ THUẬT ĐIỀU KHIỂN VÀ TỰ ĐỘNG HÓA,KỸ THUẬT CƠ ĐIỆN TỬ,KỸ THUẬT ĐIỆN,KỸ THUẬT PHẦN MỀM".split(
        ","
      ),
    "Ngành Kiến Trúc - Xây Dựng - Quy Hoạch":
      "KIẾN TRÚC,KỸ THUẬT XÂY DỰNG".split(","),
    "Ngành Khoa Học Xã Hội Và Nhân Văn":
      "DU LỊCH,QUAN HỆ QUỐC TẾ,CÔNG TÁC XÃ HỘI".split(","),
  };
  // const columns = [
  //   {
  //     title: "Tên bài viết",
  //     key: "namePost",
  //   },
  //   {
  //     title: "Thời gian đăng",
  //     dataIndex: "timePost",
  //     key: "timePost",
  //   },
  // ];
  return (
    <div className="relative z-50 pt-5 mt-2 mb-2 w-4/5 m-auto">
      <div class="bg-clip-border rounded-xl bg-white shadow-md">
        <div class="bg-clip-border rounded-xl bg-transparent shadow-none m-0 p-6">
          {Object.keys(majors).map((major) => (
            <>
              <div className="flex justify-center text-3xl font-bold">
                Diễn Đàn Khối {major}
              </div>
              <div class="py-16">
                <div class="mx-auto px-6 max-w-6xl text-gray-500">
                  <div class="relative">
                    <div class="relative z-10 grid gap-3 grid-cols-6">
                      {majors[major].map((childMajor) => (
                        <div class="col-span-full lg:col-span-2 overflow-hidden flex relative p-8 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 cursor-pointer">
                          <div class="size-fit m-auto relative">
                            <h2 class="text-center font-semibold text-gray-950 text-2xl">
                              {childMajor}
                            </h2>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
