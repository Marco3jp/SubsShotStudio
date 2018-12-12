let styleData = {
    subsFontSize: "50px",
    subsLetterSpacing: "1px",
    subsBackgroundColor: "rgba(66,66,66,.6)",
    subsPaddingVertical: "10px",
    subsPaddingHorizontal: "20px",
};

let styleSheet: string = `#subs-shot-studio *{box-sizing:border-box;z-index:99999}#subs-shot-studio #subs-shot-studio-toggle{position:fixed;top:0;left:0;height:50px;width:50px;border:thin solid black;background:silver;border-radius:10px}#subs-shot-studio #subs-shot-studio-form-mother{background-color:rgba(66,66,66,.5);position:fixed;padding:30px 50px;border:thin solid black;width:600px;margin-left:auto;margin-right:auto;top:35%;left:0;right:0}#subs-shot-studio #subs-shot-studio-form-mother #subs-shot-studio-form #subs-shot-studio-form-setting{margin-bottom:20px}#subs-shot-studio #subs-shot-studio-form-mother #subs-shot-studio-form #subs-shot-studio-form-setting #subs-shot-studio-form-font{height:60px;width:400px;line-height:20px;font-size:20px}#subs-shot-studio #subs-shot-studio-form-mother #subs-shot-studio-form #subs-shot-studio-form-setting #subs-shot-studio-form-color{height:60px;width:80px}#subs-shot-studio #subs-shot-studio-form-mother #subs-shot-studio-form #subs-shot-studio-form-subs{height:90px;width:500px;line-height:16px;font-size:16px;display:block}#subs-shot-studio #subs-shot-studio-form-mother #subs-shot-studio-form #subs-shot-studio-form-operate{margin-top:20px;width:500px}#subs-shot-studio #subs-shot-studio-form-mother #subs-shot-studio-form #subs-shot-studio-form-close{position:absolute;top:0;right:0;height:30px}#subs-shot-studio #subs-shot-studio-subs{position:fixed;background-color:${styleData.subsBackgroundColor};top:80%;left:50%;padding:${styleData.subsPaddingVertical} ${styleData.subsPaddingHorizontal};transform:translateX(-50%)}#subs-shot-studio #subs-shot-studio-subs #subs-shot-studio-subs-text{font-size:${styleData.subsFontSize};letter-spacing:${styleData.subsLetterSpacing}}`;

class subsShotStudio {
    subsShotStudio: HTMLDivElement;
    formMother: HTMLDivElement;
    form: HTMLFormElement;
    fontInputElm: HTMLInputElement;
    bgInputElm: HTMLInputElement;
    colorInputElm: HTMLTextAreaElement;
    subsInputElm: HTMLInputElement;
    settingElm: HTMLDivElement;

    constructor() {
        let styleElm: HTMLStyleElement = document.createElement("style");
        styleElm.textContent = styleSheet;
        document.querySelector("head").appendChild(styleElm);

        let subsShotStudioElm: HTMLDivElement = document.createElement("div");
        let formToggleElm: HTMLDivElement = document.createElement("div");
        let formMother: HTMLDivElement = document.createElement("div");
        let settingElm: HTMLDivElement = document.createElement("div");
        let form: HTMLFormElement = document.createElement("form");
        let fontInput: HTMLInputElement = document.createElement("input");
        //let bgInput: HTMLInputElement = document.createElement("input");
        let colorInput: HTMLInputElement = document.createElement("input");
        let subsInput: HTMLTextAreaElement = document.createElement("textarea");
        let operateButton: HTMLInputElement = document.createElement("input");
        let closeButton: HTMLInputElement = document.createElement("input");

        subsShotStudioElm.id = "subs-shot-studio";
        formToggleElm.id = "subs-shot-studio-toggle";
        formMother.id = "subs-shot-studio-form-mother";
        form.id = "subs-shot-studio-form";
        settingElm.id = "subs-shot-studio-form-setting";
        fontInput.id = "subs-shot-studio-form-font";
        //bgInput.id = "subs-shot-studio-form-bg";
        colorInput.id = "subs-shot-studio-form-color";
        subsInput.id = "subs-shot-studio-form-subs";
        operateButton.id = "subs-shot-studio-form-operate";
        closeButton.id = "subs-shot-studio-form-close";

        fontInput.type = "text";
        //bgInput.type = "color";
        colorInput.type = "color";
        operateButton.type = "button";
        closeButton.type = "button";

        //bgInput.value = "#424242";
        colorInput.value = "#FFFFFF";
        operateButton.value = "実行";
        closeButton.value = "x";

        fontInput.placeholder = "font name";
        subsInput.placeholder = "caption";

        formToggleElm.addEventListener("click", () => {
            this.toggleForm()
        });

        closeButton.addEventListener("click", () => {
            this.closeForm();
        });

        operateButton.addEventListener("click", () => {
            this.createSubs();
        });

        settingElm.appendChild(fontInput);
        settingElm.appendChild(colorInput);
        form.appendChild(settingElm);
        form.appendChild(subsInput);
        form.appendChild(operateButton);
        form.appendChild(closeButton);
        //settingElm.appendChild(bgInput);
        formMother.appendChild(form);
        subsShotStudioElm.appendChild(formMother);
        subsShotStudioElm.appendChild(formToggleElm);

        this.subsShotStudio = document.querySelector("body").appendChild(subsShotStudioElm);
        this.formMother = this.subsShotStudio.querySelector("#subs-shot-studio-form-mother");
        this.form = this.formMother.querySelector("#subs-shot-studio-form");
        this.fontInputElm = this.form.querySelector("#subs-shot-studio-form-font");
        //this.bgInputElm = this.form.querySelector("#subs-shot-studio-form-bg");
        this.colorInputElm = this.form.querySelector("#subs-shot-studio-form-color");
        this.subsInputElm = this.form.querySelector("#subs-shot-studio-form-subs");

        this.formMother.style.display = "none";
    }

    toggleForm() {
        if (this.formMother.style.display === "none") {
            this.openForm();
        } else {
            this.closeForm();
        }
    }

    closeForm() {
        this.formMother.style.display = "none";
    }

    openForm() {
        this.formMother.style.display = null;
    }

    createSubs() {
        let subsElm = document.createElement("div");
        let subs = document.createElement("span");
        subsElm.id = "subs-shot-studio-subs";
        subs.id = "subs-shot-studio-subs-text";
        subs.textContent = this.subsInputElm.value;
        subsElm.style.fontFamily = this.fontInputElm.value !== "default" ? this.fontInputElm.value : null;
        subsElm.style.color = this.colorInputElm.value;
        //subsElm.style.background = this.bgInputElm.value;
        subsElm.appendChild(subs);
        this.subsShotStudio.appendChild(subsElm).addEventListener("click", () => {
            this.deleteSubs();
        });
        this.closeForm();
    }

    deleteSubs() {
        let subs = this.subsShotStudio.querySelector("#subs-shot-studio-subs");
        subs.parentNode.removeChild(subs);
        this.openForm();
    }
}


let SubsShotStudio: subsShotStudio = new subsShotStudio();