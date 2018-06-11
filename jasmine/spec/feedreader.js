/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it(':each feed has a URL defined and is not empty',function(){
            allFeeds.forEach(element => {
                expect(element.url).toBeDefined();
                expect(element.url.length).not.toBe(0);
                expect(element.url).toMatch(/^(http|https):\/\//);
            });
        });


        /* test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it(':each feed has a name defined and is not empty',function(){
            allFeeds.forEach(element => {
                expect(element.name).toBeDefined();
                expect(element.name.length).not.toBe(0);
            });
        });



    });

       /* test suite just contains a related set of tests.
        * This suite is all about the Menu
        * Menu elements, the menu-icon-link in our application.
        */
    describe('The menu', function() {
        /* test that ensures the menu element is hidden by default.*/

         let body = document.body;
         it('element is hidden by default',function(){
            expect(body.className).toContain('menu-hidden'); 
         });

         /* test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations:
          * 1- does the menu display when clicked
          * 2- does it hide when clicked again.
          */
         it('display when Clicked and hide when clicked again', () => {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
          

    });
       /* test suite just contains a related set of tests.
        * This suite is all about the Initial Entries
        * Main Feeds in our application.
        */
       describe('Initial Entries', function(){
        /* test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        beforeEach(function(done) {
            loadFeed(0, function(){
                done();
            });
        });
        it("there is at least a single .entry withing .feed after loadFeed() is called", function(){
            expect($('.feed .entry')).toBeDefined();
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });
       /* test suite just contains a related set of tests.
        * This suite is all about the New Feed Selection
        * Main Feeds Changes and updating in our application.
        */
       describe('New Feed Selection', function(){
        /* test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
            var initFeedSelection = {};
            var newFeedSelection = {};
            beforeEach(function(done) {
                loadFeed(0, function(){
                    initFeedSelection.url = $('.entry-link');
                    loadFeed(1, function(){
                        newFeedSelection.url = $('.entry-link');
                        done();
                    });
                });
            });

            it("the content changes by loadFeed()",function(done){
                expect(initFeedSelection).not.toBe(newFeedSelection);
                done();    
            });
        });
}());