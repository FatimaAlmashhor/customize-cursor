/**
 * Linear interpolation
 * @param {Number} a - first value to interpolate
 * @param {Number} b - second value to interpolate 
 * @param {Number} n - amount to interpolate
 */ const lerp = (a, b, n)=>(1 - n) * a + n * b;
const elements = document.querySelectorAll(".link");
// const cursor = document.querySelector('.cursor')
// track the cursor postion
// const cursor_position = { x: 0, y: 0 }
// // render for all the need information
// const render_info = {
//     tx: { previous: 0, current: 0, amt: 0.2 },
//     ty: { previous: 0, current: 0, amt: 0.2 },
//     scale: { previous: 1, current: 1, amt: 0.2 },
//     opacity: { previous: 1, current: 1, amt: 0.2 },
// }
// const onMouseMove = () => {
//     const width = cursor.getBoundingClientRect().width / 2;
//     const height = cursor.getBoundingClientRect().height / 2;
//     render_info.tx.current = cursor_position.x - width;
//     render_info.ty.current = cursor_position.y - height;
//     requestAnimationFrame(() => render());
//     window.removeEventListener('mousemove', onMouseMove);
// }
// const onMouseInter = () => {
//     render_info.scale.current = 2;
// }
// const onMouseLeave = () => {
//     render_info.scale.current = 1;
// }
// const render = () => {
//     render_info.tx.previous = lerp(render_info.tx.previous, render_info.tx.current, render_info.tx.amt);
//     render_info.ty.previous = lerp(render_info.ty.previous, render_info.ty.current, render_info.ty.amt);
//     render_info.scale.previous = lerp(render_info.scale.previous, render_info.scale.current, render_info.scale.amt);
//     cursor.style.display = 'block';
//     cursor.style.transform = `translateX(${(render_info.tx.previous)}px) translateY(${render_info.ty.previous}px) scale(${render_info.scale.previous})`;
//     // loop...
//     requestAnimationFrame(() => render());
// }
// window.addEventListener('mousemove', (e) => {
//     cursor_position.x = e.clientX;
//     cursor_position.y = e.clientY;
//     onMouseMove();
// })
// elements.forEach(e => {
//     e.addEventListener('mouseenter', (event) => {
//         onMouseInter();
//         console.log('mouse inter');
//     })
//     e.addEventListener('mouseleave', event => {
//         onMouseLeave()
//         console.log('mouse leave');
//     })
// })
// this is the Cursor class
class Cursor {
    DOM = {
        el: null,
        inner: null
    };
    // track the cursor postion
    cursor_position = {
        x: 0,
        y: 0
    };
    // render for all the need information
    render_info = {
        tx: {
            previous: 0,
            current: 0,
            amt: 0.2
        },
        ty: {
            previous: 0,
            current: 0,
            amt: 0.2
        },
        scale: {
            previous: 1,
            current: 1,
            amt: 0.2
        },
        opacity: {
            previous: 1,
            current: 1,
            amt: 0.2
        }
    };
    constructor(DOM){
        this.DOM.el = DOM;
        this.DOM.inner = this.DOM.el.querySelector(".cursor__inner");
        window.addEventListener("mousemove", (e)=>{
            this.cursor_position.x = e.clientX;
            this.cursor_position.y = e.clientY;
            this.onMouseMove();
        });
        elements.forEach((e)=>{
            e.addEventListener("mouseenter", (event)=>{
                this.onMouseInter();
            });
            e.addEventListener("mouseleave", (event)=>{
                this.onMouseLeave();
            });
        });
    }
    onMouseMove = ()=>{
        const width = this.DOM.el.getBoundingClientRect().width / 2;
        const height = this.DOM.el.getBoundingClientRect().height / 2;
        this.render_info.tx.current = this.cursor_position.x - width;
        this.render_info.ty.current = this.cursor_position.y - height;
        requestAnimationFrame(()=>this.render());
        window.removeEventListener("mousemove", this.onMouseMove);
    };
    onMouseInter = ()=>{
        this.render_info.scale.current = 2;
    };
    onMouseLeave = ()=>{
        this.render_info.scale.current = 1;
    };
    render = ()=>{
        for(const key in this.render_info)this.render_info[key].previous = lerp(this.render_info[key].previous, this.render_info[key].current, this.render_info[key].amt);
        this.DOM.el.style.display = "block";
        this.DOM.el.style.transform = `translateX(${this.render_info.tx.previous}px) translateY(${this.render_info.ty.previous}px) scale(${this.render_info.scale.previous})`;
        // loop...
        requestAnimationFrame(()=>this.render());
    };
}
new Cursor(document.querySelector(".cursor"));

//# sourceMappingURL=index.de5c0784.js.map
