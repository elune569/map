document.addEventListener("DOMContentLoaded", function() {
    
    document.getElementById("search").addEventListener("keyup", function(event) {
        if(event.key === "Enter") {
            document.getElementById("btnSearch").click();
        }
    })

})