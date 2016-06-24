import $ from './lib/Zepto.js'

let sending = false,
	toastid = null;
	
let Util = {
	getQueryStringByName: function(name){
		var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
		if(result == null || result.length < 1){
			return "";
		}
		return result[1];
	},
	//sync state
	isSending: function(){
		return sending;
	},
	/**
	 * @description show loading
	 * @param {string} loadingText
	 * @return null
	 */
	showLoading: function(loadingText){
		sending = true;
		loadingText = loadingText ? loadingText : 'loading...';
		$('body').append('<div id="loading" class="loading-layer"><div class="loading-activity"><div class="loading-icon-activity"><div class="loading-gif"></div></div><div class="loading-text-activity">'+loadingText+'</div></div></div>');
	},
	//hide loading
	hideLoading: function(){
		sending = false;
		$('#loading').remove();
	},
	/**
	 * @description toast
	 * @param {string} text
	 * @param {function} callback
	 * @return null
	 */
	toast: function(tip, callback){
		$('<div class="toast"><div class="toast-inner"><div class="toast-text">'+tip+'</div></div></div>').appendTo($('.wrap'));
		toastid = setTimeout(function(){
			$('.toast').hide().remove();
			clearTimeout(toastid);
			if(callback) callback();
		}, 1000);
	}
}

export default Util;