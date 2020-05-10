import {Vue, Component, Prop} from 'vue-property-decorator';
import {Getter} from 'vuex-class';

import {PopupMessageType} from '@/entities/popupMessage/types';
import {PopupMessage} from './components';

@Component({
    components: {PopupMessage},
})
export default class PopupBox extends Vue{
    @Getter('getMessages')
    messages: PopupMessageType[];

}

