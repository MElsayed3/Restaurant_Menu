// JavaScript Document
/*jshint esversion: 6 */
$(document).ready(function(){
	"use strict";
	
	//navbar
	//click event (change their colors)
	$(".nav-link").click(function(e){
		e.preventDefault();
		$(".nav-link").css({
			color: "rgba(170, 173, 180, 1.00)",
			textDecoration: "none"
		});
		$(this).css({
			color: "rgba(245,245,245,1.00)",
			textDecoration: "underline"
		});
	});
	
	//End of navbar
	
	
	
	
	//first slider (offers) speeding the sliding
	$('.carousel').carousel({
  		interval: 5000
	});
	
	
	//showing the prices section on every item on the slider with animation
	var carousel_items = document.getElementsByClassName("carousel-item");
	function ShowSliderPrice_animation(){
		
		for(var i = 0; i<carousel_items.length; i++){
			
			if(carousel_items[i].classList.contains("active")){
				$(".carousel-item > .slider-price-section").css({
					display : "none",
					left: "-50%"
				});
				var SliderPrice = "#"+carousel_items[i].getAttribute("id")+" > .slider-price-section";
				$(SliderPrice).css("display", "block").animate({
						left: "0"
					}, 200);
				break;
			}
		}
	}
	
	
	//calling ShowSliderPrice_animation after 800ms for the first time
	setTimeout(ShowSliderPrice_animation, 800);
	//calling ShowSliderPrice_animation evertime the slider slides
	$('#carouselExampleIndicators').bind('slide.bs.carousel', function () {
		setTimeout(ShowSliderPrice_animation, 800);
	});
	
	//slider controls events click and hover to call the ShowSliderPrice_animation function
	$(".carousel-control-prev , .carousel-control-next").click(function(){
		setTimeout(ShowSliderPrice_animation, 800);
	});
	
	//End of first slider (offers) speeding the sliding
	
	
	
	
	
	//menu section
	//filling the menu with data from arrays
	var dishes_name_arr = ["Margherita Pizza", "Shrimp Scampi Pasta", "Spaghetti clams", "Chicken Margherita Pizza", "Chicken Cacciatore"];
	var dishes_price_arr = [22, 15, 30, 55, 40];
	
	var desserts_name_arr = ["Chocolate Tiramisu", "Brownie Trifle", "Pumpkin coconut custard", "Cheesecake", "Mango cheesecake", "Zeppole"];
	var desserts_price_arr = [12, 18, 22, 13, 15, 19];
	
	let drinks_name_arr = ["watermelon cocktail", "lemonade cocktail", "Italian Cream Soda", "Frozen Cappuccino"];
	let drinks_price_arr = [6, 3, 4, 11, 8];
	
	
	//menu item class
	class menu_item{
		constructor(itemname, itemprice){
			this.ItemName = itemname;
			this.ItemDots = "..........";
			this.ItemPrice = itemprice;
		}
		Create_OneMenuItem(DivID){
			$("#"+DivID).append("<div class='row menu-item'><div class='col-5 menu-item-name'>"+this.ItemName+"</div><div class='col menu-item-dots'>"+this.ItemDots+"</div><div class='col menu-item-price'>"+this.ItemPrice+"$"+"</div></div>");
		}
		
		//set the height of every div in the menu to be as much as the tallest one
		static SetHeight_MenuDivs(){
			let dishesDiv_height = parseInt($("#dishes-menu").css("height"));
			let dessertDiv_height =parseInt($("#dessert-menu").css("height"));
			let drinksDiv_height =parseInt($("#drinks-menu").css("height"));

			let menuDivs_heights = [drinksDiv_height , dishesDiv_height , dessertDiv_height ];
			menuDivs_heights.sort();
			menuDivs_heights.reverse();
			$(".menu , .cover-back , .cover-front , .center-cover").css("height", menuDivs_heights[0]+"px");


		}
		
	}
	
	//a function called fillmenu to fill the menu with every kind of food i have in the arrays using the class menu_item
	function FillMenu(menu_name_array, menu_price_array, DivID){
		for(var i = 0; i<menu_name_array.length; i++){
			var new_MenuItem = new menu_item(menu_name_array[i], menu_price_array[i]);
			new_MenuItem.Create_OneMenuItem(DivID);
			
			
			//setting the line height of price and dots to be the same as the row's height
			var menu_item_height=$("#"+DivID+" .menu-item:eq("+i+")").css("height");
			
			$("#"+DivID+" .menu-item-dots:eq("+i+") ,#"+DivID+" .menu-item-price:eq("+i+")").css({
				height: menu_item_height,
				lineHeight : menu_item_height
			});
		}
	}
	
	//calling FillMenu function to fill the three divisions of the menu
	FillMenu(dishes_name_arr, dishes_price_arr, "dishes-menu");
	FillMenu(desserts_name_arr, desserts_price_arr, "dessert-menu");
	FillMenu(drinks_name_arr, drinks_price_arr, "drinks-menu");
	
	
	//calling the setheight_menudivs to set the height of every div in the menu
	menu_item.SetHeight_MenuDivs();	
	
		
	//menu buttons click events (open and close menu)
		$(".menu .menu-btn").click(function(e){
			e.preventDefault();
			$(".menu .left-cover").css("transform", "rotateY(-180deg)");
			setTimeout(function(){
				$(".menu .right-cover").css("transform", "rotateY(180deg)");
			},300);
		
		});
		
		$(".menu .menu-exit-btn").click(function(){
			$(".menu .right-cover").css("transform", "rotateY(0deg)");
			setTimeout(function(){
				$(".menu .left-cover").css("transform", "rotateY(0deg)");
			},300);
		});
	
	
	//End of menu section
	
	//Recipes section
		
	/*
	<div class="recipes-section">
		<div class="container">
			<div class="recipes-slider-wrapper">
				<div class="recipes-slider">
					<div class="recipes-item">
						<img src="" alt="">
						<h1>Item one</h1>
						<button>Show the recipe</button>
					</div>
				</div>
			</div>
		</div>	
	</div>
	*/
	let recipes_slider_wrapper = $(".recipes-slider-wrapper");
	let recipes_slider = $(".recipes-slider");
	let recipes_items = $(".recipes-item");
	let recipes_left_button = $(".recipes-slider-wrapper #Recipes_left_button i")
	let recipes_right_button = $(".recipes-slider-wrapper #Recipes_right_button i")
	
	//setting the width of recipes slider and recipes items according to the items inside it 
	let recipes_slider_width = (recipes_slider_wrapper.width()/3)*recipes_items.length;
	recipes_slider.css("width" , recipes_slider_width);
	recipes_items.css("width" , recipes_slider_wrapper.width()/3);
	
	//setting the last item at the beginning and give a margin left to the slider
	$(".recipes-item:last").insertBefore(".recipes-item:first");
	recipes_slider.css("margin-left", recipes_items.width()*-1);
	
	
	//function to move the slider right and left with animation
	let ActivateTheSliderClick = true;
	function Recipes_slider_Movement(leftORright){
		if(ActivateTheSliderClick){
			let CurrentRecipes_ItemZoom_Attr = $(".recipes-item-zoom").attr("data-recipes-index");
			$("[data-recipes-index='"+CurrentRecipes_ItemZoom_Attr+"']").removeClass("recipes-item-zoom");
			ActivateTheSliderClick = false;
			if(leftORright == "right"){
				
				//adding the zoom class to the middle item
				$("[data-recipes-index='"+CurrentRecipes_ItemZoom_Attr+"']").next().addClass("recipes-item-zoom");
				
				recipes_slider.animate({
					marginLeft: "-="+recipes_items.width()
				} , 500 , function(){
					
					$(".recipes-item:first").insertAfter(".recipes-item:last");
					recipes_slider.css("margin-left", recipes_items.width()*-1);
					ActivateTheSliderClick = true;
				});
			}
			else{
				
				//adding the zoom class to the middle item
				$("[data-recipes-index='"+CurrentRecipes_ItemZoom_Attr+"']").prev().addClass("recipes-item-zoom");
				
				recipes_slider.animate({
					marginLeft: "+="+recipes_items.width()	
				} , 500 , function(){
					$(".recipes-item:last").insertBefore(".recipes-item:first");
					recipes_slider.css("margin-left", recipes_items.width()*-1);
					ActivateTheSliderClick = true;
				});
			}
				
		}	
	}
	
	
	//buttons click events
	recipes_right_button.click(function(){
		 Recipes_slider_Movement("right");
	});
	
	recipes_left_button.click(function(){
		 Recipes_slider_Movement("left");
	});
	
	
	//zoom in out function
//	let lastRecipes_Item = parseInt($(".recipes-item:last-of-type").css("left"));
//	function AddRemove_class(){
//		let CurrentItemHasZoom_attr = $(".recipes-item-zoom").attr("data-recipes-index");
//		$("[data-recipes-index='"+CurrentItemHasZoom_attr+"']").removeClass("recipes-item-zoom");
//		$("[data-recipes-index='"+CurrentItemHasZoom_attr+"']").next().addClass("recipes-item-zoom");
//		
//		var recipes_ITEM = $(".recipes-item");
//		for(var i = 0; i<recipes_ITEM.length; i++){
//			let this_LeftPosition = recipes_ITEM[i].offsetLeft;
//			if(this_LeftPosition < 0){
//				recipes_ITEM[i].style = "left: "+lastRecipes_Item+"px";
//				console.log("s");
//				break;
//			}
//		}
//	}
	//End of recipes section
	
});