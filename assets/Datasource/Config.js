const request_data = {
    http: "http://",
    https: "http://",
    ip: "192.168.100.138/",  // jm360: cmd: ip a to get ipaddress
    // ip: "192.168.1.151/",  // mochi 192.168.1.150: ip a
    // uri_241: "magento241/index.php/",
    uri_243: "magento243/pub/",
    uri_241: "magento2git/",
    rest: "rest/",
    v1: "V1/",
    data: {},
    value: [],
    name: "",
    title: "tha value title from config",
    page_size: 5,
    api: {
        product_list: "productList/",
        product_detail: "productDetail/",
        product_related: "productRelated/",
        category_list: "category_List/",
        customer_data: "customer/",
        login_post: "customer/login"
    },
    webview_url:{
        new_acc: "https://magento24.jmango.vn/index.php/default/customer/account/create/"
    },
    use_params: function(params){
        var values = "?";
        for (const key in params) {
         values += key + "=" + params[key] + "&";   
        }
        return values.slice(0, values.lastIndexOf("&")); // loại bỏ dấu:: "&" ở vị trí cuối cùng.
    }
    
};

export default request_data;
// http://192.168.100.138/magento2git/pub/media/catalog/product/cache/28d8c9adbc3607147ab31a297827436b//l/u/luma-yoga-kit-2.jpg
// http://192.168.100.138/magento2git/pub/media/catalog/product%E0%B2%AChe%EF%BF%BDadbc3607147ab31a297827436b/l/u/luma-yoga-kit-2.jpg
