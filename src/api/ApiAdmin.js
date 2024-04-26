import axios from "axios";
import { domain, getCookie } from "./CookieFuntion";
import { toast } from "vue3-toastify";
// import { sl } from "vuetify/locale";


const url = domain + '/admin'


const notify = (text, type) => { // thông báo
    toast(text, {
        type: type,
        autoClose: 4000,
        dangerouslyHTMLString: true,
    });
};

const apiUser = axios.create({
    baseURL: url,
    timeout: 10000, // set timeout to 10 seconds
    headers: {
        // 'Content-Type': 'application/json',
        'Accept': 'application/json', // báo cho máy chủ muốn nhận dữ liệu response dạng json 
        'Content-Type': 'application/json'
    },
});

apiUser.interceptors.request.use(function (config) {
    if (getCookie('login_token_qlsp') == null) {
        return notify("người dùng chưa đăng nhập", "error")
    }
    const token = getCookie('login_token_qlsp').stringToken
    if (config.method === 'get') {

        config.data = null // xác nhận phương thức get không gửi dữ liệu 
        config.headers = {
            Authorization: `Bearer ${token}`,

        };
        return config

    }

    if (config.method === 'post') {


        config.headers = {
            Authorization: `Bearer ${token}`,

        };
        return config

    }

}, function (error) {
    // Xử lý lỗi

    console.log('lỗi ở intercepter.requset user')

    return Promise.reject(error);
});
apiUser.interceptors.response.use(function (response) {
    // Trả về dữ liệu phản hồi
    // localStorage.setItem('token', response.data.access_token)

    // console.log(localStorage.getItem('token'))
    return response;
}, function (error) {
    // Xử lý lỗi
    console.log('lỗi trong api usser', error)
    notify(error.response.data, "error")

    // console.log('lỗi', error.response.data)
    return Promise.reject(error);
});

export const deleteImages = (idProduct, url) => {

    return apiUser.post(`product/delete-images?idProduct=${idProduct}&url=${url}`)
}

export const post_updateProduct = (dataProduct) => {

    return apiUser.post(`product/update-product`, dataProduct)
}

export const addImages = (file, idProduct) => {
    let formData = new FormData();
    formData.append('id', idProduct);
    formData.append('multipartFile', file);
    if (getCookie('login_token_qlsp') == null) {
        return notify("người dùng chưa đăng nhập", "error")
    }
    const token = getCookie('login_token_qlsp').stringToken
    return axios.post(`${url}/product/add-images`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
}


export const post_updateMainImg = (idProduct, file) => {
    let formData = new FormData();
    formData.append('idProduct', idProduct);
    formData.append('multipartFile', file);
    if (getCookie('login_token_qlsp') == null) {
        return notify("người dùng chưa đăng nhập", "error")
    }
    const token = getCookie('login_token_qlsp').stringToken
    return axios.post(`${url}/product/update-mainImg`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const post_addProduct = (dataProduct) => {

    return apiUser.post(`product/add-product`, dataProduct)
}

export const get_coutInvoiceWait = () => {

    return apiUser.get(`invoice/cout-invoice-wait`)
}


export const get_invoiceByWeek = () => { // lấy dữ liệu hóa đơn trong tuần hện tại

    return apiUser.get(`invoice/get-invoices-by-week`)
}