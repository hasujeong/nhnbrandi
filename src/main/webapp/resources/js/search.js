const brandi_map = new Map();
brandi_map.set("product_url", "http://dev-search.diquest.com/LiJAa3OQERKgqwt/v1/search/advanced.search");
brandi_map.set("store_url", "http://dev-search.diquest.com/FQbDmOzB8r6y0JA/v1/search/advanced.search");
brandi_map.set("return_field", "&return=name,price,discount_percent,discount_price,images_image_thumbnail_url,is_today_delivery,order_count,seller_name");
brandi_map.set("return_field_store", "&return=name,type_name,images_profile_image_thumbnail_url,tags_name");

const hiver_map = new Map();
hiver_map.set("product_url", "http://dev-search.diquest.com/mK36Wkt0iGPRFMl/v1/search/advanced.search");
hiver_map.set("store_url", "http://dev-search.diquest.com/7LSC6BRXyNn98OI/v1/search/advanced.search");
hiver_map.set("return_field", "&return=name,price,discount_percent,discount_price,images_image_thumbnail_url,is_today_delivery,order_count,seller_name");
hiver_map.set("return_field_store", "&return=name,type_name,images_profile_image_thumbnail_url,tags_name");

const mami_map = new Map();
mami_map.set("product_url", "http://dev-search.diquest.com/Ztbaov4YOSIAHQf/v1/search/advanced.search");
mami_map.set("store_url", "http://dev-search.diquest.com/QfUm8YcykGOjhP0/v1/search/advanced.search");
mami_map.set("return_field", "&return=name,price,discount_percent,discount_price,images_image_thumbnail_url,is_today_delivery,order_count,seller_name");
mami_map.set("return_field_store", "&return=name,type_name,images_profile_image_thumbnail_url,tags_name");

var psize = 20;
var category_1 = null;
var category_12 = null;
var category_123 = null;

/**
	상품 검색
 */
function fn_search() {
	
	fn_tab('p');
	
	if ($("#searchTerm").val() != "") {
		$('#searchform_01').val($('#searchTerm').val());
	}

	if ($("#searchform_01").val() == "") {
		alert("검색어를 입력해주세요.");
		$('#searchform_01').focus();
		return false;
	}
	
	$('#searchTerm').val($('#searchform_01').val());
	$('#pageNo').val(1);
	$('#rs_cnt_text').css('visibility', 'visible');
	$('#item_list').html('');
	
	var cate_search_yn = $('#cate_search_yn').val();
	
	if (cate_search_yn == "N") {
		category_1 = null;
		category_12 = null;
		category_123 = null;
	
		$('#category_tree2').hide();
		$('#category_tree3').hide();
	}
	
	//검색 조건 -s-
	var sort = "&sort=alias:" + $('#sort').val();
	var cate_l = $('#cate_l').val();
	var cate_lm = $('#cate_lm').val();
	var cate_lms = $('#cate_lms').val();
	var sprice = $('#sprice').val();
	var eprice = $('#eprice').val();
	var today_yn = $('#today_yn').val();
	var sale_yn = $('#sale_yn').val();
	
	var option_str = sort;

	if (today_yn == "Y") {
		option_str = option_str + "&filter.is_today_delivery=true"
	}
	
	if (cate_l != "") {
		option_str = option_str + "&filter.category_1_id=" + cate_l;
	}
	
	if (cate_lm != "") {
		option_str = option_str + "&filter.category_2_id=" + cate_lm;
	}
	
	if (cate_lms != "") {
		option_str = option_str + "&filter.category_3_id=" + cate_lms;
	}
	
	if (sprice != "" && eprice != "") {
		option_str = option_str + "&filter.price=["+sprice+","+eprice+"]"
	}
	
	if ($('#category_list').length > 0) {
		option_str = option_str + "&group=category_1,category_12,category_123"
	} else {
		option_str = option_str + "&group="
	}
	//검색 조건 -e-
	
	var param = "q=" + $('#searchTerm').val() + "&start=" + $('#pageNo').val() + "&size=" + psize;
	param = param + "&q_option=and,shopping_idx&search_tp=sb&pr=pc&format=v2";
	param = param + option_str;
	param = param + fn_get_map('return_field');
	
	var totalSize = 0;

	fn_set_log(fn_get_map('product_url'), param, "PRODUCT");
			
	//PRODUCT
	$.ajax({
	    url: fn_get_map('product_url'),
	    type: 'get',
	    data: param,
	    success: function(data) {
	    	var result = data.data;
	    	var listSize = result.items.length;
	    	totalSize = result.totalCount;

	    	if (totalSize > 0) {
				//카테고리 출력
				if (cate_search_yn == "N") {
					if ($('#category_list').length > 0) {
						category_1 = result.category_1;
						category_12 = result.category_12;
						category_123 = result.category_123;
						
						var cateTag = "<li onclick=\"fn_category_search('L', 'A', this)\" class=\"on\">전체</li>";
						
						$.each(category_1, function(index, cate) {
							if (cate.id != '') {
								var cate_name = (cate.id).split('_');
								cateTag += "<li onclick=\"fn_category_search('L', '" + cate_name[1] + "', '" + cate_name[1] + '\u003e' + "', this)\">" + cate_name[0] + " (" + fn_price_format(cate.value) + ")</li>";
							}
						});
						
						$('#category_list').html(cateTag);
					}
				}
				
				var itemTag = '';
				
				$.each(result.items, function(index, item_source) {
					var item = item_source.source;
					
					if (((index+1)%4) == 0) {
						itemTag += '<li class="last">';
					} else {
						itemTag += '<li>';
					}
					
					itemTag += '<a href="#" style="cursor: pointer">';
					itemTag += '<span class="img_container" style="margin-left: 5px;"><img src="' + item.images_image_thumbnail_url + '"></span>';
					itemTag += '<span class="seller">' + item.seller_name + '</span>';
					
					if (item.is_today_delivery == 'true') {
						itemTag += '<span class="icon"><img src="resources/images/ic-baro.png"></span>';
					}
					
					itemTag += '<span class="title">' + item.name + '</span>';
					itemTag += '</a>';
					
					if (item.discount_percent > 0) {
						itemTag += '<span class="price"><strong style="font-size: 20px; color: #ff204b;">' + item.discount_percent + '%</strong>';
						itemTag += '<strong style="font-size: 20px; padding-left: 10px;">' + fn_price_format(item.discount_price) + '</strong>';
						itemTag += '<strong style="font-size: 11px; text-decoration: line-through; color: #767676; padding-left: 10px;">' + fn_price_format(item.price) + '</strong></span>';
					} else {
						itemTag += '<span class="price"><strong>' + fn_price_format(item.price) + '</strong></span>';
					}
					
					itemTag += '<span class="seller">' + fn_price_format(item.order_count) + '개 구매중</span>';
					
					itemTag += '</li>';
				});
				
				$('#item_list').html(itemTag);
				
				if ((totalSize > listSize) && (totalSize > psize)) {
					$('#more_btn').show();
				}
				
			} else {
				$('#rs_cnt_text').css('visibility', 'hidden');
				$('#item_list').html('<li id="no_rs">검색된 상품이 없습니다.</li>');
				$('#more_btn').hide();
			}
	    },
	    error: function(error) {
			console.log(error);
	    },
	    complete: function() {
			$('#rs_text').text("'" + $('#searchTerm').val() + "'");
			$('#rs_cnt').text(fn_price_format(totalSize));
	    }
	});
	
	fn_search_store(fn_get_map('product_url'), param);
	
}

/**
	상품 검색 정렬
 */
function fn_sort(obj, key) {
	
	if ($("#searchTerm").val() != "") {
		$('#sort').val(key);
		$('#list_ASC li').removeClass('on');
		$(obj).addClass('on');
		
		fn_search();
	} else {
		alert("검색어를 입력해주세요.");
		$('#searchform_01').focus();
	}

}

/**
	상품 카테고리 선택
 */
function fn_category_search(depth, key, key2, obj) {

	$('#cate_search_yn').val('Y');
	
	if (depth == "L") {
		if (key == "A") {
			$('#cate_search_yn').val('N');
			
			$('#cate_l').val('');
			$('#cate_lm').val('');
			$('#cate_lms').val('');
		} else {
			$('#cate_l').val(key);
			$('#cate_lm').val('');
			$('#cate_lms').val('');
			
			$('#category_list li').removeClass('on');
			$(obj).addClass('on');
	
			$('#category_tree2').show();
			$('#category_tree3').hide();
			
			var cateTag = "";
			
			$.each(category_12, function(index, cate) {
				if (cate.id != '') {
					var cate_name = (cate.id).split('\u003e');
					var cate_id2 = (cate_name[0]).split('_')[1] + '\u003e' + (cate_name[1]).split('_')[1];
					var cate_id = (cate_name[1]).split('_')[1];
				
					if ((cate_id2).indexOf(key2) > -1) {
						cateTag += "<li onclick=\"fn_category_search('M', '" + cate_id + "', '" + cate_id2 + "', this)\">" + (cate_name[1]).split('_')[0] + " (" + fn_price_format(cate.value) + ")</li>";
					}
				}
			});
			
			$('#category_list2').html(cateTag);
		}
	}
	
	if (depth == "M") {
		$('#cate_lm').val(key);
		$('#cate_lms').val('');
			
		$('#category_list2 li').removeClass('on');
		$(obj).addClass('on');
			
		$('#category_tree3').show();
			
		var cateTag = "";
		
		$.each(category_123, function(index, cate) {
			if (cate.id != '') {
				var cate_name = (cate.id).split('\u003e');
				var cate_id2 = (cate_name[0]).split('_')[1] + '\u003e' + (cate_name[1]).split('_')[1] + '\u003e' + (cate_name[2]).split('_')[1];
				var cate_id = (cate_name[2]).split('_')[1];
				
				if ((cate_id2).indexOf(key2) > -1) {
					cateTag += "<li onclick=\"fn_category_search('S', '" + cate_id + "', '" + cate_id2 + "', this)\">" + (cate_name[2]).split('_')[0] + " (" + fn_price_format(cate.value) + ")</li>";
				}
			}
		});
		
		$('#category_list3').html(cateTag);
	}
	
	if (depth == "S") {
		$('#cate_lms').val(key);
		
		$('#category_list3 li').removeClass('on');
		$(obj).addClass('on');
	}
	
	fn_search();

}

/**
	상품 가격 검색
 */
function fn_price_search() {
	
	var min = Number($('#minPrice').val());
	var max = Number($('#maxPrice').val());
	
	if ($('#minPrice').val() == "" || $('#maxPrice').val() == "") {
		alert("입력값을 확인해주세요.");
		
		$('#minPrice').focus();
	} else if (min > max) {
		alert("입력값을 확인해주세요.");
		
		$('#minPrice').val(min);
		$('#maxPrice').val(max);
		$('#minPrice').focus();
	} else {
		$('#sprice').val(min);
		$('#eprice').val(max);
		
		fn_search();
	}

}

/**
	상품 하루배송 여부 검색
 */
function fn_delivery_search(obj) {
	
	if ($("#searchTerm").val() != "") {
		if ($(obj).is(":checked")) {
			$('#today_yn').val('Y');
		} else {
			$('#today_yn').val('N');
		}
		
		fn_search();
	} else {
		alert("검색어를 입력해주세요.");
		$('#searchform_01').focus();
		$(obj).prop('checked', false);
	}
	
}

/**
	상품 세일 여부 검색
 */
function fn_sale_search(obj) {
	
	if ($("#searchTerm").val() != "") {
		if ($(obj).is(":checked")) {
			$('#sale_yn').val('Y');
		} else {
			$('#sale_yn').val('N');
		}
		
		fn_search();
	} else {
		alert("검색어를 입력해주세요.");
		$('#searchform_01').focus();
		$(obj).prop('checked', false);
	}
	
}

/**
	상품 검색 더보기
 */
function fn_more() {
	
	var start = (Number($('#pageNo').val())*20) + 1;
	var pno = Number($('#pageNo').val()) + 1;
	$('#pageNo').val(pno);
	
	//검색 조건 -s-
	var sort = "&sort=alias:" + $('#sort').val();
	var cate_l = $('#cate_l').val();
	var cate_lm = $('#cate_lm').val();
	var cate_lms = $('#cate_lms').val();
	var sprice = $('#sprice').val();
	var eprice = $('#eprice').val();
	var today_yn = $('#today_yn').val();
	var sale_yn = $('#sale_yn').val();
	
	var option_str = sort;
	
	if (today_yn == "Y") {
		option_str = option_str + "&filter.is_today_delivery=true"
	}
	
	if (cate_l != "") {
		option_str = option_str + "&filter.category_1_id=" + cate_l;
	}
	
	if (cate_lm != "") {
		option_str = option_str + "&filter.category_2_id=" + cate_lm;
	}
	
	if (cate_lms != "") {
		option_str = option_str + "&filter.category_3_id=" + cate_lms;
	}
	
	if (sprice != "" && eprice != "") {
		option_str = option_str + "&filter.price=["+sprice+","+eprice+"]"
	}
	
	if ($('#category_list').length > 0) {
		option_str = option_str + "&group=category_1,category_12,category_123"
	} else {
		option_str = option_str + "&group="
	}
	//검색 조건 -e-
	
	var param = "q=" + $('#searchTerm').val() + "&start=" + start + "&size=" + psize;
	param = param + "&q_option=and,shopping_idx&search_tp=sb&pr=pc&format=v2";
	param = param + option_str;
	param = param + fn_get_map('return_field');
	
	var totalSize = 0;
	
	fn_set_log(fn_get_map('product_url'), param, "PRODUCT");

	//PRODUCT
	$.ajax({
	    url: fn_get_map('product_url'),
	    type: 'get',
	    data: param,
	    success: function(data) {
	    	var result = data.data;
	    	var listSize = result.items.length;
	    	totalSize = result.totalCount;
	    	
	    	if (totalSize > 0) {
				var itemTag = '';
				
				$.each(result.items, function(index, item_source) {
					var item = item_source.source;
					
					if (((index+1)%4) == 0) {
						itemTag += '<li class="last">';
					} else {
						itemTag += '<li>';
					}
					
					itemTag += '<a href="#" style="cursor: pointer">';
					itemTag += '<span class="img_container" style="margin-left: 5px;"><img src="' + item.images_image_thumbnail_url + '"></span>';
					itemTag += '<span class="seller">' + item.seller_name + '</span>';
					
					if (item.is_today_delivery == 'true') {
						itemTag += '<span class="icon"><img src="resources/images/ic-baro.png"></span>';
					}
					
					itemTag += '<span class="title">' + item.name + '</span>';
					itemTag += '</a>';
					
					if (item.discount_percent > 0) {
						itemTag += '<span class="price"><strong style="font-size: 20px; color: #ff204b;">' + item.discount_percent + '%</strong>';
						itemTag += '<strong style="font-size: 20px; padding-left: 10px;">' + fn_price_format(item.discount_price) + '</strong>';
						itemTag += '<strong style="font-size: 11px; text-decoration: line-through; color: #767676; padding-left: 10px;">' + fn_price_format(item.price) + '</strong></span>';
					} else {
						itemTag += '<span class="price"><strong>' + fn_price_format(item.price) + '</strong></span>';
					}
					
					itemTag += '<span class="seller">' + fn_price_format(item.order_count) + '개 구매중</span>';
					
					itemTag += '</li>';
				});
				
				$('#item_list').append(itemTag);
				
				if (totalSize > (psize*pno)) {
					$('#more_btn').show();
				} else {
					$('#more_btn').hide();
				}
				
			}
	    },
	    error: function(error) {
			console.log(error);
	    },
	    complete: function() {
			$('#rs_text').text("'" + $('#searchTerm').val() + "'");
			$('#rs_cnt').text(fn_price_format(totalSize));
	    }
	});
	
}

/**
	스토어 검색
 */
function fn_search_store() {
	
	var psize = 20;
	
	$('#item_list_store').html('');
	
	//var param = "q=" + $('#searchTerm').val() + "&start=1&size=100";
	var param = "q=" + $('#searchTerm').val() + "&start=" + $('#pageNo_seller').val() + "&size=" + psize;
	param = param + "&q_option=and,default_idx&search_tp=sb&pr=pc&format=v2&sort=alias:relevance";
	param = param + fn_get_map('return_field_store');
	
	var totalSize = 0;
	
	fn_set_log(fn_get_map('store_url'), param, "SELLER");
	
	//STORE
	$.ajax({
	    url: fn_get_map('store_url'),
	    type: 'get',
	    data: param,
	    success: function(data) {
	    	var result = data.data;
	    	var listSize = result.items.length;
	    	totalSize = result.totalCount;
	    	
	    	if (totalSize > 0) {
				var itemTag = '';
				
				$.each(result.items, function(index, item_source) {
					var item = item_source.source;
					var tagArr = (item.tags_name).split('\t');

					itemTag += '<div class="Mod_store_item">';
					itemTag += '<div class="thumb" style="background-image: url(&quot;' + item.images_profile_image_thumbnail_url + '&quot;);"></div> ';
					itemTag += '<div class="infos">';
					itemTag += '<div>';
					itemTag += '<em href="#" class="name">' + item.name + '</em> ';
					itemTag += '<div class="tags">';
					
					$(tagArr).each(function(i) {
						itemTag += '<span class="tag">#' + tagArr[i] + '</span>';
					});
					
					itemTag += '</div>';
					itemTag += '</div>';
					itemTag += '</div>';
					itemTag += '</div>';
				});
				
				$('#item_list_store').html(itemTag);
				
				if ((totalSize > listSize) && (totalSize > psize)) {
					$('#more_btn_seller').show();
				}
			} else {
				$('#rs_cnt_store').text('');
				$('#item_list_store').html('<ul><li id="no_rs">검색된 스토어가 없습니다.</li></ul>');
			}
	    },
	    error: function(error) {
			console.log(error);
	    },
	    complete: function() {
			$('#rs_cnt_store').text(fn_price_format(totalSize) + '건');
	    }
	});
	
}

/**
	스토어 검색 더보기
 */
function fn_more_seller() {
	
	var start = (Number($('#pageNo_seller').val())*20) + 1;
	var pno = Number($('#pageNo_seller').val()) + 1;
	$('#pageNo_seller').val(pno);
	
	var param = "q=" + $('#searchTerm').val() + "&start=" + start + "&size=" + psize;
	param = param + "&q_option=and,default_idx&search_tp=sb&pr=pc&format=v2&sort=alias:relevance";
	param = param + fn_get_map('return_field_store');
	
	var totalSize = 0;
	
	fn_set_log(fn_get_map('store_url'), param, "SELLER");
	
	//STORE
	$.ajax({
	    url: fn_get_map('store_url'),
	    type: 'get',
	    data: param,
	    success: function(data) {
	    	var result = data.data;
	    	var listSize = result.items.length;
	    	totalSize = result.totalCount;
	    	
	    	if (totalSize > 0) {
				var itemTag = '';
				
				$.each(result.items, function(index, item_source) {
					var item = item_source.source;
					var tagArr = (item.tags_name).split('\t');

					itemTag += '<div class="Mod_store_item">';
					itemTag += '<div class="thumb" style="background-image: url(&quot;' + item.images_profile_image_thumbnail_url + '&quot;);"></div> ';
					itemTag += '<div class="infos">';
					itemTag += '<div>';
					itemTag += '<em href="#" class="name">' + item.name + '</em> ';
					itemTag += '<div class="tags">';
					
					$(tagArr).each(function(i) {
						itemTag += '<span class="tag">#' + tagArr[i] + '</span>';
					});
					
					itemTag += '</div>';
					itemTag += '</div>';
					itemTag += '</div>';
					itemTag += '</div>';
				});
				
				$('#item_list_store').append(itemTag);
				
				if (totalSize > (psize*pno)) {
					$('#more_btn_seller').show();
				} else {
					$('#more_btn_seller').hide();
				}
			}
	    },
	    error: function(error) {
			console.log(error);
	    },
	    complete: function() {
			$('#rs_cnt_store').text(fn_price_format(totalSize) + '건');
	    }
	});
	
}

/**
	상품/스토어 탭 이동
 */
function fn_tab(key) {

	if (key == "p") {
		$('#content_sell').hide();
		$('#content_prod').show();
	} else if (key == "s") {
		$('#content_prod').hide();
		$('#content_sell').show();
	}

}

/**
	하단 rest log 출력
 */
function fn_set_log(url, param, col) {
	
	var today = new Date();

	var year = today.getFullYear();
	var month = ("0" + (today.getMonth() + 1)).slice(-2);
	var day = ("0" + today.getDate()).slice(-2);
	var hours = ("0" + today.getHours()).slice(-2); 
	var minutes = ("0" + today.getMinutes()).slice(-2);
	var seconds = ("0" + today.getSeconds()).slice(-2); 
	
	var timeStr = year + "-" + month  + "-" + day + " " + hours + ":" + minutes  + ":" + seconds;
	var logStr = "[<span class=\"" + $("#mall_name").val() + "\">" + $("#mall_name").val() + "</span>-<span class=\"" + col + "\">" + col + "</span> " + timeStr +  "] <span>" + url + "?</span>" + param + "<br />";
	
	$('#search_log_text').prepend(logStr);
	
}

/**
	form reset
 */
function fn_reset() {
	
	$("#searchTerm").val('');
	$("#cate_l").val('');
	$("#cate_lm").val('');
	$("#cate_lms").val('');
	
	$('#frmSearch')[0].reset();
	
	$('#pageNo').val(1);
	$('#sort').val('review');
	$('#cate_search_yn').val('N');
	
	$('#list_ASC li').removeClass('on');
	$('#sort_on').addClass('on');
		
	$('input:checkbox').prop('checked', false);
	
	fn_search();

}

/**
	숫자 포맷
 */
function fn_price_format(price) {
	
	var ret = (price.toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	
	return ret;

}

/**
	쇼핑몷 탭 이동
	BRANDI | HIVER | MAMI
 */
function fn_mall_tab(key, obj) {
	
	$("#mall_name").val(key);

	$('#mall_tab li').removeClass('on');
	$(obj).addClass('on');
	
	$('#rs_cnt_text').css('visibility', 'hidden');
	$('#item_list').html('<li id="no_rs">검색된 상품이 없습니다.</li>');
	$('#more_btn').hide();
	$('#more_btn_seller').hide();
	
	$('#rs_cnt_store').text('');
	$('#item_list_store').html('<ul><li id="no_rs">검색된 스토어가 없습니다.</li></ul>');
	
	$('#cate_l').val('');
	$('#cate_lm').val('');
	$('#cate_lms').val('');
	$('#cate_search_yn').val('N');
	
	$('#category_list').html('');
	$('#category_tree2').hide();
	$('#category_tree3').hide();
	
	if (key == "BRANDI") {
		$('#option_check').show();
		$('#btn_compare').show();
		$('#btn_compare').attr('href', '/search_brandi/compare.jsp');
	} else if (key == "HIVER") {
		$('#option_check').hide();
		$('#btn_compare').show();
		$('#btn_compare').attr('href', '/search_brandi/compare_h.jsp');
	} else if (key == "MAMI") {
		$('#option_check').hide();
		$('#btn_compare').hide();
	}
	
	fn_tab('p');
	
	if ($("#searchTerm").val() != "") {
		fn_search();
	}

}

/**
	쇼핑몷 map 조회
 */
function fn_get_map(key) {
	
	var val = "";
	var mall = $("#mall_name").val();
	
	if (mall == "BRANDI") {
		val = brandi_map.get(key);
	} else if (mall == "HIVER") {
		val = hiver_map.get(key);
	} else if (mall == "MAMI") {
		val = mami_map.get(key);
	}

	return val;

}
