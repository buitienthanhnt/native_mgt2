const request_data = {
    http: "http://",
    https: "http://",
    ip: "192.168.100.209/",  // jm360: cmd: ip a to get ipaddress
    // ip: "192.168.1.151/",  // mochi 192.168.1.150: ip a
    uri_241: "magento241/index.php/",
    uri_243: "magento243/pub/",
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