import o from "../ojs.js";

//TODO: add subType feature
class Input {
    constructor(configObj) {

        this.defaultConfig = {
            label: '',
            type: 'text',
            placeholder: '',
            required: true,
            index: false,
            attributes: [],
            event: [
                {
                    name: 'change',
                    fn: e => {
                        let val = e.target.value.trim();
                        if (this.db[this.name] instanceof Array) {
                            return this.db[e.target.name][this.index] = val;
                        }else {
                            return this.db[e.target.name] = val;
                        }
                    }
                },
                {
                    name: 'keyup',
                    fn: e => {
                        if (!this.spanValidInfo.classList.contains('hidden') && this.spanLabel.classList.contains('hidden')){
                            this.spanValidInfo.classList.add('hidden');
                            this.spanLabel.classList.remove('hidden');
                        }
                    }
                },
                {
                    name: 'focusin',
                    fn: e => {
                        e.target.value = e.target.value.trim();
                        e.target.select();
                    }
                },
                {
                    name: 'focusout',
                    fn: e => {
                        if (!this.input.validity.valid) {
                            this.input.classList.add('input--invalid');
                        }else {
                            this.input.classList.remove('input--invalid');
                        }
                        if (e.target.value.trim().length > 0) {
                            return e.target.value = e.target.value.trim();
                        }
                    }
                }
            ]
        };
        if (configObj.event) {
            this.configObj = {
                ...this.defaultConfig,
                ...{
                    ...configObj,
                    event: [ ...configObj.event, ...this.defaultConfig.event ]
                }
            };
        }else {
            this.configObj = {
                ...this.defaultConfig,
                ...configObj
            };
        }

        this.labels = {
            color:      'Pole wyboru kolorów',
            date:       'Pole data',
            email:      'Pole adres e-mail',
            month:	    'Pole data (miesiąc)',
            number:	    'Pole typu numer',
            password:   'Pole typu hasło',
            tel:        'Pole numer telefonu',
            text:       'Pole typu tekst',
            time:       'Pole typu czas',
            url:	    'Pole adres URL',
        }


        this.db = this.configObj.db;
        this.unit = '';
        this.index = this.configObj.index;
        this.idDOM = this.index === false ? `${this.name}--input` : `${this.name}_${this.index}--input`;
        this.label = this.configObj.label;
        this.type = this.configObj.type;
        this.name = this.configObj.name;
        this.placeholder = this.configObj.placeholder;
        this.required = this.configObj.required;
        this.event = this.configObj.event;


        this.createNodes();
        this.attrAppender();
        this.setStore();
    }

    createNodes(){
        this.inputBox = o('div');
        this.pLabel = o('p');
        this.spanLabel = o('span');
        this.spanValidInfo = o('span');
        this.input = o('input');
        this.labelEl = o('label');
    }

    attrAppender() {
        this.inputBox.class('input');
        this.pLabel.text(this.configObj.label);
        this.spanLabel.text(this.labels[this.type]);
        this.spanValidInfo
            .text(this.configObj.customValidInfo ? this.configObj.customValidInfo : 'Niepoprawne dane')
            .class([ 'text-warning', 'hidden' ]);
        this.input
            .id(this.idDOM)
            .class('input__field')
            .event(this.event);
        this.labelEl
            .for(this.idDOM)
            .class('input__label')
            .attr([
                {
                    name: 'type',
                    val : this.type
                },
                {
                    name: 'name',
                    val : this.name
                },
                {
                    name: 'placeholder',
                    val : this.placeholder
                },
            ]);

        if (this.required) {
            this.input.setAttribute('required', this.required);
        }
        if (this.configObj.attributes.length) {
            this.input.attr(this.configObj.attributes);
        }
    }

    setStore(){
        if (typeof(this.db[this.name]) == 'number') {
            this.db[this.name] = String(this.db[this.name]);
        }

        if (this.db && this.db[this.name] && this.db[this.name].length > 0){
            if (this.db[this.name] instanceof Array){
                var val = this.index ? this.db[this.name][this.index].trim() : '';
            }else{
                var val = this.db[this.name].trim();
            }

            this.input.value = val;
        }
    }


    enabled() {
        this.input.removeAttribute('disabled');
        return this;
    }

    disabled(clearValue = false) {
        this.input.setAttribute('disabled', true);
        if (clearValue) {
            this.input.value = '';
            this.db[this.name] = '';
        }
        return this;
    }

    init(){
        return this.inputBox.add([
            this.labelEl.add([
                this.pLabel.init(),
                this.spanLabel.init(),
                this.spanValidInfo.init()
            ]).init(),
            this.input.init()
        ]).init();
    }

    setValue(newValue) {
        this.input.value = newValue;
        this.input.dispatchEvent(new Event('change'));
        this.input.dispatchEvent(new Event('focusout'));
    }
}
export default Input;
