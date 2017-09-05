if (typeof Intree === 'undefined') {
    var Intree = Intree || {};
}

jQuery(document).ready(function() {
    new Intree.Sia();
});


/***************************************************************
 * Slide buttons with preview, price and add to cart link
 */
Intree.Sia = function() {
    var $this = this;
    $this.properties = {
        selectors: {
            showButtonsContainer: 'ul.products li.product',
            boxTitle: 'h2.woocommerce-loop-product__title',
            price: 'span.price',
            cartButton: 'a.add_to_cart_button',
            buttonPreview: 'a.yith-wcqv-button'
        }
    };
    $this.screenSize();
}

/**
 * Check mobile device 
 */
Intree.Sia.prototype.screenSize = function() {
    var $this = this;
    var useragent = navigator.userAgent || navigator.vendor || window.opera;
    var ismobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|zh-cn|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(useragent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(useragent.substr(0, 4));

    //if(!ismobile) {
    //	$this.hoverEvent();
    //}

    if (ismobile) {
        $this.alwaysVisible();
    } else {
        $this.hoverEvent();
    }
}

/**
 * Always visible if it's mobile
 */
Intree.Sia.prototype.alwaysVisible = function() {
    var $this = this;
    var positionResult = $this.calculateHeight($this.properties.selectors.showButtonsContainer);
    $this.selectorsBox($this.properties.selectors.showButtonsContainer, positionResult);
}

/**
 * Toggle buttons with hover effect
 */
Intree.Sia.prototype.hoverEvent = function() {
    var $this = this;
    $this.mouseEvent($this.properties.selectors.showButtonsContainer, 'mouseenter', function(_selectorThis) {
        var positionResult = $this.calculateHeight(_selectorThis);
        $this.selectorsBox(_selectorThis, positionResult, 'mouseenter');
    });

    $this.mouseEvent($this.properties.selectors.showButtonsContainer, 'mouseleave', function(_selectorThis) {
        var obj = {};
        obj.cssProperties = 0;
        obj.titlePriceH = 0;
        obj.buttonsHeight = 0;

        $this.selectorsBox(_selectorThis, obj, 'mouseleave');
    });
};

Intree.Sia.prototype.calculateHeight = function(_selectorThis) {
    var $this = this;
    var obj = {};
    var titleHeight = jQuery(_selectorThis).find($this.properties.selectors.boxTitle).innerHeight();
    obj.priceHeight = jQuery(_selectorThis).find($this.properties.selectors.price).innerHeight();
    var addtoCartHeight = jQuery(_selectorThis).find($this.properties.selectors.cartButton).innerHeight();
    obj.titlePriceH = obj.priceHeight + titleHeight;
    obj.buttonsHeight = obj.priceHeight + titleHeight + addtoCartHeight;
    obj.cssProperties = titleHeight;
    return obj;
};

Intree.Sia.prototype.selectorsBox = function(_selectorThis, _obj, _event) {
    var $this = this;
    jQuery(_selectorThis).find($this.properties.selectors.price).css('bottom', _obj.cssProperties);
    jQuery(_selectorThis).find($this.properties.selectors.buttonPreview).css('bottom', _obj.titlePriceH);
    jQuery(_selectorThis).find($this.properties.selectors.cartButton).css('bottom', _obj.buttonsHeight);
    if (_event === 'mouseenter') {
        jQuery(_selectorThis).find($this.properties.selectors.price).addClass('removeOpacity');
        jQuery(_selectorThis).find($this.properties.selectors.buttonPreview).addClass('removeOpacity');
        jQuery(_selectorThis).find($this.properties.selectors.cartButton).addClass('removeOpacity');
    } else {
        jQuery(_selectorThis).find($this.properties.selectors.price).removeClass('removeOpacity');
        jQuery(_selectorThis).find($this.properties.selectors.buttonPreview).removeClass('removeOpacity');
        jQuery(_selectorThis).find($this.properties.selectors.cartButton).removeClass('removeOpacity');
    }
};

Intree.Sia.prototype.mouseEvent = function(_selector, _event, _callback) {
    jQuery(document).on(_event, _selector, function() {
        if (typeof _callback === 'function') {
            _callback(this);
        }
    });
};