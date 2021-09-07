class DOMManipulator {
    constructor() {
    }
    setPadding(element, padding) {
        element.style.padding = padding;
    };
    setMargin(element, margin) {
        element.style.margin = margin;
    };
    setHeight(element, height) {
        element.style.height = height;
    };
    setWidth(element, width) {
        element.style.width = width;
    };
    getPosition(element) {
        let position = element.getBoundingClientRect();
        return {
            top: position.top,
            right: position.right,
            bottom: position.bottom,
            left: position.left
        };
    };
    setClicker(element, clickFunction) {
        element.addEventListener('click', clickFunction);
    };
}

const element = document.getElementById('task_1');
DOMManipulator.setHeight(element, navbarHeight);
