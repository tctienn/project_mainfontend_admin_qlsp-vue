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
    if (error.response) {
        console.log('lỗi trong api admin', error)
        notify(error.response.data, "error")
    } else {
        console.log('lỗi không xác định', error)
        notify("Có lỗi không xác định xảy ra", "error")
    }


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

export const get_countAdmin = () => { // lấy dữ liệu hóa đơn trong tuần hện tại

    return apiUser.get(`user/cout-admin`)
}
export const get_countUser = () => { // lấy dữ liệu hóa đơn trong tuần hện tại

    return apiUser.get(`user/cout-user`)
}
export const get_countUserWait = () => { // lấy dữ liệu hóa đơn trong tuần hện tại

    return apiUser.get(`user/cout-userwait`)
}
export const get_freeDisk = () => { // lấy dữ liệu hóa đơn trong tuần hện tại

    return axios.get(domain + '/actuator/metrics/disk.free')
}
export const get_userDisk = () => { // lấy dữ liệu hóa đơn trong tuần hện tại

    return axios.get(domain + `/actuator/metrics/jvm.memory.used`)
}

export const get_TopUser = () => { // lấy dữ liệu hóa đơn trong tuần hện tại

    return apiUser.get(`invoice/get-top-user`)
}

export const get_invoices = (data) => { // lấy dữ liệu hóa đơn trong tuần hện tại

    return apiUser.get(`invoice/get-invoices`, {
        params: {

            page: (data.page - 1),
            size: data.size,
            sort: 'id,asc'
        }
    })
}

export const get_invoiceBySohd = (sohd) => { // lấy dữ liệu hóa đơn trong tuần hện tại

    return apiUser.get(`invoice/findter-name/${sohd}`)
}

export const get_invoiceWait = (data) => { // lấy dữ liệu hóa đơn trong tuần hện tại

    return apiUser.get(`invoice/get-invoice-wait`, {
        params: {

            page: (data.page - 1),
            size: data.size,
            sort: 'id,asc'
        }
    })
}


export const post_updategiaohang = (sohd, giaohang) => { // lấy dữ liệu hóa đơn trong tuần hện tại

    return apiUser.post(`invoice/update-giaohang?sohd=${sohd}&giaohang=${giaohang}`)
}

export const get_Blogs = (data) => { // lấy dữ liệu hóa đơn trong tuần hện tại

    return axios.get(domain + `/public/blog/get-blogs`, {
        params: {
            page: (data.page - 1),
            size: data.size,
            sort: 'id,asc'
        }
    })
}

export const get_Blogs_by_titleContaing = (data) => { // lấy dữ liệu hóa đơn trong tuần hện tại

    return apiUser.get(`blog/get-all-blogs-ByNameContaing`, {
        params: {
            title: data.title,
            page: (data.page - 1),
            size: data.size,
            sort: 'id,asc'
        }
    })
}

export const post_addBlog = (data) => {
    return apiUser.post(`blog/post-addBlog`, data)
}
export const post_updateBlog = (data) => {
    return apiUser.post(`blog/post-updateBlog`, data)
}

export const post_updateBlogImg = (idBlog, fileMainImg, fileBackgroungImg) => {
    let formData = new FormData();
    formData.append('idBlog', idBlog);
    formData.append('fileMainImg', fileMainImg);
    formData.append('fileBackgroungImg', fileBackgroungImg)
    if (getCookie('login_token_qlsp') == null) {
        return notify("người dùng chưa đăng nhập", "error")
    }
    const token = getCookie('login_token_qlsp').stringToken
    return axios.post(`${url}/blog/post-update-imgBLog`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const post_deleBlog = (idBlog) => {
    return apiUser.post(`blog/post-delete-blog?idBlog=${idBlog}`)
}

export const post_addBlogByRender = (blogRender) => {
    return apiUser.post(`blog/post-add-blog-render`, blogRender)
}

export const post_addCatergory = (catergory) => {
    return apiUser.post(`catergory/add-catergory`, catergory)
}
export const post_updateCatergory = (catergory) => {
    return apiUser.post(`catergory/update-catergory`, catergory)
}
export const post_deleteCategory = (idCatergory) => {
    return apiUser.post(`catergory/delete-catergory?idCatergory=${idCatergory}`)
}

export const post_addTag = (tag) => {
    return apiUser.post(`tag/add-tag`, tag)
}
export const post_updateTag = (tag) => {
    return apiUser.post(`tag/update-tag`, tag)
}
export const post_deleteTag = (idTag) => {
    return apiUser.post(`tag/delete-tag?idTag=${idTag}`)
}

export const post_addBrand = (brand) => {
    return apiUser.post(`brand/add-brand`, brand)
}
export const post_updateBrand = (brand) => {
    return apiUser.post(`brand/update-brand`, brand)
}

export const post_deleteBrand = (idBrand) => {
    return apiUser.post(`brand/delete-brand?idBrand=${idBrand}`)
}
export const post_updateImgBrand = (idBrand, fileImg) => {
    let formData = new FormData();
    formData.append('idBrand', idBrand);
    formData.append('fileImg', fileImg);
    if (getCookie('login_token_qlsp') == null) {
        return notify("người dùng chưa đăng nhập", "error")
    }
    const token = getCookie('login_token_qlsp').stringToken
    return axios.post(`${url}/brand/update-imgBrand`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const post_addSize = (size) => {
    return apiUser.post(`size/add-size`, size)
}
export const post_updateSize = (size) => {
    return apiUser.post(`size/update-size`, size)
}
export const post_deleteSize = (id) => {
    return apiUser.post(`size/delete-size?idSize=${id}`)
}
export const get_users = (data) => {
    return apiUser.get(`user/get-users`, {
        params: {
            page: (data.page - 1),
            size: data.size,
            sort: 'id,asc'
        }
    })
}