describe('Directive: juxtapose', function () {

	var element, $scope, $compile,  juxtaposeConfig, originalTimeout,
		defaultTemplate = '<juxtapose></juxtapose>',
		attrOptionsTemplate = 
			'<juxtapose'+ 
			'	before-image-url="\'base/demo/assets/LIONDOORA.jpg\'"'+
			'	before-image-label="\'2009\'" '+
			'	before-image-credit="\'WSJ\'"'+
			'	before-image-alt="\'2009 Alternate Text\'"'+
			'	after-image-url="\'base/demo/assets/LIONDOOR_2A.jpg\'"'+
			'	after-image-label="\'2014\'" '+
			'	after-image-credit="\'TKO\'"'+
			'	after-image-alt="\'2014 Alternate Text\'">'+
			'</juxtapose>',
		attrAndConfigOptionsTemplate = 
			'<juxtapose'+ 
			'   show-labels="false"'+
			'   show-credits="false"'+
			'   vertical="true"'+
			'	before-image-url="\'base/demo/assets/LIONDOORA.jpg\'"'+
			'	before-image-label="\'2009\'" '+
			'	before-image-credit="\'WSJ\'"'+
			'	before-image-alt="\'2009 Alternate Text\'"'+
			'	after-image-url="\'base/demo/assets/LIONDOOR_2A.jpg\'"'+
			'	after-image-label="\'2014\'" '+
			'	after-image-credit="\'TKO\'"'+
			'	after-image-alt="\'2014 Alternate Text\'">'+
			'</juxtapose>',
		scopeOptionsTemplate = 
			'<juxtapose'+
			'	before-image-url="beforeImageUrl" '+
			'	before-image-label="beforeImageLabel" '+
			'	before-image-credit="beforeImageCredit"'+
			'	before-image-alt="beforeImageAlt"'+
			'	after-image-url="afterImageUrl" '+
			'	after-image-label="afterImageLabel" '+
			'	after-image-credit="afterImageCredit"'+
			'	after-image-alt="afterImageAlt">'+
			'</juxtapose>',
		invalidTemplate = //missing before image
			'<juxtapose'+ 
			'	before-image-alt="\'2009 Alternate Text\'"'+
			'	after-image-url="\'base/demo/assets/LIONDOOR_2A.jpg\'"'+
			'	after-image-label="\'2014\'" '+
			'	after-image-credit="\'TKO\'"'+
			'	after-image-alt="\'2014 Alternate Text\'">'+
			'</juxtapose>';

	function createDirective(template) {
		var elm = angular.element(template || defaultTemplate);
		angular.element(document.body).prepend(elm);
		$compile(elm)($scope);
		$scope.$digest();

		return elm;
	}

	function testSliderAsync(element, options, done, timeout){
		setTimeout(function(){
			testSlider(element,options);
			done();
		}, timeout || 0);
	}

	function testSlider(element, options){

		expect(element).toBeDefined();

		expect(element).toHaveClass('juxtapose');
		var $jxSlider = element.children().eq(0);
		var $jxCredits = element.children().eq(1);

		if(!angular.isDefined(options.beforeImageUrl) || !angular.isDefined(options.afterImageUrl) ){
			expect($jxSlider[0]).toBeUndefined();
			expect($jxCredits[0]).toBeUndefined();
		}
		else{
			testJxSlider($jxSlider,options);
			testJxCredits($jxCredits,options);			
		}

	}

	function testJxSlider($jxSlider,options){

		var vertical = options.vertical || juxtaposeConfig.vertical;

		expect($jxSlider).toBeDefined();
		expect($jxSlider).toHaveClass('jx-slider');

		if(vertical){
			expect($jxSlider).toHaveClass('vertical');
		}


		expect($jxSlider.children().length).toBe(4);
		var $jxHandle = $jxSlider.children().eq(0);
		var $jxImageLeft = $jxSlider.children().eq(1);
		var $jxImageRight = $jxSlider.children().eq(2);
		var $jxKnightlab = $jxSlider.children().eq(3);

		testJxHandle($jxHandle,options);
		testJxImage($jxImageLeft,options,'left');
		testJxImage($jxImageRight,options,'right');
	}

	function testJxCredits($jxCredits,options){

		var showCredits = options.showCredits || juxtaposeConfig.showCredits;

		if(showCredits && (options.beforeImageCredit || options.afterImageCredit)){
			expect($jxCredits).toBeDefined();
			expect($jxCredits).toHaveClass('jx-credit');
			
			var credits = '<em>Photo Credits:</em>';
			if(options.beforeImageCredit){
				credits += ' <em>Before</em> '+ options.beforeImageCredit;
			}

			if(options.afterImageCredit){
				credits += ' <em>After</em> '+ options.afterImageCredit;
			}
			expect($jxCredits).toHaveHtml(credits);
		}
		else{
			expect($jxCredits[0]).toBeUndefined();	
		}	
		
	}

	function testJxHandle($jxHandle, options){

		var vertical = options.vertical || juxtaposeConfig.vertical;

		expect($jxHandle).toHaveClass('jx-handle');
		expect($jxHandle.eq(0)[0].tagName).toBe('DIV');
		expect($jxHandle.attr('style')).toEqual(vertical ? 'top: 50%; ' : 'left: 50%; ');
		//FIXME TKO: not working: expect($jxHandle).toHaveCss(vertical ? {top: "50%"} : {left: "50%"});

		var $jxArrowLeft = $jxHandle.children().eq(0);
		var $jxControl = $jxHandle.children().eq(1);
		var $jxArrowRight = $jxHandle.children().eq(2);

		expect($jxArrowLeft).toHaveClass('jx-arrow jx-left');
		expect($jxArrowLeft.eq(0)[0].tagName).toBe('DIV');

		expect($jxControl).toHaveClass('jx-control');
		expect($jxControl.eq(0)[0].tagName).toBe('DIV');

		expect($jxArrowRight).toHaveClass('jx-arrow jx-right');
		expect($jxArrowRight.eq(0)[0].tagName).toBe('DIV');

		//jx-controller
		var $jxController = $jxControl.children().eq(0);
		expect($jxController).toHaveClass('jx-controller');
		expect($jxController.eq(0)[0].tagName).toBe('DIV');
		expect($jxController).toHaveAttr('tabindex','0');
		expect($jxController).toHaveAttr('role','slider');
		expect($jxController).toHaveAttr('aria-valuenow','50');
		expect($jxController).toHaveAttr('aria-valuemin','0');
		expect($jxController).toHaveAttr('aria-valuemax','100');
	}


	function testJxImage($jxImage, options, position){

		var vertical = angular.isDefined(options.vertical)? options.vertical : juxtaposeConfig.vertical;

		expect($jxImage).toHaveClass('jx-image jx-'+position);
		expect($jxImage.eq(0)[0].tagName).toBe('DIV');
		expect($jxImage.attr('style')).toEqual(vertical ? 'height: 50%; ': 'width: 50%; ');
		//FIXME TKO: not working: expect($jxImage).toHaveCss(vertical ? {height: "50%"} : {width: "50%"});

		var $img = $jxImage.children().eq(0);
		var $jxLabel = $jxImage.children().eq(1);

		var url = (position === 'left')? options.beforeImageUrl : options.afterImageUrl;
		expect($img).toHaveAttr('src', url);

		var showLabels = angular.isDefined(options.showLabels)? options.showLabels : juxtaposeConfig.showLabels;

		var label = (position === 'left')? options.beforeImageLabel : options.afterImageLabel;
		if(showLabels && label){
			expect($jxLabel).toHaveText(label);			
		}
		else {
			expect($jxLabel[0]).toBeUndefined();	
		}
	}
	
	beforeEach(function () {

		module('ngJuxtapose');

		inject(function (_$rootScope_, _$compile_, _juxtaposeConfig_) {
			$scope = _$rootScope_.$new();
			$compile = _$compile_;
			juxtaposeConfig = _juxtaposeConfig_;
		});

		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	});

	afterEach(function () {
		if (element) {
			element.remove();
		}

		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});


	describe('requires', function () {
		it('juxtapose library to be present', function () {
			expect(window.juxtapose).toBeDefined();
		});
	});

	describe('when created', function(){

		beforeEach(function(){
			jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
		});

		it('should correctly initialize the slider from DOM attributes', function(done){

			element = createDirective(attrOptionsTemplate);
			var options = {
				beforeImageUrl : 'base/demo/assets/LIONDOORA.jpg',
				beforeImageLabel : '2009',
				beforeImageCredit : 'WSJ',
				beforeImageAlt : '2009 Alternate Text',
				afterImageUrl : 'base/demo/assets/LIONDOOR_2A.jpg',
				afterImageLabel : '2014',
				afterImageCredit : 'TKO',
				afterImageAlt : '2014 Alternate Text'
			};
			//test after 5s, to allow images to load and so, trigger the slider initialization
			testSliderAsync(element,options, done, 5000);

		});

		it('should correctly initialize the slider from scope attributes', function(done){

			$scope.beforeImageUrl = 'base/demo/assets/LIONDOORA.jpg';
			$scope.beforeImageLabel = '2009';
			$scope.beforeImageCredit = 'WSJ';
			$scope.beforeImageAlt = '2009 Alt Text';
			$scope.afterImageUrl = 'base/demo/assets/LIONDOOR_2A.jpg';
			$scope.afterImageLabel = '2014';
			$scope.afterImageCredit = '';
			$scope.afterImageAlt = '2014 Alt Text';

			element = createDirective(scopeOptionsTemplate);
			
			var options = {
				beforeImageUrl : 'base/demo/assets/LIONDOORA.jpg',
				beforeImageLabel : '2009',
				beforeImageCredit : 'WSJ',
				beforeImageAlt : '2009 Alt Text',
				afterImageUrl : 'base/demo/assets/LIONDOOR_2A.jpg',
				afterImageLabel : '2014',
				afterImageCredit : '',
				afterImageAlt : '2014 Alt Text'
			};
			//test after 5s, to allow images to load and so, trigger the slider initialization
			testSliderAsync(element,options, done, 5000);
		});

		it('should override default config options by those from DOM attributes', function(done){

			element = createDirective(attrAndConfigOptionsTemplate);
			var options = {
				showLabels : false,
				showCredits : false,
				vertical : true,
				beforeImageUrl : 'base/demo/assets/LIONDOORA.jpg',
				beforeImageLabel : '2009',
				beforeImageCredit : 'WSJ',
				beforeImageAlt : '2009 Alternate Text',
				afterImageUrl : 'base/demo/assets/LIONDOOR_2A.jpg',
				afterImageLabel : '2014',
				afterImageCredit : 'TKO',
				afterImageAlt : '2014 Alternate Text'
			};
			//test after 5s, to allow images to load and so, trigger the slider initialization
			testSliderAsync(element,options, done, 5000);

		});

		it('should not correctly initialize the slider because of missing mandatory image url(s)', function(done){

			element = createDirective(invalidTemplate);
			
			var options = {
				beforeImageAlt : '2009 Alt Text',
				afterImageUrl : 'base/demo/assets/LIONDOOR_2A.jpg',
				afterImageLabel : '2014',
				afterImageCredit : '',
				afterImageAlt : '2014 Alt Text'
			};
			//test after 5s, to allow images to load and so, trigger the slider initialization
			testSliderAsync(element,options, done, 5000);
		});
	});
	
});