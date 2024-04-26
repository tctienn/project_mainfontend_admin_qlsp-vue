
import axios from 'axios';
import { domain } from './CookieFuntion';
// import {  taocock } from './cookie';
// import { menu_pina } from '@/pinia/Store';



const url = domain + '/public'



const apiUser = axios.create({
    baseURL: url,
    timeout: 10000, // set timeout to 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

apiUser.interceptors.request.use((config) => {
    config.headers = {
        // secret: "f5gDd1JLB0vq6VVBvzEbltq6iVuaddvk",
        // Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
    };

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
apiUser.interceptors.response.use(function (response) {
    // Trả về dữ liệu phản hồi
    // console.log('ay :', response)
    // localStorage.setItem('token', response.data.access_token)
    // taocock('login_token' , response.data.access_token,'36000');
    // console.log(localStorage.getItem('token'))

    return response;
}, function (error) {
    // Xử lý lỗi
    console.log('lỗi')
    return Promise.reject(error);
});

// export const get_product = 'http://localhost:8080/product/get-product?page=0&size=2&sort=id,asc'
export const get_products = (data) => {
    return apiUser.get(`/product/get-product`, {
        params: {

            page: (data.page),
            size: data.size,
            sort: 'id,asc'
        }
    })
}
export const get_blog_byrender = (data) => {
    return apiUser.get(`blog/get-blog-by-render`, {
        params: {

            page: (data.page),
            size: data.size,
            sort: 'id,asc'
        }
    })
}
export const get_product_byId = (id) => {
    return apiUser.get(`product/detail/${id}`, {

    })
}

export const get_blog_byrender_by_type = (type, size) => {
    return apiUser.get(`blog/get-blog-by-render-type`, {
        params: {

            page: 0,
            size: size,
            sort: 'id,asc',
            type: type
        }
    })
}

export const get_blog_by_id = (id) => {
    return apiUser.get(`blog/get-blog-by-id/${id}`, {

    })
}

export const get_products_by_name_containing = (data) => {
    return apiUser.get(`/product/filterByName`, {
        params: {
            name: data.name,
            page: (data.page - 1),
            size: data.size,
            sort: 'id,asc'
        }
    })
}


export const get_tags = () => {
    return apiUser.get(`/tag/get-tags`)
}
export const get_catergorys = () => {
    return apiUser.get(`catergory/get-catergorys`)
}
export const get_brands = () => {
    return apiUser.get(`brand/get-brands`)
}
export const get_sizes = () => {
    return apiUser.get(`size/get-sizes`)
}

export const get_products_by_idCatergory = (data) => {
    return apiUser.get(`product/get-product-by-idcategory`, {
        params: {
            id: data.id,
            page: (data.page - 1),
            size: data.size,
            sort: 'id,asc'
        }
    })
}

export const get_products_by_idbrand = (data) => {
    return apiUser.get(`product/filter`, {
        params: {
            idbrand: data.id,
            page: (data.page - 1),
            size: data.size,
            sort: 'id,asc'
        }
    })
}

export const get_products_by_idtag = (data) => {
    return apiUser.get(`product/tag/filter`, {
        params: {
            idtag: data.id,
            page: (data.page - 1),
            size: data.size,
            sort: 'id,asc'
        }
    })
}

export const get_products_by_idsize = (data) => {
    return apiUser.get(`product/get-product-by-idsize`, {
        params: {
            id: data.id,
            page: (data.page - 1),
            size: data.size,
            sort: 'id,asc'
        }
    })
}