'use strict';

class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI {
	addBookToList(book) {
		const list = document.querySelector('.book-list');
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.isbn}</td>
			<td><a href='#' class="delete">X</a></td>
		`
		list.appendChild(row);
	}
	deleteBook(target) {
		if(target.className === 'delete') {
			target.parentElement.parentElement.remove();
		}
	}
	clearFields() {
		document.querySelector('.title').value = '';
		document.querySelector('.author').value = '';
		document.querySelector('.isbn').value = '';
	}
	showAlert(message, className) {
		const div = document.createElement('div');
		div.className = `alert ${className}`;
		div.appendChild(document.createTextNode(message));
		const container = document.querySelector('.container');
		const form = document.querySelector('.book-form');
		container.insertBefore(div, form);
		setTimeout(function() {
			document.querySelector('.alert').remove();
		}, 3000);
	}
}

// додамо слухач події для додавання книги
document.querySelector('.book-form').addEventListener('submit', function(e){
	// отримати дані з інпутів
	const title = document.querySelector('.title').value,
		author = document.querySelector('.author').value,
		isbn = document.querySelector('.isbn').value

	// створюємо сутність 'книга'
	const book = new Book(title, author, isbn);

	// ініціалізуємо UI
	const ui = new UI();

	if([title, author, isbn].includes('')) {
		ui.showAlert('Заповніть  поля!', 'error');
	} else {
		// додамо книгу до списку
		ui.addBookToList(book);
		// показуємо повідомлення
		ui.showAlert('Книгу додано!', 'success');
		// очистимо поля
		ui.clearFields();
	}

	// блокуємо поведінку по замовчуванню для події 'submit' форми
	e.preventDefault();
})

// додамо слухач події для видалення книги
document.querySelector('.book-list').addEventListener('click', function(e){
	// ініціалізуємо UI
	const ui = new UI();
	// видаляємо книгу
	ui.deleteBook(e.target);
	// показуємо повідомлення
	ui.showAlert('Книгу видалено!', 'success');
	// блокуємо поведінку по замовчуванню
	e.preventDefault();
})