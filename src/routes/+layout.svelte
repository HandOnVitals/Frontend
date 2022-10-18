<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { LOGIN_ROUTE } from 'constants/routes';
	import { tokenRefreshStore } from 'stores';
	import '../app.css';
	tokenRefreshStore.subscribe((storeVal) => {
		if (storeVal == null && $page.routeId != 'login') {
			goto(LOGIN_ROUTE);
		}
	});
</script>

<slot />
