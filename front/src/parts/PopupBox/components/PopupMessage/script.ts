import {Vue, Component, Prop} from 'vue-property-decorator';

import successImg from './images/success.png';
import errorImg from './images/error.png';

@Component
export default class PopupMessage extends Vue {
    @Prop() content: string;
    @Prop() type: 'error' | 'success';

    iconSrc: string = this.type === 'error' ? errorImg : successImg;
}
