function getAPI(api){
    const result=fetch(api)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        return data;
    })
    return result;
}
let selectedCategoryId="all";
renderProductList();
//category apt http://localhost:3000/category
//product apt http://localhost:3000/products
getAPI("http://localhost:3000/category")
.then((data)=>{
    let productCategory=document.getElementById("productCategory");
    // console.log(data);
    let product=data.map((item)=>{
        return `<div class="Category_item">${item}</div>`;
    });
    product=product.join("");
    // console.log(product);
    productCategory.innerHTML=product;
    return data;
})
.then((data)=>{
    let productCategory=document.querySelectorAll(".Category_item");
productCategory.forEach((item)=>{
    item.addEventListener("click",function(){
        selectedCategoryId=item.innerHTML;
        renderProductList();
    });
    
});
});

function renderProductList(){
    getAPI("http://localhost:3000/products")
    .then((data)=>{
        let productList=document.getElementById("productList");
        let product=data.filter((item)=>{
            return item.category==selectedCategoryId||selectedCategoryId=="all";
        });
        let productHTML=product.map((item)=>{
            return `<div class="item">
                <div class="item_image">
                <img src="${item.thumbnail}" alt="">
                </div>
                <div class="item_desc">
                <div class="item_name">${item.title}</div>
                <div class="item_price" style="color:red";>Giá ${item.price}$</div>
                <div class="item_stock">Còn lại: ${item.stock}</div>
                </div>
                </div>`
        }).join("");
        productList.innerHTML=productHTML;
    })
}
function renderProduct(product_title){
    getAPI("http://localhost:3000/products")
    .then((data)=>{
        let productList=document.getElementById("productList");
        let product=data.filter((item)=>{
            return item.title==product_title;
        });
        let productHTML=product.map((item)=>{
            return `<div class="item">
                <div class="item_image">
                <img src="${item.thumbnail}" alt="">
                </div>
                <div class="item_desc">
                <div class="item_name">${item.title}</div>
                <div class="item_price" style="color:red";>Giá ${item.price}$</div>
                <div class="item_stock">Còn lại: ${item.stock}</div>
                </div>
                </div>`
        }).join("");
        productList.innerHTML=productHTML;
    })
}
let productFind=document.getElementById("productFindButton");
productFind.addEventListener("click",function(){
      let productList=document.getElementById("productList");
    let productFindInput=document.getElementById("productFind");
        getAPI(`http://localhost:3000/products?q=${productFindInput.value}`)
        .then((data)=>{
             let productHTML=data.map((item)=>{
            return `<div class="item">
                <div class="item_image">
                <img src="${item.thumbnail}" alt="">
                </div>
                <div class="item_desc">
                <div class="item_name">${item.title}</div>
                <div class="item_price" style="color:red";>Giá ${item.price}$</div>
                <div class="item_stock">Còn lại: ${item.stock}</div>
                </div>
                </div>`
        }).join("");
        productList.innerHTML=productHTML;
        })
});

function ascSort(category){
    let productList=document.getElementById("productList");
    getAPI("http://localhost:3000/products?_sort=price&_order=asc")
    .then((data)=>{
        console.log(data);
       data= data.filter((item)=>{
           return item.category==category||category=="all";
        })
        let productHTML=data.map((item)=>{
            return `<div class="item">
                <div class="item_image">
                <img src="${item.thumbnail}" alt="">
                </div>
                <div class="item_desc">
                <div class="item_name">${item.title}</div>
                <div class="item_price" style="color:red";>Giá ${item.price}$</div>
                <div class="item_stock">Còn lại: ${item.stock}</div>
                </div>
                </div>`
        }).join("");
        productList.innerHTML=productHTML;
    })
}
function desSort(category){
      let productList=document.getElementById("productList");
    getAPI("http://localhost:3000/products?_sort=price&_order=desc")
    .then((data)=>{
        console.log(data);
       data= data.filter((item)=>{
           return item.category==category||category=="all";
        })
       let productHTML=data.map((item)=>{
            return `<div class="item">
                <div class="item_image">
                <img src="${item.thumbnail}" alt="">
                </div>
                <div class="item_desc">
                <div class="item_name">${item.title}</div>
                <div class="item_price" style="color:red";>Giá ${item.price}$</div>
                <div class="item_stock">Còn lại: ${item.stock}</div>
                </div>
                </div>`
        }).join("");
        productList.innerHTML=productHTML;
    })
}
let productSort=document.getElementById("productSort");
productSort.addEventListener("blur",function(){
    let productSortInput=productSort.value;
    console.log(productSortInput);
    console.log(selectedCategoryId);
    if(productSortInput=="1"){
        ascSort(selectedCategoryId);
    }
    else if(productSortInput=="2"){
        desSort(selectedCategoryId);
    }
});