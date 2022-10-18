<script lang="ts">
	function otpHandler(node: HTMLElement) {
		const digitRegex = /^[0-9]$/;
		const elements = node.children;
		const handleChildInput = (event: Event) => {
			const ev = event as KeyboardEvent;
			const target = ev.target as HTMLInputElement;
			const inputKey = ev.key;
			if (inputKey === 'Backspace') {
				(target.previousElementSibling as HTMLElement)?.focus();
			} else if (digitRegex.test(inputKey)) {
				if (target.value !== inputKey) target.value = inputKey;
				(target.nextElementSibling as HTMLElement)?.focus();
			} else if (inputKey === 'ArrowLeft') {
				(target.previousElementSibling as HTMLElement)?.focus();
			} else if (inputKey === 'ArrowRight') {
				(target.nextElementSibling as HTMLElement)?.focus();
			}
		};

		for (let i = 0; i < elements.length; i++) {
			elements[i].addEventListener('keyup', handleChildInput);
		}

		return {
			destroy() {
				for (let i = 0; i < elements.length; i++) {
					elements[i].removeEventListener('keyup', handleChildInput);
				}
			}
		};
	}
</script>

<div id="otp" use:otpHandler class="flex flex-row justify-center text-center">
	<!-- svelte-ignore a11y-autofocus -->
	<input autofocus id="otp-1" name="otp1" class="m-2 h-10 w-10 rounded border border-gray-300 text-center" type="number" min="0" max="9" />
	<input id="otp-2" name="otp2" class="m-2 h-10 w-10 rounded border border-gray-300 text-center" type="number" min="0" max="9" />
	<input id="otp-3" name="otp3" class="m-2 h-10 w-10 rounded border border-gray-300 text-center" type="number" min="0" max="9" />
	<input id="otp-4" name="otp4" class="m-2 h-10 w-10 rounded border border-gray-300 text-center" type="number" min="0" max="9" />
	<input id="otp-5" name="otp5" class="m-2 h-10 w-10 rounded border border-gray-300 text-center" type="number" min="0" max="9" />
	<input id="otp-6" name="otp6" class="m-2 h-10 w-10 rounded border border-gray-300 text-center" type="number" min="0" max="9" />
</div>
