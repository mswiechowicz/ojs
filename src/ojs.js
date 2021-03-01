function o(element) {
    if (!(this instanceof o)) {
        return new o(element);
    }
    this.element = document.createElement(element);
    if (element === 'form') {
        this.element.addEventListener('submit', e => {
            e.preventDefault();
        });
    }
}

o.prototype.event = function(obj) {
    if (obj instanceof Array) {
        obj.forEach(event => this.element.addEventListener(
            event.name,
            event.fn,
        ));
    }else if (obj instanceof Object) {
        this.element.addEventListener(
            obj.name,
            obj.fn,
        );
    }
    return this;
};

o.prototype.click = function(cb) {
    this.element.addEventListener('click', cb);
    return this;
};

o.prototype.attr = function(attrs) {
    if (attrs instanceof Array) {
        attrs.forEach(attr => this.element.setAttribute(attr.name, attr.val));
    }else {
        this.element.setAttribute(attrs.name, attrs.val);
    }
    return this;
};

o.prototype.class = function(classNames) {
    if (typeof classNames === 'object') {
        classNames.forEach(className => this.element.classList.add(className));
    }else if (typeof classNames === 'string') {
        this.element.classList.add(classNames);
    }
    return this;
};

o.prototype.id = function(idName) {
    this.element.setAttribute('id', idName);
    return this;
};

o.prototype.add = function(children) {
    children.forEach(child => {
        try {
            this.element.appendChild(child);
        }catch (err) {
            // console.warn(err);
        }
    });
    return this;
};

o.prototype.text = function(text) {
    if (typeof(text) != 'undefined' && text != 'undefined') {
        this.element.textContent = text;
    }
    return this;
};

o.prototype.html = function(html) {
    if (typeof(html) != 'undefined' && html != 'undefined') {
        this.element.innerHTML = html;
    }
    return this;
};
o.prototype.translatedText = function(text, translatedFromKey) { //NOTE: IMPORTANT! works only with LibrariesTranslator class
    if (translatedFromKey === 'boolean') {
        const value = text == 0 ? 'NIE' : 'TAK';
        return this.text(value);
    }

    if (!translatedFromKey || typeof translatedFromKey !== 'string') {
        return this.text(text);
    }

    this.element.setAttribute('toTranslate', translatedFromKey);
    return this.text(text);
};

o.prototype.init = function() {
    return this.element;
};

o.prototype.push = function() {
    return this.element;
};

o.prototype.logger = function() {
    // console.log(this.element)
};

export default o;