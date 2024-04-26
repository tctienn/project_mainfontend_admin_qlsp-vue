import axios from "axios";
import { domain, taocock } from "./CookieFuntion";
import { toast } from "vue3-toastify";

const url = domain

const notify = (text, type) => { // thông báo
    toast(text, {
        type: type,
        autoClose: 2000,
        dangerouslyHTMLString: true,
    });
};

const apiUser = axios.create({
    baseURL: url,
    timeout: 10000, // set timeout to 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

apiUser.interceptors.request.use(function (config) {
    if (config.method === 'get') {

        config.data = null // xác nhận phương thức get không gửi dữ liệu 
        config.headers = {
            // Authorization: `Bearer ${token}`,
            'Accept': 'application/json', // báo cho máy chủ muốn nhận dữ liệu response dạng json 
            'Content-Type': 'application/json'
        };
        return config

    }

    if (config.method === 'post') {


        config.headers = {
            // Authorization: `Bearer ${token2}`,
            'Accept': 'application/json', // báo cho máy chủ muốn nhận dữ liệu response dạng json 
            'Content-Type': 'application/json'
        };
        return config

    }

}, function (error) {
    // Xử lý lỗi

    console.log('lỗi ở intercepter.requset login')

    return Promise.reject(error);
});
apiUser.interceptors.response.use(function (response) {
    // Trả về dữ liệu phản hồi
    // localStorage.setItem('token', response.data.access_token)

    taocock('login_token_qlsp', response.data);
    // console.log(localStorage.getItem('token'))
    return response;
}, function (error) {
    // Xử lý lỗi
    if (error.response.status === 403) {
        notify("xác thực không hợp lệ : 403", "error")
    } else {
        notify(error.response.data, "error")
    }

    // console.log('lỗi')
    return Promise.reject(error);
});

export const login = (data) => {
    return apiUser.post(`login`, {
        userName: data.userName,
        passWord: data.passWord
    })
}

export const signup = (data) => {
    return apiUser.post(`login`, {
        userName: data.userName,
        passWord: data.passWord,
        sdt: data.sdt,
        gmail: data.gmail
    })
}