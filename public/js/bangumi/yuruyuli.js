import {annotate, annotationGroup} from "rough-notation";

const e1 = document.querySelector('#text1');
const e2 = document.querySelector('#text2');
const a1 = annotate(e1, {type: 'crossed-off', color: '#e37cf1',animate: false});
const a2 = annotate(e2, {type: 'highlight', color: 'rgba(235,181,243,0.86)',animate: false});
annotationGroup([a1, a2]).show();