<script lang="ts">
	import * as Chat from '$lib/components/ui/chat';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { Info, Paperclip, Phone, Send, SparklesIcon, VideoIcon } from '@lucide/svelte';
	import { Input } from '$lib/components/ui/input';

	let data = {
		user: {
			id: 1,
			name: 'Me'
		},
		friend: {
			id: 2,
			name: 'AI'
		},
		messages: [
			{ message: 'Hello!', senderId: 1, sentAt: '10:00 AM' },
			{ message: 'Hi there!', senderId: 2, sentAt: '10:01 AM' }
		],
		users: [
			{ id: 1, name: 'Me' },
			{
				id: 2,
				name: 'AI'
			}
		]
	};
	import { formatShortTime } from '$lib/utils';
	let message = $state('');
	let messages = $derived(data.messages);
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
	<Chat.List class="md:h-[400px] h-[300px] max-h-[600px] overflow-x-hidden overflow-y-auto">
		{#each messages as message (message.sentAt)}
			{@const sender = data.users.find((u) => u.id === message.senderId)}
			<Chat.Bubble variant={message.senderId === data.user.id ? 'sent' : 'received'}>
				<Chat.BubbleAvatar>
					<Chat.BubbleAvatarFallback>
						{sender?.name}
					</Chat.BubbleAvatarFallback>
				</Chat.BubbleAvatar>
				<Chat.BubbleMessage class="flex flex-col gap-1">
					<p>{message.message}</p>
					<div class="w-full text-xs group-data-[variant='sent']/chat-bubble:text-end">
						{message.sentAt}
					</div>
				</Chat.BubbleMessage>
			</Chat.Bubble>
		{/each}
		<Chat.Bubble variant="received">
			<Chat.BubbleAvatar>
				<Chat.BubbleAvatarFallback>
					{data.friend.name}
				</Chat.BubbleAvatarFallback>
			</Chat.BubbleAvatar>
			<Chat.BubbleMessage typing />
		</Chat.Bubble>
	</Chat.List>
	<form
		onsubmit={(e) => {
			e.preventDefault();
			messages.push({ message, senderId: data.user.id, sentAt: formatShortTime(new Date()) });
			message = '';
		}}
		class="flex place-items-center gap-2 p-2 bg-secondary"
	>
		<Input
			bind:value={message}
			class="rounded-full ring-1 ring-gray-400"
			placeholder="Type a message..."
		/>
		<Button
			type="submit"
			variant="default"
			size="icon"
			class="shrink-0 rounded-full"
			disabled={message === ''}
		>
			<Send />
		</Button>
	</form>
</div>
