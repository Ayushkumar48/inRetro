<script lang="ts">
	import * as Chat from '$lib/components/ui/chat';
	import { Button } from '$lib/components/ui/button';
	import { Send, SparklesIcon } from '@lucide/svelte';
	import { Input } from '$lib/components/ui/input';
	import { marked } from 'marked';
	import DOMPurify from 'isomorphic-dompurify';
	import axios from 'axios';

	let { message = $bindable(), messages = $bindable(), messageCount = $bindable() } = $props();
	async function handleClick() {
		messages.push({ message, sender: 'user', messageId: messageCount });
		message = '';
		messageCount++;
		const response = await axios.post('/api/ask-ai', {
			message: messages[messages.length - 1].message
		});
		if (response.status === 200) {
			messages.push({
				message: response.data,
				sender: 'ai',
				messageId: messageCount
			});
			messageCount++;
		} else {
			messages.push({
				message: 'Error while fetching the response',
				sender: 'ai',
				messageId: messageCount
			});
			messageCount++;
		}
	}
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleClick();
		}
	}
</script>

<div class="rounded-[7px] overflow-hidden shadow-md bg-card">
	<div class="flex place-items-center justify-between border-b bg-background p-2">
		<div class="flex place-items-center gap-2">
			<Button class="rounded-full" variant="secondary" size="icon">
				<SparklesIcon class="h-5 w-5" />
			</Button>
			<div class="flex flex-col">
				<span class="text-sm font-medium">AI Assistant</span>
				<span class="text-xs">Ask Anything realted to code.</span>
			</div>
		</div>
	</div>
	<Chat.List class="md:min-h-[400px] min-h-[300px] max-h-[600px] overflow-x-auto overflow-y-auto">
		{#each messages as message (message.messageId)}
			{@const purifiedMessage = DOMPurify.sanitize(marked.parse(message.message) as string)}
			<Chat.Bubble variant={message.sender === 'user' ? 'sent' : 'received'}>
				<Chat.BubbleAvatar>
					<Chat.BubbleAvatarFallback>
						{message.sender === 'user' ? 'Me' : 'AI'}
					</Chat.BubbleAvatarFallback>
				</Chat.BubbleAvatar>
				<Chat.BubbleMessage class="flex flex-col gap-1">
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					<p>{@html purifiedMessage}</p>
				</Chat.BubbleMessage>
			</Chat.Bubble>
		{/each}
	</Chat.List>
	<div class="flex place-items-center gap-2 p-2 bg-secondary">
		<Input
			bind:value={message}
			class="rounded-full ring-1 ring-gray-400"
			placeholder="Type a message..."
			onkeydown={handleKeydown}
		/>
		<Button
			type="submit"
			variant="default"
			size="icon"
			class="shrink-0 rounded-full"
			onclick={handleClick}
			disabled={message === ''}
		>
			<Send />
		</Button>
	</div>
</div>
