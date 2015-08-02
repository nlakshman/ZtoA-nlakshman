var Controller = function() {
    
    var controller = {
        self: null,
        initialize: function() {
            self = this;
			self.renderCalculatorView();
        },

       renderCalculatorView: function() {
            $('.container').addClass('active');
			$('body').height(parseInt(0.9 * document.documentElement.clientHeight));
			calculatorInitialize();
        },
    };
    controller.initialize();
    return controller;
}