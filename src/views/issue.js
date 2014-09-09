define([
    "hr/utils",
    "hr/dom",
    "hr/hr",
    "models/issue",
    "views/comments",
    "text!resources/templates/issue.html"
], function(_, $, hr, Issue, CommentsView, templateMain) {

    var IssueView = hr.View.extend({
        className: "issue",
        template: templateMain,

        initialize: function(options) {
            IssueView.__super__.initialize.apply(this, arguments);

            this.model = new Issue();
            this.comments = new CommentsView({}, this);

            this.listenTo(this.model, "set", this.update);
        },

        templateContext: function() {
            return {
                issue: this.model
            }
        },

        render: function() {
            this.comments.detach();
            this.comments.collection.loadForIssue(hr.app.currentRepo, this.model);
            return IssueView.__super__.render.apply(this, arguments);
        },
        finish: function() {
            this.comments.$el.appendTo(this.$(".issue-comments"));
            return IssueView.__super__.finish.apply(this, arguments);
        },

        // When the current issue change
        onIssueChange: function(issue) {
            return this.model.loadByNumber(hr.app.currentRepo, issue);
        }
    });

    return IssueView;
});