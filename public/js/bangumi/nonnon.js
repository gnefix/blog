import {annotate, annotationGroup} from "rough-notation";

export default function () {
    const e1 = document.querySelector('#text1');
   const e2 = document.querySelector('#text2');
    const a1 = annotate(e1, {type: 'underline', color: '#e37cf1',animate: false});
    const a2 = annotate(e2, {type: 'circle', color: 'rgba(235,181,243,0.86)',animate: false});
    const a3 = annotate(document.querySelector('#text3'), {type: 'highlight', color: 'rgba(255,218,230,0.86)',animate: false});

    annotationGroup([a1,a2,a3]).show();
}