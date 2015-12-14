	var clicked = false;
	var PreviewArea = "";
	var loadUrl = "loadContainet.html";

$(document).ready(function() {
	
	$("#imgInp").change(function(){
		addImage(this);
	});
	
	$("#backImgInp").change(function(){
		changeBackgroundImg(this);
	});	
	        
    var fncssTransform = function() {
		loadContainer = $("#transformLoad");
        loadContainer.load(loadUrl + " #CSStransform", function() {
            $(".transformSelect").on('click', function() {
                $(".transformSelect").removeClass('transformActive');
                $(this).addClass('transformActive');
                var thisVal = $(this).val();
                if (thisVal == 'Rotate') {
                    $('.showall').hide();
                    $('.rotate').show();
                } else if (thisVal == 'Scale') {
                    $('.showall').hide();
                    $('.scale').show().find('label').text('Scale X');
                    $('.scaleY').show();
                } else if (thisVal == 'Skew') {
                    $('.showall').hide();
                    $('.skew').show().find('label').text('Skew X');
                    $('.skewY').show();
                } else if (thisVal == 'Translate') {
                    $('.showall').hide();
                    $('.translate').show().find('label').text('Translate X');
                    $('.translateY').show();
                } else if (thisVal == 'All') {
                    $('.showall').show();
                    $('.scale').find('label').text('Scale');
                    $('.skew').find('label').text('Skew');
                    $('.translate').find('label').text('Translate');
                    $('.translateY').hide();
                    $('.skewY').hide();
                    $('.scaleY').hide();
                };
            });
            $("#Rotate").slider({
                value: 4,
                min: 0,
                max: 360,
                step: 1,
                slide: function(event, ui) {
					if(PreviewArea != "") {
						var a = ui.value;
						var b = "rotate(" + a + "deg) ";
						var c = "scale(" + $("#Scale").slider("value") + ") ";
						var d = "skew(" + $("#Skew").slider("value") + "deg) ";
						var e = "translate(" + $("#Translate").slider("value") + "px)";
						var f = b + c + d + e;
						var transformactive = $('.transformActive').val();
						if (transformactive == 'Rotate') {
							PreviewArea.css({
								"transform": b,
								"-webkit-transform": b,
								"-moz-transform": b,
								"-o-transform": b,
								"-ms-transform": b
							});
							$(".transformCord").text(b);
						} else if (transformactive == 'All') {
							PreviewArea.css({
								"transform": f,
								"-webkit-transform": f,
								"-moz-transform": f,
								"-o-transform": f,
								"-ms-transform": f
							});
							$(".transformCord").text(f);
						}
					}                   
                }
            });
            $("#Scale").slider({
                value: 1,
                min: 0.1,
                max: 1.5,
                step: 0.001,
                slide: function(event, ui) {
					if(PreviewArea != "") {
						var a = ui.value;
						var b = "rotate(" + $("#Rotate").slider("value") + "deg) ";
						var c = "scale(" + a + ") ";
						var d = "skew(" + $("#Skew").slider("value") + "deg) ";
						var e = "translate(" + $("#Translate").slider("value") + "px)";
						var g = "scale(" + a + ", " + $("#ScaleY").slider("value") + ")";
						var f = b + c + d + e;
						var transformactive = $('.transformActive').val();
						if (transformactive == 'Scale') {
							PreviewArea.css({
								"transform": g,
								"-ms-transform": g,
								"-webkit-transform": g,
								"-moz-transform": g,
								"-o-transform": g
							});
							$(".transformCord").text(g);
						} else if (transformactive == 'All') {
							PreviewArea.css({
								"transform": f,
								"-ms-transform": f,
								"-webkit-transform": f,
								"-moz-transform": f,
								"-o-transform": f
							});
							$(".transformCord").text(f);
						}
					}                    
                }
            });
            $("#Skew").slider({
                value: 1,
                min: -180,
                max: 180,
                step: 1,
                slide: function(event, ui) {
					if(PreviewArea != "") {
						var a = ui.value;
						var b = "rotate(" + $("#Rotate").slider("value") + "deg) ";
						var c = "scale(" + $("#Scale").slider("value") + ") ";
						var d = "skew(" + a + "deg) ";
						var e = "translate(" + $("#Translate").slider("value") + "px)";
						var g = "skew(" + a + "deg, " + $("#SkewY").slider("value") + "deg) ";
						var f = b + c + d + e;
						var transformactive = $('.transformActive').val();
						if (transformactive == 'Skew') {
							PreviewArea.css({
								"transform": g,
								"-ms-transform": g,
								"-webkit-transform": g,
								"-moz-transform": g,
								"-o-transform": g
							});
							$(".transformCord").text(g);
						} else if (transformactive == 'All') {
							PreviewArea.css({
								"transform": f,
								"-ms-transform": f,
								"-webkit-transform": f,
								"-moz-transform": f,
								"-o-transform": f
							});
							$(".transformCord").text(f);
						}
					}                    
                }
            });
            $("#Translate").slider({
                value: 0,
                min: -300,
                max: 300,
                step: 1,
                slide: function(event, ui) {
					if(PreviewArea != "") {
						var a = ui.value;
						var b = "rotate(" + $("#Rotate").slider("value") + "deg) ";
						var c = "scale(" + $("#Scale").slider("value") + ") ";
						var d = "skew(" + $("#Skew").slider("value") + "deg) ";
						var e = "translate(" + a + "px)";
						var g = "translate(" + a + "px, " + $("#TranslateY").slider("value") + "px)";
						var f = b + c + d + e;
						var transformactive = $('.transformActive').val();
						if (transformactive == 'Translate') {
							PreviewArea.css({
								"transform": g,
								"-ms-transform": g,
								"-webkit-transform": g,
								"-moz-transform": g,
								"-o-transform": g
							});
							$(".transformCord").text(g);
						} else if (transformactive == 'All') {
							PreviewArea.css({
								"transform": g,
								"-ms-transform": g,
								"-webkit-transform": f,
								"-moz-transform": f,
								"-o-transform": f
							});
							$(".transformCord").text(f);
						}
					}                    
                }
            });
            $("#TranslateY").slider({
                value: 0,
                min: -300,
                max: 300,
                step: 1,
                slide: function(event, ui) {
					if(PreviewArea != "") {
						var a = ui.value;
						var b = "rotate(" + $("#Rotate").slider("value") + "deg) ";
						var c = "scale(" + $("#Scale").slider("value") + ") ";
						var d = "skew(" + $("#Skew").slider("value") + "deg) ";
						var e = "translate(" + a + "px)";
						var g = "translate(" + $("#Translate").slider("value") + "px, " + a + "px)";
						var f = b + c + d + e;
						PreviewArea.css({
							"transform": g,
							"-ms-transform": g,
							"-webkit-transform": g,
							"-moz-transform": g,
							"-o-transform": g
						});
						$(".transformCord").text(g);
					}                    
                }
            });
            $("#SkewY").slider({
                value: 1,
                min: -180,
                max: 180,
                step: 1,
                slide: function(event, ui) {
					if(PreviewArea != "") {
						var a = ui.value;
						var b = "rotate(" + $("#Rotate").slider("value") + "deg) ";
						var c = "scale(" + $("#Scale").slider("value") + ") ";
						var d = "skew(" + $("#Skew").slider("value") + "deg) ";
						var e = "translate(" + a + "px)";
						var g = "skew(" + $("#Skew").slider("value") + "deg, " + a + "deg) ";
						var f = b + c + d + e;
						PreviewArea.css({
							"transform": g,
							"-ms-transform": g,
							"-webkit-transform": g,
							"-moz-transform": g,
							"-o-transform": g
						});
						$(".transformCord").text(g);
					}                    
                }
            });
            $("#ScaleY").slider({
                value: 1,
                min: 0.1,
                max: 2,
                step: 0.001,
                slide: function(event, ui) {
					if(PreviewArea != "") {
						var a = ui.value;
						var b = "rotate(" + $("#Rotate").slider("value") + "deg) ";
						var c = "scale(" + $("#Scale").slider("value") + ") ";
						var d = "skew(" + $("#Skew").slider("value") + "deg) ";
						var e = "translate(" + a + "px)";
						var g = "scale(" + $("#Scale").slider("value") + ", " + a + ")";
						var f = b + c + d + e;
						PreviewArea.css({
							"transform": g,
							"-ms-transform": g,
							"-webkit-transform": g,
							"-moz-transform": g,
							"-o-transform": g
						});
						$(".transformCord").text(g);
					}                    
                }
            });
        });
    };
	
	var fnFontFace = function() {
        loadContainer = $("#fontLoad");
        loadContainer.load(loadUrl + " #FontFace", function() {
            $("#FontSize").slider({
                value: 21,
                min: 12,
                max: 50,
                step: 1,
                slide: function(event, ui) {                    
					if(PreviewArea != '') {
						var a = $("#SelectFont").val();
						var b = ui.value + "px ";
						var c = $("#fontStyle").val();
						var d = $("#fontWeight").val();
						PreviewArea.find('.newText').css({
							"font-family": a,
							"font-size": b,
							"font-style": c,
							"font-weight": d
						});
						$(".SelectFont").text(a);
						$(".fontsize").text(b);
						$(".fontStyle").text(c);
						$(".fontWeight").text(d);
					}                    
                }
            });
            $(".editThis").keyup(function() {
				if(PreviewArea != '') {
					var a = $("#SelectFont").val();
					var b = $("#FontSize").slider("value") + "px ";
					var c = $("#fontStyle").val();
					var d = $("#fontWeight").val();
					PreviewArea.find('.newText').css({
						"font-family": a,
						"font-size": b,
						"font-style": c,
						"font-weight": d
					});
					$(".SelectFont").text(a);
					$(".fontsize").text(b);
					$(".fontStyle").text(c);
					$(".fontWeight").text(d);
				}                
            });
            $(".editThis").change(function() {
				if(PreviewArea != '') {
					var a = $("#SelectFont").val();
					var b = $("#FontSize").slider("value") + "px ";
					var c = $("#fontStyle").val();
					var d = $("#fontWeight").val();
					PreviewArea.find('.newText').css({
						"font-family": a,
						"font-size": b,
						"font-style": c,
						"font-weight": d
					});
					$(".SelectFont").text(a);
					$(".fontsize").text(b);
					$(".fontStyle").text(c);
					$(".fontWeight").text(d);
				}                
            });
            $(".editThisfont").change(function() {
				if(PreviewArea != '') {
					var a = $("#SelectFont").val();
					var b = $("#FontSize").slider("value") + "px ";
					var c = $("#fontStyle").val();
					var d = $("#fontWeight").val();
					PreviewArea.find('.newText').css({
						"font-family": a,
						"font-size": b,
						"font-style": c,
						"font-weight": d
					});
					$(".SelectFont").text(a);
					$(".fontsize").text(b);
					$(".fontStyle").text(c);
					$(".fontWeight").text(d);
					if (a == "BrushScriptStdMedium") {
						$(".fontfaceview").empty();
						$(".fontfaceview").append("<style>@font-face {font-family: 'BrushScriptStdMedium'; src: url('font/brushscriptstd.eot'); src: local('Brush Script Std'), local('BrushScriptStd'), url('font/brushscriptstd.woff') format('woff'), url('font/brushscriptstd.ttf') format('truetype');} .previewAreaBox{font-family: 'BrushScriptStdMedium', sans-serif;}</style>");
						fontlocal = "Brush Script Std";
						fontlocal2 = "BrushScriptStd";
						fontsrc = "brushscriptstd";
						$(".fontsrc").text(fontsrc);
						$(".fontlocal").text(fontlocal);
						$(".fontlocal2").text(fontlocal2);
					} else if (a == "GoodFootRegular") {
						$(".fontfaceview").empty();
						$(".fontfaceview").append("<style>@font-face {font-family: 'GoodFootRegular'; src: url('font/goodfoot.eot'); src: local('Good Foot'), local('GoodFoot'), url('font/goodfoot.woff') format('woff'), url('font/goodfoot.ttf') format('truetype');} .previewAreaBox{font-family: 'GoodFootRegular', sans-serif;}</style>");
						fontlocal = "Good Foot";
						fontlocal2 = "GoodFoot";
						fontsrc = "goodfoot";
						$(".fontsrc").text(fontsrc);
						$(".fontlocal").text(fontlocal);
						$(".fontlocal2").text(fontlocal2);
					} else if (a == "SouciSansRegular") {
						$(".fontfaceview").empty();
						$(".fontfaceview").append("<style>@font-face {font-family: 'SouciSansRegular'; src: url('font/SOUCISAN.eot'); src: local('SouciSans'), local('SouciSans'), url('font/SOUCISAN.woff') format('woff'), url('font/SOUCISAN.ttf') format('truetype');} .previewAreaBox{font-family: 'SouciSansRegular', sans-serif;}</style>");
						fontlocal = "SouciSans";
						fontlocal2 = "SouciSans";
						fontsrc = "SOUCISAN";
						$(".fontsrc").text(fontsrc);
						$(".fontlocal").text(fontlocal);
						$(".fontlocal2").text(fontlocal2);
					};
				}                
            });
        });
    };
    
    fncssTransform();
	fnFontFace();
});
	
$(document).on('mouseout', '.appElement', function(){ 
     if(!clicked) {
		PreviewArea = "";
		$('.innerBox').css('border', 'none'); 
	}
 });
 
 $(document).on('click', '.appElement', function(){ 
    clicked = true;
	$('.innerBox').css('border', 'none');
	$(this).find('.innerBox').css('border', '1px solid red'); 
	$('.appElement').draggable();
	PreviewArea = $(this);
	if(PreviewArea.find('.newText').html() != undefined) {
		$('#adText').val(removeLineBreaks(PreviewArea.find('.newText').html()));
		$('#editTextButton').css('display','block');
		$('#adTextButton').css('display','none');
	} else {
		$('#adText').val("");
		$('#editTextButton').css('display','none');
		$('#adTextButton').css('display','block');
	}
 });
 
 $(document).on('mouseover', '.appElement', function(){ 
    if(!clicked) {
		$('.innerBox').css('border', 'none');
		$(this).find('.innerBox').css('border', '1px solid red'); 
		//$('.appElement').draggable({containment: "parent"});
	}
 });
 
 $(document).on('click', '#container', function(e){ 
    if (e.target !== this)
		return;
	PreviewArea = "";
	$('.innerBox').css('border', 'none'); 
	$('#adText').val("");
	$('#editTextButton').css('display','none');
	$('#adTextButton').css('display','block');
		
 });
 
 $(document).on('click', '#btnSave', function(){ 
    $('.innerBox').css('border', 'none'); 
	html2canvas($("#container"), {
		onrendered: function(canvas) {
			$('#canvas').html(canvas);
		}
	});
 });


function addText() {
	$("#container").prepend("<div class='appElement'><div class='innerBox'><span class='newText'>"+addLineBreaks($('#adText').val())+"</span></div></div>");	
};

function editText() {
	PreviewArea.find('.newText').html(addLineBreaks($('#adText').val()));
};

function addLineBreaks(text) {
	return text.replace(/\n\r?/g, '<br />');
}

function removeLineBreaks(text) {
	return text.replace(/<br *\/?>/gi, '\n');
}

function addImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
            
        reader.onload = function (e) {
			$("#container").append("<div class='appElement'><div class='innerBox'><img src='"+e.target.result+"' /></div></div>");
			$('.appElement').draggable({});
        }         
        reader.readAsDataURL(input.files[0]);
    }
}

function changeBackgroundImg(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
            
        reader.onload = function (e) {
			$(".outerContent").css("background","url('"+e.target.result+"') repeat");
        }         
        reader.readAsDataURL(input.files[0]);
    }
}

function layerUp() {
	alert("yet to do");
}

function layerDown() {
	alert("yet to do");
}
