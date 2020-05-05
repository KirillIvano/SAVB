import {Component, Prop, Vue} from 'vue-property-decorator';

import {createVkUserToken} from '@/services/vkAuth';

@Component
export default class VkAuthValidatePage extends Vue {
    @Prop() redirectUri: string;
    @Prop() code: string;

    props=['code', 'redirectUri'];

    async mounted() {
        const {userId} = await createVkUserToken(this.code, this.redirectUri);
        localStorage.setItem('userId', String(userId));

        this.$router.push('/groups');
    }
}

