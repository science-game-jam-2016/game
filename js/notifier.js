var notifier = {
    promptChoices: function(msg, choices) {
        var ans = prompt(msg);
        if (choices.indexOf(ans) < 0) {
            alert("Invalid answer. You can type " + choices.join(", "))
            return notifier.promptChoices(msg, choices)
        } else {
            return ans;
        }
    },
    promptBool: function(msg) {
        var p = notifier.promptChoices(msg, ["y", "n"]);
        return (p === "y")
    },
    info: function(msg) {
        alert(msg);
    }
}
