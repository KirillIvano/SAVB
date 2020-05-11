import {Component, Vue} from 'vue-property-decorator';

import {CommonButton} from '@/components/';

@Component({
    components: {
        CommonButton,
    },
    data() {
        return {
            messages: [],
        };
    },
})
export default class VkAuthValidatePage extends Vue {

}
