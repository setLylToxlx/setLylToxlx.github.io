/**
 * Created by yf2 on 2016/7/11.
 */
(function ($) {
    $.fn.extend({
        "bold": function () {
            ///<summary>
            /// 加粗字体
            ///</summary>
            return this.css({ fontSize: "100px"});
        }
    });
})(jQuery);