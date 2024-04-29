// Dữ liệu mẫu
// const userData = [
//     {
//         "id": 6,
//         "magd": "14387723",
//         "sohd": "16812281",
//         "tongtien": 1000000.0,
//         "nganhang": "NCB",
//         "noidung": "Giao dịch mua hàng",
//         "trangthai": "succes",
//         "sp": "name:tên 2,quantity:2,price:20000.0\nname:tên them2,quantity:1,price:40300.0\n",
//         "giaohang": "succes",
//         "diachi": "ay",
//         "gmail": "mainichichimvm@gmail.com",
//         "sdt": "0981232",
//         "tennguoinhan": "nguoi dung2",
//         "ngaytao": "20240429161742"
//     }
// ]

// Hàm tạo nội dung XML cho file Excel
function generateExcelXML(data, nameTable) {
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>';
    xmlContent += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">';

    // Tạo worksheet
    xmlContent += '<Worksheet ss:Name="Sheet1">';
    xmlContent += '<Table>';

    // Tiêu đề bảng
    xmlContent += '<Row><Cell><Data ss:Type="String">' + nameTable + '</Data></Cell></Row>';

    // Tiêu đề cột
    xmlContent += '<Row>';
    for (let key in data[0]) {
        xmlContent += `<Cell><Data ss:Type="String">${key}</Data></Cell>`;
    }
    xmlContent += '</Row>';

    // Dữ liệu
    data.forEach((item) => {
        xmlContent += '<Row>';
        for (let key in item) {
            xmlContent += `<Cell><Data ss:Type="String">${item[key]}</Data></Cell>`;
        }
        xmlContent += '</Row>';
    });

    // Dòng ngày tạo
    const currentDate = new Date().toLocaleDateString();
    xmlContent += `<Row><Cell><Data ss:Type="String">Created Date: ${currentDate}</Data></Cell></Row>`;

    xmlContent += '</Table>';
    xmlContent += '</Worksheet>';
    xmlContent += '</Workbook>';

    return xmlContent;
}

// Tải xuống file Excel
export const downloadExcel = (data, nameTabe, filename) => {
    const xmlContent = generateExcelXML(data, nameTabe);

    const blob = new Blob([xmlContent], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Sử dụng hàm downloadExcel để tạo và tải xuống file Excel
// downloadExcel(userData, "tên bảng", 'user_data');
