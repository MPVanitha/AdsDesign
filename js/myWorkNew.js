var clicked = false;
var previewArea = "";
var curImgSrc = "";
var updating=false;
var update="";
var image_dimension_x = 600;
var image_dimension_y = 750;
var jcropApi = '';
var cmToPixel = 37.795276;
var layerCounter = 0;

$(document).ready(function() {
    disableBtns();

    //$('.image-editor').cropit({  width:100, height:100 });

    /*$('#bkColorPalatte').colorpicker({defaultPalette:'web'}).on('change.color', function(evt, color){
        $(".outerContent").css({"background-color":color});
        $('#bkColorVal').val(color);
    });
    $('#fontColorPalatte').colorpicker({defaultPalette:'web'}).on('change.color', function(evt, color){
        previewArea.find('.newText').css({"color":color});
        previewArea.find('.fontColVal').val(color);
    });*/

    $("#imgUpload").on('change', (function (e) {
        $('#uploadImage').submit();
    }));

    $("#addImageBtn").on('click', (function (e) {
        $('#sizeBox').hide();
        $('#desContainer').click();
        $("#imgUpload").click();
    }));

    $("#addTextBtn").on('click', (function (e) {
        $('#sizeBox').hide();
        $('#desContainer').click();
        CKEDITOR.instances.editor.setData('');
        $("#ckEditor").show();$("#adTextButton").show();
        window.scrollTo(0,document.body.scrollHeight);
    }));

    $("#bkImg").on('click', (function (e) {
        $('#sizeBox').hide();
        $('#desContainer').click();
        var bkCol = $('#bkColorVal').val();
        if(bkCol != 0) $('#bkColorPalatte').colorpicker({color:bkCol});
        else $('#bkColorPalatte').colorpicker({color:'#D3D3D3'});
        $('.cropit-image-input').click();
    }));

    $("#bkColorBtn").on('click', (function (e) {
        $('#sizeBox').hide();
        $('#desContainer').click();
        $('#bkColorBox').show();
    }));

    $("#sizeCloseBtn").on('click', (function (e) {
        $('#sizeBox').hide();
    }));

    $('#changeSizeBtn').on('click', (function (e) {
        $('#desContainer').click();
        $('#sizeBox').show();
        /*if($('#desContainer').html() != '') {
            var r = confirm("Do you want to discard your changes ?");
            if (r == true) {
                clearDesignContents();
                hideAll();
                $('#sizeBox').show();
            }
        } else {
            $('#sizeBox').show();
        }*/
    }));

    $("#discardBtn").on('click', (function (e) {
        var r = confirm("Are you sure you want to discard this design ?");
        if (r == true) {
            clearDesignContents();
            hideAll();
            $('#sizeBox').hide();
            disableBtns();
        }
    }));

    $("#Rotate").slider({
        value: 4,
        min: 0,
        max: 360,
        step: 1,
        slide: function(event, ui) {
            if(previewArea != "") {
                var a = ui.value;
                var b = "rotate(" + a + "deg) ";
                var c = "scale(" + $("#Scale").slider("value") + ") ";
                var f = b+c;
                previewArea.css({
                    "transform": f,
                    "-webkit-transform": f,
                    "-moz-transform": f,
                    "-o-transform": f,
                    "-ms-transform": f
                });
            }
        }
    });
    $("#Scale").slider({
        value: 1,
        min: 0.1,
        max: 1.5,
        step: 0.001,
        slide: function(event, ui) {
            if(previewArea != "") {
                var a = ui.value;
                var b = "rotate(" + $("#Rotate").slider("value") + "deg) ";
                var c = "scale(" + a + ") ";
                var f = b + c ;
                previewArea.css({
                    "transform": f,
                    "-ms-transform": f,
                    "-webkit-transform": f,
                    "-moz-transform": f,
                    "-o-transform": f
                });
            }
        }
    });

    $("#FontSize").slider({
        value: 14,
        min: 12,
        max: 50,
        step: 1,
        slide: function(event, ui) {
            if(previewArea != '') {
                var a = $("#SelectFont").val();
                var b = ui.value + "px ";
                var c = $("#fontStyle").val();
                var d = $("#fontWeight").val();
                previewArea.find('.newText').css({
                    "font-family": a,
                    "font-size": b,
                    "font-style": c,
                    "font-weight": d
                });
            }
        }
    });
    $(".editThis").keyup(function() {
        fontModify();
    });
    $(".editThis").change(function() {
        fontModify();
    });
    $(".editThisfont").change(function() {
        fontModify();
    });


});

function fontModify() {
    if(previewArea != '') {
        var a = $("#SelectFont").val();
        var b = $("#FontSize").slider("value") + "px ";
        var c = $("#fontStyle").val();
        var d = $("#fontWeight").val();
        previewArea.find('.newText').css({
            "font-family": a,
            "font-size": b,
            "font-style": c,
            "font-weight": d
        });
    }
}

/*$(document).on('mouseout', '.appElement', function(){
     if(!clicked) {
         previewArea = "";
        $('.innerBox').css('border', 'none');
    }
 });*/

 $(document).on('click', '.appElement', function(){
    clicked = true;
     var layerName = '';
     $('#desContainer').click();
    $('.innerBox').css('border', 'none');
     //$('.newImage').css('position','absolute');
     if($(this).hasClass('newImage')){
         $(this).css('position','relative');
     }
    $(this).find('.innerBox').css('border', '3px solid red');
     previewArea = $(this);

     var rotate = previewArea.find('.rotateVal').val();
     var scale = previewArea.find('.scaleVal').val();

     if(rotate != '0') $("#Rotate").slider("value",rotate);
     else $("#Rotate").slider("value",0);

     if(scale != '0') $("#Scale").slider("value",scale);
     else $("#Scale").slider("value",1);

     if(!previewArea.data('ui-draggable')) {
         previewArea.draggable({containment:'#designBox'});
     } else
         previewArea.draggable('enable');

     $('#bkColorBox').hide();
     $('#commonStyleBox').show();

    if(previewArea.find('.newText').html() != undefined) {
        CKEDITOR.instances.editor.setData(previewArea.find('.newText').html());
        $('#imgStyleBox').hide();
        $('#fontStyleBox').show();
        $("#ckEditor").show();$("#editTextButton").show();$("#adTextButton").hide();
        var fontSize = previewArea.find('.fontVal').val();
        var fontFamily = previewArea.find('.fontFamVal').val();
        var fontStyle = previewArea.find('.fontStyleVal').val();
        var fontWeight = previewArea.find('.fontWeiVal').val();
        var fontColor = previewArea.find('.fontColVal').val();

        if(fontSize != '0') $("#FontSize").slider("value",fontSize);
        else $("#FontSize").slider("value",14);

        if(fontFamily != '0') $("#SelectFont").val(fontFamily);
        else $("#SelectFont").val('Arial');

        if(fontStyle != '0') $("#fontStyle").val(fontStyle);
        else $("#fontStyle").val('normal');

        if(fontWeight != '0') $("#fontWeight").val(fontWeight);
        else $("#fontWeight").val('normal');

        if(fontColor != '0') $('#fontColorPalatte').colorpicker({color:fontColor});
        else $('#fontColorPalatte').colorpicker({color:'#0f0f0f'});

        layerName = previewArea.find('.newTextVal').attr('id');
    } else {
        $('#imgStyleBox').show();
        $('#fontStyleBox').hide();
        $(".editBlk").hide();
        layerName = previewArea.find('.newImgVal').attr('id');
    }
     if(layerName != undefined)
         $("#"+layerName.replace('_','')).css("font-weight", "bold");
 });

 /*$(document).on('mouseover', '.appElement', function(){
    if(!clicked) {
        $('.innerBox').css('border', 'none');
        $(this).find('.innerBox').css('border', '3px solid red');
    }
 });*/

 $(document).on('click', '#desContainer', function(e){
     if (e.target !== this)
         return;
     if(previewArea != "" && previewArea.data('ui-draggable'))
         previewArea.draggable('disable');

     if(previewArea != '') {
         previewArea.find('.rotateVal').val($("#Rotate").slider("value"));
         previewArea.find('.scaleVal').val($("#Scale").slider("value"));

         if(previewArea.find('.newText').html() != undefined) {
             previewArea.find('.fontVal').val($("#FontSize").slider("value"));
             previewArea.find('.fontFamVal').val($("#SelectFont").val());
             previewArea.find('.fontStyleVal').val($("#fontStyle").val());
             previewArea.find('.fontWeiVal').val($("#fontWeight").val());
         }
     }
     clear();
     closeAllProp();
 });

function closeAllProp() {
    $(".editBlk").hide();
    $('#imgStyleBox').hide();
    $('#fontStyleBox').hide();
    $('#commonStyleBox').hide();
    $('#bkColorBox').hide();
    $('#addLayers span').css("font-weight", "normal");
}

function clear() {
     previewArea = "";
     $('.innerBox').css('border', 'none');
     $('.newImage').css('position','absolute');
}

function openCropEdit() {
    if(previewArea != "") {
        if(jcropApi != '') {  $('#cropbox').remove(); jcropApi.destroy(); }
        curImgSrc = $(previewArea).find('.designImg').attr('src');

        var current_image = new Image();
        current_image.src = curImgSrc;
        current_image.id = "cropbox";

        showModalWindow(current_image.width, current_image.height, 'preview');

        $('#fileName').val(curImgSrc);
        $('#preview').append(current_image);

        var options =  { bgFade: true, aspectRatio: 0,  boxWidth: 650,  boxHeight: 500, onSelect: updateCoords, onChange: updateCoords };

        $('#cropbox').Jcrop(options,function(){
            jcropApi = this;
        });
    }
}

function showModalWindow(width, height, id) {
    var scaled_width, scaled_height;
    if (width > image_dimension_x || height > image_dimension_y) {
        if (width > height) {
            scaled_width = image_dimension_x;
            scaled_height = image_dimension_x * height / width;
        }
        if (width < height) {
            scaled_height = image_dimension_y;
            scaled_width = image_dimension_y * width / height;
        }
        if (width == height) {
            scaled_width = image_dimension_x;
            scaled_height = image_dimension_y;
        }
    }
    else {
        scaled_width = width;
        scaled_height = height;
    }

    var window_width = ($(window).width() / 2 - scaled_width / 2) + 100 + "px";
    var window_height = $(window).height() / 2 - scaled_height / 2 + "px";
    $("#"+id).css("top", window_height);
    $("#"+id).css("left", window_width);

    $('#modal').css('display','block');
    $('#'+id).css('display','block');
}

function closePreview(id) {
    if(id == "preview") {
        if(jcropApi != '') {  $('#cropbox').remove(); jcropApi.destroy(); }
        curImgSrc = "";
    } else {
        $('#bkImage').remove();
    }
    $('#'+id).css('display','none');
    $('#modal').css('display','none');
}

function addText() {
    var zIndex = parseInt(getHighestZIndex()) + 1;
    layerCounter = layerCounter +1;
    var newId = "layer_"+layerCounter;
    var text = trimText(CKEDITOR.instances.editor.getData());
    $("#desContainer").prepend('<div class="appElement" style="position: absolute;display:inline-block;z-index:'+zIndex+';"><div class="innerBox newText">'+CKEDITOR.instances.editor.getData()+'</div><input type="hidden" class="rotateVal" value="0" /><input type="hidden" class="scaleVal" value="0" /><input type="hidden" class="fontVal" value="0" /><input type="hidden" class="fontFamVal" value="0" /><input type="hidden" class="fontStyleVal" value="0" /><input type="hidden" class="fontWeiVal" value="0" /><input type="hidden" class="fontColVal" value="0" /><input type="hidden" class="newTextVal" id="'+newId+'" /></div>');

    $('#addLayers').append('<span class="layerName" id="layer'+layerCounter+'" onclick="highlightLayer('+layerCounter+');">'+text+'</span>');
    window.scrollTo(0,0);
    $('.editBlk').hide();
}

function trimText(val) {
    var html = $.parseHTML(val);
    var result = '';
    $.each(html, function( i, el ) {
        if(el.nodeName == 'P') {
            result =  getWords(el.innerHTML);
            return false;
        } else if(el.nodeName == 'OL' || el.nodeName == 'UL') {
            var lis = el.children;
            result = lis[0].innerHTML;
            return false;
        }
    });
    return result;
}

function getWords(str) {
    var temp = str.split(/\s+/);
    if(temp.length > 4)
        return str.split(/\s+/).slice(0,2).join(" ");
    else
        return str;
}

function editText() {
    previewArea.find('.newText').html(CKEDITOR.instances.editor.getData());
    window.scrollTo(0,0);
}

function highlightLayer(id) {
    var zIndex = parseInt(getHighestZIndex()) + 1;
    var appElement = $('#layer_'+id).parent();
    appElement.css('z-index',zIndex);
    appElement.click();
    $('#layer'+id).css("font-weight", "bold");
}

function uploadImage(path) {
    var zIndex = parseInt(getHighestZIndex()) + 1;
    var content = "<div class='appElement newImage' style='position: absolute;left:0px;right:0px; z-index:"+zIndex+";'><div class='innerBox'><img class='designImg' src='"+path+"' ";
    var array = path.split('/');
    var img = new Image();
    layerCounter = layerCounter + 1;
    var newId = "layer_"+layerCounter;
    img.src = path;
    img.onload = function() {
        if(img.width > $('#desContainer').width() -50 || img.height > $('#desContainer').height() - 50) {
            content += "width = " + ($('#desContainer').width() - 50) + "px height = " + ($('#desContainer').height() - 50) + "px";
        }
        $("#desContainer").append(content + " /></div><input type='hidden' class='rotateVal' value='0' /><input type='hidden' class='scaleVal' value='0' /><input type='hidden' class='newImgVal' id='"+newId+"' /></div>");
        $('#addLayers').append('<span class="layerName" id="layer'+layerCounter+'" onclick="highlightLayer('+layerCounter+');">'+array[array.length-1]+'</span>');
    };
}

function layerUp() {
    previewArea.css('z-index', parseInt(getHighestZIndex()) + 1);
}

function layerDown() {
    previewArea.css('z-index', getLowestZIndex());
}

function deleteLayer() {
    var spanId = '';
    if(previewArea.find('.newText').html() != undefined) {
        spanId = previewArea.find('.newTextVal').attr('id').replace('_','');
    } else {
        spanId = previewArea.find('.newImgVal').attr('id').replace('_','');
    }
    $('#'+spanId).remove();
    previewArea.remove();
    closeAllProp();
}

function deleteAll() {
    $('#addLayers').html('<b>Layers</b>');
    $('#desContainer').html('');
    closeAllProp();
}

function getHighestZIndex() {
    var highestZIndex = 0;
    $('#desContainer').children().each(function (i, ele) {
        var zIndex = $(ele).css('z-index');
        if(zIndex === 'auto') {
            zIndex = 0;
        }
        if(zIndex > highestZIndex) {
            highestZIndex = zIndex;
        }
    });
    return highestZIndex;
}

function getLowestZIndex() {
    var lowestZIndex = 0;
    $('#desContainer').children().each(function (i, ele) {
        var zIndex = $(ele).css('z-index');
        if(zIndex === 'auto') {
            zIndex = 0;
        }
        if(zIndex < lowestZIndex) {
            lowestZIndex = zIndex
        }
    });
    return lowestZIndex;
}

function submitImage() {
    if($('#desContainer').html() == '' && $('#desContainer').css('background').indexOf('url') == -1) {
        alert('Please design your advertisement to proceed ! ')
    } else {
        $('.innerBox').css('border', 'none');
        var temp = $('#adHtml').html();
        $('#tempHtml').html(temp);
        $("#tempHtml input[type='hidden']").remove();
        var html = $('#tempHtml').html();
        html = html.replace(/style/g, 'xtyle');
        $('#htmlContent').val(html);
        $('#pdfForm').submit();
    }
}

function clearDesignContents() {
    $('#desContainer').html('');
}

function showAll() {
    $('#layerBox').show();$('#designBox').show();$('#propBox').show();
}

function hideAll() {
    $('#layerBox').hide();$('#designBox').hide();$('#propBox').hide();
}

function hideProps() {
    $('#commonStyleBox').hide();$('#imgStyleBox').hide();$('#fontStyleBox').hide();
    $('#ckEditor').hide();$('#adTextButton').hide();$('#editTextButton').hide();
}

function newDesign() {
    if($('#desContainer').html() != '') {
        var r = confirm("Do you want to discard your changes ?");
        if (r == true) {
            clearDesignContents();
            hideAll();
            $('#sizeBox').show();
        }
    } else {
        $('#sizeBox').show();
    }
}

function updateCoords(e) {
    $('#x1').val(e.x);
    $('#y1').val(e.y);
    $('#w').val(e.w);
    $('#h').val(e.h);
}

function changeDesignSize(size) {
    var dimensions = size.split('*');
    var height = dimensions[0]*cmToPixel;
    var width = dimensions[1]*cmToPixel;
    if(dimensions[0] <= 20) {
        $('#desContainer').height(height);
        $('#desContainer').width(width);
        $('#sizeBox').hide();
        enableBtns();
        hideProps();
        showAll();
        $('.image-editor').cropit('previewSize', { width: width, height: height });
    } else {
        alert('Selected size is too large. Please select smaller size !')
    }   
}

function cropImg(cropUrl) {
    if (parseInt($('#w').val())) {
        var request = $.ajax({
            url: cropUrl,
            type: "POST",
            async: true,
            cache: false,
            data: {form : $('#cropForm').serialize(), fileName :  $('#fileName').val()},
            contentType:"application/x-www-form-urlencoded",
            dataType: "html"
        });
        request.done(function(msg) {
            if(msg == 'success') {
                var image = previewArea.find('.designImg');
                image.attr('src', curImgSrc+"?"+new Date().getTime());
                image.removeAttr('width');
                image.removeAttr('height');
                closePreview('preview');
            } else {
                alert("Error occurred while cropping. Please try again later!");
            }
        });
    } else {
        alert('Please select a crop region then press submit!');
    }
}

function disableBtns() {
    $('button').prop('disabled', true);
    $('#newDesignBtn').prop('disabled', false);
}

function enableBtns() {
    $('button').prop('disabled', false);
    $('#newDesignBtn').prop('disabled', true);
}
