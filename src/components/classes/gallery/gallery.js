import { gsap } from 'gsap';
import { GalleryItem } from './galleryItem';

export class Gallery {
    constructor(el, images) {
        // el is the gallery element (<nav>)
        this.DOM = {el: el};
        // the gallery item elements (<a>)
        this.DOM.GalleryItems = this.DOM.el.querySelectorAll('.gallery__item');
        // gallery item properties that will animate as we move the mouse around the gallery
        // we will be using interpolation to achieve smooth animations. 
        // the “previous” and “current” values are the values to interpolate. 
        // the value applied to the element, this case the image element (this.DOM.reveal) will be a value between these two values at a specific increment. 
        // the amt is the amount to interpolate.
        this.animatableProperties = {
            // translationX
            tx: {previous: 0, current: 0, amt: 0.15},
            // translationY
            ty: {previous: 0, current: 0, amt: 0.15},
            // Rotation angle
            rotation: {previous: 0, current: 0, amt: 0.15},
            // CSS filter (brightness) value
            brightness: {previous: 1, current: 1, amt: 0.06}
        };
        // array of GalleryItem instances
        this.GalleryItems = [];
        // initialize the GalleryItems
        [...this.DOM.GalleryItems].forEach((item, pos) => this.GalleryItems.push(new GalleryItem(item, pos, this.animatableProperties, images)));
        // show the gallery items (initial animation where each gallery item gets revealed)
        this.showGalleryItems();
    }
    // initial animation for revealing the gallery items
    showGalleryItems() {
        const innerTexts = this.GalleryItems.map(item => item.DOM.textInner);

        gsap.timeline()
        .set(innerTexts, {x: '20%', opacity: 0})
        .to(innerTexts, {
            duration: 1,
            ease: 'power3',
            x: '0%',
            stagger: 0.05
        })
        .to(innerTexts, {
            duration: 0.4,
            ease: 'power1',
            opacity: 1,
            stagger: 0.05
        }, 0);
    }
}