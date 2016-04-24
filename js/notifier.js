var notifier = {
    promptChoices: function(cb) {
        document.getElementById("new-plant").className = "open";
        document.getElementById("new-corn").onclick = function() {
            cb("corn")
        }
        document.getElementById("new-potato").onclick = function() {
            cb("potato")
        }
        document.getElementById("new-rice").onclick = function() {
            cb("rice")
        }
        // var ans = prompt(msg);
        // choices = choices.map(function(e){
        //     console.log(e);
        //     return e.toLowerCase();
        // });
        // if (choices.indexOf(ans.toLowerCase()) < 0) {
        //     alert("Invalid answer. You can type " + choices.join(", "))
        //     return notifier.promptChoices(msg, choices)
        // } else {
        //     return ans;
        // }
    },
    promptBool: function(cb) {
        document.getElementById("yes-no").className = "open";
        document.getElementById("yes").onclick = function() {
            document.getElementById("yes-no").className = "closed";
            cb(true)
        }
        document.getElementById("no").onclick = function() {
            document.getElementById("yes-no").className = "closed";
            cb(false)
        }
    },
    info: function(msg) {
        alert(msg);
    },
    loss: function(msg) {
    	alert("You ran out of water. Better luck next time!");
    	location.reload()
    }
}

//function show_popup() {
 // var p = window.createPopup()
 // var pbody = p.document.body
 // pbody.style.backgroundColor = "lime"
 // pbody.style.border = "solid black 1px"
 // pbody.innerHTML = "This is a pop-up! Click outside to close."
 // p.show(150,150,200,50,document.body)
// }
