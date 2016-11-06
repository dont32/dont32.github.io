function getJson(url, callback) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			callback(JSON.parse(request.responseText));
		}
		else {
			callback(null);
		}
	}
	request.send();
}

var categoriesUL = document.getElementById('categoiesList');
var featuredProducts = document.getElementById('featuredProducts');
var modal = document.getElementById('myModal');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
var closeSpan = document.getElementsByClassName("close")[0];
var btnAll = document.getElementById('btnAll');
var phone = document.getElementById("phone_number");
var categoryLabel = document.getElementById('categoryLabel');

var isHome = true;
var featuredProductsCount = 0;
var allProducts = [];
var currentElem = 0;
var stepElem = 15;

function renderProduct(product) {
	if (featuredProductsCount === 4) {
		// <br class="clearBoth">
		var br = document.createElement("br");
		br.className = "clearBoth";
		featuredProducts.appendChild(br);
		featuredProductsCount = 0;
	}
	var centerBoxContentsFeatured = document.createElement("div");
	var productCol = document.createElement("div");
	var imgDiv = document.createElement("div");
	var img = document.createElement("img");
	var aimg = document.createElement("a");
	var priceDiv = document.createElement("div");
	var strong = document.createElement("strong");
	var normalPrice = document.createElement("span");
	var productSpecialPrice = document.createElement("span");
	var prodInfo = document.createElement("div");
	var nameDiv = document.createElement("div");
	var description = document.createElement("div");
	
	centerBoxContentsFeatured.className = "centerBoxContentsFeatured centeredContent back first";
	productCol.className = "product-col";
	imgDiv.className = "img";
	img.src = product.img;
	img.className = "image_icon"
	img.setAttribute("width", "195");
	img.setAttribute("height", "195");
	priceDiv.className = "price";
	normalPrice.className = "normalprice";
	normalPrice.innerHTML = product.price;
	productSpecialPrice.className = "productSpecialPrice";
	productSpecialPrice.innerHTML = product.specialPrice;
	prodInfo.className = "prod-info";
	nameDiv.className = "prod-name";
	nameDiv.innerHTML = product.name;
	description.className = "nm";
	aimg.href = "#";
	description.innerHTML = product.description;
	centerBoxContentsFeatured.appendChild(productCol);
	productCol.appendChild(imgDiv);
	productCol.appendChild(priceDiv);
	productCol.appendChild(prodInfo);
	aimg.appendChild(img)
	imgDiv.appendChild(aimg);
	priceDiv.appendChild(strong);
	strong.appendChild(normalPrice);
	strong.appendChild(productSpecialPrice);
	prodInfo.appendChild(nameDiv);
	prodInfo.appendChild(description);
	featuredProducts.appendChild(centerBoxContentsFeatured);
	featuredProductsCount++;
	aimg.onclick = function() {
		return false;
	}
	img.onclick = function(){
		modal.style.display = "block";
		modalImg.src = this.src;
		captionText.innerHTML = product.description;
	}
}

getJson('/infomation.json', function(data){
	phone.innerHTML = data.phone;
	data.categories.forEach(function(category){
		var categoriesName = category.name;
		var li = document.createElement('li');
		var span = document.createElement('span');
		var a = document.createElement('a');
		li.className = 'category-top_un';
		span.className = 'top-span';
		a.className = 'category-top_un a_u';
		a.href = "#";
		a.innerHTML = category.name;
		span.appendChild(a);
		li.appendChild(span);
		categoriesUL.appendChild(li);
		getJson(category.url, function(productsData){
			a.onclick = function() {
				featuredProducts.innerHTML = "";
				featuredProductsCount = 0;
				featuredProducts.appendChild(categoryLabel);
				categoryLabel.innerHTML = category.name.toUpperCase() + " PRODUCTS";
				Array.prototype.forEach.call(document.getElementsByClassName('a_u'), function(el) {
					el.style.backgroundColor = "";
				});
				this.style.backgroundColor = "rgb(40,160,180)";
				isHome = false;
				allProducts.forEach(function(product){
					if (product.categoryName === category.name){
						renderProduct(product.product);
					}
				});
				return false;
			}
			productsData.products.forEach(function(product){
				allProducts.push({
					categoryName: category.name,
					product: product
				});
				if (currentElem < stepElem) {
					renderProduct(product);
					currentElem++;
				}
			});
		});
	});
});

closeSpan.onclick = function() { 
	modal.style.display = "none";
	return false;
}

btnAll.onclick = function() {
	featuredProducts.innerHTML = "";
	featuredProductsCount = 0;
	currentElem = 0;
	stepElem = 15;
	isHome = true;
	featuredProducts.appendChild(categoryLabel);
	categoryLabel.innerHTML = "FEATURED PRODUCTS";
	Array.prototype.forEach.call(document.getElementsByClassName('a_u'), function(el) {
		el.style.backgroundColor = "";
	});
	this.style.backgroundColor = "rgb(40,160,180)";
	allProducts.forEach(function(product){
		if (currentElem < stepElem) {
			renderProduct(product.product);
			currentElem++;
		}
	});
	return false;
}

window.onscroll = function(ev) {
	currentElem = 0;
	stepElem = 15;
    if (isHome){
		if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)) {
			if (stepElem + 15 > allProducts.length) {
				stepElem = allProducts.length;
			}
			else {
				stepElem += 15;
			}
			while (currentElem < stepElem) {
				renderProduct(allProducts[currentElem].product);
				currentElem++;
			}
		}
	}
};