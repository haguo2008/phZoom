~function($){var $w=$(window),$d=$(document),$lay=$('<div id="ph_lay"/>'),$zoom=$('<div id="ph_zoom"/>'),$both=$lay.add($zoom),phZoom=function(e,x,y,z){var that=this;this.opt=x;this.idx=y;this.all=z;this.len=z.length;this.end=this.len>1+y;this.img=$('img:first',e);this.lnk=e.addClass('phzoom').unbind('click').bind(this.imgFn()).append(this.hov=$('<span class="ph_hover"/>').hide())[0];this.cap=$('<div/>',{css:{color:x.capColor},id:'ph_cap',html:$([$('<span/>',{id:'ph_txt',text:this.img[0].title||this.lnk.title||'No title'})[0],$('<span/>',{id:'ph_idx',text:1+y+' / '+this.len})[0]])}).add(this.nav=$('<div/>',{id:'ph_nav',css:{color:x.navColor},html:(y?'<span id="ph_prev">Prev</span>':'')+(this.end?'<span id="ph_next">Next</span>':'')}));$both.click(function(){that.imgQuit()});window.XMLHttpRequest||e.height(this.img.height())};phZoom.prototype={imgFn:function(){var that=this,s=function(){return that.hov.not('.loading').stop(0,1)};return{mouseover:function(){s().fadeIn()},mouseout:function(){s().fadeOut()},click:function(){that.imgLoad();return false}}},imgPos:function(oriW,oriH){var A=this.img,pos=[oriW,oriH,A.width(),A.height(),A.offset().left,A.offset().top,$w.scrollLeft(),$w.scrollTop(),$w.width(),$w.height()];this.opt.limitWidth&&pos[0]>pos[8]&&(pos[1]=pos[8]*pos[1]/pos[0],pos[0]=pos[8]);pos.push((pos[8]-pos[2])/2+pos[6],(pos[9]-pos[3])/2+pos[7],(pos[8]-pos[0])/2+pos[6],(pos[9]-pos[1])/2+pos[7]);return pos},imgLoad:function(){$lay.fadeTo(this.opt.layDur,this.opt.layOpacity);var that=this,B=new Image();this.hov.addClass('loading');B.className='zoomed';B.onload=function(){B.onload=null;that.hov.is('.loading')&&($zoom.height($d.height()).show().append(B),that.imgAnim(B),that.preLoad())};B.src=this.lnk.href},imgAnim:function(B){var that=this,$B=$(B),pos=this.imgPos(B.width||+$B.attr('width'),B.height||+$B.attr('height')),oFlow=pos[0]>pos[8],eMon=(function(){return that.eMon(pos[8],pos[8]-pos[0],!oFlow,$('span',that.nav).hide(),$B)}());$B.after(this.cap.hide()).css({left:pos[4],top:pos[5],width:pos[2],height:pos[3]}).animate({left:pos[10],top:pos[11]},that.opt.animDurA,function(){$B.animate({left:pos[12],top:pos[13],width:pos[0],height:pos[1]},that.opt.animDurB,function(){that.hov.removeClass('loading');that.cap.css({top:pos[1]+pos[13],left:oFlow?0:pos[12],width:oFlow?pos[8]:pos[0]}).fadeTo(300,.7);that.nav.css({top:pos[1]/3+pos[13]}).bind(eMon);that.keyBind()}).bind(eMon)})},imgQuit:function(bool){this.hov.hide().is('.loading')?this.hov.removeClass('loading'):$d.unbind('.ph');$zoom.hide().empty();bool||$lay.fadeOut();return false},imgChange:function(num){this.imgQuit(1);$('.ph_hover',$(this.all[this.idx+num]).click()).show();return false},preLoad:function(){var x,y;this.idx&&(x=new Image(),x.src=this.all[this.idx-1].href,delete x);this.end&&(y=new Image(),y.src=this.all[this.idx+1].href,delete y)},keyBind:function(){var that=this,k;$d.bind('keydown.ph',function(e){k=e.which;return 27===k?that.imgQuit():39===k&&that.end?that.imgChange(1):37===k&&that.idx?that.imgChange(-1):true})},eMon:function(a,b,bool,nav,$B){var that=this,i;return{click:function(e){e=e.pageX>a/2;return 1===that.len||(that.idx?that.end?that.imgChange(e||-1):e||that.imgChange(-1):!e||that.imgChange(1))},mouseout:function(){nav.hide()},mousemove:function(e){e=e.pageX;i=e>a/2;e=e<a/3?0:e>2*a/3?b:b/2;that.idx?(nav.eq(i).show(),nav.eq(1-i).hide()):nav[i?'show':'hide']();bool||e===$B[0].offsetLeft||$B.not(':animated').animate({left:e},200)}}}};$.phzoom=function(z,x){if(!z.length)return;$('body').append($both);x=$.extend({layOpacity:.7,layDur:300,animDurA:300,animDurB:300,navColor:'#cf0',capColor:'#cf0',limitWidth:false},x);return z.each(function(y){$('img',this)[0]&&new phZoom($(this),x,y,z)})};$.fn.phzoom=function(x){return $.phzoom(this,x)}}(jQuery);