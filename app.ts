interface moveValues {
    clicking: boolean;
    moving: boolean;
    targetX: number;
    targetY: number;
    downEventX: number;
    downEventY: number;
}

let styleData = {
    subsFontSize: "65px",
    subsLetterSpacing: "1px",
    subsBackgroundColor: "rgba(66,66,66,.6)",
    subsPaddingVertical: "10px",
    subsPaddingHorizontal: "20px",
};

let styleSheet: string = `@keyframes init{0%{width:200px;color:black}40%{width:200px;color:black}80%{width:50px;color:transparent}100%{width:50px;color:black}}.transparent-elm{opacity:0}#subs-shot-studio *{box-sizing:border-box;z-index:99999}#subs-shot-studio #subs-shot-studio-toggle{position:fixed;top:0;left:0;height:50px;font-size:25px;line-height:45px;text-align:center;overflow-x:hidden;animation:init 1.2s ease-in-out forwards;transition:opacity .5s;border:thin solid black;background:silver;border-radius:10px}#subs-shot-studio #subs-shot-studio-toggle:hover{opacity:1}#subs-shot-studio #subs-shot-studio-form-mother{background-color:rgba(66,66,66,.5);position:fixed;padding:30px 50px;border:thin solid black;width:600px;margin-left:auto;margin-right:auto;top:35%;left:0;right:0}#subs-shot-studio #subs-shot-studio-form-mother #subs-shot-studio-form #subs-shot-studio-form-setting{margin-bottom:20px}#subs-shot-studio #subs-shot-studio-form-mother #subs-shot-studio-form #subs-shot-studio-form-setting #subs-shot-studio-form-font{height:60px;width:400px;line-height:20px;font-size:20px}#subs-shot-studio #subs-shot-studio-form-mother #subs-shot-studio-form #subs-shot-studio-form-setting #subs-shot-studio-form-color{height:60px;width:80px}#subs-shot-studio #subs-shot-studio-form-mother #subs-shot-studio-form #subs-shot-studio-form-subs{height:90px;width:500px;line-height:16px;font-size:16px;display:block}#subs-shot-studio #subs-shot-studio-form-mother #subs-shot-studio-form #subs-shot-studio-form-operate{margin-top:20px;width:500px}#subs-shot-studio #subs-shot-studio-form-mother #subs-shot-studio-form #subs-shot-studio-form-close{position:absolute;top:0;right:0;height:30px}#subs-shot-studio #subs-shot-studio-subs{position:fixed;background-color:${styleData.subsBackgroundColor};top:80%;left:50%;padding:${styleData.subsPaddingVertical} ${styleData.subsPaddingHorizontal};transform:translateX(-50%);word-break:keep-all;white-space:nowrap}#subs-shot-studio #subs-shot-studio-subs #subs-shot-studio-subs-text{font-size:${styleData.subsFontSize};letter-spacing:${styleData.subsLetterSpacing}}`;

class subsShotStudio {
    subsShotStudio: HTMLDivElement;
    togglerElm: HTMLDivElement;
    formMotherElm: HTMLDivElement;
    closeButtonElm: HTMLInputElement;
    formElm: HTMLFormElement;
    fontInputElm: HTMLInputElement;
    bgInputElm: HTMLInputElement;
    colorInputElm: HTMLInputElement;
    subsInputElm: HTMLTextAreaElement;

    moveTogglerValues: moveValues;

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

        formToggleElm.textContent = "SubsShotStudio";

        formToggleElm.draggable = true;

        this.fontInputElm = settingElm.appendChild(fontInput);
        this.colorInputElm = settingElm.appendChild(colorInput);
        form.appendChild(settingElm);
        this.subsInputElm = form.appendChild(subsInput);
        form.appendChild(operateButton);
        this.closeButtonElm = form.appendChild(closeButton);
        //settingElm.appendChild(bgInput);
        this.formElm = formMother.appendChild(form);
        this.formMotherElm = subsShotStudioElm.appendChild(formMother);
        this.togglerElm = subsShotStudioElm.appendChild(formToggleElm);

        this.subsShotStudio = document.querySelector("body").appendChild(subsShotStudioElm);

        this.subsShotStudio.style.setProperty("display", "unset", "important");
        this.formMotherElm.style.display = "none";

        this.moveTogglerValues = {
            clicking: false,
            moving: false,
            targetX: 0,
            targetY: 0,
            downEventX: 0,
            downEventY: 0,
        };

        this.togglerElm.addEventListener("mousedown", (event: MouseEvent) => {
            this.moveTogglerValues.clicking = true;
            this.saveTogglerCoordinate(event);
        });
        document.querySelector("body").addEventListener("mousemove", (event: MouseEvent) => {
            if (this.moveTogglerValues.clicking) {
                this.moveTogglerValues.moving = true;
                this.moveToggler(event);
            }
        });
        document.querySelector("body").addEventListener("mouseup", (event: MouseEvent) => {
            if (this.moveTogglerValues.clicking) {
                this.confirmTogglerCoordinate(event);
            }
            if (!this.moveTogglerValues.moving) {
                this.toggleForm();
            }
            this.moveTogglerValues.clicking = false;
            this.moveTogglerValues.moving = false;
        });
        /*
        formToggleElm.addEventListener("dragexit", () => {
            this.resetTogglerCoordinate();
        });
        */
        closeButton.addEventListener("click", () => {
            this.closeForm();
        });

        operateButton.addEventListener("click", () => {
            this.createSubs();
        });

        setTimeout(() => {
            this.togglerElm.textContent = "S";
            setTimeout(() => {
                this.togglerElm.classList.add("transparent-elm")
            }, 240)
        }, 960)
    }

    toggleForm() {
        if (!this.moveTogglerValues.moving) {
            if (this.formMotherElm.style.display === "none") {
                this.openForm();
            } else {
                this.closeForm();
            }
        }
    }

    closeForm() {
        this.formMotherElm.style.display = "none";
    }

    openForm() {
        this.formMotherElm.style.display = null;
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

    saveTogglerCoordinate(event: MouseEvent) {
        // @ts-ignore
        this.moveTogglerValues.targetX = event.target.getBoundingClientRect().left;
        // @ts-ignore
        this.moveTogglerValues.targetY = event.target.getBoundingClientRect().top;
        this.moveTogglerValues.downEventX = event.clientX;
        this.moveTogglerValues.downEventY = event.clientY;
        console.log(this.moveTogglerValues);
    }

    moveToggler(event: MouseEvent) {
        this.togglerElm.style.transform = `translate(${event.clientX - this.moveTogglerValues.downEventX}px,${event.clientY - this.moveTogglerValues.downEventY}px)`;
    }

    confirmTogglerCoordinate(event: MouseEvent) {
        let left = this.moveTogglerValues.targetX + (event.clientX - this.moveTogglerValues.downEventX);
        let top = this.moveTogglerValues.targetY + (event.clientY - this.moveTogglerValues.downEventY);

        this.togglerElm.style.transform = null;

        if (left < 0) {
            this.togglerElm.style.left = "0";
        } else {
            this.togglerElm.style.left = `${left}px`;
        }
        if (top < 0) {
            this.togglerElm.style.top = "0";
        } else {
            this.togglerElm.style.top = `${top}px`;
        }
        this.resetTogglerTransform();
    }

    resetTogglerCoordinate() {
        this.togglerElm.style.left = "0";
        this.togglerElm.style.top = "0";
    }

    resetTogglerTransform() {
        this.togglerElm.style.transform = null;
    }
}

let SubsShotStudio: subsShotStudio = new subsShotStudio();