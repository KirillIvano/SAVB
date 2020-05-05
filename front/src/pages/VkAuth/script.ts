import Vue from 'vue';

const getAuthPageUri = () => {
    const url: URL = new URL('https://oauth.vk.com/authorize');

    const redirectUrl = `${location.origin}/validateAuth`;

    url.searchParams.append('scope', '4523011');
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('display', 'popup');
    url.searchParams.append('redirect_uri', redirectUrl);
    url.searchParams.append('client_id', '7445853');
    url.searchParams.append('state', redirectUrl);

    return url.toString();
};

export default Vue.extend({
    methods: {
        vk() {
            window.open(getAuthPageUri());
        },
    },
});
