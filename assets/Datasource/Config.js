const request_data = {
    http: "http://",
    https: "http://",
//    ip: "192.168.1.214/",              //  mochi-5g: (192.168.1.214 :m6800)(192.168.1.153 :m4700)(ubuntu cmd: "ip a" to get ipaddress)
     ip: "192.168.1.153/",
    // ip: "192.168.99.100/",             // home ip
    // ip: "192.168.100.210/",            // ip jm360
//    uri_241: "magento1x/index.php/",   // win10 m6800
     uri_241: "magento243x/index.php/", // ubuntu m4700-2(new)
    // uri_241: "magento242/pub/",        // ubuntu m4700-1
    // uri_241: "magento2git/index.php/", // desktop jm360
    rest: "rest/",
    v1: "V1/",
    data: {},
    value: [],
    name: "",
    title: "tha value title from config22",
    page_size: 5,
    api: {
        product_list:    "productList/",
        product_detail:  "productDetail/",
        product_related: "productRelated/",
        category_list:   "category_List/",
        customer_data:   "customer/",
        login_post:      "customer/login",
        new_sid:         "guest/newsid",
        get_cart:        "cart/data",       // GET   : {{url}}/{{res}}/V1/cart/data?_tha_sid={{_tha_sid}}
        removeItem:      "cart/removeItem", // DELETE: {{url}}/{{res}}/V1/cart/removeItem/[item_id]?_tha_sid={{_tha_sid}}
        add_cart:        "cart/addToCart",  // POST  : {{url}}/{{res}}/V1/cart/addToCart?_tha_sid={{_tha_sid}}
        update_qty:      "cart/updateQty",  // PUT   : {{url}}/{{res}}/V1/cart/updateQty?_tha_sid={{_tha_sid}}
        empty_cart:      "cart/emptyCart",  // DELETE: {{url}}/{{res}}/V1/cart/emptyCart?_tha_sid={{_tha_sid}}
        get_currency:    "getCurrencyList", // GET   : {{url}}/{{res}}/V1/getCurrencyList?_tha_sid={{_tha_sid}}
        set_currency:    "updateCurrency",  // POST  : {{url}}/{{res}}/V1/updateCurrency?_tha_sid={{_tha_sid}}&currency=[]
    },
    // base_request : this.http+this.ip+this.uri_241+this.rest+this.v1, // not run
    webview_url: {
        new_acc: "http://192.168.100.210/magento1/customer/account/create/"
    },
    use_params: function (params) {
        var values = "?";
        for (const key in params) {
            values += key + "=" + params[key] + "&";
        }
        return values.slice(0, values.lastIndexOf("&")); // loại bỏ dấu:: "&" ở vị trí cuối cùng.
    }

};

export default request_data;
// https://imagecolorpicker.com/en : xem bảng màu.

// chay reacttocon cho android
// adb reverse tcp:9090 tcp:9090

// error:
// could not connect to TCP port 5554: cannot connect to 127.0.0.1:5554: No connection could be made because the target machine actively refused it. (10061)
// ===>fix
// adb kill-server
// adb start-server