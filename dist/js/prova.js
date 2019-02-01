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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwcm92YS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBcbiAqIFRvIGNoYW5nZSB0aGlzIGxpY2Vuc2UgaGVhZGVyLCBjaG9vc2UgTGljZW5zZSBIZWFkZXJzIGluIFByb2plY3QgUHJvcGVydGllcy5cbiAqIFRvIGNoYW5nZSB0aGlzIHRlbXBsYXRlIGZpbGUsIGNob29zZSBUb29scyB8IFRlbXBsYXRlc1xuICogYW5kIG9wZW4gdGhlIHRlbXBsYXRlIGluIHRoZSBlZGl0b3IuXG4gKi9cbi8qd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKCkge1xuICAgIHZhciB1bF9yYWRpbyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjb250YWluZXItcmFkaW9cIik7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHVsX3JhZGlvLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHVsX3JhZGlvW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGlucHV0X3JhZGlvID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKFwiLnJhZGlvXCIpO1xuICAgICAgICAgICAgdmFyIGxpX3JhZGlvID0gdGhpcy5jaGlsZHJlbjtcbiAgICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGo8IGxpX3JhZGlvLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGlfcmFkaW9bal0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgeiA9IDA7IHogPCBsaV9yYWRpby5sZW5ndGg7IHorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRfcmFkaW9bel0uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRfcmFkaW9bel0ucGFyZW50Tm9kZS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImJhY2tncm91bmQtY29sb3I6ICNkMWQxZDFcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdEVsZW1lbnRDaGlsZC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImJhY2tncm91bmQtY29sb3I6ICM5NmU5NzlcIik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuICAgIH1cbn0pO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN1YmNyaWJlcl9jbGFzc2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJjcmliZXJfY2xhc3Nlc1wiKTtcbiAgICB2YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicF9wX2NcIik7XG4gICAgc3ViY3JpYmVyX2NsYXNzZXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgIGZvcm0uc2V0QXR0cmlidXRlKFwic3R5bGVcIixcImRpc3BsYXk6IGJsb2NrO1wiKTtcbiAgICB9KTtcbiAgICBzdWJjcmliZXJfY2xhc3Nlcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICBmb3JtLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsXCJkaXNwbGF5OiBub25lO1wiKTtcbiAgICB9KTsgXG59KTsqL1xuXG4vKndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgdWxidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBvc2J1dFwiKTtcbiAgICB2YXIgbGlidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgbGlidXR0b24uaW5uZXJIVE1MPSAnPGEgY2xhc3M9XCJidXR0b25fZXhjZWxcIiBhbHQ9XCJFeGNlbFwiIHRpdGxlPVwiRXhjZWxcIiBocmVmPVwiLi9jc3YucGhwP3BhcmFtPXNvY2lcIj5FeGNlbDwvYT4nO1xuICAgIHVsYnV0dG9uLmFwcGVuZChsaWJ1dHRvbik7XG59KTsqL1xuICAgLy88YSBjbGFzcz1cImJ1dHRvbl9leGNlbFwiIGFsdD1cIkV4Y2VsXCIgdGl0bGU9XCJFeGNlbFwiIGhyZWY9XCIuL2Nzdi5waHA/cGFyYW09c29jaVwiPkV4Y2VsPC9hPlxuICAgXG4gICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4iXSwiZmlsZSI6InByb3ZhLmpzIn0=
