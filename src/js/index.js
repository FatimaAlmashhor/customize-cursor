/**
 * Linear interpolation
 * @param {Number} a - first value to interpolate
 * @param {Number} b - second value to interpolate 
 * @param {Number} n - amount to interpolate
 */
const lerp = (a, b, n) => (1 - n) * a + n * b;


const elements = document.querySelectorAll('.link');
// const cursor = document.querySelector('.cursor')

// track the cursor postion
cursor_position = { x: 0, y: 0 }

window.addEventListener('mousemove', (e) => {
    cursor_position.x = e.clientX;
    cursor_position.y = e.clientY;
})

// this is the Cursor class


class Cursor {

    DOM = {
        el: null,
        inner: null
    }



    // render for all the need information
    render_info = {
        tx: { previous: 0, current: 0, amt: 0.2 },
        ty: { previous: 0, current: 0, amt: 0.2 },
        scale: { previous: 1, current: 1, amt: 0.2 },
        opacity: { previous: 1, current: 1, amt: 0.2 },
    }

    width = 0;
    height = 0;
    constructor(DOM) {
        this.DOM.el = DOM;
        this.DOM.inner = this.DOM.el.querySelector('.cursor__inner');

        this.width = this.DOM.el.getBoundingClientRect().width / 2;
        this.height = this.DOM.el.getBoundingClientRect().height / 2;


        // Check if any options passed in data attributes
        this.scaleOnEnter = this.DOM.el.dataset.scaleEnter || this.scaleOnEnter;
        this.opacityOnEnter = this.DOM.el.dataset.opacityEnter || this.opacityOnEnter;
        for (const key in this.render_info) {
            this.render_info[key].amt = this.DOM.el.dataset.amt || this.render_info[key].amt;
        }

        this.onMouseMove();

        elements.forEach(e => {
            e.addEventListener('mouseenter', (event) => {
                this.onMouseInter();
            })

            e.addEventListener('mouseleave', event => {
                this.onMouseLeave()

            })
        })
    }

    onMouseMove = () => {

        this.render_info.tx.previous = this.render_info.tx.current = cursor_position.x - this.width;
        this.render_info.ty.previous = this.render_info.ty.previous = cursor_position.y - this.height;

        requestAnimationFrame(() => this.render());

        window.removeEventListener('mousemove', this.onMouseMove);
    }

    onMouseInter = () => {
        this.render_info.scale.current = 3;
    }

    onMouseLeave = () => {
        this.render_info.scale.current = 1;
    }

    render = () => {

        this.render_info.tx.current = cursor_position.x - this.width;
        this.render_info.ty.current = cursor_position.y - this.height;

        for (const key in this.render_info) {
            this.render_info[key].previous = lerp(this.render_info[key].previous, this.render_info[key].current, this.render_info[key].amt);
        }

        this.DOM.el.style.display = 'block';
        this.DOM.el.style.transform = `translateX(${(this.render_info.tx.previous)}px) translateY(${this.render_info.ty.previous}px) scale(${this.render_info.scale.previous})`;
        // loop...
        requestAnimationFrame(() => this.render());
    }

}

const cursers = document.querySelectorAll('.cursor');
cursers.forEach(c => {
    new Cursor(c);
})
