const SERVER_NAME = 'https://jsonplaceholder.typicode.com'

function api(url, method, body, singleId, getParams) {
	if(url) {
		var options = {}
		//check method
		//if POST - add headers
		if(method === 'POST') {
			options.method = method
			options.headers = {'Content-Type': 'application/json'}
			options.body = JSON.stringify(body)
		}
		//check singleId, getParams
		return fetch(`${SERVER_NAME}${url}${singleId ? `/${singleId}` : ''}${getParams ? `?${getParams}` : ''}`, options)
		.then(function(response) {
			if(response.status > 400) {
				alert(response.status + ' Check your request!')
				return
			} else {
				return response.json()
			}
		})
	}
}

let root = document.querySelector('#root')
let button = document.createElement('button')
button.innerHTML = 'Light / Dark'
root.appendChild(button)
button.addEventListener('click', function() {
	let ul
	if(document.querySelector('.userList')) {
		ul = document.querySelector('.userList')
		ul.className = 'userList_dark'
	} else if (document.querySelector('.userList_dark')) {
		ul = document.querySelector('.userList_dark')
		ul.className = 'userList'
	}
})

let ul = document.querySelector('.userList')
ul && ul.remove()
ul = document.createElement('ul')
ul.className = 'userList'
root.appendChild(ul);
api('/users', 'GET', {}, '', '')
.then(function(data) {
	data.forEach(function(item) {
		let li = document.createElement('li')
		let text = document.createElement('div')
			text.innerHTML = item.id + ' ' + item.name
			text.className = 'userName'
		let pre = document.createElement('pre')
			pre.classList = 'userDetails'
		li.appendChild(text)
		li.appendChild(pre)
		ul.appendChild(li)
		text.addEventListener('click', function() {
			let current = document.querySelector('.userDetails.active')
			if(current && current !== pre) {
				current.classList.toggle('active')
			}
			let text = objText(item, 0)
			pre.innerHTML = text
			pre.classList.toggle('active')
		})
		ul.appendChild(li)
	});
})

//recursion for nested objects

function objText(obj, level) {
	let text = ''
	if(typeof(obj) === 'object') {
		text = level ? '<br/>' : ''
		for (let key in obj) {
			text += (level ? '    '.repeat(level) : '') + key + ': ' + objText(obj[key], level + 1)
		}
	} else {
		text += obj + '<br/>';
	}
	return text
}