

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
export const downloadExcel = (data, nameTable, filename) => {
    const xmlContent = generateExcelXML(data, nameTable);

    const blob = new Blob([xmlContent], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    const currentDate = new Date().toLocaleDateString();

    a.download = `${currentDate}_${filename}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Sử dụng hàm downloadExcel để tạo và tải xuống file Excel
// downloadExcel(invoiceData, "Invoice Report", 'invoices');
