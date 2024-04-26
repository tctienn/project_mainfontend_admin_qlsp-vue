// const datas = [
//     {
//         "id": 3,
//         "magd": null,
//         "sohd": "70980297",
//         "tongtien": 40000,
//         "nganhang": "scb",
//         "noidung": "Giao dịch mua hàng",
//         "trangthai": "false",
//         "sp": "name:tên 2,quantity:2,price:20000.0\n",
//         "giaohang": "wait",
//         "diachi": "sdfgh",
//         "gmail": "mainichichimvm@gmail.com",
//         "sdt": "0981232",
//         "tennguoinhan": "nguoi dung2",
//         "ngaytao": "20240422155722"
//     },
//     {
//         "id": 4,
//         "magd": null,
//         "sohd": "17918366",
//         "tongtien": 240,
//         "nganhang": "NCB",
//         "noidung": "Giao dịch mua hàng",
//         "trangthai": "false",
//         "sp": "name:tên thems2,quantity:4,price:40.0\nname:tên thems2,quantity:2,price:40.0\n",
//         "giaohang": "wait",
//         "diachi": "ay",
//         "gmail": "mainichichimvm@gmail.com",
//         "sdt": "0981232",
//         "tennguoinhan": "nguoi dung2",
//         "ngaytao": "20240422161506"
//     },
//     {
//         "id": 5,
//         "magd": "14387793",
//         "sohd": "16815281",
//         "tongtien": 80300,
//         "nganhang": "NCB",
//         "noidung": "Giao dịch mua hàng",
//         "trangthai": "succes",
//         "sp": "name:tên 2,quantity:2,price:20000.0\nname:tên them2,quantity:1,price:40300.0\n",
//         "giaohang": "wait",
//         "diachi": "ay",
//         "gmail": "mainichichimvm@gmail.com",
//         "sdt": "0981232",
//         "tennguoinhan": "nguoi dung2",
//         "ngaytao": "20240422161742"
//     }
//   ];


export const processInvoiceData = (data) => { /// lọc dữ liệu từ request invoice tuần hiện tại rồi đổ và 7 key thứ 2- chủ nhật 
  // Tạo một đối tượng để lưu trữ dữ liệu theo 7 ngày trong tuần
  const weekData = {
    "Monday": [],
    "Tuesday": [],
    "Wednesday": [],
    "Thursday": [],
    "Friday": [],
    "Saturday": [],
    "Sunday": []
  };

  // Lấy tuần hiện tại
  const currentWeek = getWeekNumber(new Date());

  // Lọc dữ liệu theo ngày trong tuần
  data.forEach(item => {
    const itemDate = new Date(item.ngaytao.substring(0, 4), // Năm
      parseInt(item.ngaytao.substring(4, 6)) - 1, // Tháng (đếm từ 0)
      item.ngaytao.substring(6, 8)); // Ngày

    const dayOfWeek = itemDate.getDay(); // Lấy số ngày trong tuần (0 = Chủ Nhật, 1 = Thứ Hai, ..., 6 = Thứ Bảy)
    const dayName = getDayName(dayOfWeek); // Lấy tên của ngày trong tuần

    // Kiểm tra xem hóa đơn có thuộc tuần hiện tại không
    if (getWeekNumber(itemDate) === currentWeek) {
      if (Object.prototype.hasOwnProperty.call(weekData, dayName)) {
        weekData[dayName].push(item);
      }
    }
  });

  // console.log(weekData);
  return weekData;
}

// Hàm trả về tên của ngày trong tuần dựa trên số ngày (0 - 6)
function getDayName(day) {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysOfWeek[day];
}

// Hàm trả về số tuần trong năm của một ngày cụ thể
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo;
}

/////////////////// lấy top 3 sản phẩm từ hóa đơn

export const getTopProducts = (data) => {
  let productCounts = {};

  // Đếm số lần xuất hiện của từng sản phẩm
  data.forEach(item => {
    let products = item.sp.split('\n').filter(Boolean);
    products.forEach(product => {
      let productName = product.split(',')[0].split(':')[1];
      if (productName in productCounts) {
        productCounts[productName]++;
      } else {
        productCounts[productName] = 1;
      }
    });
  });

  // Sắp xếp sản phẩm theo số lần xuất hiện giảm dần
  let sortedProducts = Object.entries(productCounts).sort((a, b) => b[1] - a[1]);

  // Lấy top 3 sản phẩm và số lần xuất hiện của chúng
  let topProducts = sortedProducts.slice(0, 3);

  // Tính tổng số lần xuất hiện của các sản phẩm không nằm trong top 3
  let otherProductCount = sortedProducts.slice(3).reduce((acc, curr) => acc + curr[1], 0);

  // Thêm sản phẩm "otherProduct" vào kết quả
  topProducts.push(["otherProduct", otherProductCount]);

  return topProducts;
}

// Sử dụng hàm với dữ liệu đã cho
// let topProducts = getTopProducts(datas);
// console.log(topProducts);

