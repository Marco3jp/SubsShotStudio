// ==UserScript==
// @name         SubsShotStudio
// @namespace    https://marco.plus
// @version      0.4.1
// @description  Do you want to make SubsShot for Lightning Talks?
// @author       Marco
// @match        *://www.youtube.com/*
// @match        *://www.nicovideo.jp/*
// @match        *://anime.dmkt-sp.jp/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    let styleData = {
        subsFontSize: "65px",
        subsLetterSpacing: "1px",
        subsBackgroundColor: "rgba(66,66,66,.6)",
        subsPaddingVertical: "10px",
        subsPaddingHorizontal: "20px",
    };
    let styleSheet = `@keyframes init{0%{width:200px;color:black}40%{width:200px;color:black}80%{width:50px;color:transparent}100%{width:50px;color:black}}.half-transparent-elm{opacity:.5}.transparent-elm{opacity:0}#subs-shot-studio *{box-sizing:border-box;z-index:99999}#subs-shot-studio #subs-shot-studio-toggle{position:fixed;top:0;left:0;height:50px;font-size:25px;line-height:45px;text-align:center;overflow-x:hidden;animation:init 1.2s ease-in-out forwards;transition:opacity .5s;border:thin solid black;background:silver;border-radius:10px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}#subs-shot-studio #subs-shot-studio-toggle:hover{opacity:1}#subs-shot-studio #subs-shot-studio-form-mother{background-color:rgba(66,66,66,.5);position:fixed;padding:30px 50px;border:thin solid black;width:600px;margin-left:auto;margin-right:auto;top:35%;left:0;right:0}#subs-shot-studio #subs-shot-studio-form-mother #subs-shot-studio-form #subs-shot-studio-form-setting{margin-bottom:20px}#subs-shot-studio #subs-shot-studio-form-mother #subs-shot-studio-form #subs-shot-studio-form-setting #subs-shot-studio-form-font{height:60px;width:400px;line-height:20px;font-size:20px}#subs-shot-studio #subs-shot-studio-form-mother #subs-shot-studio-form #subs-shot-studio-form-setting #subs-shot-studio-form-color{height:60px;width:80px}#subs-shot-studio #subs-shot-studio-form-mother #subs-shot-studio-form #subs-shot-studio-form-subs{height:90px;width:500px;line-height:16px;font-size:16px;display:block}#subs-shot-studio #subs-shot-studio-form-mother #subs-shot-studio-form #subs-shot-studio-form-operate{margin-top:20px;width:500px}#subs-shot-studio #subs-shot-studio-form-mother #subs-shot-studio-form #subs-shot-studio-form-close{position:absolute;top:0;right:0;height:30px}#subs-shot-studio #subs-shot-studio-subs{position:fixed;background-color:${styleData.subsBackgroundColor};top:80%;left:50%;padding:${styleData.subsPaddingVertical} ${styleData.subsPaddingHorizontal};transform:translateX(-50%);word-break:keep-all;white-space:nowrap}#subs-shot-studio #subs-shot-studio-subs #subs-shot-studio-subs-text{font-size:${styleData.subsFontSize};letter-spacing:${styleData.subsLetterSpacing}}`;

    class subsShotStudio {
        constructor() {
            let styleElm = document.createElement("style");
            styleElm.textContent = styleSheet;
            document.querySelector("head").appendChild(styleElm);
            let subsShotStudioElm = document.createElement("div");
            let formToggleElm = document.createElement("div");
            let formMother = document.createElement("div");
            let settingElm = document.createElement("div");
            let form = document.createElement("form");
            let fontInput = document.createElement("input");
            //let bgInput: HTMLInputElement = document.createElement("input");
            let colorInput = document.createElement("input");
            let subsInput = document.createElement("textarea");
            let operateButton = document.createElement("input");
            let closeButton = document.createElement("input");
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
            this.togglerElm.addEventListener("mousedown", (event) => {
                if (event.button === 0) {
                    this.moveTogglerValues.clicking = true;
                    this.saveTogglerCoordinate(event);
                }
            });
            this.togglerElm.addEventListener("contextmenu", (e) => {
                e.preventDefault();
            }, false);
            document.querySelector("body").addEventListener("mousemove", (event) => {
                if (this.moveTogglerValues.clicking) {
                    this.moveTogglerValues.moving = true;
                    this.moveToggler(event);
                }
            });
            document.querySelector("body").addEventListener("mouseup", (event) => {
                if (this.moveTogglerValues.clicking) {
                    this.confirmTogglerCoordinate(event);
                }
                else if (event.button === 2) {
                    this.togglerElm.classList.remove("half-transparent-elm");
                    this.togglerElm.classList.add("transparent-elm");
                    setTimeout(() => {
                        this.togglerElm.classList.remove("transparent-elm");
                        this.togglerElm.classList.add("half-transparent-elm");
                    }, 10000);
                }
                if (this.moveTogglerValues.clicking && !this.moveTogglerValues.moving) {
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
                    this.togglerElm.classList.add("half-transparent-elm");
                }, 240);
            }, 960);
        }

        toggleForm() {
            if (!this.moveTogglerValues.moving) {
                if (this.formMotherElm.style.display === "none") {
                    this.openForm();
                }
                else {
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
            subs.innerText = this.subsInputElm.value;
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

        saveTogglerCoordinate(event) {
            // @ts-ignore
            this.moveTogglerValues.targetX = event.target.getBoundingClientRect().left;
            // @ts-ignore
            this.moveTogglerValues.targetY = event.target.getBoundingClientRect().top;
            this.moveTogglerValues.downEventX = event.clientX;
            this.moveTogglerValues.downEventY = event.clientY;
            console.log(this.moveTogglerValues);
        }

        moveToggler(event) {
            this.togglerElm.style.transform = `translate(${event.clientX - this.moveTogglerValues.downEventX}px,${event.clientY - this.moveTogglerValues.downEventY}px)`;
        }

        confirmTogglerCoordinate(event) {
            let left = this.moveTogglerValues.targetX + (event.clientX - this.moveTogglerValues.downEventX);
            let top = this.moveTogglerValues.targetY + (event.clientY - this.moveTogglerValues.downEventY);
            this.togglerElm.style.transform = null;
            if (left < 0) {
                this.togglerElm.style.left = "0";
            }
            else {
                this.togglerElm.style.left = `${left}px`;
            }
            if (top < 0) {
                this.togglerElm.style.top = "0";
            }
            else {
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

    let SubsShotStudio = new subsShotStudio();
})();