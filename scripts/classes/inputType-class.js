class InputType {
    constructor(type, extraInformation) {
        this.type = type;
        this.extraInformation = extraInformation;
    }
    getInputElement() {
        console.log(this.type);
        let inputElement = new Array(0);
        /*/if (this.type == "radio") {
            for (let i = 0; i < this.extraInformation.options.length; i++) {
                let option = document.createElement("input");
                option.type = this.type;
                option.id = this.extraInformation.name;
                option.name = this.extraInformation.name;
                //option.value = extraInformation.options[i];
                inputElement.push(option);
            }
        }*/
        switch (this.type) {
            case "text":
                let textBox = document.createElement("input");
                textBox.class = this.extraInformation.class;
                textBox.type = this.type;
                textBox.width = this.extraInformation.width;
                textBox.name = this.extraInformation.name;
                textBox.id = this.extraInformation.name;
                inputElement.push(textBox);
                break;

            case "radio":
                let infoLength = this.extraInformation.options.length;
                for (let i = 0; i < infoLength; i++) {
                    let option = document.createElement("input");
                    option.type = this.type;
                    option.id = this.extraInformation.name;
                    option.name = this.extraInformation.name;
                    //option.value = extraInformation.options[i];
                    inputElement.push(option);
                }
                break;

            case "textarea":
                let textArea = document.createElement("textarea");
                textArea.class = this.extraInformation.class;
                textArea.name = this.extraInformation.name;
                textArea.rows = this.extraInformation.rows;
                textArea.cols = this.extraInformation.cols;
                inputElement.push(textArea);
                break;
        }

        return inputElement;
    }
    getInputID() {
        return extraInformation.name;
    }
}