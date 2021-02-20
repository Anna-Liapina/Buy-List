
/*function for for smooth page loading*/
setTimeout(function() {
	$('body').addClass('body_visible');
}, 200);




//BEGIN
$(function() {

	addNewProduct("Помідори 🍅", 1);
	addNewProduct("Печиво 🍪", 1);
	addNewProduct("Огірки 🥒", 1);
	addNewProduct("Сир 🧀", 1);

	//$(document).on('keyup', 'span.item-name', function(){})

	/*for adding new products to the list*/
	$("#button-add-item").click(function() {

			let new_product_name = $("#new-product-name").val();

			if ($("#new-product-name").val() != "") {
				if ($("#new-product-name").val() != " ") {
					addNewProduct(new_product_name, 1);
				}
			}
	});

	/*for responding on ENTER */
	$(".form-control").on('keypress', function(e) {
		if (e.which == 13) {
			let new_product_name = $("#new-product-name").val();

			if ($("#new-product-name").val() != "") {
				if ($("#new-product-name").val() != " ") {
					addNewProduct(new_product_name, 1);
				}
			}

		}
	});


	/*for buying products*/
	$(document).on("click",".teni", function() {

		let product_id = $(this).parent().parent().parent().attr("data-product-id");
		//console.log(product_id);
		checkoutProduct(product_id);
	});
    

    /*for deleting products from the list*/
	$(document).on("click", ".list-group-item .delete", function() {

		let product_id = $(this).parent().parent().parent().attr("data-product-id");
		deleteProductFromList(product_id);

	});

	/*for additing name of products*/
	// $(document).on("click", ".list-group-item span.item-name", function() {

	// 	let product_id = $(this).parent().parent().parent().attr("data-product-id");
	//     additingNameOfProducts(product_id);
		
	// });

	/*for adding quantity of products*/
	$(document).on("click", ".add", function() {
		// alert("dodavannyua");

		let product_id = $(this).parent().parent().parent().attr("data-product-id");

		increaseQuantity(product_id);
	});


	/*for deleting quantity of products*/
	$(document).on("click", ".remove", function() {
		// alert("vidnimannyua");

		let product_id = $(this).parent().parent().parent().attr("data-product-id");
		decreaseQuantity(product_id);
	});

	//END
});



/*for cancel buying product*/
$(document).on("click", ".notBought", function() {

	let product_id = $(this).parent().parent().parent().attr("data-product-id");
	cancelBuyingProduct(product_id);
});


/**
 * Function to add product in the list
 * @param  {[string]} new_product_name new product name
 * @param  {[int]} product_quantity product quantity
 */
function addNewProduct(new_product_name, product_quantity) {
	let new_product_id = getRandomString(8);
	let remainingList = $(".remaining");

	$(".list-group").append('<li class="list-group-item" data-product-id="' + new_product_id + '">' +
		'	<div class="row">' +
		'		<div class="col">' +
		'			<span class="item-name m-1">  ' + new_product_name + '  </span>' + 


		// '<div class="ui mini input title-edit" <input type="text" placeholder="Нова назва"> </div>'+


		'		</div>' +

		'			<div class="col text-center"> ' +
		'				<button class="btn btn-danger remove add-remove" type="button" disabled data-tooltip=" Видалити товар " >-</button> <input class="form-control item-counter" id="item-counter" disabled placeholder="' + product_quantity + '" type="text" value="' + product_quantity + '"> <button class="btn btn-success add add-remove" type="button"  data-tooltip=" Додати товар " >+</button>' +
		'			</div>' +
		'			<div class="col text-end">' +
		'				<button class="btn btn-secondary teni" type="button"  data-tooltip=" Оформити " >Куплено</button> <button class="btn delete btn-danger" type="button"  data-tooltip=" Видалити " >x</button>' +
		'			</div>' +
		'		</div>' +
		'</li>');

		remainingList.append('<button class="btn btn-secondary pomogite" type="button" data-product-id=' + new_product_id + '><span class="">' + new_product_name + '</span> <span class="badge bg-warning">' + product_quantity + '</span></button> ');
		$("#new-product-name").val("");
}




/**
 * Function to add product to the cart
 * @param  {[string]} product_id product id
 */
function checkoutProduct(product_id) {

	alert("купівля продукта");

	//replace product in the list
	markProductAsPurchased(product_id);
	//delete from remaining
	deleteProductFromCart(product_id);
	//add to checked out
	addProductToReceipt(product_id);
}

function markProductAsPurchased(product_id) {

	$(".list-group-item[data-product-id=" + product_id + "] span.item-name").addClass('crossed');

	$(".list-group-item[data-product-id=" + product_id + "] .add-remove.remove").remove();
	$(".list-group-item[data-product-id=" + product_id + "] .add-remove.add").remove();

	$(".list-group-item[data-product-id=" + product_id + "] .btn-secondary.teni").remove();
	$(".list-group-item[data-product-id=" + product_id + "] .btn-danger.delete").remove();

	$(".list-group-item[data-product-id=" + product_id + "] .col.text-end").append('<button class="btn btn-secondary notBought" id=notBought type="button"  data-tooltip=" Повернути " >Не куплено</button>');

}

function deleteProductFromCart(product_id) {
	$(".remaining .btn-secondary[data-product-id='" + product_id + "']").remove();
}

function addProductToReceipt(product_id) {
	let product_name = getProductNameFromId(product_id);
	let product_quantity = getProductQuantityFromId(product_id);

	//console.log(product_name + ": " + product_quantity);

	$(".buying").append('<button class="btn btn-secondary buyBotton" type="button" data-product-id="' + product_id + '"><span class="crossed">' + product_name + '</span> <span class="badge bg-warning crossed">' + product_quantity + '</span></button> ')
}




/**
 * Function to remove product from the cart
 * @param  {[string]} product_id product id
 */
function cancelBuyingProduct(product_id) {

	alert("відміна купівлі продукта");

	//replace product in the list
	markProductAsNOTPurchased(product_id)
	//add to remaining
	addProductToCart(product_id);
	//delete from checked out
	deleteProductFromReceipt(product_id);
}

function markProductAsNOTPurchased(product_id){

	$(".list-group-item[data-product-id=" + product_id + "] .btn-secondary.notBought").remove();

	$(".list-group-item[data-product-id=" + product_id + "] span.item-name").removeClass('crossed');

	$(".list-group-item[data-product-id=" + product_id + "] .text-center").prepend('<button class="btn btn-danger remove add-remove" type="button" data-tooltip=" Видалити товар " >-</button>');
	$(".list-group-item[data-product-id=" + product_id + "] .text-center").append('<button class="btn btn-success add add-remove" type="button"  data-tooltip=" Додати товар " >+</button>');

	$(".list-group-item[data-product-id=" + product_id + "] .col.text-end").prepend('<button class="btn btn-secondary teni" type="button"  data-tooltip=" Оформити " >Куплено</button>');
	$(".list-group-item[data-product-id=" + product_id + "] .col.text-end").append('<button class="btn delete btn-danger" type="button"  data-tooltip=" Видалити " >x</button>');
	
}

function addProductToCart(product_id) {
	let product_name = getProductNameFromId(product_id);
	let product_quantity = getProductQuantityFromId(product_id);

	$(".remaining").append('<button class="btn btn-secondary" type="button" data-product-id=' + product_id + '><span class="">' + product_name + '</span> <span class="badge bg-warning">' + product_quantity + '</span></button> ')
}

function deleteProductFromReceipt(product_id){
	$(".buying .btn-secondary[data-product-id='" + product_id + "']").remove();
}




function deleteProductFromList(product_id) {
	alert("видалення продукта");
	$(".list-group-item[data-product-id=" + product_id + "]").remove();
	$(".remaining .btn-secondary[data-product-id=" + product_id + "]").remove();
}


// function additingNameOfProducts(product_id) {

// 	alert ("hsvdvsndlkv");
// 	$(".list-group-item[data-product-id=" + product_id + "] span.item-name").display = "none";
// 	$(".title-edit.input").visibility = "visible";

// }



function increaseQuantity(product_id) {

	let product_quantity = getProductQuantityFromId(product_id);
	let remainingList = $(".remaining");

	product_quantity = parseInt(product_quantity) + 1;
	
	let product = getProductFromId(product_id);

	product.find('#item-counter').attr("placeholder", product_quantity).val(product_quantity);
	let rl = remainingList.find(".pomogite[data-product-id='" + product_id + "']");
	rl.find(".badge").text(product_quantity);
	//$(".buying .btn-secondary[data-product-id='" + product_id + "']").remove();

	console.log(product_quantity);
	if(product_quantity>1){
	product.find(".remove").removeAttr('disabled');
	}
}



function decreaseQuantity(product_id) {

	let product_quantity = getProductQuantityFromId(product_id);
	let remainingList = $(".remaining");

	product_quantity = parseInt(product_quantity) - 1;
	
	let product = getProductFromId(product_id);
	if(product_quantity == 1) product.find(".remove").attr('disabled', 'disabled');
	product.find('#item-counter').attr("placeholder", product_quantity).val(product_quantity);
	let rl = remainingList.find(".pomogite[data-product-id='" + product_id + "']");
	rl.find(".badge").text(product_quantity);
	console.log(product_quantity);
}





function getProductNameFromId(product_id) {

	let product_name = $(".list-group-item[data-product-id=" + product_id + "] span.item-name").text();

	return product_name
}

function getProductQuantityFromId(product_id) {

	let product_quantity = $(".list-group-item[data-product-id=" + product_id + "] input.item-counter").val();

	return product_quantity
}

function getProductFromId(product_id) {
	let node = $(".list-group-item[data-product-id=" + product_id + "]");
	return node
}

function getRemainingSecondaryBottonFromId(product_id) {
	let node = remainingList.find(".pomogite[data-product-id='" + product_id + "']");
	return node
}

/*function for random id*/
function getRandomString(length) {
	var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var result = '';
	for (var i = 0; i < length; i++) {
		result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
	}
	return result;
}