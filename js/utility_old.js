class Dialog {
    
    constructor(header = "Avviso", testo = null, auto = true) {
        
        //Parametri costruttore
        this.header = header;
        this.testo = testo;
        this.auto = auto;
        
        //Variabili interne
        this.backgroundAvviso = document.createElement("div");
        this.avviso = document.createElement("div");
        this.dialog = document.createElement("div");
        this.buttonCloseDialog = document.createElement("span");
        this.contentDialog = `<h2>${this.header}</h2>${this.testo}`;
        
        this.backgroundAvviso.classList.add("background-dialog");
        this.avviso.classList.add("container-dialog");
        this.dialog.classList.add("dialog");
        this.buttonCloseDialog.classList.add('close-dialog');
        this.buttonCloseDialog.setAttribute("tabindex","0");
        this.dialog.innerHTML = this.contentDialog;
        this.dialog.appendChild(this.buttonCloseDialog);
        this.avviso.appendChild(this.dialog);
        this.backgroundAvviso.appendChild(this.avviso);
        if(this.auto && this.testo != null) {
            document.body.appendChild(this.backgroundAvviso);
        }
        
        const backgroundAvviso = this.backgroundAvviso;
        this.buttonCloseDialog.addEventListener("click", function(event) {
            backgroundAvviso.classList.add("close");
        });
        
    }
    
    setHeader(header) {
        this.header = header;
        this.contentDialog = `<h2>${this.header}</h2>${this.testo}`;
        this.dialog.innerHTML = this.contentDialog;
    }
    
    setTesto(testo) {
        this.testo = testo;
        this.contentDialog = `<h2>${this.header}</h2>${this.testo}`;
        this.dialog.innerHTML = this.contentDialog;
    }
    
    setAuto(auto) {
        this.auto = auto;
    }
    
    open() {
        document.body.appendChild(this.backgroundAvviso);
        const backgroundAvviso = this.backgroundAvviso;
        backgroundAvviso.classList.remove("close");
        this.buttonCloseDialog.addEventListener("click", function(event) {
            backgroundAvviso.classList.add("close");
        });
    }
    
}