var DEBUG = true;
var log = function() {
    if (DEBUG)
        console.log.apply(console, arguments);
};
var errorHandler = function(r) {
    log(r);
};

(function(scope) {
    var ApplicationID = "eiv32sFkByLILfAUSLW5H1d7rAlK4WvCaU8to5uI";
    var JavascriptKey = "7D4goPL0RxMJft4XQdF9VGBJ1K1yYUx5xWTkHFgt";
    Parse.initialize(ApplicationID, JavascriptKey);

    var POSTS_PER_PAGE = 3;
    var PAGES_COUNT = 8;
    var MONTHS = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
    var Posts = Parse.Object.extend('Posts');
    var Terms = Parse.Object.extend('Terms');
    var TermRelationships = Parse.Object.extend('TermRelationships');
    var TermTaxonomy = Parse.Object.extend('TermTaxonomy');
    var Comments = Parse.Object.extend('Comments');

    var mPage = 1, mTotalPages = 1;

    function totalPosts() {
        var defer = $.Deferred();
        var query = new Parse.Query(Posts);
        query.descending("ID");
        query.count({
            success : function(r) {
                defer.resolve(r);
            },
            error : function(r) {
                log(r);
                defer.reject(r);
            }
        });
        return defer.promise();
    }

    // page starts from 1...
    function getPage(page) {
        var defer = $.Deferred();
        page = page - 1 < 0 ? 0 : page - 1;
        var query = new Parse.Query(Posts);
        query.descending("ID");
        query.skip(page * POSTS_PER_PAGE);
        query.limit(POSTS_PER_PAGE);
        query.find({
            success : function(r) {
                defer.resolve(r);
            },
            error : function(r) {
                log(r);
                defer.reject(r);
            }
        });
        return defer.promise();
    }

    function toPostBindData(list) {
        var arr = [];
        $.each(list, function() {
            var post = {};
            var id = this.get('ID');
            var date = new Date(this.get('post_date'));
            post.ID = id;
            post.post_year = date.getFullYear();
            post.post_month = MONTHS[date.getMonth()];
            post.post_day = date.getDate();
            post.post_title = this.get('post_title');
            post.post_author = this.get('post_author');
            post.post_link = this.get('post_guid');
            post.post_author = this.get('post_author');
            post.comment_count = this.get('comment_count');
            post.post_content = this.get('post_content');

            post.post_category = 'category';
            //this.get('post_category');
            post.post_category_link = 'post_category_link';
            //this.get('post_category_link');
            post.comment_link = 'comment_link';
            //this.get('comment_link');
            post.post_views = 13;
            //this.get('post_views');
            log(post, this);
            arr.push(post);
        });
        return arr;
    }

    function genPageArray(page, total) {
        var left = 1, right = total;
        if (total > PAGES_COUNT) {
            var middleLow = parseInt(PAGES_COUNT / 2);
            var middleHigh = total - middleLow;
            middleLow = PAGES_COUNT - middleLow;
            if (page < middleLow) {
                left = 1, right = left + PAGES_COUNT - 1;
            } else if (page > middleHigh) {
                right = total, left = right - PAGES_COUNT + 1;
            } else {
                right = page + parseInt(PAGES_COUNT / 2);
                left = right - PAGES_COUNT + 1;
            }
        }
        var arr = [];
        while (left <= right) {
            arr.push(left++);
        }
        return arr;
    }

    function initPagination() {
        totalPosts().done(function(r){
            log("total posts:", r);
            mTotalPages = parseInt((r + POSTS_PER_PAGE - 1) / POSTS_PER_PAGE);
            showPage(mPage);
        });
    }
    
    function showPagination() {
        var arr = genPageArray(mPage, mTotalPages);
        log(mPage, mTotalPages, arr);
        ko.applyBindings({
            'page' : mPage,
            'total' : mTotalPages,
            'page_array' : arr
        }, $("#pagination").get(0));
    }

    function showPage(page) {
        if (page < 1 || page > mTotalPages)
            return;
        log("show page:", page);
        getPage(page).done(function(r) {
            var data = toPostBindData(r);
            ko.applyBindings(data, $("#posts").get(0));
            mPage = page;
            scroll(0,0);
            showPagination();
        });
    }
    
    function showNextPage() {
        showPage(mPage + 1);
    }

    function showPrevPage() {
        showPage(mPage - 1);
    }
    
    function showPost(id) {
        log("showPost:" + id);
    }

    // query.include(["post.author"]);


    var AppRouter = Backbone.Router.extend({
        routes: {
            "page/:id": "showPage",
            "posts/:id": "showPost",
            "*actions": "defaultRoute"
        },
        showPage: showPage,
        showPost: showPost,
        defaultRoute: function( actions ){
            log("defaultRoute->", actions);
        }
    });
    var app_router = new AppRouter;
    Backbone.history.start();

    $.extend(scope, {
        initPagination: initPagination,
        showPage: showPage,
        showNextPage: showNextPage,
        showPrevPage: showPrevPage
    });
})(this);

(function() {
    var Posts = Parse.Object.extend('Posts');
    var Terms = Parse.Object.extend('Terms');
    var TermRelationships = Parse.Object.extend('TermRelationships');
    var TermTaxonomy = Parse.Object.extend('TermTaxonomy');
    var Comments = Parse.Object.extend('Comments');
    
    function login() {
        var defer = $.Deferred();
        Parse.User.logIn("jfo", "123456", {
            success: function(user) {
                defer.resolve(user);
            },
            error: function(user, error) {
                log(error);
                defer.reject(user, error);
            }
        });
        return defer.promise();
    }
    
    var updatePublicACL = function() {
        var start = "";
        var i = 0;
        function r() {
            var query = new Parse.Query(Posts);
            query.ascending("post_date");
            query.limit(20);
            query.greaterThan("post_date", start);
            query.equalTo("post_status", "publish");
            query.find({
                success : function(results) {
                    log(results.length);
                    if (results.length == 0) {
                        return;
                    }
                    $.each(results, function() {
                        var postACL = new Parse.ACL(Parse.User.current());
                        postACL.setPublicReadAccess(true);
                        this.setACL(postACL);
                        this.save();
                        log(++i, "id:" + this.get("ID"), this);
                        start = this.get("post_date");
                    });
                    r();
                },
                error : errorHandler
            });
        }
        login().done(r);
    };
    var updatePrivateACL = function() {
        var start = "";
        var i = 0;
        function r() {
            var query = new Parse.Query(Posts);
            query.ascending("post_date");
            query.limit(20);
            query.greaterThan("post_date", start);
            query.notEqualTo("post_status", "publish");
            query.find({
                success : function(results) {
                    log(results.length);
                    if (results.length == 0) {
                        return;
                    }
                    $.each(results, function() {
                        var postACL = new Parse.ACL(Parse.User.current());
                        this.setACL(postACL);
                        this.save();
                        // $.toJSON(this.getACL().permissionsById)
                        log(++i, "id:" + this.get("ID"), this);
                        start = this.get("post_date");
                    });
                    r();
                },
                error : errorHandler
            });
        }
        login().done(r);
    };
    var checkACL = function() {
        var start = "";
        var i = 0;
        var list = [];
        var defer = $.Deferred();
        function r() {
            var query = new Parse.Query(Posts);
            query.ascending("post_date");
            query.limit(20);
            query.greaterThan("post_date", start);
            //query.notEqualTo("post_status", "publish");
            query.find({
                success : function(results) {
                    log(results.length);
                    if (results.length == 0) {
                        defer.resolve();
                        return;
                    }
                    $.each(results, function() {
                        ++i;
                        var post_status = this.get("post_status");
                        var postACL = this.getACL();
                        if (!postACL) {
                            var id = this.get("ID");
                            console.warn(i, "id:" + id, this);
                            list.push($.toJSON(this));
                        } else {
                            log(i, "id:" + this.get("ID"), $.toJSON(this.getACL().permissionsById), this);
                        }
                        start = this.get("post_date");
                    });
                    r();
                },
                error : errorHandler
            });
            return defer.promise();
        }
        login().done(function(){
            r().done(function(){
                log("fix list:", list);
            });
        });
    };
    var updatePostUser = function() {
        var start = "";
        var i = 0;
        function r() {
            var query = new Parse.Query(Posts);
            query.ascending("post_date");
            query.limit(20);
            query.greaterThan("post_date", start);
            query.find({
                success : function(results) {
                    log(results.length);
                    if (results.length == 0) {
                        return;
                    }
                    $.each(results, function() {
                        this.set("post_author", Parse.User.current());
                        this.save();
                        log(++i, "id:" + this.get("ID"), this);
                        start = this.get("post_date");
                    });
                    r();
                },
                error : errorHandler
            });
        }
        login().done(r);
    };
    var checkPostUser = function() {
        var start = "";
        var i = 0;
        var list = [];
        var defer = $.Deferred();
        function r() {
            var query = new Parse.Query(Posts);
            query.ascending("post_date");
            query.limit(20);
            query.greaterThan("post_date", start);
            query.find({
                success : function(results) {
                    log(results.length);
                    if (results.length == 0) {
                        defer.resolve();
                        return;
                    }
                    $.each(results, function() {
                        ++i;
                        var author = this.get("post_author");
                        if (!author) {
                            var id = this.get("ID");
                            console.warn(i, "id:" + id, this);
                            list.push($.toJSON(this));
                        } else {
                            log(i, "id:" + this.get("ID"), this);
                        }
                        start = this.get("post_date");
                    });
                    r();
                },
                error : errorHandler
            });
            return defer.promise();
        }
        login().done(function(){
            r().done(function(){
                log("fix list:", list);
            });
        });
    };


    function getPost(post_id) {
        var defer = $.Deferred();
        var query = new Parse.Query(Posts);
        query.equalTo("ID", post_id);
        query.first({
            success: function(r){
                defer.resolve(r);
            },
            error: errorHandler
        });
        return defer.promise();
    }
    function getTermTaxonomyByTaxonomyId(term_taxonomy_id) {
        var defer = $.Deferred();
        var query = new Parse.Query(TermTaxonomy);
        query.equalTo("term_taxonomy_id", term_taxonomy_id);
        query.first({
            success: function(r){
                defer.resolve(r);
            },
            error: errorHandler
        });
        return defer.promise();
    }
    function getTermTaxonomyByTermId(term_id) {
        var defer = $.Deferred();
        var query = new Parse.Query(TermTaxonomy);
        query.equalTo("term_id", term_id);
        query.first({
            success: function(r){
                defer.resolve(r);
            },
            error: errorHandler
        });
        return defer.promise();
    }
    function getTerm(term_id) {
        var defer = $.Deferred();
        var query = new Parse.Query(Terms);
        query.equalTo("term_id", term_id);
        query.first({
            success: function(r){
                defer.resolve(r);
            },
            error: errorHandler
        });
        return defer.promise();
    }

    var updateTermRelationships = function() {
        var start = 0;
        var i = 0;
        function r() {
            var query = new Parse.Query(TermRelationships);
            query.ascending("object_id");
            query.limit(20);
            query.greaterThan("object_id", start);
            query.find({
                success : function(results) {
                    log(results.length);
                    if (results.length == 0) {
                        return;
                    }
                    $.each(results, function() {
                        var relation = this;
                        var post_id = this.get("object_id");
                        var term_taxonomy_id = this.get("term_taxonomy_id");
                        getPost(post_id).done(function(post){
                            if (!post)
                                return
                            getTermTaxonomyByTaxonomyId(term_taxonomy_id).done(function(term_taxonomy){
                                getTerm(term_taxonomy.get("term_id")).done(function(term){
                                    relation.set("post", post);
                                    relation.set("term", term);
                                    relation.save();
                                });
                            });
                        });
                        log(++i, "object_id:" + this.get("object_id"), this);
                        start = this.get("object_id");
                    });
                    r();
                },
                error : errorHandler
            });
        }
        login().done(r);
    };
    var checkTermRelationships = function() {
        var start = 0;
        var i = 0;
        var list = [];
        var defer = $.Deferred();
        function r() {
            var query = new Parse.Query(TermRelationships);
            query.ascending("object_id");
            query.limit(20);
            query.greaterThan("object_id", start);
            query.find({
                success : function(results) {
                    log(results.length);
                    if (results.length == 0) {
                        defer.resolve();
                        return;
                    }
                    $.each(results, function() {
                        ++i;
                        var term = this.get("term");
                        var post = this.get("post");
                        if (!term || !post) {
                            var id = this.get("object_id");
                            console.warn(i, "id:" + id, this);
                            list.push($.toJSON(this));
                        } else {
                            log(i, "id:" + this.get("object_id"), this);
                        }
                        start = this.get("object_id");
                    });
                    r();
                },
                error : errorHandler
            });
            return defer.promise();
        }
        login().done(function(){
            r().done(function(){
                log("fix list:", list);
            });
        });
    };

    var updateTerms = function() {
        var start = 0;
        var i = 0;
        function r() {
            var query = new Parse.Query(Terms);
            query.ascending("term_id");
            query.limit(20);
            query.greaterThan("term_id", start);
            query.find({
                success : function(results) {
                    log(results.length);
                    if (results.length == 0) {
                        return;
                    }
                    $.each(results, function() {
                        var term = this;
                        var term_id = this.get("term_id");
                        getTermTaxonomyByTermId(term_id).done(function(term_taxonomy){
                            var count = term_taxonomy.get("count");
                            term.set("count", count);
                            term.save();
                        });
                        log(++i, "object_id:" + this.get("term_id"), this);
                        start = this.get("term_id");
                    });
                    r();
                },
                error : errorHandler
            });
        }
        login().done(r);
    };
    
    function getComment(comment_ID) {
        var defer = $.Deferred();
        var query = new Parse.Query(Comments);
        query.equalTo("comment_ID", comment_ID);
        query.first({
            success: function(r){
                defer.resolve(r);
            },
            error: errorHandler
        });
        return defer.promise();
    }

    var updateComments = function() {
        var start = 0;
        var i = 0;
        function r() {
            var query = new Parse.Query(Comments);
            query.ascending("comment_ID");
            query.limit(20);
            query.greaterThan("comment_ID", start);
            query.find({
                success : function(results) {
                    log(results.length);
                    if (results.length == 0) {
                        return;
                    }
                    $.each(results, function() {
                        var comment = this;
                        var post_id = this.get("comment_post_ID");
                        getPost(post_id).done(function(post){
                            if (!post)
                                return;
                            comment.set("post", post);
                            comment.save();
                        });
                        var parent_comment_id = this.get("comment_parent");
                        if (parent_comment_id > 0) {
                            getComment(parent_comment_id).done(function(parent_comment){
                                comment.set("parent", parent_comment);
                            });
                        }
                        log(++i, "comment_ID:" + this.get("comment_ID"), this);
                        start = this.get("comment_ID");
                    });
                    r();
                },
                error : errorHandler
            });
        }
        login().done(r);
    };
    var checkComments = function() {
        var start = 0;
        var i = 0;
        var list = [];
        var defer = $.Deferred();
        function r() {
            var query = new Parse.Query(Comments);
            query.ascending("comment_ID");
            query.limit(20);
            query.greaterThan("comment_ID", start);
            query.find({
                success : function(results) {
                    log(results.length);
                    if (results.length == 0) {
                        defer.resolve();
                        return;
                    }
                    $.each(results, function() {
                        ++i;
                        var parent_comment_id = this.get("parent_comment");
                        var parent_comment = this.get("parent");
                        var post = this.get("post");
                        if (!post || (parent_comment_id > 0 && !parent_comment)) {
                            var id = this.get("comment_ID");
                            console.warn(i, "id:" + id, this);
                            list.push($.toJSON(this));
                        } else {
                            log(i, "id:" + this.get("comment_ID"), this);
                        }
                        start = this.get("comment_ID");
                    });
                    r();
                },
                error : errorHandler
            });
            return defer.promise();
        }
        login().done(function(){
            r().done(function(){
                log("fix list:", list);
            });
        });
    };

//checkACL();
})();

var testPostData = {
    post_year : "2013",
    post_month : "三",
    post_day : "5",
    post_title : "javascript继承",
    post_link : "#",
    post_author : "jfojfo",
    post_category : "Webapp",
    post_category_link : "#",
    post_views : 123,
    comment_link : "#",
    comment_count : 7,
    post_content : "<p>显然用Activity来做是不行的，因为新Activity启动的时候会把原来的Activity pause掉怎么做呢，可以参考系统电量提示窗口或statusbar那样在service中启动窗口</p>"
};

