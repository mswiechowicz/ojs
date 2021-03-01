// import accountNumberFormat from '../methods/accountNumberFormat';
// import moneyNumberFormat from '../methods/moneyNumberFormat';
// import removeLetters from '../methods/removeLetters';
// import clearNumber from '../methods/clearNumber';
// import {BANKstandarize}from '../methods/BANKvalidation';
// import *as NIP from '../methods/NIPvalidation';
// import *as PESEL from '../methods/PESELvalidation';
// import *as REGON from '../methods/REGONvalidation';
// import *as KRS from '../methods/KRSvalidation';
// import Validator from '../methods/Validator';
class Input {
    constructor(configObj, root) {

        this.defaultConfig = {
            label: '',
            label_small: '',
            type: 'text',
            subType: 'text', //text | number | PLN | EUR | percent | bank |kelender | file
            placeholder: '',
            raw: false,
            required: true,
            index: false,
            validation: false,
            attributes: [],
            event: [
                {
                    name: 'change',
                    fn: e => {
                        let val = e.target.value.trim();
                        if (this.subType === 'PLN' || this.subType === 'EUR') {
                            val = val.replace(/ /g, '');
                        }
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
                        if (this.db[this.name] instanceof Array) {
                            this.db[e.target.name][this.index] = e.target.value.replace(` ${this.unit}`, '').trim();
                        }else {
                            this.db[e.target.name] = e.target.value.replace(`${this.unit}`, '').trim();

                        }
                    }
                },
                {
                    name: 'focusin',
                    fn: e => {
                        e.target.value = this.unit != ''
                            ? e.target.value.replace(` ${this.unit}`, '').trim()
                            : e.target.value.trim();
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
                        if (this.validation) {
                            if (!this.validation(e.target.value)) {
                                this.input.classList.add('input--invalid');
                                this.spanValidInfo.classList.remove('hidden');
                                this.spanLabel.classList.add('hidden');
                            }else {
                                this.input.classList.remove('input--invalid');
                            }
                        }

                        if (e.target.value.trim().length > 0) {
                            return e.target.value = this.unit != ''
                                ? `${e.target.value.trim()} ${this.unit}`
                                : e.target.value.trim();
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
            text: 'pole tekstowe',
            number: 'pole numeryczne',
            PLN: 'pole pieniężne PLN',
            EUR: 'pole pieniężne EUR',
            percent: 'pole procentowe',
            bank: 'pole numeryczne - konto bankowe',
            date: 'pole pełna data',
            file: 'pole wysyłania pliku',
            NIP: 'pole numer NIP',
            PESEL: 'pole numer PESEL',
            REGON: 'pole numer REGON',
            KRS: 'pole numer KRS',
            email: 'pole adres email',
            password: 'pole hasło',
            citycode: 'pole kod pocztowy',
            phone: 'pole nr telefonu'
        };

        this.db = this.configObj.db;
        this.root = root;
        this.unit = '';
        this.index = this.configObj.index;
        this.label = this.configObj.label;
        this.label_small = this.configObj.label_small;
        this.type = this.configObj.type;
        this.subType = this.configObj.subType;
        this.name = this.configObj.name;
        this.placeholder = this.configObj.placeholder;
        this.required = this.configObj.required;
        this.event = this.configObj.event;
        this.inputBox = document.createElement('div');
        this.inputBox.classList.add('input');
        this.labelEl = document.createElement('label');
        this.pLabel = document.createElement('p');
        this.spanLabel = document.createElement('span');
        this.spanValidInfo = document.createElement('span');
        this.input = document.createElement('input');
        this.previousValue = this.db[this.name];

        // //NOTE: input[type=file] file holder
        // this.removeFile = new Button({
        // 	name: 'usuń',
        // 	type: 'link_destructive',
        // 	size: 'small'
        // });
        // this.inputFileHolder = o('div').class([ 'input__file-holder', 'flex_row', 'center_vertical' ]).add([
        // 	o('h3').id(`${this.configObj.name}_holder`).init(),
        // 	this.removeFile.init()
        // ]).init();
        this.attrAppender();
        this.init();
    }

    attrAppender() {
        this.pLabel.textContent = this.label;
        this.spanLabel.textContent = this.labels[this.subType];
        this.spanValidInfo.classList.add('text-warning');
        this.spanValidInfo.classList.add('hidden');
        this.spanValidInfo.innerText = 'Niepoprawne dane';
        var div = document.createElement('div');
        div.classList.add('input__label');
        div.appendChild(this.pLabel);
        div.appendChild(this.spanLabel);
        div.appendChild(this.spanValidInfo);
        this.labelEl.appendChild(div);
        this.input.classList.add('input__field');
        // console.log('input index....', this.index)
        if (this.index !== false) {
            this.input.setAttribute('id', `${this.name}_${this.index}`);
            this.labelEl.setAttribute('for', `${this.name}_${this.index}`);
        }else {
            this.input.setAttribute('id', this.name);
            this.labelEl.setAttribute('for', this.name);
        }
        this.input.setAttribute('type', this.type);
        this.input.setAttribute('name', this.name);
        this.input.setAttribute('placeholder', this.placeholder);
        if (this.required) {
            this.input.setAttribute('required', this.required);
        }
        if (this.event instanceof Array) {
            if (this.type == 'file') {
                this.event = this.event.filter(el => {
                    return (
                        el.name != 'keyup'
                        && el.name != 'focusin'
                        && el.name != 'focusout'
                    );
                });
            }
            if (this.type == 'file') {
                //  console.log(this.defaultConfig, configObj, this.configObj)
            }
            this.event.forEach(event => this.input.addEventListener(event.name, event.fn));
        }else {
            this.input.addEventListener(this.event.name, this.event.fn);
        }

        if (!this.configObj.raw) {
            this.inputBox.appendChild(this.labelEl);
        }else {
            this.inputBox.classList.add('input--raw');
        }

        this.inputBox.appendChild(this.input);

        if (this.configObj.attributes.length) {
            this.configObj.attributes.forEach(attr=> {
                this.input.setAttribute(attr.name, attr.val);
            });
        }

        switch (this.subType) {
            case 'text' :
                this.unit = '';
                this.input.setAttribute('placeholder', '');
                break;

            case 'number':
                this.unit = '';
                this.input.setAttribute('placeholder', '0');
                this.input.addEventListener('keyup', function(e) {
                    this.input.value = removeLetters(e.target.value);
                }.bind(this));
                break;

            case 'PLN':
                this.unit = this.subType;
                this.input.setAttribute('placeholder', '0,00 PLN');
                this.input.addEventListener('keyup', function(e) {
                    this.input.value = removeLetters(e.target.value);
                    this.input.value = moneyNumberFormat(e.target.value);
                }.bind(this));
                break;

            case 'EUR':
                this.unit = this.subType;
                this.input.setAttribute('placeholder', '0,00 EUR');
                this.input.addEventListener('keyup', function(e) {
                    this.input.value = removeLetters(e.target.value);
                    this.input.value = moneyNumberFormat(e.target.value);
                }.bind(this));
                break;

            case 'percent':
                this.unit = '%';
                this.input.setAttribute('placeholder', '0 %');
                this.input.addEventListener('keyup', function(e) {
                    let valueWithoutLetters = removeLetters(e.target.value);
                    this.input.value = valueWithoutLetters.replace('.', ',');
                }.bind(this));
                break;

            case 'bank':
                this.unit = '';
                this.input.setAttribute('placeholder', '00 0000 0000 0000 0000 0000 0000');
                this.input.addEventListener('keyup', function(e) {
                    // this.input.value = accountNumberFormat(e.target.value);
                    this.input.value = BANKstandarize(e.target.value);
                }.bind(this));
                break;

            case 'date':
                this.unit = '';
                // this.input.setAttribute('placeholder', 'DD-MM-YYYY');
                break;

            case 'file':
                this.unit = '';
                break;

            case 'NIP':
                this.unit = '';
                this.validation = NIP.NIPvalidation;
                this.input.addEventListener('keyup', function(e) {
                    this.input.value = NIP.NIPstandarize(e.target.value);
                }.bind(this));
                this.input.setAttribute('placeholder', '_ _ _ _ _ _ _ _ _');
                break;

            case 'PESEL':
                this.unit = '';
                this.validation = PESEL.PESELvalidation;
                this.input.addEventListener('keyup', function(e) {
                    this.input.value = PESEL.PESELstandarize(e.target.value);
                }.bind(this));
                this.input.setAttribute('placeholder', '_ _ _ _ _ _ _ _ _ _ _');
                Validator.add({
                    DOMInstance: this.input,
                    validateBy: [ 'NIP' ]
                });
                break;

            case 'REGON':
                this.unit = '';
                this.validation = REGON.REGONvalidation;
                this.input.addEventListener('keyup', function(e) {
                    this.input.value = REGON.REGONstandarize(e.target.value);
                }.bind(this));
                this.input.setAttribute('placeholder', '_____');
                break;

            case 'KRS':
                this.unit = '';
                this.validation = KRS.KRSvalidation;
                this.input.addEventListener('keyup', function(e) {
                    this.input.value = KRS.KRSstandarize(e.target.value);
                }.bind(this));
                this.input.setAttribute('placeholder', '_____');
                break;

            case 'citycode':
                this.unit = '';
                this.input.setAttribute('placeholder', '_ _ - _ _ _');
                break;
        }

        if (typeof(this.db[this.name]) == 'number') {
            this.db[this.name] = String(this.db[this.name]);
        }
        if (this.db && this.db[this.name] && this.db[this.name].length > 0) {
            if (this.db[this.name] instanceof Array) {
                var val = this.unit !== '' ? `${this.db[this.name][this.index].trim()} ${this.unit}` : (this.index ? this.db[this.name][this.index].trim() : '');
            }else {
                var val = this.unit !== '' ? `${this.db[this.name].trim()} ${this.unit}` : this.db[this.name].trim();
            }
            if (this.subType == 'PLN') {
                this.input.value = `${moneyNumberFormat(removeLetters(val))} ${this.unit}`;
            }else if (this.subType == 'percent') {
                let valueWithoutLetters = removeLetters(val);
                this.input.value = `${valueWithoutLetters.replace('.', ',')} ${this.unit}`;
            }else if (this.subType == 'text') {
                this.input.value = val;
            }else {
                this.input.value = clearNumber(val);
            }

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

    init() {
        // TODO przy każdym inicie aktualizacja wartości
        if (this.root) {
            this.root.appendChild(this.inputBox);
        }else {
            return this.inputBox;
        }
    }
    setValue(newValue) {
        this.input.value = newValue;
        this.input.dispatchEvent(new Event('change'));
        this.input.dispatchEvent(new Event('focusout'));
    }
    setLabel(newLabel){
        this.pLabel.innerText = newLabel;
        return this;
    }
}


export default Input;
