<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>NHNdiquest - BRANDI</title>
<link rel="stylesheet" type="text/css" href="resources/css/style.css" />
<script type="text/javascript" src="resources/js/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="resources/js/search.js"></script>
<script>
$(document).ready(function() {

	$('#rs_cnt_text').css('visibility', 'hidden');
	$('#more_btn').hide();
	$('#more_btn_seller').hide();
	
	fn_mall_tab("BRANDI", $('#mall_tab li').first());
	
	$('#searchform_01').on('keyup', function(key) {
		if(key.keyCode == 13) {
			fn_reset();
        }
    });
	
	$('#searchTerm').val('');
	
});
</script>
</head>

<body>

<div id="wrapper">
	<!-- 헤더 start -->
	<div class="header">
		<!-- 상단 바 start -->
		<div class="top_bar"></div>
		<!--// 상단 바 end -->
	
		<h1><a href="/search_brandi"><img src="resources/images/common/IMG_COMP_LOGIN_LOGO_A_diquest.png" alt="Mariner4 - Beyond the Limit" /></a></h1>
	
		<!-- 검색 start -->
		<form name="frmSearch" id="frmSearch">
			<input type="hidden" name="searchTerm" id="searchTerm" value="" /> 
			<input type="hidden" name="pageNo" id="pageNo" value="1" /> 
			<input type="hidden" name="pageNo_seller" id="pageNo_seller" value="1" /> 
			<input type="hidden" name="sort" id="sort" value="" /> 
			<input type="hidden" name="cate_l" id="cate_l" value="" /> 
			<input type="hidden" name="cate_lm" id="cate_lm" value="" /> 
			<input type="hidden" name="cate_lms" id="cate_lms" value="" /> 
			<input type="hidden" name="sprice" id="sprice" value="" /> 
			<input type="hidden" name="eprice" id="eprice" value="" /> 
			<input type="hidden" name="today_yn" id="today_yn" value="" /> 
			<input type="hidden" name="sale_yn" id="sale_yn" value="" /> 
			
			<input type="hidden" name="mall_name" id="mall_name" value="" />  
		</form>
		
		<div class="search_area clear2">
			<fieldset class="search_area_field">
				<legend>
					<label for="searchform_01">통합검색</label>
				</legend>
				<div class="search_form" name="search_form">
					<div class="search_input" name="search_input">
						<!-- 자동완성 창 -->
						<input type="text" id="searchform_01" name="searchform_01" value="" title="검색어 입력" />
						<!-- 자동완성 창 end-->
					</div>
				</div>
				<a href="#" onclick="fn_reset()" class="btn_search">검색</a>
			</fieldset>
		</div>
		<!--// 검색 end -->
	</div>
	<!--// 헤더 end -->

	<!-- content start -->
	<div id="content_prod" class="clear2">
		<div class="search_result_text">
			<div id="rs_cnt_text" style="width: 30%; float: left;"><strong id="rs_text"></strong> 검색결과<em id="rs_cnt" class="goodsCnt"></em>개</div>
			<div onclick="fn_tab('p')" class="type_tab on" style="width: 200px;">상품</div>
			<div onclick="fn_tab('s')" class="type_tab off" style="width: 200px;">스토어</div>
		</div>
		
		<!-- 오른쪽영역 start -->
		<div class="right_area" id="right_area">
			<div class="result_left">
				<!--상품검색 결과-->
				<div class="search_result_list">
					<div class="list_condition mt_20">
						<ul id="list_ASC">
							<li id="sort_on" class="on" onclick="fn_sort(this, 'review')">추천순</li>
							<li onclick="fn_sort(this, 'order')">판매량순</li>
							<li onclick="fn_sort(this, 'recent')">최신순</li>
							<li onclick="fn_sort(this, 'relevance')">정확도순</li>
							<li onclick="fn_sort(this, 'price')">가격순</li>
						</ul>
						
						<div class="list_sort">
							<a href="#image" class="image on" id="image">이미지보기</a> 
							<a href="#list" class="list" id="list">리스트보기</a>
						</div>
					</div>
				
					<div class="list_wrap" id="list_wrap">
						<ul id="item_list" class="img_type">
							<li id="no_rs">검색된 상품이 없습니다.</li>
						</ul>
					</div>
				
					<div class="paging">
						<span id="more_btn" onclick="fn_more()">더보기</span>
					</div>
				
					<div class="list_wrap" id="list_wrap2">
						<div class="search_result_text" id="search_result_text"></div>
					</div>
				</div>
			</div>
			<!--//상품검색 결과-->
		</div>
		
	</div>
	<!--// content end -->
	
	<!-- content start -->
	<div id="content_sell" class="clear2">
		<div class="search_result_text">
			<div id="rs_cnt_text_store" style="width: 30%; float: left;">스토어 검색결과<em id="rs_cnt_store" class="goodsCnt"></em></div>
			<div onclick="fn_tab('p')" class="type_tab off" style="width: 200px;">상품</div>
			<div onclick="fn_tab('s')" class="type_tab on" style="width: 200px;">스토어</div>
		</div>
		
		<!-- 오른쪽영역 start -->
		<div class="right_area" id="right_area">
			<div class="result_left">
				<!--상품검색 결과-->
				<div id="" class="">
					<div class="store" id="item_list_store">
						<ul>
							<li id="no_rs">검색된 스토어가 없습니다.</li>
						</ul>
					</div>
					
					<div class="paging">
						<span id="more_btn_seller" onclick="fn_more_seller()">더보기</span>
					</div>
				</div>
			</div>
			<!--//상품검색 결과-->
		</div>
		
	</div>
	<!--// content end -->
</div>

<!-- footer start -->
<div id="footer">
<!-- Copyright(c) 2022 NHN diquest. All Right Reserved. -->
<div id="search_log_text" class="search_log_text"></div>
</div>
<!--// footer end -->
	
</body>
</html>