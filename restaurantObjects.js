// From Douglas Crockford - Remedial Javascript
// http://javascript.crockford.com/remedial.html
if (!String.prototype.supplant) {
    String.prototype.supplant = function (o) {
        return this.replace(
            /\{([^{}]*)\}/g,
            function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' || typeof r === 'boolean' ? r : a;
            }
        );
    };
}

var FoodItem = function(name,calories,vegan,glutenFree,citrusFree) {
	this.name = name || 'No name';
	this.calories = calories || 0;
	this.vegan = vegan || false;
	this.glutenFree = glutenFree || false;
	this.citrusFree = citrusFree || false;
	this.toString = function(){
		var string = '';
		string += 'Name: {name}\nCalories: {calories}'.supplant(this);
		if (vegan) {
			string += '\nVegan!'
		}
		if (glutenFree) {
			string += '\nGluten free!'
		}
		if (citrusFree) {
			string += '\nCitrus free!'
		}
		return string;
	}
}

var Drink = function(name, description, price, ingredients) {
	this.name = name;
	this.description = description;
	this.price = price;
	this.ingredients = ingredients;
	this.toString = function(){
		var string = '';
		string += 'Name: {name}\nDescription: {description}\nPrice: {price}\nIngredients:'.supplant(this);
		for (var i=0; i<this.ingredients.length; i++) {
			string += ' '+this.ingredients[i].name+',';
		}
		string += '\n\n'
		return string;
	}
}
Drink.prototype.isVegan = function() {
	for(var i=0; i<this.ingredients.length; i++) {
		if(!this.ingredients[i].vegan) {return false;};
	}
	return true;
};

Drink.prototype.isGlutenFree = function() {
	for(var i=0; i<this.ingredients.length; i++) {
		if(!this.ingredients[i].glutenFree) {return false;};
	}
	return true;
};
Drink.prototype.isCitrusFree = function() {
	for(var i=0; i<this.ingredients.length; i++) {
		if(!this.ingredients[i].citrusFree) {return false;};
	}
	return true;
};
Drink.prototype.create = function(){
	var ingredientList = this.ingredients.map(function(item){return item.name});
	ingredientList = ingredientList.join(", ");
	return $('<div class="menu-item">'+
				'<p class="item-name">{name}</p><p class="price">${price}</p><p class="desc">{description}</p>'.supplant(this)+
				'<p class="ingredients">'+ingredientList+'</p>'+
				'<button class="add">Add to Order</button></div>');
}

var Plate = function(name, description, price, ingredients) {
	this.name = name;
	this.description = description;
	this.price = price;
	this.ingredients = ingredients;
	this.toString = function(){
		var string = '';
		string += 'Name:{name}\nDescription: {description}\nPrice: {price}\nIngredients:'.supplant(this);
		for (var i=0; i<this.ingredients.length; i++) {
			string += ' '+this.ingredients[i].name+',';
		}
		string += '\n\n'
		return string;
	}
}
Plate.prototype.isVegan = function() {
	for(var i=0; i<this.ingredients.length; i++) {
		if(!this.ingredients[i].vegan) {return false;};
	}
	return true;
};

Plate.prototype.isGlutenFree = function() {
	for(var i=0; i<this.ingredients.length; i++) {
		if(!this.ingredients[i].glutenFree) {return false;};
	}
	return true;
};
Plate.prototype.isCitrusFree = function() {
	for(var i=0; i<this.ingredients.length; i++) {
		if(!this.ingredients[i].citrusFree) {return false;};
	}
	return true;
};
Plate.prototype.create = function(){
	var ingredientList = this.ingredients.map(function(item){return item.name});
	ingredientList = ingredientList.join(", ");
	return $('<div class="menu-item">'+
				'<p class="item-name">{name}</p><p class="price">${price}</p><p class="desc">{description}</p>'.supplant(this)+
				'<p class="ingredients">'+ingredientList+'</p>'+
				'<button class="add">Add to Order</button></div>');
}

var Order = function(plates, drinks) {
	this.plates = plates;
	this.drinks = drinks;
	this.toString = function(){
		var string = '';
		for (var i=0; i<this.plates.length; i++) {
			string += this.plates[i].toString();
		}
		for (var i=0; i<this.drinks.length; i++) {
			string += this.drinks[i].toString();
		}
		return string;
	}
}

var Menu = function(plates, drinks) {
	this.plates = plates;
	this.drinks = drinks;
	this.toString = function(){
		var string = '';
		for (var i=0; i<this.plates.length; i++) {
			string += this.plates[i].toString();
		}
		for (var i=0; i<this.drinks.length; i++) {
			string += this.drinks[i].toString();
		}
		return string;
	}
}

var Restaurant = function(name, description, menu) {
	this.name = name;
	this.description = description;
	this.menu = menu;
	this.toString = function(){
		var string = '';
		string += 'Name: {name}\nDescription: {description}\n\nMenu:\n'.supplant(this) + menu.toString();
		return string;
	}
};

var Customer = function(dietaryPreference) {
	this.dietaryPreference = dietaryPreference;
	this.toString = function() {
		return 'This customer is ' + dietaryPreference;
	}
}

var calculateTotal = function(items) {
	var total = 0;
	for (var i=0; i<items.length; i++) {
		total += parseInt($(items[i]).find('.price').text().substring(1));
	}
	return '$'+total;
}

var checkHighlights = function(veganOn,glutenFreeOn,citrusFreeOn) {
	$('.menu-item').each(function(index,el){		
		if(!veganOn&&!glutenFreeOn&&!citrusFreeOn) {
			$(el).removeClass('highlight');
		} else {
			var veganMatch = false;
			var glutenMatch = false;
			var citrusMatch = false;
			if(veganOn) {
				veganMatch = $(el).attr('data-vegan')===veganOn.toString();
			} else {
				veganMatch = true;
			}
			if(glutenFreeOn) {
				glutenMatch = $(el).attr('data-gluten')===glutenFreeOn.toString();
			} else {
				glutenMatch = true;
			}
			if(citrusFreeOn) {
				citrusMatch = $(el).attr('data-citrus')===citrusFreeOn.toString();
			} else {
				citrusMatch = true;
			}
			
			if (veganMatch&&glutenMatch&&citrusMatch) {
				$(el).addClass('highlight');
			} else {
				$(el).removeClass('highlight');
			}
		}
	})
}

var sugar = new FoodItem('sugar', 50, true, true, true);
var tortilla = new FoodItem('tortilla', 0, true, false, true);
var beans = new FoodItem('beans',100,true,true,true);
var tequila = new FoodItem('tequila',100,true,true,true);
var limeJuice = new FoodItem('Lime juice', 50, true, true, false);
var avocado = new FoodItem("Avocado", 50, true, true, true);
var cilantro = new FoodItem("Cilantro", 10, true, true, true);
var cointreau = new FoodItem('Cointreau', 100, true, true, true);
var cheese = new FoodItem('Cheese', 100, false, true, true);
var margarita = new Drink('Margarita','Margarita', 300, [tequila,limeJuice,cointreau]);
var burritoPlate = new Plate("Burrito Plate", "Burrito Plate", 20, [tortilla, beans, cheese]);
var guacPlate = new Plate("Guacamole", "Guacamole", 10, [limeJuice, avocado, cilantro])
var myMenu = new Menu([burritoPlate, guacPlate],[margarita]);
var myRestaurant = new Restaurant("Jake & Teja", "Burritos", myMenu);


$(function() {
 	var veganOn = false;
 	var glutenFreeOn = false;
 	var citrusFreeOn = false;
	$("#order-clone").hide();

	for(var i=0; i<myMenu.plates.length; i++){
		var plate = myMenu.plates[i];
		var newElem = plate.create();
		newElem.appendTo("#menu");
		newElem.attr("data-vegan", plate.isVegan());
		newElem.attr("data-gluten", plate.isGlutenFree());
		newElem.attr("data-citrus", plate.isCitrusFree());
	};

	for(var i=0; i<myMenu.drinks.length; i++){
		var drink = myMenu.drinks[i];
		var newElem = drink.create();
		newElem.appendTo("#menu");
		newElem.attr("data-vegan", drink.isVegan());
		newElem.attr("data-gluten", drink.isGlutenFree());
		newElem.attr("data-citrus", drink.isCitrusFree());
	};

	$("#vegan-toggle").on("click", function(){
		veganOn = !veganOn;
		checkHighlights(veganOn,glutenFreeOn,citrusFreeOn);
		$(this).toggleClass('active');
	});

	$("#gluten-toggle").on("click", function(){
		glutenFreeOn = !glutenFreeOn;
		checkHighlights(veganOn,glutenFreeOn,citrusFreeOn);
		$(this).toggleClass('active');
	});

	$("#citrus-toggle").on("click", function(){
		citrusFreeOn = !citrusFreeOn;
		checkHighlights(veganOn,glutenFreeOn,citrusFreeOn);
		$(this).toggleClass('active');
	});

	$(document).on("click", ".add", function(){
		var newOrderItem = $("#order-clone").clone();
		newOrderItem.addClass('order-item');
		newOrderItem.find(".item-name").text($(this).closest(".menu-item").find(".item-name").text());
		newOrderItem.find(".price").text($(this).closest(".menu-item").find(".price").text());
		$("#current-order > h1").after(newOrderItem);
		newOrderItem.show();
		$('#total-price').text(calculateTotal($('.order-item')));
	});

	$(document).on('click','.delete-item',function(){
		$(this).closest('.order-item').remove();
		$('#total-price').text(calculateTotal($('.order-item')));
	})
	


});


