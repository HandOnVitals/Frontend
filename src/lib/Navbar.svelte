<script>
	import { goto } from '$app/navigation';
	import { ACCESS_ROUTE, BASE_ROUTE, HEART_RATE_HISTORY_ROUTE, READING_ROUTE } from 'constants/routes';
	import { readingsStore } from 'stores';
</script>

<nav class="group fixed z-10 flex h-screen w-16 flex-col rounded-r-lg bg-white py-8 px-2 drop-shadow-md transition-all duration-300 ease-in-out hover:w-[20%]">
	<a class="nav-link" href={READING_ROUTE}>
		<svg class="h-8 w-8 shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M11 30C11 29.4477 11.4477 29 12 29H26C26.5523 29 27 29.4477 27 30C27 30.5523 26.5523 31 26 31H12C11.4477 31 11 30.5523 11 30Z" fill="#333333" />
			<path d="M12 34C11.4477 34 11 34.4477 11 35C11 35.5523 11.4477 36 12 36H26C26.5523 36 27 35.5523 27 35C27 34.4477 26.5523 34 26 34H12Z" fill="#333333" />
			<path d="M14 21V18H16V21H19V23H16V26H14V23H11V21H14Z" fill="#333333" />
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M15 6C13.3431 6 12 7.34315 12 9H9C7.34315 9 6 10.3431 6 12V39C6 40.6569 7.34315 42 9 42H29C30.6569 42 32 40.6569 32 39V12C32 10.3431 30.6569 9 29 9H26C26 7.34315 24.6569 6 23 6H15ZM23 12C23.5523 12 24 11.5523 24 11V9C24 8.44772 23.5523 8 23 8H15C14.4477 8 14 8.44772 14 9V11C14 11.5523 14.4477 12 15 12H23ZM12 11C12 12.6569 13.3431 14 15 14H23C24.6569 14 26 12.6569 26 11H29C29.5523 11 30 11.4477 30 12V39C30 39.5523 29.5523 40 29 40H9C8.44772 40 8 39.5523 8 39V12C8 11.4477 8.44772 11 9 11H12Z"
				fill="#333333" />
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M36 17C36 15.3431 37.3431 14 39 14C40.6569 14 42 15.3431 42 17V37.3028L39 41.8028L36 37.3028V17ZM39 16C38.4477 16 38 16.4477 38 17V19H40V17C40 16.4477 39.5523 16 39 16ZM39 38.1972L40 36.6972V21H38V36.6972L39 38.1972Z"
				fill="#333333" />
		</svg>
		<span class="nav-link-label">Leituras</span>
	</a>
	<a class="nav-link" href={HEART_RATE_HISTORY_ROUTE}>
		<svg class="h-8 w-8 shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M8 40V7H6V41C6 41.5523 6.44772 42 7 42H41V40H8Z" fill="#333333" />
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M39.7682 19.6402L29.7682 31.6402C29.5047 31.9564 29.0743 32.0788 28.6838 31.9487L17.3313 28.1645L7.76822 39.6402L6.23178 38.3598L16.2318 26.3598C16.4953 26.0436 16.9257 25.9211 17.3162 26.0513L28.6687 29.8355L38.2318 18.3598L39.7682 19.6402Z"
				fill="#333333" />
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M38.7682 10.6402L28.7682 22.6402C28.4984 22.964 28.0544 23.0838 27.6583 22.9398L17.2887 19.169L7.73994 29.6727L6.26006 28.3273L16.2601 17.3273C16.533 17.0271 16.9604 16.9215 17.3417 17.0602L27.6815 20.8201L37.2318 9.35982L38.7682 10.6402Z"
				fill="#333333" />
		</svg>
		<span class="nav-link-label">Histórico</span>
	</a>
	<a class="nav-link mt-auto" href={ACCESS_ROUTE}>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#333333" viewBox="0 0 24 24" stroke-width="1" class="h-8 w-8 shrink-0">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
		</svg>
		<span class="nav-link-label">Sair</span>
	</a>
</nav>
