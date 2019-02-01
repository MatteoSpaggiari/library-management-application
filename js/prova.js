/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*window.addEventListener("load", function() {
    var ul_radio = document.getElementsByClassName("container-radio");
    for(var i = 0; i < ul_radio.length; i++) {
        ul_radio[i].addEventListener("click", function(event) {
            var input_radio = this.querySelectorAll(".radio");
            var li_radio = this.children;
            for(var j = 0; j< li_radio.length; j++) {
                li_radio[j].addEventListener("click", function(event) {
                    for(var z = 0; z < li_radio.length; z++) {
                        input_radio[z].checked = false;
                        input_radio[z].parentNode.setAttribute("style", "background-color: #d1d1d1");
                    }
                    this.firstElementChild.checked = true;
                    this.setAttribute("style", "background-color: #96e979");
                });
            }
        }, true);
    }
});

window.addEventListener("load", function() {
    var subcriber_classes = document.getElementById("subcriber_classes");
    var form = document.getElementById("p_p_c");
    subcriber_classes.addEventListener("mouseover", function(event){
        form.setAttribute("style","display: block;");
    });
    subcriber_classes.addEventListener("mouseout", function(event){
        form.setAttribute("style","display: none;");
    }); 
});*/

/*window.addEventListener("load", function() {
    var ulbutton = document.getElementById("posbut");
    var libutton = document.createElement("li");
    libutton.innerHTML= '<a class="button_excel" alt="Excel" title="Excel" href="./csv.php?param=soci">Excel</a>';
    ulbutton.append(libutton);
});*/
   //<a class="button_excel" alt="Excel" title="Excel" href="./csv.php?param=soci">Excel</a>
   
   window.location.pathname;
