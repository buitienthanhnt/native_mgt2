const request_data = {
    http: "http://",
    https: "http://",
    ip: "192.168.1.153/",                 //  mochi-5g m6800(ubuntu cmd: "ip a" to get ipaddress)
    // ip: "192.168.99.100/",             // home ip
    // ip: "192.168.100.138/",            // ip jm360
    // uri_241: "magento1x/index.php/",   // win10 m6800
    uri_241: "magento241/index.php/",  // ubuntu m4700-2
    // uri_241: "magento242/pub/",           // ubuntu m4700-1
    // uri_241: "magento2git/index.php/", // desktop jm360
    rest: "rest/",
    v1: "V1/",
    data: {},
    value: [],
    name: "",
    title: "tha value title from config22",
    page_size: 5,
    api: {
        product_list: "productList/",
        product_detail: "productDetail/",
        product_related: "productRelated/",
        category_list: "category_List/",
        customer_data: "customer/",
        login_post: "customer/login",
        new_sid: "guest/newsid"
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