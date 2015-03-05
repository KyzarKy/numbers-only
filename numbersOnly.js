(function ( $ ) {
    $.fn.numbersOnly = function(action) {
        if(action === 'destroy') {
            this.off({paste: paste, keydown: keydown});
            return;
        }
        var allowed = [37, 39, 8, 46, 35, 36, 91, 13];
        var minus = [109, 189];
        var decimal = [110, 190];
        var self = this;
        var paste = function(e) {
            e.stopPropagation();
            setTimeout(function() {
                var val = self.val();
                if(val.search(/[^\d.-]/gi) >= 0)
                    self.val("");
                if(val.indexOf('.') !== val.lastIndexOf('.') || val.lastIndexOf('.') === val.length - 1)
                    self.val("");
                if(val.lastIndexOf('-') > 0)
                    self.val("");
            },50);
        };
        var keydown = function(e) {
            if($.inArray(e.keyCode, allowed) >= 0 || e.metaKey || e.ctrlKey)
                return;
            if($.inArray(e.keyCode, minus) >= 0 && self.val().length === 0)
                return;
            if($.inArray(e.keyCode, decimal) >= 0 && self.val().indexOf('.') < 0 && !e.shiftKey)
                return;
            if(e.keyCode < 48 || (e.keyCode > 57 && e.keyCode < 96) || e.keyCode > 105) {
              e.preventDefault();
            }
        };
        this.on({paste: paste, keydown: keydown});
        return this;
    };
}( jQuery ));