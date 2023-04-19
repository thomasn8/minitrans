<script setup>
import { io } from 'socket.io-client';
import { onBeforeMount, ref } from 'vue';

const socket = io('http://localhost:4000');

const usersCount = ref('');
const users = ref([]);
const messages = ref([]);
const messageText = ref('');
const joined = ref(false);
const pseudo = ref('');
const usersTyping = ref([]);

// onBeforeMount: call right before the component DOM is actually rendered and mounted
// equivalent to React.useEffect
onBeforeMount(() => {
	socket.emit('findAllUsers', {}, (response) => {
		users.value = response;
	})

	socket.emit('findAllMessages', {}, (response) => {
		messages.value = response;
	})

	socket.on('countUser', (count) => {
		if (count > 1) {
			usersCount.value = `${count} users`;
		}
		else {
			usersCount.value = `${count} user`;
		}
	})

	socket.on('join', ( {id, pseudo} ) => {
		console.log({id, pseudo});
		users.value.push({id, pseudo});
	})

	socket.on('disconect', (id) => {
		users.value = users.value.filter(user => user.id !== id);
	})

	socket.on('message', (message) => {
		messages.value.push(message);
	})
	
	socket.on('typing', (response) => {
		usersTyping.value = response;
	})
});

const join = () => {
	if (pseudo.value.length > 0) {
		socket.emit('join', { pseudo: pseudo.value }, () => {
			joined.value = true;
		})
	}
};

const sendMessage = () => {
	socket.emit('createMessage', { text: messageText.value }, () => {
		messageText.value = '';
	})
};

let typing = false;
const emitTyping = () => {
	const val = pseudo.value;
	if (typing === false) {
		typing = true;
		socket.emit('typing', { pseudo: val, isTyping: true } );
		
		let timeout = setTimeout (() => {
			socket.emit('typing', { pseudo: val, isTyping: false } );
			typing = false;
		}, 5000);
	}
};
</script>

<template>
	<div class ="chat">
		
		<!-- MODULE D'IDENTIFICATION -->
		<div class="join" v-if="!joined">
			<form @submit.prevent="join">
				<input v-model="pseudo" autofocus placeholder="Pseudo" />
				<button type="submit">Enter</button>
			</form>
		</div>
		
		<!-- MODULE DE CHATROOM -->
		<div class="chat-container" v-else>

			<div class="users-container">
				<div class="count">{{ usersCount }}</div>
				<div class="users-wrapper scrollbar">
					
					<div class="users" v-for="user in users">
						<div :socketId="user.id" class="user-wrapper">							
							<template v-for="userTyping in usersTyping">
								<span v-if="userTyping !== pseudo && userTyping === user.pseudo" class="typing"></span>
								<span v-else-if="userTyping === user.pseudo" class="me-typing"></span>
							</template>
							<span v-if="user.pseudo === pseudo" class="user me">{{ user.pseudo }} (me)</span>
							<span v-else class="user else">{{ user.pseudo }}</span>
							<span class="lister">•</span>
						</div>
					</div>
					
				</div>
			</div>

			<div class="messages-container">
				<div class="title">Chat</div>
				<div class="messages-wrapper">
					<div class="messages scrollbar">
						<div v-for="message in messages.slice().reverse()" class="message">
							<div v-if="message.pseudo === pseudo" class="name me"><span>{{ message.text }}</span></div>
							<div v-else class="name else"><span class="else-name">{{ message.pseudo }}: </span><span>{{ message.text }}</span></div>
						</div>
					</div>
				</div>
				<div class="write">
					<form @submit.prevent="sendMessage">
						<input v-model="messageText" @input="emitTyping" autofocus placeholder="Message..."/>
						<button type="submit">Send</button>
					</form>
				</div>
			</div>
		</div>

	</div>
</template>

<style>
@import './assets/chat.css';
</style>
