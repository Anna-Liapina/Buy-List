//BEGIN











/*function for for smooth page loading*/
setTimeout(function() {
	$('body').addClass('body_visible');
}, 200);




$(function() {

	addNewProduct("Помідори 🍅", 1);
	addNewProduct("Печиво 🍪", 100);
	addNewProduct("Огірки 🥒", 5);
	addNewProduct("Сир 🧀", 1);

	/*function for buying products*/
	$(document).on("click",".btn-secondary.teni", function() {

		let product_id = $(this).parent().parent().parent().attr("data-product-id");
		console.log(product_id);
		checkoutProduct(product_id);

	});
    
    
    /*function for deleting products from the list*/
	$(document).on("click", ".list-group-item .delete", function() {

		let product_id = $(this).parent().parent().parent().attr("data-product-id");
		deleteProductFromList(product_id);

	});


	/*function for adding new products to the list*/
	$("#button-add-item").click(function() {

		let new_product_name = $("#new-product-name").val();
		addNewProduct(new_product_name, 1);

	});


	/* function for responding on ENTER */
	$(".form-control").on('keypress', function(e) {
		if (e.which == 13) {
			let new_product_name = $("#new-product-name").val();
			addNewProduct(new_product_name, 1);
		}
	});








	//END
});


/**
 * Function to add product in the list
 * @param  {[string]} new_product_name new product name
 * @param  {[int]} product_quantity product quantity
 */
function addNewProduct(new_product_name, product_quantity) {
	let new_product_id = getRandomString(8);

	$(".list-group").append('<li class="list-group-item" data-product-id="' + new_product_id + '">' +
		'	<div class="row">' +
		'		<div class="col">' +
		'			<span class="item-name m-1">  ' + new_product_name + '  </span>' +
		'		</div>' +
		'			<div class="col text-center"> ' +
		'				<button class="btn btn-danger remove add-remove" type="button" data-tooltip=" Видалити товар " >-</button> <input class="form-control item-counter" disabled placeholder="' + product_quantity + '" type="text" value="' + product_quantity + '"> <button class="btn btn-success add add-remove" type="button"  data-tooltip=" Додати товар " >+</button>' +
		'			</div>' +
		'			<div class="col text-end">' +
		'				<button class="btn btn-secondary teni" type="button"  data-tooltip=" Оформити " >Куплено</button> <button class="btn delete btn-danger" type="button"  data-tooltip=" Видалити " >x</button>' +
		'			</div>' +
		'		</div>' +
		'</li>');

	$(".remaining").append('<button class="btn btn-secondary" type="button" data-product-id=' + new_product_id + '><span class="">' + new_product_name + '</span> <span class="badge bg-warning">' + product_quantity + '</span></button> ')
	$("#new-product-name").val("");
}

/**
 * Function to add product in the list
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

function getProductNameFromId(product_id) {

	let product_name = $(".list-group-item[data-product-id=" + product_id + "] span.item-name").text();

	return product_name
}

function getProductQuantityFromId(product_id) {

	let product_quantity = $(".list-group-item[data-product-id=" + product_id + "] input.item-counter").val();

	return product_quantity
}

function markProductAsPurchased(product_id) {
	let product_quantity = getProductQuantityFromId(product_id);

	let product_name = getProductNameFromId(product_id);

	console.log(product_name + ": " + product_quantity);


	$(".list-group-item[data-product-id=" + product_id + "] span.item-name").addClass('crossed');
	$(".list-group-item[data-product-id=" + product_id + "] .add-remove.add").remove();
	$(".list-group-item[data-product-id=" + product_id + "] .add-remove.remove").remove();

	$(".list-group-item[data-product-id=" + product_id + "] .btn-secondary.teni").remove();
	$(".list-group-item[data-product-id=" + product_id + "] .btn-danger.delete").remove();

	$(".list-group-item[data-product-id=" + product_id + "] .col.text-end").append('<button class="btn btn-secondary teni notBought" id=notBought type="button"  data-tooltip=" Повернути " >Не куплено</button>');

}

function deleteProductFromCart(product_id) {
	$(".remaining .btn-secondary[data-product-id='" + product_id + "']").remove();
}

function addProductToReceipt(product_id) {
	$(".buying").append(' <button class="btn btn-secondary" type="button" data-product-id="' + product_id + '"><span class="crossed">' + getProductNameFromId(product_id) + '</span> <span class="badge bg-warning">' + getProductQuantityFromId(product_id) + '</span></button> ')

}

function deleteProductFromList(product_id) {
	alert("видалення продукта");
	$(".list-group-item[data-product-id=" + product_id + "]").remove();
	$(".remaining .btn-secondary[data-product-id=" + product_id + "]").remove();
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